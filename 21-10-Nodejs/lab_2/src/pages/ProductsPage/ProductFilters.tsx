import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import type { FormEvent } from 'react'
import type { ProductDraft } from './product-type'

type ProductFiltersProps = {
  draft: ProductDraft
  categories: string[]
  brands: string[]
  disabled: boolean
  onChange: (draft: ProductDraft) => void
  onApply: () => void
  onReset: () => void
}

export default function ProductFilters(props: ProductFiltersProps) {
  const { draft, categories, brands, disabled, onChange, onApply, onReset } = props

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onApply()
  }

  return (
    <form className="products-filters" onSubmit={handleSubmit}>
      <TextField
        label="Search"
        name="search"
        value={draft.search}
        disabled={disabled}
        onChange={(event) => onChange({ ...draft, search: event.target.value })}
        helperText="Name or description"
        fullWidth
      />
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="product-category-label">Category</InputLabel>
        <Select
          labelId="product-category-label"
          label="Category"
          name="category"
          value={draft.category}
          onChange={(event) => onChange({ ...draft, category: event.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{'\u00a0'}</FormHelperText>
      </FormControl>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="product-brand-label">Brand</InputLabel>
        <Select
          labelId="product-brand-label"
          label="Brand"
          name="brand"
          value={draft.brand}
          onChange={(event) => onChange({ ...draft, brand: event.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{'\u00a0'}</FormHelperText>
      </FormControl>
      <TextField
        label="Minimum price"
        name="minPrice"
        value={draft.minPrice}
        disabled={disabled}
        onChange={(event) => onChange({ ...draft, minPrice: event.target.value })}
        helperText="USD, inclusive"
        fullWidth
      />
      <TextField
        label="Maximum price"
        name="maxPrice"
        value={draft.maxPrice}
        disabled={disabled}
        onChange={(event) => onChange({ ...draft, maxPrice: event.target.value })}
        helperText="USD, inclusive"
        fullWidth
      />
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="product-availability-label">Availability</InputLabel>
        <Select
          labelId="product-availability-label"
          label="Availability"
          name="inStock"
          value={draft.inStock}
          onChange={(event) =>
            onChange({ ...draft, inStock: event.target.value as ProductDraft['inStock'] })
          }
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">In stock</MenuItem>
          <MenuItem value="false">Out of stock</MenuItem>
        </Select>
        <FormHelperText>{'\u00a0'}</FormHelperText>
      </FormControl>
      <div className="products-filters__actions">
        <Button type="submit" variant="contained" disabled={disabled}>
          Apply filters
        </Button>
        <Button type="button" variant="outlined" onClick={onReset} disabled={disabled}>
          Reset filters
        </Button>
      </div>
    </form>
  )
}
