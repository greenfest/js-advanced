"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books.
2. Реализуйте геттер allBooks, который возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
    constructor(books) {
        if(books.length === new Set(books).size) {
            this.books = books;
        } else throw new Error("Массив содержит дубликаты");
    }
    get allBooks() {
        return this.books;
    }
    addBook(title) {
        if (!this.books.includes(title)) {
            this.books.push(title);
        } else throw new Error("Книга с таким названием уже существует в списке");
    }
    removeBook(title) {
        if (this.books.includes(title)) {
            this.books = this.books.filter(book => book !== title);
        } else throw new Error("Книги с таким названием нет в списке");
    }
    hasBook(title) {
        return !!this.books.includes(title);
    }
}

const library = new Library(["Игра в классики", "Бесконечная шутка", "Улисс", "Властелин колец"]);
console.log(library.allBooks);
library.addBook("Игра престолов");
library.removeBook("Бесконечная шутка");
// library.removeBook("Трое в лодке, не считая собаки");
console.log(library.hasBook("Игра в классики"));
console.log(library.allBooks);



