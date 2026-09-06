function add(a: number, b: number): number;
function add(a: string, b: string): number;
function add(a: number | string, b: number | string ): number | string {
  console.log(a);
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else if (typeof a === "string" && typeof b === "string") {
    return Number(a) + Number(b);
  } else {
    return "Invalid Input";
  }
}

const result = add(5, 3);
const result2 = add("4","1")


function convertUSDToILS(value: number):number;
function convertUSDToILS(value: string):number;
function convertUSDToILS(value: number | string):number | string{
  if(typeof value === "number"){
    return value * 3
  }else{
    return "Invalid Input"
  }
}


function getUserId(id:number):number;
function getUserId(id:string):string
function getUserId(id:number | string):number | string{
  if(typeof id === "number"){
    return "gal amouyal"
  }else{
    return "gal amouyal"
  }
}

const result7 = getUserId(1);
const result8 = getUserId("vadim");


