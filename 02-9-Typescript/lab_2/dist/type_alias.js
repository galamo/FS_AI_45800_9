import country from '../country.json';
const u = {
    password: '1234567890',
    userName: 'john.doe',
    name: 'John Doe',
    id: 1,
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: { street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345', country: 'USA' },
};
function getCompanies(companyId) {
    return {};
}
function getEmployee(employeeId) {
    return {
        name: 'John Doe',
        id: 1,
        email: 'john.doe@example.com',
    };
}
function getEmployeeCount(company) {
    return company.employees.length;
}
const ids = [];
function addIdIntoIds(currentId) {
    ids.push(currentId);
}
addIdIntoIds(111);
addIdIntoIds(333);
addIdIntoIds("userId123");
