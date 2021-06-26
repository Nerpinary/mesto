import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._imagePopup = this._popupElement.querySelector(".popup__image");
        this._captionPopup = this._popupElement.querySelector(".popup__image-caption");
    }

    open(image, caption) {
        super.open()
        this._imagePopup.src = image;
        this._imagePopup.alt = caption;
        this._captionPopup.textContent = caption;
      }
}