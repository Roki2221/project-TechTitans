const openMenu = document.querySelector('.open-mob-menu');
const mobMenu = document.querySelector('#mob-menu');
const closeMenu = document.querySelector('.close-mob-menu');

openMenu.addEventListener('click', onOpenMobMenu);
closeMenu.addEventListener('click', onCloseMobMenu);
window.addEventListener('resize', windowWidth);

function onOpenMobMenu() {
  mobMenu.style.display = 'block';
  openMenu.style.display = 'none';
  closeMenu.style.display = 'block';
}

function onCloseMobMenu() {
  mobMenu.style.display = 'none';
  openMenu.style.display = 'block';
  closeMenu.style.display = 'block';
}

function windowWidth() {
  if (window.innerWidth >= 768) {
    openMenu.style.display = 'none';
  } else {
    openMenu.style.display = 'block';
  }
}
windowWidth();


const activeLinks = document.querySelectorAll('.header-menu-link');

activeLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});