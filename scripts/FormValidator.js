const config = {
    formSelector: ".popup__form", 
    inputSelector: ".popup__input", 
    submitButtonSelector: ".popup__submit", 
    inputErrorClass: "popup__input_data_error", 
    errorClass: "popup__input-error"
    };
    

class FormValidator {
    constructor(data) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    };

    _showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };
    
    _hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    };
    
    _checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(formElement, inputElement);
      }
    };
  
    _resetErrors(formElement) {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      inputList.forEach((inputElement) => {
        if (!inputElement.value) {
          this._hideInputError(formElement, inputElement);
        } else {
          this._checkInputValidity(formElement, inputElement);
        }
      });
    };
  
    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    }; 
    
    _toggleButtonState = (inputList, buttonElement) => {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.removeAttribute("disabled");
      }
    }; 
    
    _setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(formElement, inputElement);
          this._toggleButtonState(inputList, buttonElement)
        });
        });
      };
    
  
    enableValidation = (formElement) => { 
      this._resetErrors(formElement)
      formElement.addEventListener("submit",  (evt) => { 
        evt.preventDefault();
      }); 
      this._setEventListeners(formElement); 
  }; 
}; 

export {config, FormValidator};