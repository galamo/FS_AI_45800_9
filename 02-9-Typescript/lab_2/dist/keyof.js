/**
 * `keyof` turns an object type into a union of its property names (as strings).
 *
 *   type User = { id: number; name: string };
 *   type UserKey = keyof User;   // "id" | "name"
 *
 * Combined with indexed access `T[K]`, the value type follows the key:
 *   T["id"] is number, T["name"] is string.
 */
const acme = {
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
// "name" | "id" | "address" | "employees" | "value" | "isEnterprise" | "industry" | "status"
const companyKeys = [
    "name",
    "id",
    "address",
    "employees",
    "value",
    "isEnterprise",
    "industry",
    "status",
];
const companyName = acme.name;
const companyStatus = acme.status;
console.log("example 1 — company keys:", companyKeys);
console.log("example 1 — name / status:", companyName, companyStatus);
// keys of one Employee inside the employees array
const addressKeys = ["street", "city", "state", "zip", "country"];
const city = acme.address.city;
console.log("example 2 — address keys:", addressKeys);
console.log("example 2 — nested city:", city);
// ---------------------------------------------------------------------------
// Example 3 — generic getter: K extends keyof T
// The key argument can only be a real property. The return type is T[K],
// so getField(acme, "value") is number and getField(acme, "name") is string.
// ---------------------------------------------------------------------------
const user = { email: "test@test.com", p: "1111" };
function getField(g, g1) {
    return g[g1];
}
function getFieldOld(g, g1) {
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
const companyLabels = {
    name: "Legal name",
    id: "Company id",
    address: "Headquarters",
    employees: "Headcount list",
    value: "Valuation",
    isEnterprise: "Enterprise account",
    industry: "Industry",
    status: "Operating status",
};
const requiredAddressFields = {
    street: true,
    city: true,
    state: false,
    zip: true,
    country: true,
};
console.log("example 4 — label for status:", companyLabels.status);
console.log("example 4 — zip is required:", requiredAddressFields.zip);
// "id" | "name" | "email" | "department"  (salary / address / phone are gone)
function toPublicEmployee(employee) {
    return {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        department: employee.department,
    };
}
const firstEmployee = acme.employees[0];
const publicAda = firstEmployee === undefined ? undefined : toPublicEmployee(firstEmployee);
const publicKeys = ["id", "name", "email", "department"];
console.log("example 5 — public employee:", publicAda);
console.log("example 5 — public keys:", publicKeys);
export {};
function updateUserAllowedKey(users, id, key, value) {
    // implement both in the same function 
}
