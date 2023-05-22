# 學習筆記

## 103. 解構賦值 Destructing Arrays

### Destructuring

- to break a complex data structure down in to a smaller data structure like variable
- es6 feature
- unpacking value from an array or an object into seperate variable

```javascript
const arr = [2, 3, 4];

const a = arr[0];

const b = arr[1];

const c = arr[2];

const [x, y, z] = arr;

console.log(x, y, z); // 2, 3, 4

console.log(arr); // (3) [2, 3, 4]
// destructuring assignment: destructuring from the right side
```

當順序是`[]=;` javascript 會做 destructuring
並不會影響到原先的的 array

```javascript
categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
const [first, , second] = restaurant.categories;
console.log(first, second); // Italian, Vegetarian
```

- 若要跳過中間，給予`, ,`即可取得第三項
- 透過 destructuring 可直接達到＿＿而不用＿＿＿

#### 應用 1：替換變數（switching variables)

```js
//Switching variables

// 若不用destructuring 的寫法：

// const temp = main;

// main = secondary;

// secondary = temp;

// console.log(main, secondary); //Vegetarian Italian

// → reassigning the variable

[main, secondary] = [secondary, main];

console.log(main, secondary);
```

#### 應用 2：由 function 接收 return 的值

```javascript
const restaurant = {
  name: "Classico Italiano",

  location: "Via Angelo Tavanti 23, Firenze, Italy",

  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],

  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],

  mainMenu: ["Pizza", "Pasta", "Risotto"],

  //create a function and then immediately return multiple value from a function

  // a function to order food

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};
// receive return values from a function

const [starter, mainCourse] = restaurant.order(2, 0);

console.log(starter, mainCourse);
```

#### 應用 3: Nested destructuring

##### array inside an array 的範例

```javascript
// array inside an array

const nested = [2, 4, [5, 6]];

const [i, , j] = nested;

console.log(i, j); //2 (2) [5, 6]
const [i, , [j, k]] = nested;

console.log(i, j, k); // 2, 5, 6
```

#### 應用 4: default values

- 未設定 default 值

```javascript
const [p, q, r] = [8, 9];

console.log(p, q, r); //8 9 undefined
```

- 設定 default 值後

```javascript
const [p = 1, q = 1, r = 1] = [8, 9];

console.log(p, q, r); //8 9 1
```

→ 經常應用在從 API 取得 data 上

## 104. Destrucuring objects

```javascript
const { name, openingHours, categories } = restaurant;

console.log(name, openingHours, categories);
```

#### 應用 1 給予新的 variable name

```javascript
const {
  name: restaurantName,

  openingHours: hours,

  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);
```

- 能應用在處理第三方資料（third-party data)

#### 應用 2 設定預設值

```javascript
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters); //[], (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

//
```

- restaurant object 裡並無 menu，給予`[]` 作爲預設因此 console.log 的結果不會是 undefined，而是`[]`
- 原先 object 裡為 starterMenu，透過解構給予新的 variable 名稱為 starters，並給予預設值為`[]`。

#### 應用 3   改變變數

```javascript
//Mutating Variables

let a = 111;

let b = 999;

//store the variable into a variable

const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);

console.log(a, b); //23, 7
```

- 若無（）會出現 syntax error，需留意

#### 應用 4 解構 nested object

- 解構 object 裡面的 object

```javascript
const {
  fri: { open, close },
} = openingHours;

console.log(open, close);
```

更進一步，結合變更變數名稱一起改動

```javascript
const {
  fri: { open: o, close: c },
} = openingHours;

console.log(o, c);
```

#### 應用 5 order delivery function

- 大部分 javascript 的 function 有很多的參數，很難取得參數的排序，因此比起手動定義參數，可透過傳遞 object 進 function 將其視為 argument，function 接著會解構那個 object
- 設定預設值讓無資料時也能印出預設的資料

```javascript
const restaurant = {
  name: "Classico Italiano",

  location: "Via Angelo Tavanti 23, Firenze, Italy",

  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],

  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],

  mainMenu: ["Pizza", "Pasta", "Risotto"],

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

    time = "20:00",

    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

restaurant.orderDelivery({
  time: "22:30",

  address: "Via del Sole, 21",

  mainIndex: 2,

  starterIndex: 2,
});
```

## 105. spread operator 展開運算符

### 功能: 展開 array 的值

- 沒有使用 spread operator 的情況

```javascript
const arr = [7, 8, 9];

const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

console.log(badNewArr); //(5) [1, 2, 7, 8, 9]
```

- 使用 spread operator

