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

const express = require("express"); // Importing express for server creation
const path = require("path"); // Importing path for handling file paths
const dotenv = require("dotenv"); // Importing dotenv for environment variable management (useful for sensitive data like API keys)

const app = express(); // Create an instance of express
const PORT = 3000;// Define the port on which the server will listen

const axios = require("axios"); // Importing axios for making HTTP requests
dotenv.config(); // Load environment variables from .env file

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

    const recipes = response.data.map((recipe) => ({
      title: recipe.title,
      image: recipe.image,
      usedIngredients: recipe.usedIngredients.map(ing => ing.name), // Extracting used ingredients
      missedIngredients: recipe.missedIngredients.map(ing => ing.name), // Extracting missed ingredients
      recipeUrl: `https://spoonacular.com/recipes/${recipe.title.replace(
        / /g,
        "-"
      )}-${recipe.id}`,
    }));

    // Send the API response back to the user
    res.json({ success: true, data: recipes});
    
  } catch (error) {// Handle errors from the API request
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
