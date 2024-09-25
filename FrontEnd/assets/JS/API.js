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
    const response = await fetch(`${API_BASE_URL}/works`);
    const data = await response.json();

    if (Array.isArray(data)) {
      return data; // Retourner la liste des projets
    } else {
      throw new Error("La réponse n'est pas un tableau");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    throw error;
  }
}

getProjects();

export async function categories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error("La réponse n'est pas un tableau");
    }
  } catch (error) {
    console.error("Erreur lors de la mise en place des catégories :", error);
    throw error;
  }
}
