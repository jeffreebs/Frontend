function saveSession(token,userId,role){
    localStorage.setItem("token",token)
    localStorage.setItem("user_id",userId)
    localStorage.setItem("role",role)
}

function getToken (){
    return localStorage.getItem("token");
}

function getUserId(){
    return localStorage.getItem("user_id");

}

function clearSession(){
    localStorage.clear();
}

function getUserRole(){
    return localStorage.getItem("role");
}

function isLoggedIn(){
    return getToken() !== null;
}