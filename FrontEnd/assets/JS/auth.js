// @ts-nocheck
import { loginUser } from "./API.js";
import { openModal } from "./modal.js"; // Importation de la fonction openModal


// DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // 1. Gestion du formulaire de login
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      
      event.preventDefault(); // Empêche le rechargement de la page par défaut

      await authentificationAdmin(); // Appelle la fonction d'authentification
    });
  }

  // Gestion du bouton d'authentification (login/logout)
  const authButton = document.getElementById("authButton");

  if (authButton) {
    authButton.addEventListener("click", function () {

      if (AdminConnected()) {
        sessionStorage.removeItem("token"); // Déconnexion
        update(); // Met à jour l'interface après la déconnexion
      } else {
        window.location.href = "/login.html"; // Redirection vers la page de login
      }
    });
  }

  //  Gestion du bouton pour ajouter des photos
  const addPhotoBtn = document.getElementById("addPhoto");

  if (addPhotoBtn) {
    addPhotoBtn.addEventListener("click", function () {
      if (AdminConnected()) {
        openModal(); // Ouvre le modal si l'admin est connecté
      } else {
        alert("Vous devez être connecté pour modifier les photos.");
      }
    });
  }
});

// Fonction d'authentification
async function authentificationAdmin() {
  const adminEmail = document.getElementById("email").value;
  const adminPassword = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message"); // Sélection du conteneur d'erreur

  try {
    // Appelle l'API pour tenter de se connecter
    const result = await loginUser(adminEmail, adminPassword);

    // Vérifie immédiatement si un token est renvoyé
    if (result && result.token) {
      // Enregistrement du token en session et redirection si authentification réussie
      sessionStorage.setItem("token", result.token);
      errorMessage.style.display = "none"; // Cache le message d'erreur
      errorMessage.textContent = "";

      setTimeout(() => {
        window.location.href = "/Frontend/index.html";
      }, 500);
    } else {
      // Affiche le message d'erreur si le token est absent (échec de connexion)
      errorMessage.textContent = "Identifiants incorrects. Veuillez réessayer.";
      errorMessage.style.display = "block";
    }
  } catch (error) {
    // Gestion des erreurs lors de l'appel à l'API
    console.error("Erreur lors de l'authentification de l'admin :", error);
    errorMessage.textContent =
      "Mauvais identifiants de connexion, veuillez réessayer.";
    errorMessage.style.display = "block";
  }
}



// Vérification si l'admin est connecté
function AdminConnected() {
  const token = sessionStorage.getItem("token");
  return token !== null;
}

// Mise à jour de l'interface utilisateur, y compris la bannière d'édition
function update() {
  const authButton = document.getElementById("authButton");
  const addPhotoBtn = document.getElementById("addPhoto");
  const editBanner = document.getElementById("editBanner");
  const modifierButton = document.querySelector(".modifier"); // Sélectionne le bouton "Modifier"

  const isConnected = AdminConnected(); // Vérifie si l'admin est connecté

  if (authButton) {
    authButton.textContent = isConnected ? "logout" : "login";
  }

  if (addPhotoBtn) {
    addPhotoBtn.style.display = isConnected ? "inline-block" : "none";
  }

  // Affiche la bannière de mode édition si l'admin est connecté
  if (editBanner) {
    editBanner.style.display = isConnected ? "block" : "none";
  }

  // Affiche ou cache le bouton "Modifier" en fonction de la connexion de l'admin
  if (modifierButton) {
    modifierButton.style.display = isConnected ? "block" : "none";
  }
}

// Appel de la fonction de mise à jour pour vérifier l'état de connexion
update();
