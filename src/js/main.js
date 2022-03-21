const menuBtn = document.getElementById("menu");
const subMenu = document.getElementById("subMenu");

menuBtn.addEventListener("click", () => {
  if (subMenu.style.display == "block") subMenu.style.display = "none";
  else subMenu.style.display = "block";
});
