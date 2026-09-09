# Lab 2 — Product component

In Lab 1 you created a React app and a small component with props (`Header`). In this lab you build a **Product** component and show a real product from a website you like.

## Goal

1. Create a new React + TypeScript project.
2. Create a `Product` component that represents one product.
3. Pick a product from any website (store, brand, marketplace) and display it: **name**, **category**, **price**, and **image**.

## Task 1 — Create a React project

Create the app **inside this folder** (`09-09-React/lab_2`). You can scaffold into a subfolder (recommended) or into the current folder if it is empty enough.

**Recommended — skip the prompts:**

```bash
npm create vite@latest product-card -- --template react-ts
cd product-card
npm install
npm run dev
```

The dev server is usually at **http://localhost:5173**.

Need a reminder of Vite / Node versions? See [`06-09-React/readme.md`](../../06-09-React/readme.md).

## Task 2 — Create a Product component

Create a component that represents **one product**. Keep markup, styles, and logic in separate files (same rule as the rest of the course).

Suggested files:

```
src/components/product/index.tsx
src/components/product/product.css
```

Give the component typed props. At minimum:

| Prop       | Type     | What it is                    |
| ---------- | -------- | ----------------------------- |
| `name`     | `string` | Product title                 |
| `category` | `string` | Department / type             |
| `price`    | `number` | Price in the store’s currency |
| `image`    | `string` | Image URL or imported asset   |

You may add extra fields if they help (description, brand, currency, in stock).

Starter shape:

```tsx
type ProductProps = {
  name: string;
  category: string;
  price: number;
  image: string;
};

function Product(props: ProductProps) {
  const { name, category, price, image } = props;

  return (
    <article className="product">
      {/* image, name, category, price */}
    </article>
  );
}

export default Product;
```

Put visual styles in `product.css`. Do not use inline `style="..."` attributes or `<style>` blocks.

## Task 3 — Present a real product

1. Open any shopping site you prefer (IKEA, Amazon, a local store, a brand shop, …).
2. Choose **one** product.
3. Copy its name, category, and price.
4. Use its image: either download it into `src/assets/` and import it, or use the public image URL.
5. Render the `Product` component from `App.tsx` with that data.

Example of using the component (replace with **your** product):

```tsx
import Product from "./components/product";

function App() {
  return (
    <Product
      name="POÄNG"
      category="Armchairs"
      price={129}
      image="/poang.jpg"
    />
  );
}
```

The page should look like a product card: photo, name, category, and a readable price (for example `$129` or `129 ₪`).

## Checklist

- [ ] A new Vite React + TypeScript app runs with `npm run dev`
- [ ] There is a `Product` component in its own file (not everything dumped in `App.tsx`)
- [ ] Props are typed (`name`, `category`, `price`, `image`)
- [ ] Styles live in a `.css` file linked from the component (no inline styles)
- [ ] The data comes from a **real** product you picked (not made-up placeholder names)
- [ ] The card shows the image, name, category, and price in the browser

## Hints

- Import a local image the same way Lab 1 imported `hero.png`: `import productImg from "../../assets/my-product.jpg"`.
- Format the price for display, for example `` `$${price}` `` or `` `${price} ₪` ``.
- `App.tsx` should stay thin: data + `<Product … />`. Layout of the card belongs in the Product component.
- Optional stretch: render **two or three** products by using the same component more than once with different props.



# Task 3
    
    Split the following HTML part into a component with the relevant props 

        <div className="users-page__toast-wrap">
          <div className="users-page__toast" role="alert">
            <span className="users-page__toast-icon" aria-hidden="true">
              !
            </span>
            <div className="users-page__toast-body">
              <p className="users-page__toast-title">Could not load users</p>
              <p className="users-page__toast-message">{error}</p>
            </div>
            <button
              type="button"
              className="users-page__toast-close"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        </div>
