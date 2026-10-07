/* =========================================
   BITE - ADMIN JAVASCRIPT
========================================= */


/* =========================================
   ORDERS
========================================= */

function getOrders() {

    return JSON.parse(

        localStorage.getItem(
            "biteOrders"
        )

    ) || [];

}



/* =========================================
   RIDERS
========================================= */

function getRiders() {

    return JSON.parse(

        localStorage.getItem(
            "biteRiders"
        )

    ) || [];

}



/* =========================================
   REVIEWS
========================================= */

function getReviews() {

    return JSON.parse(

        localStorage.getItem(
            "quickBiteFeedback"
        )

    ) || [];

}



/* =========================================
   DASHBOARD
========================================= */

function loadDashboard() {

    const orders =
        getOrders();


    const riders =
        getRiders();


    const reviews =
        getReviews();



    const totalOrders =
        document.getElementById(
            "totalOrders"
        );


    const activeOrders =
        document.getElementById(
            "activeOrders"
        );


    const onlineRiders =
        document.getElementById(
            "onlineRiders"
        );


    const revenue =
        document.getElementById(
            "revenue"
        );


    const reviewCount =
        document.getElementById(
            "reviewCount"
        );



    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }



    if (activeOrders) {

        activeOrders.textContent =

            orders.filter(

                order =>
                    order.status !==
                    "Delivered"

            ).length;

    }



    if (onlineRiders) {

        onlineRiders.textContent =

            riders.filter(

                rider =>
                    rider.online === true

            ).length;

    }



    if (revenue) {

        const total =

            orders.reduce(

                (sum, order) =>

                    sum +
                    Number(
                        order.total || 0
                    ),

                0

            );


        revenue.textContent =
            `₹${total}`;

    }



    if (reviewCount) {

        reviewCount.textContent =
            reviews.length;

    }

}



/* =========================================
   UPDATE ORDER
========================================= */

function updateOrderStatus(
    id,
    status
) {

    const orders =
        getOrders();


    const order =
        orders.find(
            order => order.id == id
        );


    if (!order) return;


    order.status =
        status;


    localStorage.setItem(

        "biteOrders",

        JSON.stringify(orders)

    );


    alert(
        `Order updated to ${status}`
    );


    loadDashboard();

}



/* =========================================
   DELETE ORDER
========================================= */

function deleteOrder(id) {

    let orders =
        getOrders();


    orders =
        orders.filter(

            order =>
                order.id != id

        );


    localStorage.setItem(

        "biteOrders",

        JSON.stringify(orders)

    );


    location.reload();

}



/* =========================================
   ADMIN LOGOUT
========================================= */

function adminLogout() {

    localStorage.removeItem(
        "biteUser"
    );

    localStorage.removeItem(
        "biteAdmin"
    );

    localStorage.removeItem(
        "adminLoggedIn"
    );


    window.location.href =
        "../login.html";

}



/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(

    "DOMContentLoaded",

    loadDashboard

);