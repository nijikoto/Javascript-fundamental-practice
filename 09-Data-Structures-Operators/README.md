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

## 109. Logical Assignment Operator

- Logical OR Assignment (`||=`) 運算子： `||=` 運算子用於將右邊的值賦值給左邊的變數，但僅當左邊的變數為 falsy 值（如 `null`、`undefined`、`false`、空字串等）時才執行賦值操作。如果左邊的變數已經是一個 truthy 值，則不執行賦值操作。

```javascript
let x = 10;
x ||= 5; // 等同於 x = x || 5;
console.log(x); // 輸出: 10

let y = 0;
y ||= 7; // 等同於 y = y || 7;
console.log(y); // 輸出: 7
```

- Logical AND Assignment (`&&=`) 運算子： `&&=` 運算子用於將右邊的值賦值給左邊的變數，但僅當左邊的變數為 truthy 值時才執行賦值操作。如果左邊的變數已經是一個 falsy 值（如 `null`、`undefined`、`false`、空字串等），則不執行賦值操作。

```javascript
let a = 10;
a &&= 3; // 等同於 a = a && 3;
console.log(a); // 輸出: 3

let b = "";
b &&= "hello"; // 等同於 b = b && 'hello';
console.log(b); // 輸出: ''
```

```javascript
const restaurant1 = {
  name: "Cali",

  numGuests: 20,
};

const restaurant2 = {
  name: "La piazza",

  owner: "Giovanni Rossi",
};

// restaurant1.numGuests = restaurant1.numGuests || 10;

// restaurant2.numGuests = restaurant2.numGuests || 10;

restaurant1.numGuests ||= 10;

restaurant2.numGuests ||= 10; //variable is falsy, so will be assigned to 10

console.log(restaurant1); //20

console.log(restaurant2); //10
```

### 若為０的情況

```javascript
restaurant.numGuests = 0;
const guest2 = restaurant.numGuests || 10; //10
```

→ 並不符合實際的來客數

- 解決方法：

```javascript
const restaurant1 = {
  name: "Cali",

  // numGuests: 20,

  numGuests: 0,
};

const restaurant2 = {
  name: "La piazza",

  owner: "Giovanni Rossi",
};

restaurant1.numGuests ??= 10;

restaurant2.numGuests ??= 10;

console.log(restaurant1); // 0

console.log(restaurant2); //10
```

### Recap

- assign a value that is defined and has a value that is currently truthy you can use assignment assignment operator

## 111. Looping Arrays: The for of Loop

- 遍歷一個陣列並對其中的每個元素進行操作時，可以使用 for...of 迴圈。for...of 迴圈是 ES6 引入的一種迴圈語法，用於遍歷可迭代物件（如陣列、字串等）的元素。

### 例子

```javascript
//for of loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);
```

- for of loop 可以用 continue 和 break

### entries

`entries()` 是 JavaScript 陣列的一個內建方法，它返回一個<mark style="background: #FFB8EBA6;">包含陣列每個元素的索引/值</mark>對的可迭代物件。這個可迭代物件可以被用於遍歷陣列的索引和對應的值。

```javascript
for (const item of menu.entries()) {
  console.log(item);
}
```

![](https://i.imgur.com/xSckTBh.png)

### 結合 template literal

```javascript
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}:${item[1]}`);
}
```

![](https://i.imgur.com/IZ8P211.png)

- 更好的寫法：使用解構賦值的方法

```javascript
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}:${el}`);
}
```

### 其他補充

可迭代物件：

## 112 Enhanced Object Literals

### 1. 簡化的屬性初始化

- 簡化的屬性初始化：在 ES6 中，當屬性名稱和變數名稱相同時，可以只寫屬性名稱而省略冒號和值的指定。
- 當 object 在 object 之外，在 object(restaurant) 內引入 object
- before:

```javascript
openingHousr:openingHours,
```

- after:

