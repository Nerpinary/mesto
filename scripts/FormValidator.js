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

    showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(config.errorClass);
    };
    
    hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    };
    
    checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    };
    
    resetButton = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
      toggleButtonState(inputList, buttonElement);
  };
  
    resetErrors(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement);
    });
  };
  
    hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    }; 
    
    toggleButtonState = (inputList, buttonElement) => {
      if (this.hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.removeAttribute("disabled");
      }
    }; 
    
    setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
      this.toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
          this.checkInputValidity(formElement, inputElement);
          this.toggleButtonState(inputList, buttonElement)
        });
        });
      };
    
  
    enableValidation = () => { 
      const formList = Array.from(document.querySelectorAll(this._formSelector)); 
      formList.forEach((formElement) => { 
        formElement.addEventListener("submit",  (evt) => { 
            evt.preventDefault(); 
        }); 
      this.setEventListeners(formElement); 
      }); 
  }; 
}; 

export {config, FormValidator};