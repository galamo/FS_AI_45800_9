# React

React is a JavaScript library for building user interfaces. You describe the UI as components (small reusable pieces), and React updates the screen when data changes.

## What React is good at

- **Components** — split the UI into reusable pieces (button, form, page) instead of one long HTML file
- **Declarative UI** — you describe *what* the screen should look like for the current data; React handles the DOM updates
- **State** — each component can keep data that changes over time (`useState`); when state changes, that part of the UI re-renders
- **Props** — pass data and callbacks from a parent component down to children
- **JSX / TSX** — write markup that looks like HTML inside JavaScript/TypeScript (`App.tsx`)
- **Hooks** — built-in functions (`useState`, `useEffect`, …) for state, side effects, and sharing logic
- **Virtual DOM + reconciliation** — React diffs the previous UI tree with the next one and updates only what changed
- **Ecosystem** — routing, forms, HTTP clients, testing, and UI libraries all plug into the same component model
- **Same ideas on web and native** — React for the browser, React Native for mobile (different renderers, similar component model)

React is the **view layer**. It does not include a router, a global store, or a backend. You add those as you need them.

# Starting with React + TypeScript

Learn React with TypeScript from day one. The extra types catch mistakes in the editor (wrong props, missing fields, bad event handlers) before you run the app.

| Without types (JS) | With TypeScript |
| ------------------ | --------------- |
| `function Button(props)` | `function Button({ label }: { label: string })` |
| Props can be anything | The compiler checks names and types of props |
| Bugs show up at runtime | Many bugs show up in the editor / `tsc` |

You already used TypeScript in the previous labs (`interface`, `type`, generics). In React you apply the same ideas to:

- **Props** — the object a component receives
- **State** — `useState<number>(0)`, `useState<User | null>(null)`
- **Events** — `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`
- **JSX** — files use the `.tsx` extension (TypeScript + JSX)

Vite’s `react-ts` template gives you React, TypeScript, and a working `tsconfig` so you can start writing components immediately.

# Vite

**Vite** (French for “quick”, pronounced *veet*) is the build tool we use to create and run a React app.

- Dev server with **Hot Module Replacement (HMR)** — save a file, the browser updates without a full reload
- Fast startup — it serves native ES modules instead of bundling everything up front
- Production build — `vite build` outputs optimized static files (`dist/`)

Vite needs **Node.js**. Check that it is installed:

```bash
node -v
npm -v
```

Vite requires Node.js **20.19+** or **22.12+**. Use the LTS installer from [https://nodejs.org](https://nodejs.org) if needed.

## Create a new React + TypeScript app

From the folder where you want the project (for this course, inside `06-09-React`):

**Option A — interactive (choose React + TypeScript in the prompts)**

```bash
npm create vite@latest
```

**Option B — skip the prompts (recommended)**

```bash
npm create vite@latest my-app -- --template react-ts
```

`npm 7+` needs the extra `--` so the template flag is passed to Vite, not to npm.

Other package managers:

```bash
yarn create vite my-app --template react-ts
pnpm create vite my-app --template react-ts
bun create vite my-app --template react-ts
```

To scaffold **in the current folder** (folder must be empty or almost empty), use `.` as the name:

```bash
npm create vite@latest . -- --template react-ts
```

Useful templates: `react` (JavaScript), `react-ts` (TypeScript), `react-compiler-ts` (React Compiler + TypeScript).

## Install dependencies and run

`create vite` only copies the template. You still install packages and start the server:

```bash
cd my-app
npm install
npm run dev
```

The dev server usually opens at **http://localhost:5173**.

| Script | Command | What it does |
| ------ | ------- | ------------ |
| `npm run dev` | `vite` | Start the development server (HMR) |
| `npm run build` | `tsc -b && vite build` | Type-check, then build production files into `dist/` |
| `npm run preview` | `vite preview` | Serve the production build locally |
| `npm run lint` | `eslint .` | Lint the project (if the template included ESLint) |

Extra Vite CLI flags:

```bash
npm run dev -- --open
npm run dev -- --port 3000
npx vite --help
```

## Install Vite yourself (existing project)

If you are not using `create vite` and want Vite in a folder you already have:

```bash
npm install -D vite
npm install react react-dom
npm install -D typescript @types/react @types/react-dom @vitejs/plugin-react
```

`-D` / `--save-dev` means a **dev dependency** (build tools). `react` and `react-dom` are regular dependencies (the app needs them at runtime).

Then add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

Run Vite without a script:

```bash
npx vite
```

## What the `react-ts` template gives you

```
my-app/
├── public/              static files copied as-is (favicon, …)
├── src/
│   ├── assets/
│   ├── App.tsx          root component
│   ├── main.tsx         React entry (mounts <App />)
│   └── index.css
├── index.html           Vite entry (not inside public/)
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

Start in `src/App.tsx`. `main.tsx` mounts the app into the `#root` element in `index.html`.

## Quick checklist

1. Node.js LTS installed (`node -v`)
2. `npm create vite@latest my-app -- --template react-ts`
3. `cd my-app` → `npm install` → `npm run dev`
4. Edit `src/App.tsx`, save, watch the browser update
