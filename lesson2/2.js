"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. На странице должны отображаться все товары и отзывы 
под каждым товаром. Под каждым блоком отзывов, должна быть возможность добавить 
отзыв для конкретного продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
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
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

function createReview(productIndex, reviewText) {
  const reviewId = initialData[productIndex].reviews.length + 1;
  const newReview = { id: reviewId, text: reviewText };
  initialData[productIndex].reviews.push(newReview);
}

function renderReviews() {
  const appElement = document.getElementById('app');
  appElement.innerHTML = '';

  initialData.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'reviews';
    productElement.innerHTML = `<h2>${product.product}</h2>`;

    const reviewList = document.createElement('ul');
    reviewList.className = 'review-list';

    product.reviews.forEach(review => {
      const reviewItem = document.createElement('li');
      reviewItem.className = 'review';
      reviewItem.textContent = review.text;
      reviewList.appendChild(reviewItem);
    });

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.placeholder = 'Оставьте отзыв';
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Добавить отзыв';

    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'error-message';

    buttonElement.addEventListener('click', () => {
      const reviewText = inputElement.value;
      if (reviewText.length < 50 || reviewText.length > 500) {
        errorMessageElement.textContent = 'Отзыв должен быть от 50 до 500 символов';
      } else {
        errorMessageElement.textContent = '';
        createReview(initialData.indexOf(product), reviewText);
        renderReviews();
      }
    });

    productElement.appendChild(reviewList);
    productElement.appendChild(inputElement);
    productElement.appendChild(buttonElement);
    productElement.appendChild(errorMessageElement);

    appElement.appendChild(productElement);
  });
}

renderReviews();
