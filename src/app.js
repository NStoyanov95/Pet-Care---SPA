import page from "../node_modules/page/page.mjs";
import { navbarView } from "../views/navView.js";
import { homepageView } from "../views/homepageView.js";
import { loginView } from "../views/loginView.js";
import { registerView } from "../views/registerView.js";
import { logout } from "../views/logout.js";
import { dashboardView } from "../views/dashboardView.js";
import { detailsView } from "../views/detailsView.js";
import { createView } from "../views/createView.js";
import { editView } from "../views/editView.js";

page(navbarView);
page("/index.html", "/");
page("/", homepageView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logout);
page("/dashboard", dashboardView);
page("/details/:id", detailsView)
page("/create", createView)
page("/edit/:id", editView)


page.start()