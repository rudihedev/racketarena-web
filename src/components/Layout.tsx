// src/components/Layout.tsx
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCart } from "@/store/cart"
import {
  HouseIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@phosphor-icons/react"

interface LayoutProps {
  children: React.ReactNode
  search?: string
  onSearchChange?: (value: string) => void
}

export function Layout({ children, search, onSearchChange }: LayoutProps) {
  const navigate = useNavigate()
  const totalItems = useCart((state) => state.getTotalItems())
  const [localSearch, setLocalSearch] = useState(search || "")

  const handleSearch = (value: string) => {
    setLocalSearch(value)
    onSearchChange?.(value)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/20 bg-white/20 px-6 py-1 backdrop-blur-md backdrop-saturate-150">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex h-7 w-7 items-center justify-center rounded-full text-emerald-800 transition hover:bg-emerald-200/40"
          >
            <HouseIcon size={16} />
          </button>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-white/40 px-2.5 py-1 text-xs font-medium text-emerald-800 backdrop-blur-sm transition hover:bg-emerald-100/60"
            >
              <UserIcon size={14} />
              Login
            </Link>

            <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-white/40 px-2.5 py-1 backdrop-blur-sm">
              <MagnifyingGlassIcon size={16} />
              <input
                type="text"
                placeholder="Search racket..."
                value={localSearch}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-36 bg-transparent text-xs text-emerald-900 placeholder:text-emerald-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="relative flex h-7 w-7 items-center justify-center rounded-full text-emerald-800 transition hover:bg-emerald-200/40"
            >
              <ShoppingCartIcon size={16} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6 pt-28 pb-28">{children}</main>

      <footer className="mt-8 w-full border-t border-white/20 bg-emerald-100/20 py-1 text-center text-xs font-medium text-emerald-950">
        Copyright © Racket Arena, 2026
      </footer>
    </>
  )
}
