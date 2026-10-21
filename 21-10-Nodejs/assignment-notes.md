# Product Explorer notes

## Data source

Checked `https://fakestoreapi.com/products` on October 21, 2026, from the lab 1 server at startup.

The response was an array of 20 product objects. A sample record had these fields: `category`, `description`, `id`, `image`, `price`, `rating`, `title`.

Those records are real products, not the placeholder `products: ["sample-value"]` mentioned in the assignment. They still do not match the assignment model:

| Assignment field | External field |
| --- | --- |
| `id` | `id` |
| `name` | `title` |
| `description` | `description` |
| `category` | `category` |
| `price` | `price` |
| `currency` | missing |
| `brand` | missing |
| `inStock` | missing |

Brand, availability, and currency would have to be invented, so the server does not map or serve the external records. It loads and validates `lab_1/src/products/products.json` once at startup (14 fictional products, 3 categories, 3 brands, USD, in-stock and out-of-stock items). An invalid fixture stops the server. Filter requests do not call the external URL again.

## Verification

| Check | Expected | Actual |
| --- | --- | --- |
| No filters | `200`, 14 products, `total` 14 | `200`, 14 products, `total` 14 |
| Search `WiReLeSs` | Case-insensitive match on name or description | `200`, `neb-earbuds` and `har-radio` (description only) |
| Category `Home` | Only that category | `200`, 5 Home products |
| Brand `Harbor & Co` | Only that brand | `200`, 5 products |
| Price `minPrice=20&maxPrice=20` | Inclusive boundary | `200`, Pocket Radio only |
| `inStock=true` | Only available products | `200`, 10 products |
| Combined search, category, brand, price, and stock | Products matching every filter | `200`, Wireless Trail Earbuds only |
| `minPrice=0&maxPrice=0` | `0` is a valid inclusive boundary | `200`, Sample Swatch Card at `$0.00` |
| `inStock=false` | Only unavailable products | `200`, 4 products |
| `minPrice=-1`, `inStock=yes`, `minPrice=80&maxPrice=10` | `400` with an error object | `400`, `INVALID_QUERY` |
| Search with no matches | `200`, empty list, `total` 0, no-results text | `200`, `total` 0, “No products match these filters.” The page does not show an error alert |
| Reset | Clears the controls and reloads every product | Search field cleared and the list returned to 14 products |
| Filter options after a search | Full category and brand lists | Category options stayed All, Accessories, Audio, Home |
| `GET /api/products/filters` | Sorted unique values from the full catalog | Categories `Accessories`, `Audio`, `Home`; brands `Harbor & Co`, `Lumen`, `Northbeam` |
| Direct detail URL `/products/neb-earbuds` | All product fields | Name, description, category, brand, `$49.00`, USD, In stock, and id rendered |
| Unknown id | `404` and a not-found message | `404`, `PRODUCT_NOT_FOUND`, page shows “Product not found” |
| Unmatched client route | Not-found page | “Page not found” |
| API stopped | Visible error, not an empty catalog | Alert: “The product service is unavailable. Start the lab 1 API and try again.” |

Automated coverage for the filter combinations and invalid query values is `npm test` in `lab_1`.
