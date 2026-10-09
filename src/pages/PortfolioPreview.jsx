
import { useState } from "react";

function PortfolioPreview() {
  const [published, setPublished] = useState(
    localStorage.getItem("portifyPublished") === "true"
  );

  let profile = {};
  let generated = {};

  try {
    profile = JSON.parse(localStorage.getItem("portifyProfile") || "{}");
    generated = JSON.parse(
      localStorage.getItem("portifyGeneratedPortfolio") || "{}"
    );
  } catch {
    profile = {};
    generated = {};
  }

  const name = generated.name || profile.name || "Your Name";
  const role = generated.role || profile.role || "Aspiring Professional";
  const careerGoal =
    generated.careerGoal || profile.careerGoal || "Your Career Goal";

  const skillsValue = generated.skills ?? profile.skills ?? [];
  const skills = Array.isArray(skillsValue)
    ? skillsValue
    : String(skillsValue).split(/[,•\n]/).map((s) => s.trim()).filter(Boolean);

  const about =
    profile.about ||
    profile.bio ||
    generated.bio ||
    `I am an aspiring ${careerGoal} who enjoys learning, building projects, and developing new skills.`;

  const template = generated.template || localStorage.getItem("portifyTemplate") || "Minimal";

  function downloadPortfolio() {
    const escapeHtml = (value) =>
      String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);

    const skillsHtml = skills
      .map((skill) => `<span class="skill">${escapeHtml(skill)}</span>`)
      .join("\n");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(name)} | Portfolio</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#0f1020;color:#f8fafc;font-family:Arial,sans-serif;line-height:1.7}
main{max-width:900px;margin:50px auto;padding:35px} .tag{color:#a78bfa;text-transform:uppercase;letter-spacing:2px;font-size:13px}
h1{font-size:clamp(36px,7vw,60px);margin:8px 0}h2{color:#c4b5fd}
section{margin:38px 0}.skill{display:inline-block;margin:5px;padding:8px 13px;border:1px solid #6d5bd0;border-radius:20px;background:#252044}
a{color:#c4b5fd}footer{color:#a1a1aa;font-size:13px;margin-top:50px}
</style>
</head>
<body>
<main>
<p class="tag">${escapeHtml(template)} Portfolio</p>
<p class="tag">Hello, I'm</p>
<h1>${escapeHtml(name)}</h1>
<h2>${escapeHtml(role)}</h2>
<section><h2>About Me</h2><p>${escapeHtml(about)}</p></section>
<section><h2>Skills</h2>${skillsHtml || "<p>Add your skills to your profile.</p>"}</section>
<section><h2>Career Direction</h2><p>${escapeHtml(careerGoal)}</p></section>
<section><h2>Projects</h2><p>Add your own projects and links to showcase your work.</p></section>
<footer>Created with Portify AI</footer>
</main>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.trim().replace(/[^a-z0-9_-]+/gi, "-") || "portfolio"}-portfolio.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function publishPortfolio() {
    localStorage.setItem("portifyPublished", "true");
    setPublished(true);
  }

  return (
    <div className="page">
      <div style={{ marginBottom: "30px" }}>
        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
          PORTIFY AI • PORTFOLIO PREVIEW
        </p>
        <h1>Your Professional Portfolio 🌐</h1>
        <p>Review your portfolio and download an HTML copy to share or host.</p>
      </div>

      <div
        className="card"
        style={{
          padding: "clamp(20px, 5vw, 45px)",
          marginBottom: "25px",
          background:
            "linear-gradient(145deg, rgba(30, 27, 75, 0.95), rgba(17, 24, 48, 0.95))",
        }}
      >
        <p style={{ color: "#a78bfa", fontWeight: "600" }}>
          {template.toUpperCase()} TEMPLATE
        </p>

        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>HELLO, I'M</p>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 52px)", marginBottom: "10px" }}>
          {name}
        </h1>
        <h2 style={{ color: "#c4b5fd" }}>{role}</h2>
        <p style={{ marginTop: "18px" }}>{about}</p>

        <section style={{ marginTop: "35px" }}>
          <p style={{ color: "#8b5cf6", fontWeight: "600" }}>SKILLS</p>
          <h2>What I Work With</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
            {skills.length ? skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                style={{
                  background: "rgba(139, 92, 246, 0.15)",
                  border: "1px solid rgba(139, 92, 246, 0.35)",
                  padding: "9px 15px",
                  borderRadius: "20px",
                  color: "#ddd6fe",
                }}
              >
                {skill}
              </span>
            )) : <p>No skills added yet.</p>}
          </div>
        </section>

        <section>
          <p style={{ color: "#8b5cf6", fontWeight: "600" }}>CAREER DIRECTION</p>
          <h2>{careerGoal}</h2>
          <p>Focused on learning, improving my skills, and building meaningful projects.</p>
        </section>

        <section>
          <p style={{ color: "#8b5cf6", fontWeight: "600" }}>PROJECTS</p>
          <h2>Featured Project</h2>
          <div className="card" style={{ marginTop: "15px", padding: "22px" }}>
            <h3>Portify AI</h3>
            <p style={{ marginTop: "8px" }}>
              A platform designed to help people present their skills and professional identity.
            </p>
            <p style={{ marginTop: "15px", color: "#a78bfa", fontSize: "14px" }}>
              React • Portfolio Building • Personal Branding
            </p>
          </div>
        </section>
      </div>

      <div className="card" style={{ textAlign: "center", padding: "30px" }}>
        <h2>{published ? "Portfolio marked as ready ✓" : "Your portfolio is ready to export 🚀"}</h2>
        <p style={{ margin: "12px 0 20px" }}>
          Download an HTML file you can open in a browser or upload to a hosting service.
        </p>

        <button className="primary-btn" onClick={downloadPortfolio}>
          Download HTML Portfolio ↓
        </button>

        <div>
          <button
            className="secondary-btn"
            style={{ marginTop: "15px" }}
            onClick={publishPortfolio}
          >
            {published ? "Marked as Ready ✓" : "Mark as Ready"}
          </button>
        </div>

        <p style={{ fontSize: "13px", marginTop: "15px" }}>
          Marking it as ready does not publish it online. The downloaded file still needs hosting to get a public link.
        </p>
      </div>
    </div>
  );
}

export default PortfolioPreview;