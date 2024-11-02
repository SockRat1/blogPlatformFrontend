let usernameInput = document.querySelector("#username")
let passwordInput = document.querySelector("#password")
let submit = document.querySelector("#submit")
let error = document.querySelector("#error")


submit.addEventListener("click", regFetch)

function regFetch(){
fetch("http://127.0.0.1:8080/api/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
    })
}).then(response => {
    if(response.status !== 400 && response.ok){
        return response.text()
    }
    else if(response.status === 400){
        error.textContent = "Неправильный логин или пороль"

    }
    else {
        error.textContent = "Ошибка, повторите позднее" + response.status
    }
    return new Promise(null)
}).then(data =>{
    if(data !== null){
        document.cookie = `Authorization=${data}; expires=${new Date(Date.now() + 1000*60*60)};`
        error.textContent = "Успешно!"
        setTimeout(()=>{window.location.href="/index.html"}, 1000)

    }
}
).catch((e) => error.textContent = "Ошибка, повторите позднее " + e)
}
