interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  age?: number;
}

const user: User = {
  id: 1,
  name: "Gal Amouyal",
  email: "gal@example.com",
  isActive: true,
  age: 30,
};

console.log(user);
