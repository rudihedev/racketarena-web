// src/App.tsx
import { $api } from "@/modules/common/api"
import { useState } from "react"
import banner from "@/assets/banner.svg"
import { formatCurrency } from "../lib/currency"
import { Link } from "react-router-dom"
import { Layout } from "@/components/Layout"

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function HomeRoute() {
  const { data: products } = $api.useQuery("get", "/products")
  const [search, setSearch] = useState("")

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout search={search} onSearchChange={setSearch}>
      <header className="mb-8">
        <img
          src={banner}
          alt="Header Banner"
          className="h-64 w-full rounded-xl object-cover shadow-2xl"
        />
      </header>

      <h1 className="mb-4 text-center text-3xl font-black">COLLECTIONS</h1>

      <div className="grid grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <Link
            key={product.slug}
            to={`/product/${product.slug}`}
            className="h-full"
          >
            <Card className="flex cursor-pointer flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mix-blend-mode-multiply h-48 w-full rounded-t-lg bg-white object-contain"
              />

              <CardHeader className="grow">
                <CardDescription className="line-clamp-1">
                  {product.brand}
                </CardDescription>
                <CardTitle className="line-clamp-2 text-base">
                  {product.name}
                </CardTitle>

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
          </Link>
        ))}
      </div>
    </Layout>
  )
}
