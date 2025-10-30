import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Share2 } from 'lucide-react';
import SharePollModal from './SharePollModal';

export default function EndedPollCard({ poll, onReveal, walletAddress }) {
  const [showShareModal, setShowShareModal] = useState(false);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isCreator = walletAddress && poll.creator.toLowerCase() === walletAddress.toLowerCase();

  return (
    <>
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-500">Poll Ended</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{poll.title}</h3>
            {poll.description && (
              <p className="text-gray-600 text-sm mb-3">{poll.description}</p>
            )}
            <p className="text-xs text-gray-500">
              Ended on {formatDate(poll.deadline)}
            </p>
          </div>

          {/* 🆕 BOTÃO SHARE */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all text-sm font-medium"
            title="Share poll"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        <div className="border-t-2 border-gray-100 pt-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-700">
              Total Votes: {poll.totalVotes}
            </p>
            
            {/* INDICADOR DE STATUS DOS RESULTADOS */}
            {poll.resultsRevealed ? (
              <div className="flex items-center space-x-2 text-green-600">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Results Public</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-orange-600">
                <EyeOff className="w-4 h-4" />
                <span className="text-sm font-medium">Results Hidden 🔒</span>
              </div>
            )}
          </div>

          {/* BOTÃO REVEAL (só aparece se não revelado e é o criador) */}
          {!poll.resultsRevealed && isCreator && (
            <div className="mb-4 bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-900 mb-1">
                    🔒 Results are still encrypted!
                  </h4>
                  <p className="text-sm text-orange-700 mb-3">
                    You're the creator. Click below to reveal results to everyone.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onReveal(poll.id)}
                className="w-full bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-700 transition-all flex items-center justify-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>Reveal Results</span>
              </button>
            </div>
          )}

          {/* MENSAGEM SE NÃO FOR O CRIADOR E RESULTADOS NÃO REVELADOS */}
          {!poll.resultsRevealed && !isCreator && (
            <div className="mb-4 bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <EyeOff className="w-6 h-6 text-gray-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Results Not Revealed Yet
                  </h4>
                  <p className="text-sm text-gray-600">
                    The poll creator hasn't revealed the results yet. Thanks to TEN Protocol encryption, votes remain private! 🔒
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* RESULTADOS (só mostra se revelados) */}
          {poll.resultsRevealed && poll.results ? (
            <div className="space-y-3">
              {poll.options.map((option, index) => {
                const votes = poll.results[index] || 0;
                const percentage = poll.totalVotes > 0 
                  ? ((votes / poll.totalVotes) * 100).toFixed(1)
                  : 0;
                const isWinning = votes > 0 && votes === Math.max(...poll.results);

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${isWinning ? 'text-green-700' : 'text-gray-700'}`}>
                        {option} {isWinning && '👑'}
                      </span>
                      <span className="text-gray-600 font-semibold">
                        {votes} votes ({percentage}%)
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isWinning 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : poll.resultsRevealed && (
            <p className="text-center text-gray-500 text-sm py-4">
              No results available
            </p>
          )}

          {/* MOSTRA SEU VOTO (se votou) */}
          {poll.userVoted !== undefined && poll.userVoted && (
            <div className="mt-4 pt-4 border-t-2 border-gray-100">
              <p className="text-xs text-gray-500">
                Your vote: <span className="font-semibold text-gray-700">
                  {poll.options[poll.userVoteOption]}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Compartilhamento */}
      <SharePollModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        pollId={poll.id}
        pollTitle={poll.title}
      />
    </>
  );
}