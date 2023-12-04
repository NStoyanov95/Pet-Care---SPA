import { html, render } from "../node_modules/lit-html/lit-html.js";
import { post } from "../services/api.js";
import { setUserData } from "../services/userHelper.js";
import page from "../node_modules/page/page.mjs"

const root = document.querySelector("main");

function registerTemplate() {
  return html`
    <section id="registerPage">
            <form class="registerForm" @submit=${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>
                <button class="btn" type="submit">Register</button>
                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>
    `
}

export function registerView() {
  render(registerTemplate(), root);
}

async function onSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target);
  const { email, password, repeatPassword } = Object.fromEntries(formData);

  if (!email || !password || !repeatPassword || password !== repeatPassword) {
    alert("incorrect input");
    return;
  }

  const data = await post("users/register", { email, password });
  setUserData(data);
  page.redirect("/");

}