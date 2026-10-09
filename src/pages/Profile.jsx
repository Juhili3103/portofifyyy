import { useState } from "react";

const API_URL = "http://localhost:5000";

function getSavedProfile() {
  const defaultProfile = {
    name: "",
    role: "B.E. CSE (AI/ML) Student",
    skills: "React, JavaScript, Python, AI/ML",
    careerGoal: "AI/ML Engineer",
    about:
      "I am a technology student interested in AI, machine learning and building useful digital products.",
  };

  try {
    const user = JSON.parse(
      localStorage.getItem("portifyUser") || "{}"
    );

    const profiles = JSON.parse(
      localStorage.getItem("portifyProfiles") || "{}"
    );

    const savedProfile = user.id
      ? profiles[user.id] || {}
      : JSON.parse(localStorage.getItem("portifyProfile") || "{}");

    return {
      ...defaultProfile,
      ...savedProfile,
      name: user.name || savedProfile.name || "",
    };
  } catch {
    return defaultProfile;
  }
}
  

function Profile() {
  const [analyzing, setAnalyzing] = useState(false);
  const handleAnalyzeResume = async () => {
  const user = JSON.parse(
    localStorage.getItem("portifyUser") || "{}"
  );

  if (!user.id) {
    alert("Please log in first.");
    return;
  }

  try {
    setAnalyzing(true);

    const response = await fetch(
      `${API_URL}/api/resume/analyze/${user.id}`,
      { method: "POST" }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Resume analysis failed.");
    }

    const details = data.details;

    const updatedProfile = {
      ...profile,
      skills: details.skills?.length
        ? details.skills.join(", ")
        : profile.skills,
      about: details.summary || profile.about,
      education: details.education || "",
      experience: details.experience || "",
    };

    setProfile(updatedProfile);

    localStorage.setItem(
      "portifyProfile",
      JSON.stringify(updatedProfile)
    );

    alert("Resume analyzed! Your profile has been updated.");
  } catch (error) {
    alert(error.message || "Could not analyze the resume.");
  } finally {
    setAnalyzing(false);
  }
};
  const [profile, setProfile] = useState(getSavedProfile);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("portifyProfile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  return (
    <div className="page">
      <div style={{ marginBottom: "30px" }}>
        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
          PORTIFY AI • YOUR PROFILE
        </p>

        <h1>Build Your Career Profile 👤</h1>

        <p>
          Add your skills, goals and experience so Portify AI can build
          your professional identity.
        </p>
      </div>

      <div className="card" style={{ maxWidth: "750px" }}>
        <h2>Personal Information</h2>
        <button
  type="button"
  className="primary-btn"
  onClick={handleAnalyzeResume}
  disabled={analyzing}
  style={{ marginBottom: "18px" }}
>
  {analyzing ? "Analyzing Resume..." : "✨ Analyze Resume & Auto-Fill"}
</button>

        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          name="role"
          value={profile.role}
          onChange={handleChange}
          placeholder="Current Role / Education"
        />

        <h2 style={{ marginTop: "25px" }}>Career Information</h2>

        <input
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="Skills"
        />

        <input
          name="careerGoal"
          value={profile.careerGoal}
          onChange={handleChange}
          placeholder="Target Career Role"
        />

        <textarea
          name="about"
          value={profile.about}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
        />

        <button
          type="button"
          className="primary-btn"
          onClick={handleSave}
          style={{ marginTop: "12px" }}
        >
          Save Profile →
        </button>
      </div>
    </div>
  );
}

export default Profile;