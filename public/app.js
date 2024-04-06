// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq-CkeNE_K765pauvvO-72oAUIGCE_Jpc",
  authDomain: "hfh-uwmadison.firebaseapp.com",
  projectId: "hfh-uwmadison",
  storageBucket: "hfh-uwmadison.appspot.com",
  messagingSenderId: "158190324248",
  appId: "1:158190324248:web:89397ab7a4171eb54e516d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
let db = firebase.firestore();
let ref = firebase.storage().ref();

// SIGNIN CHECK
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    r_e("currentuser").innerHTML = auth.currentUser.email;
    document.getElementById("user_signin").classList.add("is-hidden");
    document.getElementById("user_signup").classList.add("is-hidden");
    document.getElementById("user_signout").classList.remove("is-hidden");
  }
});

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
let HomeBtn_2 = document.querySelector("#HomeBtn_2");
let AboutBtn = document.querySelector("#AboutBtn");
let GalleryBtn = document.querySelector("#GalleryBtn");
let PostBtn = document.querySelector("#PostBtn");
let EventBtn = document.querySelector("#EventBtn");
let AboutBtn_2 = document.querySelector("#AboutBtn_2");

let Home_hidden_form = document.querySelector("#Home_hidden_form");
let About_hidden_form = document.querySelector("#About_hidden_form");
let Gallery_hidden_form = document.querySelector("#Gallery_hidden_form");
let Post_hidden_form = document.querySelector("#Post_hidden_form");
let Event_hidden_form = document.querySelector("#Event_hidden_form");

// hide all forms
function hideAllForms() {
  Home_hidden_form.classList.add("is-hidden");
  About_hidden_form.classList.add("is-hidden");
  Gallery_hidden_form.classList.add("is-hidden");
  Post_hidden_form.classList.add("is-hidden");
  Event_hidden_form.classList.add("is-hidden");
}

// HomeBtn nav bar link
HomeBtn.addEventListener("click", () => {
  hideAllForms();
  Home_hidden_form.classList.remove("is-hidden");
});
// HomeBtn_2 nav bar link
HomeBtn_2.addEventListener("click", () => {
  hideAllForms();
  Home_hidden_form.classList.remove("is-hidden");
});
// AboutBtn nav bar link
AboutBtn.addEventListener("click", () => {
  hideAllForms();
  About_hidden_form.classList.remove("is-hidden");
});

// AboutBtn_2 nav bar link
AboutBtn_2.addEventListener("click", () => {
  hideAllForms();
  About_hidden_form.classList.remove("is-hidden");
});

// GalleryBtn nav bar link
GalleryBtn.addEventListener("click", () => {
  hideAllForms();
  Gallery_hidden_form.classList.remove("is-hidden");
});

// PostBtn nav bar link
PostBtn.addEventListener("click", () => {
  hideAllForms();
  Post_hidden_form.classList.remove("is-hidden");
});

// EventBtn nav bar link
EventBtn.addEventListener("click", () => {
  hideAllForms();
  Event_hidden_form.classList.remove("is-hidden");
});
