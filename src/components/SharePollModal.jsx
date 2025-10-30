import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, Share2, Download } from 'lucide-react';
import QRCode from 'qrcode';

export default function SharePollModal({ show, onClose, pollId, pollTitle }) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const pollUrl = `${window.location.origin}/testnet?poll=${pollId}`;
  const shareText = `Vote on: ${pollTitle}`;

  useEffect(() => {
    if (show && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, pollUrl, {
        width: 180,
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

  const downloadQR = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `poll-${pollId}-qr.png`;
      link.href = url;
      link.click();
    }
  };

  // Social share URLs
  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pollUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(pollUrl)}&text=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pollUrl)}`,
    farcaster: `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(pollUrl)}`
  };

  const socialButtons = [
    {
      name: 'X',
      color: 'hover:bg-gray-900',
      textColor: 'text-gray-900',
      url: socialLinks.twitter,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Farcaster',
      color: 'hover:bg-purple-600',
      textColor: 'text-purple-600',
      url: socialLinks.farcaster,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.24 4.32h2.88v15.36h-2.88V7.2l-6.24 7.68L5.76 7.2v12.48H2.88V4.32h2.88l6.24 7.68 6.24-7.68z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      color: 'hover:bg-blue-500',
      textColor: 'text-blue-500',
      url: socialLinks.telegram,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      color: 'hover:bg-green-500',
      textColor: 'text-green-600',
      url: socialLinks.whatsapp,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    }
  ];

  const openShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 animate-slide-up overflow-hidden">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Share Poll</h2>
              <p className="text-white/80 text-sm">Spread the word across the web</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Poll Info */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-4 border border-gray-600">
            <p className="text-xs text-gray-400 font-semibold mb-1">POLL #{pollId}</p>
            <h3 className="text-base font-bold text-white line-clamp-2">
              {pollTitle}
            </h3>
          </div>

          {/* Social Share Grid */}
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-4 text-center">
              Share on Social Media
            </p>
            <div className="grid grid-cols-4 gap-3">
              {socialButtons.map((social) => (
                <button
                  key={social.name}
                  onClick={() => openShare(social.url)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-gray-500 transition-all group ${social.color}`}
                >
                  <div className={`${social.textColor} group-hover:text-white transition-colors mb-2`}>
                    {social.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                    {social.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <p className="text-sm font-semibold text-gray-300 mb-4 text-center">
              QR Code
            </p>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <canvas ref={canvasRef} />
              </div>
              <button
                onClick={downloadQR}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download QR Code</span>
              </button>
            </div>
          </div>

          {/* URL Copy */}
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
            <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">
              Direct Link
            </p>
            <div className="flex items-center space-x-2 bg-gray-900/50 rounded-xl p-3 border border-gray-700">
              <input
                type="text"
                value={pollUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-300 font-mono outline-none"
              />
              <button
                onClick={copyToClipboard}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                }`}
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
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all border border-gray-600"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}