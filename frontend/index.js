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

          data.data.forEach((recipe) => {
            const card = document.createElement("li");
            card.className = "card";
            // Create card content
            card.innerHTML = `
              <div class="card-content">
                <img src="${recipe.image}" alt="${recipe.title}" class="card-image">
                <div class="card-hover">
                  <p><b>Used Ingredients:</b> ${recipe.usedIngredients.join(", ")}</p>
                  <p><b>Missing Ingredients:</b> ${recipe.missedIngredients.join(", ")}</p>
                </div>
                <div class="container">
                  <h4>${recipe.title}</h4>
                </div>
              </div>
            `;
            // Redirect to recipe URL on click
            card.addEventListener("click", () => {
              window.open(recipe.recipeUrl, "_blank");
            });
            recipeList.appendChild(card);
            });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    });
});

const cardDiv = (recipe) => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.title;
  img.style.width = "100%";

  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h4");
  const bold = document.createElement("b");
  bold.textContent = recipe.title;
  title.appendChild(bold);

  container.appendChild(title);
  card.appendChild(img);
  card.appendChild(container);

  return card;
};
