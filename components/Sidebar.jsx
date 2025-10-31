"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/income", label: "Income", icon: "💰" },
    { href: "/expenses", label: "Expenses", icon: "💸" },
    { href: "/investments", label: "Investments", icon: "📈" },
    { href: "/goals", label: "Goals", icon: "🎯" },
    { href: "/reports", label: "Reports", icon: "📊" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-violet-950 via-purple-950 to-indigo-950 text-white h-screen fixed left-0 top-0 overflow-y-auto border-r border-violet-500/20 backdrop-blur-xl">
      <div className="p-6 border-b border-violet-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <span className="text-white font-bold text-lg">₿</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Budget Planner
            </h1>
            <p className="text-xs text-violet-400/70">Financial Management</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 space-y-2 px-4">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-violet-500/30 to-purple-600/30 border border-violet-400/50 text-violet-200 shadow-lg shadow-violet-500/20"
                  : "text-violet-300/70 hover:bg-violet-900/30 hover:text-violet-200 hover:border-violet-500/30 border border-transparent"
              }`}
            >
              <span className={`text-xl transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>{link.icon}</span>
              <span className="font-semibold">{link.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
              )}
            </Link>
          )
        })}
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 border border-violet-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">✨</div>
          <p className="text-xs text-violet-300 font-medium">Upgrade to Pro</p>
          <p className="text-xs text-violet-400/70 mt-1">Unlock advanced features</p>
        </div>
      </div>
    </aside>
  )
}
