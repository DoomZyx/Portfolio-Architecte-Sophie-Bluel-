// gallery.js

import { getProjects, getCategories } from "./api.js"; // On importe les fonctions getProjects et getCategories du fichier API pour pouvoir récupérer les projets et les catégories de notre API.

// Variables pour stocker les données localement
let categoriesList = []; // Ceci est un tableau vide où nous allons mettre toutes les catégories après les avoir récupérées.
let projectsList = []; // Ceci est un autre tableau vide pour mettre tous les projets récupérés.

async function init() {
  // Récupérer et stocker toutes les catégories et les projets au début
  categoriesList = await getCategories(); // On attend de récupérer toutes les catégories de l'API et on les met dans categoriesList.
  projectsList = await getProjects(); // On attend de récupérer tous les projets de l'API et on les met dans projectsList.

  // Afficher les catégories et les projets
  displayCategories(); // On appelle la fonction displayCategories pour afficher les boutons pour chaque catégorie.
  displayProjects(); // On appelle la fonction displayProjects pour afficher tous les projets au début (avant d'appliquer un filtre).
}

function displayCategories() {
  console.log("Catégories récupérées :", categoriesList); // On affiche dans la console ce que l'on a dans categoriesList pour vérifier que tout est bien récupéré.

  const filters = document.querySelector(".filters"); // On sélectionne l'endroit dans notre page HTML où se trouvent les filtres. C’est l'endroit où on va mettre les boutons de catégorie.

  // Bouton pour afficher tous les projets
  const allButton = document.createElement("button"); // On crée un nouveau bouton HTML.
  allButton.textContent = "Tous"; // Le texte de ce bouton sera "Tous", pour montrer tous les projets.
  allButton.classList.add("filter-button"); // On ajoute une classe "filter-button" à ce bouton pour qu’on puisse le styliser avec du CSS.
  allButton.dataset.categoryId = "all"; // On attribue une information cachée à ce bouton : categoryId vaut "all", pour dire que ce bouton montre tout.
  filters.appendChild(allButton); // On ajoute ce bouton à notre section "filters" dans le HTML.

  // Créer des boutons pour chaque catégorie
  categoriesList.forEach((category) => {
    // Pour chaque catégorie dans notre liste categoriesList, on va faire quelque chose.
    const button = document.createElement("button"); // On crée un bouton HTML pour cette catégorie.
    button.textContent = category.name; // Le texte de ce bouton sera le nom de la catégorie, par exemple "Nature" ou "Art".
    button.classList.add("filter-button"); // On lui donne la classe "filter-button" pour qu’il ait le même style que les autres.
    button.dataset.categoryId = category.id; // On attribue l'ID de la catégorie à ce bouton pour pouvoir s'en servir plus tard.
    filters.appendChild(button); // On ajoute ce bouton à la section des filtres dans le HTML.
  });

  // Ajouter des événements de clic pour filtrer les projets
  const filterButtons = document.querySelectorAll(".filter-button"); // On sélectionne tous les boutons qui ont la classe "filter-button".
  filterButtons.forEach((button) => {
    // Pour chaque bouton dans cette liste...
    button.addEventListener("click", (e) => {
      // On ajoute un écouteur qui attend qu'on clique sur ce bouton.
      const categoryId = e.target.dataset.categoryId; // Quand on clique, on récupère l'ID de la catégorie stockée dans le bouton (grâce à dataset).
      displayProjects(categoryId); // Ensuite, on appelle la fonction displayProjects avec cet ID pour afficher seulement les projets qui correspondent à cette catégorie.
    });
  });
}

function displayProjects(categoryId = "all") {
  console.log("Projets récupérés :", projectsList); // On affiche la liste des projets dans la console pour vérifier que tout est bien récupéré.

  const gallery = document.querySelector(".gallery"); // On sélectionne l'endroit dans la page HTML où se trouvent les projets, c'est ici que l'on va afficher les images.
  gallery.innerHTML = ""; // On efface tout ce qui était là avant pour faire de la place pour les nouveaux projets à afficher.

  // Filtrer les projets selon la catégorie
  const filteredProjects =
    categoryId === "all" // Si categoryId est "all"...
      ? projectsList // ...alors on garde tous les projets.
      : projectsList.filter(
          (project) => project.categoryId === parseInt(categoryId)
        ); // Sinon, on ne garde que les projets qui ont le même ID de catégorie que celui qu’on a cliqué.

  // Afficher les projets filtrés
  filteredProjects.forEach((project) => {
    // Pour chaque projet dans notre liste filtrée...
    const figure = document.createElement("figure"); // On crée un élément figure (comme une boîte) pour chaque projet.
    const img = document.createElement("img"); // On crée une image pour mettre dans la figure.
    const figcaption = document.createElement("figcaption"); // On crée une légende pour décrire l'image.

    img.src = project.imageUrl; // L'image vient de l'URL donnée par notre projet.
    img.alt = project.title; // Le texte alternatif de l'image est le titre du projet (important pour l'accessibilité).
    figcaption.textContent = project.title; // Le texte de la légende est aussi le titre du projet.

    figure.appendChild(img); // On ajoute l'image à la figure.
    figure.appendChild(figcaption); // On ajoute la légende à la figure.
    gallery.appendChild(figure); // Enfin, on ajoute la figure (qui contient l'image et la légende) à notre galerie.
  });
}

// Initialiser les données au chargement de la page
init(); // On appelle la fonction init() pour commencer tout le processus quand la page se charge.
