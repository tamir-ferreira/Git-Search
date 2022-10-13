import { Octokit } from "https://cdn.skypack.dev/octokit";

const cardContainer = document.querySelector(".card-container")
const cardList = document.querySelector(".card-list")
const sendMail = document.querySelector("#send-mail")
const btnMail = document.querySelector("#btn-mail")
userSelected = JSON.parse(localStorage.getItem("userGit"))
repoSelected = JSON.parse(localStorage.getItem("repoGit"))
document.title = userSelected.name || "GitHub User"


renderCardUser(userSelected)

/* ----------- RENDERIZAR O CARD DE IDENTIFICAÇÃO DO USUÁRIO -----------*/
function renderCardUser(user) {
    const { name, avatar_url, bio, login } = user
    let email = getEmail(login)
    email.then(response => {
        email = response
        console.log(response)
        cardContainer.insertAdjacentHTML("afterbegin",
            `<img src="${avatar_url}" alt="" />
            <div class="card-content">
                <h2 class="title-2">${name || login}</h2>
                <span class="bio text-3">${bio || ''}</span>
                <span class="text-3">${email || ''}</span>
            </div>`
        )
        renderCardRepos(repoSelected)
    })

    btnMail.onclick = (event) => {
        if (email == null) {
            alert('Endereço de E-mail não disponível no GitHub')
            event.preventDefault()
        }
    }
}


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


/* --------------- RECUPERAR ENDEREÇO DE E-MAIL DO USUÁRIO ---------------- */
async function getEmail(username) {
    const token = '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'
    const octokit = new Octokit({ auth: token });

    try {
        const result = await octokit.request("GET /users/{owner}", {
            owner: username,
        });

        if (result.data.email != null) {
            sendMail.href = `mailto:${result.data.email}`
            return result.data.email
        }

    } catch (error) {
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
    }
}

