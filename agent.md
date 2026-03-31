# agent.md - Smart Attendance System (Browser-based ML)

> Single Source of Truth - 503073 Web Programming and Applications - Midterm Project
> Last updated: 2026-03-30

---

## 1. Project Overview

| Field        | Detail                                             |
| ------------ | -------------------------------------------------- |
| Project Name | Smart Attendance System                            |
| Course       | 503073 - Web Programming and Applications          |
| Topic        | Topic 4 - Machine Learning on the Web              |
| Core Idea    | Browser-based face detection + attendance check-in |
| ML Library   | TensorFlow.js + BlazeFace                          |
| Backend      | None - 100% client-side                            |
| Time         | 5 days                                             |
| Team Size    | 1 member                                           |

### What It Does

1. User opens webcam in browser
2. TensorFlow.js detects faces in real-time (bounding boxes)
3. User enters their name and clicks "Check In"
4. Attendance record is saved to localStorage
5. Attendance list is displayed with timestamps

### What It Does NOT Do

- No face recognition (only detection)
- No backend / server / database
- No authentication

---

## 2. Assignment Constraints

### Submission Requirements

| Deliverable | Requirement                                                        |
| ----------- | ------------------------------------------------------------------ |
| Report      | 20-60 pages (excl. cover/appendices), Faculty template, Word + PDF |
| Source Code | Organized folders, clean/documented, includes README               |
| Video       | Max 20 minutes, all members participate, English                   |
| Language    | Report + video must be in English                                  |

Note: Lengthy reports lacking images/tables may be flagged as AI-generated.

### Grading Criteria (10.0 Points)

| Criterion                      | Points | Our Strategy                                |
| ------------------------------ | ------ | ------------------------------------------- |
| Theoretical Understanding      | 2.0    | Deep TF.js + WebGL + BlazeFace explanation  |
| Comparative Analysis           | 1.0    | TF.js vs ONNX.js vs WebDNN comparison table |
| Application and Implementation | 1.0    | Step-by-step pipeline with code snippets    |
| Structure and Presentation     | 2.0    | Professional format, diagrams, screenshots  |
| Scope and Detail               | 2.0    | Detection + attendance + dashboard features |
| Demonstration and Clarity      | 1.0    | Clean UI, live demo, FPS counter            |
| Video and Presentation Skills  | 1.0    | Well-structured video                       |

### Penalties

| Rule            | Penalty      |
| --------------- | ------------ |
| Team size < 2   | -0.5 points  |
| Late submission | -1.0 per day |
| Non-English     | -0.5 to -1.0 |

---

## 3. Architecture

```
+-----------------------------------------------------------+
|                     BROWSER (Client)                       |
|                                                            |
|  [Webcam]    [Video Frame]    [TensorFlow.js]              |
|  Stream  --> Capture      --> BlazeFace Model              |
|  (getUserMe-  (requestAnima-   Face Detection              |
|   dia API)    tionFrame)                                   |
|                                     |                      |
|                                     v                      |
|  +----------------------------------------------+         |
|  |              Canvas Overlay                   |         |
|  |  - Bounding boxes around faces                |         |
|  |  - Confidence scores                          |         |
|  |  - Face count indicator                       |         |
|  +----------------------------------------------+         |
|                                                            |
|  [Check-In]         [Attendance Dashboard]                 |
|   Form         -->   - Name, Time, Date                    |
|   (Name input)       - Face detected Y/N                   |
|                      - Stored in localStorage              |
|                                                            |
+-----------------------------------------------------------+
```

### Data Flow

```
[Webcam] --> [Video Element] --> [requestAnimationFrame Loop]
                                        |
                              [BlazeFace.detect]
                                        |
                              [Draw on Canvas]
                              (bounding boxes)
                                        |
                    User clicks "Check In" (if face detected)
                                        |
                              [Save to localStorage]
                                        |
                              [Update Attendance Dashboard]
```

