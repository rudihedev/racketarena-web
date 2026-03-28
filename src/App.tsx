import { $api } from "@/modules/common/api"
import { useState } from "react"
import banner from "@/assets/banner.svg"

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/20 bg-white/20 px-6 py-1 backdrop-blur-md backdrop-saturate-150">
        <div className="flex items-center justify-between">
          <button className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-800 transition hover:bg-emerald-200/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
              <polyline points="9 21 9 12 15 12 15 21" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-white/40 px-2.5 py-1 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-700"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search racket..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-36 bg-transparent text-xs text-emerald-900 placeholder:text-emerald-500 focus:outline-none"
              />
            </div>

            <button className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-800 transition hover:bg-emerald-200/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2H3" />
                <path d="M3 2l2 14h13l2-9H7" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
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

              <CardFooter className="mt-auto">
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(product.price)}
                </p>
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
