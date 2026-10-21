# Class Assignment: Product Explorer with Node.js and React

## Goal

Build a product browsing application with a Node.js API and a React client. Practice API routes, client-side routing, query parameters, filtering, validation, and asynchronous UI states.

Use Node.js with Express for the server and React with React Router for the client. JavaScript or TypeScript is acceptable.

This assignment covers listing, filtering, and viewing products. Creating, editing, deleting, authentication, and a database are outside the required scope.

## 1. Data source

Reference URL:

https://apis.io/api/v1/examples/products-api-product-list-response-example

Readable example:

https://apis.io/examples/best-buy/products-api-product-list-response-example/

**Source limitation:** When checked on October 21, 2026, the readable example contained `products: ["sample-value"]`, rather than product objects. The API URL also returned catalog metadata during verification. Do not treat catalog entries as products or assume the source supports product filters.

Start by inspecting the response from the reference URL on the server. Identify whether it contains usable product objects. Save a brief observation in your submission. If it still contains placeholders or unrelated metadata, use the following required fallback approach so the exercise can be completed:

- Create a local JSON fixture inside the server project with at least 12 fictional products.
- Use the assignment-defined product model below. These fields are defined for this exercise; they are not verified fields from the external example.
- Include at least 3 categories and 3 brands, different prices, and both available and unavailable products.
- Keep identifiers unique and prices non-negative. Use one currency: USD.
- Clearly document whether your server uses the external data or the fallback fixture. If usable external data becomes available, document its mapping to the same model.

| Field | Type | Meaning |
| --- | --- | --- |
| id | string | Unique product identifier |
| name | string | Product name |
| description | string | Short description |
| category | string | Category name |
| brand | string | Brand name |
| price | number | Price in USD |
| inStock | boolean | Availability |

The React client must request all product data through your Node.js API. Do not import the fixture into React or fetch the external source directly from the browser. Load and validate the dataset on the server before serving product requests; avoid fetching the external source for every filter change. Never silently convert an invalid upstream response into a successful empty list.

## 2. Node.js API routes

Use an Express router mounted at `/api/products`.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/products` | Return products matching the query parameters |
| GET | `/api/products/filters` | Return distinct categories and brands from the complete dataset |
| GET | `/api/products/:id` | Return one product by its identifier |

Register static routes so that `filters` is not interpreted as a product identifier.

### List filters

Implement filtering on the server. The React client sends filter values as query parameters.

| Parameter | Rule |
| --- | --- |
| `search` | Trim whitespace; case-insensitive substring match on name or description |
| `category` | Exact match on category |
| `brand` | Exact match on brand |
| `minPrice` | Inclusive minimum price |
| `maxPrice` | Inclusive maximum price |
| `inStock` | Accept only `true` or `false` when provided |

Combine active filters with AND. Within `search`, matching either name or description is sufficient. An omitted filter applies no restriction. Treat blank text filters and blank price inputs as omitted. The value `0` is a valid price boundary, and `false` is a valid availability filter.

Example request:

```http
GET /api/products?search=wireless&category=Accessories&minPrice=20&maxPrice=150&inStock=true
```

Response contracts:

- List: `{ "products": [...], "total": 5 }`, where `total` is the number of matching products.
- Filter options: `{ "categories": [...], "brands": [...] }`, with unique, alphabetically sorted values from the full dataset.
- Detail: `{ "product": {...} }`.
- Error: `{ "error": { "code": "...", "message": "..." } }`.

Return `200` with an empty array and `total: 0` when nothing matches. Return `400` for invalid numbers, negative price limits, `minPrice > maxPrice`, or an invalid availability value. Return `404` for an unknown product. Handle unexpected failures with an appropriate error response without exposing stack traces. Pagination is not required; do not copy the external example's totals into your own responses.

Separate route handling from data loading and filtering logic. Configure the server port and client API base URL through environment variables. Support local communication through a development proxy or CORS configuration.

## 3. React routes and screens

Add these routes to the client, preserving any existing application routes:

| Route | Screen |
| --- | --- |
| `/products` | Product list and filter controls |
| `/products/:id` | Product details |
| Unmatched route | Not-found page |

Add a Products navigation link. Direct navigation to a detail URL must work without first visiting the list.

### Product list

- Display name, category, brand, price, and availability in a table or cards.
- Show the number of matching products.
- Provide a search input, category dropdown, brand dropdown, minimum and maximum price inputs, and availability dropdown with All / In stock / Out of stock.
- Load category and brand options from `/api/products/filters`; do not hard-code them or derive them from an already filtered list.
- Provide **Apply filters** and **Reset filters** buttons. Applying requests matching products from the API. Resetting clears all filters and reloads all products.
- Allow opening a product's detail route.
- Show separate loading, request-error, and no-results states. An error must not look like an empty result.
- Label controls clearly and format prices consistently.

### Product details

Request the product from `/api/products/:id` and display all product fields. Include navigation back to the product list. Handle loading, an unknown identifier, and a request failure.

Use reusable components where helpful. Keep API request code separate from presentation components. Do not implement filtering only in the browser.

## 4. Verification checklist

Record the request or action, expected result, and actual result for each scenario:

- [ ] No filters returns the complete dataset and correct total.
- [ ] Search matches regardless of case, including a match in the description.
- [ ] Category, brand, price, and availability filters work individually.
- [ ] Multiple filters return only products satisfying every active filter.
- [ ] Price boundaries are inclusive; `minPrice=0` works.
- [ ] `inStock=false` returns unavailable products.
- [ ] Invalid input returns `400`, including an inverted price range.
- [ ] No matches returns `200` and displays the no-results state.
- [ ] Reset restores all products and clears the controls.
- [ ] Filter dropdown options remain complete after applying filters.
- [ ] A valid detail URL works when opened directly; an unknown ID returns `404`.
- [ ] Stopping the server produces a visible client error state.

Manual verification is required. Automated tests for filter combinations and input validation are encouraged.

## 5. Independent work — no AI assistance

Complete the implementation and submission explanations yourself. Do not use generative AI to produce, complete, rewrite, debug, or explain your assignment code. This includes chat assistants, AI code completion, and coding agents. Disable AI features in your editor while working on this assignment.

Allowed resources: course materials, official documentation, ordinary non-AI search results, and questions to the instructor. Standard syntax completion and framework scaffolding are allowed. Do not copy a complete implementation from another student or an online project. Cite any small adapted snippets and explain them in your own words.

Evidence of your work:

1. Maintain meaningful Git commits throughout development, covering the API, filtering, client routes, and integration. Do not fabricate or backdate history.
2. Keep a short development log describing decisions, bugs encountered, and how you investigated them.
3. Attend a 5–10 minute individual demonstration. Be prepared to trace a filter from the React input through the HTTP request to the server response, explain your code, and make a small instructor-selected change without AI assistance.
4. Include this declaration only if accurate: **“I completed this assignment without generative AI assistance. I have listed the external resources and adapted snippets I used.”**

Assessment considers the submitted work, development evidence, and demonstrated understanding. An automated AI-detector score alone is not evidence of misconduct. Suspected unauthorized assistance will be handled under the course's academic integrity rules.

