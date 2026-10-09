
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PortfolioBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("portifyTemplate") || ""
  );
  const navigate = useNavigate();

  const templates = [
    {
      name: "Minimal",
      icon: "◈",
      description: "Clean and professional design for a simple personal brand.",
    },
    {
      name: "Modern Developer",
      icon: "⌘",
      description: "Tech-focused design perfect for developers and AI students.",
    },
    {
      name: "Creative",
      icon: "✦",
      description: "Bold and expressive design for showcasing your personality.",
    },
  ];

  function generatePortfolio() {
    const savedProfile = localStorage.getItem("portifyProfile");
    let profile = {};

    try {
      profile = savedProfile ? JSON.parse(savedProfile) : {};
    } catch {
      profile = {};
    }

    const skills = Array.isArray(profile.skills)
      ? profile.skills
      : typeof profile.skills === "string"
      ? profile.skills.split(/[,•\n]/).map((skill) => skill.trim()).filter(Boolean)
      : [];

    const portfolio = {
      template: selectedTemplate,
      name: profile.name || "Your Name",
      role: profile.role || "Aspiring Professional",
      careerGoal: profile.careerGoal || "Your Career Goal",
      skills,
      email: profile.email || "",
      bio:
        profile.bio ||
        `I am an aspiring ${profile.careerGoal || "professional"} who enjoys learning, building projects, and developing new skills.`,
      generatedAt: new Date().toISOString(),
    };

    localStorage.setItem("portifyTemplate", selectedTemplate);
    localStorage.setItem("portifyGeneratedPortfolio", JSON.stringify(portfolio));

    navigate("/portfolio-preview");
  }

  return (
    <div className="page">
      <div style={{ marginBottom: "35px" }}>
        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
          PORTIFY AI • PORTFOLIO BUILDER
        </p>

        <h1>Build Your Portfolio 🎨</h1>

        <p>Choose a design that represents your professional identity.</p>
      </div>

      <div className="grid">
        {templates.map((template) => (
          <div
            className="card"
            key={template.name}
            style={{
              border:
                selectedTemplate === template.name
                  ? "2px solid #8b5cf6"
                  : "1px solid rgba(139, 92, 246, 0.25)",
              transition: "0.2s",
            }}
          >
            <div style={{ fontSize: "42px", marginBottom: "15px" }}>
              {template.icon}
            </div>

            <h2>{template.name}</h2>
            <p>{template.description}</p>
            <button
  type="button"
  className="primary-btn"
  style={{
    marginTop: "15px",
    cursor: "pointer",
    position: "relative",
    zIndex: 10,
    pointerEvents: "auto",
  }}
  onClick={() => {
    console.log("Generate Portfolio clicked!");
    generatePortfolio();
  }}
>
  Generate Portfolio →
</button>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="card" style={{ marginTop: "30px", textAlign: "center" }}>
          <p>SELECTED TEMPLATE</p>
          <h2>{selectedTemplate} ✓</h2>

          <button
            className="primary-btn"
            style={{ marginTop: "15px" }}
            onClick={generatePortfolio}
          >
            Generate Portfolio →
          </button>
        </div>
      )}
    </div>
  );
}

export default PortfolioBuilder;