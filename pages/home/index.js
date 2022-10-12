const recentUsers = document.querySelector(".recent-users")
const inputSearch = document.querySelector('input')
const notFound = document.querySelector('#not-found')
const btnSearch = document.querySelectorAll('[data-search]')




/* -------------- VERIFICAR ÚLTIMOS USUÁRIOS PESQUISADOS ------------- */
lastUsers = JSON.parse(localStorage.getItem("lastUsersGit"))
lastRepos = JSON.parse(localStorage.getItem("lastReposGit"))
if (lastUsers != null) renderLastUsers(lastUsers)



/* -------------- RENDERIZAR MINIATURAS ÚLTIMOS USUÁRIOS ------------- */
function renderLastUsers(users) {
    recentUsers.innerHTML = ''

    users.forEach((user, index) => {
        recentUsers.insertAdjacentHTML('beforebegin',
            `<li class="user">
            <img src="${user.avatar_url}" alt="ícones de fotos de perfil">
            <button id="${index}" class="btn-user">Acessar este perfil</button>
        </li>`
        )
    });
    mapBtnsUsers()
}


/* --------------- MAPEAR BOTÕES PARA ACESSAR ÚLTIMOS USUÁRIOS -------------- */
function mapBtnsUsers() {
    const users = document.querySelectorAll(".user")
    users.forEach(user => {
        const btnUser = user.lastElementChild;

        user.onmouseover = () => btnUser.style.display = 'block'
        user.onmouseout = () => btnUser.style.display = 'none'
    });

    const btnUsers = document.querySelectorAll(".btn-user")
    btnUsers.forEach(btnUser => {
        btnUser.onclick = () => {
            // userSelected = []
            const id = btnUser.id
            // console.log(btnUser.id)
            userSelected = lastUsers[id]
            repoSelected = lastRepos[id]
            console.log("repositorio", repoSelected)

            updateUserSelected(lastRepos)
            updateRepoSelected(repoSelected)
            window.location.replace("../profile/index.html");

        }
    })
}


/* ------------- MONITORAR EVENTOS DE PESQUISA DE USUÁRIOS ------------- */
inputSearch.onkeyup = () => {
    if (inputSearch.value != "") {
        // console.dir()
        btnSearch[0].classList.add("btn-color")
        btnSearch[0].onclick = () => {
            btnSearch[0].style.display = "none"
            btnSearch[1].style.display = "block"
            requestGitUser(inputSearch.value);
        }
    } else {
        btnSearch[0].classList.remove("btn-color")
        btnSearch[0].style.display = "block"
        btnSearch[1].style.display = "none"
        btnSearch[0].onclick = "none";
        notFound.style.display = "none"
    }
}


/* ------------- BUSCAR NA API O USUÁRIO RECEBIDO ---------------- */
async function requestGitUser(user) {
    const url = `https://api.github.com/users/${user}`
    const reposUrl = `https://api.github.com/users/${user}/repos`

    try {
        const response = await fetch(url)
        const responseJSON = await response.json()
        // console.log(responseJSON)
        if (responseJSON.message == 'Not Found') {
            btnSearch[0].style.display = "block"
            btnSearch[1].style.display = "none"
            notFound.style.display = "block"
            console.log('erro')
        } else {
            try {
                const response2 = await fetch(reposUrl)
                const responseJSON2 = await response2.json()
                updateStorage(responseJSON,lastUsers,"lastUsersGit")
                updateUserSelected(responseJSON)

                updateStorage(responseJSON2,lastRepos,"lastReposGit")
                updateRepoSelected(responseJSON2)

                window.location.replace("../profile/index.html")
            } catch{

            }
        }
    }
    catch {

    }
}

/* -------------- ATUALIZAR NO STORAGE ÚLTIMOS USUÁRIOS PESQUISADOS ------------ */
function updateStorage(newUser, array, key) {
    array = JSON.parse(localStorage.getItem(key))
    // console.log(lastUsers)

    if (array == null) array = []

    array.unshift(newUser)

    if (array.length === 4) array.pop()

    localStorage.setItem(key, JSON.stringify(array))
    // console.log(lastUsers)
}


/* -------------- ATUALIZAR NO STORAGE USUÁRIO SELECIONADO ------------ */
function updateUserSelected(newUser) {
    localStorage.setItem("userGit", JSON.stringify(newUser))
    console.log(userSelected)
}

function updateRepoSelected(newRepo) {
    localStorage.setItem("repoGit", JSON.stringify(newRepo))
    console.log(userSelected)
}