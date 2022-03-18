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
  let bmi;
  let weight = parseFloat(wt.value);
  let height = parseFloat(ht.value);
  if (
    weight <= 0 ||
    height <= 0 ||
    isNaN(weight) ||
    isNaN(height) ||
    (!male.checked && !female.checked)
  ) {
    alert("Please enter valid values!");
    return;
  }
  if (eng.checked) bmi = (weight / (height * 12) ** 2) * 703;
  else bmi = weight / height ** 2;
  let m1, m2, a1;
  if (male.checked) {
    if (parseFloat(age.value) >= 18) {
      m1 = 1.51;
      m2 = 0.23;
      a1 = -16.2;
    } else {
      m1 = 1.51;
      m2 = -0.7;
      a1 = -2.2;
    }
  } else {
    if (parseFloat(age.value) >= 18) {
      m1 = 1.51;
      m2 = 0.23;
      a1 = -5.4;
    } else {
      m1 = 1.51;
      m2 = -0.7;
      a1 = 1.4;
    }
  }
  let bfp = m1 * bmi + m2 * age.value + a1;
  let message;
  if (male.checked) {
    if (bfp >= 25) message = "Obese";
    if (bfp >= 18) message = "Average";
    if (bfp >= 17) message = "Fitness";
    if (bfp >= 6) message = "Athletes";
    if (bfp >= 2) message = "Essential Fat";
  } else {
    if (bfp >= 32) message = "Obese";
    if (bfp >= 25) message = "Average";
    if (bfp >= 21) message = "Fitness";
    if (bfp >= 14) message = "Athletes";
    if (bfp >= 10) message = "Essential Fat";
  }
  showModal(message, bfp);
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
