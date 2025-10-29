import React, { useState, useEffect } from 'react';
import { RefreshCw, Lock, Wallet } from 'lucide-react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, AccessType } from './contract';
import { usePrivaVoting } from './usePrivaVoting';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TabNavigation from './components/TabNavigation';
import PollCard from './components/PollCard';
import EndedPollCard from './components/EndedPollCard';
import CreatePollModal from './components/CreatePollModal';
import PollCreatedModal from './components/PollCreatedModal';
import Footer from './components/Footer';

// Banner Component
const Banner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-4 sm:px-6 py-2.5 z-[99999]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm">
        <span className="text-base animate-pulse">⚡</span>
        <span className="font-semibold text-gray-900">Testnet</span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="text-gray-600">Cross-Chain Coming Soon</span>
        <span className="hidden md:inline text-gray-300">•</span>
        <span className="hidden md:inline text-gray-500 text-xs">Active early users may qualify for future rewards</span>
      </div>
    </div>
  );
};

export default function PrivaVotingDApp() {
  const [activeTab, setActiveTab] = useState('polls');
  const [polls, setPolls] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPollCreatedModal, setShowPollCreatedModal] = useState(false);
  const [createdPollData, setCreatedPollData] = useState({ id: null, title: '' });
  const [focusedPollId, setFocusedPollId] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [ensName, setEnsName] = useState(null);
  const [ensAvatar, setEnsAvatar] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [createFee, setCreateFee] = useState('0');
  const [voteFee, setVoteFee] = useState('0');
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    options: ['', ''],
    duration: 24,
    accessType: AccessType.PUBLIC,
    tokenAddress: '',
    minBalance: '0'
  });

  const privaVoting = usePrivaVoting(provider, signer);

  const TEN_CHAIN_ID = '0x7E7';
  const TEN_RPC_URL = 'https://testnet.ten.xyz';
  const TEN_NETWORK_NAME = 'TEN Testnet';

  // Função para buscar ENS e Avatar
  const lookupENS = async (address) => {
    try {
      // Usar mainnet provider para lookup de ENS
      const mainnetProvider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
      const ens = await mainnetProvider.lookupAddress(address);
      
      // Se encontrou ENS, buscar avatar
      if (ens) {
        try {
          const resolver = await mainnetProvider.getResolver(ens);
          if (resolver) {
            const avatar = await resolver.getAvatar();
            return { ens, avatar: avatar?.url || null };
          }
        } catch (error) {
          console.log('Avatar lookup failed:', error);
        }
      }
      
      return { ens, avatar: null };
    } catch (error) {
      console.log('ENS lookup failed:', error);
      return { ens: null, avatar: null };
    }
  };

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length > 0) {
          setProvider(web3Provider);
          const web3Signer = await web3Provider.getSigner();
          setSigner(web3Signer);
          setWalletAddress(accounts[0]);
          
          // Buscar ENS e Avatar
          const { ens, avatar } = await lookupENS(accounts[0]);
          setEnsName(ens);
          setEnsAvatar(avatar);
        }
      } catch (error) {
        console.error('Error checking wallet:', error);
      }
    }
  };

  const loadFees = async () => {
    const result = await privaVoting.getFees();
    if (result.success) {
      setCreateFee(result.createPollFee);
      setVoteFee(result.voteFee);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this dApp!');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: TEN_CHAIN_ID }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: TEN_CHAIN_ID,
                chainName: TEN_NETWORK_NAME,
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: [TEN_RPC_URL],
                blockExplorerUrls: ['https://testnet.tenscan.io']
              }]
            });
          } catch (addError) {
            console.error('Error adding network:', addError);
            alert('Failed to add TEN network');
            setIsConnecting(false);
            return;
          }
        }
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      
      setProvider(web3Provider);
      setSigner(web3Signer);
      setWalletAddress(accounts[0]);
      
      // Buscar ENS e Avatar
      const { ens, avatar } = await lookupENS(accounts[0]);
      setEnsName(ens);
      setEnsAvatar(avatar);
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setEnsName(null);
    setEnsAvatar(null);
    setProvider(null);
    setSigner(null);
    setPolls([]);
  };

  const loadPolls = async () => {
    if (!provider) return;
    
    setIsLoading(true);
    try {
      const countResult = await privaVoting.getPollCount();
      if (!countResult.success) {
        console.error('Failed to get poll count');
        setIsLoading(false);
        return;
      }

      const pollCount = countResult.count;
      const allPolls = [];

      for (let i = 1; i <= pollCount; i++) {
        try {
          const pollInfoResult = await privaVoting.getPollInfo(i);
          if (!pollInfoResult.success) continue;

          const pollInfo = pollInfoResult.data;
          
          const poll = {
            id: i,
            title: pollInfo.title,
            description: pollInfo.description,
            options: pollInfo.options,
            deadline: pollInfo.deadline * 1000,
            creator: pollInfo.creator,
            totalVotes: pollInfo.totalVotes,
            isActive: pollInfo.isActive,
            resultsRevealed: pollInfo.resultsRevealed,
            accessType: pollInfo.accessType,
            tokenAddress: pollInfo.tokenAddress,
            minBalance: pollInfo.minBalance
          };

          if (walletAddress) {
            const canVoteResult = await privaVoting.canVote(i, walletAddress);
            poll.canVote = canVoteResult.success && canVoteResult.canVote;
            poll.canVoteReason = canVoteResult.reason || '';

            const hasVotedResult = await privaVoting.hasUserVoted(i, walletAddress);
            poll.userVoted = hasVotedResult.success && hasVotedResult.hasVoted;
            
            if (poll.userVoted) {
              try {
                const userVoteResult = await privaVoting.getUserVote(i, walletAddress);
                if (userVoteResult.success) {
                  poll.userVoteOption = userVoteResult.voteIndex;
                }
              } catch (error) {
                console.log('Could not get user vote for poll', i);
              }
            }
          }

          if (poll.resultsRevealed) {
            try {
              const resultsResult = await privaVoting.getPollResults(i);
              if (resultsResult.success) {
                poll.results = resultsResult.data;
              }
            } catch (error) {
              console.log('Could not get results for poll', i);
            }
          }

          allPolls.push(poll);
        } catch (error) {
          console.error(`Error loading poll ${i}:`, error);
        }
      }

      setPolls(allPolls);
    } catch (error) {
      console.error('Error loading polls:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPoll = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!newPoll.title || newPoll.options.filter(o => o.trim()).length < 2) {
      alert('Please add title and at least 2 options');
      return;
    }

    if (newPoll.accessType !== AccessType.PUBLIC) {
      if (!newPoll.tokenAddress || newPoll.tokenAddress.trim() === '') {
        alert('Please enter token/NFT contract address');
        return;
      }
      if (!newPoll.minBalance || parseFloat(newPoll.minBalance) <= 0) {
        alert('Please enter minimum balance required');
        return;
      }
    }

    try {
      const filteredOptions = newPoll.options.filter(o => o.trim());

      const pollData = {
        title: newPoll.title,
        description: newPoll.description,
        options: filteredOptions,
        durationInHours: newPoll.duration,
        accessType: newPoll.accessType,
        tokenAddress: newPoll.accessType === AccessType.PUBLIC 
          ? ethers.ZeroAddress 
          : newPoll.tokenAddress,
        minBalance: newPoll.accessType === AccessType.PUBLIC 
          ? 0 
          : ethers.parseUnits(newPoll.minBalance.toString(), 0)
      };

      alert('Creating poll... Please wait for confirmation.');
      
      const result = await privaVoting.createPoll(pollData);

      if (result.success) {
        // Guardar dados e mostrar modal de sucesso
        setCreatedPollData({ 
          id: result.pollId, 
          title: newPoll.title 
        });
        setShowCreateModal(false);
        setShowPollCreatedModal(true);
        
        setNewPoll({ 
          title: '', 
          description: '', 
          options: ['', ''], 
          duration: 24,
          accessType: AccessType.PUBLIC,
          tokenAddress: '',
          minBalance: '0'
        });
        await loadPolls();
      } else {
        alert('Failed to create poll: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating poll:', error);
      alert('Failed to create poll: ' + error.message);
    }
  };

  const submitVote = async (pollId, optionIndex) => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      alert('Submitting vote... Please wait for confirmation.');
      
      const result = await privaVoting.vote(pollId, optionIndex);

      if (result.success) {
        alert('Vote recorded successfully! 🎉');
        await loadPolls();
      } else {
        alert('Failed to vote: ' + result.error);
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote: ' + error.message);
    }
  };

  const revealResults = async (pollId) => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      alert('Revealing results... Please wait for confirmation.');
      
      const result = await privaVoting.revealResults(pollId);

      if (result.success) {
        alert('Results revealed successfully! 🎉');
        await loadPolls();
      } else {
        alert('Failed to reveal results: ' + result.error);
      }
    } catch (error) {
      console.error('Error revealing results:', error);
      alert('Failed to reveal results: ' + error.message);
    }
  };

  useEffect(() => {
    checkWalletConnection();
    
    // Detectar poll ID na URL
    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get('poll');
    if (pollId) {
      setFocusedPollId(parseInt(pollId));
    }
  }, []);

  useEffect(() => {
    if (provider && signer) {
      loadFees();
      loadPolls();
    }
  }, [provider, signer, focusedPollId]); // Adicionar focusedPollId como dependência

  const activePolls = polls.filter(p => p.isActive).reverse();
  const endedPolls = polls.filter(p => !p.isActive).reverse();

  // Exibir ENS ou endereço encurtado
  const displayAddress = ensName || (walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : null);

  // Se tiver focusedPollId, pegar só essa poll
  const focusedPoll = focusedPollId ? polls.find(p => p.id === focusedPollId) : null;

  // Modo focused: mostrar só uma poll
  if (focusedPollId && focusedPoll) {
    return (
      <div className="min-h-screen bg-white pt-10">
        <Banner />
        
        <Header
          walletAddress={walletAddress}
          displayAddress={displayAddress}
          ensAvatar={ensAvatar}
          isConnecting={isConnecting}
          isLoading={isLoading || privaVoting.loading}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
          onRefresh={loadPolls}
          onCreatePoll={() => setShowCreateModal(true)}
        />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
          {/* Back Button */}
          <button
            onClick={() => {
              setFocusedPollId(null);
              window.history.pushState({}, '', '/testnet');
            }}
            className="mb-6 text-gray-600 hover:text-black transition-colors flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to all polls</span>
          </button>

          {/* Connect Wallet Warning */}
          {!walletAddress && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start space-x-3">
                <Wallet className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Connect Your Wallet</h3>
                  <p className="text-sm text-yellow-700">
                    Connect to TEN Protocol Testnet to vote. Fees: {createFee} ETH to create, {voteFee} ETH to vote.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {(isLoading || privaVoting.loading) && (
            <div className="text-center py-16">
              <RefreshCw className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading poll...</p>
            </div>
          )}

          {/* Poll não encontrada */}
          {!isLoading && !privaVoting.loading && !focusedPoll && (
            <div className="text-center py-16">
              <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Poll not found</h3>
              <p className="text-gray-600 mb-6">This poll doesn't exist or hasn't loaded yet.</p>
              <button
                onClick={() => {
                  setFocusedPollId(null);
                  window.history.pushState({}, '', '/testnet');
                }}
                className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
              >
                View all polls
              </button>
            </div>
          )}

          {/* Mostrar a Poll */}
          {!isLoading && !privaVoting.loading && focusedPoll && (
            <PollCard
              poll={focusedPoll}
              onVote={submitVote}
              walletAddress={walletAddress}
            />
          )}
        </main>

        <CreatePollModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          newPoll={newPoll}
          setNewPoll={setNewPoll}
          onCreate={createPoll}
          createFee={createFee}
        />

        <PollCreatedModal
          show={showPollCreatedModal}
          onClose={() => setShowPollCreatedModal(false)}
          pollId={createdPollData.id}
          pollTitle={createdPollData.title}
        />

        <Footer />
      </div>
    );
  }

  // Modo normal: mostrar todas as polls
  return (
    <div className="min-h-screen bg-white pt-10">
      <Banner />
      
      <Header
        walletAddress={walletAddress}
        displayAddress={displayAddress}
        ensAvatar={ensAvatar}
        isConnecting={isConnecting}
        isLoading={isLoading || privaVoting.loading}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onRefresh={loadPolls}
        onCreatePoll={() => setShowCreateModal(true)}
      />

      <StatsCards polls={polls} activePolls={activePolls} />

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCount={activePolls.length}
        endedCount={endedPolls.length}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
        {!walletAddress && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Wallet className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Connect Your Wallet</h3>
                <p className="text-sm text-yellow-700">
                  Connect to TEN Protocol Testnet. Fees: {createFee} ETH to create, {voteFee} ETH to vote.
                </p>
              </div>
            </div>
          </div>
        )}

        {(isLoading || privaVoting.loading) && (
          <div className="text-center py-16">
            <RefreshCw className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Loading polls from blockchain...</p>
          </div>
        )}

        {!isLoading && !privaVoting.loading && activeTab === 'polls' && (
          <div className="space-y-4">
            {activePolls.length === 0 ? (
              <div className="text-center py-16">
                <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No active polls</h3>
                <p className="text-gray-600 mb-6">Create the first on-chain poll!</p>
                {walletAddress && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
                  >
                    Create Poll
                  </button>
                )}
              </div>
            ) : (
              activePolls.map(poll => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  onVote={submitVote}
                  walletAddress={walletAddress}
                />
              ))
            )}
          </div>
        )}

        {!isLoading && !privaVoting.loading && activeTab === 'ended' && (
          <div className="space-y-4">
            {endedPolls.length === 0 ? (
              <div className="text-center py-16">
                <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No ended polls</h3>
                <p className="text-gray-600">Results will appear here after deadline</p>
              </div>
            ) : (
              endedPolls.map(poll => (
                <EndedPollCard 
                  key={poll.id} 
                  poll={poll}
                  onReveal={revealResults}
                  walletAddress={walletAddress}
                />
              ))
            )}
          </div>
        )}
      </main>

      <CreatePollModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        newPoll={newPoll}
        setNewPoll={setNewPoll}
        onCreate={createPoll}
        createFee={createFee}
      />

      <PollCreatedModal
        show={showPollCreatedModal}
        onClose={() => setShowPollCreatedModal(false)}
        pollId={createdPollData.id}
        pollTitle={createdPollData.title}
      />

      <Footer />
    </div>
  );
}