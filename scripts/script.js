let places = document.querySelector(".places");
let likeButton = places.querySelectorAll(".place__like");

for (let i=0; i < likeButton.length; i += 1) {
likeButton[i].addEventListener("click", function likeChange() {
    
    if (likeButton[i].classList.contains("place__like_status_disabled") === true) {
        likeButton[i].classList.add("place__like_status_enabled");
        likeButton[i].classList.remove("place__like_status_disabled");
    } else {
        likeButton[i].classList.add("place__like_status_disabled");
        likeButton[i].classList.remove("place__like_status_enabled");
    }
});
}   

 
let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");

editButton.addEventListener("click", function openPopUp() {
    popup.classList.add("popup_opened");
});

closeButton.addEventListener("click", function closePopUp(){
    popup.classList.remove("popup_opened");
});


let inputName = popup.querySelector(".popup__input-name");
let inputJob = popup.querySelector(".popup__input-job");
let textName = profile.querySelector(".profile__name");
let textJob = profile.querySelector(".profile__job");
let saveButton = popup.querySelector(".popup__save-button");

inputName.value = textName.textContent;
inputJob.value = textJob.textContent;

saveButton.addEventListener("click", function saveChanges() {
    textName.textContent = inputName.value;
    textJob.textContent = inputJob.value;
    popup.classList.remove("popup_opened");
});




