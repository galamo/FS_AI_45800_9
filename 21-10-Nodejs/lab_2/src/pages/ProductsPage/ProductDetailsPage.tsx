import { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Spinner from '../../components/Spinner'
import { formatAvailability, formatPrice } from './format-price'
import { getProduct, ProductsRequestError } from './products-api'
import type { Product } from './product-type'
import '../page.css'
import './products-page.css'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMissing, setIsMissing] = useState(false)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setIsMissing(true)
      setError('Product not found')
      return
    }

    let cancelled = false

    async function loadProduct(productId: string) {
      setIsLoading(true)
      setError('')
      setIsMissing(false)
      setProduct(null)

      try {
        const result = await getProduct(productId)
        if (!cancelled) {
          setProduct(result)
        }
      } catch (err) {
        if (cancelled) {
          return
        }

        if (err instanceof ProductsRequestError && err.status === 404) {
          setIsMissing(true)
          setError(err.message)
          return
        }

        const message = err instanceof ProductsRequestError ? err.message : 'The product request failed.'
        setError(message)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadProduct(id)

    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <section className="page products-page" aria-busy={isLoading}>
      <Typography variant="h4" component="h2">
        Product details
      </Typography>
      <Button component={RouterLink} to="/products" variant="outlined">
        Back to products
      </Button>
      {isLoading && <Spinner message="Loading product…" />}
      {!isLoading && error && (
        <Alert severity={isMissing ? 'warning' : 'error'} role="alert">
          {error}
        </Alert>
      )}
      {!isLoading && product && (
        <dl className="product-details">
          <dt>Name</dt>
          <dd>{product.name}</dd>
          <dt>Description</dt>
          <dd>{product.description}</dd>
          <dt>Category</dt>
          <dd>{product.category}</dd>
          <dt>Brand</dt>
          <dd>{product.brand}</dd>
          <dt>Price</dt>
          <dd><span style={{textDecoration: 'line-through'}}>{formatPrice(product.price)}</span> <span>__ Now on sale for {formatPrice(product.price * 0.8)}</span> </dd> 
          <dt>Currency</dt>
          <dd>{product.currency}</dd>
          <dt>Availability</dt>
          <dd>{formatAvailability(product.inStock)}</dd>
          <dt>Identifier</dt>
          <dd>{product.id}</dd>
        </dl>
      )}
    </section>
  )
}
