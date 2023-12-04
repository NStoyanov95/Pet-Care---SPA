import { render, html } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { post } from "../services/api.js";
import { setUserData } from "../services/userHelper.js";

const root = document.querySelector("main");

function loginTemplate() {
    return html`
    <section id="loginPage">
            <form class="loginForm" @submit=${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>
                <button class="btn" type="submit">Login</button>
                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </form>
        </section>
    `
}
export function loginView() {
    render(loginTemplate(), root);
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
        window.alert("incorrect email or password");
        return;
    }

    const data = await post("users/login", { email, password });
    setUserData(data);
    page.redirect("/");
}
