let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
let popupEdit = document.querySelector("#popupEdit");
let popupAdd = document.querySelector("#popupAdd");
let popupImage = document.querySelector("#popupImage");
let closeEditButton = document.querySelector("#closeEditButton");
let closeAddButton = document.querySelector("#closeAddButton");
let inputName = document.querySelector(".popup__input_data_name");
let inputJob = document.querySelector(".popup__input_data_job");
let inputPlace = document.querySelector(".popup__input_data_place");
let inputLink = document.querySelector(".popup__input_data_link");
let textName = profile.querySelector(".profile__name");
let textJob = profile.querySelector(".profile__job");
let textPlace = document.querySelector("place__name");
let formElementEdit = document.querySelector("#formElementEdit");
let formElementAdd = document.querySelector("#formElementAdd");
const cardsList = document.querySelector(".places__list");
const cardsTemplate = document.querySelector(".place-template").content;
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

initialCards.forEach(function (element) {
    const cardsElement = cardsTemplate.cloneNode(true);

    cardsElement.querySelector(".place__name").textContent = element.name;
    cardsElement.querySelector(".place__image").src = element.link; 

    cardsElement.querySelector(".place__image").addEventListener("click", function () {
        openPopupImage(element.link, element.name);
    })

    const deleteCard = cardsElement.querySelector(".place__delete-button");
    deleteCard.addEventListener("click", function (evt) {
        evt.target.closest(".place").remove();
    });

    cardsElement.querySelector(".place__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("place__like_status_disabled");
        evt.target.classList.toggle("place__like_status_enabled");
    });

    cardsList.append(cardsElement)
}); 

function openPopupEdit() {
    popupEdit.classList.add("popup_opened");
    inputName.value = textName.textContent;
    inputJob.value = textJob.textContent;
};

function openPopupAdd() {
    popupAdd.classList.add("popup_opened");
};

function openPopupImage(image, caption) {
    popupImage.classList.add("popup_opened");
    
    const imagePopup = document.querySelector(".popup__image");
    const captionPopup = document.querySelector(".popup__image-caption");

    imagePopup.src = image;
    captionPopup.textContent = caption; 
};

function closePopup() {
    popupEdit.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    popupImage.classList.remove("popup_opened")
};

function saveChanges(event) {
    event.preventDefault();
    textName.textContent = inputName.value;
    textJob.textContent = inputJob.value;
    closePopup();
};

function addCard(placeValue, linkValue) {
    const placeTemplate = document.querySelector(".place-template").content;
    const cardElement = placeTemplate.querySelector(".place").cloneNode(true);
  
    cardElement.querySelector(".place__name").textContent = placeValue;
    cardElement.querySelector(".place__image").src = linkValue;

    cardElement.querySelector(".place__image").addEventListener("click", function () {
        openPopupImage(linkValue, placeValue);
    })

    const deleteCard = cardElement.querySelector(".place__delete-button");
    deleteCard.addEventListener("click", function (evt) {
        evt.target.closest(".place").remove();
    });

    cardElement.querySelector(".place__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__like_status_disabled");
    evt.target.classList.toggle("place__like_status_enabled");
  }); 

    cardsList.prepend(cardElement);
}

editButton.addEventListener("click", openPopupEdit);

addButton.addEventListener("click", openPopupAdd);

closeEditButton.addEventListener("click", closePopup);
closeAddButton.addEventListener("click", closePopup);
closeImageButton.addEventListener("click", closePopup);

formElementEdit.addEventListener("submit", saveChanges);

formElementAdd.addEventListener("submit", function addItem(event) {
    event.preventDefault();

    const place = document.querySelector(".popup__input_data_place");
    const link = document.querySelector(".popup__input_data_link");

    addCard(place.value, link.value);

    closePopup();
});
