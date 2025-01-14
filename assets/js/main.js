/**
 * Template Name: Logis
 * Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

"use strict";
// Floating caption
const imgContent = document.querySelectorAll(".gallery__image__caption");
var x, y;
function showImgContent(e) {
  for (var i = 0; i < imgContent.length; i++) {
    x = e.pageX;
    y = e.pageY;
    imgContent[i].style.transform = `translate(${x}px, ${y}px)`;
  }
}
document.addEventListener("mousemove", showImgContent);
// Lightbox modal
const body = document.body;
const items = document.querySelectorAll(".gallery__item");
const modal = document.createElement("section");
const modalImg = document.createElement("img");
const modalPrev = createButton(prevItem);
const modalNext = createButton(nextItem);
const modalClose = createButton(closeModal);
let currentItem = 0;
let modalInstance;
modal.classList.add("gallery__modal");
modalPrev.classList.add("gallery__navigation--prev");
modalNext.classList.add("gallery__navigation--next");
modalClose.classList.add("gallery__navigation--close");
function createButton(action) {
  const button = document.createElement("button");
  button.addEventListener("click", action);
  return button;
}
function prevItem() {
  currentItem = (currentItem - 1 + items.length) % items.length;
  showModal();
}
function nextItem() {
  currentItem = (currentItem + 1) % items.length;
  showModal();
}
function closeModal() {
  modal.remove();
}
function showModal() {
  modalImg.image = items[currentItem].querySelector("img");
  modalImg.src = modalImg.image.src;
  modalImg.alt = modalImg.image.alt;
  modal.append(modalImg, modalPrev, modalNext, modalClose);
  document.body.appendChild(modal);
}
items.forEach(function (image) {
  image.addEventListener(
    "click",
    function () {
      /* Detect the image class name */
      var overlayOpen = this.className === "gallery__item";
      /**
       * Storing a reference to the opening image
       */
      if (overlayOpen) {
        modalInstance = this;
      }
      /**
       * Toggle the aria-hidden state on the overlay and the
       * no-scroll class on the body
       */
      modal.setAttribute("aria-hidden", !overlayOpen);
      body.classList.toggle("noscroll", overlayOpen);
      /**
       * Run the function that creates the modal content
       * and that appends it to the body
       */
      showModal();
      /**
       * On some mobile browser when the overlay was previously
       * opened and scrolled, if you open it again it doesn't
       * reset its scrollTop property
       */
      modal.scrollTop = 0;
      /**
       * Forcing focus for Assistive technologies.
       * Note that:
       * - if the modal has just a phrase and a button move the
       *   focus on the button,
       * - if the modal has a long text inside (e.g. a privacy
       *   statement) move the focus on the first heading inside
       *   the modal,
       * - otherwise just focus the modal.
       *
       * When you close the overlay restore the focus on the
       * button that opened the modal.
       */
      if (overlayOpen) {
        modal.focus();
      } else {
        modalInstance.focus();
        modalInstance = null;
      }
    },
    false
  );
});
/**
 * Attach class `noscroll` to the body to prevent background scrolling
 * and set `aria` attributes for accessible devices
 */
document.body.addEventListener("keyup", (ev) => {
  if (ev.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    modal.setAttribute("aria-hidden", "true");
    body.classList.toggle("noscroll", false);
    modalInstance.focus();
    modalInstance = null;
  }
});

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });
})();
