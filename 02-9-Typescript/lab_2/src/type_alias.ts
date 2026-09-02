import country from '../country.json';

type Country = typeof country;



type Company = {
    name:string;
    id:number;
    address: { street:string; city:string; state:string; zip:string; country:string };
    employees: Array<Employee>;
    value: number;
    creationDate: Date;
    isEnterprise: boolean;
    industry: string;
    revenue: number;
    profit: number;
    getEmployeeCount: () => number;
    status: 'active' | 'inactive' | 'closed';
}


type User = {
    password: string;
    userName:string
}

type Employee = {
    name:string;
    id:number;
    email:string;
    phone?:string;
    address?: { street:string; city:string; state:string; zip:string; country:string };
    salary?:number;
}

type UserType = User & Employee
const u: UserType = {
    password: '1234567890',
    userName: 'john.doe',
    name: 'John Doe',
    id: 1,
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: { street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345', country: 'USA' },
}

function getCompanies(companyId: number): Company {
    return {} as Company;
}

function getEmployee(employeeId: number): Employee {
    return {
        name: 'John Doe',
        id: 1,
        email: 'john.doe@example.com',
        
    }
}

function getEmployeeCount(company: Company): number {
    return company.employees.length;
}

type EmployeeReturnTYpe = ReturnType<typeof getEmployeeCount>;



const ids:Array<number | string> = [];
function addIdIntoIds(currentId:number | string){
    ids.push(currentId);
}

addIdIntoIds(111)

addIdIntoIds(333)
addIdIntoIds("userId123")