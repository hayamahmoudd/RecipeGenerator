/**
 * Haya Mahmoud
 * Recipe Generator Web App
 * Jan 1, 2025
 */

// npm start - start backend
// git add . (to add all changes)
// git status to ensure you're pushing what you're supposed to (no .env or senstive data)
// git commit -m "<insert message>"
// git push

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
const PORT = 3000;

const axios = require("axios");
dotenv.config();

// Serve static frontend files
app.use(express.static(path.join(__dirname, "./frontend")));

// Route to serve frontend.html at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/frontend.html"));
});

app.get("/recipeGenerator", async (req, res) => {
  // Capture user input
  const ingredients = req.query.ingredients; // Default if no input provided

  if (!ingredients) {
    res.json({ success: false, message: "No ingredients provided." });
  }

  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/findByIngredients",
      {
        params: {
          apiKey,
          ingredients,
        },
      }
    );

    // Send the API response back to the user
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
