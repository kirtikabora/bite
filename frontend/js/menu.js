/* =========================================
   BITE - MENU
========================================= */


/* =========================================
   FOOD DATA
========================================= */

const foods = [

    {
        id: 1,
        name: "Classic Cheese Burger",
        category: "Burgers",
        price: 179,
        rating: 4.8,
        description:
            "Juicy grilled patty with cheese and fresh vegetables.",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
        tags: ["cheesy"]
    },

    {
        id: 2,
        name: "Crispy Chicken Burger",
        category: "Burgers",
        price: 199,
        rating: 4.7,
        description:
            "Crispy chicken fillet with lettuce and creamy sauce.",
        image:
            "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=85",
        fallback:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
        tags: ["spicy"]
    },

    {
        id: 3,
        name: "Farmhouse Pizza",
        category: "Pizzas",
        price: 299,
        rating: 4.7,
        description:
            "Fresh vegetables, mozzarella and Italian herbs.",
        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",
        tags: ["cheesy", "healthy"]
    },

    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "Pizzas",
        price: 349,
        rating: 4.8,
        description:
            "Loaded pepperoni with melted mozzarella.",
        image:
            "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=85",
        tags: ["cheesy", "spicy"]
    },

    {
        id: 5,
        name: "Chicken Biryani",
        category: "Indian",
        price: 249,
        rating: 4.9,
        description:
            "Aromatic basmati rice with tender chicken.",
        image:
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d7a?auto=format&fit=crop&w=700&q=85",
        fallback:
            "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=85",
        tags: ["spicy"]
    },

    {
        id: 6,
        name: "Paneer Tikka",
        category: "Starters",
        price: 189,
        rating: 4.6,
        description:
            "Char-grilled paneer with peppers and Indian spices.",
        image:
            "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=85",
        tags: ["spicy", "healthy"]
    },

    {
        id: 7,
        name: "Creamy Alfredo Pasta",
        category: "Pasta",
        price: 219,
        rating: 4.6,
        description:
            "Creamy pasta with herbs and parmesan.",
        image:
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=700&q=85",
        tags: ["cheesy"]
    },

    {
        id: 8,
        name: "Chocolate Dessert",
        category: "Desserts",
        price: 149,
        rating: 4.7,
        description:
            "Rich chocolate dessert for a sweet finish.",
        image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85",
        tags: ["sweet"]
    },

    {
        id: 9,
        name: "Fresh Lime Cooler",
        category: "Drinks",
        price: 99,
        rating: 4.5,
        description:
            "Refreshing chilled lime drink.",
        image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85",
        tags: ["healthy"]
    }

];


/* =========================================
   VARIABLES
========================================= */

let selectedCategory = "All";

let selectedFood = null;


const categories = [

    "All",
    "Drinks",
    "Starters",
    "Burgers",
    "Pizzas",
    "Indian",
    "Pasta",
    "Desserts"

];


/* =========================================
   IMAGE FALLBACK
========================================= */

function imageError(imageElement, fallback) {

    if (
        fallback &&
        imageElement.src !== fallback
    ) {

        imageElement.src = fallback;

    }

}


/* =========================================
   RENDER CATEGORIES
========================================= */

function renderCategories() {

    const container =
        document.getElementById(
            "categories"
        );

    if (!container) return;


    container.innerHTML =

        categories.map(category => `

            <button
                class="category-btn ${
                    selectedCategory === category
                        ? "active"
                        : ""
                }"

                onclick="
                    filterCategory('${category}')
                "
            >

                ${category}

            </button>

        `).join("");

}


/* =========================================
   RENDER FOOD
========================================= */

function renderFoods(list = foods) {

    const grid =
        document.getElementById(
            "foodGrid"
        );

    const foodCount =
        document.getElementById(
            "foodCount"
        );


    if (!grid) return;


    if (foodCount) {

        foodCount.textContent =
            `${list.length} items`;

    }


    if (!list.length) {

        grid.innerHTML = `

            <div class="form-card">

                <h3>
                    No food found 😕
                </h3>

                <p
                    style="
                        margin-top:8px;
                        color:#8d8798;
                    "
                >
                    Try another search.
                </p>

            </div>

        `;

        return;

    }


    grid.innerHTML =

        list.map(food => `

            <div class="food-card">

                <img
                    class="food-image"

                    src="${food.image}"

                    alt="${food.name}"

                    onerror="
                        imageError(
                            this,
                            '${food.fallback || ""}'
                        )
                    "
                >


                <div class="food-info">

                    <h3>
                        ${food.name}
                    </h3>


                    <p class="food-description">
                        ${food.description}
                    </p>


                    <div class="food-meta">

                        <span class="rating">
                            ★ ${food.rating}
                        </span>

                        <span class="price">
                            ₹${food.price}
                        </span>

                    </div>


                    <div class="food-actions">

                        <button
                            class="btn btn-outline"

                            onclick="
                                openCustomization(
                                    ${food.id}
                                )
                            "
                        >
                            Customize
                        </button>


                        <button
                            class="btn btn-primary"

                            onclick="
                                quickAdd(
                                    ${food.id}
                                )
                            "
                        >
                            Add
                        </button>

                    </div>

                </div>

            </div>

        `).join("");

}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(category) {

    selectedCategory =
        category;


    renderCategories();


    if (category === "All") {

        renderFoods(foods);

        return;

    }


    renderFoods(

        foods.filter(

            food =>
                food.category === category

        )

    );

}


