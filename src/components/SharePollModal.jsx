import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import QRCode from 'qrcode';

export default function SharePollModal({ show, onClose, pollId, pollTitle }) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const pollUrl = `${window.location.origin}/testnet?poll=${pollId}`;
  const shareText = `Vote on: ${pollTitle}`;

  useEffect(() => {
    if (show && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, pollUrl, {
        width: 200,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    }
  }, [show, pollUrl]);

  if (!show) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pollUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Social share URLs
  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pollUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pollUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(pollUrl)}&text=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pollUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pollUrl)}`,
    farcaster: `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(pollUrl)}`
  };

  const openShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Share Poll</h2>
              <p className="text-purple-100 text-sm">Spread the word!</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Poll Title */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">Poll #{pollId}</p>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {pollTitle}
            </h3>
          </div>

          {/* Social Share Buttons */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
              📱 Share on Social Media
            </p>
            <div className="grid grid-cols-3 gap-3">
              {/* Twitter/X */}
              <button
                onClick={() => openShare(socialLinks.twitter)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all group"
              >
                <svg className="w-6 h-6 mb-2 text-gray-700 group-hover:text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-xs font-medium text-gray-700 group-hover:text-black">X</span>
              </button>

              {/* Farcaster */}
              <button
                onClick={() => openShare(socialLinks.farcaster)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <svg className="w-6 h-6 mb-2 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.24 4.32h2.88v15.36h-2.88V7.2l-6.24 7.68L5.76 7.2v12.48H2.88V4.32h2.88l6.24 7.68 6.24-7.68z"/>
                </svg>
                <span className="text-xs font-medium text-purple-700 group-hover:text-purple-900">Farcaster</span>
              </button>

              {/* Telegram */}
              <button
                onClick={() => openShare(socialLinks.telegram)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <svg className="w-6 h-6 mb-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <span className="text-xs font-medium text-blue-600 group-hover:text-blue-800">Telegram</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => openShare(socialLinks.whatsapp)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <svg className="w-6 h-6 mb-2 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-xs font-medium text-green-700 group-hover:text-green-900">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => openShare(socialLinks.facebook)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <svg className="w-6 h-6 mb-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-xs font-medium text-blue-700 group-hover:text-blue-900">Facebook</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => openShare(socialLinks.linkedin)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 hover:border-blue-700 hover:bg-blue-50 transition-all group"
              >
                <svg className="w-6 h-6 mb-2 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-xs font-medium text-blue-800 group-hover:text-blue-950">LinkedIn</span>
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              📷 Scan QR Code
            </p>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl border-4 border-gray-100 shadow-lg">
                <canvas ref={canvasRef} />
              </div>
            </div>
          </div>

          {/* URL Copy */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
              Poll Link
            </p>
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

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition-all"
          >
            Done
          </button>
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