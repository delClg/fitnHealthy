const names = [
  {
    n: "Chakradhar Reddy",
    img: "../public/images/delClg.jpg",
    rNum: "LCI2021011",
    details:
      "links: <a target='_blank' href='https://github.com/delClg'>github, </a> <a target='_blank' href='mailto:lci2021011@iiitl.ac.in?subject=Fitness project'>email</a>",
  },
  {
    n: "Dhruva Choudary",
    rNum: "LCI2021014",
    img: "../public/logo.jpg",
    details:
      "links: <a target='_blank' href='https://github.com/DHRUVA-N-L-CHOUDHARY'>github, </a><a target='_blank' href='mailto:lci2021014@iiitl.ac.in?subject=Fitness project'>email</a>",
  },
  {
    n: "Krishna Chaitanya",
    rNum: "LCI2021016",
    img: "../public/logo.jpg",
    details:
      "links: <a target='_blank' href='mailto:lci2021011@iiitl.ac.in?subject=Fitness project'>email</a>",
  },
  {
    n: "Lokesh",
    rNum: "LCI2021025",
    img: "../public/logo.jpg",
    details:
      "links: <a target='_blank' href='mailto:lci2021025@iiitl.ac.in?subject=Fitness project'>email</a>",
  },
  {
    n: "Bukya Kranthi",
    rNum: "LCI2021053",
    img: "../public/logo.jpg",
    details:
      "links: <a target='_blank' href='mailto:lci2021053@iiitl.ac.in?subject=Fitness project'>email</a>",
  },
  {
    n: "VamshiKrishna",
    rNum: "LCI2021055",
    img: "../public/logo.jpg",
    details:
      "links: <a target='_blank' href='mailto:lci2021055@iiitl.ac.in?subject=Fitness project'>email</a>",
  },
  {
    n: "Narendra Kumar",
    rNum: "LCI2021032",
    img: "../public/logo.jpg",
    details:
      "links: <a target='_blank' href='mailto:lci2021032@iiitl.ac.in?subject=Fitness project'>email</a>",
  },
];

// Adds all the cards from the above object

function addCards() {
  for (let i = 0; i < names.length; i++) {
    const card = document.createElement("div");
    const name = document.createElement("p");
    name.classList += " name";
    const content = document.createElement("p");
    content.classList += " content";
    card.classList += " card";
    name.innerHTML = `${names[i].n}<br>${names[i].rNum}`;
    content.innerHTML = names[i].details;
    if (names[i].hasOwnProperty("img")) {
      const img = document.createElement("img");
      img.setAttribute("src", names[i].img);
      card.appendChild(img);
    }
    card.appendChild(name);
    card.appendChild(content);
    card.classList += " showCard";
    document.querySelector("main").appendChild(card);
  }
}
addCards();

// for (let i = 0; i < names.length; i++) {
//   const img = document.getElementsByClassName(names[i])[0];
//   const name = document.querySelector("#");
//   const cotent = document.querySelector("");
// }
