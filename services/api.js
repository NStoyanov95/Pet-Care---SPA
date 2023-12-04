import { getUserData } from "./userHelper.js";

const host = "http://localhost:3030/";

export async function requester(method, url, data) {

    const options = {
        method,
        headers: {}
    };

    const userData = getUserData();

    if (userData) {
        const token = userData.accessToken;
        options.headers["X-Authorization"] = token
    }

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    };

    try {
        const response = await fetch(host + url, options);
        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message)
        }

        if (response.status === 204) {
            return response;
        }

        return await response.json();
    } catch (error) {
        window.alert(error.message);
        throw error
    }

};


export async function get(url) {
    return requester("GET", url);
};

export async function post(url, data) {
    return requester("POST", url, data);
};

export async function put(url, data) {
    return requester("PUT", url, data);
};

export async function del(url) {
    return requester("DELETE", url);
};

