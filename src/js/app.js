
// import Swiper from "swiper";
import * as flsFunctions from "./modules/functions.js";
import {adaptiveMove} from "./modules/adaptive-move.js";
import {loadYandexMap} from "./modules/yandex-map.js";

// Запуск основных функций
flsFunctions.isWebp();
adaptiveMove();

// Состояния страницы
let isMenuOpened = false;

// Мобильное меню
const menuBtn = document.querySelector("#js-menu-btn");
const menuCloseBtn = document.querySelector("#js-menu-close");

function closeMenu() {
  document.documentElement.classList.remove("_menu-open");
  menuBtn.focus();
  isMenuOpened = false;
}

function openMenu() {
  document.documentElement.classList.add("_menu-open");
  menuCloseBtn.focus();
  isMenuOpened = true;
}

menuBtn.addEventListener("click", openMenu);
menuCloseBtn.addEventListener("click", closeMenu);

// Функции оверлея
const overlay = document.querySelector("#js-page-overlay");
overlay.onclick = () => {
  if (isMenuOpened) closeMenu();
};

// Слайдер с отзывами
const reviewsSlider = new Swiper(".reviews-slider__container", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  autoHeight: true,

  pagination: {
    el: ".js-reviews-pagination",
    bulletElement: "button",
    bulletClass: "reviews-slider__pagination-bullet",
    bulletActiveClass: "reviews-slider__pagination-bullet--active",
    clickable: true,
    clickableClass: "reviews-slider__pagination-bullet--clickable",
    currentClass: "reviews-slider__pagination-bullet--current",
    horizontalClass: "reviews-slider__pagination-bullet--horizontal",
    modifierClass: "reviews-slider__pagination-bullet__pagination--"
  },

  navigation: {
    prevEl: ".js-reviews-prev",
    nextEl: ".js-reviews-next"
  }
});

// Инициализация загрузчика яндекс-карты
loadYandexMap({
  wrapper: ".js-map-wrapper",
  loader: ".js-map-loader",
  coords: [56.053924, 92.942286],
  zoom: 17,
  markPosition: [56.053924, 92.942286],
  mark: "img/logo/logo-map.png",
  markSize: [47, 51],
  markOffset: [-23, -60]
});

// Слайдер с контролирующими органами
const controlOrgansSlider = {
  elemClass: ".js-slider-control-organs",
  media: "(max-width: 1100px)",
  swiper: null,
  mathMedia: null,

  init() {
    if (this.mathMedia) return;

    this.mathMedia = window.matchMedia(this.media);
    this.mathMedia.addEventListener("change", this.checkMedia.bind(this));
    this.checkMedia();
  },

  checkMedia() {
    if (this.mathMedia.matches && !this.swiper) {
      this.initSwiper();
    } else if (this.swiper) {
      this.destroySwiper();
    }
  },

  initSwiper() {
    this.swiper = new Swiper(this.elemClass, {
      slidesPerView: "auto",
      freeMode: true,
    });
  },

  destroySwiper() {
    this.swiper.destroy();
    this.swiper = null;
  }
}.init();

// Таблица прайс-листа
const priceTable = document.querySelector(".js-price-table");
if (priceTable) {
  priceTable.addEventListener("click", (event) => {
    const btn = event.target.closest(".price-table__btn-show");

    if (!btn) return;

    const parent = btn.parentNode;
    const sublist = parent.querySelector("ul");
    const animate = flsFunctions.animate;

    if (parent.classList.contains("_open")) {
      hide()
    } else {
      show()
    }

    function show() {
      parent.classList.add("_open");

      const sublistHeight = sublist.offsetHeight;
      sublist.style.height = 0;

      animate({
        timing(t) {
          return t;
        },
        duration: Math.max(300, Math.min(sublistHeight, 1000)),

        draw(progress) {
          sublist.style.height = sublistHeight * progress + "px";
        },

        callback() {
          sublist.removeAttribute("style");
        }
      })
    }

    function hide() {
      const sublistHeight = sublist.offsetHeight;

      animate({
        timing(t) {
          return t;
        },
        duration: Math.max(300, Math.min(sublistHeight, 1000)),

        draw(progress) {
          sublist.style.height = sublistHeight - sublistHeight * progress + "px";
        },

        callback() {
          parent.classList.remove("_open");
          sublist.removeAttribute("style");
        }
      })
    }
  });
}
