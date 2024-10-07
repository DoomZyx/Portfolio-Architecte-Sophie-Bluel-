const API_BASE_URL = "http://localhost:5678/api";

export async function loginUser(email, password) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ email, password });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const result = await response.json();
    return result; // Retourner les données de l'utilisateur
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
}

export async function getProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/works`); // URL de ton API pour les projets
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`); // Gestion des erreurs
    }
    const projects = await response.json();
    console.log("Projets récupérés :", projects); // Vérifier la réponse
    return projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return []; // Retourner un tableau vide en cas d'erreur pour éviter des plantages
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`); // URL de ton API pour les catégories
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`); // Gestion des erreurs
    }
    const categories = await response.json();
    console.log("Catégories récupérées :", categories); // Vérifier la réponse
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}
