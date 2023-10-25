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






const activeLinks = document.querySelectorAll('.header-menu-item');
const logoLink = document.querySelector('.header-logo-link');

let activeNavItemIndex = sessionStorage.getItem('activeNavItemIndex');

logoLink.addEventListener('click', function (e) {
  activeLinks.forEach(function (activeLink) {
    activeLink.classList.remove('active');
  });
  activeLinks[0].classList.add('active');
  sessionStorage.setItem('activeNavItemIndex', 0);
});

if (activeNavItemIndex === null) {
  activeNavItemIndex = 0;
}

if (activeNavItemIndex !== null) {
  activeLinks.forEach(function (nav, index) {
    const navLink = nav.querySelector('.header-menu-link');
    if (index == activeNavItemIndex) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
}

activeLinks.forEach(function (nav, index) {
  const navLink = nav.querySelector('.header-menu-link');

  navLink.addEventListener('click', function (e) {
    activeLinks.forEach(function (activeLink) {
      activeLink.classList.remove('active');
    });
    nav.classList.add('active');
    sessionStorage.setItem('activeNavItemIndex', index);
  });
});
