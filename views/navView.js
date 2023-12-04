
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from "../services/userHelper.js";

const header = document.querySelector("header")

function navbarTemplate(userData) {
    return html`
           <nav>
            <section class="logo">
                <img src="./images/logo.png" alt="logo">
            </section>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
        ${userData ? html`
          <li><a href="/create">Create Postcard</a></li>
           <li><a href="/logout">Logout</a></li>
        `  :
            html`
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        `  }
        </ul>
        </nav>
    `
};

export function navbarView(ctx, next) {
    const userData = getUserData();
    render(navbarTemplate(userData), header)
    next();
};