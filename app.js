// Popup
window.onload = () => {
  let popup = document.createElement("section");
  popup.className = "popup";
  let title = document.createElement("h1");
  title.textContent = "Your Username";
  let content = document.createElement("p");
  content.textContent = "Please enter your username.";
  let inputField = document.createElement("input");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("autofocus", "true");
  let confirm = document.createElement("button");
  confirm.textContent = "Confirm";
  confirm.id = "confirm";
  popup.append(title, content, inputField, confirm);
  document.body.append(popup);
  setTimeout(() => {
    let layer = document.createElement("div");
    layer.className = "layer";
    document.body.append(layer);
    popup.classList.add("active");
  }, 500);
};

let username = document.querySelector("header .user .username");

document.addEventListener("click", (e) => {
  if (!e.target.matches("#confirm")) return;
  let inputField = document.querySelector(".popup input").value.trim();
  inputField !== ""
    ? (username.textContent =
        inputField.slice(0, 1).toUpperCase() + inputField.slice(1))
    : (username.textContent = "Player");
  document.querySelector(".popup").classList.remove("active");
  document.querySelector(".layer").remove();
});
