import { Button } from "@/components/ui/button"
import { getProducts } from "./modules/common/api"

export function App() {
  getProducts()
  return <Button />
}

export default App