```javascript
//ES6 enhanced object literals

openingHours,
```

### 2. 方法的簡寫語法

- 可以省略冒號和 `function` 關鍵字
- before

```javascript
order: function (starterIndex, mainIndex) {

return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];

},
```

- after:去掉 function()

```javascript
order(starterIndex, mainIndex) {

return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];

},
```

### 3.可計算的屬性名稱

- 可計算的屬性名稱：ES6 允許在物件字面量中使用方括號 `[]` 來定義屬性名稱，並使用表達式作為屬性名稱的值。
- 不需手動書寫，自動‘計算’

```javascript
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
  [weekdays[3]]: {
    open: 12,

    close: 22,
  },

  [weekdays[4]]: {
    open: 11,

    close: 23,
  },

  [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours

    close: 24,
  },
};
```

### 補充：4. 範圍內的 super

- 在 ES6 的物件字面量方法中，可以使用 `super` 關鍵字來引用父類物件的屬性和方法。這樣可以更方便地進行物件之間的繼承和覆寫。

```javascript
const parent = {
  name: "Parent",
  sayHello() {
    console.log(`Hello, ${this.name}!`);
  },
};

const child = {
  name: "Child",
  sayHello() {
    super.sayHello();
    console.log("How are you?");
  },
};

Object.setPrototypeOf(child, parent);

child.sayHello();
// 輸出:
// Hello, Child!
// How are you?
```

## 113. Optional Chaining(?.)

Optional Chaining 是一個 JavaScript 的語言特性，它允許你在存取物件的屬性或呼叫方法時，安全地處理可能為 undefined 或 null 的中間屬性，而不會拋出錯誤。

在舊的 JavaScript 中，當你嘗試存取一個深層的物件屬性時，如果中間的屬性為 undefined 或 null，那麼試圖存取後面的屬性就會拋出 TypeError 錯誤。

使用 Optional Chaining，可確保安全存取屬性或呼叫方法。如果中間的屬性為 undefined 或 null，表達式的結果將是 undefined，而不會拋出錯誤。

Optional Chaining 也可以與其他 JavaScript 的語言特性一起使用，例如結合 nullish coalescing operator（`??`）來提供預設值。這樣可以在屬性值為 undefined 或 null 時，使用預設值作為結果。

### 範例

```javascript
const user = {
  name: "Alice",
  address: {
    city: "New York",
    street: "123 ABC Street",
  },
};

// 沒有使用 Optional Chaining，可能拋出錯誤
const street = user.address.street; // 如果 address 為 undefined，拋出 TypeError

// 使用 Optional Chaining，安全地存取屬性
const street = user?.address?.street; // 如果 address 或 street 為 undefined，結果為 undefined

console.log(street); // '123 ABC Street' 或 undefined
```

### 餐廳的例子

- 未使用 optional chaining

```javascript
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
```

    - 當openingHours object 存在以及 openingHour.mon 存在，才印出。
    - 現實生活中很常會遇到 optional properties，特別是在巢狀的結構

- 使用 optional chaining

```javascript
//WITH optional chaining

console.log(restaurant.openingHours.mon?.open); //undefined

console.log(restaurant.openingHours?.mon?.open); //undefined

// only if monday exists then the open property will be read, if not 'undefined' will be immediately return
```

- 唯有 monday 存在，open property 才會被讀取，若不存在則立即返回'undefined'
- optional chaining 可以連續使用

### 營業時間應用例

```javascript
//EXAMPLE:LOOP over the arrays and log the console whether the restaurant is open or closed

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";

  console.log(`on ${day}, we open at ${open}`);
}
```

