var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

// 10:35 am 
// unpadded hours, padded minutes
// 12 hour clock with am / pm

// var date = moment();
// date.add(100, 'year').subtract(15, 'months');

// // console.log(date.format('MMMM Do, YYYY'));
// console.log(date.format('MMMM Do, YYYY'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date =  moment(createdAt);

console.log(date.format('h:mm a'));