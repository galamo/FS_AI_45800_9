# Node.js

TypeScript needs Node.js (includes `npm`).

1. Download the LTS installer from [https://nodejs.org](https://nodejs.org)
2. Run the installer and accept the defaults (Node.js + npm)
3. Restart the terminal / VS Code
4. Check the install:

```bash
node -v
npm -v
```

You should see version numbers (e.g. `v22.x` and `10.x`).

# npm

**npm** (Node Package Manager) ships with Node.js. It installs libraries, runs scripts from `package.json`, and keeps project dependencies in `node_modules`.

| Command         | What it does                                         |
| --------------- | ---------------------------------------------------- |
| `npm init`      | Creates a `package.json` for the folder              |
| `npm install`   | Installs packages listed in `package.json`           |
| `npm install x` | Adds package `x` (e.g. `typescript`) as a dependency |
| `npm run name`  | Runs the script named `name` in `package.json`       |

`package.json` is the project manifest: name, scripts (`compile`, `start`, …), and which packages the project needs. After `npm init` in Lab_2, you can install TypeScript with `npm install typescript --save-dev`.

# Lab_2

1. Create Folder Lab_2
2. Navigate into Lab_2 and run `npm init`
3. [npm](#npm) — Node Package Manager
4. Run inside Lab_2 `npm i axios`
5. Run inside Lab_2 `npm i typescript --save-dev`
6. Run inside Lab_2 `npm i typescript -g`
7. Run inside Lab_2 `tsc --init` ( Create tsconfig.json for setting up TS compiler options)
8. Create folder `src` inside Lab_2
9. Complete # Exercise 1
10. Edit `tsconfig.json` - src & dist should be configured
11. Create a script `tsc --watch` - "compile": "tsc --watch" inside `packages.json`

# Exercise 1 — JS to TypeScript (primitive types)

Starter file: `exercise_1/shop.js`

The file already has working JavaScript functions and logic. Your job is **not** to change the behavior. Copy it into a TypeScript file and add types.

## Goal

Create `exercise_1/shop.ts` from `shop.js` and type:

- parameters
- return values
- local / top-level variables

Use **primitive types** only:

| JS value         | TypeScript type |
| ---------------- | --------------- |
| `"Notebook"`     | `string`        |
| `19.9`, `3`      | `number`        |
| `true` / `false` | `boolean`       |

Do **not** introduce `interface`, `type` aliases, or object types in this exercise.

## Steps

1. Copy `exercise_1/shop.js` to `exercise_1/shop.ts`
2. Add a type to every function parameter
3. Add a return type to every function
4. Add types to the `const` values at the bottom (`productId`, `adult`, `subtotal`, …)
5. Compile with `tsc` (or `npm run compile` if you reuse `lab_1`) until there are no errors
6. Run the compiled JS and confirm the console output matches `node exercise_1/shop.js`

## Hint

```ts
function isAdult(age: number): boolean {
  return age >= 18;
}
```

Keep the same function names and the same logic. Types only.

# Exercise — JS to TypeScript (primitive types)

Start from a **JavaScript** file that already has functions and logic. Your target is a **TypeScript** file with explicit types — mostly primitives: `string`, `number`, `boolean`.

Starter file: [`exercise_primitives.js`](./exercise_primitives.js)

## Goal

1. Copy `exercise_primitives.js` to `exercise_primitives.ts` (same folder, or into `lab_1/src/`).
2. Keep the same logic — do not rewrite the behavior.
3. Add types to every function parameter, return value, and named variable.
4. Compile with `tsc` until there are no type errors.

## Types to use

| Primitive | Use it for                                |
| --------- | ----------------------------------------- |
| `number`  | ids, prices, quantities, percents         |
| `string`  | names, ids like `ticket_42`, receipt text |
| `boolean` | member flag, shipping flag                |

## Checklist

- [ ] Every function has typed parameters
- [ ] Every function has an explicit return type
- [ ] Locals such as `ticketId`, `subtotal`, `total`, `shipped`, `receipt` are typed
- [ ] `tsc` compiles with no errors
- [ ] Runtime output is unchanged (same `console.log` values)

Do **not** introduce `interface` / `type` aliases yet. This exercise is primitives only.

# Exercise 2

1. Create TS function that recieve 2 numbers a and b and return a+b, note a and b can have string or number type.

# Excercise 3


User Interface

Create an interface called User with the following properties:

id — number
name — string
email — string
isActive — boolean
age — optional number

Then create a user object that matches the interface.

Starter Code
interface User {
// Complete the interface
}

const user: User = {
// Complete the object
};

# Excercise 4

Product Interface

Create an interface called Product.

The product should contain:

id — number
name — string
price — number
category — string
inStock — boolean
description — optional string

Create an array called products containing at least 3 products.

Then use filter() to return only the products that are currently in stock.

Starter Code
interface Product {
// Complete the interface
}

const products: Product[] = [
// Add 3 products
];

const availableProducts = products.filter(
// Complete the filter
);

console.log(availableProducts);

# Exercise 5 — Two type parameters (`zip` / `unzip` / `swap`)

One generic is not always enough. Use **two** type parameters when the inputs (or the two halves of a pair) have different types.

Do **not** use `extends` (no constraints). Infer `T` and `U` from the arguments.

## Goal

1. Write `zip(left, right)`  
   - Takes `T[]` and `U[]`  
   - Returns an array of pairs `[T, U]`  
   - Stop at the shorter array (ignore leftover items)
2. Write `unzip(pairs)`  
   - Takes `[T, U][]`  
   - Returns `[T[], U[]]` (two arrays)
3. Write `swap(pair)`  
   - Takes `[T, U]`  
   - Returns `[U, T]`

Starter Code
```ts
function zip(/* T[], U[] */): /* [T, U][] */ {
  // implement
}

function unzip(/* [T, U][] */): /* [T[], U[]] */ {
  // implement
}

function swap(/* [T, U] */): /* [U, T] */ {
  // implement
}

const pairs = zip(["Ada", "Grace"], [36, 85]);
const back = unzip(pairs);
const flipped = swap(["pen", 10]);

const names: string[] = back[0];
const ages: number[] = back[1];
const label: number = flipped[0];
const count: string = flipped[1];
```

## Checklist

- [ ] `zip(["Ada", "Grace"], [36, 85])` is `[string, number][]` (hover to check)
- [ ] `unzip(pairs)` is `[string[], number[]]`
- [ ] After `swap(["pen", 10])`, index `0` is `number` and index `1` is `string`
- [ ] `zip([1, 2, 3], ["a"])` returns **one** pair (the extra numbers are dropped)
- [ ] No `extends`, no `any`

# Exercise 6 — Transforming types (`mapItems` / `merge` / `compose`)

Generics are useful when the **output type is different** from the input type — or when two objects are combined into one type.

Do **not** use `extends`.

## Goal

1. Write `mapItems(items, fn)`  
   - Input: `T[]` and a function `(item: T) => U`  
   - Output: `U[]`  
   Example: mapping users to their names yields `string[]`, not `User[]`.
2. Write `merge(a, b)`  
   - Input: object `T` and object `U`  
   - Output: `T & U` (one object with both sets of fields)  
   - Later properties on `b` overwrite the same keys on `a` at runtime
3. Write `compose(f, g)`  
   - `f` is `(input: A) => B`  
   - `g` is `(input: B) => C`  
   - Return a new function `(input: A) => C` that runs `f` then `g`

Starter Code
```ts
type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];

function mapItems(/* items: T[], fn: (item: T) => U */): /* U[] */ {
  // implement
}

function merge(/* a: T, b: U */): /* T & U */ {
  // implement
}

function compose(/* f: (input: A) => B, g: (input: B) => C */): /* (input: A) => C */ {
  // implement
}

const names = mapItems(users, (user) => user.name);
const ids = mapItems(users, (user) => user.id);

const profile = merge({ id: 1, name: "Ada" }, { city: "London", active: true });
const city: string = profile.city;
const active: boolean = profile.active;
const id: number = profile.id;

const toLength = compose(
  (user: User) => user.name,
  (name: string) => name.length,
);
const length: number = toLength(users[0]);
```

## Checklist

- [ ] `names` is `string[]`, `ids` is `number[]` (not `User[]`)
- [ ] `profile` has `id`, `name`, `city`, and `active` — all correctly typed
- [ ] `toLength` accepts a `User` and returns a `number`
- [ ] `mapItems` / `merge` / `compose` use more than one type parameter where needed
- [ ] No `extends`, no `any`

# Exercise 7 — Two type parameters + a typed `Result`

A function can succeed with a value of type `T` or fail with an error of type `E`. Model both in **one** type.

Do **not** use `extends`.

## Goal

1. Define this discriminated union (you may copy it):

   ```ts
   type Result<T, E> =
     | { ok: true; value: T }
     | { ok: false; error: E };
   ```

2. Write `ok(value)` and `err(error)` helpers that build `Result<T, E>` and **infer** `T` / `E` from the argument.
3. Write `mapResult(result, fn)`  
   - If `result` is ok, return `ok(fn(result.value))` — `fn` is `(value: T) => U`  
   - If `result` is not ok, return the same error, typed as `Result<U, E>`  
   The error type `E` must stay unchanged.
4. Write `parsePositiveInt(raw: string): Result<number, string>`  
   - Success: the string is an integer `> 0`  
   - Failure: a string error message
5. Write `getFromRecord(record, key)`  
   - `record` is `Record<string, V>` (an object used as a dictionary)  
   - `key` is `string`  
   - Return `Result<V, string>`  
   - Success when the key exists, failure (string message) when it does not

Starter Code
```ts
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok(/* value: T */): /* Result */ {
  // implement
}

function err(/* error: E */): /* Result */ {
  // implement
}

function mapResult(/* result: Result<T, E>, fn: (value: T) => U */): /* Result<U, E> */ {
  // implement
}

function parsePositiveInt(raw: string): Result<number, string> {
  // implement
}

function getFromRecord(/* record: Record<string, V>, key: string */): /* Result<V, string> */ {
  // implement
}

const parsed = parsePositiveInt("42");
const doubled = mapResult(parsed, (n) => n * 2);

const stock: Record<string, number> = {
  pen: 10,
  notebook: 3,
};
const pens = getFromRecord(stock, "pen");
const missing = getFromRecord(stock, "stapler");

if (doubled.ok) {
  const amount: number = doubled.value;
  console.log(amount);
} else {
  const message: string = doubled.error;
  console.log(message);
}
```

## Checklist

- [ ] `ok` / `err` / `mapResult` / `getFromRecord` are generic (two parameters where needed)
- [ ] `mapResult` turns `Result<number, string>` + `(n) => n * 2` into `Result<number, string>`
- [ ] `mapResult` on a failure does not call `fn` and keeps the error type
- [ ] `getFromRecord(stock, "pen")` — on success, `value` is `number`
- [ ] Inside `if (doubled.ok)`, `.value` is `number`; inside `else`, `.error` is `string`
- [ ] No `extends`, no `any`
