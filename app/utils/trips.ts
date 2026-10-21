export interface Trip {
  id: string
  city: string
  price: number
  nights: number
  rating: number
  reviews: number
}

export const trips: Trip[] = [
  { id: 'lisbon', city: 'Lisbon', price: 120, nights: 3, rating: 4.7, reviews: 182 },
  { id: 'kyoto', city: 'Kyoto', price: 210, nights: 5, rating: 4.9, reviews: 96 },
  { id: 'cairo', city: 'Cairo', price: 85, nights: 1, rating: 4.5, reviews: 240 }
]

export function formatPrice(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount)
}
