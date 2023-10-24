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

const navItems = document.querySelectorAll('.header-menu-item');

function setActiveLink() {
  const currentUrl = window.location.href;
  navItems.forEach(function (nav) {
    const navLink = nav.querySelector('.header-menu-link');
    if (navLink.href === currentUrl) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
}

function removeActiveLink() {
  navItems.forEach(function (nav) {
    const navLink = nav.querySelector('.header-menu-link');
    navLink.classList.remove('active');
  });
}

setActiveLink();

navItems.forEach(function (nav) {
  const navLink = nav.querySelector('.header-menu-link');
  navLink.addEventListener('click', removeActiveLink);
});
