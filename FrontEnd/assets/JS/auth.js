import { loginUser } from "./API.js";
import { openModal } from "./modal.js"; // Importation de la fonction openModal

console.log("auth.js a été chargé");

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // 1. Gestion du formulaire de login
  const loginForm = document.getElementById("loginForm");
  console.log(loginForm);

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêche le rechargement de la page par défaut
      console.log("Formulaire soumis");
      await authentificationAdmin(); // Appelle la fonction d'authentification
    });
  }

  // Gestion du bouton d'authentification (login/logout)
  const authButton = document.getElementById("authButton");

  if (authButton) {
    authButton.addEventListener("click", function () {
      console.log("Bouton Login cliqué");

      if (AdminConnected()) {
        console.log("Déconnexion en cours...");
        sessionStorage.removeItem("token"); // Déconnexion
        update(); // Met à jour l'interface après la déconnexion
      } else {
        console.log("Redirection vers la page de login");
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
  console.log("authentificationAdmin a été appelée");
  try {
    const adminEmail = document.getElementById("email").value;
    const adminPassword = document.getElementById("password").value;

    const result = await loginUser(adminEmail, adminPassword);
    console.log("Résultat de la connexion :", result);

    if (result && result.token) {
      console.log("Connexion réussie, token reçu :", result.token);
      sessionStorage.setItem("token", result.token);
      console.log("Token stocké :", sessionStorage.getItem("token"));

      // Redirection après une petite pause
      setTimeout(() => {
        window.location.href = "/Frontend/index.html";
      }, 500);
    } else {
      console.error("Erreur: La réponse API ne contient pas de token");
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification de l'admin :", error);
  }
}

// Vérification si l'admin est connecté
function AdminConnected() {
  const token = sessionStorage.getItem("token");
  console.log("Admin Token (récupéré) :", token);
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
