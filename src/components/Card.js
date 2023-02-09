export default class Card {
  constructor(data, templateSelector, showPreviewImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._showPreviewImage = showPreviewImage;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {

    this._deleteButton.addEventListener('click', () => this._handleDeleteCard());

    this._likeButton.addEventListener('click', () => this._handleLikeCard());
    this._cardImage.addEventListener('click', () => this._showPreviewImage(this._name, this._link));
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('button_type_like_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.button_type_del');
    this._likeButton = this._element.querySelector('.button_type_like');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
