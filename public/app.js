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

// Gallery

async function addPicture() {
  let input = document.getElementById("add_picture_input");
  input.click();

  // Define the event listener function
  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    if (file.type.split("/")[0] !== "image") {
      alert("Please upload a picture");
      input.value = ""; // Empty the input
      return;
    }

    let timestamp = new Date();
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child(`gallery_images/${timestamp}`);
    await fileRef.put(file);
    let url = await fileRef.getDownloadURL();
    console.log(timestamp, url);
    input.value = ""; // Empty the input

    // Save URL and timestamp to Firestore DB
    let db = firebase.firestore();
    db.collection("gallery").add({
      url: url,
      timestamp: timestamp,
    });

    // Display the pictures
    displayPictures();

    // Remove the event listener to prevent it from firing multiple times
    input.removeEventListener("change", handleFileChange);
  };

  // Add the event listener
  input.addEventListener("change", handleFileChange);
}

//function to display the pictures
function displayPictures() {
  let html = ``;
  let storageRef = firebase.storage().ref();
  let galleryRef = storageRef.child("gallery_images");

  //get url from gallery db and add to html
  let db = firebase.firestore();
  db.collection("gallery")
    .orderBy("timestamp", "desc")
    .onSnapshot((e) => {
      e.forEach((doc) => {
        let data = doc.data();
        html += `<img class="gallery_pics" src="${data.url}" value="${data.timestamp}" alt="gallery photo" />`;
      });
      document.getElementById("gallery_pics_container").innerHTML = html;
    });
}

// Add Picture Button
document.getElementById("add_picture_button").addEventListener("click", () => {
  //choose file to upload
  addPicture();
});

//display pictures
displayPictures();

// Write_post

document.addEventListener("DOMContentLoaded", function () {
  const quill = new Quill("#editor", {
    modules: {
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: function () {
            // Trigger file input click event
            var fileInput = document.getElementById("fileInput");
            fileInput.click();

            fileInput.onchange = function () {
              var file = fileInput.files[0];
              if (file) {
                // Call function to upload image
                uploadImage(file)
                  .then(function (url) {
                    // Insert image URL into the editor
                    var range = quill.getSelection();
                    quill.insertEmbed(range.index, "image", url);
                  })
                  .catch(function (error) {
                    console.error("Error uploading image: ", error);
                  });
              }
              fileInput.value = ""; // Reset file input
            };
          },
        },
      },
    },
    theme: "snow",
    placeholder: "Write something awesome...",
  });

  // Get the content of the editor when the user clicks the post button
  document
    .querySelector(".write_post_button")
    .addEventListener("click", postContent);

  // function for post the content to the firestore
  function postContent() {
    let title = document.querySelector(".write_post_title_input").value;
    let content = quill.getContents();
    //get texts only for content brief display
    //without any html tags and formatting and new lines and limit to 100 characters
    let contentText = quill.getText().replace(/\n/g, " ").substring(0, 5000);

    if (title === "") {
      alert("Please enter a title!");
      return;
    }
    if (contentText === "") {
      alert("Please enter content!");
      return;
    }

    firebase
      .firestore()
      .collection("posts")
      .add({
        title: title,
        content: JSON.stringify(content),
        contentText: contentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: firebase.auth().currentUser,
      })
      .then(() => {
        alert("Post successfully!");
        //need to change this if we are going to use single page
        window.location.href = "post.html";
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    //clear the editor and title input
    quill.setContents([]);
    document.querySelector(".write_post_title_input").value = "";
  }
});

// Function to upload image to Firebase Storage
function uploadImage(file) {
  // Create a unique filename for the image
  var uniqueName = "image_" + Date.now();

  // Create a reference to the storage service
  var storageRef = firebase.storage().ref();

  // Create a reference to the file to upload
  var imageRef = storageRef.child("images/" + uniqueName);

  // Upload the file to Firebase Storage
  return imageRef.put(file).then(function (snapshot) {
    // Return the URL of the image
    return snapshot.ref.getDownloadURL();
  });
}

