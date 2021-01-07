// Контекст вызова - это то, что кружает функцию и в каких условиях она вызывается

// функция может вызываться 4-мя способами и в каждом контекст вызова отличается

//'use strict'
// function showThis(a, b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }
// showThis(4, 5);

// const obj = {
//     a: 20,
//     b: 15,
//     sum: function() {
//         function shout() {
//             console.log(this);
//         }
//         shout();
//     }
// };
// obj.sum();


// внутри функций конструкторов контекст вызова для всех методов и свойств будет
// только что созданный новый объект
// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
// }

// ручное присвоение this к любой функции
// function sayName(surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }
// const user = {
//     name:'john'
// };

// // call и apply делают одно и тоже, разница в синтаксисе
// // во внутрь которых передаем контекст вызова, котторый бы хотели передать в функцию
// // разница: если у функции есть аргументы, то у call они передаются через запятую
// // А у apply передаются в массиве
// sayName.call(user, ' Smith');
// sayName.apply(user, [' Smith']);

// function count(num) {
//     return this*num;
// }
// // bind создает новую функцию - этот метод встречается очень часто.
// const double = count.bind(2); // 2 теперь контекст вызова для count и функция теперь будет удваивать число которое придет в функцию
// console.log(double(3)); // удваиваем число

// 1) Обычная функция: this = window, но если use strict - undefined
// 2) Контекст у методов объекта - сам объект. Но если внутри метода функция с вызовом контекста, то результат будет опять же undefined
// 3) this в конструкторах и классах - это новый экземпляр объекта
// 4) Ручная привязка this: call, apply, bind.

const btn = document.querySelector('button');

btn.addEventListener('click', function () {
    console.log(this); // контекст является сам элемент где произошло событие. Работает только когда функция написана в обычном режиме
    this.style.backgroundColor = 'red'; // в таком случае контекст работает как event target
});

// стрелочные функции не имеют свой контекст,, она всегда его берет у своего родителя
const obj = {
    num: 5,
    sayNumber: function () {
        const say = () => {
            console.log(this.num); // this сошлется на метод, т.к задана стрелочня функция, а метод в свою очередь всегда ссылается на контекст объекта. Если бы была обычная функция, то выдало бы ошибку
        };

        say();
    }
};
obj.sayNumber();

// стрелочная функция часто используются дл модификации каких-то элементов прямо здесь на месте и у нее есть свои нюансы в синтаксисе
const double = a => a * 2; // если функция имеет одну строку, то ее можно задать таким образом. За исключением ключевого слова return, оно подставится автоматически
console.log(double(4));


// в обработчиках событий когда используется обычный синтаксис через function,
// то у нас имеется доступ к this. Это как раз тот элемент на котором происходит событие
// тоже самое что и event.target.

// Если же используется стрелочная функция то контекст вызова теряется и мы его
// использовать не можем и this = undefined
