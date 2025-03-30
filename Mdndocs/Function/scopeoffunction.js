/**
 * PRACTICAL GUIDE TO JAVASCRIPT FUNCTION SCOPE
 * 
 * This file explains how scope works in JavaScript functions
 * with practical examples and common patterns.
 */

// ----------------------------------------
// 1. GLOBAL SCOPE
// ----------------------------------------

// Variables declared outside of any function are in the global scope
const globalVariable = "I'm global";
var anotherGlobalVariable = "I'm also global";

function demonstrateGlobalScope() {
  console.log(globalVariable); // Accessible everywhere
}

demonstrateGlobalScope();
console.log(globalVariable); // Also accessible here

// Warning: Variables without declaration keywords are global
function createAccidentalGlobal() {
  oops = "I'm accidentally global"; // No let, const, or var
}

createAccidentalGlobal();
console.log(oops); // "I'm accidentally global" - available globally

// ----------------------------------------
// 2. FUNCTION SCOPE
// ----------------------------------------

function functionScopeDemo() {
  // Variables declared inside a function are only accessible within that function
  var functionScopedVar = "I'm function scoped";
  let alsoFunctionScoped = "I'm also function scoped";
  const stillFunctionScoped = "I'm still function scoped";
  
  console.log(functionScopedVar); // Works fine
  console.log(globalVariable);    // Global variables are accessible
  
  // Nested function can access parent's variables
  function nestedFunction() {
    console.log(functionScopedVar); // Can access parent function's variables
    const nestedVar = "I'm nested";
    console.log(nestedVar);        // Works fine
  }
  
  nestedFunction();
  // console.log(nestedVar);      // Error: nestedVar is not defined
}

functionScopeDemo();
// console.log(functionScopedVar); // Error: functionScopedVar is not defined

// ----------------------------------------
// 3. BLOCK SCOPE (ES6+)
// ----------------------------------------

function blockScopeDemo() {
  let outside = "I'm outside the block";
  
  if (true) {
    // let and const are block-scoped
    let blockScoped = "I'm block scoped";
    const alsoBlockScoped = "I'm also block scoped";
    
    // var is function-scoped, not block-scoped
    var notBlockScoped = "I'm not block scoped";
    
    console.log(outside);         // Accessible from parent scope
    console.log(blockScoped);     // Accessible within this block
  }
  
  console.log(outside);           // Still accessible
  console.log(notBlockScoped);    // Still accessible because var is function-scoped
  // console.log(blockScoped);    // Error: blockScoped is not defined
  
  // Loops also create block scope
  for (let i = 0; i < 3; i++) {
    // i is block-scoped to this loop
    const square = i * i;
    console.log(square);
  }
  
  // console.log(i);       // Error: i is not defined
  // console.log(square);  // Error: square is not defined
  
  // Contrast with var in loops
  for (var j = 0; j < 3; j++) {
    var varResult = j * j;
  }
  
  console.log(j);          // 3 - accessible outside the loop
  console.log(varResult);  // 4 - accessible outside the loop
}

blockScopeDemo();

// ----------------------------------------
// 4. LEXICAL SCOPE & CLOSURES
// ----------------------------------------

function createCounter() {
  // count is in the lexical scope of createCounter
  let count = 0;
  
  // The returned function forms a closure, "remembering" count
  return function increment() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate instance)
console.log(counter1()); // 3

// Practical example: Creating private variables
function createBankAccount(initialBalance) {
  // balance is private (not accessible from outside)
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited ${amount}. New balance: ${balance}`;
      }
      return "Invalid deposit amount";
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrew ${amount}. New balance: ${balance}`;
      }
      return "Invalid withdrawal amount or insufficient funds";
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.getBalance()); // 100
console.log(account.deposit(50));  // Deposited 50. New balance: 150
console.log(account.withdraw(30)); // Withdrew 30. New balance: 120
// console.log(account.balance);   // undefined - balance is private

// ----------------------------------------
// 5. SCOPE CHAIN & VARIABLE LOOKUP
// ----------------------------------------

const name = "Global";

function outer() {
  const name = "Outer";
  
  function inner() {
    // JavaScript looks for 'name' in current scope,
    // then in parent scopes (scope chain)
    console.log(`Name: ${name}`);
    
    function innermost() {
      const name = "Innermost";
      console.log(`Name: ${name}`);
    }
    
    innermost();
  }
  
  inner();
}

outer();
// Outputs:
// Name: Outer
// Name: Innermost

// Variable shadowing
function shadowDemo() {
  const value = "Outer";
  
  function inner() {
    const value = "Inner"; // Shadows outer 'value'
    console.log(value);
  }
  
  console.log(value); // "Outer"
  inner();            // "Inner"
  console.log(value); // Still "Outer" - wasn't changed
}

shadowDemo();

// ----------------------------------------
// 6. HOISTING
// ----------------------------------------

