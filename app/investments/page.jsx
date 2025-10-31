"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import InvestmentForm from "@/components/InvestmentForm"
import InvestmentList from "@/components/InvestmentList"
import { useState } from "react"

export default function InvestmentsPage() {
  const [refresh, setRefresh] = useState(0)

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent mb-3">Investment Management</h1>
                <p className="text-violet-200/70 text-lg">Grow your wealth with smart investments</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-violet-200 mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">📈</span>
                      </span>
                      Add Investment
                    </h2>
                    <InvestmentForm onSuccess={() => setRefresh(refresh + 1)} />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-violet-200 mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">💼</span>
                      </span>
                      Your Investments
                    </h2>
                    <InvestmentList refresh={refresh} />
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
