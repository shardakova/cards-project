export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._closeButtonElement = this._popupElement.querySelector('.button_type_close');
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleEscKeyPress = this._handleEscKeyPress.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  open() {
    document.addEventListener('keyup', this._handleEscKeyPress);
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keyup', this._handleEscKeyPress);
    this._popupElement.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._handleOutsideClick);
    this._closeButtonElement.addEventListener('click', this._handleCloseButtonClick);
  }

  _handleEscKeyPress(event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  _handleOutsideClick(event) {
    if(event.target === this._popupElement) {
      this.close();
    }
  }

  _handleCloseButtonClick() {
    this.close();
  }
}
