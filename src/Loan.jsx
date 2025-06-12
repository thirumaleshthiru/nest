import React, { useState, useEffect } from 'react';
import { FileText, CreditCard, X, CheckCircle, AlertCircle, User, Phone, MapPin, Briefcase, IndianRupee, Calendar, ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react';

const Loan = () => {
  const [showCreditModal, setShowCreditModal] = useState(true);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [kycCompleted, setKycCompleted] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [creditLimit, setCreditLimit] = useState(0);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [activeLoan, setActiveLoan] = useState(null);
  
  // KYC Form Data
  const [kycData, setKycData] = useState({
    fullName: '',
    phone: '',
    aadhar: '',
    pan: '',
    address: '',
    occupation: '',
    income: ''
  });

  // Load data from localStorage
  useEffect(() => {
    const savedKYC = localStorage.getItem('loan_kyc_completed');
    const savedProfile = localStorage.getItem('loan_profile_completed');
    const savedCredit = localStorage.getItem('loan_credit_limit');
    const savedLoan = localStorage.getItem('loan_active_loan');
    
    if (savedKYC) setKycCompleted(JSON.parse(savedKYC));
    if (savedProfile) setProfileCompleted(JSON.parse(savedProfile));
    if (savedCredit) setCreditLimit(parseFloat(savedCredit));
    if (savedLoan) setActiveLoan(JSON.parse(savedLoan));
    
    // If both are completed, don't show the credit modal
    if (savedKYC && savedProfile) {
      setShowCreditModal(false);
    }
  }, []);

  const handleCompleteProfile = () => {
    setShowCreditModal(false);
    setShowKYCModal(true);
  };

  const handleKYCSubmit = () => {
    if (!kycData.fullName || !kycData.phone || !kycData.aadhar || !kycData.pan) {
      alert('Please fill all required fields');
      return;
    }

    setKycCompleted(true);
    setProfileCompleted(true);
    const newCreditLimit = 50000 + Math.floor(Math.random() * 100000);
    setCreditLimit(newCreditLimit);
    
    localStorage.setItem('loan_kyc_completed', 'true');
    localStorage.setItem('loan_profile_completed', 'true');
    localStorage.setItem('loan_credit_limit', newCreditLimit.toString());
    
    setShowKYCModal(false);
    alert(`Congratulations! Your profile is verified. Credit limit: ₹${newCreditLimit.toLocaleString('en-IN')}`);
  };

  const handleApplyLoan = () => {
    if (!loanAmount || !loanPurpose) {
      alert('Please fill all fields');
      return;
    }

    const amount = parseFloat(loanAmount);
    if (amount > creditLimit) {
      alert(`Loan amount cannot exceed your credit limit of ₹${creditLimit.toLocaleString('en-IN')}`);
      return;
    }

    const newLoan = {
      id: Date.now(),
      amount: amount,
      purpose: loanPurpose,
      status: 'approved',
      appliedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      interestRate: 12
    };

    setActiveLoan(newLoan);
    localStorage.setItem('loan_active_loan', JSON.stringify(newLoan));
    
    setLoanAmount('');
    setLoanPurpose('');
    setShowLoanModal(false);
    alert(`Loan approved! ₹${amount.toLocaleString('en-IN')} has been credited to your account.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <CreditCard className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Loan Center</h1>
              <p className="text-sm text-gray-400">Quick & Easy Loans</p>
            </div>
          </div>
        </div>

        {/* Credit Status Card */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 rounded-3xl p-7 shadow-2xl shadow-orange-500/20 relative overflow-hidden mb-6">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full translate-y-4 -translate-x-4"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-orange-100 text-sm font-medium uppercase tracking-wide">Credit Limit</span>
                <div className="text-white text-4xl font-bold mt-2">
                  {kycCompleted ? `₹${creditLimit.toLocaleString('en-IN')}` : 'Complete KYC'}
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Shield className="text-white" size={20} />
              </div>
            </div>
            
            {kycCompleted ? (
              <button 
                onClick={() => setShowLoanModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm transition-all shadow-lg"
              >
                Apply for Loan →
              </button>
            ) : (
              <button 
                onClick={() => setShowCreditModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm transition-all shadow-lg"
              >
                Complete Profile →
              </button>
            )}
          </div>
        </div>

        {/* Loan Features */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center space-y-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg">
              <Clock className="text-white" size={18} />
            </div>
            <span className="text-white font-medium text-sm text-center">Instant Approval</span>
            <span className="text-gray-400 text-xs text-center">Get loan in 5 minutes</span>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center space-y-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <TrendingUp className="text-white" size={18} />
            </div>
            <span className="text-white font-medium text-sm text-center">Low Interest</span>
            <span className="text-gray-400 text-xs text-center">Starting at 12% p.a.</span>
          </div>
        </div>

        {/* Active Loan */}
        {activeLoan && (
          <div className="mb-8">
            <h3 className="text-white text-xl font-semibold mb-4">Active Loan</h3>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-white text-2xl font-bold">₹{activeLoan.amount.toLocaleString('en-IN')}</div>
                  <div className="text-gray-400 text-sm">{activeLoan.purpose}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activeLoan.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {activeLoan.status.toUpperCase()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Due Date:</span>
                  <div className="text-white font-medium">{activeLoan.dueDate}</div>
                </div>
                <div>
                  <span className="text-gray-400">Interest Rate:</span>
                  <div className="text-white font-medium">{activeLoan.interestRate}% p.a.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loan Benefits */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-semibold mb-4">Why Choose Us?</h3>
          <div className="space-y-3">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 flex items-center space-x-3">
              <CheckCircle className="text-green-400" size={20} />
              <span className="text-white">No collateral required</span>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 flex items-center space-x-3">
              <CheckCircle className="text-green-400" size={20} />
              <span className="text-white">Flexible repayment options</span>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 flex items-center space-x-3">
              <CheckCircle className="text-green-400" size={20} />
              <span className="text-white">24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Unlock Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl w-full max-w-md p-8 border border-slate-700">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto">
                <FileText size={32} className="text-white" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Unlock Credit Features</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Complete your profile and KYC to access your credit limit, apply for loans, and more.
                </p>
              </div>
              
              <button
                onClick={handleCompleteProfile}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2"
              >
                <span>Complete Profile Now</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KYC Modal */}
      {showKYCModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Complete KYC</h2>
              <button onClick={() => setShowKYCModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  value={kycData.fullName}
                  onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                  placeholder="Enter your full name"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  value={kycData.phone}
                  onChange={(e) => setKycData({...kycData, phone: e.target.value})}
                  placeholder="9392735747"
                  maxLength="10"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number *</label>
                <input
                  value={kycData.aadhar}
                  onChange={(e) => setKycData({...kycData, aadhar: e.target.value})}
                  placeholder="1234 5678 9012"
                  maxLength="12"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                <input
                  value={kycData.pan}
                  onChange={(e) => setKycData({...kycData, pan: e.target.value.toUpperCase()})}
                  placeholder="ABCDE1234F"
                  maxLength="10"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                  value={kycData.address}
                  onChange={(e) => setKycData({...kycData, address: e.target.value})}
                  placeholder="Enter your address"
                  rows="2"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                <select
                  value={kycData.occupation}
                  onChange={(e) => setKycData({...kycData, occupation: e.target.value})}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                >
                  <option value="">Select occupation</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income</label>
                <input
                  value={kycData.income}
                  onChange={(e) => setKycData({...kycData, income: e.target.value})}
                  placeholder="Enter monthly income"
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500"
                />
              </div>
              
              <button
                onClick={handleKYCSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-2xl font-bold text-lg mt-6"
              >
                Submit KYC
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loan Application Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Apply for Loan</h2>
              <button onClick={() => setShowLoanModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="0"
                    type="number"
                    className="w-full p-4 pl-8 border-2 border-gray-200 rounded-2xl focus:border-orange-500 text-lg"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Max limit: ₹{creditLimit.toLocaleString('en-IN')}</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Loan Purpose</label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 text-lg"
                >
                  <option value="">Select purpose</option>
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Medical">Medical</option>
                  <option value="Home Improvement">Home Improvement</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="text-orange-500" size={16} />
                  <span className="text-orange-700 font-semibold text-sm">Loan Details</span>
                </div>
                <div className="text-xs text-orange-600 space-y-1">
                  <div>• Interest Rate: 12% per annum</div>
                  <div>• Processing Fee: ₹99</div>
                  <div>• Repayment: 30 days</div>
                </div>
              </div>
              
              <button
                onClick={handleApplyLoan}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-2xl font-bold text-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loan;