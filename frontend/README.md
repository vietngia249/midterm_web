# Smart Attendance System (Browser-Based ML)

A high-fidelity implementation of a Smart Attendance System running entirely in the browser using React, TailwindCSS, and TensorFlow.js.

## Overview

This project uses the `BlazeFace` model to perform real-time face detection on a live webcam feed. The application does not rely on a backend server or external API for inference. All machine learning processes run client-side via WebGL acceleration.

Features:
- Live face detection with bounding box rendering
- Real-time performance tracking (FPS and latency)
- Identity verification and attendance logging
- Export attendance logs to CSV formats
- Persistent record storage using `localStorage`
- Material Design 3 "Luminal" UI methodology

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- pnpm (or npm/yarn)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## Technology Stack

- **Frontend Framework:** React 18, Vite
- **Styling:** TailwindCSS v4
- **Machine Learning Engine:** TensorFlow.js (`@tensorflow/tfjs`)
- **Backend Acceleration:** WebGL (`@tensorflow/tfjs-backend-webgl`)
- **Detection Model:** BlazeFace (`@tensorflow-models/blazeface`)

## Academic Context
Course: 503073 - Web Programming and Applications
Module: Topic 4 - Machine Learning on the Web
