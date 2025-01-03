const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Example API route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

//https://api.spoonacular.com/recipes/findByIngredients?ingredients=carrots,tomatoes&number=10&limitLicense=true&ranking=1&ignorePantry=false

// use this as reference
app.get('/externalExample', async (req, res) => {
    console.log(req.params)
    const apiResponse = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await apiResponse.json()

    console.log(data)
    res.json(data)

});

app.get('/recipeGenerator', async (req, res) => {
  console.log(req.params);

  const apiKey = 'ee68ae0f284644478fedb503667bdd5a'; 
  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=tomato,cheese`;

  try {
      const apiResponse = await fetch(apiUrl); 
      const data = await apiResponse.json(); 

      console.log(data); 
      res.json(data);   
  } catch (error) {
      console.error('Error fetching data:', error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