![](https://i.imgur.com/PSqVhZM.png)

- 當使用 variable 作為 property 使用時，記得用[]
- 選用`??` 來顯示，週六的時間，因為 0 為 falsy value，若選用`||`則結果為 closed

### Method 的應用

確認 method 是否存在

```javascript
// Methods: checking if method exist or not

console.log(restaurant.order?.(0, 1) ?? "Method does not exist");

console.log(restaurant.orderRissotto?.(0, 1) ?? "Method does not exist"); //Method does not exist
```

### Array 的應用

確認 array 是否為空

```javascript
//Arrays: checking if an array is empty

const users = [{ name: "jonas", email: "jonas@gmail.com" }];

console.log(users[0]?.name ?? "Users array empty"); //jonas
```

```javascript
const users = [];

console.log(users[0]?.name ?? "Users array empty"); //Users array empty
```

- Optional Chaining(?.) 經常與 nullish coalescing operator(??) 一起用

## 114. Looping Objects: Objects Keys, Values, and Entries

- not only loop for variable but also loop for object in a indirect way
- property name also called key
- loop over an array

#### Objects Keys

`Object.keys()` 是 JavaScript 中的內建函式，它用於獲取一個物件的所有可枚舉屬性的鍵（屬性名稱）組成的陣列。

- syntax:

```javascript
Object.keys(obj);
```

- 範例：

```javascript
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

const keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city']
```

#### 應用例：

```javascript
// Properties Name

const properties = Object.keys(openingHours);

console.log(properties); //) ['thu', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days:`;

for (const day of properties) {
  openStr += `${day},`;
}

console.log(openStr); //We are open on 3 days:thu,fri,sat,
```

### Object.values

`Object.values()` 是 JavaScript 中的內建函式，它用於獲取一個物件的所有可枚舉屬性的值組成的陣列。

#### 範例

```javascript
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

const values = Object.values(person);
console.log(values); // ['Alice', 30, 'New York']
```

#### 應用例：結合 entries 的應用、解構賦值的應用去 loop 整個 object

```javascript
// Loop Entire object

const entries = Object.entries(openingHours);

// console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
```

![](https://i.imgur.com/0eJYWY9.png)

- entries = name + values
- open and close: value itself is also an object
- 說明：

1.  `Object.entries(openingHours)`：此行程式碼將 `openingHours` 物件轉換為鍵值對（key-value pairs）組成的陣列。每個鍵值對是一個子陣列，包含一個鍵和對應的值。這些子陣列會被儲存在 `entries` 變數中。
2.  `for...of` 迴圈：使用 `for...of` 迴圈來迭代 `entries` 陣列中的每個鍵值對。
3.  解構賦值：在每次迴圈迭代中，使用解構賦值來從當前鍵值對的子陣列中提取鍵和值。`{ key, { open, close } }` 表示要從子陣列中解構出鍵存儲在 `key` 變數中，並解構出對應值物件的 `open` 和 `close` 屬性的值。
4.  `console.log()`：訊息顯示了該日期（存儲在 `key` 中）的營業時間。

## 116. Sets

- Set 是一種內建的資料結構，用於存儲唯一值的集合。Set 中的值是無序且不重複的，這意味著它可以用來快速檢查某個值是否已存在於集合中。
- 可以有不同的 data type

#### 範例：

```javascript
console.log(orderSet);

console.log(new Set("Jonas"));

console.log(orderSet.size);

console.log(orderSet.has("Pizza")); //true

console.log(orderSet.has("Bread")); //false

orderSet.add("Garlic Bread");

orderSet.add("Garlic Bread"); // the set has to be unique therefore it only appeared once

orderSet.delete("Risotto");

console.log(orderSet);
```

若需要取得內部(retrieve)data 直接用 array 即可，不會用到 sets

#### for of loop 的範例

```javascript
//main use case: to remove duplicate values of array

const staff = ["Waiter", "Chef", "Manager", "Chef", "Waiter"];

const staffUnique = [...new Set(staff)]; // make it an array

console.log(staffUnique);

console.log(new Set(["Waiter", "Chef", "Manager", "Chef", "Waiter"]).size);

console.log(new Set("jonassahhemman").size);
```

- 主要用於移除重複的 array values
