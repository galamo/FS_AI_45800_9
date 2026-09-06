interface IUser {
    name: string;
    age: number;
    email?: string;
    password?: string;
    confirmPassword?: string;    
}

interface IUser{
    role: string, 
    permissions: string[],
}

//  Merge decleratioin between the interfaces


interface Animal{
    name: string;
    age: number;
    color: string;
    owner:string
}

interface Dog extends Animal{
    shirtColor: string,
    runningSpeed:number
}

interface Bird extends Animal{
    flySpeed: number
    highestAltitude: number
}

const dog:Dog = {
    name: "Rex",
    age: 5,
    color: "brown",
    owner: "John",
    shirtColor: "red"
}
// const obj:IUser = {
// name: "vadim",
// age: 20
// }