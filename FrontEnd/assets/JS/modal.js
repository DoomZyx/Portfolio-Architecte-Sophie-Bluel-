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

// Fonction pour charger les photos
async function loadphoto() {
  console.log("Chargement des photos...");

  try {
    const response = await fetch(`http://localhost:5678/api/works`);
    const photos = await response.json();
    const gallery = document.getElementById("gallery");
    console.log(photos);

    // Vider la galerie avant d'ajouter les nouvelles photos
    gallery.innerHTML = "";

    // Parcourir les photos récupérées et les ajouter à la galerie
    photos.forEach((photo) => {
      const photoDiv = document.createElement("div");
      photoDiv.classList.add("photo-item");

      const img = document.createElement("img");
      img.src = photo.imageUrl; // Assurez-vous que c'est bien la clé correcte dans l'API
      img.alt = photo.title || "Image";

      photoDiv.appendChild(img);
      gallery.appendChild(photoDiv);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des photos :", error);
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

  // Fonction pour fermer toutes les modales
  function closeAllModals() {
    photoModal.style.display = "none";
    addPhotoModal.style.display = "none";
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
        photoIcon.style.display = "none";
        imagePreview.src = e.target.result; // Met à jour l'aperçu de l'image
        imagePreview.style.display = "block"; // Affiche l'aperçu
        console.log("Image affichée dans le conteneur"); // Vérification
      };

      reader.readAsDataURL(file); // Lire le fichier sélectionné
    } else {
      console.error("Aucun fichier sélectionné");
      imagePreview.style.display = "none"; // Si aucun fichier n'est sélectionné, cacher l'aperçu
      photoIcon.style.display = "block"; // Remettre l'icône
    }
  });

  // Gestion du formulaire d'ajout de photo
  addPhotoForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const photoName = document.getElementById("photoName").value;
    const photoCategory = document.getElementById("photoCategory").value;
    const file = photoFileInput.files[0];

    if (!file) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append("name", photoName);
    formData.append("file", file);
    formData.append("category", photoCategory);

    try {
      const token = sessionStorage.getItem("token"); // Récupérer le token d'authentification
      if (!token) {
        console.error("Token non trouvé, l'utilisateur n'est pas authentifié.");
        return;
      }

      // Envoi des données à l'API
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Photo ajoutée avec succès :", result);

        // Réinitialisation des éléments du formulaire
        photoFileInput.value = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
        photoIcon.style.display = "block";

        // Fermer le modal après succès
        closeAllModals();

        // Recharge la galerie pour afficher la nouvelle photo
        loadphoto(); // Recharge la galerie après ajout de la photo
      } else {
        console.error(
          "Erreur lors de l'ajout de la photo :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  });
});
