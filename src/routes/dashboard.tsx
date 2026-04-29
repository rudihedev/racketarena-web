import { useUser } from "@/modules/auth/hooks"
import { useNavigate } from "react-router-dom"

export function DashboardRoute() {
  const navigate = useNavigate()

  const { isAuthenticated, user, error, isLoading } = useUser()

  if (!isAuthenticated) {
    navigate("/login")
  }

  if (isLoading || !user) return <p>Loading user dashboard...</p>
  if (error) return <p>Load user dashboard error: {error}</p>

  return (
    <main>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  )
}
