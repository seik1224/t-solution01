
/* ========================================
    헤더 Search 영역
  ======================================== */

const input = document.querySelector('#header .header-center .header-search-input');
const placeholder = document.querySelector('#header .header-search-input-placeholder');

input.addEventListener('input', () => {
  const filled = input.value.trim() !== '';
  placeholder.classList.toggle('hidden', filled);
  input.classList.toggle('filled', filled);
});

/* ========================================
    헤더 Sticky 영역
  ======================================== */

const header = document.getElementById('header');
const trigger = 350;

window.addEventListener('scroll', () => {
  header.classList.toggle('is-sticky', window.scrollY > trigger);
});

/* ========================================
    메인페이지 첫번째 섹션
    - 내 교과서 카드 슬라이드
  ======================================== */

const swiper = new Swiper('#main-content01 .main-content-card-wrap .swiper', {
  slidesPerView: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: '#main-content01 .main-content-card-wrap .swiper-button-next',
    prevEl: '#main-content01 .main-content-card-wrap .swiper-button-prev',
  },
  pagination: {
    el: '#main-content01 .main-content-card-wrap .swiper-pagination',
    clickable: true,
  },
});

// 각 슬라이드 초기화: active 태그 연결된 이미지만 보이도록
document.querySelectorAll('#main-content01 .main-content-card-wrap .swiper-slide').forEach(slide => {
  const tags = slide.querySelectorAll('.tag:not(.disabled)');
  const imgs = slide.querySelectorAll('img[data-book]');

  // 초기화: active 태그 찾기
  const activeTag = slide.querySelector('.tag.active');
  const activeBook = activeTag ? activeTag.getAttribute('data-book') : null;

  imgs.forEach(img => {
    if(img.getAttribute('data-book') === activeBook){
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });

  // 클릭 이벤트
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const book = tag.getAttribute('data-book');

      // 태그 active 처리
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      // 이미지 표시
      imgs.forEach(img => {
        if(img.getAttribute('data-book') === book) {
          img.style.display = 'block';
        } else {
          img.style.display = 'none';
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

const tabs = document.querySelectorAll('.main-slide-tab');
const contents = document.querySelectorAll('.main-slide-banner-wrap');
const totalBtn = document.querySelectorAll('.total-wrap');
const cancelBtn = document.querySelector('#modal-layer .modal-layer-cancel-wrap img');
const modal = document.querySelector('#modal-layer');

totalBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.toggle('active');
    document.body.style.overflow = 'hidden';
  });
});

cancelBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    contents.forEach(content => {
      content.style.display = 'none';
    });

    contents[index].style.display = 'block';
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
      type: 'fraction',
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
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';

    pauseBtn.addEventListener('click', () => {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        // 버튼 전환
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
      }
    });

    playBtn.addEventListener('click', () => {
      if (!swiper.autoplay.running) {
        swiper.autoplay.start();
        // 버튼 전환
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
      }
    });
  }

  return swiper;
}

const swiper_tab01 = createMainSwiper('tab-01');
const swiper_tab02 = createMainSwiper('tab-02');

/* ========================================
   메인페이지 두번째 섹션
   - 탭전환
  ========================================  */

const content02tabs = document.querySelectorAll('.main-content02-tab');
const contents02 = document.querySelectorAll(
  '#main-content02 .tab-01, #main-content02 .tab-02, #main-content02 .tab-03, #main-content02 .tab-04'
);

content02tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    content02tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    contents02.forEach(content => content.classList.add('displaynone'));
    contents02[index].classList.remove('displaynone');
  });
});


/* ========================================
   메인페이지 세번째 섹션
   - 수업도구 슬라이드
  ========================================  */
  
const swiperContainer = document.querySelector("#main-content03 .swiper");
const swiperWrapper = swiperContainer.querySelector(".swiper-wrapper");
const slides = swiperWrapper.querySelectorAll(".swiper-slide");

// 원본 슬라이드 복제하여 추가 (loop 모드가 제대로 작동하도록)
slides.forEach((slide) => {
  const clonedSlide = slide.cloneNode(true);
  swiperWrapper.appendChild(clonedSlide);
});

const swiper03 = new Swiper('#main-content03 .swiper', {
  slidesPerView: 6,
  slidesPerGroup: 1,
  spaceBetween: 16,
  loop: true,
  loopAdditionalSlides: 14,
  navigation: {
    nextEl: '.main-content-03-swiper-button-next',
    prevEl: '.main-content-03-swiper-button-prev',
  },
});


/* ========================================
   메인페이지 네번째 섹션
   - 로고 슬라이드
  ========================================  */

