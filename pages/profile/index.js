const cardContainer = document.querySelector(".card-container")
const cardList = document.querySelector(".card-list")
userSelected = JSON.parse(localStorage.getItem("userGit"))
repoSelected = JSON.parse(localStorage.getItem("repoGit"))
document.title = userSelected.name || "GitHub User"


/* ----------- RENDERIZAR O CARD DE IDENTIFICAÇÃO DO USUÁRIO -----------*/
function renderCardUser(user) {
    const { name, avatar_url, bio, login, email } = user
    cardContainer.insertAdjacentHTML("afterbegin",
        `<img src="${avatar_url}" alt="" />
        <div class="card-content">
            <h2 class="title-2">${name || login}</h2>
            <span class="text-3">${bio || ''}</span>
            <span class="text-3">${email || ''}</span>
        </div>`
    )
    renderCardRepos(repoSelected)
}
renderCardUser(userSelected)


/* ----------- RENDERIZAR OS CARDS DOS REPOSITÓRIOS DO USUÁRIO -----------*/
function renderCardRepos(repositories) {
    cardList.innerHTML = ""
    repositories.forEach(repository => {
        const { name, description, html_url, homepage } = repository

        cardList.insertAdjacentHTML("afterbegin",
            `<li class="card">
                <h3 class="text-2">${name || ''}</h3>
                <p class="text-5">${description || 'No description in this repository!'}</p>
                <div class="container-btns">
                <a href=${html_url}>
                    <button class="btn-small">Repositório</button>
                </a>
                <a target="_blank" href=${homepage || ''}>
                    <button class="btn-small">Demo</button>
                </a>
                </div>
            </li>`
        )
    });
}

