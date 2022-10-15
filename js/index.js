let form = document.getElementById('github-form')
let userList = document.getElementById('user-list')
let reposList = document.getElementById('repos-list')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    let input = form.childNodes[1].value
    fetch(`https://api.github.com/search/users?q=${input}`)
    .then (response => response.json())
    .then(users => {
        for (let i = 0; i < users.items.length; i++){
            let user = document.createElement('li')
            user.innerHTML = `
            <p>Username: ${users.items[i].login}</p>
            Profile: <a href=${users.items[i].html_url}>${users.items[i].html_url}</a>
            <img src = ${users.items[i].avatar_url}/>
            `

            userList.appendChild(user)
            
            user.addEventListener('click', handleClick)
        }
    })
}

function handleClick(e){
    e.preventDefault()
    let input = form.childNodes[1].value
    fetch(`https://api.github.com/users/${input}/repos`)
    .then(response => response.json())
    .then(repos => {
        for (let i = 0; i < repos.length; i++){
            let repo = document.createElement('li')
            repo.innerHTML = `
            <p>Repo Name: ${repos[i].name}</p>
            `
            reposList.appendChild(repo)
        }
    })
}