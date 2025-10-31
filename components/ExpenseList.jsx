"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"

export default function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setExpenses(data.data || [])
      } catch (error) {
        console.error("Error fetching expenses:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchExpenses()
    }
  }, [token, refresh])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setExpenses(expenses.filter((item) => item._id !== id))
    } catch (error) {
      console.error("Error deleting expense:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-slate-400">Loading expenses…</div>
  }

  if (expenses.length === 0) {
    return <div className="text-center py-8 text-slate-400">No expense records yet — add your first expense to get started.</div>
  }

  return (
    <div className="bg-slate-800/80 text-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900/80 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {expenses.map((item) => (
            <tr key={item._id} className="hover:bg-slate-900/50">
              <td className="px-6 py-4 text-sm text-slate-100">{item.description}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{item.category}</td>
              <td className="px-6 py-4 text-sm font-semibold text-emerald-400">${item.amount.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{new Date(item.date).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-400 hover:text-red-200 font-medium"
                  aria-label={`Delete expense ${item.description}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
