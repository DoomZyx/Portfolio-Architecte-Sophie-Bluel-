// @ts-nocheck
import { getProjects } from "./API.js";
import { displayProjects, displayCategories, init } from "./gallery.js";

// Premier Modal

const photoModal = document.getElementById("photoModal");
const addPhotoBtn = document.getElementById("addPhoto"); // Bouton "Modifier"
const closeModal = document.getElementsByClassName("close")[0];

// Définition correcte de la fonction openModal et exportation
export function openModal() {
  console.log("openModal a été appelé"); // Log pour vérifier l'appel

  if (photoModal) {
    photoModal.style.display = "block"; // Affiche le modal
    loadphoto(); // Charge les photos dans le modal
  } else {
    console.error("Le modal 'photoModal' est introuvable dans le DOM");
  }
}

// Fonction pour charger et afficher les photos
async function loadphoto() {
  console.log("Chargement des photos...");

  try {
    const response = await fetch(`http://localhost:5678/api/works`);
    const photos = await response.json();
    const gallery = document.getElementById("gallery");

    // Vider la galerie avant d'ajouter les nouvelles photos
    gallery.innerHTML = "";

    // Parcourir les photos récupérées et les ajouter à la galerie
    photos.forEach((photo) => {
      // Créer un conteneur pour chaque photo
      const photoDiv = document.createElement("div");
      photoDiv.classList.add("photo-item");
      photoDiv.style.position = "relative"; // S'assurer que le bouton est bien positionné

      // Créer et ajouter l'image
      const img = document.createElement("img");
      img.src = photo.imageUrl;
      img.alt = photo.title || "Image";
      photoDiv.appendChild(img);

      // Créer un bouton "Supprimer" pour chaque image
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`; // Utilise FontAwesome pour l'icône
      deleteBtn.classList.add("delete-photo-btn"); // Classe CSS pour styliser le bouton

      // Ajoute un event listener pour supprimer la photo
      deleteBtn.addEventListener("click", async () => {
        const confirmDelete = confirm(
          "Êtes-vous sûr de vouloir supprimer cette photo ?"
        );
        if (confirmDelete) {
          await deletePhoto(photo.id); // Fonction pour supprimer la photo via l'API
        }
      });

      // Ajouter le bouton "supprimer" au div de la photo
      photoDiv.appendChild(deleteBtn);

      // Ajouter le div contenant l'image et le bouton à la galerie
      gallery.appendChild(photoDiv);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des photos :", error);
  }
}

// Fonction pour supprimer une photo via l'API
async function deletePhoto(photoId) {
  try {
    const token = sessionStorage.getItem("token"); // Récupérer le token d'authentification
    const response = await fetch(`http://localhost:5678/api/works/${photoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Envoi du token dans les headers
      },
    });

    if (response.ok) {
      console.log("Photo supprimée avec succès");

      init();

      loadphoto(); // Recharge la galerie après suppression
    } else {
      console.error("Erreur lors de la suppression de la photo");
    }
  } catch (error) {
    console.error("Erreur lors de la requête de suppression :", error);
  }
}

// Fermer le modal lorsqu'on clique à l'extérieur de celui-ci
window.onclick = function (event) {
  if (event.target === photoModal) {
    photoModal.style.display = "none";
  }
};

window.addEventListener("click", function (event) {
  if (event.target === photoModal) {
    photoModal.style.display = "none";
  }
});

// Ajouter l'événement au bouton "Modifier"
addPhotoBtn?.addEventListener("click", openModal);

////////////////////////////////////////////////////

// 2e modal

