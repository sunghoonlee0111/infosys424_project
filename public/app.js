// functions

function r_e(id) {
  return document.querySelector(`#${id}`);
}

function configure_message_bar(msg) {
  r_e("message_bar").innerHTML = msg;

  // show the message bar
  r_e("message_bar").classList.remove("is-hidden");

  // make the message bar hidden again and clear it

  setTimeout(() => {
    r_e("message_bar").classList.add("is-hidden");
    r_e("message_bar").innerHTML = "";
  }, 2000);
}
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

//to sign up (from sign in modal)
let to_signup = document.querySelector("#to_signup");

function to_signup_open() {
  signup_open();
  signin_close();
}

to_signup.addEventListener("click", to_signup_open);

//to sign in (from sign up modal)
let to_signin = document.querySelector("#to_signin");

function to_signin_open() {
  signin_open();
  signup_close();
}

to_signin.addEventListener("click", to_signin_open);

// single page navigation
let HomeBtn = document.querySelector("#HomeBtn");
let AboutBtn = document.querySelector("#AboutBtn");
let GalleryBtn = document.querySelector("#GalleryBtn");
let PostBtn = document.querySelector("#PostBtn");
let EventBtn = document.querySelector("#EventBtn");

let homeSection = document.querySelector("#home_section");
let aboutSection = document.querySelector("#about_section");
let gallerySection = document.querySelector("#gallery_section");
let postSection = document.querySelector("#post_section");
let eventSection = document.querySelector("#event_section");

// array of all sections
let allSections = [
  homeSection,
  aboutSection,
  gallerySection,
  postSection,
  eventSection,
];

// function to hide all sections
function hideAllSections() {
  allSections.forEach((section) => {
    section.classList.add("is-hidden");
  });
}

// HomeBtn nav bar link
HomeBtn.addEventListener("click", () => {
  hideAllSections();
  homeSection.classList.remove("is-hidden");
});

// AboutBTN nav bar link
AboutBtn.addEventListener("click", () => {
  hideAllSections();
  aboutSection.classList.remove("is-hidden");
});

// GalleryBTn nav bar link
GalleryBtn.addEventListener("click", () => {
  hideAllSections();
  gallerySection.classList.remove("is-hidden");
});

// PostBtn nav bar link
PostBtn.addEventListener("click", () => {
  hideAllSections();
  postSection.classList.remove("is-hidden");
});

// EventBtn nav bar link
EventBtn.addEventListener("click", () => {
  hideAllSections();
  eventSection.classList.remove("is-hidden");
});
