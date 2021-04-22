let likeButton = document.querySelectorAll(".place__like");
let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");
let inputName = popup.querySelector(".popup__input_data_name");
let inputJob = popup.querySelector(".popup__input_data_job");
let textName = profile.querySelector(".profile__name");
let textJob = profile.querySelector(".profile__job");
let save = popup.querySelector(".popup__form");


for (let i = 0; i < likeButton.length; i += 1) {
likeButton[i].addEventListener("click", function likeChange() {
    if (likeButton[i].classList.contains("place__like_status_disabled") === true) {
        likeButton[i].classList.add("place__like_status_enabled");
        likeButton[i].classList.remove("place__like_status_disabled");
    } else {
        likeButton[i].classList.add("place__like_status_disabled");
        likeButton[i].classList.remove("place__like_status_enabled");
    }
})
};   

editButton.addEventListener("click", openPopUp);

closeButton.addEventListener("click", closePopUp);

save.addEventListener("submit", saveChanges);

function saveChanges() {
    textName.textContent = inputName.value;
    textJob.textContent = inputJob.value;
    popup.classList.remove("popup_opened");
};

function openPopUp() {
    popup.classList.add("popup_opened");
    inputName.value = textName.textContent;
    inputJob.value = textJob.textContent;
};

function closePopUp(){
    popup.classList.remove("popup_opened");
};



