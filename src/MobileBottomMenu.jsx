import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CreditCard, TrendingUp, Receipt, QrCode, Camera, X, Upload } from 'lucide-react';

const MobileBottomMenu = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      icon: CreditCard,
      label: 'Loan',
      path: '/loan',
      isActive: location.pathname === '/loan'
    },
    {
      icon: null, // QR button will be handled separately
      label: 'QR',
      path: null,
      isQR: true
    },
    {
      icon: TrendingUp,
      label: 'Analytics',
      path: '/analytics',
      isActive: location.pathname === '/analytics'
    },
    {
      icon: Receipt,
      label: 'Transactions',
      path: '/transactions',
      isActive: location.pathname === '/transactions'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const Modal = ({ show, onClose, children, title }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
        <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:w-[90%] sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-hidden animate-slide-up sm:animate-none">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl">
        {/* Safe area for devices with home indicator */}
        <div className="pb-safe">
          <div className="flex items-center justify-around px-2 sm:px-4 py-2 relative">
            {menuItems.map((item, index) => {
              if (item.isQR) {
                return (
                  <button
                    key="qr-button"
                    onClick={() => setShowQRModal(true)}
                    className="relative -top-6 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-4 rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/50 transition-all touch-manipulation active:scale-95 border-4 border-white"
                  >
                    <QrCode size={24} className="text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </button>
                );
              }

              const IconComponent = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex flex-col items-center justify-center space-y-1 py-3 px-3 rounded-2xl transition-all touch-manipulation min-w-[60px] ${
                    item.isActive
                      ? 'text-teal-600 bg-teal-50 shadow-lg shadow-teal-500/20 border border-teal-100'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-1 rounded-lg transition-all ${
                    item.isActive ? 'bg-teal-100' : ''
                  }`}>
                    <IconComponent size={20} className={`transition-all ${
                      item.isActive ? 'scale-110' : ''
                    }`} />
                  </div>
                  <span className={`text-xs font-medium transition-all ${
                    item.isActive ? 'font-semibold' : ''
                  }`}>
                    {item.label}
                  </span>
                  {item.isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <Modal show={showQRModal} onClose={() => setShowQRModal(false)} title="QR Scanner">
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200 relative overflow-hidden">
            {/* Scanning Animation */}
            <div className="absolute inset-4 border-2 border-orange-500 rounded-2xl">
              <div className="absolute inset-0 border border-orange-300 rounded-2xl animate-ping"></div>
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
            </div>
            
            <div className="relative z-10 mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/30">
                <Camera size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to Scan</h3>
              <p className="text-slate-600 text-sm">Point your camera at any QR code to scan</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              onClick={() => {
                // Handle file upload
                console.log('Upload QR code image');
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 px-6 rounded-2xl font-semibold transition-colors touch-manipulation active:scale-95 flex items-center justify-center space-x-2"
            >
              <Upload size={18} />
              <span>Upload QR</span>
            </button>
            <button 
              onClick={() => {
                // Handle camera opening
                console.log('Open camera for QR scanning');
                // In a real app, you would integrate with a QR scanner library
                alert('Camera functionality would be integrated here');
              }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all touch-manipulation active:scale-95 shadow-lg shadow-orange-500/30 flex items-center justify-center space-x-2"
            >
              <Camera size={18} />
              <span>Open Camera</span>
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => {
                  setShowQRModal(false);
                  navigate('/');
                }}
                className="bg-teal-50 text-teal-700 py-3 px-4 rounded-xl text-sm font-medium hover:bg-teal-100 transition-colors"
              >
                💳 Pay Bills
              </button>
              <button 
                onClick={() => {
                  setShowQRModal(false);
                  navigate('/transactions');
                }}
                className="bg-blue-50 text-blue-700 py-3 px-4 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                📱 Mobile Recharge
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </>
  );
};

export default MobileBottomMenu;