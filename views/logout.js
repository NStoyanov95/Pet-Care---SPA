import { get } from "../services/api.js";
import { clearLocalStorage } from "../services/userHelper.js";
import page from "../node_modules/page/page.mjs"


export async function logout() {
    await get("users/logout");
    clearLocalStorage();
    page.redirect("/")
}