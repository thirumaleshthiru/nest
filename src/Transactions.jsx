"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Search,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  RotateCcw,
  Download,
  SlidersHorizontal,
  Home,
  Wallet,
  QrCode,
  BarChart3,
  History,
} from "lucide-react"

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  // Load transactions from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions")
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions)
      // Add some additional sample data to match the image
      const enhancedTransactions = [
        ...parsedTransactions,
        {
          id: Date.now() + 1,
          type: "credit",
          amount: 300,
          phone: "9392735747",
          name: "Ram",
          date: "2025-01-01",
          time: "12:00 PM",
          status: "completed",
          avatar: "R",
        },
        {
          id: Date.now() + 2,
          type: "failed",
          amount: 1000,
          phone: "9876543210",
          name: "Shyam",
          date: "2025-01-01",
          time: "11:20 AM",
          status: "failed",
          avatar: "S",
        },
        {
          id: Date.now() + 3,
          type: "debit",
          amount: 50,
          phone: "9123456789",
          name: "Ankit",
          date: "2025-01-01",
          time: "10:00 PM",
          status: "completed",
          avatar: "A",
        },
        {
          id: Date.now() + 4,
          type: "credit",
          amount: 80,
          phone: "9555666777",
          name: "Nest",
          date: "2024-12-01",
          time: "9:57 AM",
          status: "completed",
          avatar: "N",
        },
        {
          id: Date.now() + 5,
          type: "debit",
          amount: 600,
          phone: "9392735747",
          name: "Nest",
          date: "2024-11-01",
          time: "9:30 AM",
          status: "completed",
          avatar: "N",
        },
        {
          id: Date.now() + 6,
          type: "failed",
          amount: 100,
          phone: "9392735747",
          name: "Ram",
          date: "2024-10-01",
          time: "9:15 AM",
          status: "failed",
          avatar: "R",
        },
      ]
      setTransactions(enhancedTransactions)
      setFilteredTransactions(enhancedTransactions)
    }
  }, [])

  // Filter transactions based on active filter and search query
  useEffect(() => {
    let filtered = transactions

    // Apply filter
    if (activeFilter === "Sent") {
      filtered = transactions.filter((txn) => txn.type === "debit")
    } else if (activeFilter === "Received") {
      filtered = transactions.filter((txn) => txn.type === "credit")
    } else if (activeFilter === "Failed") {
      filtered = transactions.filter((txn) => txn.type === "failed" || txn.status === "failed")
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (txn) =>
          txn.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.phone?.includes(searchQuery) ||
          txn.amount?.toString().includes(searchQuery),
      )
    }

    setFilteredTransactions(filtered)
  }, [transactions, activeFilter, searchQuery])

  const filters = [
    { name: "All", icon: Clock, color: "bg-orange-500" },
    { name: "Sent", icon: ArrowUpRight, color: "bg-slate-700" },
    { name: "Received", icon: ArrowDownLeft, color: "bg-slate-700" },
    { name: "Failed", icon: RotateCcw, color: "bg-slate-700" },
  ]

  const getTransactionIcon = (type, status) => {
    if (status === "failed" || type === "failed") {
      return "!"
    }
    return type === "credit" ? "+" : "-"
  }

  const getTransactionColor = (type, status) => {
    if (status === "failed" || type === "failed") {
      return "text-red-400"
    }
    return type === "credit" ? "text-green-400" : "text-green-400"
  }

  const getTransactionStatus = (type, status) => {
    if (status === "failed" || type === "failed") {
      return "Failed"
    }
    return type === "credit" ? "Credited to" : "Debited from"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { day: "2-digit", month: "short", year: "numeric" }
    return date.toLocaleDateString("en-GB", options)
  }

  const handleBackClick = () => {
    window.history.back()
  }

  const bottomNavItems = [
    { icon: Home, label: "Home", active: false },
    { icon: Wallet, label: "Wallet", active: false },
    { icon: QrCode, label: "Scan", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: History, label: "History", active: true },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-safe">
      {/* Status Bar Safe Area */}
      <div className="h-safe-top bg-black"></div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={handleBackClick}
            className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-full transition-colors touch-manipulation"
          >
            <ArrowLeft size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white">History</h1>
        </div>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 sm:p-2.5 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors touch-manipulation"
        >
          <Search size={18} className="text-white sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="w-full p-3 sm:p-4 bg-slate-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            autoFocus
          />
        </div>
      )}

      {/* Filter Buttons */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex space-x-3 sm:space-x-4">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className="flex flex-col items-center space-y-2 sm:space-y-3 touch-manipulation"
            >
              <div
                className={`p-3 sm:p-4 rounded-full transition-all ${
                  activeFilter === filter.name ? "bg-orange-500" : filter.color
                } hover:scale-105 active:scale-95`}
              >
                <filter.icon size={18} className="text-white sm:w-5 sm:h-5" />
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  activeFilter === filter.name ? "text-orange-400" : "text-gray-400"
                }`}
              >
                {filter.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-white">Recent Transactions</h2>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button className="p-2 sm:p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors touch-manipulation">
            <Download size={16} className="text-orange-400 sm:w-4 sm:h-4" />
          </button>
          <button className="p-2 sm:p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors touch-manipulation">
            <SlidersHorizontal size={16} className="text-orange-400 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-4 sm:px-6 space-y-3 sm:space-y-4 mb-20 sm:mb-24">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-400 text-sm sm:text-base">No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((txn) => (
            <div
              key={txn.id}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between hover:bg-slate-700/80 transition-colors"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm sm:text-base">
                    {txn.name ? txn.name.charAt(0).toUpperCase() : txn.phone?.charAt(0) || "?"}
                  </span>
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold text-sm sm:text-base truncate">{txn.name || txn.phone}</h3>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className={`font-bold text-sm sm:text-base ${getTransactionColor(txn.type, txn.status)}`}>
                        {getTransactionIcon(txn.type, txn.status)} ₹{txn.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {formatDate(txn.date)} {txn.time || ""}
                    </p>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span
                        className={`text-xs sm:text-sm ${
                          txn.status === "failed" || txn.type === "failed" ? "text-red-400" : "text-gray-400"
                        }`}
                      >
                        {getTransactionStatus(txn.type, txn.status)}
                      </span>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">•</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-slate-800 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-around">
          {bottomNavItems.map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center space-y-1 sm:space-y-2 touch-manipulation ${
                item.active ? "text-orange-400" : "text-gray-500"
              } hover:text-orange-300 transition-colors`}
            >
              <div
                className={`p-2 sm:p-2.5 rounded-full ${
                  item.active ? "bg-orange-500" : "bg-transparent"
                } transition-all`}
              >
                <item.icon size={18} className="sm:w-5 sm:h-5" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-safe-bottom bg-black"></div>

      <style jsx>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
        .h-safe-top {
          height: env(safe-area-inset-top);
        }
        .h-safe-bottom {
          height: env(safe-area-inset-bottom);
        }
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  )
}

export default Transactions
