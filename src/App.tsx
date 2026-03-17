import { $api } from "@/modules/common/api"

export function App() {
  const { data: products, error, isLoading } = $api.useQuery("get", "/products")

  if (isLoading || !products) return <p>Loading products...</p>

  if (error) return <p>Load products error: ${error}</p>

  console.log({ products })

  return (
    <main>
      <h1>Products</h1>

      {/* Products */}
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h1>{product.name}</h1>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
