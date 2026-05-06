const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const path = require("path");
const rateLimit = require("express-rate-limit");
const fs = require("fs");

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Rate limiter: max 20 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests. Please wait a few minutes and try again." },
});
app.use("/generate", limiter);
app.use("/improve", limiter);

// ─── API Key Check ─────────────────────────────────────────────────────────────
if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_api_key_here") {
    console.error("❌ ERROR: GROQ_API_KEY is missing in .env file");
    console.error("   Get your FREE key at: https://console.groq.com");
    process.exit(1);
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Helpers ───────────────────────────────────────────────────────────────────
function sanitize(str = "") {
    return String(str).trim().slice(0, 2000);
}

// ─── Serve Frontend ────────────────────────────────────────────────────────────
const frontendPath = path.join(__dirname, "..", "frontend", "index.html");

app.get("/", (req, res) => {
    if (fs.existsSync(frontendPath)) {
        res.sendFile(frontendPath);
    } else {
        res.json({ status: "ok", message: "Resume Builder API is running ✅" });
    }
});

// ─── POST /generate ────────────────────────────────────────────────────────────
app.post("/generate", async (req, res) => {
    try {
        const name       = sanitize(req.body.name);
        const jobrole    = sanitize(req.body.jobrole);
        const skills     = sanitize(req.body.skills);
        const education  = sanitize(req.body.education);
        const experience = sanitize(req.body.experience);
        const tone       = ["professional", "creative", "executive"].includes(req.body.tone)
                            ? req.body.tone : "professional";

        if (!name || !jobrole) {
            return res.status(400).json({ error: "Name and Job Role are required." });
        }

        console.log(`🚀 Generating [${tone}] resume for: ${name} (${jobrole})`);

        const toneGuide = {
            professional: "Use a formal, polished, corporate tone.",
            creative:     "Use a modern, engaging tone that showcases personality while staying professional.",
            executive:    "Use a concise, high-impact executive tone focused on leadership and strategic results.",
        }[tone];

        const prompt = `
You are a professional resume writer and ATS expert.
Create a high-impact resume for the following individual.

Name: ${name}
Target Job Role: ${jobrole}
Skills: ${skills || "Not provided"}
Education: ${education || "Not provided"}
Experience: ${experience || "Not provided"}

TONE: ${toneGuide}

STRICT FORMATTING RULES:
1. Start with the person's name on the first line, then their job role on the second line.
2. Use these exact section headers in ALL CAPS:
   PROFILE SUMMARY
   ──────────────
   SKILLS
   ──────────────
   WORK EXPERIENCE
   ──────────────
   EDUCATION
   ──────────────
3. Use bullet points (•) for skills and experience items.
4. Use action verbs and quantifiable achievements.
5. Optimize for ATS keyword density.
6. Keep the total resume under 600 words.
7. Output ONLY the resume. No extra commentary.
        `.trim();

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a professional ATS-friendly resume generator. Output only the resume, nothing else." },
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 1200,
        });

        const resumeContent = response.choices[0].message.content;
        res.json({ result: resumeContent });

    } catch (err) {
        console.error("❌ GROQ ERROR:", err.message);
        res.status(500).json({
            error: "Failed to generate resume.",
            details: err.message,
        });
    }
});

// ─── POST /improve ─────────────────────────────────────────────────────────────
app.post("/improve", async (req, res) => {
    try {
        const text    = sanitize(req.body.text);
        const section = sanitize(req.body.section || "resume");

        if (!text) {
            return res.status(400).json({ error: "Text to improve is required." });
        }

        console.log(`✨ Improving section: ${section}`);

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are an expert resume editor. Improve the provided resume section to be more impactful, ATS-friendly, and concise. Return only the improved text." },
                { role: "user", content: `Improve this ${section}:\n\n${text}` },
            ],
            temperature: 0.6,
            max_tokens: 600,
        });

        res.json({ result: response.choices[0].message.content });

    } catch (err) {
        console.error("❌ IMPROVE ERROR:", err.message);
        res.status(500).json({ error: "Failed to improve text.", details: err.message });
    }
});

// ─── Start ─────────────────────────────────────────────────────────────────────
// v4 - colorful rainbow UI
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`   POST /generate  — build a resume`);
    console.log(`   POST /improve   — improve a section\n`);
});
