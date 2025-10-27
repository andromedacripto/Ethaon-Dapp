import { TenProvider } from '@ten-protocol/web-provider';

export const initTenProvider = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask not installed');
  }

  // Inicializa o TEN Provider
  const tenProvider = new TenProvider({
    provider: window.ethereum,
    chainId: 7006, // TEN Testnet
  });

  await tenProvider.initialize();
  
  return tenProvider;
};

// Gera uma viewing key para ver votos privados
export const generateViewingKey = async (tenProvider, contractAddress) => {
  const viewingKey = await tenProvider.generateViewingKey(contractAddress);
  return viewingKey;
};

// Descriptografa dados privados
export const decryptPrivateData = async (tenProvider, encryptedData, viewingKey) => {
  const decrypted = await tenProvider.decrypt(encryptedData, viewingKey);
  return decrypted;
};