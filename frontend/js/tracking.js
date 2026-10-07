const statuses = [
    "Confirmed",
    "Preparing",
    "Ready",
    "Picked Up",
    "Delivered"
];

let currentStep = 1;

function loadTracking() {

    const params =
        new URLSearchParams(window.location.search);

    const orderId = params.get("id");

    const orders =
        JSON.parse(localStorage.getItem("biteOrders")) || [];

    const order =
        orders.find(item => item.id === orderId);

    document.getElementById("orderNumber").textContent =
        order
            ? `Order #${order.id}`
            : "Demo Order";

    if (order) {

        currentStep =
            Math.max(
                1,
                statuses.indexOf(order.status) + 1
            );

        updateTracking();
    }
}

function simulateNextStatus() {

    if (currentStep < statuses.length) {
        currentStep++;
        updateTracking();
    } else {
        showToast("Order already delivered! 🎉");
    }
}

function updateTracking() {

    document.getElementById("currentStatus").textContent =
        statuses[currentStep - 1];

    const steps =
        document.querySelectorAll(".timeline-step");

    steps.forEach((step, index) => {

        if (index < currentStep) {
            step.classList.add("completed");
        } else {
            step.classList.remove("completed");
        }
    });

    const params =
        new URLSearchParams(window.location.search);

    const orderId = params.get("id");

    const orders =
        JSON.parse(localStorage.getItem("biteOrders")) || [];

    const order =
        orders.find(item => item.id === orderId);

    if (order) {

        order.status =
            statuses[currentStep - 1];

        localStorage.setItem(
            "biteOrders",
            JSON.stringify(orders)
        );
    }
}

document.addEventListener("DOMContentLoaded", loadTracking);