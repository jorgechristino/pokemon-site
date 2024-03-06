export default function initModal() {
  const closeButton = document.querySelector(['[data-modal="close"]']);
  const constainerModal = document.querySelector(['[data-modal="container"]']);

  if (closeButton && constainerModal) {
    function cliqueForaModal(event) {
      if (event.target === this) toggleModal(event);
    }

    closeButton.addEventListener('click', toggleModal);
    constainerModal.addEventListener('click', cliqueForaModal);
  }
}

export function toggleModal(event) {
  const constainerModal = document.querySelector(['[data-modal="container"]']);
  event.preventDefault();
  constainerModal.classList.toggle('active');
}
