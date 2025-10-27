import React from 'react';
import { Lock, Coins, Image } from 'lucide-react';
import { AccessType, getAccessTypeName } from '../contract';

export default function CreatePollModal({ 
  show, 
  onClose, 
  newPoll, 
  setNewPoll, 
  onCreate,
  createFee 
}) {
  if (!show) return null;

  const addOption = () => {
    if (newPoll.options.length < 6) {
      setNewPoll({ ...newPoll, options: [...newPoll.options, ''] });
    }
  };

  const updateOption = (index, value) => {
    const updated = [...newPoll.options];
    updated[index] = value;
    setNewPoll({ ...newPoll, options: updated });
  };

  const removeOption = (index) => {
    if (newPoll.options.length > 2) {
      const updated = newPoll.options.filter((_, i) => i !== index);
      setNewPoll({ ...newPoll, options: updated });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Create Secret Poll</h2>
          <p className="text-gray-600 text-sm mt-1">Votes are recorded on TEN blockchain • Fee: {createFee} ETH</p>
        </div>
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Poll Title</label>
            <input 
              type="text" 
              value={newPoll.title} 
              onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })} 
              placeholder="e.g., Which feature should we build next?" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors" 
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Description (optional)</label>
            <textarea 
              value={newPoll.description} 
              onChange={(e) => setNewPoll({ ...newPoll, description: e.target.value })} 
              placeholder="Add more context..." 
              rows={3} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none" 
            />
          </div>

          {/* 🆕 Access Type */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Access Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* PUBLIC */}
              <button
                type="button"
                onClick={() => setNewPoll({ 
                  ...newPoll, 
                  accessType: AccessType.PUBLIC,
                  tokenAddress: '',
                  minBalance: '0'
                })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  newPoll.accessType === AccessType.PUBLIC
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Lock className="w-5 h-5 mx-auto mb-2" />
                <div className="text-sm font-semibold">Public</div>
                <div className="text-xs opacity-70 mt-1">Everyone</div>
              </button>

              {/* ERC20 */}
              <button
                type="button"
                onClick={() => setNewPoll({ 
                  ...newPoll, 
                  accessType: AccessType.ERC20,
                  tokenAddress: '',
                  minBalance: '0'
                })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  newPoll.accessType === AccessType.ERC20
                    ? 'border-purple-600 bg-purple-600 text-white'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Coins className="w-5 h-5 mx-auto mb-2" />
                <div className="text-sm font-semibold">ERC20</div>
                <div className="text-xs opacity-70 mt-1">Token holders</div>
              </button>

              {/* ERC721 */}
              <button
                type="button"
                onClick={() => setNewPoll({ 
                  ...newPoll, 
                  accessType: AccessType.ERC721,
                  tokenAddress: '',
                  minBalance: '0'
                })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  newPoll.accessType === AccessType.ERC721
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Image className="w-5 h-5 mx-auto mb-2" />
                <div className="text-sm font-semibold">ERC721</div>
                <div className="text-xs opacity-70 mt-1">NFT holders</div>
              </button>
            </div>
          </div>

          {/* 🆕 Token Address & Min Balance (só aparece se não for PUBLIC) */}
          {newPoll.accessType !== AccessType.PUBLIC && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {newPoll.accessType === AccessType.ERC20 ? 'Token' : 'NFT'} Contract Address
                </label>
                <input 
                  type="text" 
                  value={newPoll.tokenAddress} 
                  onChange={(e) => setNewPoll({ ...newPoll, tokenAddress: e.target.value })} 
                  placeholder="0x..." 
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 transition-colors font-mono text-sm" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Minimum Balance Required
                </label>
                <input 
                  type="number" 
                  value={newPoll.minBalance} 
                  onChange={(e) => setNewPoll({ ...newPoll, minBalance: e.target.value })} 
                  placeholder="1" 
                  min="1"
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 transition-colors" 
                />
                <p className="text-xs text-gray-600 mt-2">
                  {newPoll.accessType === AccessType.ERC20 
                    ? 'Users need at least this many tokens to vote'
                    : 'Users need to own at least this many NFTs to vote'}
                </p>
              </div>
            </div>
          )}

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Options (2-6)</label>
            <div className="space-y-3">
              {newPoll.options.map((option, idx) => (
                <div key={idx} className="flex space-x-2">
                  <input 
                    type="text" 
                    value={option} 
                    onChange={(e) => updateOption(idx, e.target.value)} 
                    placeholder={`Option ${idx + 1}`} 
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors" 
                  />
                  {newPoll.options.length > 2 && (
                    <button 
                      onClick={() => removeOption(idx)} 
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {newPoll.options.length < 6 && (
              <button 
                onClick={addOption} 
                className="mt-3 text-sm text-gray-600 hover:text-black transition-colors"
              >
                + Add option
              </button>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Duration</label>
            <select 
              value={newPoll.duration} 
              onChange={(e) => setNewPoll({ ...newPoll, duration: Number(e.target.value) })} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
            >
              <option value={1}>1 hour</option>
              <option value={6}>6 hours</option>
              <option value={12}>12 hours</option>
              <option value={24}>24 hours</option>
              <option value={48}>2 days</option>
              <option value={168}>1 week</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={onCreate} 
            className="flex-1 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            Create Poll ({createFee} ETH)
          </button>
        </div>
      </div>
    </div>
  );
}