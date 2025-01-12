document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is ready");

  // Your code here
  // add listener for getting the form
  document
    .getElementById("usrInput")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // get the input value
      const ingredients = document.getElementById("ingredients").value;

      console.log(ingredients);

      try {
        const response = await fetch(
          `/recipeGenerator?ingredients=${ingredients}`
        );
        const data = await response.json();
        console.log(data);

        if (data.success) {
          const recipes = data.data;
          console.log(recipes);

          const recipeList = document.getElementById("recipeList");
          recipeList.innerHTML = "";

          recipes.forEach((recipe) => {
            const recipeItem = document.createElement("li");
            recipeItem.textContent = recipe.title;
            recipeList.appendChild(recipeItem);
          });
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    });
});
