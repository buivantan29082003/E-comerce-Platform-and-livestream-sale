// OwlCarousel initialization
import $ from "jquery";
$(".category-carousel").owlCarousel({
  loop: true,
  margin: 26,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 3,
    },
    576: {
      items: 3,
    },
    768: {
      items: 4,
    },
    992: {
      items: 5,
    },
    1200: {
      items: 7,
    },
    1440: {
      items: 9,
    },
  },
});
// OwlCarousel initialization
$(".sale-carousel").owlCarousel({
  loop: true,
  margin: 26,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 2,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    },
    1440: {
      items: 6,
    },
  },
});

// OwlCarousel initialization
$(".slide-carousel").owlCarousel({
  loop: false,
  margin: 26,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1,
    },
    768: {
      items: 1,
    },
    992: {
      items: 1,
    },
    1200: {
      items: 1,
    },
    1440: {
      items: 1,
    },
  },
});
