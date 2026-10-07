/* =========================================
   BITE - MAIN APP
========================================= */

function getCart() {

    var cart = localStorage.getItem("biteCart");

    if (!cart) {
        return [];
    }

    try {
        var data = JSON.parse(cart);

        if (Array.isArray(data)) {
            return data;
        }

        return [];

    } catch (error) {
        console.error("Cart error:", error);
        return [];
    }
}


function saveCart(cart) {

    localStorage.setItem(
        "biteCart",
        JSON.stringify(cart)
    );
}


function updateCartCount() {

    var cart = getCart();
    var count = 0;

    for (var i = 0; i < cart.length; i++) {
        count += Number(cart[i].quantity || 0);
    }

    var elements =
        document.querySelectorAll(".cart-count");

    for (var i = 0; i < elements.length; i++) {
        elements[i].textContent = count;
    }
}


function showToast(message) {

    var toast =
        document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";
        toast.className = "toast";

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}


function addToCart(item) {

    console.log("Adding to cart:", item);

    var cart = getCart();
    var found = null;

    for (var i = 0; i < cart.length; i++) {

        if (
            String(cart[i].id) === String(item.id) &&
            String(cart[i].customization || "") ===
            String(item.customization || "")
        ) {

            found = cart[i];
            break;
        }
    }

    if (found) {

        found.quantity =
            Number(found.quantity || 0) +
            Number(item.quantity || 1);

    } else {

        var newItem =
            Object.assign({}, item);

        newItem.quantity =
            Number(newItem.quantity || 1);

        cart.push(newItem);
    }

    saveCart(cart);

    updateCartCount();

    showToast(
        item.name + " added to cart! 🍔"
    );
}


function updateAuthUI() {

    var loginBtn =
        document.getElementById("loginBtn");

    var profileBtn =
        document.getElementById("profileBtn");

    var user =
        localStorage.getItem("biteUser");

    if (user) {

        if (loginBtn) {
            loginBtn.style.display = "none";
        }

        if (profileBtn) {
            profileBtn.style.display = "flex";
        }

    } else {

        if (loginBtn) {
            loginBtn.style.display = "flex";
        }

        if (profileBtn) {
            profileBtn.style.display = "none";
        }
    }
}


function logout() {

    localStorage.removeItem("biteUser");
    localStorage.removeItem("biteAdmin");
    localStorage.removeItem("adminLoggedIn");

    var path =
        window.location.pathname.toLowerCase();

    if (path.indexOf("/admin/") !== -1) {

        window.location.href = "../login.html";

    } else {

        window.location.href = "login.html";
    }
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();
        updateAuthUI();

    }
);