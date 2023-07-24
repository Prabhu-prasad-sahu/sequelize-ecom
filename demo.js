const findEmail = { mobileNo: "prabhu" };
const mobileNo = findEmail?.mobileNo;

console.log(mobileNo); // Output: undefined

// const findEmail = {
//     mobileNo: '1234567890'
// };

// const mobileNo = findEmail?.mobileNo;

// console.log(mobileNo); // Output: '1234567890'

const list = [
    { color: 'white', size: 'XXL' },
    { color: 'red', size: 'XL' },
    { color: 'black', size: 'M' }
]
list.sort((a, b) => (a.size > b.size) ? 1 : -1)
console.log(list);



// ==============================================================
const crypto = require("crypto");


// const token = crypto.rendomBytes(32).toString("hex")
let password = crypto.createHash("sha256").update("token").digest("hex")
let time = Date.now() + 30 * 60 * 100
console.log(time);
console.log(password);
// console.log(token);

let arr = [1, 2, 3, 4, 5]
arr.map((data) => {
    console.log(data);
})