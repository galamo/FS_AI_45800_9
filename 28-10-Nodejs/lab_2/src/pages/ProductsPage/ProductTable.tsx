import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { formatAvailability, formatPrice } from './format-price'
import type { Product } from './product-type'

type ProductTableProps = {
  products: Product[]
  deletingId: string | null
  onDelete: (id: string) => void
}

export default function ProductTable(props: ProductTableProps) {
  const { products, deletingId, onDelete } = props

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
            <th scope="col">Actions</th>
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
              <td>
                {/* Only Admin can perform this? Disable/Disapear from ui  */}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  disabled={deletingId === product.id}
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
