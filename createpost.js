let description = document.querySelector("#description")
let image = document.querySelector("#image")
let submit = document.querySelector("#submitbtn")
let error = document.querySelector("#error")

console.log(image)



submit.addEventListener("click", () => {
    let formData = new FormData()
    formData.append("file", image.files[0]);
    formData.append("description", description.value)
    fetch("http://127.0.0.1:8080/api/post", {
        method: "POST",
        credentials: "include",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        window.location.href = "/"
    })
    .catch(e => {
        error.textContent = e
        console.log(e)
    })
})