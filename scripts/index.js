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

function createCard(data) {
    cardsElement = cardsTemplate.cloneNode(true);
    
    const cardsElementName = cardsElement.querySelector(".place__name");
    const cardsElementImage = cardsElement.querySelector(".place__image");
    const cardsElementLike = cardsElement.querySelector(".place__like");
    const deleteCard = cardsElement.querySelector(".place__delete-button");

    cardsElementName.textContent = data.name;
    cardsElementImage.src = data.link; 
    cardsElementImage.alt = data.name;

    cardsElementImage.addEventListener("click", () => {
        openPopupImage(data.link, data.name);
    })

    deleteCard.addEventListener("click", deleteElement);

    cardsElementLike.addEventListener("click", (evt) => {
        evt.target.classList.toggle("place__like_status_enabled");
    });

    return cardsElement;
};


function renderCard(data) {
    cardsList.append(createCard(data));
};

function addCard(data, wrap) {
    wrap.prepend(createCard(data));
};

initialCards.forEach(renderCard);

function deleteElement(evt) {
    evt.target.closest(".place").remove();
};

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
    escapeClose(popup);
    overlayClose(popup);
    enableValidation({
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__submit",
        inputErrorClass: ".popup__input_data_error",
        errorClass: ".popup__input-error"
      });
};

function openPopupEdit() {
    inputName.value = textName.textContent;
    inputJob.value = textJob.textContent;
    enableValidation({
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__submit",
        inputErrorClass: ".popup__input_data_error",
        errorClass: ".popup__input-error"
      });
    openPopup(popupEdit);
};

function openPopupImage(image, caption) {
    openPopup(popupImage);
    imagePopup.src = image;
    imagePopup.alt = caption;
    captionPopup.textContent = caption; 
};

function escapeClose(popup) {
    document.addEventListener("keydown", (evt) => {
    if (evt.key === 'Escape') {
        closePopup(popup);
};
});
};

function overlayClose(popup) {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-button")) {
            closePopup(popup);
        };
    });
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
};

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", () => openPopup(popupAdd));

formElementEdit.addEventListener("submit", profileFormSubmitHandler);
formElementAdd.addEventListener("submit", cardFormSubmitHandler);