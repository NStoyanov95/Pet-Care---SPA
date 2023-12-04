import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { getUserData } from "../services/userHelper.js";
import { del, get } from "../services/api.js";
import { getLikeCounts, isLikedByUser, like } from "../services/productHelper.js";

const root = document.querySelector("main");

function detailsTemplate(data, isOwner, likes, isLiked) {
  return html`
    <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${data.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${data.name}</h1>
                        <h3>Breed: ${data.breed}</h3>
                        <h4>Age: ${data.age}</h4>
                        <h4>Weight: ${data.weight}</h4>
                        <h4 class="donation">Donation: ${likes * 100}$</h4>
                    </div>
                  <div class="actionBtn">
                    ${isOwner ? html`
                    <a href="/edit/${data._id}" class="edit">Edit</a>
                    <a href="#" class="remove" @click=${onDelete}>Delete</a>` : html``}
                    ${getUserData() && !isOwner && !isLiked ? html`
                    <a href="#" class="donate" @click=${onLike}>Donate</a>` : html``}
                  </div>
                </div>
              </div>
        </section>
    `
}

let id = ""
export async function detailsView(ctx) {
  id = ctx.params.id;
  const data = await get(`data/pets/${id}`);
  debugger
  let isOwner = false;
  let isLiked;
  if (getUserData()) {
    isOwner = getUserData()._id === data._ownerId;
    isLiked = await isLikedByUser(id, getUserData()._id) !== 0;
  };
  const likes = await getLikeCounts(id)

  render(detailsTemplate(data, isOwner, likes, isLiked), root);
};

async function onDelete(e) {
  e.preventDefault();
  const confirmed = confirm("Are you sure ?");
  if (confirmed) {
    await del(`data/pets/${id}`);
    page.redirect("/dashboard");
  };
};

async function onLike(e) {
  e.preventDefault();
  await like(id);
  page.redirect(`/details/${id}`);
};