```javascript
const newArr = [1, 2, ...arr];

console.log(newArr); //(5) [1, 2, 7, 8, 9]
```

→ 藉由 spread operator 提取 arr 的值並「獨立」寫入

- 使用 spread operator`...`便不用透過, 去列出所有的 value

- 若沒有使用 spread operator 直接將 arr 置於 newArr 的情況

```javascript
const newArr = [1, 2, arr];

console.log(newArr);
```

![](https://i.imgur.com/oHP4aOB.png)

- 比較

```javascript
const newArr = [1, 2, ...arr];

console.log(newArr); //(5) [1, 2, 7, 8, 9]

console.log(...newArr); //1 2 7 8 9
```

→ 當需要將值「獨立」印出時就適合使用 spread arguments

#### 應用(1)：更新 array 的資料內容

- 追加新菜單的應用: 在菜單上加入珍奶 🧋

```javascript
const newMenu = [...restaurant.mainMenu, "tapioca milk tea"];

console.log(newMenu); //(4) ['Pizza', 'Pasta', 'Risotto', 'tapioca milk tea']

//copy array

const mainMenuCopy = [...restaurant.mainMenu];

//join 2 arrays: both main menu and starter menu

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

console.log(menu); //(7) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']
```

- 追加菜單
- 複製菜單
- 合併菜單

#### 應用(2): 將 arguments 傳入 function 並印出

- 在先前的餐廳物件裡建立一個 method 可以選擇指定的材料來做義大利麵

```javascript
orderPasta: function (ingredient1, ingredient2, ingredient3) {

console.log(

`Here is your delicious pasta with ${ingredient1}, ${ingredient2}, ${ingredient3}.`

);

},
```

- 宣告義大利麵的材料，使用 prompt 從視窗輸入材料

```javascript
const ingredients = [

prompt('Let's make pasta! Ingredient1?),

prompt('Ingredient2?'),

prompt('Ingredient3?'),


];


console.log(ingredients);

restaurant.orderPasta(...ingredients);
```

→ 可以從 orderPasta 印出輸入的材料的義大利麵：Here is your delicious pasta with mushrooms, tomatoes, cheese.

#### 應用(3) 追加新的 objects 資料

- 建立一個新的餐廳 object，含有原始的餐廳 object 的資料，並且還有追加的資料

```javascript
const newRestaurant = {
  foundedIn: 1991,

  ...restaurant,

  founder: "Sakamoto Ryuichi",
}; //copy the data from the old object and add new values

console.log(newRestaurant);
```

![](https://i.imgur.com/vPLN3Xb.png)

→ 得到「舊餐廳」的資料並更新到「新餐廳」的資料

- copy

```javascript
const copyRestaurant = { ...restaurant };

copyRestaurant.name = "Lawrence";

console.log(copyRestaurant.name); //Lawrence

console.log(restaurant.name); //Italiano
```

→ 印出的結果複製的餐廳名與原始的餐廳名不同

### Iterables

- Iterables: arrays, string, maps, sets. NOT object

```javascript
//Iterables:arrays, strings, maps, sets.NOT objects

const str = "Irene";

const letters = [...str, "", "s."];

console.log(letters); //(7) ['I', 'r', 'e', 'n', 'e', '', 's.']

console.log(...str); //I r e n e
```

### 延伸閱讀資料

1. [認識 JavaScript Iterable 和 Iterator](https://jiepeng.me/2018/04/19/iterable-and-iterator-in-javascript)

## 106. Rest Pattern and Parameters 其餘運算符、其餘參數

- Rest: to pact elements into an array
  > The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions (可變參數函數) in JavaScript. (MDN)

其餘參數允許 function 接收不定量的 arguments 作為 array

```javascript
const arr = [1, 2, ...[3, 4]]; // spread syntax, because on RIGHT side of operator

const [a, b, ...others] = [1, 2, 3, 4, 5]; //rest syntax, because on teh LEFT side of operator

console.log(a, b, others); //1 2 (3) [3, 4, 5] it will take the rest of the elements and put them into a new array"others"

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,

  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherFood); //Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// collect all the elements that didn't select previously

// collet all the array after the LAST variable DOES NOT include any skipped elements
```

- 可同時使用 rest 和 spread
- 使用 rest 時蒐集的是在最後一個變數之後，不包含跳過的元素

### objects

- select only Sat, others go to the weekdays

```javascript
// select only Sat, others go to the weekdays
const { sat, ...weekdays } = restaurant.openingHours;

console.log(weekdays);
```

### Functions

```javascript
const add = function (...numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) sum += numbers[i];

  console.log(sum);
};

add(2, 3); //5

add(5, 3, 7, 2); //17

add(8, 2, 5, 3, 2, 1, 4); //25

const x = [23, 5, 7];

add(...x); // pack them back again
```

### 應用例：點 pizza

```javascript
orderPizza: function (mainIngredient, ...otherIngredients) {

console.log(mainIngredient); //mushrooms

console.log(otherIngredients); //(3) ['onion', 'olives', 'spinach']

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

},

```

### Recap

- spread operator 和 rest pattern 看起來相似，但功能相反。
- spread operators used where we would write<mark style="background: #BBFABBA6;"> values</mark> separated by comma
- rest pattern is basically used writes <mark style="background: #BBFABBA6;">variable names</mark> separated by comma
- 展開運算子通常用於將陣列或物件展開成獨立的值，而剩餘模式則用於在函式定義中接收不定數量的參數並將它們收集到一個陣列中。

## 107. Short circuiting (&& and || ) 短路求值

- 「short circuiting」是指在邏輯運算中的一種行為，當運算符能夠確定整個表達式的結果而不需要評估所有的運算元時，它會停止進一步的評估。
- AND (`&&`) 短路求值： 當使用 `&&` 運算符時，如果第一個運算元為 `false`，則整個表達式將被判定為 `false`，且不再評估後面的運算元。
- OR (`||`) 短路求值： 當使用 `||` 運算符時，如果第一個運算元為 `true`，則整個表達式將被判定為 `true`，且不再評估後面的運算元。
- 這種短路求值僅適用於布林值的運算，並且運算結果是布林值。在使用其他類型的運算元時，則不會進行短路評估。
- 短路求值的行為可以用於實現一些常見的程式模式，例如在處理可選參數時，避免對不存在的值進行操作，或者在設定預設值時使用簡潔的邏輯判斷。

### || OR

```javascript
console.log(3 || 'Jonas'); //3

console.log(''|| 'Jonas');//jonas

console.log(true || 0); //true

console.log(undefined || null); // undefined is falsy value so the result would be null


console.log(undefined || 0 || '' 'Hello' || 23 || null); //hello : the first truthy value
```

#### 餐廳客人的的例子

##### 不使用 short circuiting

- 若無定義 numGuests

```javascript
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;

// check if if customer exists, if yes then return the number of guests or return the default value 10

console.log(guest1); //10, restaurant.numGuests is undefined
```

- 若有定義 numGuests

```javascript
restaurant.numGuests = 23;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1); //23
```

##### 使用 short circuiting

```javascript
restaurant.numGuests = 23;
const guest2 = restaurant.numGuests || 10;

console.log(guest2); //23
```

🚨 注意：當 numGuests 的值為 0，不適用，因為 0 是 FALSY values，所以會印出預設值

### && AND

```javascript
console.log(0 && "Jonas"); //0

console.log(7 && "Jonas"); //Jonas

// false anyway no need to look at others

console.log("Hello" && 23 && null && "jonas"); // null

// return the first falsy value
```

#### 確認 method 是否存在

##### 不使用 short circuiting

```javascript
// to check if certain value is exist or not

// check if method exist or not, if exist then execute

if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}
```

##### 使用 short circuiting

```javascript
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");
```

🚨 注意：不要將所有的 if statement 轉換為 short circuiting 的寫法，因為可讀性會降低

### Recap

- OR operator will return the FIRST TRUTHY value of all the operands or the last value if all of them are falsy (OR return 第一個 truthy 值 或是最後一個值如果都是 false)
- AND operator will return the FIRST FALSY value of all the operands or the last value if all of them are truthy (AND return 第一個 falsy 或是 最後一個值如果都是 true)
- 實際的應用 OR operator 可以用在設定 default value，而 AND operator 可以用於執行第二個運算數

## 108. The nullish coalescing operator(??)

- introduce in ES2020
- Nullish: null and undefined (NOT 0 or ' ')
- Nullish Coalescing 運算子來判斷變數的值是否為 `null` 或 `undefined`。如果變數的值為 `null` 或 `undefined`，則返回指定的預設值；否則返回變數的值本身。
- Nullish Coalescing 運算子只在變數的值為 `null` 或 `undefined` 時才會返回預設值。如果變數的值是其他 falsy 值（如空字串 `''` 或數值 `0`），則不會返回預設值。

### 若來客數為 0 的例子

```javascript
restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
console.log(guest1); //0
```

→ 上一節在｜｜不能設定為 0，但透過 The nullish coalescing 可以解決｜｜不能取得正確值的問題
