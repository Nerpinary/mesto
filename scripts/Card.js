const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
  ];

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    };

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .cloneNode(true);
        return cardElement;
    };

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.place__name').textContent = this._name;
        this._element.querySelector('.place__image').src = `${this._link}`;
        this._element.querySelector('.place__image').alt = this._name;

        return this._element;
    };

    _openPopupImage(image, caption) {
        openPopup(popupImage);
        imagePopup.src = image;
        imagePopup.alt = caption;
        captionPopup.textContent = caption;
    };

    _setEventListeners() {
        this._element.querySelector('.place__image').addEventListener("click", () => {
            this._openPopupImage(this._link, this._name);
        });

        this._element.querySelector(".place__delete-button").addEventListener("click", (evt) => {
            evt.target.closest(".place").remove();
        });

        this._element.querySelector(".place__like").addEventListener("click", (evt) => {
            evt.target.classList.toggle("place__like_status_enabled");
        });
    }
}

function addCard(data, wrap) {
    const card = new Card(data, ".place-template");
    const cardElement = card.generateCard();
    wrap.prepend(cardElement);
};

initialCards.forEach((item) => {
  const card = new Card(item, ".place-template");
  const cardElement = card.generateCard();
  document.querySelector(".places__list").append(cardElement);
});