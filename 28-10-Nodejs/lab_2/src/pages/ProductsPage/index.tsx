import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Spinner from '../../components/Spinner'
import ProductFilters from './ProductFilters'
import ProductTable from './ProductTable'
import { deleteProduct, getProductFilters, getProducts, ProductsRequestError } from './products-api'
import { emptyProductDraft, type Product, type ProductDraft, type ProductQuery } from './product-type'
import '../page.css'
import './products-page.css'

function toQuery(draft: ProductDraft): ProductQuery {
  const query: ProductQuery = {}
  const search = draft.search.trim()
  const minPrice = draft.minPrice.trim()
  const maxPrice = draft.maxPrice.trim()

  if (search) {
    query.search = search
  }

  if (draft.category) {
    query.category = draft.category
  }

  if (draft.brand) {
    query.brand = draft.brand
  }

  if (minPrice) {
    query.minPrice = minPrice
  }

  if (maxPrice) {
    query.maxPrice = maxPrice
  }

  if (draft.inStock) {
    query.inStock = draft.inStock
  }

  return query
}

export default function ProductsPage() {
  const [draft, setDraft] = useState<ProductDraft>(emptyProductDraft)
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  const loadProducts = async (nextDraft: ProductDraft) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await getProducts(toQuery(nextDraft))
      setProducts(result.products)
      setTotal(result.total)
      setHasLoaded(true)
    } catch (err) {
      const message = err instanceof ProductsRequestError ? err.message : 'The product request failed.'
      setError(message)
      setProducts([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }

  async function loadInitial(cancelled: boolean) {
    try {
      const [filterOptions, result] = await Promise.all([getProductFilters(), getProducts({})])
      if (cancelled) {
        return
      }

      setCategories(filterOptions.categories)
      setBrands(filterOptions.brands)
      setProducts(result.products)
      setTotal(result.total)
      setHasLoaded(true)
    } catch (err) {
      if (cancelled) {
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

  useEffect(() => {
    let cancelled = false
    void loadInitial(cancelled)
    return () => {
      cancelled = true
    }
  }, [])

  const handleApply = () => {
    void loadProducts(draft)
  }

  const handleReset = () => {
    setDraft(emptyProductDraft)
    void loadProducts(emptyProductDraft)
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    setDeleteError('')
    setDeleteMessage('')

    try {
      const result = await deleteProduct(id)
      // setProducts((current) => current.filter((product) => product.id !== id))
      // setTotal((current) => Math.max(0, current - 1))
      await loadInitial(false)
      setDeleteMessage(result.message)
    } catch (err) {
      const message = err instanceof ProductsRequestError ? err.message : 'The product request failed.'
      setDeleteError(message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="page products-page" aria-busy={isLoading}>
      <Typography variant="h4" component="h2">
        Products
      </Typography>
      <p className="page__lead">
        Browse the catalog from the lab 1 API. Filters run on the server when you apply them.
      </p>
      <ProductFilters
        draft={draft}
        categories={categories}
        brands={brands}
        disabled={isLoading}
        onChange={setDraft}
        onApply={handleApply}
        onReset={handleReset}
      />
      {isLoading && <Spinner message="Loading products…" />}
      {!isLoading && error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      {!isLoading && !error && hasLoaded && (
        <p className="products-count" role="status">
          {total} {total === 1 ? 'product' : 'products'}
        </p>
      )}
      {!isLoading && !error && hasLoaded && total === 0 && (
        <p className="products-empty">No products match these filters.</p>
      )}
      {!isLoading && deleteMessage && (
        <Alert severity="success" role="status">
          {deleteMessage}
        </Alert>
      )}
      {!isLoading && deleteError && (
        <Alert severity="error" role="alert">
          {deleteError}
        </Alert>
      )}
      {!isLoading && !error && products.length > 0 && (
        <ProductTable products={products} deletingId={deletingId} onDelete={(id) => void handleDelete(id)} />
      )}
    </section>
  )
}