---

## 4. Technology Decisions

| Layer      | Choice        | Reason                                            |
| ---------- | ------------- | ------------------------------------------------- |
| Framework  | React (Vite)  | Fast HMR, component-based, modern                 |
| Styling    | TailwindCSS   | Rapid UI development, utility-first               |
| ML Runtime | TensorFlow.js | Best browser ML support, well-documented          |
| ML Model   | BlazeFace     | Lightweight (~400KB), fast (~30ms), good accuracy |
| Storage    | localStorage  | No backend needed, persistent, simple             |
| Webcam     | getUserMedia  | Standard browser API                              |
| Rendering  | Canvas API    | Draw overlays on video stream                     |
| Build      | Vite          | Fastest dev server, optimized builds              |

---

## 5. Feature List

| #  | Feature                       | Priority | Day | Status  |
| -- | ----------------------------- | -------- | --- | ------- |
| 1  | Project setup (Vite+React+TW) | P0       | 1   | Done    |
| 2  | Webcam stream                 | P0       | 1   | Done    |
| 3  | Camera controls               | P0       | 1   | Pending |
| 4  | TensorFlow.js + BlazeFace     | P0       | 2   | Pending |
| 5  | Face detection loop           | P0       | 2   | Pending |
| 6  | Bounding box rendering        | P0       | 3   | Pending |
| 7  | Check-in form                 | P0       | 4   | Pending |
| 8  | localStorage attendance       | P0       | 4   | Pending |
| 9  | Attendance dashboard          | P0       | 4   | Pending |
| 10 | UI polish + animations        | P1       | 5   | Pending |
| 11 | FPS counter + stats           | P1       | 5   | Pending |

---

## 6. Data Design

### Attendance Record (localStorage)

```json
{
  "attendance": [
    {
      "id": "uuid-v4",
      "name": "Nguyen Viet Nghia",
      "timestamp": "2026-03-30T08:30:00.000Z",
      "date": "2026-03-30",
      "time": "08:30:00",
      "faceDetected": true,
      "faceCount": 1
 
  ]
}
```

### Key: `smart-attendance-records`

---

## 7. 5-Day Implementation Plan

### Day 1 - Foundation

| Step | Task                             | Time |
| ---- | -------------------------------- | ---- |
| 1    | Setup Vite + React + TailwindCSS | 1h   |
| 2    | Webcam stream component          | 2h   |
| 3    | Camera controls (start/stop)     | 1h   |

### Day 2 - ML Integration

| Step | Task                              | Time |
| ---- | --------------------------------- | ---- |
| 4    | Install TensorFlow.js + BlazeFace | 1h   |
| 5    | Model loading with progress UI    | 1.5h |
| 6    | Face detection loop               | 2h   |

### Day 3 - Visualization

| Step | Task                            | Time |
| ---- | ------------------------------- | ---- |
| 7    | Canvas overlay + bounding boxes | 2h   |
| 8    | Confidence scores + face count  | 1.5h |
| 9    | Detection status indicator      | 1h   |

### Day 4 - Attendance Logic

| Step | Task                          | Time |
| ---- | ----------------------------- | ---- |
| 10   | Check-in form (name + button) | 1.5h |
| 11   | localStorage read/write       | 1.5h |
| 12   | Attendance table/dashboard    | 2h   |

### Day 5 - Polish and Deliverables

| Step | Task                             | Time |
| ---- | -------------------------------- | ---- |
| 13   | UI polish, dark mode, animations | 2h   |
| 14   | FPS counter + performance stats  | 1h   |
| 15   | README.md                        | 1h   |
| 16   | Report writing                   | 3h   |
| 17   | Video recording                  | 2h   |

---

## 8. Risks and Mitigations

