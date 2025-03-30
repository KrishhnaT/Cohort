/**
 * PRACTICAL GUIDE TO JAVASCRIPT ARROW FUNCTIONS
 * 
 * This file provides a hands-on explanation of arrow functions with
 * practical examples showing when and why you would use them.
 */

// ----------------------------------------
// 1. BASIC SYNTAX COMPARISON
// ----------------------------------------

// Traditional function expression
const traditionalGreet = function(name) {
     return `Hello, ${name}!`;
   };
   
   // Arrow function equivalent
   const arrowGreet = (name) => {
     return `Hello, ${name}!`;
   };
   
   // Even shorter for one-parameter functions (parentheses optional)
   const shortGreet = name => `Hello, ${name}!`;
   
   // No parameters requires empty parentheses
   const sayHi = () => "Hi there!";
   
   // Multiple parameters require parentheses
   const greetWithTitle = (title, name) => `Hello, ${title} ${name}!`;
   
   console.log(traditionalGreet("Alice")); // Hello, Alice!
   console.log(arrowGreet("Bob"));         // Hello, Bob!
   console.log(shortGreet("Charlie"));     // Hello, Charlie!
   console.log(sayHi());                   // Hi there!
   console.log(greetWithTitle("Dr.", "Smith")); // Hello, Dr. Smith!
   
   // ----------------------------------------
   // 2. IMPLICIT RETURNS
   // ----------------------------------------
   
   // Traditional function needs explicit return
   const square1 = function(x) {
     return x * x;
   };
   
   // Arrow function with block needs explicit return too
   const square2 = (x) => {
     return x * x;
   };
   
   // Arrow function with implicit return (no curly braces)
   const square3 = x => x * x;
   
   console.log(square1(5)); // 25
   console.log(square2(5)); // 25
   console.log(square3(5)); // 25
   
   // Implicit return of object (requires parentheses)
   const createUser = (name, age) => ({ name: name, age: age });
   
   console.log(createUser("Dave", 30)); // {name: "Dave", age: 30}
   
   // ----------------------------------------
   // 3. PRACTICAL USE: ARRAY METHODS
   // ----------------------------------------
   
   const numbers = [1, 2, 3, 4, 5];
   const users = [
     { name: "Alice", age: 25 },
     { name: "Bob", age: 30 },
     { name: "Charlie", age: 22 }
   ];
   
   // map - transform each item
   const doubled = numbers.map(num => num * 2);
   console.log(doubled); // [2, 4, 6, 8, 10]
   
   // filter - keep items that pass a test
   const adults = users.filter(user => user.age >= 25);
   console.log(adults); // [{name: "Alice", age: 25}, {name: "Bob", age: 30}]
   
   // reduce - accumulate values
   const sum = numbers.reduce((total, num) => total + num, 0);
   console.log(sum); // 15
   
   // sort - customize sorting logic
   const sorted = [...users].sort((a, b) => a.age - b.age);
   console.log(sorted); // sorted by age ascending
   
   // ----------------------------------------
   // 4. PRACTICAL USE: CALLBACKS
   // ----------------------------------------
   
   // Event handlers (browser context)
   // document.getElementById("button").addEventListener("click", () => {
   //   alert("Button clicked!");
   // });
   
   // Simulated event handler
   const simulateEventHandler = (callback) => {
     // Simulate an event occurring
     const event = { type: "click", target: { id: "button" } };
     callback(event);
   };
   
   simulateEventHandler(event => {
     console.log(`${event.type} event occurred on ${event.target.id}`);
   });
   
   // Asynchronous callbacks with setTimeout
   const delayedGreeting = (name) => {
     console.log("Starting delay...");
     setTimeout(() => {
       console.log(`Hello, ${name}! Sorry for the delay.`);
     }, 100); // 100ms delay for demo purposes
     console.log("Delay function registered.");
   };
   
   delayedGreeting("Eve");
   
   // Promises and fetch API (in browser)
   const fetchUserExample = () => {
     return fetch('https://api.example.com/users')
       .then(response => response.json())
       .then(data => data.filter(user => user.active))
       .catch(error => console.error('Error fetching users:', error));
   };
   
   // Simulated fetch for Node environment
   const fakeFetch = (url) => {
     return new Promise((resolve, reject) => {
       // Simulate API response
       setTimeout(() => {
         if (url.includes('error')) {
           reject(new Error('Network error'));
         } else {
           resolve({
             json: () => Promise.resolve([
               { id: 1, name: 'Alice', active: true },
               { id: 2, name: 'Bob', active: false },
               { id: 3, name: 'Charlie', active: true }
             ])
           });
         }
       }, 100);
     });
   };
   
   // Using arrow functions with Promises
   const getActiveUsers = () => {
     return fakeFetch('https://api.example.com/users')
       .then(response => response.json())
       .then(users => users.filter(user => user.active))
       .then(activeUsers => console.log('Active users:', activeUsers))
       .catch(error => console.error('Error:', error));
   };
   
   getActiveUsers();
   
   // ----------------------------------------
   // 5. LEXICAL 'THIS' BINDING
   // ----------------------------------------
   
   // Problem with traditional functions
   const counterTraditional = {
     count: 0,
     start: function() {
       console.log("Traditional function this before:", this.count);
       // 'this' gets redefined in the callback, losing reference to counterTraditional
       setInterval(function() {
         this.count++; // 'this' refers to global object, not counterTraditional
         console.log("Traditional count (wrong):", this.count); // NaN or undefined
       }, 1000);
     }
   };
   
   // Fix 1: Using 'that' or 'self' pattern (pre-arrow functions)
   const counterWithThat = {
     count: 0,
     start: function() {
       const that = this; // Save reference to 'this'
       setInterval(function() {
         that.count++; // Use saved reference
         console.log("Count with 'that' pattern:", that.count);
       }, 1500);
     }
   };
   
   // Fix 2: Using arrow functions
   const counterWithArrow = {
     count: 0,
     start: function() {
       console.log("Arrow function this before:", this.count);
       // Arrow function inherits 'this' from parent scope
       setInterval(() => {
         this.count++; // 'this' correctly refers to counterWithArrow
         console.log("Count with arrow function:", this.count);
       }, 2000);
     }
   };
   
   // Uncomment to see the difference (they will run indefinitely)
   // counterTraditional.start();
   // counterWithThat.start();
   // counterWithArrow.start();
   
   // Demonstrating lexical this in a class context
   class Timer {
     constructor() {
       this.seconds = 0;
     }
     
     // Method using traditional function - needs special handling for 'this'
     startTraditional() {
       // We would need to bind this or use the 'that' pattern
       // setInterval(function() {
       //   this.seconds++;
       //   console.log(this.seconds);
       // }.bind(this), 1000);
     }
     
     // Method using arrow function - 'this' works as expected
     startWithArrow() {
       setInterval(() => {
         this.seconds++;
         console.log(`Seconds: ${this.seconds}`);
       }, 2500);
     }
   }
   
   // Uncomment to see timer work
   // const timer = new Timer();
   // timer.startWithArrow();
   
   // ----------------------------------------
   // 6. PRACTICAL USE: FUNCTION COMPOSITION
   // ----------------------------------------
   
   // Creating a simple utility library with arrow functions
   const utils = {
     // Transform functions
     double: x => x * 2,
     square: x => x * x,
     addPrefix: prefix => str => `${prefix}${str}`,
     
     // Composition helper
     compose: (...fns) => x => fns.reduceRight((val, fn) => fn(val), x),
     pipe: (...fns) => x => fns.reduce((val, fn) => fn(val), x)
   };
   
   // Using function composition
   const doubleAndSquare = utils.compose(utils.square, utils.double);
   console.log(doubleAndSquare(3)); // (3*2)² = 36
   
   // Using pipe (left-to-right composition)
   const squareAndDouble = utils.pipe(utils.square, utils.double);
   console.log(squareAndDouble(3)); // (3²)*2 = 18
   
   // Creating a data transformation pipeline
   const processUser = user => utils.pipe(
     u => ({...u, fullName: `${u.firstName} ${u.lastName}`}),
     u => ({...u, nameLength: u.fullName.length}),
     u => ({...u, isAdult: u.age >= 18})
   )(user);
   
   console.log(processUser({
     firstName: "Frank",
     lastName: "Johnson",
     age: 17
   }));
   // Output: {firstName: "Frank", lastName: "Johnson", age: 17, fullName: "Frank Johnson", nameLength: 13, isAdult: false}
   
   // ----------------------------------------
   // 7. WHEN NOT TO USE ARROW FUNCTIONS
   // ----------------------------------------
   
   // 1. Object methods that need 'this' to refer to the object
   const person = {
     name: "Grace",
     // BAD: 'this' doesn't refer to person
     badGreet: () => {
       console.log(`Hello, my name is ${this.name}`); // 'this.name' is undefined
     },
     // GOOD: 'this' refers to person
     goodGreet: function() {
       console.log(`Hello, my name is ${this.name}`);
     }
   };
   
   person.badGreet(); // "Hello, my name is undefined"
   person.goodGreet(); // "Hello, my name is Grace"
   
   // 2. Constructor functions (cannot use arrow functions)
   function Person(name) {
     this.name = name;
   }
   
   // 3. Function prototypes
   Person.prototype.greet = function() {
     return `Hi, I'm ${this.name}`;
   };
   
   const grace = new Person("Grace");
   console.log(grace.greet()); // "Hi, I'm Grace"
   
   // 4. Functions that need the 'arguments' object
   function traditionalSum() {
     // arguments is a special array-like object
     let total = 0;
     for (let i = 0; i < arguments.length; i++) {
       total += arguments[i];
     }
     return total;
   }
   
   // Arrow functions don't have their own 'arguments'
   // const arrowSum = () => {
   //   // This doesn't work - 'arguments' refers to parent scope
   //   let total = 0;
   //   for (let i = 0; i < arguments.length; i++) {
   //     total += arguments[i];
   //   }
   //   return total;
   // };
   
   // Use rest parameters instead for arrow functions
   const arrowSumWithRest = (...args) => {
     let total = 0;
     for (let i = 0; i < args.length; i++) {
       total += args[i];
     }
     return total;
   };
   
   console.log(traditionalSum(1, 2, 3)); // 6
   console.log(arrowSumWithRest(1, 2, 3)); // 6