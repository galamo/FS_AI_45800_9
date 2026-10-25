import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { formatAvailability, formatPrice } from './format-price'
import type { Product } from './product-type'

type ProductTableProps = {
  products: Product[]
}

export default function ProductTable(props: ProductTableProps) {
  const { products } = props

  return (
    <div className="products-table-wrap">
      <table className="products-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Brand</th>
            <th scope="col">Price</th>
            <th scope="col">Availability</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link component={RouterLink} to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{formatAvailability(product.inStock)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