const swiper04 = new Swiper('#main-content04 .swiper', {
  slidesPerView: 6,
  spaceBetween: 60,
  loop: true,
  loopAdditionalSlides: 6,

  navigation: {
    nextEl: '.main-content-04-swiper-button-next',
    prevEl: '.main-content-04-swiper-button-prev',
  },

  on: {
    init(swiper) {
      syncVideoByActiveSlide(swiper);
    },
    slideChange(swiper) {
      syncVideoByActiveSlide(swiper);
    }
  }
});

// 활성 슬라이드 기준으로 video-wrap 표시
function syncVideoByActiveSlide(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (!activeSlide) return;

  // 모든 video-wrap 숨기기
  const allVideoWraps = document.querySelectorAll('.main-content04-video-wrap');
  allVideoWraps.forEach(wrap => {
    wrap.classList.add('displaynone');
    wrap.classList.remove('active');
  });

  // 활성 슬라이드의 tab 클래스 가져오기
  const tabClass = Array.from(activeSlide.classList).find(cls => cls.startsWith('tab-'));
  if (!tabClass) return;

  // 해당 tab video-wrap 보여주기
  const videoWrap = document.querySelector(`.main-content04-video-wrap.${tabClass}`);
  if (!videoWrap) return;

  videoWrap.classList.remove('displaynone');
  videoWrap.classList.add('active');
}


/* ========================================
   메인페이지 다섯번째 섹션
   - 독서 슬라이드
   - active 슬라이드 크게 띄우기
  ========================================  */

const detailImg = document.querySelector('.main-content05-container .main-content-detail img');
const detailSubtitle = document.querySelector('.main-content-detail-subtitle p');
const detailTitle = document.querySelector('.main-content-detail-title p');
const detailDesc = document.querySelector('.main-content-detail-desc p');
const detailTag = document.querySelector('.main-content-detail-tag p');

const swiper05 = new Swiper('#main-content05 .swiper', {
  slidesPerView: 4,
  spaceBetween: 48,
  loop: true,
  loopAdditionalSlides: 6,
  navigation: {
    nextEl: '.main-content-05-swiper-button-next',
    prevEl: '.main-content-05-swiper-button-prev',
  },
  on: {
    init(swiper) {
      updateDetail(swiper);
    },
    slideChange(swiper) {
      updateDetail(swiper);
    }
  }
});

function updateDetail(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (!activeSlide) return;

  const slideImg = activeSlide.querySelector('img');
  if (slideImg) {
    detailImg.setAttribute('src', slideImg.getAttribute('src'));
    detailImg.setAttribute('alt', slideImg.getAttribute('alt') || '');
  }

  const subtitle = activeSlide.querySelector('.main-content-swiper-detail-subtitle p');
  const title = activeSlide.querySelector('.main-content-swiper-detail-title p');
  const desc = activeSlide.querySelector('.main-content-swiper-detail-desc p');
  const tag = activeSlide.querySelector('.main-content-swiper-detail-tag p');

  if (subtitle) detailSubtitle.textContent = subtitle.textContent;
  if (title) detailTitle.textContent = title.textContent;
  if (desc) detailDesc.textContent = desc.textContent;
  if (tag) detailTag.textContent = tag.textContent;
}


/* ========================================
   퀵메뉴
  ========================================  */

let isLoggedIn = false;

const quickMenu = document.getElementById('quickMenu');
const menuToggle = document.getElementById('menuToggle');
const loginState = document.getElementById('loginState');
const loggedInState = document.getElementById('loggedInState');
const loginBtn = document.querySelector('.login-btn');
const logoutLink = document.querySelector('.logout-link');
const topBtn = document.querySelector('.top-btn');
const loginIcon = document.querySelector('.Login-icon');

menuToggle.addEventListener('click', () => {
    quickMenu.classList.toggle('collapsed');
});

loginBtn.addEventListener('click', () => {
    isLoggedIn = true;
    updateLoginState();
});

logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLoggedIn = false;
    updateLoginState();
});

function updateLoginState() {
  const userName = loginIcon.querySelector('.Login-icon .user-name');
  const loginImg = loginIcon.querySelector('.Login-icon img');

  if (isLoggedIn) {
      loginState.style.display = 'none';
      loggedInState.style.display = 'flex';
      userName.classList.add('active');
  } else {
      loginState.style.display = 'flex';
      loggedInState.style.display = 'none';
      userName.classList.remove('active');
  }
}

/* ========================================
   top 버튼
  ========================================  */
topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ========================================
   하단 family-site
  ========================================  */

const familySite = document.querySelector('.family-site-wrap');
const familyBtn = familySite.querySelector('.family-btn');

  familyBtn.addEventListener('click', () => {
    familySite.classList.toggle('active');
    familyBtn.classList.toggle('active');
  });

    document.addEventListener('click', (e) => {
    if (!familySite.contains(e.target)) {
      familySite.classList.remove('active');
      familyBtn.classList.remove('active');
    }
  });
  

  