(function () {
  const tab = document.querySelector(".tab");
  const content2 = document.querySelector(".tab-content2");
  const content1 = document.querySelector(".tab-content1");
  tab.onclick = (e) => {
    const children = tab.children;
    var index = Array.prototype.indexOf.call(children, e.target);
    if (index === 0) {
      content1.classList.remove("hidden");
      content2.classList.add("hidden");
    } else {
      content1.classList.add("hidden");
      content2.classList.remove("hidden");
    }
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("li-active");
    }
    if (e.target && e.target.nodeName === "LI") {
      e.target.classList.add("li-active");
    }
  };
  window.onload = function () {
    var swiper = new Swiper(".swiper-container", {
      // autoplay: 3000,
      speed: 2000,
      autoplayDisableOnInteraction: false,
      loop: true,
      centeredSlides: true,
      slidesPerView: 2,
      // pagination: ".swiper-pagination",
      // paginationClickable: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      onInit: function (swiper) {
        swiper.slides[2].className = "swiper-slide swiper-slide-active"; //第一次打开不要动画
      },
      breakpoints: {
        668: {
          slidesPerView: 1,
        },
      },
    });
  };
})();
