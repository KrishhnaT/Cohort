// JAVASCRIPT ARRAYS - COMPLETE PRACTICAL GUIDE

// --------------------------------------
// 1. CREATING ARRAYS
// --------------------------------------

// Array literal (most common way)
const fruits = ['Apple', 'Banana', 'Orange'];

// Array constructor
const numbers = new Array(1, 2, 3, 4, 5);

// Empty array with predefined length
const emptyArray = new Array(5); // Creates array with 5 empty slots

// Creating from other iterables
const arrayFromString = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arrayFromSet = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]

// Array.of() - creates array from arguments
const mixedArray = Array.of(1, 'two', true); // [1, 'two', true]

// --------------------------------------
// 2. ACCESSING ARRAY ELEMENTS
// --------------------------------------

const colors = ['red', 'green', 'blue'];

// Using index (zero-based)
console.log(colors[0]); // 'red'
console.log(colors[1]); // 'green'

// Get last element
console.log(colors[colors.length - 1]); // 'blue'
// Or using at() (newer method)
console.log(colors.at(-1)); // 'blue'

// --------------------------------------
// 3. BASIC ARRAY METHODS
// --------------------------------------

// LENGTH
console.log(colors.length); // 3

// PUSH - adds to end, returns new length
const newLength = colors.push('yellow');
console.log(colors); // ['red', 'green', 'blue', 'yellow']
console.log(newLength); // 4

// POP - removes from end, returns removed item
const lastColor = colors.pop();
console.log(lastColor); // 'yellow'
console.log(colors); // ['red', 'green', 'blue']

// UNSHIFT - adds to beginning, returns new length
const newLength2 = colors.unshift('purple');
console.log(colors); // ['purple', 'red', 'green', 'blue']
console.log(newLength2); // 4

// SHIFT - removes from beginning, returns removed item
const firstColor = colors.shift();
console.log(firstColor); // 'purple'
console.log(colors); // ['red', 'green', 'blue']

// CONCAT - combines arrays without modifying originals
const moreColors = ['yellow', 'orange'];
const allColors = colors.concat(moreColors);
console.log(allColors); // ['red', 'green', 'blue', 'yellow', 'orange']

// JOIN - creates string from array with separator
const colorString = colors.join(', ');
console.log(colorString); // 'red, green, blue'

// --------------------------------------
// 4. FINDING ELEMENTS
// --------------------------------------

const inventory = [
  { id: 1, name: 'iPhone', price: 999 },
  { id: 2, name: 'Galaxy S', price: 899 },
  { id: 3, name: 'Pixel', price: 799 }
];

// INDEXOF - finds index of simple value (-1 if not found)
console.log(colors.indexOf('green')); // 1
console.log(colors.indexOf('black')); // -1

// INCLUDES - checks if array contains value
console.log(colors.includes('blue')); // true
console.log(colors.includes('black')); // false

// FIND - returns first element that satisfies condition
const expensivePhone = inventory.find(item => item.price > 900);
console.log(expensivePhone); // { id: 1, name: 'iPhone', price: 999 }

// FINDINDEX - returns index of first element that satisfies condition
const expensivePhoneIndex = inventory.findIndex(item => item.price > 900);
console.log(expensivePhoneIndex); // 0

// SOME - checks if at least one element satisfies condition
const hasAffordablePhones = inventory.some(item => item.price < 800);
console.log(hasAffordablePhones); // true

// EVERY - checks if all elements satisfy condition
const allPhonesExpensive = inventory.every(item => item.price > 500);
console.log(allPhonesExpensive); // true

// --------------------------------------
// 5. TRANSFORMING ARRAYS
// --------------------------------------

// MAP - creates new array by transforming each element
const prices = inventory.map(item => item.price);
console.log(prices); // [999, 899, 799]

// FILTER - creates new array with elements that satisfy condition
const cheaperPhones = inventory.filter(item => item.price < 900);
console.log(cheaperPhones); // [{ id: 3, name: 'Pixel', price: 799 }]

// REDUCE - accumulates values into single result
const totalValue = inventory.reduce((sum, item) => sum + item.price, 0);
console.log(totalValue); // 2797

// FLAT - flattens nested arrays
const nestedArray = [1, [2, 3], [4, [5, 6]]];
console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]

// FLATMAP - combination of map and flat
const sentences = ['Hello world', 'JavaScript arrays'];
const allWords = sentences.flatMap(sentence => sentence.split(' '));
console.log(allWords); // ['Hello', 'world', 'JavaScript', 'arrays']

// --------------------------------------
// 6. SLICING AND SPLICING
// --------------------------------------

// SLICE - returns copy of portion (doesn't modify original)
const slicedColors = colors.slice(1, 3);
console.log(slicedColors); // ['green', 'blue']
console.log(colors); // ['red', 'green', 'blue']

