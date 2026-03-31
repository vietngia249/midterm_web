import { useState, useEffect, useCallback, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import * as blazeface from '@tensorflow-models/blazeface'

export function useFaceDetection() {
  const [modelStatus, setModelStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [loadProgress, setLoadProgress] = useState(0)
  const [backend, setBackend] = useState('')
  const modelRef = useRef(null)

  // Initialize TensorFlow and BlazeFace
  const loadModel = useCallback(async () => {
    try {
      setModelStatus('loading')
      setLoadProgress(10)

      // Initialize WebGL backend
      await tf.setBackend('webgl')
      await tf.ready()
      setBackend(tf.getBackend())
      setLoadProgress(40)

      // Load BlazeFace model
      const model = await blazeface.load({
        maxFaces: 10,
        inputWidth: 128,
        inputHeight: 128,
        iouThreshold: 0.3,
        scoreThreshold: 0.75
      })

      modelRef.current = model
      setLoadProgress(100)

      // Add a small delay for smoother UI transition
      setTimeout(() => {
        setModelStatus('ready')
      }, 500)
    } catch (err) {
      console.error('Failed to load TFJS or BlazeFace:', err)
      setModelStatus('error')
    }
  }, [])

  useEffect(() => {
    loadModel()
    
    // Cleanup WebGL contexts when unmounting
    return () => {
      if (tf.engine().backendName === 'webgl') {
        tf.engine().backendInstance.dispose()
      }
    }
  }, [loadModel])

  // Function to detect faces from a video element
  const detectFaces = useCallback(async (videoElement) => {
    if (!modelRef.current || modelStatus !== 'ready') return []
    if (!videoElement || videoElement.readyState !== 4) return []

    try {
      // returnPredictions: true gives detailed results array
      const predictions = await modelRef.current.estimateFaces(videoElement, false)
      return predictions
    } catch (err) {
      console.error('Detection error:', err)
      return []
    }
  }, [modelStatus])

  return {
    modelStatus,
    loadProgress,
    backend,
    detectFaces,
    retryLoad: loadModel
  }
}
