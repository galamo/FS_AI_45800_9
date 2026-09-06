/**
 * Exercise 6 — Transforming types (`mapItems` / `merge` / `compose`)
 *
 * Generics shine when the output type is not the same as the input type:
 *   mapItems(users, user => user.name)  →  string[]  (not User[])
 *   merge({ id: 1 }, { city: "London" })  →  { id: number } & { city: string }
 *   compose(f, g) turns A → B and B → C into a single A → C function.
 *
 * No `extends`, no `any`. T / U / A / B / C are inferred from usage.
 */

type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];

/**
 * Map each item of type T to a new value of type U.
 * The callback decides U: returning `user.name` makes U = string.
 */
function mapItems<T, U>(items: T[], fn: (item: T) => U): U[] {
  const mapped: U[] = [];

  for (const item of items) {
    mapped.push(fn(item));
  }

  return mapped;
}

/**
 * Combine two objects into one. The result type is the intersection T & U,
 * so every field from both arguments is visible to TypeScript.
 * At runtime, fields on `b` overwrite the same keys on `a`.
 */
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b};
}
const merged = merge({p:1}, {q:"2"})
/**
 * Run f, then g. compose(f, g)(x) is the same as g(f(x)).
 * Three type parameters because the types can all be different:
 *   User → string → number
 */
function compose<A, B, C>(
  f: (input: A) => B,
  g: (input: B) => C,
): (input: A) => C {
  return (input: A): C => g(f(input));
}

const names = mapItems(users, (user) => user.name);
const ids = mapItems(users, (user) => user.id);

const productsArray = [{name: "Product 1", price: 100}, {name: "Product 2", price: 200}, {name: "Product 3", price: 300}]
const prices = mapItems(productsArray, (product) => product.price * 1.18);


const profile = merge({ id: 1, name: "Ada" }, { city: "London", active: true });
const city: string = profile.city;
const active: boolean = profile.active;
const id: number = profile.id;

const toLength = compose(
  (user: User) => user.name,
  (name: string) => name.length,
);

const firstUser = users[0];
const nameLength: number = firstUser === undefined ? 0 : toLength(firstUser);

console.log("names:", names);
console.log("ids:", ids);
console.log("profile:", profile, city, active, id);
console.log("name length of first user:", nameLength);

// Makes this file a module so `User` / `names` do not collide with other src files.
export {};
