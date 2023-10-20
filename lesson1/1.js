"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

let musicCollection = {
    albums: [
        {
            title: "What’s Going On",
            artist: "Marvin Gaye",
            year: "1971"
        },
        {
            title: "Pet Sounds",
            artist: "The Beach Boys",
            year: "1966"
        },
        {
            title: "Songs in the Key of Life",
            artist: "Stevie Wonder",
            year: "1976"
        },
        {
            title: "Abbey Road",
            artist: "The Beatles",
            year: "1969"
        }
    ],
    [Symbol.iterator]() {
        let currentIndex = 0;
        let collection = this.albums;

        return {
            next() {
                if (currentIndex < collection.length) {
                    let currentAlbum = collection[currentIndex++];
                    return {
                        value: `${currentAlbum.title} - ${currentAlbum.artist} (${currentAlbum.year})`,
                        done: false
                    };
                } else {
                    return {done: true};
                }
            }
        };
    }
};

for (let album of musicCollection) {
    console.log(album);
}

console.log("__________________________________________");