//popup Profile
const popupProfileElem = document.querySelector('.popup_type_profile');
const buttonEditElem = document.querySelector('.button_type_edit');
const profileFormElem = document.querySelector('.form_type_profile');
const profileNameInput = profileFormElem.querySelector('.form__input_profile_name');
const profileJobInput = profileFormElem.querySelector('.form__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//popup Card
const popupCardElem = document.querySelector('.popup_type_add-card');
const buttonAddElem = document.querySelector('.button_type_add');
const cardContainer = document.querySelector(".cards__list");
const cardFormElem = document.querySelector('.form_type_card');
const cardNameInput = cardFormElem.querySelector('.form__input_card_name');
const cardLinkInput = cardFormElem.querySelector('.form__input_card_link');
const buttonCloseList = document.querySelectorAll('.button_type_close');
//popup Image
const popupImageElem = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".figure__image");
const popupImageText = document.querySelector(".figure__caption");

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
  });
}

const profileFormSubmitHandler = (event) => {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfileElem)
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

// Шаблоны
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Генерация карточки
const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
}

const handleLikeCard = (event) => {
  event.target.classList.toggle('button_type_like_active');
}

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const name = newCard.querySelector('.card__title');
  name.textContent = dataCard.name;

  const link = newCard.querySelector('.card__image');
  link.src = dataCard.link;

  const buttonDelete = newCard.querySelector('.button_type_del');
  buttonDelete.addEventListener('click', handleDeleteCard)

  const buttonlike = newCard.querySelector('.button_type_like');
  buttonlike.addEventListener('click', handleLikeCard)

  const cardImage = newCard.querySelector(".card__image");
  cardImage.addEventListener("click", () => previewImage(dataCard.link, dataCard.name));

  return newCard;
}

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
const renderCard = (dataCard) => {
  cardContainer.prepend(generateCard(dataCard));
};

// Рендер всех карточек
cardFormElem.addEventListener("submit", handleSubmitAddForm);

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});


closePopupOverlay();
