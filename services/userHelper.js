
export function getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
}

export function setUserData(data) {
    return localStorage.setItem("userData", JSON.stringify(data))
}

export function clearLocalStorage() {
    return localStorage.removeItem("userData");
}

