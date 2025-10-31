"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/lib/context"
import { useState } from "react"

export default function SettingsPage() {
  const { user } = useAuth()
  const [settings, setSettings] = useState({
    currency: user?.currency || "USD",
    monthlyBudget: user?.monthlyBudget || 0,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setMessage("Settings saved successfully!")
      } else {
        setMessage("Failed to save settings")
      }
    } catch (error) {
      setMessage("Error saving settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 min-h-screen">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-3">Settings</h1>
                <p className="text-violet-200/70 text-lg">Customize your account preferences</p>
              </div>

              <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-violet-200 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">👤</span>
                    </span>
                    Account Information
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-violet-300 mb-2 uppercase tracking-wide">Name</label>
                      <input
                        type="text"
                        value={user?.name || ""}
                        disabled
                        className="w-full px-4 py-3 bg-violet-900/20 border border-violet-500/30 rounded-xl text-violet-200 placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-violet-300 mb-2 uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full px-4 py-3 bg-violet-900/20 border border-violet-500/30 rounded-xl text-violet-200 placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-violet-500/20 pt-8">
                  <h2 className="text-2xl font-bold text-violet-200 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">⚙️</span>
                    </span>
                    Preferences
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-violet-300 mb-2 uppercase tracking-wide">Currency</label>
                      <select
                        name="currency"
                        value={settings.currency}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-violet-900/20 border border-violet-500/30 rounded-xl text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300"
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>JPY</option>
                        <option>INR</option>
                        <option>AUD</option>
                        <option>CAD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-violet-300 mb-2 uppercase tracking-wide">Monthly Budget</label>
                      <input
                        type="number"
                        name="monthlyBudget"
                        value={settings.monthlyBudget}
                        onChange={handleChange}
                        step="0.01"
                        className="w-full px-4 py-3 bg-violet-900/20 border border-violet-500/30 rounded-xl text-violet-200 placeholder-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {message && (
                  <div
                    className={`p-4 rounded-xl border ${
                      message.includes("success") 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" 
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{message.includes("success") ? "✓" : "⚠️"}</span>
                      <span className="font-medium">{message}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-105 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>Save Settings</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
