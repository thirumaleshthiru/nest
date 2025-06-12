"use client"

import { useState } from "react"
import { FileText, Bell, HelpCircle, ArrowRight, X, User } from 'lucide-react'

const Loan = () => {
  const [showProfileModal, setShowProfileModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Hey, User!</h1>
              <p className="text-sm text-gray-400">Loan Services</p>
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

        {/* Main Content - Centered */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 text-center max-w-sm w-full">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="text-white" size={28} />
            </div>
            
            <h2 className="text-white text-2xl font-bold mb-4">Unlock Credit Features</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Complete your profile and KYC to access your credit limit, apply for loans, and more.
            </p>

            <button
              onClick={() => setShowProfileModal(true)}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black px-8 py-4 rounded-full text-sm font-bold transition-all shadow-lg flex items-center space-x-2 mx-auto"
            >
              <span>Complete Profile</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Complete Profile</h2>
              <button onClick={() => setShowProfileModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User size={28} className="text-white" />
                </div>
                <h3 className="text-white text-lg font-bold mb-2">KYC Verification</h3>
                <p className="text-orange-100 text-sm">Complete your profile to unlock all features</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Personal Details</span>
                  <span className="text-orange-500 text-sm font-semibold">Pending</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Identity Verification</span>
                  <span className="text-orange-500 text-sm font-semibold">Pending</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Bank Account Link</span>
                  <span className="text-orange-500 text-sm font-semibold">Pending</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black py-4 rounded-2xl font-bold text-lg">
                Start Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Loan