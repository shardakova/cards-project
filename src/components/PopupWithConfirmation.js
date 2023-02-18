import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor (selector) {
    super(selector);
    this._formElement = this._popupElement.querySelector('form');
    this._formButton = this._popupElement.querySelector('.button_type_form');
    this._formButtonText = this._formButton.textContent;
  }

  open (submitForm) {
    super.open();
    this._handleSubmitForm = submitForm;
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmitForm();
    });
  }

  setIsLoading (isLoading, loadingText) {
    if (isLoading) {
      this._formButton.textContent = loadingText || 'Загрузка...';
      this._formButton.disabled = true;
    } else {
      this._formButton.textContent = this._formButtonText;
      this._formButton.disabled = false;
    }
  }
}
