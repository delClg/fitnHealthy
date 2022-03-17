const male = document.getElementById("male");
const female = document.getElementById("female");
const metric = document.getElementById("si");
const eng = document.getElementById("ft");
const ht = document.getElementById("ht");
const wt = document.getElementById("wt");
const age = document.getElementById("age");

function chng(a) {
  if (a == "m") {
    ht.setAttribute("placeholder", "Height (m)");
    wt.setAttribute("placeholder", "Weight (kgs)");
  } else if (a == "e") {
    ht.setAttribute("placeholder", "Height (ft)");
    wt.setAttribute("placeholder", "Weight (lbs)");
  }
}

function calc() {
  let weight = parseFloat(wt.value);
  let height = parseFloat(ht.value);
  if (weight <= 0 || height <= 0) {
    alert("Please enter a valid value!");
    return;
  }
  let bmi, message;
  if (eng.checked) bmi = (weight / (height * 12) ** 2) * 703;
  else bmi = weight / height ** 2;
  if (bmi < 18.5) message = "You are Underweight";
  else if (bmi < 24.9) message = "You are Healthy";
  else if (bmi < 29.9) message = "You are Overweight";
  else if (bmi > 30) message = "You are Obese";
  showModal(message, bmi);
}

// JS for modal

// Get the modal
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

function showModal(para, bmi) {
  content.innerHTML = `Your BMI is ${bmi.toFixed(2)}<br>${para}`;
  modal.style.display = "block";
}
// End
