/**
 * JavaScript Functions Guide
 * 
 * This file explains the core concepts of:
 * - Function declarations and expressions
 * - Function calls
 * - Parameters and arguments
 * - Return values
 * - Scope
 * - The call method
 */

// ----------------------------------------
// 1. FUNCTION DECLARATIONS & EXPRESSIONS
// ----------------------------------------

// Function Declaration
function greet(name) {
     return `Hello, ${name}!`;
   }
   
   // Function Expression
   const sayGoodbye = function(name) {
     return `Goodbye, ${name}!`;
   };
   
   // Arrow Function (modern syntax)
   const welcome = (name) => {
     return `Welcome, ${name}!`;
   };
   
   // Concise Arrow Function (for one-liners)
   const shortGreet = name => `Hi, ${name}!`;
   
   // ----------------------------------------
   // 2. FUNCTION CALLS
   // ----------------------------------------
   
   // Basic function call
   console.log(greet("Alice")); // Outputs: Hello, Alice!
   
   // Storing the result of a function call
   const greeting = greet("Bob");
   console.log(greeting); // Outputs: Hello, Bob!
   
   // Functions as arguments to other functions
   function processName(name, processor) {
     return processor(name);
   }
   
   console.log(processName("Charlie", greet)); // Outputs: Hello, Charlie!
   
   // ----------------------------------------
   // 3. PARAMETERS & ARGUMENTS
   // ----------------------------------------
   
   // Parameters vs Arguments
   // 'user' and 'message' are parameters (variables defined in the function declaration)
   function sendMessage(user, message) {
     return `To ${user}: ${message}`;
   }
   
   // "Dave" and "How are you?" are arguments (actual values passed when calling)
   console.log(sendMessage("Dave", "How are you?")); // Outputs: To Dave: How are you?
   
   // Default parameters
   function createProfile(name, age = 30, location = "Unknown") {
     return {
       name: name,
       age: age,
       location: location
     };
   }
   
   console.log(createProfile("Eve")); // {name: "Eve", age: 30, location: "Unknown"}
   console.log(createProfile("Frank", 25)); // {name: "Frank", age: 25, location: "Unknown"}
   console.log(createProfile("Grace", 28, "New York")); // {name: "Grace", age: 28, location: "New York"}
   
   // Rest parameters (collecting multiple arguments)
   function sum(...numbers) {
     return numbers.reduce((total, current) => total + current, 0);
   }
   
   console.log(sum(1, 2, 3, 4)); // Outputs: 10
   
   // ----------------------------------------
   // 4. RETURN VALUES
   // ----------------------------------------
   
   // Returning different data types
   function returnExamples(type) {
     if (type === "string") return "This is a string";
     if (type === "number") return 42;
     if (type === "boolean") return true;
     if (type === "object") return { key: "value" };
     if (type === "array") return [1, 2, 3];
     if (type === "function") return function() { return "I'm a returned function"; };
     
     // No return statement or just 'return' by itself returns undefined
     return;
   }
   
   console.log(returnExamples("string")); // Outputs: This is a string
   console.log(returnExamples("number")); // Outputs: 42
   
   // Storing and using a returned function
   const returnedFn = returnExamples("function");
   console.log(returnedFn()); // Outputs: I'm a returned function
   
   // Early returns for control flow
   function findUserType(age) {
     if (age < 0) return "Invalid age";
     if (age < 13) return "Child";
     if (age < 18) return "Teen";
     if (age < 65) return "Adult";
     return "Senior";
   }
   
   console.log(findUserType(25)); // Outputs: Adult
   
   // ----------------------------------------
   // 5. SCOPE
   // ----------------------------------------
   
   // Global scope
   const globalVar = "I'm global";
   
   function scopeDemo() {
     // Function scope
     const functionVar = "I'm a function variable";
     
     console.log(globalVar); // Can access global variables
     console.log(functionVar); // Can access its own variables
     
     // Block scope (with let/const)
     if (true) {
       const blockVar = "I'm block-scoped";
       let anotherBlockVar = "Also block-scoped";
       var functionScopedVar = "I'm function-scoped even though inside a block";
       
       console.log(blockVar); // Only accessible within this block
       console.log(globalVar); // Global still accessible
     }
     
     // console.log(blockVar); // Error: blockVar is not defined
     console.log(functionScopedVar); // Accessible because 'var' has function scope
     
     function nestedFunction() {
       const nestedVar = "I'm in a nested function";
       console.log(functionVar); // Can access parent function's variables
       console.log(globalVar); // Can access global variables
     }
     
     nestedFunction();
     // console.log(nestedVar); // Error: nestedVar not accessible here
   }
   
   scopeDemo();
   // console.log(functionVar); // Error: functionVar not accessible outside function
   
   // Closures - inner functions retaining access to parent scope
   function createCounter() {
     let count = 0; // Private variable
     
     return function() {
       count++; // Can access and modify the parent's count variable
       return count;
     };
   }
   
   const counter = createCounter();
   console.log(counter()); // Outputs: 1
   console.log(counter()); // Outputs: 2
   console.log(counter()); // Outputs: 3
   
   // ----------------------------------------
   // 6. THE CALL METHOD
   // ----------------------------------------
   
   // Regular method in an object
   const person = {
     name: "Helen",
     greet: function() {
       return `Hello, my name is ${this.name}`;
     }
   };
   
   console.log(person.greet()); // Outputs: Hello, my name is Helen
   
   // Using call to change 'this' context
   const anotherPerson = {
     name: "Ian"
   };
   
   // Call the greet function but use anotherPerson as 'this'
   console.log(person.greet.call(anotherPerson)); // Outputs: Hello, my name is Ian
   
   // Call with additional arguments
   function introduce(greeting, punctuation) {
     return `${greeting}, my name is ${this.name}${punctuation}`;
   }
   
   console.log(introduce.call(person, "Hi", "!")); // Outputs: Hi, my name is Helen!
   console.log(introduce.call(anotherPerson, "Hey", "...")); // Outputs: Hey, my name is Ian...
   
   // Similar methods: apply (uses array for arguments) and bind (creates new function)
   console.log(introduce.apply(person, ["Hello", "?"])); // Outputs: Hello, my name is Helen?
   
   const ianIntroduce = introduce.bind(anotherPerson);
   console.log(ianIntroduce("Welcome", ".")); // Outputs: Welcome, my name is Ian.