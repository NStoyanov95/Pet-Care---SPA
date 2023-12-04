import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { get, put } from "../services/api.js";

const root = document.querySelector("main");

function editTemplate(item) {
    return html`
    <section id="editPage">
            <form class="editForm" @submit=${onSubmit}>
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value=${item.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value=${item.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value=${item.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value=${item.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value=${item.image}>
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
    `
}

let id = ""
export async function editView(ctx) {
    id = ctx.params.id;
    const data = await get(`data/pets/${id}`)
    render(editTemplate(data), root);
}

async function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const { name, breed, age, weight, image } = Object.fromEntries(formData);
    if (!name || !breed || !age || !weight || !image) {
        return;
    }

    put(`data/pets/${id}`, { name, breed, age, weight, image });
    page.redirect(`/details/${id}`);
}