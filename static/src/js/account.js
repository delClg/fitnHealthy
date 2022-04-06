const chk = document.getElementById("chk");
const signBtn = document.getElementById("signBtn");
const loginBtn = document.getElementById("loginBtn");

// signBtn.addEventListener("click", postUser);

async function PUser(usrName, eml, pswd) {
  const res = await fetch("/users/", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      userName: usrName,
      email: eml,
      pwd: pswd,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json());
}
async function GUser(eml) {
  let res = await fetch(`/user/${eml}`);
  res = await res.json();
  return res;
}
// async function fetchList() {
//   return await new Promise((resolve, reject) => {
//     fetch(`${baseURL}s/list?api_key=${key}`)
//       .then((res) => {
//         resolve(res.json());
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

function postUser(e) {
  e.preventDefault();
  let usrName = document.getElementById("SusrName").value;
  let email = document.getElementById("Semail").value;
  let pwd = document.getElementById("Spwd").value;
  if (usrName.length == 0 || email.length == 0 || pwd.length <= 5) {
    return alert("Enter valid values!");
  }
  checkEmail(email).then((res) => {
    if (res) {
      PUser(usrName, email, pwd).then((res) => {
        showModal("Succesfully created an account");
      });
    } else {
      showModal("An account with the same email exists. Please Login");
    }
  });
}

async function checkEmail(eml) {
  let r = await GUser(eml);
  if (r == null) return true;
  return false;
}

function checkUser(e) {
  e.preventDefault();
  let email = document.getElementById("Lemail").value;
  let pwd = document.getElementById("Lpwd").value;
  checkPswd(email, pwd).then((res) => {
    if (res) showModal("Login Succesful");
    else {
      showModal("Wrong Credentials");
    }
  });
}
async function checkPswd(eml, pswd) {
  let r = await GUser(eml);
  if (r != null && r.email == eml && r.pwd == pswd) return true;
  return false;
}

// JS for Modal

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("butSub");

// Get the paragraph in the Modal
let content = document.getElementById("pModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function showModal(message) {
  content.innerHTML = `${message}`;
  modal.style.display = "block";
}
// End
