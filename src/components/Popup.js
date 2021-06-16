import UserInfo from "./UserInfo.js";
import {userInfo} from "./UserInfo.js"
import { textName, textJob, inputName, inputJob, formElementAdd, formElementEdit} from "../utils/constants.js";
import { addFormSubmit, editFormSubmit } from "../index.js";


export class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this.listener = this._handleOverlayClick.bind(this)
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
        this.setEventListeners()
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("click", this.listener);
    }

    _handleEscUp(evt) {
        if (evt.key === "Escape") {
          this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (
          evt.target.classList.contains("popup") ||
          evt.target.classList.contains("popup__close-button")
        ) {
          this.close();
        }
    }

    setEventListeners() {
        document.addEventListener("keydown", this._handleEscUp.bind(this), {once: true});
        document.addEventListener("click", this.listener) 
    }
}

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(image, caption) {
        const imagePopup = document.querySelector(".popup__image");
        const captionPopup = document.querySelector(".popup__image-caption");
        super.open()
        imagePopup.src = image;
        imagePopup.alt = caption;
        captionPopup.textContent = caption;
      }
}

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
      }
    
    _getInputValues() {
        const userInformation = new UserInfo(textName, textJob);
        userInformation.getUserInfo();
        inputName.value = userInfo.name;
        inputJob.value = userInfo.job;
    }

    setEventListeners() {
        super.setEventListeners();
        this._getInputValues();
        this._handleFormSubmit();
    }

    close() {
        super.close();
        formElementAdd.reset();
        formElementEdit.removeEventListener("submit", editFormSubmit)
        formElementAdd.removeEventListener("submit", addFormSubmit)
    }
}