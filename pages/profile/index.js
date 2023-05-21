const cardContainer = document.querySelector(".card-container");
const cardList = document.querySelector(".card-list");
const sendMail = document.querySelector("#send-mail");
const btnMail = document.querySelector("#btn-mail");
const empty = document.querySelector(".empty-container");
document.title =
  getStorageSelected("userGit").name || getStorageSelected("userGit").login;

renderCardUser(getStorageSelected("userGit"));

/* ----------- RENDERIZAR O CARD DE IDENTIFICAÇÃO DO USUÁRIO -----------*/
function renderCardUser(user) {
  const { name, avatar_url, bio, login } = user;
  //   let email = getStorageSelected("emailGit").data.email;

  //   if (email != null) sendMail.href = `mailto:${email}`;

  cardContainer.insertAdjacentHTML(
    "afterbegin",
    `<img src="${avatar_url}" alt="" />
            <div class="card-content">
                <h2 class="title-2">${name || login}</h2>
                <span class="bio text-3">${bio || ""}</span>
            </div>`
  );

  btnMail.onclick = (event) => {
    // if (email == null) {
    event.preventDefault();
    alert("Endereço de E-mail deste usuário não disponível no GitHub.");
    // }
  };

  renderCardRepos(getStorageSelected("repoGit"));
}

/* ----------- RENDERIZAR OS CARDS DOS REPOSITÓRIOS DO USUÁRIO -----------*/
function renderCardRepos(repositories) {
  cardList.innerHTML = "";

  repositories.forEach((repository) => {
    const { name, description, html_url, homepage } = repository;

    cardList.insertAdjacentHTML(
      "afterbegin",
      `<li class="card">
                <h3 class="text-2">${name || ""}</h3>
                <p class="text-5">${
                  description || "No description in this repository!"
                }</p>
                <div class="container-btns">
                <a href=${html_url}>
                    <button class="btn-small">Repositório</button>
                </a>
                <a target="_blank" href=${homepage || ""}>
                    <button class="btn-small">Demo</button>
                </a>
                </div>
            </li>`
    );
  });

  if (repositories == "") empty.classList.remove("empty");
  else empty.classList.add("empty");
}

/* --------------- ACESSAR O LOCALSTORAGE SELECIONADO ---------------- */
function getStorageSelected(storage) {
  return JSON.parse(localStorage.getItem(storage));
}
