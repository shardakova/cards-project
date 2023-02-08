export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._closeButtonElement = this._popupElement.querySelector('.button_type_close');
    this._onClickCloseButtonHandler = this._handleCloseButtonClick.bind(this);
    this._onEscKeyHandler = this._handleEscClose.bind(this);
    this._onClickOutsideHandler = this._handleOutsideClick.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  setEventListeners() {
    document.addEventListener('keyup', this._onEscKeyHandler);
    document.addEventListener('mousedown', this._onClickOutsideHandler);
    this._closeButtonElement.addEventListener('click', this._onClickCloseButtonHandler);
  }

  removeEventListeners () {
    document.removeEventListener('keyup', this._onEscKeyHandler);
    document.removeEventListener('mousedown', this._onClickOutsideHandler);
    this._closeButtonElement.removeEventListener('click', this._onClickCloseButtonHandler);
  }

  _handleEscClose(event) {
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
