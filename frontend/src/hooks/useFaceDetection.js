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

      // Initialize CPU backend to rule out WebGL texture bugs
      await tf.setBackend('cpu')
      await tf.ready()
      setBackend(tf.getBackend())
      setLoadProgress(40)

      // Load BlazeFace model
      const model = await blazeface.load({
        maxFaces: 10,
        scoreThreshold: 0.55 // Restored proper threshold after debugging
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

  // Offscreen canvas for TFJS to read pixels safely
  const offscreenCanvasRef = useRef(null)

  // Function to detect faces from a video element
  const detectFaces = useCallback(async (videoElement) => {
    if (!modelRef.current || modelStatus !== 'ready') return []
    if (!videoElement || videoElement.readyState !== 4 || videoElement.videoWidth === 0) return []

    try {
      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement('canvas')
      }
      
      const canvas = offscreenCanvasRef.current
      if (canvas.width !== videoElement.videoWidth || canvas.height !== videoElement.videoHeight) {
        canvas.width = videoElement.videoWidth
        canvas.height = videoElement.videoHeight
      }

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

      // Pass the canvas instead of video to prevent WebGL silent read failures
      const predictions = await modelRef.current.estimateFaces(canvas, false)
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
