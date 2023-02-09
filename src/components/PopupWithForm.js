import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm, formValidator) {
    super(selector);
    this._formElement = this._popupElement.querySelector('form');
    // достаём все элементы полей
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._handleSubmitForm = submitForm;
    this._formValidator = formValidator;
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
}
