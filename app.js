// =====================
// Recipe Data
// =====================

const recipes = [
  { title: "Pasta Alfredo", difficulty: "easy", time: 25 },
  { title: "Chicken Curry", difficulty: "medium", time: 45 },
  { title: "Beef Steak", difficulty: "hard", time: 60 },
  { title: "Veg Salad", difficulty: "easy", time: 15 },
  { title: "Biryani", difficulty: "hard", time: 90 },
  { title: "Omelette", difficulty: "easy", time: 10 },
  { title: "Fried Rice", difficulty: "medium", time: 30 },
  { title: "Grilled Fish", difficulty: "medium", time: 35 }
];

// =====================
// State
// =====================

let currentFilter = "all";
let currentSort = "none";

// =====================
// DOM References
// =====================

const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// =====================
// Render Function
// =====================

const renderRecipes = (recipeList) => {
  recipeContainer.innerHTML = "";

  recipeList.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>Difficulty: <span class="tag">${recipe.difficulty}</span></p>
      <p>Time: <span class="tag">${recipe.time} mins</span></p>
    `;

    recipeContainer.appendChild(card);
  });
};

// =====================
// Filter Functions (PURE)
// =====================

const applyFilter = (recipes, filterType) => {

  switch (filterType) {
    case "easy":
      return recipes.filter(r => r.difficulty === "easy");

    case "medium":
      return recipes.filter(r => r.difficulty === "medium");

    case "hard":
      return recipes.filter(r => r.difficulty === "hard");

    case "quick":
      return recipes.filter(r => r.time < 30);

    default:
      return recipes;
  }
};

// =====================
// Sort Functions (PURE)
// =====================

const applySort = (recipes, sortType) => {

  const copy = [...recipes]; // prevent mutation

  switch (sortType) {
    case "name":
      return copy.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "time":
      return copy.sort((a, b) =>
        a.time - b.time
      );

    default:
      return recipes;
  }
};

// =====================
// Update Display
// =====================

const updateDisplay = () => {

  let result = recipes;

  result = applyFilter(result, currentFilter);
  result = applySort(result, currentSort);

  renderRecipes(result);

  console.log(
    `Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
  );
};

// =====================
// Active Button UI
// =====================

const updateActiveButtons = () => {

  filterButtons.forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.filter === currentFilter
    );
  });

  sortButtons.forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.sort === currentSort
    );
  });

};

// =====================
// Event Listeners
// =====================

filterButtons.forEach(button => {

  button.addEventListener("click", (e) => {

    currentFilter = e.target.dataset.filter;

    updateActiveButtons();
    updateDisplay();

  });

});

sortButtons.forEach(button => {

  button.addEventListener("click", (e) => {

    currentSort = e.target.dataset.sort;

    updateActiveButtons();
    updateDisplay();

  });

});

// =====================
// Init
// =====================

updateDisplay();