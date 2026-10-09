
import { useMemo } from "react";

function AIAnalysis() {
  const savedProfile = localStorage.getItem("portifyProfile");
  let profile = null;

  try {
    profile = savedProfile ? JSON.parse(savedProfile) : null;
  } catch {
    profile = null;
  }

  const skills = useMemo(() => {
    const value = profile?.skills;
    if (Array.isArray(value)) return value.map(String).map(s => s.trim()).filter(Boolean);
    if (typeof value === "string") {
      return value.split(/[,•\n]/).map(s => s.trim()).filter(Boolean);
    }
    return [];
  }, [profile?.skills]);

  if (!profile) {
    return (
      <div className="page">
        <div className="card">
          <h1>AI Profile Analysis 🤖</h1>
          <p>Please complete your profile first.</p>
        </div>
      </div>
    );
  }

  const suggestions = [
    { name: "Data Structures & Algorithms", match: /developer|engineer|software|ai|ml/i },
    { name: "SQL & Database Basics", match: /data|backend|software|ai|ml/i },
    { name: "Git & GitHub Projects", match: /developer|engineer|software|frontend|backend|ai|ml/i },
    { name: "Cloud Computing", match: /cloud|backend|software|engineer|ai|ml/i },
    { name: "Communication & Interview Practice", match: /.*/ },
  ];

  const goal = profile.careerGoal || "your chosen career";
  const relevantSuggestions = suggestions.filter(
    item => item.match.test(goal)
  );

  const score = Math.min(
    100,
    30 +
      (profile.name ? 10 : 0) +
      (profile.role ? 10 : 0) +
      (profile.careerGoal ? 20 : 0) +
      Math.min(skills.length * 6, 30)
  );

  const missingSkills = relevantSuggestions
    .map(item => item.name)
    .filter(skill => !skills.some(userSkill =>
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    ));

  return (
    <div className="page">
      <div style={{ marginBottom: "30px" }}>
        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
          PORTIFY AI • CAREER INTELLIGENCE
        </p>
        <h1>AI Profile Analysis 🤖</h1>
        <p>
          Profile-based insights for your skills and career goal.
          These are starter recommendations, not an AI-generated assessment.
        </p>
      </div>

      <div className="card" style={{ marginBottom: "20px", textAlign: "center" }}>
        <p>PROFILE COMPLETENESS SCORE</p>
        <h1 style={{ fontSize: "64px", margin: "10px 0" }}>
          {score}<span style={{ fontSize: "28px" }}>/100</span>
        </h1>
        <p>
          {score >= 80
            ? "Your profile has a good amount of information."
            : score >= 55
            ? "You're making progress. Add more profile details and skills."
            : "Add your career goal and skills to build a stronger profile."}
        </p>
      </div>

      <div className="grid">
        <div className="card">
          <p>YOUR NAME</p>
          <h2>{profile.name || "Not added yet"}</h2>
        </div>
        <div className="card">
          <p>CURRENT ROLE</p>
          <h2>{profile.role || "Not added yet"}</h2>
        </div>
        <div className="card">
          <p>TARGET ROLE</p>
          <h2>{goal}</h2>
        </div>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <p>YOUR SKILLS</p>
        <h2>Current Skill Set</h2>
        {skills.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                style={{
                  padding: "8px 12px",
                  borderRadius: "20px",
                  background: "rgba(139, 92, 246, 0.12)",
                  border: "1px solid rgba(139, 92, 246, 0.25)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>No skills added yet. Add skills on your Profile page.</p>
        )}
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <p>SKILL DEVELOPMENT</p>
        <h2>Suggested Areas to Explore 🎯</h2>
        {missingSkills.length ? (
          missingSkills.map(skill => <p key={skill}>→ {skill}</p>)
        ) : (
          <p>
            Your listed skills cover these starter suggestions.
            Keep practising and build projects to strengthen them.
          </p>
        )}
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <p>CAREER EXPLORATION</p>
        <h2>Next Steps 🚀</h2>
        <p>→ Build a small project related to {goal}.</p>
        <p>→ Add your project details and code repository to your profile.</p>
        <p>→ Practise explaining your skills and project decisions.</p>
      </div>
    </div>
  );
}

export default AIAnalysis;