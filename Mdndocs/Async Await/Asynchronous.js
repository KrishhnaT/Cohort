/**
 * ASYNCHRONOUS JAVASCRIPT GUIDE
 * =============================
 * This file explains key concepts related to asynchronous JavaScript
 * including callbacks, promises, async/await, the Fetch API, and error handling.
 */

/**
 * 1. CALLBACKS
 * ============
 * Callbacks are functions passed as arguments to other functions.
 * They allow you to execute code after an asynchronous operation completes.
 */

// Traditional callback example
function fetchDataWithCallback(url, successCallback, errorCallback) {
     // Simulating network request
     console.log(`Fetching data from ${url}...`);
     
     setTimeout(() => {
       // Simulate successful response 80% of the time
       if (Math.random() > 0.2) {
         const data = { id: 1, name: "Example Data" };
         successCallback(data);
       } else {
         errorCallback(new Error("Failed to fetch data"));
       }
     }, 1000);
   }
   
   // Usage example
   fetchDataWithCallback(
     "https://api.example.com/data",
     (data) => console.log("Success:", data),
     (error) => console.error("Error:", error.message)
   );
   
   // Callback hell example (nested callbacks)
   fetchDataWithCallback("https://api.example.com/users", (userData) => {
     fetchDataWithCallback(`https://api.example.com/users/${userData.id}/posts`, (postsData) => {
       fetchDataWithCallback(`https://api.example.com/posts/${postsData[0].id}/comments`, (commentsData) => {
         // This nesting gets unwieldy - known as "callback hell" or "pyramid of doom"
         console.log(commentsData);
       }, (error) => console.error(error));
     }, (error) => console.error(error));
   }, (error) => console.error(error));
   
   /**
    * 2. PROMISES
    * ===========
    * Promises provide a cleaner way to handle asynchronous operations.
    * A Promise represents a value that might be available now, in the future, or never.
    */
   
   // Converting our callback function to use promises
   function fetchDataWithPromise(url) {
     return new Promise((resolve, reject) => {
       console.log(`Fetching data from ${url}...`);
       
       setTimeout(() => {
         if (Math.random() > 0.2) {
           const data = { id: 1, name: "Example Data" };
           resolve(data);
         } else {
           reject(new Error("Failed to fetch data"));
         }
       }, 1000);
     });
   }
   
   // Using promises with .then() and .catch()
   fetchDataWithPromise("https://api.example.com/data")
     .then(data => console.log("Success:", data))
     .catch(error => console.error("Error:", error.message));
   
   // Promise chaining - much cleaner than callback hell
   fetchDataWithPromise("https://api.example.com/users")
     .then(userData => {
       console.log("User data:", userData);
       return fetchDataWithPromise(`https://api.example.com/users/${userData.id}/posts`);
     })
     .then(postsData => {
       console.log("Posts data:", postsData);
       return fetchDataWithPromise(`https://api.example.com/posts/${postsData[0].id}/comments`);
     })
     .then(commentsData => {
       console.log("Comments data:", commentsData);
     })
     .catch(error => {
       // This single catch will handle errors from any promise in the chain
       console.error("Error in promise chain:", error.message);
     });
   
   // Promise.all - run multiple promises in parallel
   Promise.all([
     fetchDataWithPromise("https://api.example.com/users"),
     fetchDataWithPromise("https://api.example.com/posts"),
     fetchDataWithPromise("https://api.example.com/comments")
   ])
     .then(([users, posts, comments]) => {
       console.log("All data fetched successfully:", { users, posts, comments });
     })
     .catch(error => {
       // If any promise fails, the entire operation fails
       console.error("At least one request failed:", error.message);
     });
   
   /**
    * 3. ASYNC/AWAIT
    * ==============
    * Async/await is syntactic sugar built on top of promises,
    * making asynchronous code look and behave more like synchronous code.
    */
   
   // Async function declaration
   async function fetchData() {
     try {
       console.log("Starting data fetch...");
       
       // Await pauses execution until the promise resolves
       const userData = await fetchDataWithPromise("https://api.example.com/users");
       console.log("User data:", userData);
       
       const postsData = await fetchDataWithPromise(`https://api.example.com/users/${userData.id}/posts`);
       console.log("Posts data:", postsData);
       
       const commentsData = await fetchDataWithPromise(`https://api.example.com/posts/${postsData[0].id}/comments`);
       console.log("Comments data:", commentsData);
       
       return commentsData; // This value will be wrapped in a resolved promise
     } catch (error) {
       // Error handling with try/catch
       console.error("Error in async function:", error.message);
       throw error; // Re-throwing will return a rejected promise
     }
   }
   
   // Using an async function (which returns a promise)
   fetchData()
     .then(result => console.log("Final result:", result))
     .catch(error => console.error("Caught error from async function:", error.message));
   
   // Parallel operations with async/await using Promise.all
   async function fetchMultipleData() {
     try {
       const [users, posts, comments] = await Promise.all([
         fetchDataWithPromise("https://api.example.com/users"),
         fetchDataWithPromise("https://api.example.com/posts"),
         fetchDataWithPromise("https://api.example.com/comments")
       ]);
       
       console.log("All data:", { users, posts, comments });
     } catch (error) {
       console.error("Error fetching multiple data:", error.message);
     }
   }
   
   /**
    * 4. FETCH API
    * ============
    * The Fetch API provides a modern interface for making HTTP requests.
    * It returns promises, making it compatible with async/await.
    */
   
   // Basic GET request
   fetch("https://api.example.com/data")
     .then(response => {
       // Check if the request was successful
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
       // Parse the JSON in the response
       return response.json();
     })
     .then(data => console.log("Fetch API data:", data))
     .catch(error => console.error("Fetch error:", error));
   
   // POST request with fetch
   fetch("https://api.example.com/posts", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Authorization": "Bearer token123"
     },
     body: JSON.stringify({
       title: "New Post",
       content: "This is the content of the post."
     })
   })
     .then(response => response.json())
     .then(data => console.log("Post created:", data))
     .catch(error => console.error("Error creating post:", error));
   
   // Using fetch with async/await
   async function fetchUserData(userId) {
     try {
       const response = await fetch(`https://api.example.com/users/${userId}`);
       
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
       
       const userData = await response.json();
       console.log("User data fetched:", userData);
       return userData;
     } catch (error) {
       console.error("Error fetching user data:", error);
       throw error;
     }
   }
   
   /**
    * 5. ERROR HANDLING
    * ================
    * Proper error handling is crucial for asynchronous operations.
    */
   
   // Promise error handling
   fetchDataWithPromise("https://api.example.com/data")
     .then(data => {
       console.log("Data:", data);
       // Throwing an error in a .then block will be caught by the .catch
       if (!data.isValid) {
         throw new Error("Invalid data");
       }
       return data;
     })
     .catch(error => {
       // This catches both network errors and thrown errors
       console.error("Handled error:", error.message);
       
       // You can return a fallback value to continue the chain
       return { id: 0, name: "Fallback Data" };
     })
     .finally(() => {
       // The finally block runs regardless of success or failure
       console.log("Operation completed (success or failure)");
     });
   
   // Async/await error handling
   async function fetchWithErrorHandling() {
     try {
       // Try to fetch data
       const data = await fetchDataWithPromise("https://api.example.com/data");
       console.log("Fetched data:", data);
       
       // Additional error checking
       if (!data.isValid) {
         throw new Error("Data validation failed");
       }
       
       return data;
     } catch (error) {
       // Catches any errors in the try block
       console.error("Error:", error.message);
       
       // Provide fallback or alternative behavior
       return { id: 0, name: "Fallback Data" };
     } finally {
       // Cleanup code that runs regardless of success or failure
       console.log("Fetch operation completed");
     }
   }
   
   // Common error handling patterns
   async function robustFetch(url, retries = 3, delay = 1000) {
     for (let attempt = 1; attempt <= retries; attempt++) {
       try {
         const response = await fetch(url);
         if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
         return await response.json();
       } catch (error) {
         console.error(`Attempt ${attempt} failed:`, error.message);
         
         if (attempt === retries) {
           console.error("All retry attempts failed");
           throw error; // Re-throw after all retries fail
         }
         
         // Wait before retrying
         await new Promise(resolve => setTimeout(resolve, delay));
         // Exponential backoff
         delay *= 2;
       }
     }
   }
   
   /**
    * CONCLUSION
    * ==========
    * Asynchronous JavaScript has evolved from callbacks to promises and then to async/await.
    * Each approach builds upon the previous one, offering more elegant ways to handle async operations.
    * The Fetch API provides a modern way to make HTTP requests using promises.
    * Proper error handling is essential for creating robust asynchronous code.
    */