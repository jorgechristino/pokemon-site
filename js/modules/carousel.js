const btnPrevious = document.querySelector('.previous');
const btnNext = document.querySelector('.next');
const buttonsWrapper = [btnPrevious, btnNext];
const slides = document.querySelector('.inner');
const wrapper = document.querySelector('.wrapper');

let percentage = (320 / 1880) * 100;
let position = 0;

btnPrevious.addEventListener('click', (e) => {
  position -= percentage;
  if (position < 0) {
    position += percentage;
  } else {
    slides.style.transform = `translateX(-${position}%)`;
  }
});

btnNext.addEventListener('click', (e) => {
  let numPerSlides = Math.floor(wrapper.clientWidth / 280) - 1;
  position += percentage;
  if (position + percentage * numPerSlides > 100) {
    position -= percentage;
  } else {
    slides.style.transform = `translateX(-${position}%)`;
  }
});
