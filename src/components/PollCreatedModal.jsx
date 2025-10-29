import React, { useState } from 'react';
import { CheckCircle, Copy, Check, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function PollCreatedModal({ show, onClose, pollId, pollTitle }) {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const pollUrl = `${window.location.origin}/testnet?poll=${pollId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pollUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in">
        {/* Success Header */}
        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Poll Created!</h2>
            <p className="text-green-100">Your poll is now live on-chain 🎉</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Poll Info */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border-2 border-purple-200">
            <p className="text-xs text-purple-600 font-semibold mb-1">POLL ID #{pollId}</p>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
              {pollTitle}
            </h3>
          </div>

          {/* QR Code Section */}
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              📱 Share with voters
            </p>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl border-4 border-gray-100 shadow-lg">
                <QRCodeSVG
                  value={pollUrl}
                  size={200}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>
          </div>

          {/* URL Copy */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-semibold">POLL LINK</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={pollUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-700 font-mono outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              View Poll
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}