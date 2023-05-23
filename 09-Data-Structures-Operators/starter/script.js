'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },

  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //ES6 enhanced object literals
  openingHours,

  //create a function and then immediately return multiple value from a function
  // a function to order food

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is your delicious pasta with ${ingredient1}, ${ingredient2}, ${ingredient3}.`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient); //mushrooms
    console.log(otherIngredients); //(3) ['onion', 'olives', 'spinach']
  },
};

// checking just for one property
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//WITH optional chaining
console.log(restaurant.openingHours.mon?.open); //undefined
console.log(restaurant.openingHours?.mon?.open); //undefined

//EXAMPLE:LOOP over the arrays and log the console whether the restaurant is open or closed
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`on ${day}, we open at ${open}`);
}

// Methods: checking if method exist or not
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRissotto?.(0, 1) ?? 'Method does not exist'); //Method does not exist

//Arrays: checking if an array is empty
// const users = [{ name: 'jonas', email: 'jonas@gmail.com' }];
const users = [];
console.log(users[0]?.name ?? 'Users array empty'); //jonas
//use variable name as property name  remember to use[]
// day is dynamic

// if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri);
// console.log(restaurant);

// //for of loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// // for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}:${el}`);
// }

// console.log([...menu.entries()]);
// const restaurant1 = {
//   name: 'Cali',
//   // numGuests: 20,
//   numGuests: 0,
// };

// const restaurant2 = {
//   name: 'La piazza',
//   owner: 'Giovanni Rossi',
// };

// OR assignment operator
// //→ assign to a variable if the variable is currently falsy
// // 1. set default number of guests for all the restaurant objects that do not have the property
// // restaurant1.numGuests = restaurant1.numGuests || 10;
// // restaurant2.numGuests = restaurant2.numGuests || 10;

// // restaurant1.numGuests ||= 10;
// // restaurant2.numGuests ||= 10; //variable is falsy, so will be assigned to 10
// restaurant1.numGuests ??= 10;
// restaurant2.numGuests ??= 10;

// // restaurant2.owner = restaurant2.owner && '<ANONYMOUS>';

// restaurant1.owner &&= '<ANONYMOUS>';
// restaurant2.owner &&= '<ANONYMOUS>';

// console.log(restaurant1); // 0
// console.log(restaurant2); //10

// //use non booleans as operands
// // can use any datatype, return any datatype, do short-circuiting

// // OR
// console.log(3 || 'Jonas'); //3
// console.log('' || 'Jonas'); //jonas
// console.log(true || 0); //true
// console.log(undefined || null); // undefined is falsy value so the result would be null
// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 0;
// const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
// // check if if customer exists, if yes then return the number of guests or return the default value 10

// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// console.log(restaurant1);
// console.log(restaurant2);

// // console.log(guest1); //0
// // console.log(guest2);
// // const guest2 = restaurant.numGuests || 10;

// console.log('--- AND ---');
// console.log(0 && 'Jonas'); //0
// console.log(7 && 'Jonas'); //Jonas
// // false anyway no need to look at others
// console.log('Hello' && 23 && null && 'jonas'); // null
// // return the first falsy value

// // to check if a certain value is exist or not
// // check if method exist or not, if exist then execute
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
// console.log();

// // //1) destrcuturing
// // const arr = [1, 2, ...[3, 4]]; // spread syntax, because on RIGHT side of  operator
// // const [a, b, ...others] = [1, 2, 3, 4, 5]; //rest syntax, because on teh LEFT side of operator
// // console.log(a, b, others); //1 2 (3) [3, 4, 5]  it will take the rest of the elements and put them into a new array"others"

// // const [pizza, , risotto, ...otherFood] = [
// //   ...restaurant.mainMenu,
// //   ...restaurant.starterMenu,
// // ];
// // console.log(pizza, risotto, otherFood); //Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
// // // collect all the elements that didn't select previously
// // // collet all the array after the LAST variable DOES NOT include any skipped elements

// // // objects: the remaining elements will be collected into a new object not into a new array
// // // select only Sat, others go to the weekdays

// // const { sat, ...weekdays } = restaurant.openingHours;
// // console.log(weekdays);

// // // 2) Functions
// // // pass multiple arguments into a function all at the same time
// // // writing debt
// // // const add = function (...numbers) {
// // //   let sum = 0;
// // //   for (let i = 0; numbers.length; i++) sum += numbers[i];
// // //   console.log(sum);
// // // };

// // // add(2, 3); //[2, 3]
// // // add(5, 3, 7, 2); //[5, 3, 7, 2]
// // // add(8, 2, 5, 3, 2, 1, 4); //[8, 2, 5, 3, 2, 1, 4]
// // // → taking multiple values adn then packs them all into one array

