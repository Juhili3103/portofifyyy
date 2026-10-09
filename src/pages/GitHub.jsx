
import { useState } from "react";

function GitHub() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeGitHub(e) {
    e.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setError("Please enter your GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/github/${encodeURIComponent(cleanUsername)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to fetch GitHub data.");
      }

      setData(result);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Make sure your server is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div style={{ marginBottom: "35px" }}>
        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
          PORTIFY AI • GITHUB ANALYZER
        </p>

        <h1>Connect Your GitHub 🐙</h1>

        <p>
          Let Portify AI understand your projects, repositories and technical
          skills.
        </p>
      </div>

      <div
        className="card"
        style={{ maxWidth: "750px", padding: "40px" }}
      >
        <div style={{ fontSize: "55px", marginBottom: "20px" }}>
          🐙
        </div>

        <h2>GitHub Profile</h2>

        <p style={{ marginBottom: "20px" }}>
          Enter your GitHub username to analyze your coding activity.
        </p>

        <form onSubmit={analyzeGitHub}>
          <input
            type="text"
            placeholder="e.g. octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="GitHub username"
          />

          <button
            type="submit"
            className="primary-btn"
            style={{ marginTop: "12px" }}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze GitHub →"}
          </button>
        </form>

        {error && (
          <p role="alert" style={{ color: "#ef4444", marginTop: "20px" }}>
            {error}
          </p>
        )}

        <div
          style={{
            marginTop: "30px",
            padding: "18px",
            borderRadius: "14px",
            background: "rgba(139, 92, 246, 0.08)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
          }}
        >
          <p style={{ fontSize: "14px" }}>
            💡 Portify AI fetches public repositories and profile details from
            GitHub.
          </p>
        </div>

        {data && (
          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <img
                src={data.profile.avatarUrl}
                alt={`${data.profile.username}'s GitHub avatar`}
                style={{
                  width: "85px",
                  height: "85px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <div>
                <h2>{data.profile.name || data.profile.username}</h2>
                <p>@{data.profile.username}</p>
                {data.profile.bio && <p>{data.profile.bio}</p>}
                <a
                  href={data.profile.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub Profile ↗
                </a>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                margin: "25px 0",
              }}
            >
              <div className="card">
                <h3>{data.profile.publicRepos}</h3>
                <p>Public repositories</p>
              </div>

              <div className="card">
                <h3>{data.profile.followers}</h3>
                <p>Followers</p>
              </div>
            </div>

            <h2>Repositories</h2>

            {data.repositories.length === 0 ? (
              <p>No public repositories found.</p>
            ) : (
              data.repositories.map((repo) => (
                <div
                  className="card"
                  key={repo.url}
                  style={{ marginTop: "15px", padding: "20px" }}
                >
                  <h3>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.name} ↗
                    </a>
                  </h3>

                  <p>{repo.description || "No description provided."}</p>

                  <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    {repo.language || "Language not specified"} · ⭐{" "}
                    {repo.stars}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHub;