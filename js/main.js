/* ========================================
    헤더 Search 영역
  ======================================== */

const input = document.querySelector(
  "#header .header-center .header-search-input"
);
const placeholder = document.querySelector(
  "#header .header-search-input-placeholder"
);

input.addEventListener("input", () => {
  const filled = input.value.trim() !== "";
  placeholder.classList.toggle("hidden", filled);
  input.classList.toggle("filled", filled);
});

/* ========================================
    헤더 Sticky 영역
  ======================================== */

const header = document.getElementById("header");
const trigger = 350;

window.addEventListener("scroll", () => {
  header.classList.toggle("is-sticky", window.scrollY > trigger);
});

/* ========================================
    메인페이지 첫번째 섹션
    - 내 교과서 카드 슬라이드
  ======================================== */

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
});

document
  .querySelectorAll("#main-content01 .main-content-card-wrap .swiper-slide")
  .forEach((slide) => {
    const tags = slide.querySelectorAll(".tag:not(.disabled,.setting)");
    const imgs = slide.querySelectorAll("img[data-book]");

    // 초기화: active 태그 찾기
    const activeTag = slide.querySelector(".tag.active");
    const activeBook = activeTag ? activeTag.getAttribute("data-book") : null;

    imgs.forEach((img) => {
      if (img.getAttribute("data-book") === activeBook) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });

    // 클릭 이벤트
    tags.forEach((tag) => {
      tag.addEventListener("click", () => {
        const book = tag.getAttribute("data-book");

        // 태그 active 처리
        tags.forEach((t) => t.classList.remove("active"));
        tag.classList.add("active");

        // 이미지 표시
        imgs.forEach((img) => {
          if (img.getAttribute("data-book") === book) {
            img.style.display = "block";
          } else {
            img.style.display = "none";
          }
        });
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
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
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

/* ========================================
   메인페이지 두번째 섹션
   - 탭전환
  ========================================  */

const content02Wrap = document.querySelector("#main-content02");

if (content02Wrap) {
  const content02tabs = content02Wrap.querySelectorAll(".main-content02-tab");
  const contents02 = content02Wrap.querySelectorAll(
    ".tab-01, .tab-02, .tab-03, .tab-04"
  );

  if (content02tabs.length && contents02.length) {
    content02tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        content02tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        contents02.forEach((content) => content.classList.add("displaynone"));

        contents02[index]?.classList.remove("displaynone");
      });
    });
  }
}

/* ========================================
   메인페이지 세번째 섹션
   - 수업도구 슬라이드
  ========================================  */

// const content03 = document.querySelector("#main-content03");

// if (content03) {
//   const swiperContainer = content03.querySelector(".swiper");
//   const swiperWrapper = swiperContainer?.querySelector(".swiper-wrapper");

//   if (swiperContainer && swiperWrapper) {
//     const slides = swiperWrapper.querySelectorAll(".swiper-slide");

//     slides.forEach((slide) => {
//       swiperWrapper.appendChild(slide.cloneNode(true));
//     });

//     new Swiper(swiperContainer, {
//       slidesPerView: 6,
//       slidesPerGroup: 1,
//       spaceBetween: 16,
//       loop: true,
//       loopAdditionalSlides: 14,
//       navigation: {
//         nextEl: ".main-content-03-swiper-button-next",
//         prevEl: ".main-content-03-swiper-button-prev",
//       },
//     });
//   }
// }

const content03 = document.querySelector("#main-content03");

if (content03) {
  const carouselContainer = content03.querySelector(".swiper");
  const carouselWrapper = carouselContainer?.querySelector(".swiper-wrapper");
  const slides = carouselWrapper?.querySelectorAll(".swiper-slide");
  const nextButton = content03.querySelector(
    ".main-content-03-swiper-button-next"
  );
  const prevButton = content03.querySelector(
    ".main-content-03-swiper-button-prev"
  );

  if (carouselContainer && carouselWrapper && slides && slides.length > 0) {
    const slidesPerView = 6;
    const spaceBetween = 16;
    let currentIndex = 0;
    let isTransitioning = false;

    const totalSlides = slides.length;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    function getSlideWidth() {
      const containerWidth = carouselContainer.offsetWidth;
      const slideWidth =
        (containerWidth - spaceBetween * (slidesPerView - 1)) / slidesPerView;
      return slideWidth;
    }

    function updateCarousel(animate = true) {
      if (isTransitioning && !animate) return;

      const slideWidth = getSlideWidth();
      const translateX = -(currentIndex * (slideWidth + spaceBetween));

      if (animate) {
        carouselWrapper.style.transition = "transform 0.3s ease";
      } else {
        carouselWrapper.style.transition = "none";
      }

      carouselWrapper.style.transform = `translateX(${translateX}px)`;
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;

      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }

      updateCarousel(true);
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = maxIndex;
      }

      updateCarousel(true);
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    function setSlideWidths() {
      const slideWidth = getSlideWidth();
      slides.forEach((slide) => {
        slide.style.width = `${slideWidth}px`;
        slide.style.marginRight = `${spaceBetween}px`;
      });
    }

    setSlideWidths();

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setSlideWidths();
        updateCarousel(false);
      }, 100);
    });

    updateCarousel(false);
  }
}


/* ========================================
   메인페이지 네번째 섹션
   - 로고 슬라이드
  ========================================  */

  
const content04 = document.querySelector("#main-content04");

if (content04) {
  const carouselContainer = content04.querySelector(".swiper");
  const carouselWrapper = carouselContainer?.querySelector(".swiper-wrapper");
  const slides = carouselWrapper?.querySelectorAll(".swiper-slide");


  const nextButton = content04.querySelector(
    ".main-content-04-button-next"
  );
  const prevButton = content04.querySelector(
    ".main-content-04-button-prev"
  );

  if (carouselContainer && carouselWrapper && slides && slides.length > 0) {
    const slidesPerView = 7;
    const spaceBetween = 30;
    let currentIndex = 0;
    let isTransitioning = false;

    const totalSlides = slides.length;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    function getSlideWidth() {
      const containerWidth = carouselContainer.offsetWidth;
      const slideWidth =
        (containerWidth - spaceBetween * (slidesPerView - 1)) / slidesPerView;
      return slideWidth;
    }

    function updateShowSlides() {
      slides.forEach((slide, index) => {
        if (
          index >= currentIndex &&
          index < currentIndex + slidesPerView
        ) {
          slide.classList.add("show");
        } else {
          slide.classList.remove("show");
        }
      });
    }

    function updateCarousel(animate = true) {
      if (isTransitioning && !animate) return;

      const slideWidth = getSlideWidth();
      const translateX = -(currentIndex * (slideWidth + spaceBetween));

      if (animate) {
        carouselWrapper.style.transition = "transform 0.3s ease";
      } else {
        carouselWrapper.style.transition = "none";
      }

      carouselWrapper.style.transform = `translateX(${translateX}px)`;
      updateShowSlides(); // ⭐ 추가
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;

      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }

      updateCarousel(true);
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = maxIndex;
      }

      updateCarousel(true);
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    function setSlideWidths() {
      const slideWidth = getSlideWidth();
      slides.forEach((slide) => {
        slide.style.width = `${slideWidth}px`;
        slide.style.marginRight = `${spaceBetween}px`;
      });
    }

    setSlideWidths();

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setSlideWidths();
        updateCarousel(false);
      }, 100);
    });

    updateCarousel(false);
  }

  const logoItems = content04.querySelectorAll(".main-content04-logo-item");
  const videoWraps = content04.querySelectorAll(".main-content04-video-wrap");

  function getTabClass(el) {
    return [...el.classList].find(cls => cls.startsWith("tab-"));
  }

  function resetActive() {
    logoItems.forEach(item => item.classList.remove("active"));
    videoWraps.forEach(wrap => wrap.classList.remove("active"));
  }

  logoItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabClass = getTabClass(item);
      if (!tabClass) return;

      resetActive();

      item.classList.add("active");

      videoWraps.forEach(wrap => {
        if (wrap.classList.contains(tabClass)) {
          wrap.classList.add("active");
        }
      });
    });
  });

  const firstLogo = content04.querySelector(".main-content04-logo-item.tab-01");
  const firstVideo = content04.querySelector(".main-content04-video-wrap.tab-01");

  if (firstLogo && firstVideo) {
    firstLogo.classList.add("active");
    firstVideo.classList.add("active");
  }
}


