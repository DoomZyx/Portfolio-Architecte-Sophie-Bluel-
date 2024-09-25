const projects = [
  {
    image: "assets/images/abajour-tahina.png",
    title: "Abajour Tahina",
  },

  {
    image: "assets/images/appartement-paris-v.png",
    title: "Appartement Paris V",
  },

  {
    image: "assets/images/restaurant-sushisen-londres.png",
    title: "Restaurant Sushisen - Londres",
  },

  {
    image: "assets/images/la-balisiere.png",
    title: "Villa “La Balisiere” - Port Louis",
  },

  {
    image: "assets/images/structures-thermopolis.png",
    title: "Structures Thermopolis",
  },

  {
    image: "assets/images/appartement-paris-x.png",
    title: "Appartement Paris X",
  },

  {
    image: "assets/images/le-coteau-cassis.png",
    title: "Pavillon “Le coteau” - Cassis",
  },

  {
    image: "assets/images/villa-ferneze.png",
    title: "Villa Ferneze - Isola d’Elba",
  },

  {
    image: "assets/images/appartement-paris-xviii.png",
    title: "Appartement Paris XVIII",
  },

  {
    image: "assets/images/bar-lullaby-paris.png",
    title: "Bar “Lullaby” - Paris",
  },

  {
    image: "assets/images/hotel-first-arte-new-delhi.png",
    title: "Hotel First Arte - New Delhi",
  },
];

const gallery = document.querySelector(".gallery");

projects.forEach((project) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = project.image;
  img.alt = project.title;
  figcaption.textContent = project.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  gallery?.appendChild(figure);
});

