// contract.js
// Endereço do contrato NOVO com suporte a ERC20/ERC721
export const CONTRACT_ADDRESS = "0x781Dd95Db9a604eC9Ca4C9693Abce52614679AEe";

// AccessType enum
export const AccessType = {
  PUBLIC: 0,
  ERC20: 1,
  ERC721: 2
};

// ABI do contrato COMPLETA - Agora com suporte a token-gating!
export const CONTRACT_ABI = [
  // Constructor
  "constructor()",
  
  // Criar Poll (ATUALIZADO - agora com accessType, tokenAddress e minBalance)
  "function createPoll(string _title, string _description, string[] _options, uint256 _durationInHours, uint8 _accessType, address _tokenAddress, uint256 _minBalance) external payable returns (uint256)",
  
  // Votar
  "function vote(uint256 _pollId, uint256 _optionIndex) external payable",
  
  // Revelar resultados
  "function revealResults(uint256 _pollId) external",
  
  // Verificar se pode votar (NOVO!)
  "function canVote(uint256 _pollId, address _voter) public view returns (bool, string memory)",
  
  // Informações da Poll (ATUALIZADO - agora retorna accessType, tokenAddress, minBalance)
  "function getPollInfo(uint256 _pollId) external view returns (string title, string description, string[] options, uint256 deadline, address creator, uint256 totalVotes, bool isActive, bool resultsRevealed, uint8 accessType, address tokenAddress, uint256 minBalance)",
  
  // Resultados da Poll
  "function getPollResults(uint256 _pollId) external view returns (uint256[] memory)",
  
  // Verificar se usuário votou
  "function hasUserVoted(uint256 _pollId, address _user) external view returns (bool)",
  
  // Ver voto do usuário
  "function getUserVote(uint256 _pollId, address _user) external view returns (uint256)",
  
  // Contador de polls
  "function pollCount() external view returns (uint256)",
  
  // Taxas
  "function createPollFee() external view returns (uint256)",
  "function voteFee() external view returns (uint256)",
  
  // Owner
  "function owner() external view returns (address)",
  
  // Funções admin
  "function withdrawFees() external",
  "function updateCreatePollFee(uint256 _newFee) external",
  "function updateVoteFee(uint256 _newFee) external",
  
  // Eventos
  "event PollCreated(uint256 indexed pollId, address indexed creator, string title, uint256 deadline, uint8 accessType, address tokenAddress, uint256 minBalance)",
  "event VoteCast(uint256 indexed pollId, address indexed voter)",
  "event ResultsRevealed(uint256 indexed pollId)"
];

// Helper para formatar tipo de acesso
export const getAccessTypeName = (accessType) => {
  switch (accessType) {
    case AccessType.PUBLIC:
      return "Público";
    case AccessType.ERC20:
      return "Holders de Token (ERC20)";
    case AccessType.ERC721:
      return "Holders de NFT (ERC721)";
    default:
      return "Desconhecido";
  }
};

// Helper para validar endereço zero
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
