const buttonEditElem = document.querySelector('.button_type_edit');
const popupElem = document.querySelector('.popup');
const buttonCloseElem = popupElem.querySelector('.button_type_close');

const onOpen = (popup) => {
  popup.classList.add('popup_opened');
};

const onClose = (popup) => {
  popup.classList.remove('popup_opened');
};

buttonEditElem.addEventListener('click', () => {
  onOpen(popupElem);
});

buttonCloseElem.addEventListener('click', () => {
  onClose(popupElem);
});
