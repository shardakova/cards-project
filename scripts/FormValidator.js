export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  // отобразить ошибку в инпутах
  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  // скрыть ошибку в инпутах
  _hideInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  // проверить валидность, показать/скрыть ошибку
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

// проверить валидность всей формы
  _isFormValid() {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  }

// сделать кнопку модального окна активной/неактивной
  _toggleButtonState() {
    if (this._isFormValid()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.disabled = true;
    }
  }

  // проверить валидность
  enableValidation() {
    this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener ('input', () => {
        // 1. показать ошибку
        this._checkInputValidity(inputElement);
        // 2.сделать кнопку неактивной
        this._toggleButtonState();
      })
    })
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
