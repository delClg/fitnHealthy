const menuBtn = document.getElementById("menu");
const subMenu = document.getElementById("subMenu");

// To remove the modal

menuBtn.addEventListener("click", () => {
  if (subMenu.style.display == "block") subMenu.style.display = "none";
  else subMenu.style.display = "block";
});

window.addEventListener("click", function (e) {
  if (!subMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    subMenu.style.display = "none";
  }
});
