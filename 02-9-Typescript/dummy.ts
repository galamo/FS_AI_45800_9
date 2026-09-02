// function getId(id:number):string{
//     if(typeof id !== 'number'){
//         throw new Error('Id must be a number');
//     }
//     return `id_${id}`
// }
// getId()

// myId = 11111;
/**
 * @deprecated Use newFunction() instead.
 */
function dontCallMe(){

}
dontCallMe()

type UserSystem = {
    name:string;
    age:number;
    email:string;
}

const getUserName = (user:UserSystem) => { return user.name}

const user:UserSystem = {name:"aviv", age:20, email:"aviv@gmail.com"}
console.log(getUserName(user))

