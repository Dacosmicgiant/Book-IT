document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5500, // Autoplay delay in milliseconds
        disableOnInteraction: false,
      },
      breakpoints: {
          280: { slidesPerView: 1, spaceBetween: 10 },
          320: { slidesPerView: 2, spaceBetween: 10 },
          510: { slidesPerView: 1, spaceBetween: 10 },
          758: { slidesPerView: 3, spaceBetween: 15 },
          900: { slidesPerView: 4, spaceBetween: 20 },
      }
    });
  });
  