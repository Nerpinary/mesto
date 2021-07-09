export default class Card {
  constructor({data, handleCardClick, user, handleDeleteClick, setLike, removeLike}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._user = user;
    this._likeMeter = data.likes;
    this._owner = data.owner._id;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._cardSelector = cardSelector;
    this._data = data;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".place").cloneNode(true);
  }

  setLike(data) {
    this._element.querySelector(".place__like").classList.add("place__like_status_enabled");
    this._element.querySelector(".place__like-meter").textContent = this._likes(data);
  }

  removeLike(data) {
    this._element.querySelector(".place__like").classList.remove("place__like_status_enabled");
    this._element.querySelector(".place__like-meter").textContent = this._likes(data);
  }

  _likes(data) {
    return String(data.likes.length);
  }

  _myLike() {
    this._data.likes.forEach((liker) => {
      if (liker._id === this._user) {
        this._element.querySelector(".place__like").classList.add("place__like_status_enabled");
      }
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._myLike()
    this._setEventListeners();

    this._element.querySelector(".place__name").textContent = this._name;
    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__image").alt = this._name;
    this._element.querySelector(".place__like-meter").textContent = this._likeMeter.length;
    
    if (this._owner === this._user) {
      this._element.querySelector(".place__delete-button").classList.remove("place__delete-button_hidden");
    }

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
      .addEventListener("click", () => {
        this.handleDeleteClick()
      });

    this._element
      .querySelector(".place__like")
      .addEventListener("click", () => {
        if (this._element.querySelector(".place__like").classList.contains("place__like_status_enabled")) {
          this._removeLike()
        } else {
          this._setLike()
        }
      });
  }

  deleteCard() {
    this._element.remove()
  }
}