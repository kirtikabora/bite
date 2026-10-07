let paymentMethod = "UPI";

function selectPayment(button, method) {
    document.querySelectorAll(".category-list .category-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    paymentMethod = method;
}

function loadCheckout() {
    const cart = getCart();

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const discount =
        Number(localStorage.getItem("biteDiscount")) || 0;

    const delivery =
        subtotal > 499 || subtotal === 0 ? 0 : 40;

    const total =
        Math.max(0, subtotal + delivery - discount);

    document.getElementById("checkoutSubtotal").textContent = subtotal;
    document.getElementById("checkoutDelivery").textContent = delivery;
    document.getElementById("checkoutDiscount").textContent = discount;
    document.getElementById("checkoutTotal").textContent = total;

    document.getElementById("checkoutItems").innerHTML =
        cart.map(item => `
            <div class="summary-row">
                <span>${item.name} × ${item.quantity}</span>
                <strong>₹${item.price * item.quantity}</strong>
            </div>
        `).join("");
}

function placeOrder() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
        showToast("Please fill all delivery details.");
        return;
    }

    const cart = getCart();

    if (!cart.length) {
        showToast("Your cart is empty.");
        return;
    }

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const discount =
        Number(localStorage.getItem("biteDiscount")) || 0;

    const delivery =
        subtotal > 499 ? 0 : 40;

    const total =
        Math.max(0, subtotal + delivery - discount);

    const order = {
        id: "BITE" + Math.floor(10000 + Math.random() * 90000),
        items: cart,
        name,
        phone,
        address,
        paymentMethod,
        total,
        status: "Confirmed",
        date: new Date().toLocaleString()
    };

    const orders =
        JSON.parse(localStorage.getItem("biteOrders")) || [];

    orders.unshift(order);

    localStorage.setItem(
        "biteOrders",
        JSON.stringify(orders)
    );

    localStorage.removeItem("biteCart");
    localStorage.removeItem("biteDiscount");

    window.location.href =
        `tracking.html?id=${order.id}`;
}

document.addEventListener("DOMContentLoaded", loadCheckout);