//popup Profile
const popupProfileElem = document.querySelector('.popup_type_profile');
const buttonEditElem = document.querySelector('.button_type_edit');
const buttonCloseElem = popupProfileElem.querySelector('.button_type_close');
const profileFormElem = document.querySelector('.form_type_profile');
const profileNameInput = profileFormElem.querySelector('.form__input_profile_name');
const profileJobInput = profileFormElem.querySelector('.form__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//popup Card
const popupCardElem = document.querySelector('.popup_type_add-card');
const buttonAddElem = document.querySelector('.button_type_add');
const buttonCloseCardElem = popupCardElem.querySelector('.button_type_close');
const cardContainer = document.querySelector(".cards__list");
const cardFormElem = document.querySelector('.form_type_card');
const cardNameInput = cardFormElem.querySelector('.form__input_card_name');
const cardLinkInput = cardFormElem.querySelector('.form__input_card_link');
const cardName = document.querySelector('.card__title');
const cardLink = document.querySelector('.card__image');
//popup Image
const popupImageElem = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".figure__image");
const popupImageText = document.querySelector(".figure__caption");
const buttonCloseImageElem = document.querySelector('.button_type_close');

//popup Profile functions
function openPopupProfile () {
  popupProfileElem.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function closePopupProfile () {
  popupProfileElem.classList.remove('popup_opened');
}

function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopupProfile ()
}

//popup Card functions
function openPopupCard () {
  popupCardElem.classList.add('popup_opened');
  cardNameInput.value = cardName.textContent;
  cardLinkInput.value = cardLink.textContent;
}

function closePopupCard () {
  popupCardElem.classList.remove('popup_opened');
}

//popup Image functions
function openPopupImage () {
  popupImageElem.classList.add('popup_opened');
}

function closePopupImage () {
  popupImageElem.classList.remove('popup_opened');
}

function previewImage(cardImage, cardTitle) {
  popupImage.src = cardImage;
  popupImageText.textContent = cardTitle;
  popupImage.alt = cardTitle;
  openPopupImage();
}

//profile
buttonEditElem.addEventListener ('click', openPopupProfile);
buttonCloseElem.addEventListener ('click', closePopupProfile);
profileFormElem.addEventListener('submit', profileFormSubmitHandler);
//card
buttonAddElem.addEventListener ('click', openPopupCard);
buttonCloseCardElem.addEventListener ('click', closePopupCard);
//image
buttonCloseImageElem.addEventListener ('click', closePopupImage);

// Шаблоны
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Генерация карточки
const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
}

const handleLikeCard = (event) => {
  event.target.closest('.button_type_like').classList.toggle('button_type_like_active');
}

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const name = newCard.querySelector('.card__title');
  name.textContent = dataCard.name;

  const link = newCard.querySelector('.card__image');
  link.src = dataCard.link;

  const deleteBtn = newCard.querySelector('.button_type_del');
  deleteBtn.addEventListener('click', handleDeleteCard)

  const likeBtn = newCard.querySelector('.button_type_like');
  likeBtn.addEventListener('click', handleLikeCard)

  const cardImage = newCard.querySelector(".card__image");
  cardImage.addEventListener("click", () => previewImage(dataCard.link, dataCard.name));

  return newCard;
}

// Обработчики событий
const handleSubmitAddForm = (event) => {
  event.preventDefault();
  renderCard({ name: cardNameInput.value, link: cardLinkInput.value})
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopupCard();
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
