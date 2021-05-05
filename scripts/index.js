const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
const popupImage = document.querySelector("#popupImage");
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__image-caption");
const closeEditButton = document.querySelector("#closeEditButton");
const closeAddButton = document.querySelector("#closeAddButton");
const closeImageButton = document.querySelector("#closeImageButton");
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
    const cardsElement = cardsTemplate.cloneNode(true);
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
    cardsList.append(cardsElement);
}

function renderCard(wrap) {
    wrap.append(createCard);
};

function addCard(data, wrap) {
    wrap.prepend(createCard(data));
};

initialCards.forEach(createCard);

function deleteElement(evt) {
    evt.target.closest(".place").remove();
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
};

function openPopupEdit() {
    openPopup(popupEdit);
    inputName.value = textName.textContent;
    inputJob.value = textJob.textContent;
};

function openPopupAdd() {
    openPopup(popupAdd);
};

function openPopupImage(image, caption) {
    openPopup(popupImage);
    imagePopup.src = image;
    captionPopup.textContent = caption; 
};

function saveChanges(event) {
    event.preventDefault();
    textName.textContent = inputName.value;
    textJob.textContent = inputJob.value;
    closePopup(popupEdit);
};

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);

closeEditButton.addEventListener("click", closePopup(popupEdit));
closeAddButton.addEventListener("click", closePopup(popupAdd));
closeImageButton.addEventListener("click", closePopup(popupImage));

formElementEdit.addEventListener("submit", saveChanges);
formElementAdd.addEventListener("submit", function addItem(event) {
    event.preventDefault();

    addCard({
        name: inputPlace.value,
        link: inputLink.value
    }, cardsList);
    
    formElementAdd.reset();

    closePopup(popupAdd);
});
