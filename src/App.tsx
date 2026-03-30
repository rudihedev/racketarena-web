import { $api } from "@/modules/common/api"
import { useState } from "react"
import banner from "@/assets/banner.svg"
import { formatCurrency } from "./lib/currency"
import {
  HouseIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
} from "@phosphor-icons/react"

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function App() {
  const { data: products } = $api.useQuery("get", "/products")
  const [search, setSearch] = useState("")
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const getQty = (id: string) => quantities[id] ?? 1
  const decreaseQty = (id: string) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) - 1),
    }))
  const increaseQty = (id: string, max: number) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(max, (prev[id] ?? 1) + 1),
    }))

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/20 bg-white/20 px-6 py-1 backdrop-blur-md backdrop-saturate-150">
        <div className="flex items-center justify-between">
          <button className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-800 transition hover:bg-emerald-200/40">
            <HouseIcon size={16} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-white/40 px-2.5 py-1 backdrop-blur-sm">
              <MagnifyingGlassIcon size={16} />
              <input
                type="text"
                placeholder="Search racket..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-36 bg-transparent text-xs text-emerald-900 placeholder:text-emerald-500 focus:outline-none"
              />
            </div>

            <button className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-800 transition hover:bg-emerald-200/40">
              <ShoppingCartIcon size={16} />
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6 pt-28 pb-28">
        <header className="mb-8">
          <img
            src={banner}
            alt="Header Banner"
            className="h-64 w-full rounded-xl object-cover shadow-2xl"
          />
        </header>

        <h1 className="mb-4 text-center text-3xl font-black">COLLECTIONS</h1>

        <div className="grid grid-cols-4 gap-6">
          {products?.map((product) => (
            <Card
              key={product.id}
              className="flex cursor-pointer flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mix-blend-mode-multiply h-48 w-full rounded-t-lg bg-white object-contain"
              />

              <CardHeader>
                <CardDescription>{product.brand}</CardDescription>
                <CardTitle>{product.name}</CardTitle>

                <p className="pt-1 text-sm text-muted-foreground">
                  Weight: {product.weight} gram ({product.racketWeightU})
                </p>

                <p className="text-sm text-muted-foreground">
                  Stock:{" "}
                  <span
                    className={
                      product.stockQuantity === 0
                        ? "font-semibold text-destructive"
                        : product.stockQuantity <= 5
                          ? "font-semibold text-yellow-500"
                          : "font-semibold text-green-600"
                    }
                  >
                    {product.stockQuantity === 0
                      ? "Out of Stock"
                      : `${product.stockQuantity} unit`}
                  </span>
                </p>
              </CardHeader>

              <CardFooter className="mt-auto flex items-center justify-between gap-2">
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(product.price)}
                </p>

                <div
                  className="flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* minus button */}
                  <button
                    onClick={() => decreaseQty(product.id)}
                    disabled={product.stockQuantity === 0}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300 text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-40"
                  >
                    <MinusIcon size={12} />
                  </button>

                  {/* quantity number */}
                  <span className="w-5 text-center text-sm font-semibold">
                    {getQty(product.id)}
                  </span>

                  {/* plus button */}
                  <button
                    onClick={() =>
                      increaseQty(product.id, product.stockQuantity)
                    }
                    disabled={product.stockQuantity === 0}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300 text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-40"
                  >
                    <PlusIcon size={12} />
                  </button>

                  {/* add to cart icon button */}
                  <button
                    disabled={product.stockQuantity === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingCartIcon size={14} />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="mt-8 w-full border-t border-white/20 bg-emerald-100/20 py-1 text-center text-xs font-medium text-emerald-950">
        Copyright (c) Racket Arena, 2026
      </footer>
    </>
  )
}

export default App
