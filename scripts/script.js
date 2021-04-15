let places = document.querySelector(".places");
let likeButton = places.querySelectorAll(".place__like");
console.log(likeButton);


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


