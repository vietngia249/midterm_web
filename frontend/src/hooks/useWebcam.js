import { useState, useRef, useCallback, useEffect } from 'react'

const DEFAULT_CONSTRAINTS = {
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 },
    facingMode: 'user',
  },
  audio: false,
}

/**
 * Custom hook for managing webcam access via getUserMedia API.
 * Handles stream lifecycle, error states, and cleanup.
 */
export function useWebcam() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)

  const startCamera = useCallback(async () => {
    try {
      setError(null)

      // Check for browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser.')
      }

      const stream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setIsStreaming(true)
      }
    } catch (err) {
      let message = 'Failed to access camera.'

      if (err.name === 'NotAllowedError') {
        message = 'Camera permission denied. Please allow camera access and try again.'
      } else if (err.name === 'NotFoundError') {
        message = 'No camera found. Please connect a camera and try again.'
      } else if (err.name === 'NotReadableError') {
        message = 'Camera is in use by another application.'
      } else if (err.message) {
        message = err.message
      }

      setError(message)
      setIsStreaming(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsStreaming(false)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return {
    videoRef,
    isStreaming,
    error,
    startCamera,
    stopCamera,
  }
}
