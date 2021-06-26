export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this.handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".place__name").textContent = this._name;
    this._element.querySelector(".place__image").src = `${this._link}`;
    this._element.querySelector(".place__image").alt = this._name;
    
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".place__image")
      .addEventListener("click", () => {
        this.handleCardClick(this._link, this._name)
      });

    this._element
      .querySelector(".place__delete-button")
      .addEventListener("click", (evt) => {
        evt.target.closest(".place").remove()
      });

    this._element
      .querySelector(".place__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("place__like_status_enabled");
      });
  }
}