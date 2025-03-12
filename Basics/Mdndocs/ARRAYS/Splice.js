//Splice 

const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]


// splice(start)
// splice(start, deleteCount)
// splice(start, deleteCount, item1)
// splice(start, deleteCount, item1, item2)
// splice(start, deleteCount, item1, item2, /* …, */ itemN)


/*The splice() method of Array instances changes the
 contents of an array by removing or replacing existing
  elements and/or adding new elements in place.

To create a new array with a segment removed and/or
 replaced without mutating the original array, use
 toSpliced(). To access part of an array without 
 modifying it, see slice().*/