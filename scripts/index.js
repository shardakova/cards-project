const popupElem = document.querySelector('.popup');
const buttonEditElem = document.querySelector('.button_type_edit');
const buttonCloseElem = popupElem.querySelector('.button_type_close');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item_name');
const jobInput = formElement.querySelector('.form__item_activity');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__activity');

function openPopup () {
  popupElem.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup () {
  popupElem.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup ()
}

buttonEditElem.addEventListener ('click', openPopup);
buttonCloseElem.addEventListener ('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
