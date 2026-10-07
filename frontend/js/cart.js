let discount = 0;
let couponApplied = false;

function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cartItems");

    if (!cart.length) {
        container.innerHTML = `
            <div class="form-card">
                <h2>Your cart is empty 🛒</h2>
                <p style="margin:10px 0 20px;color:#8d8798;">
                    Add something delicious!
                </p>
                <a href="menu.html" class="btn btn-primary">
                    Explore Menu
                </a>
            </div>
        `;

        updateSummary();
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p style="font-size:12px;color:#8d8798;margin:5px 0;">
                    ${item.customization || "Regular"}
                </p>

                <strong>₹${item.price}</strong>

                <div class="quantity">

                    <button
                        class="qty-btn"
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <strong>${item.quantity}</strong>

                    <button
                        class="qty-btn"
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <button
                        class="btn btn-danger btn-small"
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>

        </div>
    `).join("");

    updateSummary();
}

function changeQuantity(index, change) {
    const cart = getCart();

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
    updateCartCount();
}

function removeItem(index) {
    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    renderCart();
    updateCartCount();

    showToast("Item removed.");
}

function calculateSubtotal() {
    return getCart().reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
}

function applyCoupon() {
    const code = document
        .getElementById("couponInput")
        .value
        .trim()
        .toUpperCase();

    const subtotal = calculateSubtotal();

    if (code === "BITE20") {
        discount = Math.round(subtotal * 0.20);
        couponApplied = true;

        document.getElementById("couponMessage").textContent =
            "BITE20 applied — 20% off! 🎉";

    } else if (code === "WELCOME50") {
        discount = Math.min(50, subtotal);
        couponApplied = true;

        document.getElementById("couponMessage").textContent =
            "WELCOME50 applied — ₹50 off! 🎉";

    } else {
        discount = 0;
        couponApplied = false;

        document.getElementById("couponMessage").textContent =
            "Invalid coupon.";
    }

    updateSummary();
}

function updateSummary() {
    const subtotal = calculateSubtotal();

    const delivery = subtotal > 499 || subtotal === 0 ? 0 : 40;

    const total = Math.max(
        0,
        subtotal + delivery - discount
    );

    document.getElementById("subtotal").textContent = subtotal;
    document.getElementById("delivery").textContent = delivery;
    document.getElementById("discount").textContent = discount;
    document.getElementById("total").textContent = total;

    const button = document.getElementById("checkoutBtn");

    if (subtotal === 0) {
        button.disabled = true;
        button.style.opacity = "0.5";
    } else {
        button.disabled = false;
        button.style.opacity = "1";
    }
}

function goCheckout() {
    if (calculateSubtotal() === 0) {
        showToast("Your cart is empty.");
        return;
    }

    localStorage.setItem(
        "biteDiscount",
        discount
    );

    window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", renderCart);