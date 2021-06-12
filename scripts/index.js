import { initialCards, Card } from "../components/Card.js";
import { config, FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {Popup, PopupWithImage, PopupWithForm} from "../components/Popup.js";

const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
export const popupImage = document.querySelector("#popupImage");
const inputName = document.querySelector(".popup__input_data_name");
const inputJob = document.querySelector(".popup__input_data_job");
const inputPlace = document.querySelector(".popup__input_data_place");
const inputLink = document.querySelector(".popup__input_data_link");
const textName = profile.querySelector(".profile__name");
const textJob = profile.querySelector(".profile__job");
const formElementEdit = document.querySelector("#formElementEdit");
const formElementAdd = document.querySelector("#formElementAdd");
const cardsList = document.querySelector(".places__list");
const validateAdd = new FormValidator(config, formElementAdd);
const validateEdit = new FormValidator(config, formElementEdit);

const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({data,
      handleCardClick: (link, image) => {
        const popupWithImage = new PopupWithImage(popupImage)
        popupWithImage.open(link, image)
      }}, ".place-template");
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, ".places__list")

cardList.renderItems();

/*
function addCard(data, wrap) {
  const card = new Card(data, ".place-template");
  const cardElement = card.generateCard();
  wrap.prepend(cardElement);
}

initialCards.reverse().forEach((item) => {
  addCard(item, cardsList);
});
*/

validateAdd.enableValidation();
validateEdit.enableValidation();

function profileFormSubmitHandler(event) {
  event.preventDefault();
  textName.textContent = inputName.value;
  textJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function cardFormSubmitHandler(event) {
  event.preventDefault();
  addCard(
    {
      name: inputPlace.value,
      link: inputLink.value,
    },
    cardsList
  );
  formElementAdd.reset();
  closePopup(popupAdd);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscUp);
  document.addEventListener("click", handleOverlayClick);
}

function openPopupEdit() {
  inputName.value = textName.textContent;
  inputJob.value = textJob.textContent;
  validateEdit.resetErrors();
  openPopup(popupEdit);
}

function handleEscUp(evt) {
  const popupActive = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupActive);
  }
}

function handleOverlayClick(evt) {
  const popupActive = document.querySelector(".popup_opened");
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(popupActive);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscUp);
  document.removeEventListener("click", handleOverlayClick);
}

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", () => {
  openPopup(popupAdd);
  validateAdd.resetErrors();
});

formElementEdit.addEventListener("submit", profileFormSubmitHandler);
formElementAdd.addEventListener("submit", cardFormSubmitHandler);
