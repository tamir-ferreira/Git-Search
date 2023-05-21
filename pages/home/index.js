// import { Octokit } from "https://cdn.skypack.dev/octokit";

// const octokit = new Octokit({ auth: token });

const recentUsers = document.querySelector(".recent-users");
const inputSearch = document.querySelector("input");
const notFound = document.querySelector("#not-found");
const btnSearch = document.querySelectorAll("[data-search]");
const form = document.querySelector("form");

/* -------------- VERIFICAR ÚLTIMOS USUÁRIOS PESQUISADOS ------------- */
let lastUsers = getStorageSelected("lastUsersGit");
let lastRepos = getStorageSelected("lastReposGit");
// let lastEmails = getStorageSelected("lastEmailsGit");
if (lastUsers != null) renderLastUsers(lastUsers);

/* -------------- RENDERIZAR MINIATURAS ÚLTIMOS USUÁRIOS ------------- */
function renderLastUsers(users) {
  recentUsers.innerHTML = "";
  users.forEach((user, index) => {
    recentUsers.insertAdjacentHTML(
      "beforebegin",
      `<li class="user">
            <img src="${user.avatar_url}" alt="ícones de fotos de perfil">
            <button id="${index}" class="btn-user">Acessar este perfil</button>
        </li>`
    );
  });
  mapBtnsUsers();
}

/* --------------- MAPEAR BOTÕES PARA ACESSAR ÚLTIMOS USUÁRIOS -------------- */
function mapBtnsUsers() {
  const users = document.querySelectorAll(".user");
  users.forEach((user) => {
    const btnUser = user.lastElementChild;
    user.onmouseover = () => (btnUser.style.display = "block");
    user.onmouseout = () => (btnUser.style.display = "none");
  });

  const btnUsers = document.querySelectorAll(".btn-user");
  btnUsers.forEach((btnUser) => {
    btnUser.onclick = () => {
      const id = btnUser.id;

      updateStorageSelected(lastUsers[id], "userGit");
      updateStorageSelected(lastRepos[id], "repoGit");
      updateStorageSelected(lastEmails[id], "emailGit");

      window.location.replace("../../pages/profile/index.html");
    };
  });
}

/* ------------- MONITORAR EVENTOS DE PESQUISA DE USUÁRIOS ------------- */
form.onsubmit = (event) => event.preventDefault();

inputSearch.onkeyup = () => {
  if (inputSearch.value != "") {
    btnSearch[0].classList.add("btn-color");
    btnSearch[0].onclick = () => {
      btnSearch[0].style.display = "none";
      btnSearch[1].style.display = "block";
      requestGitUser(inputSearch.value);
    };
  } else {
    btnSearch[0].classList.remove("btn-color");
    btnSearch[0].style.display = "block";
    btnSearch[1].style.display = "none";
    btnSearch[0].onclick = "none";
    notFound.style.display = "none";
  }
};

/* ------------- BUSCAR NA API O USUÁRIO RECEBIDO ---------------- */
async function requestGitUser(user) {
  const userUrl = `https://api.github.com/users/${user}`;
  const reposUrl = `https://api.github.com/users/${user}/repos`;

  try {
    const response = await fetch(userUrl);
    const responseJSON = await response.json();
    const response2 = await fetch(reposUrl);
    const response2JSON = await response2.json();
    /* const response3 = await octokit.request("GET /users/{owner}", {
      owner: user,
    }); */

    if (responseJSON.message != "Not Found") {
      updateStorage(responseJSON, lastUsers, "lastUsersGit");
      updateStorage(response2JSON, lastRepos, "lastReposGit");
      // updateStorage(response3, lastEmails, "lastEmailsGit");
      updateStorageSelected(responseJSON, "userGit");
      updateStorageSelected(response2JSON, "repoGit");
      // updateStorageSelected(response3, "emailGit");
      // console.log(response2JSON);
      window.location.replace("../../pages/profile/index.html");
    } else requestError();
  } catch (error) {
    requestError();
    console.log(error);
  }
}

/* --------------- EM CASO DE ERRO NA REQUISIÇÂO ---------------- */
function requestError() {
  btnSearch[0].style.display = "block";
  btnSearch[1].style.display = "none";
  notFound.style.display = "block";
}

/* --------------- ACESSAR O LOCALSTORAGE SELECIONADO ---------------- */
function getStorageSelected(storage) {
  return JSON.parse(localStorage.getItem(storage));
}

/* -------------- ATUALIZAR NO STORAGE ÚLTIMOS USUÁRIOS PESQUISADOS ------------ */
function updateStorage(newUser, array, key) {
  array = JSON.parse(localStorage.getItem(key));

  if (array == null) array = [];
  array.unshift(newUser);

  if (array.length === 4) array.pop();
  localStorage.setItem(key, JSON.stringify(array));
}

/* -------------- ATUALIZAR NO STORAGE USUÁRIO SELECIONADO ------------ */
function updateStorageSelected(newData, storage) {
  localStorage.setItem(storage, JSON.stringify(newData));
}