/* =========================================
   SEARCH
========================================= */

function searchFood() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) return;


    const query =
        input.value
            .toLowerCase()
            .trim();


    let result = foods;


    if (
        selectedCategory !== "All"
    ) {

        result =
            result.filter(

                food =>
                    food.category ===
                    selectedCategory

            );

    }


    if (query) {

        result =
            result.filter(food =>

                food.name
                    .toLowerCase()
                    .includes(query)

                ||

                food.category
                    .toLowerCase()
                    .includes(query)

                ||

                food.description
                    .toLowerCase()
                    .includes(query)

            );

    }


    renderFoods(result);

}


/* =========================================
   QUICK ADD
========================================= */

function quickAdd(id) {

    const food =
        foods.find(
            item => item.id === id
        );


    if (!food) {

        console.error(
            "Food not found:",
            id
        );

        return;

    }


    /*
       IMPORTANT:
       This calls the global
       addToCart() from app.js.
    */

    if (
        typeof addToCart !==
        "function"
    ) {

        alert(
            "Cart system could not load. Please refresh the page."
        );

        return;

    }


    addToCart({

        ...food,

        customization:
            "Regular"

    });

}


/* =========================================
   CUSTOMIZATION
========================================= */

function openCustomization(id) {

    selectedFood =
        foods.find(
            item => item.id === id
        );


    if (!selectedFood) return;


    const modal =
        document.getElementById(
            "customModal"
        );


    if (!modal) return;


    modal.classList.add("show");


    document.getElementById(
        "customFood"
    ).innerHTML = `

        <div class="cart-item">

            <img
                src="${selectedFood.image}"

                alt="${selectedFood.name}"

                onerror="
                    imageError(
                        this,
                        '${selectedFood.fallback || ""}'
                    )
                "
            >

            <div>

                <h3>
                    ${selectedFood.name}
                </h3>

                <p>
                    Base price:
                    ₹${selectedFood.price}
                </p>

            </div>

        </div>

    `;


    updateCustomPrice();

}


/* =========================================
   CLOSE CUSTOMIZATION
========================================= */

function closeCustomization() {

    const modal =
        document.getElementById(
            "customModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================
   CUSTOM PRICE
========================================= */

function updateCustomPrice() {

    if (!selectedFood) return;


    const size =
        Number(
            document.getElementById(
                "sizeOption"
            ).value
        );


    const cheese =
        Number(
            document.getElementById(
                "cheeseOption"
            ).value
        );


    const extra =
        Number(
            document.getElementById(
                "extraOption"
            ).value
        );


    const total =
        selectedFood.price +
        size +
        cheese +
        extra;


    document.getElementById(
        "customTotal"
    ).textContent =
        total;

}


/* =========================================
   ADD CUSTOMIZED FOOD
========================================= */

function addCustomizedItem() {

    if (!selectedFood) return;


    if (
        typeof addToCart !==
        "function"
    ) {

        alert(
            "Cart system could not load. Please refresh the page."
        );

        return;

    }


    const sizeText =
        document.getElementById(
            "sizeOption"
        )
        .selectedOptions[0]
        .text;


    const spice =
        document.getElementById(
            "spiceOption"
        ).value;


    const cheeseText =
        document.getElementById(
            "cheeseOption"
        )
        .selectedOptions[0]
        .text;


    const extraText =
        document.getElementById(
            "extraOption"
        )
        .selectedOptions[0]
        .text;


    const sizePrice =
        Number(
            document.getElementById(
                "sizeOption"
            ).value
        );


    const cheesePrice =
        Number(
            document.getElementById(
                "cheeseOption"
            ).value
        );


    const extraPrice =
        Number(
            document.getElementById(
                "extraOption"
            ).value
        );


    const total =
        selectedFood.price +
        sizePrice +
        cheesePrice +
        extraPrice;


    addToCart({

        ...selectedFood,

        id:
            selectedFood.id +
            "-" +
            Date.now(),

        price:
            total,

        customization:

            `${sizeText}, ${spice}, ${cheeseText}, ${extraText}`

    });


    closeCustomization();

}


/* =========================================
   FOOD RECOMMENDATION
========================================= */

function recommendFood(type) {

    const result =
        foods.filter(
            food =>
                food.tags.includes(type)
        );


    const box =
        document.getElementById(
            "recommendationResult"
        );


    if (!box) return;


    if (!result.length) {

        box.innerHTML =
            "<p>No recommendation found.</p>";

        return;

    }


    const food =
        result[0];


    box.innerHTML = `

        <div class="cart-item">

            <img
                src="${food.image}"

                alt="${food.name}"

                onerror="
                    imageError(
                        this,
                        '${food.fallback || ""}'
                    )
                "
            >


            <div class="cart-item-info">

                <h3>
                    ${food.name}
                </h3>


                <p>
                    ${food.description}
                </p>


                <strong>
                    ₹${food.price}
                </strong>

            </div>


            <button
                class="btn btn-primary"

                onclick="
                    quickAdd(${food.id})
                "
            >
                Add
            </button>

        </div>

    `;

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCategories();


        const params =
            new URLSearchParams(
                window.location.search
            );


        const category =
            params.get("categry");


        if (
            category &&
            categories.includes(category)
        ) {

            filterCategory(category);

        }

        else {

            renderFoods();

        }

    }
);