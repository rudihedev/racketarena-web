import { $api } from "@/modules/common/api"

export function App() {
  const { data: products, error, isLoading } = $api.useQuery("get", "/products")

  if (isLoading || !products) return <p>Loading products...</p>

  if (error) return <p>Load products error: ${error}</p>

  console.log({ products })

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Racket Arena</h1>

      {/* Products */}
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h1>Brand: {product.brand}</h1>
              <h2>Name: {product.name}</h2>
              <h2>{product.imageUrl}</h2>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
