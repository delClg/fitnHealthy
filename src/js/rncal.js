const key = "45SCbX1t3bGOjsUuivMdUjfdAU56lmSajhossJJI";
const baseURL = "https://api.nal.usda.gov/fdc/v1/food";
const inp = document.getElementById("fName");
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

async function fetchS(str) {
  let pgSize = 20;
  let word = str.replace(" ", "%20");
  return await new Promise((resolve, reject) => {
    fetch(`${baseURL}s/search?api_key=${key}&query=${word}&pageSize=${pgSize}`)
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

function pList() {
  let c = 100;
  const btn = document.getElementById("lBut");
  console.log(btn);
  btn.classList.add("load-but");
  fetchList().then((res) => {
    clearModal();
    showModal("id", "Name of the product", true);
    for (let i = 0; i < Math.min(res.length, c); i++) {
      showModal(res[i].fdcId, res[i].description);
    }
    modal.scrollTop = 0;
    btn.classList.remove("load-but");
  });
}

function foodS() {
  const btn = document.getElementById("fBut");
  let text = inp.value;
  if (text.length <= 2) {
    alert("Enter atleast 3 charcters");
    return;
  }
  btn.classList.add("load-but");
  clearModal();
  fetchS(text).then((res) => {
    showSres("Id", "Name", "Brand", "Country", true);
    for (let i = 0; i < res.foods.length; i++) {
      showSres(
        res.foods[i].fdcId,
        res.foods[i].description,
        res.foods[i].hasOwnProperty("brandOwner")
          ? res.foods[i].brandOwner
          : "Not found",
        res.foods[i].hasOwnProperty("marketCountry")
          ? res.foods[i].marketCountry
          : "Not Found"
      );
    }
    btn.classList.remove("load-but");
  });
}

function dispN(foodId) {
  fetchN(foodId).then((res) => {
    clearModal();
    console.log(res);
    showDetails(res);
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

function clearModal() {
  content.innerHTML = "";
  idTable.innerHTML = "";
}

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
  modal.scrollTop = 0;
  modal.style.display = "block";
}
// End

function showDetails(obbj) {
  let {
    description: fname,
    fdcId: fid,
    foodAttributes: attr,
    foodNutrients: foodNutr,
  } = obbj;
  content.innerHTML += `<h3>${fname} #${fid}</h3>`;
  if (
    obbj.hasOwnProperty("foodCategory") &&
    obbj.foodCategory.hasOwnProperty("description")
  )
    content.innerHTML += `<h5>Category: ${obbj.foodCategory.description}</h5>`;
  if (attr.length > 0) {
    content.innerHTML += `<h5>Tags: </h5><p>`;
    for (let i = 0; i < attr.length; i++)
      i == attr.length - 1
        ? (content.innerHTML += `${attr[i].value}</p>`)
        : (content.innerHTML += `${attr[i].value}, `);
  }
  if (obbj.hasOwnProperty("inputFoods") && obbj.inputFoods.length > 0) {
    let ing = obbj.inputFoods;
    content.innerHTML += `<h5>Known Ingredients: </h5>`;
    for (let i = 0; i < ing.length; i++) {
      content.innerHTML += `<p>${ing[i].ingredientDescription}: ${ing[i].ingredientWeight} (g)</p>`;
    }
  }
  content.innerHTML += `<h5>Composition: (per 100g) </h5>`;
  if (foodNutr.length > 0) {
    idTable.innerHTML = `<tr><th>Name</th><th>Amount</th></tr>`;
    for (let i = 0; i < foodNutr.length; i++) {
      if (foodNutr[i].hasOwnProperty("amount")) {
        idTable.innerHTML += `<tr><td>${foodNutr[i].nutrient.name}</td><td>${foodNutr[i].amount} (${foodNutr[i].nutrient.unitName})</td></tr>`;
      }
    }
  }
  modal.scrollTop = 0;
  modal.style.display = "block";
}

function showSres(id, name, brand, country, isth = false) {
  let tag;
  if (isth) {
    tag = "th";
  } else {
    tag = "td";
  }
  idTable.innerHTML += `<tr onclick="dispN(${id})" ><${tag}>${id}</${tag}><${tag}>${name}</${tag}><${tag}>${brand}</${tag}><${tag}>${country}</${tag}></tr>`;
  modal.scrollTop = 0;
  modal.style.display = "block";
}
