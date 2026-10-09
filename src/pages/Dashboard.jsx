
import { Link } from "react-router-dom";

function Dashboard() {
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("portifyUser") || "{}");
  } catch {
    user = {};
  }

  const firstName = user.name
    ? user.name.trim().split(/\s+/)[0]
    : "there";

  let profileStrength = 0;

  try {
    const profile = JSON.parse(
      localStorage.getItem("portifyProfile") || "{}"
    );

    const fields = [
      profile.name,
      profile.role,
      profile.skills,
      profile.careerGoal,
      profile.about,
    ];

    const completed = fields.filter(
      (field) =>
        typeof field === "string" && field.trim().length > 0
    ).length;

    profileStrength = Math.round(
      (completed / fields.length) * 100
    );
  } catch {
    profileStrength = 0;
  }

  return (
    <div className="page">
      <div style={{ marginBottom: "35px" }}>
        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
          PORTIFY AI • CAREER DASHBOARD
        </p>

        <h1>Welcome back, {firstName} 👋</h1>

        <p>
          Build your professional identity, analyze your skills and create
          your AI-powered portfolio.
        </p>
      </div>

      <div
        className="card"
        style={{
          marginBottom: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p>Profile Strength</p>

          <h2 style={{ fontSize: "36px", margin: "5px 0" }}>
            {profileStrength}%
          </h2>

          <p>Based on your saved profile information.</p>
        </div>

        <Link to="/profile">
          <button className="primary-btn">
            Complete Profile →
          </button>
        </Link>
      </div>

      <h2 style={{ marginBottom: "18px" }}>Quick Actions</h2>

      <div className="grid">
        <Link to="/profile">
          <div className="card">
            <h2>👤</h2>
            <h3>My Profile</h3>
            <p>Edit your career information and skills.</p>
          </div>
        </Link>

        <Link to="/resume">
          <div className="card">
            <h2>📄</h2>
            <h3>Upload Resume</h3>
            <p>Add your resume for AI-powered analysis.</p>
          </div>
        </Link>

        <Link to="/github">
          <div className="card">
            <h2>🐙</h2>
            <h3>Connect GitHub</h3>
            <p>Analyze your projects and coding activity.</p>
          </div>
        </Link>

        <Link to="/ai-analysis">
          <div className="card">
            <h2>🤖</h2>
            <h3>AI Analysis</h3>
            <p>Discover your strengths and skill gaps.</p>
          </div>
        </Link>

        <Link to="/portfolio-builder">
          <div className="card">
            <h2>🎨</h2>
            <h3>Build Portfolio</h3>
            <p>Choose a design and build your portfolio.</p>
          </div>
        </Link>

        <Link to="/portfolio-preview">
          <div className="card">
            <h2>🌐</h2>
            <h3>Preview Portfolio</h3>
            <p>View your professional identity.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;