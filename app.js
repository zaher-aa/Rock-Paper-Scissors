let attemptsNum = 3;
// Popup
const start = () => {
  let popup = document.createElement("section");
  popup.className = "popup";
  let title = document.createElement("h1");
  title.textContent = "Your Username";
  let content = document.createElement("p");
  content.textContent = "Please enter your username.";
  let inputField = document.createElement("input");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("placeholder", "Username");
  inputField.setAttribute("autofocus", "true");
  let numOfTries = document.createElement("input");
  numOfTries.setAttribute("type", "number");
  numOfTries.setAttribute("placeholder", "Number");
  let confirm = document.createElement("button");
  confirm.textContent = "Confirm";
  confirm.id = "confirm";
  popup.append(title, content, inputField, numOfTries, confirm);
  document.body.append(popup);
  setTimeout(() => {
    let layer = document.createElement("div");
    layer.className = "layer";
    document.body.append(layer);
    popup.classList.add("active");
  }, 500);
  confirmStart();
};

const confirmStart = () => {
  let username = document.querySelector("header .user .username");

  document.addEventListener("click", (e) => {
    if (!e.target.matches("#confirm")) return;
    let inputField = document.querySelector(".popup input").value.trim();
    inputField !== ""
      ? (username.textContent =
          inputField.slice(0, 1).toUpperCase() + inputField.slice(1))
      : (username.textContent = "Player");
    let numOfTries = document.querySelector(".popup input[type='number']");
    if (+numOfTries.value > 0) attemptsNum = +numOfTries.value;
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      if (document.querySelector(".popup")) {
        document.querySelector(".popup").remove();
      }
    }, 500);
    if (document.querySelector(".layer")) {
      document.querySelector(".layer").remove();
    }
    document.querySelectorAll(".options button").forEach((o) => {
      if (o.disabled) {
        o.removeAttribute("disabled");
      }
    });
    startGame();
  });
};

const startGame = () => {
  let triesCount = 0;
  let pScore = document.querySelector(".user .score");
  let cScore = document.querySelector(".computer .score");
  const imgsContainer = document.querySelectorAll(".images > div");
  const pImgs = document.querySelectorAll(".user-imgs img");
  const cImgs = document.querySelectorAll(".computer-imgs img");
  const options = document.querySelectorAll(".options button");
  const heading = document.querySelector("main h1");
  let username = document.querySelector("header .user .username");

  options.forEach((opt) => {
    opt.onclick = function () {
      if (triesCount < attemptsNum) {
        imgsContainer.forEach((i) => i.classList.add("active"));
        let pOpt = this.dataset.type;
        let cOpt = cImgs[Math.floor(Math.random() * cImgs.length)].dataset.type;
        setTimeout(() => {
          if (
            (pOpt == "rock" && cOpt == "scissors") ||
            (pOpt == "scissors" && cOpt == "paper") ||
            (pOpt == "paper" && cOpt == "rock")
          ) {
            pScore.textContent++;
          } else if (
            (cOpt == "rock" && pOpt == "scissors") ||
            (cOpt == "scissors" && pOpt == "paper") ||
            (cOpt == "paper" && pOpt == "rock")
          ) {
            cScore.textContent++;
          } else {
            pScore.textContent++;
            cScore.textContent++;
          }
          if (pScore.textContent > cScore.textContent) {
            heading.textContent = `${username.textContent} Wins`;
          } else if (cScore.textContent > pScore.textContent) {
            heading.textContent = `Computer Wins`;
          } else {
            heading.textContent = `It's a tie`;
          }
          chooseOpt(pOpt, pImgs);
          chooseOpt(cOpt, cImgs);
          imgsContainer.forEach((i) => i.classList.remove("active"));
        }, 1000);
        triesCount++;
        if (triesCount === attemptsNum) {
          options.forEach((o) => (o.disabled = "true"));
          setTimeout(tryAgain, 1000);
        }
      }
      function chooseOpt(opt, choices) {
        choices.forEach((o) => {
          o.classList.remove("active");
          if (o.dataset.type === opt) o.classList.add("active");
        });
      }
    };
  });
};

const tryAgain = () => {
  let div = document.createElement("div");
  div.className = "try-again-cont";
  let tryAgainBtn = document.createElement("button");
  tryAgainBtn.id = "try-again";
  tryAgainBtn.textContent = "Try Again";
  div.append(tryAgainBtn);
  document.body.append(div);

  document.addEventListener("click", (e) => {
    if (!e.target.matches("#try-again")) return;
    document.querySelector(".user .score").textContent = 0;
    document.querySelector(".computer .score").textContent = 0;
    document.querySelector("main h1").textContent = "Choose an option";
    [
      ...document.querySelectorAll(".user-imgs img"),
      ...document.querySelectorAll(".computer-imgs img"),
    ].forEach((i) => {
      i.classList.remove("active");
      if (i.dataset.type === "rock") i.classList.add("active");
    });
    e.target.remove();
    start();
  });
};

start();