// // const add = function (...numbers) {
// //   let sum = 0;
// //   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
// //   console.log(sum);
// // };

// // add(2, 3); //5
// // add(5, 3, 7, 2); //17
// // add(8, 2, 5, 3, 2, 1, 4); //25

// // const x = [23, 5, 7];
// // add(...x); // pack them back again

// // restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// // restaurant.orderPizza('mushroom');

// // // restaurant.orderDelivery({
// // //   time: '22:30',
// // //   address: 'Via del Sole, 21',
// // //   mainIndex: 2,
// // //   starterIndex: 2,
// // // });

// // // // create 3 brand new variables based on the objects
// // // const { name, openingHours, categories } = restaurant;
// // // console.log(name, openingHours, categories);
// // // // extremely useful when dealing with the result of an API call

// // // giving new variable name
// // // const {
// // //   name: restaurantName,
// // //   openingHours: hours,
// // //   categories: tags,
// // // } = restaurant;
// // // console.log(restaurantName, hours, tags);

// // // Default values
// // // const { menu = [], starterMenu: starters = [] } = restaurant;
// // // console.log(menu, starters); //[], (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// // //Mutating Variables
// // // let a = 111;
// // // let b = 999;
// // //store the variable into a variable
// // // const obj = { a: 23, b: 7, c: 14 };
// // // ({ a, b } = obj);
// // // console.log(a, b);

// // // Nested objects
// // // object inside an object
// // // const {
// // //   fri: { open: o, close: c },
// // // } = openingHours;
// // // console.log(o, c);

// // // const arr = [2, 3, 4];
// // // const a = arr[0];
// // // const b = arr[1];
// // // const c = arr[2];

// // // const [x, y, z] = arr;
// // // console.log(x, y, z);
// // // console.log(arr);

// // // let [main, , secondary] = restaurant.categories;
// // // console.log(main, secondary);

// // //Switching variables
// // // 若不用destructuring 的寫法：
// // // const temp = main;
// // // main = secondary;
// // // secondary = temp;
// // // console.log(main, secondary); //Vegetarian Italian

// // // → reassigning the variable
// // // [main, secondary] = [secondary, main];
// // // console.log(main, secondary);

// // // // receive return values from a function
// // // const [starter, mainCourse] = restaurant.order(2, 0);
// // // console.log(starter, mainCourse);

// // // // array inside an array
// // // const nested = [2, 4, [5, 6]];
// // // // const [i, , j] = nested;
// // // // console.log(i, j);
// // // const [i, , [j, k]] = nested;
// // // console.log(i, j, k);

// // // // default values
// // // // before:
// // // // const [p, q, r] = [8, 9];
// // // // console.log(p, q, r); //8 9 undefined
// // // // after:
// // // const [p = 1, q = 1, r = 1] = [8, 9];
// // // console.log(p, q, r); //8 9 1

// // // the spread operator
// // // create new array based on this array w/ some new elements at the beginning

// // // const arr = [7, 8, 9];
// // // const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// // // console.log(badNewArr);

// // // const newArr = [1, 2, ...arr];
// // // console.log(newArr);
// // // console.log(...newArr);
// // // // take all the values out and write them individually

// // // //追加新菜單的應用: 在菜單上加入
// // // const newMenu = [...restaurant.mainMenu, 'tapioca milk tea'];
// // // console.log(newMenu); //(4) ['Pizza', 'Pasta', 'Risotto', 'tapioca milk tea']

// // // //copy array
// // // const mainMenuCopy = [...restaurant.mainMenu];

// // // //join 2 arrays: both main menu and starter menu
// // // const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// // // console.log(menu); //(7) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']

// // // //Iterables:arrays, strings, maps, sets.NOT objects
// // // const str = 'Irene';
// // // const letters = [...str, '', 's.'];
// // // console.log(letters);
// // // console.log(...str);
// // // // console.log(`${...str} Schmedtmann`); // this is not the place that expects multiple values separated by a comma.
// // // // multiple values separated by a comma is only when we pass arguments into a function

// // // const ingredients = [
// // //   // prompt("Let's make pasta! Ingredient1?"),
// // //   // prompt('Ingredient2?'),
// // //   // prompt('Ingredient3?'),
// // // ];

// // // console.log(ingredients);

// // // restaurant.orderPasta(ingredients);

// // // // objects
// // // const newRestaurant = {
// // //   foundedIn: 1991,
// // //   ...restaurant,
// // //   founder: 'Sakamoto Ryuichi',
// // // }; //copy the data from the old object and add new values
// // // console.log(newRestaurant);

// // // const copyRestaurant = { ...restaurant };
// // // copyRestaurant.name = 'Lawrence';
// // // console.log(copyRestaurant.name); //Lawrence
// // // console.log(restaurant.name); //Italiano
