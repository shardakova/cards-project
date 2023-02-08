import '../pages/index.css';
import initialCards from '../utils/initialCards.js';
import { config } from '../utils/config.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const cardFormValidator = new FormValidator(config, document.querySelector('.form_type_card'));
const profileFormValidator = new FormValidator(config, document.querySelector('.form_type_profile'));

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

const userInfo = new UserInfo({
  name: 'Жак-Ив Кусто',
  job: 'Исследователь океана'
});

document.querySelector('.button_type_edit').addEventListener('click', () => {
  const popup = new PopupWithForm('.popup_type_profile', function (elements) {
    userInfo.setUserInfo({
      name: elements.userName.value,
      job: elements.userJob.value
    });
    this.close();
  }, profileFormValidator);
  popup.open();

  const user = userInfo.getUserInfo();
  document.querySelector('.form__input_profile_name').value = user.name;
  document.querySelector('.form__input_profile_job').value = user.job;
});

document.querySelector('.button_type_add').addEventListener('click', () => {
  const popup = new PopupWithForm('.popup_type_add-card', function (elements) {
    section.addItem({
      name: elements.cardName.value,
      link: elements.cardLink.value
    })
    this.close();
  }, cardFormValidator);
  popup.open();
});

const section = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card-template', (imageTitle, imageSrc) => {
        const popup = new PopupWithImage('.popup_type_image');
        popup.open(imageTitle, imageSrc);
      });
      return card.generateCard();
    }
  },
  document.querySelector('.cards__list')
);
section.render();
