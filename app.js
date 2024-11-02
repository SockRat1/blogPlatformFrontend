let list = document.querySelector(".center")
let logout = document.querySelector("#logout")
let username = document.querySelector("#username")
let create = document.querySelector("#create")
let isAdmin = false

create.addEventListener("click", () => {
    window.location.href = "/createpost.html"
})


fetch("http://127.0.0.1:8080/api/getaccount", {
    credentials: "include"
})
.then(response => response.json())
.then(data => {
    username.textContent = data.username
    isAdmin = data.admin
    render()
})
.catch(e => console.error(e))


function render(){
fetch("http://127.0.0.1:8080/api/getallposts", {
    credentials: "include"
})
.then(response => response.json())
.then(data => {
    list.innerHTML = ""
    if(data.length === 0){
        list.insertAdjacentText("beforeend", "Не найдено ни одной публикации")
    }
    else {
    for(post of data){
        list.insertAdjacentHTML("beforeend", getTemplate(post))
    }
    }


    if(isAdmin){
        let removes = document.getElementsByClassName("remove")
        let commentremoves = document.getElementsByClassName("commentremove")
        for(let commentremove of commentremoves) {
            commentremove.addEventListener("click", event => {
                    fetch(`http://127.0.0.1:8080/api/removecomment/${event.target.dataset.id}`, {
                        method: "DELETE",
                        credentials: "include"
                    }).then(response => response.text())
                    .then(data => {
                        render()
                    })
                    .catch(e => console.error(e))
        })

        for(let remove of removes){
            remove.addEventListener("click", (event) => {
                fetch(`http://127.0.0.1:8080/api/removepost/${event.target.dataset.id}`, {
                    method: "DELETE",
                    credentials: "include"
                })
                .then(response => response.text())
                .then(data => {
                    render()
                })
                .catch(e => console.error(e))
            })
        }
    }
    }
    let submits = document.getElementsByClassName("submit")
    let commentinputs = document.getElementsByClassName("commentinput")
    for(let submit of submits){
        submit.addEventListener("click", event => {
            let textvar = ""
            for(let commentinput of commentinputs) {
                if(commentinput.dataset.id === event.target.dataset.id){
                    textvar = commentinput.value
                    commentinput.value = ""
                }
            }

            fetch("http://127.0.0.1:8080/api/addcomment", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: event.target.dataset.id,
                    text: textvar
                })
            })
            .then(response => response.text())
            .then(data => {render()})
            .catch(e => console.error(e))
        })
    }
})
}
logout.addEventListener("click", () => {
        document.cookie = `Authorization=; expires=${new Date(0)};`
        window.location.href = "/login.html"
})


function getTemplate(post){

    let comments = ``
    for(comment of post.comments){
        comments = comments + `<p class="text"><span class="nickname">${comment.author}</span>: ${comment.text} ${isAdmin ? `<button class="commentremove" data-id="${comment.id}">&cross;</button>` : ""}</p>`
    }

    return  `
            ${isAdmin ? `<button class="remove" data-id="${post.id}">&cross;</button>` : ""}
            <div class="divpost" >
                <p class="author">Author: ${post.author}</p>
                <img class="postimage" src="${"data:image/jpeg;base64," + post.image}">
                <p class="description">${post.description}</p>

                <div>
                    <input type="text" class="commentinput" data-id="${post.id}">
                    <button class="submit" data-id="${post.id}">Отправить</button>
                </div>
                <div class="commenttext"> 
                    ${comments}
                </div>
            </div>`
}