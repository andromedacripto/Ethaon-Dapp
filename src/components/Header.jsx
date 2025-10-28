import React, { useState, useEffect } from 'react';
import { Lock, Wallet, LogOut, RefreshCw, Plus, Zap } from 'lucide-react';
import { ethers } from 'ethers';

export default function Header({ 
  walletAddress,
  displayAddress,
  ensAvatar,
  isConnecting, 
  isLoading,
  onConnect, 
  onDisconnect, 
  onRefresh,
  onCreatePoll 
}) {
  const [ethBalance, setEthBalance] = useState('0.00');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  // Buscar saldo ETH
  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) {
        setEthBalance('0.00');
        return;
      }

      try {
        setIsLoadingBalance(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(walletAddress);
        const formatted = parseFloat(ethers.formatEther(balance)).toFixed(4);
        setEthBalance(formatted);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setEthBalance('0.00');
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6); }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .glow-border {
          position: relative;
          background: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
        }
        .glow-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(145deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <header className="relative bg-black text-white border-b border-gray-800 sticky top-0 z-50">
        {/* Faucet Banner */}
        <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 py-2 overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a 
              href="https://faucet.ten.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 text-white hover:text-yellow-300 transition-colors group"
            >
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold">
                Need testnet tokens? Get free ETH from TEN Faucet
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10 shimmer"></div>
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white to-gray-200 p-2.5 rounded-xl transform group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-black" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Ethaon
                </h1>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <Zap className="w-3 h-3 text-purple-400" />
                  Secret Voting on TEN & Cross-Chain
                </p>
              </div>
            </div>
            
            {/* Actions Section */}
            <div className="flex items-center space-x-3">
              {/* Refresh Button */}
              {walletAddress && (
                <button
                  onClick={onRefresh}
                  disabled={isLoading}
                  className="relative group bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-purple-500/50 text-white px-4 py-2.5 rounded-xl transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <RefreshCw className={`w-5 h-5 relative z-10 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              )}
              
              {/* Connect Wallet or Wallet Info */}
              {!walletAddress ? (
                <button
                  onClick={onConnect}
                  disabled={isConnecting}
                  className="relative group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 overflow-hidden shadow-lg shadow-purple-500/20"
                >
                  <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  <Wallet className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              ) : (
                <>
                  {/* ETH Balance */}
                  <div className="glow-border bg-gray-900/80 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1.5">
                        <svg className="w-4 h-4 text-purple-400" viewBox="0 0 320 512" fill="currentColor">
                          <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/>
                        </svg>
                        <span className="text-white font-bold font-mono">
                          {isLoadingBalance ? '...' : ethBalance}
                        </span>
                        <span className="text-gray-400 text-sm">ETH</span>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Address with Avatar */}
                  <div className="glow-border bg-gray-900/80 backdrop-blur-sm px-4 py-2.5 rounded-xl flex items-center space-x-2">
                    {ensAvatar ? (
                      <img 
                        src={ensAvatar} 
                        alt="ENS Avatar" 
                        className="w-6 h-6 rounded-full border-2 border-purple-500/50"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    ) : (
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                    )}
                    <span className="text-sm font-mono text-gray-300">{displayAddress}</span>
                  </div>

                  {/* Disconnect Button */}
                  <button
                    onClick={onDisconnect}
                    className="relative group bg-gray-900 hover:bg-red-900/50 border border-gray-800 hover:border-red-500/50 text-white px-4 py-2.5 rounded-xl transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>

                  {/* Create Poll Button */}
                  <button
                    onClick={onCreatePoll}
                    className="relative group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 overflow-hidden shadow-lg shadow-purple-500/20"
                  >
                    <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <Plus className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Create Poll</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </header>
    </>
  );
}