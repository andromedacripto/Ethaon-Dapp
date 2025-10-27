import React from 'react';
import { Clock, Users, EyeOff, Vote, Lock, Coins, Image, AlertCircle } from 'lucide-react';
import { AccessType, getAccessTypeName } from '../contract';

export default function PollCard({ poll, onVote, walletAddress }) {
  const getTimeRemaining = (deadline) => {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return 'Ended';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h remaining`;
    return `${hours}h remaining`;
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // 🆕 Ícone e cor baseado no tipo de acesso
  const getAccessBadge = () => {
    switch (poll.accessType) {
      case AccessType.PUBLIC:
        return {
          icon: <Lock className="w-3 h-3" />,
          text: 'Public',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300'
        };
      case AccessType.ERC20:
        return {
          icon: <Coins className="w-3 h-3" />,
          text: 'ERC20 Holders',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          borderColor: 'border-purple-300'
        };
      case AccessType.ERC721:
        return {
          icon: <Image className="w-3 h-3" />,
          text: 'NFT Holders',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-300'
        };
      default:
        return {
          icon: <Lock className="w-3 h-3" />,
          text: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300'
        };
    }
  };

  const accessBadge = getAccessBadge();

  // 🆕 Verificar se usuário pode votar
  const canUserVote = poll.canVote !== false; // Se não tiver a prop, assume true (backward compatibility)
  const voteBlockedReason = poll.canVoteReason || '';

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
            <h3 className="text-xl font-bold text-black">{poll.title}</h3>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">#{poll.id}</span>
            
            {/* 🆕 Access Type Badge */}
            <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded border ${accessBadge.bgColor} ${accessBadge.textColor} ${accessBadge.borderColor}`}>
              {accessBadge.icon}
              <span>{accessBadge.text}</span>
            </span>
          </div>

          {poll.description && (
            <p className="text-gray-600 mb-4">{poll.description}</p>
          )}

          {/* 🆕 Token/NFT Requirements (se não for público) */}
          {poll.accessType !== AccessType.PUBLIC && (
            <div className="mb-3 text-xs text-gray-600 bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div className="flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>
                  Requires: {poll.minBalance} {poll.accessType === AccessType.ERC20 ? 'tokens' : 'NFTs'} 
                  {' '}from {truncateAddress(poll.tokenAddress)}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-600 flex-wrap gap-2">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{getTimeRemaining(poll.deadline)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{poll.totalVotes} votes</span>
            </div>
            {!poll.userVoted ? (
              <div className="flex items-center space-x-1 text-green-600">
                <EyeOff className="w-4 h-4" />
                <span>Secret until deadline</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-blue-600">
                <Vote className="w-4 h-4" />
                <span>You voted</span>
              </div>
            )}
            <div className="flex items-center space-x-1 text-gray-500">
              <span className="text-xs">by {truncateAddress(poll.creator)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🆕 Warning se usuário não pode votar */}
      {walletAddress && !canUserVote && !poll.userVoted && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
            <div className="text-sm text-red-700">
              <strong>Cannot vote:</strong> {voteBlockedReason || 'Requirements not met'}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {poll.options.map((option, idx) => {
          const isDisabled = poll.userVoted || !walletAddress || !canUserVote;
          const isUserChoice = poll.userVoted && poll.userVoteOption === idx;

          return (
            <button
              key={idx}
              onClick={() => onVote(poll.id, idx)}
              disabled={isDisabled}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                isUserChoice
                  ? 'border-black bg-black text-white'
                  : isDisabled
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'border-gray-200 hover:border-black hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {isUserChoice && (
                  <span className="text-sm">✓ Your Vote</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      {!walletAddress && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Connect wallet to vote
        </p>
      )}
    </div>
  );
}