// отобразить ошибку в инпутах
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};
// скрыть ошибку в инпутах
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
};

// проверить валидность, показать/скрыть ошибку
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// проверить валидность всей формы
function isFormValid(inputList) {
  return inputList.every(inputElement => inputElement.validity.valid);
}

// сделать кнопку модального окна активной/неактивной
function toggleButtonState(inputList, buttonElement, config) {
  if (isFormValid(inputList)) {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.disabled = true;
  }
}

// проверить валидность
const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)]

  formList.forEach(formElement => {
    const inputList = [...formElement.querySelectorAll(config.inputSelector)]
    const buttonElement = formElement.querySelector(config.submitButtonSelector)

    inputList.forEach(inputElement => {
      inputElement.addEventListener ('input', () => {
        // 1. показать ошибку
        checkInputValidity(formElement, inputElement, config);
        // 2.сделать кнопку неактивной
        toggleButtonState(inputList, buttonElement, config);
      })
    })
  })
}

enableValidation ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_form',
  inactiveButtonClass: 'button_type_form-invalid',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__span-error'
})
