import '../pages/index.css';
import initialCards from '../utils/initialCards.js';
import { config } from '../utils/config.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const nameInput = document.querySelector('.form__input_profile_name');
const jobInput = document.querySelector('.form__input_profile_job');

// Включение валидации
const formValidators = {};
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);

const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job',
});

const profilePopup = new PopupWithForm('.popup_type_profile', elements => {
  userInfo.setUserInfo({
    name: elements.userName,
    job: elements.userJob
  });
  profilePopup.close();
}, formValidators['profile-form']);
profilePopup.setEventListeners();

document.querySelector('.button_type_edit').addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  nameInput.value = user.name;
  jobInput.value = user.job;
  profilePopup.open();
});

const cardPopup = new PopupWithForm('.popup_type_add-card', elements => {
  section.addItem({
    name: elements.cardName,
    link: elements.cardLink
  });
  cardPopup.close();
}, formValidators['card-form']);
cardPopup.setEventListeners();

document.querySelector('.button_type_add').addEventListener('click', () => {
  cardPopup.open();
});

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const section = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card-template', (imageTitle, imageSrc) => {
        imagePopup.open(imageTitle, imageSrc);
      });
      return card.generateCard();
    }
  },
  document.querySelector('.cards__list')
);
section.renderItems();
