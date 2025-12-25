
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
  });
});

cancelBtn.addEventListener('click', () => {
  modal.classList.remove('active');
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

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        pauseBtn.textContent = '▶';
      } else {
        swiper.autoplay.start();
        pauseBtn.textContent = '⏸';
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
  
const swiper03 = new Swiper('#main-content03 .swiper', {
  slidesPerView: 6,
  spaceBetween: 20,
  loop: true,
  loopAdditionalSlides: 6,
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
  }
});


/* ========================================
   메인페이지 다섯번째 섹션
   - 독서 슬라이드
   - active 슬라이드 크게 띄우기
  ========================================  */

const detailImg = document.querySelector('.main-content05-container .main-content-detail img');
const detailSubtitle = document.querySelector('.main-content-detail-subtitle');
const detailTitle = document.querySelector('.main-content-detail-title');
const detailDesc = document.querySelector('.main-content-detail-desc');
const detailTag = document.querySelector('.main-content-detail-tag');

const swiper05 = new Swiper('#main-content05 .swiper', {
  slidesPerView: 4,
  spaceBetween: 20,
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

  const subtitle = activeSlide.querySelector('.main-content-swiper-detail-subtitle');
  const title = activeSlide.querySelector('.main-content-swiper-detail-title');
  const desc = activeSlide.querySelector('.main-content-swiper-detail-desc');
  const tag = activeSlide.querySelector('.main-content-swiper-detail-tag');

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
      loginImg.classList.add('hidden');
      userName.classList.add('active');
  } else {
      loginState.style.display = 'flex';
      loggedInState.style.display = 'none';
      loginImg.classList.remove('hidden');
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
const select = document.querySelector('.family-site-wrap form');
select.addEventListener('click', () => {
  select.classList.toggle('active');
});