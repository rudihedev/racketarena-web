import { create } from "zustand"

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Omit<CartItem, "quantity">, quantity: number) => void
  getTotalItems: () => number
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }

      return {
        items: [...state.items, { ...product, quantity }],
      }
    })
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
}))
