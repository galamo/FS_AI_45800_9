const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(price: number) {
  return priceFormatter.format(price)
}

export function formatAvailability(inStock: boolean) {
  return inStock ? 'In stock' : 'Out of stock'
}