function hoistingDemo() {
  // Variables declared with var are hoisted to the top of their scope,
  // but their assignments are not
  console.log(hoistedVar); // undefined (declaration hoisted, but not assignment)
  var hoistedVar = "I'm hoisted";
  console.log(hoistedVar); // "I'm hoisted"
  
  // Variables declared with let and const are hoisted but not initialized
  // This creates a "temporal dead zone" where accessing them throws an error
  // console.log(notHoisted); // Error: Cannot access before initialization
  let notHoisted = "I'm not hoisted";
  console.log(notHoisted); // "I'm not hoisted"
  
  // Function declarations are fully hoisted
  hoistedFunction(); // Works even before declaration
  function hoistedFunction() {
    console.log("I'm a hoisted function");
  }
  
  // Function expressions are not hoisted
  // notHoistedFunction(); // Error: notHoistedFunction is not a function
  const notHoistedFunction = function() {
    console.log("I'm not hoisted");
  };
  notHoistedFunction(); // Works after declaration
}

hoistingDemo();

// ----------------------------------------
// 7. IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)
// ----------------------------------------

// Creates a new scope to avoid polluting the global scope
(function() {
  const privateVar = "I'm private";
  console.log(privateVar); // "I'm private"
})();

// console.log(privateVar); // Error: privateVar is not defined

// IIFE with parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})("Alice");

// Modern alternative using blocks
{
  const privateVar = "I'm private in a block";
  console.log(privateVar);
}
// console.log(privateVar); // Error: privateVar is not defined

// ----------------------------------------
// 8. PRACTICAL APPLICATIONS
// ----------------------------------------

// Module pattern (pre-ES6 modules)
const calculator = (function() {
  // Private variables and functions
  let result = 0;
  
  function validateNumber(num) {
    return typeof num === 'number' && !isNaN(num);
  }
  
  // Public API
  return {
    add: function(num) {
      if (validateNumber(num)) {
        result += num;
      }
      return result;
    },
    subtract: function(num) {
      if (validateNumber(num)) {
        result -= num;
      }
      return result;
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
      return result;
    }
  };
})();

console.log(calculator.add(5));      // 5
console.log(calculator.subtract(2)); // 3
console.log(calculator.getResult()); // 3
console.log(calculator.reset());     // 0

// Factory functions
function createPerson(name, age) {
  // Private variables
  const privateDOB = new Date(Date.now() - age * 365 * 24 * 60 * 60 * 1000);
  
  // Public methods that form closures over the private data
  return {
    getName: function() {
      return name;
    },
    getAge: function() {
      return age;
    },
    celebrateBirthday: function() {
      age++;
      return `Happy Birthday! ${name} is now ${age}`;
    },
    // Private data is accessible but not directly exposed
    getBirthYear: function() {
      return privateDOB.getFullYear();
    }
  };
}

const person = createPerson("Bob", 30);
console.log(person.getName());           // "Bob"
console.log(person.getAge());            // 30
console.log(person.celebrateBirthday()); // "Happy Birthday! Bob is now 31"
console.log(person.getBirthYear());      // Birth year based on age

// Revealing Module Pattern
const revealingModule = (function() {
  // Private members
  let privateVar = "I'm private";
  
  function privateMethod() {
    return "This is private";
  }
  
  // Public members
  function publicMethod1() {
    return `Public method accessing ${privateVar}`;
  }
  
  function publicMethod2() {
    return privateMethod() + " but called via public method";
  }
  
  // Reveal public members
  return {
    method1: publicMethod1,
    method2: publicMethod2
  };
})();

console.log(revealingModule.method1()); // "Public method accessing I'm private"
console.log(revealingModule.method2()); // "This is private but called via public method"
// console.log(revealingModule.privateVar); // undefined

// ----------------------------------------
// 9. SCOPE AND ASYNC OPERATIONS
// ----------------------------------------

function asyncScopeDemo() {
  for (var i = 0; i < 3; i++) {
    // Problem: var is function-scoped, not block-scoped
    setTimeout(function() {
      console.log("var i:", i); // Will print "3" three times
    }, 100);
  }
  
  for (let j = 0; j < 3; j++) {
    // Solution: let is block-scoped, each iteration gets its own j
    setTimeout(function() {
      console.log("let j:", j); // Will print 0, 1, 2
    }, 100);
  }
  
  // Old solution with IIFE to create a new scope for each iteration
  for (var k = 0; k < 3; k++) {
    (function(capturedK) {
      setTimeout(function() {
        console.log("IIFE k:", capturedK); // Will print 0, 1, 2
      }, 100);
    })(k);
  }
}

asyncScopeDemo();

// ----------------------------------------
// 10. SCOPE IN ARROW FUNCTIONS
// ----------------------------------------

function arrowScopeDemo() {
  const obj = {
    name: "Object",
    
    // Traditional function has its own 'this'
    traditionalMethod: function() {
      console.log("Traditional this.name:", this.name);
      
      setTimeout(function() {
        // 'this' is redefined in this function scope
        console.log("Traditional setTimeout this.name:", this.name); // undefined or global
      }, 100);
    },
    
    // Arrow function inherits 'this' from parent scope
    arrowMethod: function() {
      console.log("Arrow parent this.name:", this.name);
      
      setTimeout(() => {
        // 'this' is from the parent scope
        console.log("Arrow setTimeout this.name:", this.name); // "Object"
      }, 100);
    }
  };
  
  obj.traditionalMethod();
  obj.arrowMethod();
}

arrowScopeDemo();