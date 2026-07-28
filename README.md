# 🚀 Resume Architect — AI Resume Builder

<div align="center">

![Resume Architect](https://img.shields.io/badge/AI-Resume%20Builder-6366f1?style=for-the-badge&logo=sparkles&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-f97316?style=for-the-badge&logo=meta&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)

**AI-powered, ATS-optimized resume builder with 4 premium formats and a colorful animated UI.**

🌐 **Live Demo → [https://resume-architect-5xkc.onrender.com](https://resume-architect-5xkc.onrender.com)**

</div>

---

## ✨ Features

- 🤖 **AI-Generated Resumes** — Powered by Groq's Llama 3.3 70B model (free & fast)
- 🎨 **4 Resume Formats** — Classic, Modern, Minimal, Bold
- 🎭 **3 Tone Options** — Professional, Creative, Executive
- 📊 **ATS Score** — Real-time compatibility score after generation
- 🪄 **AI Improve** — One-click resume enhancement
- 📋 **Copy & Download** — Export as `.txt` instantly
- 🌈 **Animated Rainbow UI** — Colorful glassmorphism design
- 📱 **Fully Responsive** — Works on mobile & desktop
- 🔒 **Rate Limited** — 20 requests per 15 min per IP

---

## 🖼️ Preview

| Input Panel | Resume Preview |
|---|---|
| Fill in your details, pick tone & format | AI generates a formatted, ATS-ready resume |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Node.js, Express.js |
| AI Model | Groq API — `llama-3.3-70b-versatile` |
| Deployment | Render (free tier) |
| Rate Limiting | express-rate-limit |

---

## 🚀 Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/Sachindhankhar2003/Resume-Architect.git
cd Resume-Architect
```

### 2. Install dependencies
```bash
cd backend
npm install
```

### 3. Set up environment variables
Create a `backend/.env` file:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

> 🔑 Get your **FREE** Groq API key at [https://console.groq.com](https://console.groq.com) — no credit card needed.

### 4. Start the server
```bash
npm start
```

### 5. Open the app
```
http://localhost:5000
```

---

## 📁 Project Structure

```
Resume-Architect/
├── backend/
│   ├── server.js          # Express API (generate + improve endpoints)
│   ├── package.json
│   └── .env               # Your API key (not committed)
├── frontend/
│   └── index.html         # Full frontend (HTML + CSS + JS)
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### `POST /generate`
Generate a resume from user details.

**Request body:**
```json
{
  "name": "John Doe",
  "jobrole": "Software Engineer",
  "skills": "React, Node.js, Python",
  "education": "BS Computer Science, 2020",
  "experience": "3 years at TechCorp",
  "tone": "professional"
}
```

**Response:**
```json
{
  "result": "John Doe\nSoftware Engineer\n\nPROFILE SUMMARY\n..."
}
```

---

### `POST /improve`
Improve an existing resume with AI.

**Request body:**
```json
{
  "text": "existing resume text...",
  "section": "full resume"
}
```

---

### `GET /health`
Check API server status and uptime.

**Response:**
```json
{
  "status": "ok",
  "uptime": 120,
  "timestamp": "2026-07-28T20:55:00.000Z",
  "service": "Resume Architect API"
}
```

---

## 🌐 Deploy on Render (Free)

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variable: `GROQ_API_KEY = your_key`
5. Click **Deploy** ✅

---

## 👨‍💻 Author

**Sachin Dhankhar**

[![GitHub](https://img.shields.io/badge/GitHub-Sachindhankhar2003-181717?style=flat-square&logo=github)](https://github.com/Sachindhankhar2003)

---

## 📄 License

MIT License — free to use, modify and distribute.

---

<div align="center">
  Made with ❤️ and AI
</div>
