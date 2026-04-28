import { useParams, useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { $api } from "@/modules/common/api"
import { useCart } from "@/store/cart"
import { formatCurrency } from "@/lib/currency"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import {
  MinusIcon,
  PlusIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react"

interface Product {
  id: string
  brand: string
  name: string
  slug: string
  weight: number
  racketWeightU: string
  stockQuantity: number
  price: number
  imageUrl: string
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const addItem = useCart((state) => state.addItem)
  const productSlug = slug as string

  const { data: products, isLoading } = $api.useQuery("get", "/products")

  const product = useMemo(() => {
    //return products?.find((p) => p.id === productId) as Product | undefined
    return products?.find((p) => p.slug === productSlug) as Product | undefined
  }, [products, productSlug])

  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    )
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      quantity
    )

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Hitung sisa stock setelah quantity dipilih
  const remainingStock = product.stockQuantity - quantity

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900"
        >
          <ArrowLeftIcon size={16} />
          Back to Collections
        </button>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-white p-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-80 w-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Details Section */}
            <CardContent className="flex flex-col justify-center p-6">
              <CardHeader className="px-0 pt-0">
                <CardDescription className="text-lg">
                  {product.brand}
                </CardDescription>
                <CardTitle className="text-3xl">{product.name}</CardTitle>
              </CardHeader>

              <div className="space-y-4">
                {/* Price */}
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(product.price)}
                </p>

                {/* Specs */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Weight: {product.weight} gram ({product.racketWeightU})
                  </p>
                  <p>
                    Available Stock:{" "}
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
                        : `${product.stockQuantity} units`}
                    </span>
                  </p>
                </div>

                {/* Quantity Selector */}
                {product.stockQuantity > 0 && (
                  <div className="flex items-center gap-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                    <span className="text-sm font-medium text-emerald-900">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-emerald-200 disabled:opacity-50"
                      >
                        <MinusIcon size={14} weight="bold" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrease}
                        disabled={quantity >= product.stockQuantity}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-emerald-200 disabled:opacity-50"
                      >
                        <PlusIcon size={14} weight="bold" />
                      </button>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">
                      Stock after: {remainingStock}
                    </span>
                  </div>
                )}

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0 || isAdded}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isAdded ? (
                    <>Added to Cart!</>
                  ) : (
                    <>
                      <ShoppingCartIcon size={18} />
                      Add to Cart
                    </>
                  )}
                </Button>

                {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                  <p className="text-center text-xs text-yellow-600">
                    Only {product.stockQuantity} left in stock!
                  </p>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
