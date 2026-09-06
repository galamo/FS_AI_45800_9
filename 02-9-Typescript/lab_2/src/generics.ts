function getIdentity(value:any):any{
    return value;
}

function getLastItemFromArray(array:Array<any>):any{
    return array[array.length-1]
}


const resultarr = getLastItemFromArray([1, 2, 3, 4, 5]);
const resultarr1 = getLastItemFromArray(["red", "green", "blue", "yellow"]);

function getLastItemFromArrayGen<T>(array:Array<T>):T{
    return array[array.length-1] as T
}

const resultarr2 = getLastItemFromArrayGen([1, 2, 3, 4, 5]);
const resultarr3 = getLastItemFromArrayGen(["red", "green", "blue", "yellow"]);




interface APIResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
    errorMessage?:string
}

type Car = {id:number, model:string}
type Book = {id:number, title:string}
type Company = {id:number, name:string}
type Shape = {id:number, type:string}

function getCars():APIResponse<Car | undefined>{
    return {
        data: undefined,
        isSuccess: false,
        message: "Failure",
        errorMessage: "Something went Wrong"
    }
}

function getBooks():APIResponse<Book>{
    return {
        data: {id:1, title:"The Great Gatsby"},
        isSuccess: true,
        message: "Success"
    }
}

function getCompanies():APIResponse<Company>{
    return {
        data: {id:1, name:"Google"},
        isSuccess: true,
        message: "Success"
    }
}

function getShapes():APIResponse<Shape>{
    return {
        data: {id:1, type:"Circle"},
        isSuccess: true,
        message: "Success"              
    }
}


