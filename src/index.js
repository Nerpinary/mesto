import "./pages/index.css";

import { initialCards, Card } from "./components/Card.js";
import { config, FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import {PopupWithImage, PopupWithForm} from "./components/Popup.js";
import UserInfo from "./components/UserInfo.js";
import {editButton, textName, textJob, addButton, popupEdit, popupAdd, popupImage, inputPlace, inputLink, formElementEdit, formElementAdd} from "./utils/constants.js"

const validateAdd = new FormValidator(config, formElementAdd);
const validateEdit = new FormValidator(config, formElementEdit);

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: () => {
    formElementEdit.addEventListener("submit", editFormSubmit)
  }
});

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: () => {
    formElementAdd.addEventListener("submit", addFormSubmit)
  }
});

const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    addCard(data);
  }
}, ".places__list")

cardList.renderItems();

function addCard(data) {
  const card = new Card({data,
    handleCardClick: (link, image) => {
      const popupWithImage = new PopupWithImage(popupImage)
      popupWithImage.open(link, image)
    }}, ".place-template");
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

export function editFormSubmit (event) {
  event.preventDefault();
  const userInfo = new UserInfo (textName, textJob)
  userInfo.setUserInfo()
  popupWithEditForm.close();
}

export function editListener() {
  popupWithEditForm.open();
  validateEdit.resetErrors();
}

export function addFormSubmit (event) {
  event.preventDefault();
  addCard(
    {
      name: inputPlace.value,
      link: inputLink.value,
    });
  popupWithAddForm.close();
}

export function addListener() {
  popupWithAddForm.open();
  validateAdd.resetErrors();
}

validateAdd.enableValidation();
validateEdit.enableValidation();

editButton.addEventListener("click", editListener);
addButton.addEventListener("click", addListener);