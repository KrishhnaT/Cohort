// Async JavaScript: Theory and Practical Implementation

// 1. Understanding Synchronous vs Asynchronous Execution
// Synchronous execution: Tasks run one after another, blocking the main thread
function synchronousExample() {
     console.log("First task");
     console.log("Second task");
     console.log("Third task");
 }
 
 // Asynchronous execution: Tasks can run without blocking the main thread
 function asynchronousIntro() {
     console.log("Start of async operations");
     
     // Simulating async behavior
     setTimeout(() => {
         console.log("Async task completed");
     }, 1000);
     
     console.log("Continuing execution");
 }
 
 // 2. Callbacks: The Traditional Async Approach
 function traditionalCallback(data, callback) {
     // Simulate an async operation
     setTimeout(() => {
         const processedData = data.toUpperCase();
         callback(processedData);
     }, 1000);
 }
 
 traditionalCallback("hello world", (result) => {
     console.log(result); // Prints "HELLO WORLD" after 1 second
 });
 
 // 3. Promises: A Better Way to Handle Async Operations
 function fetchUserData(userId) {
     return new Promise((resolve, reject) => {
         // Simulating an API call
         setTimeout(() => {
             const users = {
                 1: { name: "Alice", age: 30 },
                 2: { name: "Bob", age: 25 }
             };
             
             const user = users[userId];
             
             if (user) {
                 resolve(user);
             } else {
                 reject(new Error("User not found"));
             }
         }, 1000);
     });
 }
 
 // Using Promises
 fetchUserData(1)
     .then(user => {
         console.log("User found:", user);
         return user.name;
     })
     .then(name => {
         console.log("User name:", name);
     })
     .catch(error => {
         console.error("Error:", error.message);
     });
 
 // 4. Async/Await: Syntactic Sugar for Promises
 async function getUserProfile(userId) {
     try {
         const user = await fetchUserData(userId);
         console.log("User Profile:", user);
         return user;
     } catch (error) {
         console.error("Failed to fetch user:", error);
     }
 }
 
 // Calling the async function
 getUserProfile(2);
 
 // 5. Advanced: Parallel Async Operations
 async function fetchMultipleUsers() {
     try {
         // Run multiple async operations in parallel
         const userPromises = [
             fetchUserData(1),
             fetchUserData(2)
         ];
         
         // Wait for all promises to resolve
         const users = await Promise.all(userPromises);
         
         console.log("All Users:", users);
     } catch (error) {
         console.error("Error fetching users:", error);
     }
 }
 
 fetchMultipleUsers();
 
 // 6. Error Handling in Async Operations
 async function riskyAsyncOperation() {
     try {
         const result = await fetchUserData(999); // Non-existent user
         return result;
     } catch (error) {
         // Graceful error handling
         console.error("Caught error:", error.message);
         // Optionally rethrow or return a default value
         return null;
     }
 }
 
 // 7. Real-world Async Pattern: Data Fetching
 async function fetchDataWithRetry(url, retries = 3) {
     for (let i = 0; i < retries; i++) {
         try {
             const response = await fetch(url);
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return await response.json();
         } catch (error) {
             console.warn(`Attempt ${i + 1} failed:`, error);
             
             // Wait before retrying
             await new Promise(resolve => setTimeout(resolve, 1000));
         }
     }
     
     throw new Error('Failed to fetch data after multiple attempts');
 }
 
 // 8. Event Loop Visualization
 function eventLoopSimulation() {
     console.log('Start');
 
     // Microtask (Promise)
     Promise.resolve().then(() => {
         console.log('Promise microtask');
     });
 
     // Macrotask (setTimeout)
     setTimeout(() => {
         console.log('Timeout macrotask');
     }, 0);
 
     console.log('End');
 }
 
 // Demonstrating different async execution order
 eventLoopSimulation();
 
 // 9. Cancellable Async Operations
 function createCancellablePromise() {
     let cancel;
     
     const promise = new Promise((resolve, reject) => {
         const timeout = setTimeout(() => {
             resolve("Operation completed");
         }, 5000);
         
         // Create a cancel function
         cancel = () => {
             clearTimeout(timeout);
             reject(new Error("Operation cancelled"));
         };
     });
     
     return { promise, cancel };
 }
 
 // Usage example
 const { promise, cancel } = createCancellablePromise();
 
 promise
     .then(result => console.log(result))
     .catch(error => console.error(error));
 
 // Optional: Cancel the operation
 // cancel();
 
 // Conclusion: Best Practices
 /*
 Async Best Practices:
 1. Use async/await for most async operations
 2. Always handle errors with try/catch
 3. Avoid callback hell
 4. Use Promise.all() for parallel operations
 5. Be mindful of the event loop
 6. Consider cancellation for long-running tasks
 */