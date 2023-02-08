import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, onSubmitForm, formValidator) {
    super(selector);
    this._formElement = this._popupElement.querySelector('form');
    this._onSubmitForm = onSubmitForm;
    this._onSubmitFormHandler = this._handleFormSubmit.bind(this);
    this._formValidator = formValidator;
  }

  open() {
    super.open();
    this._formValidator.resetValidation();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._onSubmitFormHandler);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formElement.removeEventListener('submit', this._onSubmitFormHandler);
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this._onSubmitForm(this._formElement.elements);
    this._formValidator.resetValidation();
    this._formElement.reset();
  }
}
