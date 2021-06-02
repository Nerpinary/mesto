const config = {
    formSelector: ".popup__form", 
    inputSelector: ".popup__input", 
    submitButtonSelector: ".popup__submit", 
    inputErrorClass: "popup__input_data_error", 
    errorClass: "popup__input-error"
    };
    

class FormValidator {
    constructor(configure, form) {
        configure = config;
        this._form = form;
    };

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
    };

    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
          _showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          _hideInputError(formElement, inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    }; 

    _toggleButtonState = (inputList, buttonElement) => {
        if (_hasInvalidInput(inputList)) {
          buttonElement.setAttribute("disabled", true);
        } else {
          buttonElement.removeAttribute("disabled");
        }
    };

    _setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        _toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", function () {
            _checkInputValidity(formElement, inputElement);
            _toggleButtonState(inputList, buttonElement)
          });
        });
    };

    enableValidation = () => { 
        this._form.addEventListener("submit",  (evt) => { 
              evt.preventDefault(); 
        }); 
        _setEventListeners(formElement); 
    }; 
};