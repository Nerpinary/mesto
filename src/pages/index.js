//import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {editButton, textName, textJob, avatar, addButton, inputName, inputJob, formElementEdit, formElementAdd, formElementAvatarEdit, profileAvatar, avatarEditButton} from "../utils/constants.js";
import {config, apiConfig} from "../utils/config.js";
import PopupWithDeleteButton from "../components/PopupWithDeleteButton.js";



let userId = null;
const {baseUrl, token} = apiConfig;
const api = new Api(baseUrl, token);
const validateAdd = new FormValidator(config, formElementAdd);
const validateEdit = new FormValidator(config, formElementEdit);
const validateAvatarEdit = new FormValidator(config, formElementAvatarEdit);
const userInfo = new UserInfo(textName, textJob, avatar);
const popupWithImage = new PopupWithImage("#popupImage");
const popupWithEditForm = new PopupWithForm({
  popupSelector: "#popupEdit",
  handleFormSubmit: (data) => {
    popupWithEditForm.loading(true)
    api.setInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res)
      popupWithEditForm.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })
    .finally(() => {
      popupWithEditForm.loading(false)
    })
  }
});
const popupWithAddForm = new PopupWithForm({
  popupSelector: "#popupAdd",
  handleFormSubmit: (data) => {
    popupWithAddForm.loading(true)
    api.addNewCard(data)
    .then((data) => {
      cardList.addItem(addCard(data))
      popupWithAddForm.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupWithAddForm.loading(false)
    })
  }
});
const popupWithDeleteButton = new PopupWithDeleteButton("#popupDelete")
const popupWithAvatarEditForm = new PopupWithForm({
  popupSelector: "#popupAvatarEdit",
  handleFormSubmit: (data) => {
    popupWithAvatarEditForm.loading(true)
    console.log(data);
    api.setAvatar(data)
    .then(res => {
      userInfo.setAvatar(res)
      popupWithAvatarEditForm.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupWithAvatarEditForm.loading(false)
    })
  }
})
popupWithImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithDeleteButton.setEventListeners();
popupWithAvatarEditForm.setEventListeners();

const cardList = new Section ({
  renderer: (item) => {
    cardList.addItem(addCard(item))
  }
}, ".places__list")

Promise.all([api.getInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userId = userData._id
  cardList.renderItems(cards)
  userInfo.setUserInfo(userData)
})
.catch((err) => {
  console.log(`Ошибка: ${err}`)
})

const addCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: (link, image) => {
      popupWithImage.open(link, image)
    },
    user: userId,
    handleDeleteClick: () => {
      popupWithDeleteButton.open()
      popupWithDeleteButton.submit(
        () => {
          console.log(item);
          api.deleteCard(item._id)
          .then(
            () => {
              card.deleteCard()
              popupWithDeleteButton.close()
            }
          )
          .catch(
            (err) => {
              console.log(`Ошибка: ${err}`)
            }
          )
        }
      )
    },
    setLike: () => {
      api.setLike(card._data)
      .then(
        (data) => {
          card.setLike(data)
        }
      )
      .catch(
        (err) => {
          console.log(`Ошибка: ${err}`)
        }
      )
    },
    removeLike: () => {
      api.removeLike(card._data)
      .then(
        (data) => {
          card.removeLike(data)
        }
      )
      .catch(
        (err) => {
          console.log(`Ошибка: ${err}`)
        }
      )
    }
  }, ".place-template");
  return card.generateCard()
};

function getInfo() {
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().job;
}

function editListener() {
  popupWithEditForm.open();
  getInfo();
  validateEdit.resetErrors();
};

function addListener() {
  popupWithAddForm.open();
  validateAdd.resetErrors();
};

function avatarEditListener() {
  popupWithAvatarEditForm.open();
  validateAvatarEdit.resetErrors();
}

console.log(baseUrl);
console.log(token);
console.log(api.getInitialCards());

validateAdd.enableValidation();
validateEdit.enableValidation();
validateAvatarEdit.enableValidation();

editButton.addEventListener("click", editListener);
addButton.addEventListener("click", addListener);
avatarEditButton.addEventListener("click", avatarEditListener);