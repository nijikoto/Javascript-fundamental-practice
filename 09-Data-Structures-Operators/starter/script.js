'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //create a function and then immediately return multiple value from a function
  // a function to order food

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is your delicious pasta with ${ingredient1}, ${ingredient2}, ${ingredient3}.`
    );
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// // create 3 brand new variables based on the objects
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);
// // extremely useful when dealing with the result of an API call

// giving new variable name
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters); //[], (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

//Mutating Variables
// let a = 111;
// let b = 999;
//store the variable into a variable
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b);

// Nested objects
// object inside an object
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

//Switching variables
// 若不用destructuring 的寫法：
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); //Vegetarian Italian

// → reassigning the variable
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // receive return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // array inside an array
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // default values
// // before:
// // const [p, q, r] = [8, 9];
// // console.log(p, q, r); //8 9 undefined
// // after:
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r); //8 9 1

// the spread operator
// create new array based on this array w/ some new elements at the beginning

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(...newArr);
// take all the values out and write them individually

//追加新菜單的應用: 在菜單上加入
const newMenu = [...restaurant.mainMenu, 'tapioca milk tea'];
console.log(newMenu); //(4) ['Pizza', 'Pasta', 'Risotto', 'tapioca milk tea']

//copy array
const mainMenuCopy = [...restaurant.mainMenu];

//join 2 arrays: both main menu and starter menu
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu); //(7) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']

//Iterables:arrays, strings, maps, sets.NOT objects
const str = 'Irene';
const letters = [...str, '', 's.'];
console.log(letters);
console.log(...str);
// console.log(`${...str} Schmedtmann`); // this is not the place that expects multiple values separated by a comma.
// multiple values separated by a comma is only when we pass arguments into a function

const ingredients = [
  // prompt("Let's make pasta! Ingredient1?"),
  // prompt('Ingredient2?'),
  // prompt('Ingredient3?'),
];

console.log(ingredients);

restaurant.orderPasta(ingredients);

// objects
const newRestaurant = {
  foundedIn: 1991,
  ...restaurant,
  founder: 'Sakamoto Ryuichi',
}; //copy the data from the old object and add new values
console.log(newRestaurant);

const copyRestaurant = { ...restaurant };
copyRestaurant.name = 'Lawrence';
console.log(copyRestaurant.name); //Lawrence
console.log(restaurant.name); //Italiano
