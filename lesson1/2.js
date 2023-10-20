"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  constructor() {
    this.chefs = new Map([
      ["Олег", "Пицца"],
      ["Андрей", "Суши"],
      ["Анна", "Десерт"]
    ]);

    this.dishes = new Map([
      ["Пицца Маргарита", "Пицца"],
      ["Пицца Пепперони", "Пицца"],
      ["Пицца Три сыра", "Пицца"],
      ["Суши Филадельфия", "Суши"],
      ["Суши Калифорния", "Суши"],
      ["Суши Чизмаки", "Суши"],
      ["Суши Сеякемаки", "Суши"],
      ["Десерт Тирамису", "Десерт"],
      ["Десерт Чизкейк", "Десерт"]
    ]);

    this.orders = new Map();
  }
  newOrder(client, ...dishes) {

    for (const dish of dishes) {
      const { name, type } = dish;

      const dishKey = `${type} ${name}`;
      if (!this.dishes.has(dishKey)) {
        throw new Error(`Блюда "${dishKey}" не существует.`);
      }
    }

    console.log(`Клиент ${client.firstname} ${client.lastname} заказал:`);

    for (const dish of dishes) {
      const { name, quantity, type } = dish;

      const dishKey = `${type} ${name}`;

      const chef = [...this.chefs.entries()].find(([_, specialization]) => specialization === type);
      const chefName = chef ? chef[0] : "нет подходящего повара";

      if (!this.orders.has(chefName)) {
        this.orders.set(chefName, new Map());
      }

      const chefOrders = this.orders.get(chefName);
      if (!chefOrders.has(dishKey)) {
        chefOrders.set(dishKey, 0);
      }

      chefOrders.set(dishKey, chefOrders.get(dishKey) + quantity);

      console.log(`${type} "${name}" - ${quantity}; готовит повар ${chefName}`);
    }
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.