import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {editButton, textName, textJob, addButton, inputName, inputJob, inputPlace, inputLink, formElementEdit, formElementAdd} from "../utils/constants.js"
import {initialCards} from "../utils/initialCards.js";
import {config} from "../utils/config.js";

const validateAdd = new FormValidator(config, formElementAdd);
const validateEdit = new FormValidator(config, formElementEdit);
const userInfo = new UserInfo(textName, textJob);
const popupWithImage = new PopupWithImage("#popupImage");
const popupWithEditForm = new PopupWithForm({
  popupSelector: "#popupEdit",
  handleFormSubmit: (item) => {
    userInfo.setUserInfo({
      name: item.inputName,
      job: item.inputJob
    });
    popupWithEditForm.close();
    }
  }
);
const popupWithAddForm = new PopupWithForm({
  popupSelector: "#popupAdd",
  handleFormSubmit: (item) => {
      addCard({
        name: item.inputPlace, 
        link: item.inputLink,
      });
      popupWithAddForm.close();
    }
});
popupWithImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();

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
      popupWithImage.open(link, image)
    }}, ".place-template");
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

function getInfo() {
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().job;
}

export function editListener() {
  popupWithEditForm.open();
  getInfo();
  validateEdit.resetErrors();
};

export function addListener() {
  popupWithAddForm.open();
  validateAdd.resetErrors();
};

validateAdd.enableValidation();
validateEdit.enableValidation();

editButton.addEventListener("click", editListener);
addButton.addEventListener("click", addListener);