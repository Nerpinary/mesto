export class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
    }
  
    open() {
        this._popupSelector.classList.add("popup_opened");
        this.setEventListeners();
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscUp.bind(this));
        document.removeEventListener("click", this._handleOverlayClick.bind(this));
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
        document.addEventListener("keydown", this._handleEscUp.bind(this));
        document.addEventListener("click", this._handleOverlayClick.bind(this));
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
    constructor(popupSelector, handleFormSubmit) {
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
      }
    
    _getInputValues() {

    }

    setEventListeners() {

    }

    close() {
      event.preventDefault()
      s
    }
}