/* ========================================
   메인페이지 다섯번째 섹션
   - 독서 슬라이드
   - active 슬라이드 크게 띄우기
  ========================================  */

/* =========================
   DOM
========================= */
const section = document.querySelector("#main-content05");

const swiperWrap = section.querySelector(".main-content05-swiper-wrap");
const wrapper = swiperWrap.querySelector(".swiper-wrapper");
const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));

const nextBtn = section.querySelector(".main-content-05-swiper-button-next");
const prevBtn = section.querySelector(".main-content-05-swiper-button-prev");

/* detail */
const detailImg = section.querySelector(".main-content-detail img");
const detailSubtitle = section.querySelector(".main-content-detail-subtitle p");
const detailTitle = section.querySelector(".main-content-detail-title p");
const detailDesc = section.querySelector(".main-content-detail-desc p");
const detailTag = section.querySelector(".main-content-detail-tag p");


/* =========================
   설정
========================= */
const VISIBLE_COUNT = 4;   // 7로 바꿔도 OK
const SLIDE_GAP = 48;
const TOTAL = slides.length;

let startIndex = 0;
let isAnimating = false;


/* =========================
   초기화
========================= */
render();
updateDetail(startIndex);


/* =========================
   렌더링
========================= */
function render() {
  wrapper.innerHTML = "";

  for (let i = 0; i < VISIBLE_COUNT; i++) {
    const index = (startIndex + i) % TOTAL;
    const slide = slides[index];

    slide.classList.toggle("is-active", i === 0);
    wrapper.appendChild(slide);
  }
}


/* =========================
   Detail 업데이트
========================= */
function updateDetail(index) {
  const slide = slides[index];
  if (!slide) return;

  const img = slide.querySelector("img");
  if (img) {
    detailImg.src = img.src;
    detailImg.alt = img.alt || "";
  }

  const subtitle = slide.querySelector(".main-content-swiper-detail-subtitle p");
  const title = slide.querySelector(".main-content-swiper-detail-title p");
  const desc = slide.querySelector(".main-content-swiper-detail-desc p");
  const tag = slide.querySelector(".main-content-swiper-detail-tag p");

  if (subtitle) detailSubtitle.textContent = subtitle.textContent;
  if (title) detailTitle.textContent = title.textContent;
  if (desc) detailDesc.textContent = desc.textContent;
  if (tag) detailTag.textContent = tag.textContent;
}


/* =========================
   슬라이드 너비
========================= */
function getSlideWidth() {
  const slide = wrapper.querySelector(".swiper-slide");
  if (!slide) return 0;
  return slide.offsetWidth + SLIDE_GAP;
}


/* =========================
   여러 칸 한번에 이동 (슈웅)
========================= */
function moveToIndexByClick(visibleIndex, targetIndex) {
  if (isAnimating) return;
  isAnimating = true;

  const distance = getSlideWidth() * visibleIndex;

  wrapper.style.transition = "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
  wrapper.style.transform = `translateX(-${distance}px)`;

  wrapper.addEventListener(
    "transitionend",
    () => {
      // 상태만 갱신
      startIndex = targetIndex;

      // DOM 재정렬 (툭 튀는 느낌 방지)
      wrapper.style.transition = "none";
      wrapper.style.transform = "translateX(0)";
      render();
      updateDetail(startIndex);

      isAnimating = false;
    },
    { once: true }
  );
}


