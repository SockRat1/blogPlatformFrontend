function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
    if(!!getCookie("Authorization")){
    fetch("http://127.0.0.1:8080/api/verify", {
        credentials: "include"
    })
    .then(respose => {
        if(respose.ok){
           return respose.text() 
        }
        else if(respose.status === 401){
            window.location.href = "/login.html"
            return Promise.reject(respose.status)
        }
        else{
            window.location.href = "/error.html"
            return Promise.reject(respose.status)
        }
    })
    .catch(e => console.error(e))
    }
    else {
        window.location.href = "/login.html"
    }