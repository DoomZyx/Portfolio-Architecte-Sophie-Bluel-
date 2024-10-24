// @ts-nocheck
import { getProjects, getCategories } from "./API.js";

let categoriesList = [];
let projectsList = [];

export async function init() {
  categoriesList = await getCategories();
  projectsList = await getProjects();

  displayCategories();
  displayProjects();
}

export function displayCategories() {
  const filters = document.querySelector(".filters");

  filters.innerHTML = "";

  // Bouton pour afficher tous les projets
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("filter-button");
  allButton.dataset.categoryId = "all";
  filters.appendChild(allButton);

  categoriesList.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("filter-button");
    button.dataset.categoryId = category.id;
    filters.appendChild(button);
  });

  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const categoryId = e.target.dataset.categoryId;
      displayProjects(categoryId);
    });
  });
}

export function displayProjects(categoryId = "all") {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  const filteredProjects =
    categoryId === "all"
      ? projectsList
      : projectsList.filter(
          (project) => project.categoryId === parseInt(categoryId)
        );

  filteredProjects.forEach((project) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = project.imageUrl;
    img.alt = project.title;
    figcaption.textContent = project.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

init();
