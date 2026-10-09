
import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a resume PDF, DOC, or DOCX first.");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("portifyUser") || "{}"
    );

    if (!user.id) {
      setMessage("Please log in again before uploading your resume.");
      return;
    }

    setLoading(true);
    setMessage("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        `http://localhost:5000/api/resume/${user.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Resume upload failed.");
      }

      setResult(data);
      setMessage("Resume uploaded successfully!");
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the backend. Make sure your backend server is running."
          : error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div style={{ marginBottom: "35px" }}>
        <p style={{ color: "#8b5cf6", fontWeight: "600" }}>
          PORTIFY AI • RESUME ANALYZER
        </p>

        <h1>Upload Your Resume 📄</h1>

        <p>
          Upload your resume and let Portify AI extract your professional
          information.
        </p>
      </div>

      <div
        className="card"
        style={{
          maxWidth: "750px",
          textAlign: "center",
          padding: "50px 30px",
        }}
      >
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>
          📄
        </div>

        <h2>Drop your resume here</h2>

        <p style={{ marginBottom: "25px" }}>
          Supported formats: PDF, DOC, DOCX (max 5 MB)
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setMessage("");
            setResult(null);
          }}
          style={{
            padding: "14px",
            marginBottom: "15px",
            maxWidth: "100%",
          }}
        />

        {file && <p>Selected file: {file.name}</p>}

        <div>
          <button
            type="button"
            className="primary-btn"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload & Analyze →"}
          </button>
        </div>

        {message && (
          <p role="status" style={{ marginTop: "20px" }}>
            {message}
          </p>
        )}

        {result && (
          <div
            className="card"
            style={{ marginTop: "20px", textAlign: "left" }}
          >
            <h3>Upload Result</h3>
            <p>{result.message}</p>
            {result.resume && (
              <p>File: {result.resume.originalName}</p>
            )}
          </div>
        )}

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Your resume will be used to build your AI-powered career profile.
        </p>
      </div>
    </div>
  );
}

export default ResumeUpload;