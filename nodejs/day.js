/**
 * Viết hàm isWeekend nhận vào 1 ngày dưới dạng string YYYY/MM/DD trả về true nếu ngày đó là 1 ngày cuối tuần (Thứ 7 hoặc Chủ Nhật), ngược lại trả về false
 */

var moment = require('moment');

function isWeekend(dateString) {
  var dobj = moment(dateString);
  return dobj.day()==6||dobj.day()==0;  
}



console.log(isWeekend('2018-09-08'));
console.log(isWeekend('2018-09-07'));

/**
 * Viết hàm subtractDays trả về 1 ngày trong quá khứ cách ngày được truyền vào n ngày
 */
function subtractDays(d, n) {
  d.setDate(d.getDate() - 5);
  console.log(d.toLocaleString());
}

subtractDays(new Date(), 5);



function reverse(str) {
	return str.split("").reverse().join("");
}

function cap(str){
	// return str.split("");
	console.log(str.split(" ").map(e=>e.charAt(0).toUpperCase()+e.substr(1)).join(" "));
}

cap('look, it is working!');

var x;
console.log(x);
// console.log(cap('capitalizes the first letter of every word in a sentence'));

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function toNextChar(str) {
	// Viết hàm toNextChar dùng để thay thế mọi ký tự trong một chuỗi thành ký tự theo sau nó trong bảng chữ cái. Ví dụ: "Hello" chuyển thành "Ifmpp"
  // Tham số:
  // - String: chuỗi nhập vào ban đầu.
  	
  return str.split("").map(e=>nextChar(e)).join("");
}


function newString(str, n){
	var s = str.split("");
  var l = str.length;
  var s1="";
  var s2="";
  for(i=0;i<n;i++){
  	s1+=s[i];
  }
  for(i=l-n;i<l;i++){
  	s2+=s[i];
  }
  return s1+s2;
}

console.log(newString("describle",2));

function maxOfSumChain(arr,k){
	var sum=0;
  arr.sort(function(a,b){return b-a});
  for(i=0;i<k;i++){
  sum+=arr[i];
  }
  return sum;
}

console.log(maxOfSumChain([1,3,2],2));