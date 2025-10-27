import React from 'react';
import { Vote, TrendingUp, Users } from 'lucide-react';

export default function StatsCards({ polls, activePolls }) {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <Vote className="w-8 h-8 text-black mb-2" />
            <p className="text-2xl font-bold text-black">{polls.length}</p>
            <p className="text-sm text-gray-600">Total Polls</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <TrendingUp className="w-8 h-8 text-black mb-2" />
            <p className="text-2xl font-bold text-black">{activePolls.length}</p>
            <p className="text-sm text-gray-600">Active Polls</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <Users className="w-8 h-8 text-black mb-2" />
            <p className="text-2xl font-bold text-black">
              {polls.filter(p => p.userVoted).length}
            </p>
            <p className="text-sm text-gray-600">Your Votes</p>
          </div>
        </div>
      </div>
    </div>
  );
}