const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

/* The filter() method of Array instances creates a shallow 
copy of a portion of a given array, filtered down to just
 the elements from the given array that pass the test 
 implemented by the provided function
 */


//  filter(callbackFn)
//  filter(callbackFn, thisArg)
 