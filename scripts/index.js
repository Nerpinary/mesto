const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
const popupImage = document.querySelector("#popupImage");
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__image-caption");
const inputName = document.querySelector(".popup__input_data_name");
const inputJob = document.querySelector(".popup__input_data_job");
const inputPlace = document.querySelector(".popup__input_data_place");
const inputLink = document.querySelector(".popup__input_data_link");
const textName = profile.querySelector(".profile__name");
const textJob = profile.querySelector(".profile__job");
const textPlace = document.querySelector("place__name");
const formElementEdit = document.querySelector("#formElementEdit");
const formElementAdd = document.querySelector("#formElementAdd");
const cardsList = document.querySelector(".places__list");
const cardsTemplate = document.querySelector(".place-template").content;

function profileFormSubmitHandler(event) {
    event.preventDefault();
    textName.textContent = inputName.value;
    textJob.textContent = inputJob.value;
    closePopup(popupEdit);
};

function cardFormSubmitHandler(event) {
    event.preventDefault();

    addCard({
        name: inputPlace.value,
        link: inputLink.value
    }, cardsList);
    
    formElementAdd.reset();

    closePopup(popupAdd);
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscUp);
    document.addEventListener("click", handleOverlayClick);
};

function openPopupEdit() {
    inputName.value = textName.textContent;
    inputJob.value = textJob.textContent;
    openPopup(popupEdit);
};

function openPopupImage(image, caption) {
    openPopup(popupImage);
    imagePopup.src = image;
    imagePopup.alt = caption;
    captionPopup.textContent = caption; 
};

function handleEscUp(evt) {
    const popupActive = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(popupActive);
    };
};

function handleOverlayClick(evt) {
    const popupActive = document.querySelector(".popup_opened");
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-button")) {
        closePopup(popupActive);
    };
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscUp);
    document.removeEventListener("click", handleOverlayClick);
};

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", () => {
    openPopup(popupAdd);
});

formElementEdit.addEventListener("submit", profileFormSubmitHandler);
formElementAdd.addEventListener("submit", cardFormSubmitHandler);