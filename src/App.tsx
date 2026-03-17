import { $api } from "@/modules/common/api"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function App() {
  const { data: products } = $api.useQuery("get", "/products")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <main className="p-6">
      <header className="mb-8">
        <img
          src="https://4txzmei46w.ucarecd.net/8bd0acf7-4652-4b8d-8074-b26f53735fe4/racket_arena_header_adjusted.svg"
          alt="Header Banner"
          className="h-64 w-full rounded-xl object-cover"
        />
      </header>

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
                Weight: {product.weight} gram
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
  )
}

export default App
