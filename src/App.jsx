import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import GitHub from "./pages/GitHub";
import AIAnalysis from "./pages/AIAnalysis";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import PortfolioPreview from "./pages/PortfolioPreview";
import Profile from "./pages/Profile";

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    skills: "",
    about: "",
    github: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePortfolio = () => {
    if (!formData.name || !formData.role || !formData.skills) {
      alert("Please enter your name, role and skills.");
      return;
    }

    setShowPortfolio(true);
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "22px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "22px",
            fontWeight: "800",
          }}
        >
          ✦ Portify AI
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>

          <Link to="/login">
            <button className="secondary-btn">Login</button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "80px 24px 70px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "30px",
            background: "rgba(139, 92, 246, 0.12)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            color: "#c4b5fd",
            marginBottom: "25px",
          }}
        >
          ✨ AI-Powered Personal Branding
        </div>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 82px)",
            lineHeight: "1.05",
            letterSpacing: "-3px",
            maxWidth: "900px",
            margin: "auto",
          }}
        >
          Turn Your Skills Into
          <span
            style={{
              display: "block",
              color: "#a78bfa",
            }}
          >
            Your Professional Brand.
          </span>
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin: "25px auto 30px",
            fontSize: "18px",
          }}
        >
          Portify AI transforms your resume, projects, skills and GitHub
          activity into a powerful professional identity.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <a href="#generator">
            <button className="primary-btn">
              Create My Portfolio →
            </button>
          </a>

          <Link to="/dashboard">
            <button className="secondary-btn">
              Explore Dashboard
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="page"
        style={{ paddingTop: "40px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
            WHY PORTIFY AI?
          </p>

          <h2 style={{ fontSize: "36px" }}>
            Your Career, Powered by AI
          </h2>

          <p>
            Everything you need to build a stronger professional identity.
          </p>
        </div>

        <div className="grid">
          <div className="card">
            <div style={{ fontSize: "38px" }}>📄</div>
            <h2>Resume Intelligence</h2>
            <p>
              Extract important career information from your resume and
              transform it into structured profile data.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: "38px" }}>🤖</div>
            <h2>AI Career Analysis</h2>
            <p>
              Discover your strengths, skill gaps and potential career
              directions.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: "38px" }}>🌐</div>
            <h2>Living Portfolio</h2>
            <p>
              Create a professional portfolio that can continuously evolve
              with your career.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="page"
        style={{ paddingTop: "70px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
            HOW IT WORKS
          </p>

          <h2 style={{ fontSize: "36px" }}>
            From Data to Career Identity
          </h2>
        </div>

        <div className="grid">
          <div className="card">
            <h2>01</h2>
            <h3>Connect</h3>
            <p>Add your resume, GitHub, projects and skills.</p>
          </div>

          <div className="card">
            <h2>02</h2>
            <h3>Understand</h3>
            <p>AI analyzes your experience and technical profile.</p>
          </div>

          <div className="card">
            <h2>03</h2>
            <h3>Build</h3>
            <p>Generate a personalized professional portfolio.</p>
          </div>
        </div>
      </section>

      {/* GENERATOR */}
      <section
        id="generator"
        className="page"
        style={{ paddingTop: "70px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
            TRY PORTIFY AI
          </p>

          <h2 style={{ fontSize: "36px" }}>
            Create Your Professional Profile
          </h2>

          <p>
            Enter your details and generate a quick portfolio preview.
          </p>
        </div>

        <div
          className="card"
          style={{
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Professional Role / Student"
          />

          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (React, Python, AI/ML...)"
          />

          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
          />

          <input
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub Profile URL"
          />

          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn Profile URL"
          />

          <button
            className="primary-btn"
            style={{
              width: "100%",
              marginTop: "15px",
            }}
            onClick={generatePortfolio}
          >
            Generate My Portfolio ✨
          </button>
        </div>
      </section>

      {/* GENERATED PREVIEW */}
      {showPortfolio && (
        <section className="page">
          <div
            className="card"
            style={{
              maxWidth: "900px",
              margin: "auto",
            }}
          >
            <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
              AI GENERATED PROFILE
            </p>

            <h1>{formData.name}</h1>

            <h2 style={{ color: "#c4b5fd" }}>
              {formData.role}
            </h2>

            <p style={{ marginTop: "15px" }}>
              {formData.about ||
                "A professional profile generated with Portify AI."}
            </p>

            <h2 style={{ marginTop: "30px" }}>Skills</h2>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "15px",
              }}
            >
              {formData.skills.split(",").map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "9px 15px",
                    borderRadius: "20px",
                    background: "rgba(139, 92, 246, 0.15)",
                    border:
                      "1px solid rgba(139, 92, 246, 0.3)",
                    color: "#ddd6fe",
                  }}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "30px",
                flexWrap: "wrap",
              }}
            >
              {formData.github && (
                <a href={formData.github} target="_blank">
                  <button className="secondary-btn">
                    GitHub ↗
                  </button>
                </a>
              )}

              {formData.linkedin && (
                <a href={formData.linkedin} target="_blank">
                  <button className="secondary-btn">
                    LinkedIn ↗
                  </button>
                </a>
              )}
            </div>

            <Link to="/portfolio-builder">
              <button
                className="primary-btn"
                style={{ marginTop: "25px" }}
              >
                Build Full Portfolio →
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "50px 20px",
          marginTop: "50px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2>✦ Portify AI</h2>

        <p style={{ marginTop: "10px" }}>
          Your skills deserve more than a PDF.
        </p>
      </footer>
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/github" element={<GitHub />} />
        <Route path="/ai-analysis" element={<AIAnalysis />} />
        <Route
          path="/portfolio-builder"
          element={<PortfolioBuilder />}
        />
        <Route
          path="/portfolio-preview"
          element={<PortfolioPreview />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;