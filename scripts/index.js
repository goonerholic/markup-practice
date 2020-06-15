// hell of monolith!!!

const images = [
  {
    description: "Fall Berry Blitz Tea",
    url: "./img/img-berryblitz.jpg",
  },
  {
    description: "Spiced Rum Tea",
    url: "./img/img-spiced-rum.jpg",
  },
  {
    description: "Seasonal Donuts",
    url: "./img/img-donut.jpg",
  },
  {
    description: "Myrtle Ave Tea",
    url: "./img/img-myrtle-ave.jpg",
  },
  {
    description: "Bedford Bizarre Tea",
    url: "./img/img-bedford-bizarre.jpg",
  },
];

const imgPlaceholderURL = "./img/default-placeholder.png";

function renderImage() {
  const $menuArea = document.querySelector("#menu-area");
  images.forEach((image) => {
    const $figure = document.createElement("figure");
    $figure.className = "image-box";
    const $img = document.createElement("img");
    $img.className = "lazy";
    $img.src = imgPlaceholderURL;
    $img.dataset.src = image.url;
    const $figcaption = document.createElement("figcaption");
    $figcaption.innerHTML = `<h4>${image.description}</h4>`;
    $figure.append($img, $figcaption);
    $menuArea.appendChild($figure);
  });

  lazyLoad();
}

function lazyLoad() {
  const lazyImages = document.querySelectorAll("img.lazy");

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // polyfill for old browswers.... maybe later?
  }
}

window.addEventListener("DOMContentLoaded", renderImage);
