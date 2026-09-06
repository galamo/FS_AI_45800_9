/**
 * `keyof` turns an object type into a union of its property names (as strings).
 *
 *   type User = { id: number; name: string };
 *   type UserKey = keyof User;   // "id" | "name"
 *
 * Combined with indexed access `T[K]`, the value type follows the key:
 *   T["id"] is number, T["name"] is string.
 */

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type Employee = {
  name: string;
  id: number;
  email: string;
  phone?: string;
  address: Address;
  salary: number;
  department: "engineering" | "sales" | "hr";
};

type Company = {
  name: string;
  id: number;
  address: Address;
  employees: Employee[];
  value: number;
  isEnterprise: boolean;
  industry: string;
  status: "active" | "inactive" | "closed";
};

const acme: Company = {
  name: "Acme",
  id: 1,
  address: {
    street: "10 Market St",
    city: "London",
    state: "LDN",
    zip: "EC1A 1BB",
    country: "UK",
  },
  employees: [
    {
      name: "Ada",
      id: 10,
      email: "ada@acme.test",
      address: {
        street: "1 King Rd",
        city: "London",
        state: "LDN",
        zip: "SW1A 1AA",
        country: "UK",
      },
      salary: 120000,
      department: "engineering",
    },
  ],
  value: 50_000_000,
  isEnterprise: true,
  industry: "software",
  status: "active",
};

// ---------------------------------------------------------------------------
// Example 1 — keyof on a nested company object
// CompanyKey is the union of every top-level property name.
// ---------------------------------------------------------------------------

type CompanyKey = keyof Company;
// "name" | "id" | "address" | "employees" | "value" | "isEnterprise" | "industry" | "status"

const companyKeys: CompanyKey[] = [
  "name",
  "id",
  "address",
  "employees",
  "value",
  "isEnterprise",
  "industry",
  "status",
];

const companyName: Company["name"] = acme.name;
const companyStatus: Company["status"] = acme.status;

console.log("example 1 — company keys:", companyKeys);
console.log("example 1 — name / status:", companyName, companyStatus);

// ---------------------------------------------------------------------------
// Example 2 — keyof on a nested property (Address inside Company)
// keyof Company["address"] is the keys of the nested Address object, not of Company.
// ---------------------------------------------------------------------------

type AddressKey = keyof Company["address"];
// "street" | "city" | "state" | "zip" | "country"

type EmployeeKey = keyof Company["employees"][number];
// keys of one Employee inside the employees array

const addressKeys: AddressKey[] = ["street", "city", "state", "zip", "country"];
const city: Company["address"]["city"] = acme.address.city;

console.log("example 2 — address keys:", addressKeys);
console.log("example 2 — nested city:", city);

// ---------------------------------------------------------------------------
// Example 3 — generic getter: K extends keyof T
// The key argument can only be a real property. The return type is T[K],
// so getField(acme, "value") is number and getField(acme, "name") is string.
// ---------------------------------------------------------------------------
const user = { email: "test@test.com", p: "1111" }

function getField<T, K extends keyof T>(g: T, g1: K): T[K] {
  return g[g1];
}

function getFieldOld(g: any, g1: any): any {
    return g[g1];
  }
// T = user
// K = password
// T[K] = "123456"
// 




const isEnterprise = getField(acme, "isEnterprise");

const employeeCount = getField(acme, "employees").length;
const hqZip = getField(acme.address, "zip");

console.log("example 3 — industry / employees / zip:", industry, employeeCount, hqZip);

// ---------------------------------------------------------------------------
// Example 4 — Record<keyof T, …> maps every key to another type
// Useful for labels, validators, or flags keyed by the same property names.
// ---------------------------------------------------------------------------

type CompanyLabels = Record<keyof Company, string>;

const companyLabels: CompanyLabels = {
  name: "Legal name",
  id: "Company id",
  address: "Headquarters",
  employees: "Headcount list",
  value: "Valuation",
  isEnterprise: "Enterprise account",
  industry: "Industry",
  status: "Operating status",
};

type AddressFlags = Record<keyof Address, boolean>;

const requiredAddressFields: AddressFlags = {
  street: true,
  city: true,
  state: false,
  zip: true,
  country: true,
};

console.log("example 4 — label for status:", companyLabels.status);
console.log("example 4 — zip is required:", requiredAddressFields.zip);

// ---------------------------------------------------------------------------
// Example 5 — pick a subset of keys, then use keyof on that subset
// PublicEmployeeKey is only the keys we chose to expose.
// ---------------------------------------------------------------------------

type PublicEmployee = Pick<Employee, "id" | "name" | "email" | "department">;
type PublicEmployeeKey = keyof PublicEmployee;
// "id" | "name" | "email" | "department"  (salary / address / phone are gone)

function toPublicEmployee(employee: Employee): PublicEmployee {
  return {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    department: employee.department,
  };
}

const firstEmployee = acme.employees[0];
const publicAda =
  firstEmployee === undefined ? undefined : toPublicEmployee(firstEmployee);
const publicKeys: PublicEmployeeKey[] = ["id", "name", "email", "department"];

console.log("example 5 — public employee:", publicAda);
console.log("example 5 — public keys:", publicKeys);

export {};


type User = {id:number, name:string, email:string, password:string, phone:string, address:string}
type UserAllowedKeys = Pick<User, "phone" | "address" >;
function updateUserAllowedKey<U,T extends keyof UserAllowedKeys>(users: Array<U>, id:string, key:T, value:string){
// implement both in the same function 
}


type CompanyWihtoutId = Omit<Company, "id">;