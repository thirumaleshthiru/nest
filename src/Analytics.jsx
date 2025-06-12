"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  PiggyBank,
  BarChart3,
  HelpCircle,
  Lightbulb,
  Calculator,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Week")
  const [analyticsData, setAnalyticsData] = useState({
    metrics: {},
    weeklyData: [],
    creditScore: {},
    loanData: {},
    challenges: [],
  })
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])

  // Load data from localStorage on component mount
  useEffect(() => {
    // Get balance and transactions from localStorage (shared with home.jsx)
    const savedBalance = localStorage.getItem("balance")
    const savedTransactions = localStorage.getItem("transactions")
    const savedAnalyticsData = localStorage.getItem("analyticsData")

    if (savedBalance) {
      setBalance(Number.parseFloat(savedBalance))
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }

    if (savedAnalyticsData) {
      setAnalyticsData(JSON.parse(savedAnalyticsData))
    }
  }, [])

  // Update analytics data when transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      // Calculate total spent (sum of debit transactions)
      const totalSpent = transactions.filter((txn) => txn.type === "debit").reduce((sum, txn) => sum + txn.amount, 0)

      // Calculate average spend
      const averageSpend = Math.round(
        totalSpent / Math.max(1, transactions.filter((txn) => txn.type === "debit").length),
      )

      // Calculate savings (sum of credit transactions)
      const savings = transactions.filter((txn) => txn.type === "credit").reduce((sum, txn) => sum + txn.amount, 0)

      // Update analytics metrics
      const updatedAnalyticsData = {
        ...analyticsData,
        metrics: {
          ...analyticsData.metrics,
          totalSpent: { amount: totalSpent, change: 12.5 }, // Keep change percentage for now
          transactions: { amount: transactions.length, change: 8.2 }, // Keep change percentage for now
          averageSpend: { amount: averageSpend, change: -3.1 }, // Keep change percentage for now
          savings: { amount: savings, change: 22.4 }, // Keep change percentage for now
        },
      }

      setAnalyticsData(updatedAnalyticsData)
      localStorage.setItem("analyticsData", JSON.stringify(updatedAnalyticsData))
    }
  }, [transactions])

  const periods = ["Current", "Week", "Month", "Year"]

  const metrics = [
    {
      icon: Wallet,
      title: "Total Spent",
      amount: `₹${analyticsData.metrics.totalSpent?.amount?.toLocaleString("en-IN") || "0"}`,
      change: `${analyticsData.metrics.totalSpent?.change > 0 ? "+" : ""}${analyticsData.metrics.totalSpent?.change || 0}%`,
      isPositive: (analyticsData.metrics.totalSpent?.change || 0) > 0,
    },
    {
      icon: ArrowUpRight,
      title: "Transactions",
      amount: analyticsData.metrics.transactions?.amount?.toString() || "0",
      change: `${analyticsData.metrics.transactions?.change > 0 ? "+" : ""}${analyticsData.metrics.transactions?.change || 0}%`,
      isPositive: (analyticsData.metrics.transactions?.change || 0) > 0,
    },
    {
      icon: TrendingUp,
      title: "Average Spend",
      amount: `₹${analyticsData.metrics.averageSpend?.amount?.toLocaleString("en-IN") || "0"}`,
      change: `${analyticsData.metrics.averageSpend?.change > 0 ? "+" : ""}${analyticsData.metrics.averageSpend?.change || 0}%`,
      isPositive: (analyticsData.metrics.averageSpend?.change || 0) > 0,
    },
    {
      icon: PiggyBank,
      title: "Savings",
      amount: `₹${analyticsData.metrics.savings?.amount?.toLocaleString("en-IN") || "0"}`,
      change: `${analyticsData.metrics.savings?.change > 0 ? "+" : ""}${analyticsData.metrics.savings?.change || 0}%`,
      isPositive: (analyticsData.metrics.savings?.change || 0) > 0,
    },
  ]

  const quickActions = [
    { icon: Wallet, title: "My Loans", size: "large" },
    { icon: BarChart3, title: "Credit Score", size: "small" },
    { icon: HelpCircle, title: "Financial Quiz", size: "small" },
    { icon: Lightbulb, title: "Credit Tips", size: "small" },
    { icon: Calculator, title: "EMI Calculator", size: "small" },
  ]

  const handleQuickAction = (actionTitle) => {
    console.log(`Quick action clicked: ${actionTitle}`)
    // Add navigation logic here
  }

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
    // Here you would typically fetch new data based on the selected period
    console.log(`Period changed to: ${period}`)
  }

  const handleBackClick = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-safe">
      {/* Status Bar Safe Area */}
      <div className="h-safe-top bg-slate-900"></div>

      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBackClick}
            className="p-1.5 hover:bg-slate-700/50 rounded-full transition-colors touch-manipulation"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Analytics</h1>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="px-3 mb-4">
        <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl backdrop-blur-sm">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all touch-manipulation ${
                selectedPeriod === period
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="px-3 mb-4">
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-slate-700/50 rounded-lg">
                  <metric.icon size={14} className="text-gray-300" />
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-gray-400 text-xs font-medium">{metric.title}</p>
                <p className="text-white text-base font-bold">{metric.amount}</p>
                <p className={`text-xs font-medium ${metric.isPositive ? "text-green-400" : "text-red-400"}`}>
                  {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="px-3 mb-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm font-semibold">Weekly Trend</h3>
            <button className="text-teal-400 text-xs font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          {/* Chart */}
          <div className="relative h-36 bg-slate-900/50 rounded-lg p-2">
            <div className="absolute inset-2">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-500">
                <span>81</span>
                <span>61</span>
                <span>41</span>
                <span>20</span>
                <span>0</span>
              </div>

              {/* Chart area */}
              <div className="ml-6 h-full relative">
                <svg className="w-full h-full" viewBox="0 0 280 120">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={analyticsData.weeklyData
                      .map((point, index) => `${index * 40},${120 - (point.value * 120) / 81}`)
                      .join(" ")}
                  />
                  {/* Data points */}
                  {analyticsData.weeklyData.map((point, index) => (
                    <circle
                      key={index}
                      cx={index * 40}
                      cy={120 - (point.value * 120) / 81}
                      r="3"
                      fill="#14b8a6"
                      className="drop-shadow-lg"
                    />
                  ))}
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[10px] text-gray-500 mt-1">
                {analyticsData.weeklyData.map((point) => (
                  <span key={point.day}>{point.day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Score Section */}
      <div className="px-3 mb-4">
        <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-cyan-900/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-300 text-xs font-medium">Credit Score</h3>
              <div className="text-right">
                <span className="text-white text-2xl font-bold">{analyticsData.creditScore.score || 0}</span>
                <span className="text-gray-400 text-sm">/{analyticsData.creditScore.maxScore || 900}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="w-full bg-slate-600 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${((analyticsData.creditScore.score || 0) / (analyticsData.creditScore.maxScore || 900)) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-slate-800/50 rounded-lg p-2">
                <div className="flex items-center space-x-1 mb-0.5">
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-gray-300 text-[10px]">Payment History:</span>
                </div>
                <span className="text-white text-xs font-semibold">
                  {analyticsData.creditScore.paymentHistory || "N/A"}
                </span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2">
                <div className="flex items-center space-x-1 mb-0.5">
                  <AlertTriangle size={12} className="text-orange-400" />
                  <span className="text-gray-300 text-[10px]">Credit Utilization:</span>
                </div>
                <span className="text-white text-xs font-semibold">
                  {analyticsData.creditScore.creditUtilization || 0}%
                </span>
              </div>
            </div>

            <button className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white py-2.5 rounded-lg text-xs font-medium transition-colors touch-manipulation flex items-center justify-center space-x-1">
              <span>Check Your Credit Score</span>
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Loan Overview */}
      <div className="px-3 mb-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm font-semibold">Loan Overview</h3>
            <button className="text-teal-400 text-xs font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-0.5">Outstanding</p>
              <p className="text-white text-base font-bold">
                ₹{analyticsData.loanData.outstanding?.toLocaleString("en-IN") || "0"}
              </p>
              <p className="text-gray-400 text-[10px]">Due in {analyticsData.loanData.dueDate || "N/A"}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-0.5">EMI Amount</p>
              <p className="text-white text-base font-bold">
                ₹{analyticsData.loanData.emiAmount?.toLocaleString("en-IN") || "0"}
              </p>
              <p className="text-gray-400 text-[10px]">Next: {analyticsData.loanData.nextEmiDate || "N/A"}</p>
            </div>
          </div>

          {/* Loan Progress */}
          <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-white text-xs font-semibold">
                {analyticsData.loanData.paidPercentage || 0}% paid
              </span>
              <span className="text-gray-400 text-[10px]">
                {analyticsData.loanData.remainingEmis || 0} EMIs remaining
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${analyticsData.loanData.paidPercentage || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges */}
      <div className="px-3 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm font-semibold">Your Challenges</h3>
          <button className="text-teal-400 text-xs font-medium flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

        <div className="space-y-2">
          {analyticsData.challenges.map((challenge, index) => (
            <div
              key={challenge.id || index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-3"
            >
              <div className="flex items-start space-x-2 mb-2">
                <div className="p-1.5 bg-orange-500/20 rounded-lg">
                  {challenge.type === "loan" ? (
                    <Clock size={14} className="text-orange-400" />
                  ) : (
                    <CheckCircle size={14} className="text-orange-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-xs mb-0.5 truncate">{challenge.title}</h4>
                  <p className="text-gray-400 text-[10px] line-clamp-2">{challenge.description}</p>
                </div>
                <span className="text-white font-bold text-xs">{challenge.progress}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-3 mb-20">
        <h3 className="text-white text-sm font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.title)}
              className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-3 hover:bg-slate-700/50 transition-all touch-manipulation active:scale-95 ${
                action.size === "large" ? "col-span-2" : ""
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <action.icon size={18} className="text-gray-300" />
                </div>
                <span className="text-white font-medium text-xs">{action.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
<br /><br /><br />
      {/* Bottom Safe Area */}
      <div className="h-safe-bottom bg-slate-900"></div>

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

export default Analytics
