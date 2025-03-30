//Map

const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]


/* The map() method of Array instances creates a new array 
populated with the results of calling a provided function 
on every element in the calling array.*/


//map(callbackFn)
//map(callbackFn, thisArg)


//Using map to reformat objects in an array..
const kvArray = [
     { key: 1, value: 10 },
     { key: 2, value: 20 },
     { key: 3, value: 30 },
   ];
   
   const reformattedArray = kvArray.map(({ key, value }) => ({ [key]: value }));
   
   console.log(reformattedArray); // [{ 1: 10 }, { 2: 20 }, { 3: 30 }]
   console.log(kvArray);
   // [
   //   { key: 1, value: 10 },
   //   { key: 2, value: 20 },
   //   { key: 3, value: 30 }
   // ]
   