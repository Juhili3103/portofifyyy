
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Resume = require("../models/Resume");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
  },
});

// Upload resume
router.post("/:userId", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select a resume file." });
    }

    const user = await require("../models/User").findById(req.params.userId);
    if (!user) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "User not found." });
    }

    const resume = await Resume.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id,
        originalName: req.file.originalname,
        filePath: req.file.path,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({
      message: "Resume uploaded successfully!",
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        size: resume.size,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Resume upload failed." });
  }
});

// Get resume details
router.get("/:userId", async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId }).select(
      "-filePath"
    );

    if (!resume) {
      return res.status(404).json({ message: "No resume found." });
    }

    res.json({ resume });
  } catch (error) {
    res.status(400).json({ message: "Unable to retrieve resume." });
  }
});

module.exports = router;

function extractResumeDetails(text) {
  const skillsList = [
    "JavaScript", "Python", "Java", "C++", "C",
    "React", "Node.js", "Express", "MongoDB", "SQL",
    "HTML", "CSS", "Machine Learning", "Artificial Intelligence",
    "Git", "GitHub", "Communication", "Leadership"
  ];

  const skills = skillsList.filter(skill =>
    new RegExp(
      skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    ).test(text)
  );

  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  const findSection = (keywords) => {
    const index = lines.findIndex(line =>
      keywords.some(keyword => line.toLowerCase().includes(keyword))
    );

    if (index === -1) return "Not found";

    return lines.slice(index + 1, index + 5).join(" ") || "Not found";
  };

  return {
    skills,
    education: findSection(["education", "qualification", "academic"]),
    experience: findSection(["experience", "employment", "internship"]),
    summary: text.slice(0, 500)
  };
}

// Analyze an uploaded resume
router.post("/analyze/:userId", async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });

    if (!resume || !fs.existsSync(resume.filePath)) {
      return res.status(404).json({
        message: "Please upload your resume again."
      });
    }

    let text = "";

    if (resume.originalName.toLowerCase().endsWith(".pdf")) {
      const buffer = fs.readFileSync(resume.filePath);
      const parser = new pdf.PDFParse({ data: buffer });

      try {
        const result = await parser.getText();
        text = result.text;
      } finally {
        await parser.destroy();
      }
    } else if (resume.originalName.toLowerCase().endsWith(".docx")) {
      const result = await mammoth.extractRawText({
        path: resume.filePath
      });
      text = result.value;
    } else {
      return res.status(400).json({
        message: "Analysis currently supports PDF and DOCX files."
      });
    }

    if (!text.trim()) {
      return res.status(400).json({
        message: "No readable text found. Try a text-based PDF or DOCX."
      });
    }

    const details = extractResumeDetails(text);

    res.json({
      message: "Resume analyzed successfully!",
      details
    });
  } catch (error) {
    console.error("Resume analysis error:", error.message);
    res.status(500).json({
      message: "Resume analysis failed. Please try again."
    });
  }
});