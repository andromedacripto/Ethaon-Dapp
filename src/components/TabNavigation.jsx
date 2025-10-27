import React from 'react';

export default function TabNavigation({ activeTab, setActiveTab, activeCount, endedCount }) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('polls')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'polls'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Active Polls ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab('ended')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'ended'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ended Polls ({endedCount})
          </button>
        </nav>
      </div>
    </div>
  );
}