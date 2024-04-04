// navigation burger
let burger_nav = document.querySelector("#burger_nav");
let menu_nav = document.querySelector("#menu_nav");

function burger_open() {
  burger_nav.classList.add("is-active");
  menu_nav.classList.add("is-active");
}

function burger_close() {
  burger_nav.classList.remove("is-active");
  menu_nav.classList.remove("is-active");
}

document.addEventListener("click", function (event) {
  if (
    !event.target.closest("#burger_nav") &&
    burger_nav.classList.contains("is-active")
  ) {
    burger_close();
  }
});

burger_nav.removeEventListener("mouseover", burger_open);
burger_nav.addEventListener("click", function (event) {
  event.stopPropagation();
  burger_nav.classList.toggle("is-active");
  menu_nav.classList.toggle("is-active");
});

//singin
let signin = document.querySelector("#signin_modal");
let user_signin = document.querySelector("#user_signin");
let signin_background = document.querySelector("#signin_background");

function signin_open() {
  signin.classList.add("is-active");
}

function signin_close() {
  signin.classList.remove("is-active");
}

user_signin.addEventListener("click", signin_open);
signin_background.addEventListener("click", signin_close);

//signup
let signup = document.querySelector("#signup_modal");
let user_signup = document.querySelector("#user_signup");
let signup_background = document.querySelector("#signup_background");

function signup_open() {
  signup.classList.add("is-active");
}
function signup_close() {
  signup.classList.remove("is-active");
}

user_signup.addEventListener("click", signup_open);
signup_background.addEventListener("click", signup_close);
