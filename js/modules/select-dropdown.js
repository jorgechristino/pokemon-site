export default function initSelectDropdown() {
  const selectBtns = document.querySelectorAll('.select-btn');
  const selectOrder = document.querySelector('.select-order');
  const items = document.querySelectorAll('.item');
  const itemsOrder = document.querySelectorAll('.item-order');

  selectOrder.addEventListener('click', () => {
    selectOrder.classList.toggle('open');
  });

  itemsOrder.forEach((itemOrder) => {
    itemOrder.addEventListener('click', () => {
      itemsOrder.forEach((i) => {
        if (i.classList.contains('checked')) {
          i.classList.toggle('checked');
        }
      });
      itemOrder.classList.toggle('checked');
      let btnText = selectOrder.querySelector('.btn-text');
      btnText.innerHTML = `${itemOrder.innerText}`;
    });
  });

  selectBtns.forEach((selectBtn) => {
    selectBtn.addEventListener('click', () => {
      selectBtn.classList.toggle('open');
    });
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      verifyItemsSelected();
    });
  });
}

export function verifyItemsSelected() {
  let checkedType = document.querySelectorAll('.items-type .checked');
  let checkedWeaknesses = document.querySelectorAll('.items-weaknesses .checked');
  let checkedAbility = document.querySelectorAll('.items-ability .checked');
  let checkedHeight = document.querySelectorAll('.items-height .checked');
  let checkedWeight = document.querySelectorAll('.items-weight .checked');
  let btnsText = document.querySelectorAll('.btn-text');

  if (checkedType.length > 0) {
    btnsText[1].innerHTML = `${checkedType.length} selected`;
  } else {
    btnsText[1].innerHTML = `Type`;
  }

  if (checkedWeaknesses.length > 0) {
    btnsText[2].innerHTML = `${checkedWeaknesses.length} selected`;
  } else {
    btnsText[2].innerHTML = `Weaknesses`;
  }

  if (checkedAbility.length > 0) {
    btnsText[3].innerHTML = `${checkedAbility.length} selected`;
  } else {
    btnsText[3].innerHTML = `Ability`;
  }

  if (checkedHeight.length > 0) {
    btnsText[4].innerHTML = `${checkedHeight.length} selected`;
  } else {
    btnsText[4].innerHTML = `Height`;
  }

  if (checkedWeight.length > 0) {
    btnsText[5].innerHTML = `${checkedWeight.length} selected`;
  } else {
    btnsText[5].innerHTML = `Weight`;
  }
}
