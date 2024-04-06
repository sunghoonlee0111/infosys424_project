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

//
//sign up user

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signup_form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const userName = document.getElementById("sign_up_username").value;
      const email = document.getElementById("sign_up_email").value;
      const password = document.getElementById("sign_up_password").value;

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          r_e("signup_form").reset();
          r_e("signup_modal").classList.remove("is-active");
          document.getElementById("currentuser").textContent =
            auth.currentUser.email;
          document.getElementById("user_signin").classList.add("is-hidden");
          document.getElementById("user_signup").classList.add("is-hidden");
          document.getElementById("user_signout").classList.remove("is-hidden");
          db.collection("users").doc(userCredential.user.uid).set({
            userName: userName,
            email: email,
            password: password,
            Authenticated: 0,
          });

          alert("Signup successful! Welcome, " + userName);
          document.getElementById("signup_form").reset();
          document.getElementById("signup_modal").classList.remove("is-active");
        })
        .catch((err) => {
          alert(err.message);
        });
    });
});
// Sign In
document.addEventListener("DOMContentLoaded", function () {
  const signInForm = document.getElementById("signin_form");

  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("sign_in_email").value;
    const password = document.getElementById("sign_in_password").value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-in successful.
        // Reset the sign-in form
        signInForm.reset();

        // Hide the sign-in modal if you have one
        r_e("signin_modal").classList.remove("is-active");
        document.getElementById("currentuser").textContent =
          auth.currentUser.email;
        document.getElementById("user_signin").classList.add("is-hidden");
        document.getElementById("user_signup").classList.add("is-hidden");
        document.getElementById("user_signout").classList.remove("is-hidden");

        const currentUserElement = document.getElementById("currentuser");
        if (currentUserElement) {
          currentUserElement.innerText = userCredential.user.email;
        }

        alert("Welcome!");
      })
      .catch((err) => {
        // Handle sign-in errors
        console.error("Sign-in failed", err);
        alert("Please check your email and password and try again.");
      });
  });
});

//sign_out user
document.getElementById("user_signout").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      r_e("currentuser").innerHTML = "";
      document.getElementById("user_signin").classList.remove("is-hidden");
      document.getElementById("user_signup").classList.remove("is-hidden");
      document.getElementById("user_signout").classList.add("is-hidden");
      alert("Successfully Signed Out!");
    })
    .catch((err) => alert(err.message));
});

//single page naviation
let HomeBtn = document.querySelector("#HomeBtn");
let AboutBtn = document.querySelector("#AboutBtn");
let GalleryBtn = document.querySelector("#GalleryBtn");
let PostBtn = document.querySelector("#PostBtn");
let EventBtn = document.querySelector("#EventBtn");

let hidden_form = document.querySelector("#hidden_form");
let content = document.querySelector("#content");

// HomeBtn nav bar link
HomeBtn.addEventListener("click", () => {
  hidden_form.classList.remove("is-hidden");
  content.classList.add("is-hidden");
});
// AboutBTN nav bar link
HomeBtn.addEventListener("click", () => {
  hidden_form.classList.remove("is-hidden");
  content.classList.add("is-hidden");
});
// GalleryBTn nav bar link
HomeBtn.addEventListener("click", () => {
  hidden_form.classList.remove("is-hidden");
  content.classList.add("is-hidden");
});
// PodyBtn nav bar link
HomeBtn.addEventListener("click", () => {
  hidden_form.classList.remove("is-hidden");
  content.classList.add("is-hidden");
});
// EventBtn nav bar link
HomeBtn.addEventListener("click", () => {
  hidden_form.classList.remove("is-hidden");
  content.classList.add("is-hidden");
});
