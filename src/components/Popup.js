export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._mousedownListener = this._handleOverlayClick.bind(this);
      this._keydownListener = this._handleEscUp.bind(this);
      console.log(this._popupElement);
    }

    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keydown", this._keydownListener);
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._keydownListener);
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
        document.addEventListener("mousedown", this._mousedownListener) 
    }
}