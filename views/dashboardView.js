import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get } from "../services/api.js";

const root = document.querySelector("main");

function dashboardTemplate(data) {
    return html`  
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
    ${data.length !== 0 ? html`
        ${data.map(fact => cardTemplate(fact))} `
            :
            html`
         <div>
            <p class="no-pets">No pets in dashboard</p>
        </div>`}
    </section>
 `
};

function cardTemplate(item) {
    return html`
                 <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src=${item.image}>
                    </article>
                    <h2 class="name">${item.name}</h2>
                    <h3 class="breed">${item.breed}</h3>
                    <div class="action">
                        <a class="btn" href="/details/${item._id}">Details</a>
                    </div>
                </div>
    `
};

export async function dashboardView() {
    const data = await get("data/pets?sortBy=_createdOn%20desc&distinct=name");
    render(dashboardTemplate(data), root);
};