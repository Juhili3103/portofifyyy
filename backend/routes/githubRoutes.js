
const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
  res.json({ message: "GitHub routes are working!" });
});
// Get a public GitHub profile and its repositories
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username.trim();

    if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
      return res.status(400).json({
        message: "Please enter a valid GitHub username.",
      });
    }

    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "Portify-AI",
    };

    const profileResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      { headers }
    );

    if (profileResponse.status === 404) {
      return res.status(404).json({
        message: "GitHub user not found.",
      });
    }

    if (!profileResponse.ok) {
      return res.status(502).json({
        message: "Unable to fetch the GitHub profile right now.",
      });
    }

    const profile = await profileResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=20`,
      { headers }
    );

    if (!reposResponse.ok) {
      return res.status(502).json({
        message: "Profile found, but repositories could not be fetched.",
      });
    }

    const repositories = await reposResponse.json();

    res.json({
      profile: {
        username: profile.login,
        name: profile.name,
        bio: profile.bio,
        avatarUrl: profile.avatar_url,
        profileUrl: profile.html_url,
        publicRepos: profile.public_repos,
        followers: profile.followers,
      },
      repositories: repositories.map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        url: repo.html_url,
        stars: repo.stargazers_count,
      })),
    });
  } catch (error) {
    console.error("GitHub API error:", error.message);

    res.status(500).json({
      message: "An error occurred while fetching GitHub data.",
    });
  }
});

module.exports = router;