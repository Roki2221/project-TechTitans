const button = document.querySelector('.btn-scroll');

button.addEventListener('click', onScrollUp);

window.addEventListener('scroll', onTrackScroll);

function onScrollUp(e) {
  if (window.scrollY > 0) {
    window.scrollBy(0, -50);
    setTimeout(onScrollUp, 10);
  }
}

function onTrackScroll(e) {
  if (window.scrollY > 400) {
    button.classList.add('btn-show');
  } else if (window.scrollY < 400) {
    button.classList.remove('btn-show');
  }
}
