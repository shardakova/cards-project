import Popup from './Popup.js';
import {config} from "../utils/config";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm, formValidator) {
    super(selector);
    this._formElement = this._popupElement.querySelector('form');
    // достаём все элементы полей
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._handleSubmitForm = submitForm;
    this._formValidator = formValidator;
    this._formButton = this._popupElement.querySelector('.button_type_form');
    this._formButtonText = this._formButton.textContent;
  }

  open() {
    super.open();
    this._formValidator.resetValidation();
  }

  close() {
    super.close();
    this._formElement.reset();
    this._formValidator.resetValidation();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setIsFormSaving(isFormSaving, savingText) {
    if (isFormSaving) {
      this._formButton.textContent = savingText ? savingText : 'Сохранение...'
      this._formButton.classList.add(config.inactiveButtonClass)
      this._formButton.disabled = true;
    } else {
      this._formButton.textContent = this._formButtonText;
      this._formButton.classList.remove(config.inactiveButtonClass)
      this._formButton.disabled = false;
    }
  }
}
