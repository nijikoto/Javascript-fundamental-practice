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
