const key = "45SCbX1t3bGOjsUuivMdUjfdAU56lmSajhossJJI";
const baseURL = "https://api.nal.usda.gov/fdc/v1/food";
let c = 100;
async function fetchList() {
  return await new Promise((resolve, reject) => {
    fetch(`${baseURL}s/list?api_key=${key}`)
      .then((res) => {
        resolve(res.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function fetchN(foodId) {
  return await new Promise((resolve, reject) => {
    fetch(`${baseURL}/${foodId}?api_key=${key}`)
      .then((res) => {
        resolve(res.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function pList() {
  fetchList().then((res) => {
    content.innerHTML = "";
    idTable.innerHTML = "";
    showModal("id", "Name of the product", true);
    for (let i = 0; i < Math.min(res.length, c); i++) {
      showModal(res[i].fdcId, res[i].description);
    }
    modal.scrollTop = 0;
  });
}
function addTable(res) {
  idTable.innerHTML = "";
  showDetails(res);
}
function dispN(foodId) {
  fetchN(foodId).then((res) => {
    addTable(res);
  });
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("butSub");

// Get the paragraph in the Modal
let idTable = document.getElementById("idTable");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Get the content
let content = document.getElementsByClassName("textArea")[0];
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

function showModal(id, name, isth = false) {
  let tag;
  if (isth) {
    tag = "th";
  } else {
    tag = "td";
  }
  //   let newRow, idNode, nameNode;
  //   if (isth) newRow = document.createElement("th");
  //   else newRow = document.createElement("tr");
  //   let idCol = document.createElement("td");
  //   idNode = document.createTextNode(id);
  //   idCol.appendChild(idNode);
  //   newRow.appendChild(idCol);
  //   let nameCol = document.createElement("td");
  //   nameNode = document.createTextNode(name);
  //   nameCol.appendChild(nameNode);
  //   newRow.appendChild(nameCol);
  //   idTable.appendChild(newRow);
  idTable.innerHTML += `<tr onclick="dispN(${id})" ><${tag}>${id}</${tag}><${tag}>${name}</${tag}></tr>`;
  modal.style.display = "block";
}
// End

function showDetails(obbj) {
  let {
    description: fname,
    fdcId: fid,
    foodAttributes: attr,
    inputFoods: ing,
    foodNutrients: foodNutr,
  } = obbj;
  content.innerHTML += `<h3>${fname} #${fid}</h3>`;
  if (attr.length > 0) {
    content.innerHTML += `<h5>Tags: </h5><p>`;
    for (let i = 0; i < attr.length; i++)
      i == attr.length - 1
        ? (content.innerHTML += `${attr[i].value}</p>`)
        : (content.innerHTML += `${attr[i].value}, `);
  }
  if (ing.length > 0) {
    content.innerHTML += `<h5>Known Ingredients: </h5>`;
    for (let i = 0; i < ing.length; i++) {
      content.innerHTML += `<p>${ing[i].ingredientDescription}: ${ing[i].ingredientWeight} (g)</p>`;
    }
  }
  if (foodNutr.length > 0) {
    idTable.innerHTML = `<tr><th>Name</th><th>Amount</th></tr>`;
    for (let i = 0; i < foodNutr.length; i++) {
      if (foodNutr[i].hasOwnProperty("amount")) {
        idTable.innerHTML += `<tr><td>${foodNutr[i].nutrient.name}</td><td>${foodNutr[i].amount} (${foodNutr[i].nutrient.unitName})</td></tr>`;
      }
    }
  }
  modal.style.display = "block";
}