document.addEventListener("DOMContentLoaded", function () {
  const photoModal = document.getElementById("photoModal");
  const addPhotoModal = document.getElementById("addPhotoModal");
  const addGalleryPhotoButton = document.getElementById("addGalleryPhoto");
  const closeButtons = document.getElementsByClassName("close");
  const photoFileInput = document.getElementById("photoFile");
  const imagePreview = document.getElementById("imagePreview");
  const photoIcon = document.getElementById("photoIcon");
  const addPhotoForm = document.getElementById("addPhotoForm");
  const ButtPhoto = document.querySelector(".ButtPhoto");

  function resetform() {
    // Réinitialisation des éléments du formulaire
    photoFileInput.value = "";
    imagePreview.style.display = "none";
    imagePreview.src = "";
    document.getElementById("photoName").value = "";
    photoIcon.style.display = "block";
    ButtPhoto.style.display = "block";
  }

  // Fonction pour fermer toutes les modales
  function closeAllModals() {
    photoModal.style.display = "none";
    addPhotoModal.style.display = "none";
    resetform();
  }

  // Ouvrir le deuxième modal (Formulaire d'ajout de photo)
  addGalleryPhotoButton.addEventListener("click", function () {
    console.log("Bouton 'Ajouter une photo' cliqué");
    closeAllModals(); // Fermer le premier modal
    addPhotoModal.style.display = "block"; // Ouvrir le deuxième modal
  });

  // Fermer les modals lorsqu'on clique sur la croix
  Array.from(closeButtons).forEach((button) => {
    button.onclick = closeAllModals;
  });

  // Fermer les modals lorsqu'on clique à l'extérieur du modal
  window.onclick = function (event) {
    if (event.target === photoModal || event.target === addPhotoModal) {
      closeAllModals();
    }
  };

  // Vérifie si l'écouteur a déjà été ajouté
  document
    .querySelector(".ButtPhoto")
    .removeEventListener("click", handleButtPhotoClick);

  // Fonction de gestion du clic sur le bouton pour ouvrir le sélecteur de fichier
  function handleButtPhotoClick() {
    console.log("Click sur .ButtPhoto"); // Log pour vérifier que le click est déclenché une seule fois
    photoFileInput.click(); // Ouvre l'explorateur de fichiers
  }

  // Affichage de l'aperçu de l'image sélectionnée
  photoFileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Masquer l'icône et afficher l'image sélectionnée
        photoIcon.style.display = "none"; // Font awesome caché
        imagePreview.src = e.target.result; // Met à jour l'aperçu de l'image
        imagePreview.style.display = "block";
        ButtPhoto.style.display = "none"; // Affiche l'aperçu
        console.log("Image affichée dans le conteneur"); // Vérification
      };

      reader.readAsDataURL(file); // Lire le fichier sélectionné
    } else {
      console.error("Aucun fichier sélectionné");
      imagePreview.style.display = "none"; // Si aucun fichier n'est sélectionné, cacher l'aperçu
      photoIcon.style.display = "block";
      ButtPhoto.style.display = "block"; // Remettre l'icône
    }
  });

  // Gestion du formulaire d'ajout de photo
  addPhotoForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const photoName = document.getElementById("photoName").value;
    const photoCategory = parseInt(
      document.getElementById("photoCategory").value
    );
    const file = photoFileInput.files[0];

    if (!file) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    // Sélection des ID du DOM pour valider la requête API POST Works
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", photoName);
    formData.append("category", photoCategory);

    try {
      // Récupérer le token d'authentification et l'enregistre
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token non trouvé, l'utilisateur n'est pas authentifié.");
        return;
      }

      // Envoi des données à l'API
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Ajouter le token dans les headers
        },
      });

      // Si c'est ok, photo et info transferer à l'API et rafraichissement
      if (response.ok) {
        const result = await response.json();
        console.log("Photo ajoutée avec succès :", result);

        // Fermer le modal après succès
        closeAllModals();

        // Rafraichissement des données des tableaux
        init();

        // Rafraichissemnt du formulaire
        resetform();

        // Recharge la galerie de la modale pour afficher la nouvelle photo
        loadphoto();

        displayProjects(); // Recharge la galerie principal

        // Sinon erreur lors de l'ajout
      } else {
        console.error(
          "Erreur lors de l'ajout de la photo :",
          response.statusText
        );
      }
      // Ou erreur lors de la requête
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  });
});
