let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");
let inputName = popup.querySelector(".popup__input_data_name");
let inputJob = popup.querySelector(".popup__input_data_job");
let textName = profile.querySelector(".profile__name");
let textJob = profile.querySelector(".profile__job");
let formElement = popup.querySelector(".popup__form");

function openPopUp() {
    popup.classList.add("popup_opened");
    inputName.value = textName.textContent;
    inputJob.value = textJob.textContent;
};

function closePopUp(){
    popup.classList.remove("popup_opened");
};

function saveChanges(event) {
    event.preventDefault();
    textName.textContent = inputName.value;
    textJob.textContent = inputJob.value;
    closePopUp();
};

editButton.addEventListener("click", openPopUp);

closeButton.addEventListener("click", closePopUp);

formElement.addEventListener("submit", saveChanges);