// SPLICE - changes array by removing/replacing elements
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb'); // Insert at index 1
console.log(months); // ['Jan', 'Feb', 'March', 'April', 'June']
months.splice(4, 1, 'May'); // Replace at index 4
console.log(months); // ['Jan', 'Feb', 'March', 'April', 'May']

// --------------------------------------
// 7. SORTING AND REVERSING
// --------------------------------------

// REVERSE - reverses array in place
const reversedColors = [...colors].reverse();
console.log(reversedColors); // ['blue', 'green', 'red']

// SORT - sorts array in place
const unsortedNumbers = [10, 5, 8, 1, 7];
unsortedNumbers.sort();
console.log(unsortedNumbers); // [1, 10, 5, 7, 8] (lexicographic order!)

// Sort with compare function for numerical sorting
unsortedNumbers.sort((a, b) => a - b);
console.log(unsortedNumbers); // [1, 5, 7, 8, 10]

// Sorting objects
inventory.sort((a, b) => a.price - b.price);
console.log(inventory); // Sorted by price ascending

// --------------------------------------
// 8. ITERATING OVER ARRAYS
// --------------------------------------

// FOR...OF
for (const color of colors) {
  console.log(color);
}

// FOREACH
colors.forEach((color, index) => {
  console.log(`${index}: ${color}`);
});

// --------------------------------------
// 9. ARRAY SPREADING AND DESTRUCTURING
// --------------------------------------

// SPREAD OPERATOR
const primaryColors = ['red', 'yellow', 'blue'];
const secondaryColors = ['green', 'orange', 'purple'];
const allTheColors = [...primaryColors, ...secondaryColors];
console.log(allTheColors);

// ARRAY DESTRUCTURING
const [first, second, ...rest] = allTheColors;
console.log(first); // 'red'
console.log(second); // 'yellow'
console.log(rest); // ['blue', 'green', 'orange', 'purple']

// --------------------------------------
// 10. PRACTICAL EXAMPLES
// --------------------------------------

// Example 1: Filter, map and reduce in chain
const products = [
  { name: 'Laptop', price: 1200, inStock: true },
  { name: 'Phone', price: 850, inStock: true },
  { name: 'Tablet', price: 650, inStock: false },
  { name: 'Monitor', price: 300, inStock: true }
];

const totalValueOfInStockProducts = products
  .filter(product => product.inStock)
  .map(product => product.price)
  .reduce((total, price) => total + price, 0);

console.log(totalValueOfInStockProducts); // 2350

// Example 2: Finding duplicates in an array
const numbers2 = [1, 2, 3, 4, 3, 2, 5, 6, 7, 1];

const findDuplicates = arr => {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
};

const duplicates = findDuplicates(numbers2);
console.log(duplicates); // [3, 2, 1]

// Example 3: Grouping objects by property
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Carol', age: 25 },
  { name: 'Dave', age: 30 }
];

const groupByAge = people.reduce((groups, person) => {
  const age = person.age;
  if (!groups[age]) {
    groups[age] = [];
  }
  groups[age].push(person);
  return groups;
}, {});

console.log(groupByAge);
/* Result:
{
  '25': [
    { name: 'Alice', age: 25 },
    { name: 'Carol', age: 25 }
  ],
  '30': [
    { name: 'Bob', age: 30 },
    { name: 'Dave', age: 30 }
  ]
}
*/

// Example 4: Removing falsy values from array
const mixedValues = [0, 'hello', '', false, 42, null, undefined, NaN];
const truthyValues = mixedValues.filter(Boolean);
console.log(truthyValues); // ['hello', 42]

// Example 5: Creating a unique array (remove duplicates)
const numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbersWithDuplicates)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// --------------------------------------
// 11. NEWER ARRAY METHODS
// --------------------------------------

// AT - gets element at index (supports negative indexing)
console.log(colors.at(-1)); // 'blue' (last element)

// TOSTRING - converts array to string
console.log(colors.toString()); // 'red,green,blue'

// TOREVERSED, TOSORTED, TOSPLICED - non-mutating versions of reverse, sort, splice (ES2023)
const originalArray = [3, 1, 4, 1, 5];
const sortedArray = originalArray.toSorted();
console.log(originalArray); // [3, 1, 4, 1, 5] (not modified)
console.log(sortedArray); // [1, 1, 3, 4, 5]

// FILL - fills array with static value
const filledArray = new Array(5).fill('x');
console.log(filledArray); // ['x', 'x', 'x', 'x', 'x']

// COPYWITHIN - copies part of array to another location in same array
const copyArray = [1, 2, 3, 4, 5];
copyArray.copyWithin(0, 3, 5); // Copy elements at index 3-4 to index 0-1
console.log(copyArray); // [4, 5, 3, 4, 5]