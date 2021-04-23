const {format} = require('date-fns');
//today's date
const today =format(new Date(),'dd.MM.yyyy');
console.log(today);


const birthday = new Date('August 19, 1975 23:15:30');
const day1 = birthday.getDay();
// Sunday - Saturday : 0 - 6

console.log(day1);
// expected output: 2

export {today}