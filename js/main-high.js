/* ========================================
    메인페이지 첫번째 섹션
    - 내 교과서 카드 슬라이드
  ======================================== */
// Swiper 초기화
const socialSwiper = new Swiper(".swiper-01", {
  slidesPerView: 1,
  autoplay: false,
  allowTouchMove: false,
  navigation: {
    nextEl: ".swiper-01 .swiper-button-next",
    prevEl: ".swiper-01 .swiper-button-prev",
  },
  pagination: {
    el: ".swiper-01 .swiper-pagination",
  },
  observer: true,
  observeParents: true,
});

const scienceSwiper = new Swiper(".swiper-02", {
  slidesPerView: 1,
  autoplay: false,
  allowTouchMove: false,
  navigation: {
    nextEl: ".swiper-02 .swiper-button-next",
    prevEl: ".swiper-02 .swiper-button-prev",
  },
  pagination: {
    el: ".swiper-02 .swiper-pagination",
    clickable: true,
  },
  observer: true,
  observeParents: true,
});

const mathSwiper = new Swiper(".swiper-03", {
  slidesPerView: 1,
  autoplay: false,
  allowTouchMove: false,
  navigation: {
    nextEl: ".swiper-03 .swiper-button-next",
    prevEl: ".swiper-03 .swiper-button-prev",
  },
  pagination: {
    el: ".swiper-03 .swiper-pagination",
    clickable: true,
  },
  observer: true,
  observeParents: true,
});

// 태그 클릭 이벤트
const tags = document.querySelectorAll(".tag:not(.disabled)");
const subjects = document.querySelectorAll(".swiper-subject");

tags.forEach(tag => {
  tag.addEventListener("click", () => {
    // active 클래스 토글
    tags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");

    const target = tag.dataset.subject;

    subjects.forEach(sub => {
      if(sub.classList.contains(`swiper-${target}`)) {
        sub.classList.add('active');
      } else {
        sub.classList.remove('active');
      }
    });
  });
});


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
    autoplay: false,
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
