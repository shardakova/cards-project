export default class Card {
  constructor (item, templateSelector, showPreviewImage, deleteCard, likeCard) {
    this._id = item._id;
    this._name = item.name;
    this._link = item.link;
    this._likesCount = item.likesCount;
    this._hasMyLike = item.hasMyLike;
    this._canBeDeleted = item.canBeDeleted;
    this._templateSelector = templateSelector;
    this._showPreviewImage = showPreviewImage;
    this._handleDeleteCard = deleteCard;
    this._handleLikeCard = likeCard;
  }

  _getTemplate () {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners () {
    this._deleteButton.addEventListener('click', this._handleDeleteCard);
    this._likeButton.addEventListener('click', () => this._handleLikeCard());
    this._cardImage.addEventListener('click', () => this._showPreviewImage(this._name, this._link));
  }

  generateCard () {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.button_type_del');
    this._likeButton = this._element.querySelector('.button_type_like');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likesCountElement = this._element.querySelector('.card__like_counter');
    this.setLikesCount(this._likesCount);
    this.setHasMyLike(this._hasMyLike);

    if (!this._canBeDeleted) {
      this._deleteButton.classList.add('button_type_del-hidden');
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  setLikesCount (count) {
    this._likesCount = count;
    this._likesCountElement.textContent = count;
  }

  getHasMyLike () {
    return this._hasMyLike;
  }

  setHasMyLike (hasMyLike) {
    this._hasMyLike = hasMyLike;
    if (this._hasMyLike) {
      this._likeButton.classList.add('button_type_like_active');
    } else {
      this._likeButton.classList.remove('button_type_like_active');
    }
  }

  remove () {
    this._element.remove();
    this._element = null;
  }
}
