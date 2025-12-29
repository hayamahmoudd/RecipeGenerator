# 🍳 Recipe Generator

Generate delicious recipes on the fly using ingredients you already have at home! This web application uses the Spoonacular API to find recipes based on your available ingredients.

![Recipe Generator Demo](RecipeGeneratorDemo.gif)

## ✨ Features

- 🔍 **Smart Recipe Search** - Enter ingredients you have and discover matching recipes
- 📊 **Ingredient Tracking** - See which of your ingredients are used and what's missing
- 🎨 **Beautiful UI** - Modern, responsive interface with gradient design
- 🔗 **Direct Recipe Links** - Click through to full recipes on Spoonacular
- ⚡ **Real-time Results** - Fast API integration for instant recipe suggestions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spoonacular API key ([Get one here](https://spoonacular.com/food-api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hayamahmoudd/RecipeGenerator.git
   cd RecipeGenerator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_spoonacular_api_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🎯 How to Use

1. Enter ingredients you have (e.g., "chicken, rice, tomatoes")
2. Click the search button
3. Browse through recipe suggestions
4. View which ingredients you have and which are missing
5. Click on a recipe to view full details on Spoonacular

## 🛠️ Built With

- **Backend:** Node.js, Express.js
- **API:** Spoonacular Food API
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **HTTP Client:** Axios
- **Development:** Nodemon

## 🔑 API Integration

This app uses the [Spoonacular API](https://spoonacular.com/food-api) to fetch recipe data. The `/recipeGenerator` endpoint queries the `findByIngredients` endpoint to retrieve recipes matching your input.
