import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._form.querySelector(".popup__submit")
      }
    
    _getInputValues() {
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        const inputValues = {};
        inputList.forEach(input => {
        inputValues[input.name] = input.value;
        console.log(inputValues);
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    loading(isLoading) {
        if (isLoading) {
          this._submitButton.textContent = 'Cохранение...'
        } else {
          this._submitButton.textContent = 'Сохранить'
        }
      }
}