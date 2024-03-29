import '../pages/index.css';
import { config } from '../utils/config.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'c50e0659-04f9-4bf8-9104-83ea027e1f40',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);

    const imagePopup = new PopupWithImage('.popup_type_image');
    imagePopup.setEventListeners();

    const initialCards = cards.map(card => ({
      _id: card._id,
      name: card.name,
      link: card.link,
      likesCount: card.likes.length,
      hasMyLike: !!card.likes.find(like => like._id === user._id),
      canBeDeleted: card.owner._id === user._id
    }));

    const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation');
    confirmationPopup.setEventListeners();

    const section = new Section({
      items: initialCards,
      renderer: item => {
        const card = new Card(
          item,
          '#card-template',
          (imageTitle, imageSrc) => {
            imagePopup.open(imageTitle, imageSrc);
          },
          () => {
            confirmationPopup.open(() => {
              confirmationPopup.setIsLoading(true, 'Удаление...');
              api.deleteCard(item._id).then(() => {
                card.remove();
                confirmationPopup.close();
              }).catch(err => {
                console.error(err);
              }).finally(() => {
                confirmationPopup.setIsLoading(false);
              });
            });
          },
          () => {
            api[card.getHasMyLike() ? 'deleteLike' : 'setLike'](item._id).then(response => {
              card.setLikesCount(response.likes.length);
              card.setHasMyLike(!!response.likes.find(like => like._id === user._id));
            }).catch(err => {
              console.error(err);
            });
          }
        );
        return card.generateCard();
      }
    },
    document.querySelector('.cards__list')
    );
    section.renderItems();

    const cardPopup = new PopupWithForm('.popup_type_add-card', elements => {
      cardPopup.setIsFormSaving(true);
      api.addCard({
        name: elements.cardName,
        link: elements.cardLink
      }).then(response => {
        section.addItem({
          _id: response._id,
          name: response.name,
          link: response.link,
          likesCount: response.likes?.length,
          hasMyLike: response.likes?.find(like => like._id === user._id),
          canBeDeleted: response.owner?._id === user._id
        });
        cardPopup.close();
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        cardPopup.setIsFormSaving(false);
      });
    }, formValidators['card-form']);
    cardPopup.setEventListeners();

    document.querySelector('.button_type_add').addEventListener('click', () => {
      cardPopup.open();
    });
  })
  .catch(err => {
    console.error(err);
  });

const nameInput = document.querySelector('.form__input_profile_name');
const aboutInput = document.querySelector('.form__input_profile_about');

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
  about: '.profile__about',
  avatar: '.profile__avatar'
});

const avatarPopup = new PopupWithForm('.popup_type_avatar', elements => {
  avatarPopup.setIsFormSaving(true);
  api.updateAvatar({
    avatar: elements.userAvatar
  }).then(response => {
    userInfo.setUserInfo(response);
    avatarPopup.close();
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    avatarPopup.setIsFormSaving(false);
  });
}, formValidators['avatar-form']);
avatarPopup.setEventListeners();

document.querySelector('.profile__avatar-button').addEventListener('click', () => {
  avatarPopup.open();
});

const profilePopup = new PopupWithForm('.popup_type_profile', elements => {
  profilePopup.setIsFormSaving(true);
  api.setUserInfo({
    name: elements.userName,
    about: elements.userAbout
  }).then(response => {
    userInfo.setUserInfo(response);
    profilePopup.close();
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    profilePopup.setIsFormSaving(false);
  });
}, formValidators['profile-form']);
profilePopup.setEventListeners();

document.querySelector('.button_type_edit').addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  nameInput.value = user.name;
  aboutInput.value = user.about;
  profilePopup.open();
});
