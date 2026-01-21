// console.log("Hello world!")
// function printUser(user){
// console.log(user.name +" age is "+ user.age);

// }
// let users=[
//     {name:"Bassam",age:18,skills:"Nextjs"},
//     {name:"Haneen",age:18,skills:"Mobile"},
//     {name:"Faris",age:18,skills:"Nextjs"},
// ]
// console.log(users[1].name);

// printUser(users[0])

// users.forEach((item)=>console.log(item)
// )

// let arr=[1,2,3,4,5]
// let double= arr.map((numbers)=>numbers*2)
// console.log(double);

// let ages = [12, 18, 25, 16];
// let adults= ages.filter((age)=> age>=18)
// console.log(adults);

// let a = [10, 20, 30];

// a.push(99)
// console.log(a);
// a.pop()
// console.log(a);
// a.shift()
// console.log(a);
// a.unshift(99)
// console.log(a);



// // function sum(...numbers2) {
// //   return numbers2.reduce((a, b) => a + b);
// // }
// // let numbers2=[21,32,34,2,5,67,76]

// // console.log(sum(...numbers2));

// // for (let i = 1; i <= 3; i++) {
// //   setTimeout(() => console.log(i), 1000);
// // }

// //Closure (Remember Variabale from its outer function)
// console.log("Closure");

// function outer(){
//     let count =0

// function inner(){
//     count++;
//     console.log(count);
    
// }
// return inner;
// }


// const fn=outer()
// fn()
// fn()


// // const user={
// //     name:"Ali",  //object method
// //     // sayHi(){console.log(this.name)}
// // sayHi:()=>{console.log(this.name); //undefined arrow function don't have its own this
// // }
// // }
// // user.sayHi()

// console.log("call","apply","bind used to control this manually");
// function greet(city){
//     console.log(this.name+" from "+ city);
    
// }
// const user = {name:"Ali"}
// greet.call(user,"Delhi")
// greet.apply(user,["Delhi"]) // in apply args array

// const newGreet = greet.bind(user)
// newGreet("Delhi")
// console.log("Predict output");

// const person = {
//   name: "John",
//   sayName() {
//     return () => console.log(this.name);
//   }
// };

// person.sayName()();

// console.log("Stack");

// // console.log("1");
// // setTimeout(()=>console.log("2"),0)
// // Promise.resolve().then(()=>console.log("3"))
// // console.log("4");



// function Person(){
//    this.user="Bassam"
    
// }
// Person.prototype.sayHi=function(){
// console.log("Hi "+ this.user);

// }

// const personObj = new Person();
// personObj.sayHi();



const greet = name => "Hello " + name;

console.log(greet())