// Post function
document.addEventListener("DOMContentLoaded", function () {
  let postsContainer = document.querySelector("#post_container");
  let defaultThumbnail = "image/Banner.png"; // Default thumbnail if no image found

  // Function to limit the number of words in the excerpt
  function createExcerpt(content, wordLimit) {
    let words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  }

  // Function to extract the first image from the Delta object
  function getFirstImageFromDelta(delta) {
    const ops = JSON.parse(delta).ops;
    //console.log(ops);
    const imgOp = ops.find((op) => op.insert.image);
    if (imgOp != null) {
      return imgOp.insert.image;
    } else {
      return defaultThumbnail;
    }
  }

  // Fetch posts from Firestore
  firebase
    .firestore()
    .collection("posts")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let doc_id = doc.id;

        // console.log(doc.id, " => ", doc.data());
        let postData = doc.data();

        //Get the first image from the content
        let postThumbnailSrc = getFirstImageFromDelta(postData.content);

        //Get post username and post time information
        let postUsername = postData.username || "Anonymous";
        var postTime = new Date(postData.timestamp.seconds * 1000);

        postTime = postTime.toLocaleString("en-US");

        //Get the post title and content information
        let postTitle = postData.title;
        let postContent = postData.contentText;

        //Create the post element
        let html = `<div class="post_content_box">`;

        html += `<!-- thumbnail -->
      <img
        class="post_thumbnail"
        src="${postThumbnailSrc}"
        alt="Post Thumbnail"
      />
      <!-- texts -->
      <div class="post_texts">
        <!-- username and date -->
        <div class="post_nameanddate">
          <div class="post_username">${postUsername}</div>
          <div class="post_time">${postTime}</div>
        </div>
        <!-- title and texts -->
        <span class="post_text_title">
          <a  value = ${doc_id} class = "to_post_detail">${postTitle}</a></span
        >
        <p class="post_text">
          ${createExcerpt(postContent, 30)}
        </p>
        <span class="post_readmore">
          <a value = ${doc_id} class = "to_post_detail">Read More</a>
        </span>
      </div>`;
        html += `</div>`;

        postsContainer.innerHTML += html;
      });

      //function to navigate to inside_post with assigned doc id when the post is clicked
      function navigateToInsidePost(doc_id) {
        console.log("Navigating to inside post with doc id: ", doc_id);
        display_content(doc_id);
      }

      //add click event listener to right buttons with class name "to_post_detail"

      document.querySelectorAll(".to_post_detail").forEach((button) => {
        button.addEventListener("click", (e) => {
          //activate function navigateToInsidePost with assigned doc id
          navigateToInsidePost(e.target.getAttribute("value"));
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
});
// inside_post function
// function to add the comment
document
  .getElementById("add_comment")
  .addEventListener("click", () => saveComment(temp_id));

// function to save  the comment
function saveComment(postid) {
  //record doc id
  let post_id = postid;
  //get the comment from the user
  let comments = document.getElementById("userinput_comment").value;
  if (comments === "") {
    alert("Please enter a comment!");
    return;
  }

  //record current time
  let timestamp = new Date();
  //record the user name
  //시발 이거 되는건가 로그인이 안되있어서 모르겠다
  let user_id = firebase.auth().currentUser;

  //save the comment to the firestore
  firebase
    .firestore()
    .collection("comments")
    .add({
      post_id: post_id,
      comments: comments,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user_id: user_id,
    })
    .then(() => {
      alert("Comment added!");
      document.getElementById("userinput_comment").value = "";
      displayComments(post_id);
    })
    .catch((error) => {
      alert("Error adding comment: ", error);
    });
}

//function to display comments
function displayComments(post_id) {
  //get the comment from the firestore
  firebase
    .firestore()
    .collection("comments")
    .orderBy("timestamp", "desc")
    .where("post_id", "==", post_id)
    .get()
    .then((e) => {
      document.getElementById("comments_container").innerHTML = ``;

      e.forEach((doc) => {
        let comment = doc.data().comments;
        let user = doc.data().user_id || "Anonymous";
        let timestamp = doc.data().timestamp;
        timestamp = timestamp.toDate().toLocaleString("en-US");

        let html = `
         <div class="inside_post_comment">
           <div class="inside_post_comment_username">
             <p>${user}</p>
           </div>
           <p class="inside_post_comment_content">${comment}</p>
         </div>
       `;

        document.getElementById("comments_container").innerHTML += html;
      });
    });
}

function display_content(docid) {
  //this is promise
  const post_data = firebase
    .firestore()
    .collection("posts")
    .doc(docid)
    .get()
    .then((e) => {
      //console.log(e.data());
      let post_title = e.data().title;
      let post_author = e.data().author || "Anonymous";
      var post_date = e.data().timestamp;
      post_date = post_date.toDate().toLocaleString("en-US");
      //this is delta format
      let post_content = e.data().content;

      let html = ``;

      html += `
         <!-- inside post title -->
         <div class="inside_post_title">
           <p>${post_title}</p>
         </div>

         <!-- inside post content -->
         <div class="inside_post_content">
           <!-- post author and date section -->
           <div class="inside_post_author_date">
             <p class="inside_post_author">Author: ${post_author}</p>
             <p class="inside_post_date">Date: ${post_date}</p>
           </div>
           <!-- post contents section -->

             <div id="hidden-editor" ></div>

         </div>
         <div id="hidden-box" style="display: none;">${docid}</div>
       `;
      document.getElementById("inside_post_container").innerHTML = html;

      //
      var hiddenQuill = new Quill("#hidden-editor", {
        modules: {
          toolbar: false,
        },
        readOnly: true,
        theme: "snow",
      });

      // Set the Delta content to the hidden editor
      let deltaContent = JSON.parse(post_content);

      // Then set the contents using the parsed Delta object
      hiddenQuill.setContents(deltaContent);

      //display comments
      displayComments(docid);
    });
}
