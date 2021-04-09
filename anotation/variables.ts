let apples: number;
apples = 9;
let speed: string = "fast"
let hasName: boolean = true;
let nothingMuch: null =null;
let now: Date = new Date();
let colors: string[]=["a", 'b'];
apples = 5;
let myNumbers: number[] =[1,2,3,4]
let truths: boolean[] = [false]

class Car {

}

let lCar: Car = new Car();
//object literal
let point: {x: number; y: number} = {
    x: 10,
    y: 20
}
 
//Function
// this function will take a number prop will return void
const logNumber: (i: number)=>void = (i: number) =>{
    console.log(i)
}

// when to use annotations
//1)When a function that returns the 'any' type
const json = '{"x":10, "y":20}'
const cord:{x:number; y:number} = JSON.parse(json);
console.log(cord);

//2) When we declare a variable on one line and initalizate it later

let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++){
    if (words[i]==='green'){
        foundWord = true;
    }
}

/***Functions  */