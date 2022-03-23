const url = "https://picsum.photos/v2/list";
const main = document.querySelector("main");
let page = 0;

let images = [
  {
    n: "food pyramid",
    img: "https://img.freepik.com/free-vector/healthy-eating-pyramid-realistic-infographic-visual-guide-poster-type-proportions-daily-food-nutrition_1284-31754.jpg?t=st=1648041468~exp=1648042068~hmac=419fe53fafa7ee6bd81636309839235c8f1f5ac3d08239e29bb4c62a162e01d7&w=996",
  },
  {
    n: "vitamins",
    img: "https://img.freepik.com/free-vector/vitamin-food-infographic_23-2148484942.jpg?t=st=1648041468~exp=1648042068~hmac=dd3461353cd95e57ff8dda536af70d999c723e5cf9a8cff9fc926e7eb960d468&w=826",
  },
  {
    n: "food nutrition",
    img: "https://img.freepik.com/free-vector/food-pyramid-template-concept_23-2148507114.jpg?t=st=1648041468~exp=1648042068~hmac=903a8334814dfde730fcb29a979ba24e785b8a40433a56216aafa6a53d31ce0b&w=826",
  },
  {
    n: "vitamins",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjit4you.com%2Fwp-content%2Fuploads%2F2017%2F01%2Fvitaminsinfo.jpg&f=1&nofb=1",
  },
];

async function fetchImgs() {
  page++;
  return await new Promise((resolve, reject) => {
    fetch(`${url}?page=${page}`)
      .then((res) => {
        resolve(res.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function addImages() {
  fetchImgs().then((res) => {
    for (let i = 0; i < res.length; i++) {
      addImg(res[i].author, res[i].download_url);
    }
  });
}

function addImg(author, url) {
  let imgDiv = document.createElement("div");
  imgDiv.classList += " imgDiv";
  let img = document.createElement("img");
  img.setAttribute("src", url);
  let authNameP = document.createElement("p");
  let authName = document.createTextNode(author);
  authNameP.appendChild(authName);
  imgDiv.appendChild(img);
  imgDiv.appendChild(authNameP);
  main.appendChild(imgDiv);
}

addImages();
// const myDiv = document.getElementsByTagName("BODY")[0];
window.onscroll = () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    if (page <= 4) addImages();
  }
};
