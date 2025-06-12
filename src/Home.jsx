"use client"

import { useState, useEffect } from "react"
import { Camera, Send, Wallet, X, CreditCard, ArrowUpRight, ArrowDownLeft, QrCode, Bell, HelpCircle } from 'lucide-react'

const Home = () => {
  const [showScanModal, setShowScanModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [showBalanceModal, setShowBalanceModal] = useState(false)
  const [balance, setBalance] = useState(75000)
  const [sendAmount, setSendAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [transactionType, setTransactionType] = useState("debit")
  const [transactions, setTransactions] = useState([])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance")
    const savedTransactions = localStorage.getItem("transactions")

    if (savedBalance) {
      setBalance(parseFloat(savedBalance))
    } else {
      // Initialize with default data if nothing in localStorage
      localStorage.setItem("balance", "75000")
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      // Initialize with default transactions if nothing in localStorage
      const defaultTransactions = [
        { id: 1, type: "credit", amount: 5000, phone: "9876543210", date: "2024-06-12" },
        { id: 2, type: "debit", amount: 2500, phone: "9123456789", date: "2024-06-11" },
        { id: 3, type: "debit", amount: 1200, phone: "9555666777", date: "2024-06-10" },
      ]
      setTransactions(defaultTransactions)
      localStorage.setItem("transactions", JSON.stringify(defaultTransactions))
    }

    // Initialize analytics data if not already set
    if (!localStorage.getItem("analyticsData")) {
      const defaultAnalyticsData = {
        metrics: {
          totalSpent: { amount: 45240, change: 12.5 },
          transactions: { amount: 156, change: 8.2 },
          averageSpend: { amount: 290, change: -3.1 },
          savings: { amount: 12400, change: 22.4 },
        },
        weeklyData: [
          { day: "Mon", value: 61, amount: 3200 },
          { day: "Tue", value: 55, amount: 2800 },
          { day: "Wed", value: 81, amount: 4100 },
          { day: "Thu", value: 78, amount: 3900 },
          { day: "Fri", value: 52, amount: 2600 },
          { day: "Sat", value: 48, amount: 2400 },
          { day: "Sun", value: 38, amount: 1900 },
        ],
        creditScore: {
          score: 730,
          maxScore: 900,
          paymentHistory: "Excellent",
          creditUtilization: 35,
          lastUpdated: "2024-06-12",
        },
        loanData: {
          outstanding: 245000,
          emiAmount: 12500,
          dueDate: "15 days",
          nextEmiDate: "5th May",
          paidPercentage: 65,
          remainingEmis: 18,
        },
        challenges: [
          {
            id: 1,
            title: "Early Loan Repayment",
            description: "Pay your personal loan EMI 5 days before due date",
            progress: 80,
            type: "loan",
          },
          {
            id: 2,
            title: "Zero Late Payments",
            description: "Maintain 6 months streak of on-time EMI payments",
            progress: 65,
            type: "payment",
          },
        ],
      }
      localStorage.setItem("analyticsData", JSON.stringify(defaultAnalyticsData))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (balance) {
      localStorage.setItem("balance", balance.toString())
    }
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  }, [balance, transactions])

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "") // Only allow digits
    if (value.length <= 10) {
      setPhoneNumber(value)
    }
  }

  const handleAmountChange = (e) => {
    const value = e.target.value
    // Allow digits and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setSendAmount(value)
    }
  }

  const handleSendMoney = () => {
    if (!phoneNumber || !sendAmount) {
      alert("Please fill all fields")
      return
    }

    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number")
      return
    }

    const amount = parseFloat(sendAmount)
    if (amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount")
      return
    }

    if (transactionType === "debit" && amount > balance) {
      alert("Insufficient balance")
      return
    }

    const newTransaction = {
      id: Date.now(),
      type: transactionType,
      amount: amount,
      phone: phoneNumber,
      date: new Date().toISOString().split("T")[0],
    }

    const newBalance = transactionType === "debit" ? balance - amount : balance + amount

    setBalance(newBalance)
    setTransactions([newTransaction, ...transactions])

    // Reset form
    setSendAmount("")
    setPhoneNumber("")
    setTransactionType("debit")
    setShowSendModal(false)

    alert(`₹${amount} ${transactionType === "debit" ? "sent to" : "received from"} ${phoneNumber}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Hey, User!</h1>
              <p className="text-sm text-gray-400">Welcome back</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2.5 bg-slate-700/50 backdrop-blur-sm rounded-full">
              <HelpCircle size={16} className="text-white" />
            </button>
            <button className="p-2.5 bg-slate-700/50 backdrop-blur-sm rounded-full relative">
              <Bell size={16} className="text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></div>
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 rounded-3xl p-7 shadow-2xl shadow-teal-500/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full translate-y-4 -translate-x-4"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-teal-100 text-sm font-medium uppercase tracking-wide">Current Balance</span>
                <div className="text-white text-4xl font-bold mt-2">₹{balance.toLocaleString("en-IN")}</div>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Wallet className="text-white" size={20} />
              </div>
            </div>

            <button
              onClick={() => setShowBalanceModal(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm transition-all shadow-lg"
            >
              View Details →
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setShowScanModal(true)}
            className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center space-y-3 hover:bg-slate-700/80 transition-all shadow-xl"
          >
            <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl shadow-lg">
              <QrCode className="text-white" size={18} />
            </div>
            <span className="text-white font-medium text-sm text-center">Scan & Pay</span>
          </button>

          <button
            onClick={() => setShowSendModal(true)}
            className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center space-y-3 hover:bg-slate-700/80 transition-all shadow-xl"
          >
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Send className="text-white" size={18} />
            </div>
            <span className="text-white font-medium text-sm text-center">Send Money</span>
          </button>

          <button
            onClick={() => setShowBalanceModal(true)}
            className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center space-y-3 hover:bg-slate-700/80 transition-all shadow-xl"
          >
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg">
              <Wallet className="text-white" size={18} />
            </div>
            <span className="text-white font-medium text-sm text-center">Balance</span>
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-xl font-semibold">Recent Activity</h3>
            <button className="text-teal-400 text-sm font-medium">View All</button>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 4).map((txn) => (
              <div
                key={txn.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div
                    className={`p-2.5 rounded-xl ${
                      txn.type === "credit"
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-red-500/20 border border-red-500/30"
                    }`}
                  >
                    {txn.type === "credit" ? (
                      <ArrowDownLeft className="text-green-400" size={16} />
                    ) : (
                      <ArrowUpRight className="text-red-400" size={16} />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{txn.phone}</div>
                    <div className="text-gray-400 text-xs">{txn.date}</div>
                  </div>
                </div>
                <div className={`font-bold text-sm ${txn.type === "credit" ? "text-green-400" : "text-red-400"}`}>
                  {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Send Money Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Send Money</h2>
              <button onClick={() => setShowSendModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 text-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="text"
                    value={sendAmount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="w-full p-4 pl-8 border-2 border-gray-200 rounded-2xl focus:border-teal-500 text-lg"
                    inputMode="decimal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Transaction Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTransactionType("debit")}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-center space-x-2 ${
                      transactionType === "debit"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <ArrowUpRight size={18} />
                    <span className="font-semibold text-sm">Send</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionType("credit")}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-center space-x-2 ${
                      transactionType === "credit"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <ArrowDownLeft size={18} />
                    <span className="font-semibold text-sm">Receive</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleSendMoney}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg"
              >
                {transactionType === "debit" ? "Send Money" : "Add Money"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scan Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Scan & Pay</h2>
              <button onClick={() => setShowScanModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="text-center space-y-6">
              <div className="bg-gray-100 rounded-3xl p-12">
                <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Camera size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Ready to Scan</h3>
                <p className="text-gray-600 text-sm">Point your camera at any QR code</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-semibold">Upload QR</button>
                <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-6 rounded-2xl font-semibold">
                  Open Camera
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balance Modal */}
      {showBalanceModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Account Balance</h2>
              <button onClick={() => setShowBalanceModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-8 text-white">
                <h3 className="text-sm font-medium opacity-90 mb-2">Available Balance</h3>
                <div className="text-4xl font-bold mb-2">₹{balance.toLocaleString("en-IN")}</div>
                <p className="text-xs opacity-75">Last updated: Just now</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-4">Transaction History</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {transactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2.5 rounded-xl ${txn.type === "credit" ? "bg-green-100" : "bg-red-100"}`}>
                          <CreditCard
                            size={16}
                            className={txn.type === "credit" ? "text-green-600" : "text-red-600"}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-800">{txn.phone}</div>
                          <div className="text-gray-500 text-xs">{txn.date}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                        {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
