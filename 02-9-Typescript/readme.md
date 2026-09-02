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