| Risk                     | Impact | Mitigation                            |
| ------------------------ | ------ | ------------------------------------- |
| WebGL not available      | High   | Fallback to WASM/CPU backend          |
| Webcam permission denied | High   | Clear error UI + instructions         |
| Low FPS on weak hardware | Medium | Reduce detection frequency, lower res |
| localStorage full        | Low    | Limit records, add clear function     |
| Model download slow      | Medium | Loading spinner, progress indicator   |
| Single member penalty    | Fixed  | -0.5 accepted, maximize other scores  |

---

## 9. Report Mapping (Grading to Report Chapters)

| Criterion (Points)                   | Report Chapter                | Content                                       |
| ------------------------------------ | ----------------------------- | --------------------------------------------- |
| Theoretical Understanding (2.0)      | Ch.2 - Theoretical Background | TF.js architecture, WebGL, BlazeFace model    |
| Comparative Analysis (1.0)           | Ch.3 - Technology Analysis    | TF.js vs ONNX.js vs WebDNN table              |
| Application and Implementation (1.0) | Ch.4 - Implementation         | Pipeline code, step-by-step explanation       |
| Structure and Presentation (2.0)     | All chapters                  | Diagrams, tables, screenshots every 2-3 pg    |
| Scope and Detail (2.0)               | Demo app                      | Multi-feature: detection + attendance + stats |
| Demonstration and Clarity (1.0)      | Demo                          | Clean UI, live webcam, FPS counter            |
| Video and Presentation (1.0)         | Video                         | Structured script, clear narration            |

---

## 10. Git Strategy

### Branch: `main`

### Commit Convention (Conventional Commits)

```
feat: <description>       - New feature
fix: <description>        - Bug fix
refactor: <description>   - Code improvement
style: <description>      - UI/styling changes
docs: <description>       - Documentation
chore: <description>      - Config/setup
checkpoint: <description> - End-of-day stable state
```

### Rules

1. Small commits only - ONE logical change per commit
2. Commit immediately after each working step
3. Atomic - each commit must be testable, not break the app, reversible
4. No mixing - never bundle unrelated changes
5. Verify first - test before committing, no console errors
6. Checkpoint commits at end of each day

### Workflow

```bash
# Stage specific files only
git add <specific-files>
git commit -m "<type>: <description>"
git push origin main
```

---

## 11. Progress Tracker

| Step | Feature                          | Status   | Commits                                                                                                                                                                                                                                                                                                                     |
| ---- | -------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Setup Vite + React + TailwindCSS | Done     | chore: initialize vite + react project with pnpm, chore: add tailwindcss v4 with vite plugin, style: add dark mode design system with custom tokens, chore: configure index.html with seo meta and inter font, feat: create app shell with header hero card and footer, chore: update gitignore to exclude agent.md and pdf |
| 2    | Webcam stream                    | Done     | feat: add useWebcam hook with getUserMedia and error handling, feat: add WebcamView component with start/stop and error states, feat: integrate webcam view with responsive grid layout                                                                                                                                     |
| 3    | UI Components & Design System    | Done     | style: rebuild design system with material design 3 luminal tokens, feat: add header and footer components matching design, feat: add camera view with detection overlay and controls, feat: add model status card with loading and error states, feat: add check-in form, detection info, and attendance list            |
| 4    | TensorFlow.js + BlazeFace        | Done     | feat: add tensorflow.js and blazeface model with detection hook, fix: lower blazeface score threshold and validate video element readiness                                                                                                                                                                                  |
| 5    | Face detection loop              | Done     | feat: integrate all components into app with localstorage and running ML inference detection loop, updating specific tracking states                                                                                                                                                                                        |
| 6    | Check-in & localStorage logic    | Done     | feat: integrate all components into app with localstorage, wiring up attendance list with check-in buttons properly                                                                                                                                                                                                         |
| 7    | Dashboard & UI Polish            | Pending  | -                                                                                                                                                                                                                                                                                                                           |

---

> This document is a living artifact. Updated after each step completion.
