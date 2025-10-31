"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import FinancialSummary from "@/components/FinancialSummary"
import ExpenseCategoryChart from "@/components/ExpenseCategoryChart"
import IncomeCategoryChart from "@/components/IncomeCategoryChart"
import MonthlyTrendChart from "@/components/MonthlyTrendChart"

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-3">Financial Reports & Analytics</h1>
                <p className="text-violet-200/70 text-lg">Comprehensive insights into your financial health</p>
              </div>

              <div className="mb-8">
                <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-violet-200 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </span>
                    Financial Summary
                  </h2>
                  <FinancialSummary />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-violet-200 mb-4 flex items-center gap-3">
                    <span className="w-6 h-6 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">💸</span>
                    </span>
                    Expense Categories
                  </h3>
                  <ExpenseCategoryChart />
                </div>
                <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-violet-200 mb-4 flex items-center gap-3">
                    <span className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">💰</span>
                    </span>
                    Income Sources
                  </h3>
                  <IncomeCategoryChart />
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-violet-200 mb-4 flex items-center gap-3">
                  <span className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">📈</span>
                  </span>
                  Monthly Trends
                </h3>
                <MonthlyTrendChart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
