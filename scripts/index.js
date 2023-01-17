//popup Profile
import InitialCards from "./InitialCards.js";
import { config } from "./config.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { popupProfileElem,
  buttonEditElem,
  profileFormElem,
  profileNameInput,
  profileJobInput,
  profileName,
  profileJob,
  popupCardElem,
  buttonAddElem,
  cardContainer,
  cardFormElem,
  cardNameInput,
  cardLinkInput,
  buttonCloseList,
  popupImageElem,
  popupImage,
  popupImageText } from "./constants.js";

const cardFormValidator = new FormValidator(config, cardFormElem);
const profileFormValidator = new FormValidator(config, profileFormElem);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

//popup Profile functions
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupEsc);
}

// Закрытие popup по клику на Esc
const closePopupEsc = (event) => {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Закрытие popup по клику на overlay
const closePopupOverlay = () => {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt)=> {
      if(evt.target === evt.currentTarget){
        closePopup(evt.target);
      }
    })
  })
};

const profileFormSubmitHandler = (event) => {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfileElem);
}

const openEditProfile = () => {
  openPopup(popupProfileElem);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

const previewImage = (cardImage, cardTitle) => {
  popupImage.src = cardImage;
  popupImageText.textContent = cardTitle;
  popupImage.alt = cardTitle;
  openPopup(popupImageElem);
}

//profile
buttonEditElem.addEventListener ('click', openEditProfile);
profileFormElem.addEventListener('submit', profileFormSubmitHandler);
//card
buttonAddElem.addEventListener ('click', ()=> openPopup(popupCardElem));

//закрытие popup по клику на крестик
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

// Обработчики событий
const handleSubmitAddForm = (event) => {
  event.preventDefault();
  renderCard({ name: cardNameInput.value, link: cardLinkInput.value})
  event.target.reset();
  const submitButton = event.submitter;
  submitButton.classList.add('button_type_form-invalid');
  submitButton.disabled = true;
  closePopup(popupCardElem);
};

// Добавление карточки
function generateCard(dataCard) {
  const card = new Card(dataCard, '#card-template', previewImage);
  return card.generateCard();
}

const renderCard = (dataCard) => {
  cardContainer.prepend(generateCard(dataCard));
};

// Рендер всех карточек
cardFormElem.addEventListener("submit", handleSubmitAddForm);

InitialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

closePopupOverlay();