/* =========================
   Prev / Next
========================= */
nextBtn.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  wrapper.style.transition = "transform 0.35s ease";
  wrapper.style.transform = `translateX(-${getSlideWidth()}px)`;

  wrapper.addEventListener(
    "transitionend",
    () => {
      startIndex = (startIndex + 1) % TOTAL;
      wrapper.style.transition = "none";
      wrapper.style.transform = "translateX(0)";
      render();
      updateDetail(startIndex);
      isAnimating = false;
    },
    { once: true }
  );
});

prevBtn.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  wrapper.style.transition = "transform 0.35s ease";
  wrapper.style.transform = `translateX(${getSlideWidth()}px)`;

  wrapper.addEventListener(
    "transitionend",
    () => {
      startIndex = (startIndex - 1 + TOTAL) % TOTAL;
      wrapper.style.transition = "none";
      wrapper.style.transform = "translateX(0)";
      render();
      updateDetail(startIndex);
      isAnimating = false;
    },
    { once: true }
  );
});


/* =========================
   Slide Click
   - 항상 오른쪽
   - 한번에 슈웅
========================= */
slides.forEach((slide, realIndex) => {
  slide.addEventListener("click", () => {
    if (isAnimating) return;

    const visibleSlides = wrapper.querySelectorAll(".swiper-slide");
    let visibleIndex = -1;

    visibleSlides.forEach((el, i) => {
      if (el === slide) visibleIndex = i;
    });

    if (visibleIndex <= 0) return;

    moveToIndexByClick(visibleIndex, realIndex);
  });
});



/* =========================
   수업 자료 섹션
   - 중등
   - 고등
========================= */

const resourceSection = document.querySelector("#main-class-resource");

if (resourceSection) {
  const swiperEl = resourceSection.querySelector(".swiper");
  const resourceTabs = resourceSection.querySelectorAll(
    ".main-class-resource-slide-wrap .tab"
  );

  if (swiperEl) {
    const resourceSwiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".main-class-resource-swiper-button-next",
        prevEl: ".main-class-resource-swiper-button-prev",
      },
    });

    if (resourceTabs.length) {
      resourceTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const index = Number(tab.dataset.index);
          if (Number.isNaN(index)) return;

          resourceTabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          resourceSwiper.slideToLoop(index);
        });
      });

      resourceSwiper.on("slideChange", () => {
        const currentIndex = resourceSwiper.realIndex;
        if (!resourceTabs[currentIndex]) return;

        resourceTabs.forEach((t) => t.classList.remove("active"));
        resourceTabs[currentIndex].classList.add("active");
      });
    }
  }
  
}

/* ========================================
   퀵메뉴
  ========================================  */

let isLoggedIn = false;

const quickMenu = document.getElementById("quickMenu");
const menuToggle = document.getElementById("menuToggle");
const loginState = document.getElementById("loginState");
const loggedInState = document.getElementById("loggedInState");
const loginBtn = document.querySelector(".login-btn");
const logoutLink = document.querySelector(".logout-link");
const topBtn = document.querySelector(".top-btn");
const loginIcon = document.querySelector(".Login-icon");

menuToggle.addEventListener("click", () => {
  quickMenu.classList.toggle("collapsed");
});

loginBtn.addEventListener("click", () => {
  isLoggedIn = true;
  updateLoginState();
});

logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLoggedIn = false;
  updateLoginState();
});

function updateLoginState() {
  const userName = loginIcon.querySelector(".Login-icon .user-name");
  const loginImg = loginIcon.querySelector(".Login-icon img");

  if (isLoggedIn) {
    loginState.style.display = "none";
    loggedInState.style.display = "flex";
    userName.classList.add("active");
  } else {
    loginState.style.display = "flex";
    loggedInState.style.display = "none";
    userName.classList.remove("active");
  }
}

/* ========================================
   top 버튼
  ========================================  */
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ========================================
   하단 family-site
  ========================================  */

const familySite = document.querySelector(".family-site-wrap");
const familyBtn = familySite.querySelector(".family-btn");

familyBtn.addEventListener("click", () => {
  familySite.classList.toggle("active");
  familyBtn.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!familySite.contains(e.target)) {
    familySite.classList.remove("active");
    familyBtn.classList.remove("active");
  }
});
