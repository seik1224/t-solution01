/* =========================
   고등 수업 자료 섹션
========================= */
const resourceSwiper = new Swiper('#main-class-resource .swiper', {
  slidesPerView: 1,
  loop:true,
  navigation: {
    nextEl: '.main-class-resource-swiper-button-next',
    prevEl: '.main-class-resource-swiper-button-prev',
  },
});

// 탭 버튼들
const resourceTabs = document.querySelectorAll(
  '.main-class-resource-slide-wrap .tab'
);

/* =========================
   탭 클릭 → 슬라이드 이동
========================= */
resourceTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const index = Number(tab.dataset.index);

    // 탭 active 처리
    resourceTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // loop 대응 이동
    resourceSwiper.slideToLoop(index);
  });
});

/* =========================
   슬라이드 변경 → 탭 active
========================= */
resourceSwiper.on('slideChange', () => {
  const currentIndex = resourceSwiper.realIndex;

  resourceTabs.forEach(t => t.classList.remove('active'));
  resourceTabs[currentIndex].classList.add('active');
});