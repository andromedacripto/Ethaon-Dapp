import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, AccessType } from './contract';

export const usePrivaVoting = (provider, signer) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get contract instance
  const getContract = useCallback((needsSigner = false) => {
    if (!provider) throw new Error('Provider not available');
    const signerOrProvider = needsSigner ? signer : provider;
    if (needsSigner && !signer) throw new Error('Signer required for this action');
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
  }, [provider, signer]);

  // Create Poll
  const createPoll = useCallback(async (pollData) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(true);
      const { 
        title, 
        description, 
        options, 
        durationInHours, 
        accessType = AccessType.PUBLIC, 
        tokenAddress = ethers.ZeroAddress, 
        minBalance = 0 
      } = pollData;
      
      // Get create poll fee
      const createPollFee = await contract.createPollFee();
      
      // Create poll transaction
      const tx = await contract.createPoll(
        title,
        description,
        options,
        durationInHours,
        accessType,
        tokenAddress,
        minBalance,
        { value: createPollFee }
      );
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      // Extract pollId from event
      let pollId = null;
      for (const log of receipt.logs) {
        try {
          const parsed = contract.interface.parseLog(log);
          if (parsed.name === 'PollCreated') {
            pollId = parsed.args.pollId;
            break;
          }
        } catch (e) {
          // Skip logs that can't be parsed
        }
      }
      
      setLoading(false);
      return { success: true, pollId: pollId ? Number(pollId) : null, txHash: receipt.hash };
    } catch (err) {
      console.error('Create poll error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Vote
  const vote = useCallback(async (pollId, optionIndex) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(true);
      
      // Get vote fee
      const voteFee = await contract.voteFee();
      
      // Vote transaction
      const tx = await contract.vote(pollId, optionIndex, { value: voteFee });
      const receipt = await tx.wait();
      
      setLoading(false);
      return { success: true, txHash: receipt.hash };
    } catch (err) {
      console.error('Vote error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Reveal Results
  const revealResults = useCallback(async (pollId) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(true);
      const tx = await contract.revealResults(pollId);
      const receipt = await tx.wait();
      
      setLoading(false);
      return { success: true, txHash: receipt.hash };
    } catch (err) {
      console.error('Reveal results error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Get Poll Info
  const getPollInfo = useCallback(async (pollId) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(false);
      const info = await contract.getPollInfo(pollId);
      
      const pollInfo = {
        title: info.title,
        description: info.description,
        options: info.options,
        deadline: Number(info.deadline),
        creator: info.creator,
        totalVotes: Number(info.totalVotes),
        isActive: info.isActive,
        resultsRevealed: info.resultsRevealed,
        accessType: Number(info.accessType),
        tokenAddress: info.tokenAddress,
        minBalance: info.minBalance.toString()
      };
      
      setLoading(false);
      return { success: true, data: pollInfo };
    } catch (err) {
      console.error('Get poll info error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Get Poll Results
  const getPollResults = useCallback(async (pollId) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(false);
      const results = await contract.getPollResults(pollId);
      
      const resultsArray = results.map(r => Number(r));
      
      setLoading(false);
      return { success: true, data: resultsArray };
    } catch (err) {
      console.error('Get poll results error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Check if user can vote
  const canVote = useCallback(async (pollId, voterAddress) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(false);
      const result = await contract.canVote(pollId, voterAddress);
      
      setLoading(false);
      return { success: true, canVote: result[0], reason: result[1] };
    } catch (err) {
      console.error('Can vote error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Check if user has voted
  const hasUserVoted = useCallback(async (pollId, userAddress) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(false);
      const hasVoted = await contract.hasUserVoted(pollId, userAddress);
      
      setLoading(false);
      return { success: true, hasVoted };
    } catch (err) {
      console.error('Has user voted error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Get user vote
  const getUserVote = useCallback(async (pollId, userAddress) => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(false);
      const voteIndex = await contract.getUserVote(pollId, userAddress);
      
      setLoading(false);
      return { success: true, voteIndex: Number(voteIndex) };
    } catch (err) {
      console.error('Get user vote error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Get poll count
  const getPollCount = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(false);
      const count = await contract.pollCount();
      
      setLoading(false);
      return { success: true, count: Number(count) };
    } catch (err) {
      console.error('Get poll count error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  // Get fees
  const getFees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const contract = getContract(false);
      const createFee = await contract.createPollFee();
      const voteFee = await contract.voteFee();
      
      setLoading(false);
      return {
        success: true,
        createPollFee: ethers.formatEther(createFee),
        voteFee: ethers.formatEther(voteFee)
      };
    } catch (err) {
      console.error('Get fees error:', err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [getContract]);

  return {
    loading,
    error,
    createPoll,
    vote,
    revealResults,
    getPollInfo,
    getPollResults,
    canVote,
    hasUserVoted,
    getUserVote,
    getPollCount,
    getFees,
    CONTRACT_ADDRESS
  };
};