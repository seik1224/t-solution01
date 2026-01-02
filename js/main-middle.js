/* ========================================
    메인페이지 첫번째 섹션
    - 내 교과서 카드 슬라이드
  ======================================== */
let currentTagIndex = 0;

const swiper = new Swiper("#main-content01 .main-content-card-wrap .swiper", {
  slidesPerView: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: "#main-content01 .main-content-card-wrap .swiper-button-next",
    prevEl: "#main-content01 .main-content-card-wrap .swiper-button-prev",
  },
  pagination: {
    el: "#main-content01 .main-content-card-wrap .swiper-pagination",
    clickable: true,
  },

  on: {
    slideChange: () => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      applyTagByIndex(activeSlide, currentTagIndex);
    },
  },
});

document
  .querySelectorAll("#main-content01 .main-content-card-wrap .swiper-slide")
  .forEach((slide) => {
    const tags = slide.querySelectorAll(".tag:not(.disabled,.setting)");
    const imgs = slide.querySelectorAll("img[data-book]");

    applyTagByIndex(slide, currentTagIndex);

    tags.forEach((tag, index) => {
      tag.addEventListener("click", () => {
        currentTagIndex = index;
        applyTagByIndex(slide, currentTagIndex);
      });
    });
  });

function applyTagByIndex(slide, index) {
  const tags = slide.querySelectorAll(".tag:not(.disabled,.setting)");
  const imgs = slide.querySelectorAll("img[data-book]");

  if (!tags[index]) return;

  const book = tags[index].getAttribute("data-book");

  tags.forEach((t) => t.classList.remove("active"));
  tags[index].classList.add("active");

  imgs.forEach((img) => {
    const cardImg = img.closest(".card-img");
    const isMatch = img.getAttribute("data-book") === book;

    img.style.display = isMatch ? "block" : "none";
    if (cardImg) cardImg.style.display = isMatch ? "block" : "none";
  });
}


/* ========================================
   메인페이지 첫번째 섹션
   - 이벤트, 티솔 소식 슬라이드
   - 탭 전환
  ========================================  */

const tabs = document.querySelectorAll(".main-slide-tab");
const contents = document.querySelectorAll(".main-slide-banner-wrap");
const totalBtn = document.querySelectorAll(".total-wrap");
const cancelBtn = document.querySelector(
  "#modal-layer .modal-layer-cancel-wrap img"
);
const modal = document.querySelector("#modal-layer");

totalBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.toggle("active");
    document.body.style.overflow = "hidden";
  });
});

cancelBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "";
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach((content) => {
      content.style.display = "none";
    });

    contents[index].style.display = "block";
  });
});

function createMainSwiper(tabClass) {
  const swiper = new Swiper(`.main-slide-banner-wrap.${tabClass} .swiper`, {
    slidesPerView: 1,
    loop: false,
    autoplay:false,
    allowTouchMove: false,
    navigation: {
      nextEl: `.main-slide-banner-wrap.${tabClass} .banner-swiper-button-next`,
      prevEl: `.main-slide-banner-wrap.${tabClass} .banner-swiper-button-prev`,
    },
    pagination: {
      el: `.main-slide-banner-wrap.${tabClass} .banner-swiper-pagination`,
      clickable: true,
      type: "fraction",
    },
  });

  const pauseBtn = document.querySelector(
    `.main-slide-banner-wrap.${tabClass} .pauseBtn`
  );

  const playBtn = document.querySelector(
    `.main-slide-banner-wrap.${tabClass} .playBtn`
  );

  if (pauseBtn && playBtn) {
    // 초기 상태: playBtn 숨기고 pauseBtn 보이기
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";

    pauseBtn.addEventListener("click", () => {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        // 버튼 전환
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
      }
    });

    playBtn.addEventListener("click", () => {
      if (!swiper.autoplay.running) {
        swiper.autoplay.start();
        // 버튼 전환
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
      }
    });
  }

  return swiper;
}

const swiper_tab01 = createMainSwiper("tab-01");
const swiper_tab02 = createMainSwiper("tab-02");
