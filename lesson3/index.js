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
                    id: 1,
                    text: "Интересный дизайн, но дорогой.",
                },
            ],
        },
        {
            id: 3,
            product: "Sony PlayStation 5",
            reviews: [
                {
                    id: 1,
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
        reviewItem.textContent = review.id + ". " + review.text;
        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.innerHTML = "Удалить отзыв";
        deleteButton.addEventListener("click", deleteHandler);
        reviewsList.appendChild(reviewItem);
        reviewsList.appendChild(deleteButton);
    });
}

const submitInput = document.querySelector(".submitInput");
submitInput.addEventListener("click", submitHandler);

function submitHandler() {
    const productInput = document.getElementById("goodsInput").value;
    const reviewInput = document.getElementById("text").value;
    const productList = JSON.parse(localStorage.getItem("reviews"));
    productList.forEach(product => {
        if (product.product === productInput) {
            product.reviews.push({ id: (product.reviews.length) ?  product.reviews[product.reviews.length - 1].id + 1 : 1, text: reviewInput });
        }
    });
    localStorage.setItem("reviews", JSON.stringify(productList));
    renderGoods();
    const success = document.querySelector(".success");
    success.style.display = "";
}

function deleteHandler(e) {
    const productId = e.target.parentElement.parentElement
        .className.split("-").pop();
    const reviewId = e.target.previousElementSibling
        .innerHTML.split(".")[0]

    const productList = JSON.parse(localStorage.getItem("reviews"));
    productList.forEach(product => {
        if (product.id === Number(productId)) {
            product.reviews = product.reviews.filter(review => review.id !== Number(reviewId));
        }
    });
    localStorage.setItem("reviews", JSON.stringify(productList));
    renderGoods();
}

addToLocalStorage();
renderGoods();
renderAddReview();