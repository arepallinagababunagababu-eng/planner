"use client"

import { useAuth } from "@/lib/context"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-gradient-to-r from-violet-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-xl border-b border-violet-500/20 fixed top-0 right-0 md:left-64 left-0 z-10">
      <div className="px-4 md:px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">👋</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-violet-200">
                Welcome back{user?.name ? ", " : ""}
                <span className="bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">{user?.name || ""}</span>
              </h2>
              <p className="text-xs text-violet-400/70">Have a productive day!</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-violet-900/30 border border-violet-500/20 rounded-xl px-3 py-2">
            <span className="text-emerald-400 text-sm">•</span>
            <span className="text-violet-300 text-sm font-medium">Online</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="group bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30 text-rose-300 px-4 py-2 rounded-xl hover:from-rose-500/30 hover:to-red-500/30 hover:border-rose-400/50 transition-all duration-300 font-semibold hover:scale-105"
            aria-label="Logout"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🚪</span>
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
