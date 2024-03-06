export default function initMenuMobile() {
  const menuButton = document.querySelector(["[data-menu='button']"]);
  const menuList = document.querySelector(["[data-menu='list']"]);
  const menuClose = document.querySelector(["[data-menu='close']"]);
  const events = ['click', 'touchstart'];

  if (menuButton) {
    function openMenu(event) {
      menuButton.classList.add('active');
      menuList.classList.add('active');
      outsideClick(menuList, events, () => {
        menuButton.classList.remove('active');
        menuList.classList.remove('active');
      });
    }

    events.forEach((evento) => {
      menuButton.addEventListener('click', openMenu);
    });

    menuClose.addEventListener('click', () => {
      menuButton.classList.remove('active');
      menuList.classList.remove('active');
    });
  }
}

function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = 'data-outside';

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => {
        html.addEventListener(userEvent, handleOutsideClick);
      });
    });
    element.setAttribute(outside, '');
  }
  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}
