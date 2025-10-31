"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import RecentTransactions from "@/components/RecentTransactions"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function Dashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalInvestments: 0,
    netBalance: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [incomeRes, expensesRes, investmentsRes] = await Promise.all([
          fetch("/api/income", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/expenses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/investments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const incomeData = await incomeRes.json()
        const expensesData = await expensesRes.json()
        const investmentsData = await investmentsRes.json()

        const totalIncome = incomeData.data?.reduce((sum, item) => sum + item.amount, 0) || 0
        const totalExpenses = expensesData.data?.reduce((sum, item) => sum + item.amount, 0) || 0
        const totalInvestments = investmentsData.data?.reduce((sum, item) => sum + item.currentValue, 0) || 0

        setStats({
          totalIncome,
          totalExpenses,
          totalInvestments,
          netBalance: totalIncome - totalExpenses,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchStats()
      const interval = setInterval(fetchStats, 5000)
      return () => clearInterval(interval)
    }
  }, [token])

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-3">Dashboard</h1>
                <p className="text-violet-200/70 text-lg">Your financial overview at a glance</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="group bg-gradient-to-br from-violet-900/40 to-purple-900/40 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">💰</span>
                    </div>
                    <div className="text-emerald-400/60 text-sm font-medium">+12.5%</div>
                  </div>
                  <h3 className="text-violet-300 text-sm font-semibold mb-2 uppercase tracking-wide">Total Income</h3>
                  <p className="text-4xl font-black text-emerald-400 mb-2">${stats.totalIncome.toFixed(2)}</p>
                  <p className="text-xs text-violet-400/70">All income sources</p>
                </div>
                
                <div className="group bg-gradient-to-br from-violet-900/40 to-purple-900/40 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">💸</span>
                    </div>
                    <div className="text-rose-400/60 text-sm font-medium">-8.2%</div>
                  </div>
                  <h3 className="text-violet-300 text-sm font-semibold mb-2 uppercase tracking-wide">Total Expenses</h3>
                  <p className="text-4xl font-black text-rose-400 mb-2">${stats.totalExpenses.toFixed(2)}</p>
                  <p className="text-xs text-violet-400/70">All expenses</p>
                </div>
                
                <div className="group bg-gradient-to-br from-violet-900/40 to-purple-900/40 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📈</span>
                    </div>
                    <div className="text-blue-400/60 text-sm font-medium">+15.7%</div>
                  </div>
                  <h3 className="text-violet-300 text-sm font-semibold mb-2 uppercase tracking-wide">Investments</h3>
                  <p className="text-4xl font-black text-blue-400 mb-2">${stats.totalInvestments.toFixed(2)}</p>
                  <p className="text-xs text-violet-400/70">Current value</p>
                </div>
                
                <div className={`group bg-gradient-to-br from-violet-900/40 to-purple-900/40 backdrop-blur-xl border rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${stats.netBalance >= 0 ? "border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-emerald-500/20" : "border-rose-500/30 hover:border-rose-400/50 hover:shadow-rose-500/20"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${stats.netBalance >= 0 ? "bg-gradient-to-br from-emerald-400 to-emerald-600" : "bg-gradient-to-br from-rose-400 to-rose-600"}`}>
                      <span className="text-white text-xl">{stats.netBalance >= 0 ? "📊" : "⚠️"}</span>
                    </div>
                    <div className={`text-sm font-medium ${stats.netBalance >= 0 ? "text-emerald-400/60" : "text-rose-400/60"}`}>
                      {stats.netBalance >= 0 ? "+" : ""}${((stats.netBalance / (stats.totalIncome || 1)) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <h3 className="text-violet-300 text-sm font-semibold mb-2 uppercase tracking-wide">Net Balance</h3>
                  <p className={`text-4xl font-black mb-2 ${stats.netBalance >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${stats.netBalance.toFixed(2)}
                  </p>
                  <p className="text-xs text-violet-400/70">Income - Expenses</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-violet-200 mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">📋</span>
                      </span>
                      Recent Transactions
                    </h2>
                    <RecentTransactions />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-violet-200 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">⚡</span>
                    </span>
                    Quick Actions
                  </h2>
                  <div className="space-y-4">
                    <a
                      href="/income"
                      className="group block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 text-center font-semibold hover:scale-105 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">💰</span>
                        <span>Add Income</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </a>
                    <a
                      href="/expenses"
                      className="group block w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300 text-center font-semibold hover:scale-105 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">💸</span>
                        <span>Add Expense</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </a>
                    <a
                      href="/investments"
                      className="group block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 text-center font-semibold hover:scale-105 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">📈</span>
                        <span>Add Investment</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </a>
                    <a
                      href="/goals"
                      className="group block w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 text-center font-semibold hover:scale-105 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl">🎯</span>
                        <span>Create Goal</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
