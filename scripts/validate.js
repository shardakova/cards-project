// отобразить ошибку в инпутах
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    //убрать ошибку
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    //показать
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
}

// сделать кнопку неактивной
const toggleButton = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid)

  if(isFormValid) {
    // раздизейблить
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = '';
  } else {
    // задизейблить
    button.classList.add(config.inactiveButtonClass)
    button.disabled = 'disabled';
  }
}

// проверить валидность
const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)]

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)]
    const button = form.querySelector(config.submitButtonSelector)

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    inputs.forEach(input => {
      input.addEventListener ('input', () => {
        // 1. показать ошибку
        checkInputValidity(input, config);
        // 2. задизейблить кнопку
        toggleButton(inputs, button, config);
      })
    })
  })
}

enableValidation ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_form',
  inactiveButtonClass: 'button_type_form_invalid',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__span-error'
})
