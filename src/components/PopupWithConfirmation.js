import Popup from "./Popup";
import {config} from "../utils/config";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._formElement = this._popupElement.querySelector('form');
    this._handleSubmitForm = submitForm;
    this._formButton = this._popupElement.querySelector('.button_type_form');
    this._formButtonText = this._formButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmitForm();
    });
  }

  setIsLoading(isLoading, loadingText) {
    if (isLoading) {
      this._formButton.textContent = loadingText ? loadingText : 'Загрузка...';
      this._formButton.classList.add(config.inactiveButtonClass);
      this._formButton.disabled = true;
    } else {
      this._formButton.textContent = this._formButtonText;
      this._formButton.classList.remove(config.inactiveButtonClass);
      this._formButton.disabled = false;
    }
  }
}
