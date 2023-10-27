function addToLocalStorage() {
    const initialData = [
        {
            id: 1,
            product: "Apple iPhone 13",
            reviews: [
                {
                    id: 1,
                    text: "Отличный телефон! Батарея держится долго.",
                },
                {
                    id: 2,
                    text: "Камера супер, фото выглядят просто потрясающе.",
                },
            ],
        },
        {
            id: 2,
            product: "Samsung Galaxy Z Fold 3",
            reviews: [
                {
                    id: 3,
                    text: "Интересный дизайн, но дорогой.",
                },
            ],
        },
        {
            id: 3,
            product: "Sony PlayStation 5",
            reviews: [
                {
                    id: 4,
                    text: "Люблю играть на PS5, графика на высоте.",
                },
            ],
        },
    ];
    if (!localStorage.getItem("reviews")) {
        localStorage.setItem("reviews", JSON.stringify(initialData));
    }
}

function renderGoods() {
    const appElement = document.getElementById('app');
    appElement.innerHTML = '';
    const products = JSON.parse(localStorage.getItem("reviews"));
    products.forEach(product => {
       const productElement = document.createElement('div');
       productElement.className = `product-${product.id}`;
       productElement.innerHTML = `<h2>${product.product}</h2>`;
       productElement.addEventListener("click", addReviewsHandler);
       const productReviews = document.createElement("ul");
       productReviews.className = "review-list";
        productReviews.innerHTML = "";
        productElement.appendChild(productReviews);
       appElement.appendChild(productElement);
    });
}

function renderAddReview() {
    const goodsEl = document.getElementById('goods');
    const products = JSON.parse(localStorage.getItem("reviews"));
    products.forEach(product => {
        const el = document.createElement("option");
        el.value = product.product;
        goodsEl.appendChild(el);
    });
}

function addReviewsHandler(e) {
    if (e.target.parentElement.className.split("-")[0] !== "product") {
        return;
    }
    const reviewsList = document.querySelector(`.${e.target.parentElement.className} .review-list`);
    reviewsList.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("reviews"));
    const id = (e.target.parentElement.className).split("-").pop();
    products[id-1].reviews.forEach(review => {
        const reviewItem = document.createElement('li');
        reviewItem.className = 'review';
        reviewItem.textContent = review.text;
        reviewsList.appendChild(reviewItem);
    });
}

addToLocalStorage();
renderGoods();
renderAddReview();