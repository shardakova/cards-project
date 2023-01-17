export default class Card {
  constructor(data, templateSelector, previewImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._previewImage = previewImage;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._buttonDelete = this._element.querySelector('.button_type_del');
    this._buttonDelete.addEventListener('click', ()=> {
      this._handleDeleteCard();
    })
    this._buttonlike = this._element.querySelector('.button_type_like');
    this._buttonlike.addEventListener('click', ()=> {
      this._handleLikeCard();
    })

    this._cardImage.addEventListener('click', ()=> {
      this._previewImage(this._link, this._name);
    })
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._buttonlike.toggle('card__like-button_liked');
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
