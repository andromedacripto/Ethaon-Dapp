import React, { useState } from 'react';
import { Lock, EyeOff, Unlock, TrendingUp, Linkedin, X, Briefcase, HelpCircle, FileText, Shield } from 'lucide-react';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);

  const openDoc = (docType) => {
    setActiveDoc(docType);
  };

  const closeDoc = () => {
    setActiveDoc(null);
  };

  return (
    <>
      <footer className="bg-black text-white border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-xl">Ethaon</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Secret voting powered by TEN Protocol's encrypted blockchain. 
                Your votes remain private until the deadline.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center space-x-2">
                  <EyeOff className="w-4 h-4" />
                  <span>100% Private Voting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Encrypted on TEN</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Unlock className="w-4 h-4" />
                  <span>Results Auto-Reveal</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => openDoc('faq')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>FAQ</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openDoc('terms')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Terms of Service</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openDoc('privacy')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <div className="space-y-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                
                <button
                  disabled
                  className="flex items-center space-x-2 text-gray-600 cursor-not-allowed opacity-50 relative group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Discord (Coming Soon)</span>
                  <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Creating server...
                  </span>
                </button>
                
                <button
                  disabled
                  className="flex items-center space-x-2 text-gray-600 cursor-not-allowed opacity-50 relative group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X (Coming Soon)</span>
                  <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Creating account...
                  </span>
                </button>
                
                <a 
                  href="https://ten.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>TEN Protocol</span>
                </a>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors w-full text-left"
                >
                  <img 
                    src="https://i.postimg.cc/pLQdsBnM/Whats-App-Image-2025-10-26-at-02-58-51.jpg"
                    alt="Team Core"
                    className="w-5 h-5 rounded-full object-cover border border-gray-700"
                  />
                  <span>Team Core</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 Ethaon. Built with privacy in mind.</p>
            <p className="mt-2 md:mt-0">Powered by TEN Protocol</p>
          </div>
        </div>
      </footer>

      {/* MODAL TEAM CORE */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          style={{animation: 'fadeIn 0.3s ease-out'}}
          onClick={() => setIsModalOpen(false)}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          
          <div 
            className="relative bg-black rounded-2xl max-w-3xl w-full border border-gray-800 shadow-2xl overflow-hidden"
            style={{animation: 'slideUp 0.4s ease-out'}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-32 bg-black">
              <div className="absolute inset-0 bg-black"></div>
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-gray-900/80 hover:bg-red-600 p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full blur-xl opacity-60"></div>
                  <img 
                    src="https://i.postimg.cc/pLQdsBnM/Whats-App-Image-2025-10-26-at-02-58-51.jpg"
                    alt="Landerson Catanhede"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-black shadow-xl"
                  />
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-1">
                  Landerson Catanhede
                </h2>
                <p className="text-gray-400 text-lg flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4" />
                  Founder & Lead Developer at Ethaon
                </p>
                
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/in/landerson-catanhede-69a902114/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  
                  <a 
                    href="https://x.com/andcrypto23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Follow on X
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-800 my-6"></div>

              <div className="mb-6">
                <h3 className="text-white font-semibold text-lg mb-3">About</h3>
                <p className="text-white leading-relaxed">
                  Blockchain developer and entrepreneur focused on building privacy-first decentralized applications. 
                  As the founder of Ethaon, I'm committed to creating secure voting systems that leverage TEN Protocol's 
                  encrypted blockchain technology to ensure complete privacy and transparency in democratic processes.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold text-lg mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-purple-600/10 border border-purple-600/30 rounded-lg text-purple-300 text-sm">
                    Blockchain Development
                  </span>
                  <span className="px-3 py-1.5 bg-blue-600/10 border border-blue-600/30 rounded-lg text-blue-300 text-sm">
                    Web3 & DApps
                  </span>
                  <span className="px-3 py-1.5 bg-cyan-600/10 border border-cyan-600/30 rounded-lg text-cyan-300 text-sm">
                    Smart Contracts
                  </span>
                  <span className="px-3 py-1.5 bg-green-600/10 border border-green-600/30 rounded-lg text-green-300 text-sm">
                    Full Stack Development
                  </span>
                  <span className="px-3 py-1.5 bg-orange-600/10 border border-orange-600/30 rounded-lg text-orange-300 text-sm">
                    Privacy Technology
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Current Project</h3>
                <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-lg">
                      <Lock className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Ethaon</h4>
                      <p className="text-white text-sm">
                        Revolutionary secret voting platform powered by TEN Protocol, ensuring 100% private 
                        and verifiable elections through encrypted blockchain technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DOCUMENTOS */}
      {activeDoc && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeDoc}
        >
          <div 
            className="relative bg-black rounded-2xl max-w-4xl w-full border border-gray-800 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-black border-b border-gray-800 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                {activeDoc === 'faq' && <><HelpCircle className="w-6 h-6 text-purple-400" />Frequently Asked Questions</>}
                {activeDoc === 'terms' && <><FileText className="w-6 h-6 text-blue-400" />Terms of Service</>}
                {activeDoc === 'privacy' && <><Shield className="w-6 h-6 text-green-400" />Privacy Policy</>}
              </h2>
              <button 
                onClick={closeDoc}
                className="bg-gray-900 hover:bg-red-600 p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-8 text-gray-300">
              {activeDoc === 'faq' && <FAQContent />}
              {activeDoc === 'terms' && <TermsContent />}
              {activeDoc === 'privacy' && <PrivacyContent />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// FAQ Content
function FAQContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">General Questions</h3>
        
        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">What is Ethaon?</h4>
          <p className="text-gray-300">Ethaon is a decentralized voting platform built on TEN Protocol that ensures complete privacy and transparency. Your votes are encrypted on the blockchain and remain secret until the poll deadline, when results are automatically revealed.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">How does secret voting work?</h4>
          <p className="text-gray-300">When you cast a vote, it's encrypted using TEN Protocol's confidential computing technology. The vote is recorded on the blockchain but remains completely private. Once the poll deadline passes, the results are automatically decrypted and revealed to everyone.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">Do I need cryptocurrency to use Ethaon?</h4>
          <p className="text-gray-300">Yes, you need a small amount of ETH on TEN testnet to interact with the smart contracts. You can get free testnet tokens from the TEN faucet (link in the header).</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Creating Polls</h3>
        
        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">How do I create a poll?</h4>
          <p className="text-gray-300">Connect your wallet, click "Create Poll", fill in the poll details (title, options, deadline), and confirm the transaction. Your poll will be deployed to the blockchain and immediately available for voting.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">Can I edit a poll after creation?</h4>
          <p className="text-gray-300">No, once a poll is created on the blockchain, it cannot be edited. This ensures the integrity of the voting process. Please double-check all details before creating.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">What happens when a poll ends?</h4>
          <p className="text-gray-300">When the deadline passes, the encrypted votes are automatically decrypted and the results become visible to everyone. The poll status changes to "Ended" and shows the final vote counts.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Voting & Privacy</h3>
        
        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">Can anyone see how I voted?</h4>
          <p className="text-gray-300">No! Your individual vote is completely private and encrypted on the blockchain. Only the final aggregated results are revealed after the poll ends.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">Can I vote multiple times?</h4>
          <p className="text-gray-300">No, each wallet address can only vote once per poll. This prevents manipulation and ensures fair voting.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">Can I change my vote?</h4>
          <p className="text-gray-300">No, once a vote is cast, it's permanently recorded on the blockchain and cannot be changed. Make sure you're confident in your choice before voting.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Technical Questions</h3>
        
        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">What wallets are supported?</h4>
          <p className="text-gray-300">Ethaon supports MetaMask and any wallet compatible with Ethereum. Make sure your wallet is connected to the TEN testnet.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">Is the code open source?</h4>
          <p className="text-gray-300">Yes! Ethaon is open source and you can review our smart contracts and frontend code on GitHub. Transparency is a core principle of our platform.</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
          <h4 className="text-purple-400 font-semibold mb-2">What blockchain does Ethaon use?</h4>
          <p className="text-gray-300">Ethaon is built on TEN Protocol, an encrypted blockchain specifically designed for confidential smart contracts and privacy-preserving applications.</p>
        </div>
      </div>
    </div>
  );
}

// Terms Content
function TermsContent() {
  return (
    <div className="space-y-6 prose prose-invert max-w-none">
      <p className="text-sm text-gray-500">Last Updated: October 26, 2025</p>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h3>
        <p>By accessing and using PRIVA, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">2. Description of Service</h3>
        <p>PRIVA provides a decentralized voting platform built on TEN Protocol that enables users to create polls and cast votes with complete privacy through blockchain encryption technology.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">3. User Responsibilities</h3>
        <p>Users agree to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Maintain the security of their wallet and private keys</li>
          <li>Not create polls with illegal, harmful, or offensive content</li>
          <li>Not attempt to manipulate voting results or exploit the platform</li>
          <li>Not use the platform for any fraudulent or unauthorized purpose</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">4. Blockchain Transactions</h3>
        <p>All polls and votes are recorded on the TEN Protocol blockchain. Users acknowledge that:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Blockchain transactions are irreversible</li>
          <li>Gas fees are required for transactions</li>
          <li>Transaction confirmation times may vary</li>
          <li>PRIVA does not control the underlying blockchain infrastructure</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">5. Privacy and Encryption</h3>
        <p>While PRIVA uses encryption technology to protect vote privacy, users acknowledge that:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Votes are encrypted until poll deadline</li>
          <li>Results become public after the deadline</li>
          <li>Wallet addresses used for voting are visible on the blockchain</li>
          <li>No system can guarantee absolute privacy</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">6. Intellectual Property</h3>
        <p>The PRIVA platform, including its code, design, and branding, is protected by intellectual property rights. Users may not copy, modify, or distribute our platform without permission, except as allowed by our open-source license.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">7. Disclaimer of Warranties</h3>
        <p>PRIVA is provided "as is" without warranties of any kind. We do not guarantee that the platform will be error-free, secure, or continuously available. Users use the platform at their own risk.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h3>
        <p>PRIVA and its developers shall not be liable for any damages arising from the use or inability to use the platform, including but not limited to loss of funds, data, or voting rights.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">9. Prohibited Activities</h3>
        <p>Users may not:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Attempt to hack, reverse engineer, or exploit the platform</li>
          <li>Create polls that violate laws or infringe on others' rights</li>
          <li>Engage in vote manipulation or Sybil attacks</li>
          <li>Spam or abuse the platform's resources</li>
          <li>Impersonate other users or entities</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">10. Modifications to Service</h3>
        <p>PRIVA reserves the right to modify, suspend, or discontinue any part of the service at any time without notice. We may also update these terms periodically.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">11. Termination</h3>
        <p>We reserve the right to restrict access to users who violate these terms, though due to the decentralized nature of blockchain, existing polls and votes cannot be deleted.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">12. Contact Information</h3>
        <p>For questions about these Terms of Service, please contact us through our official social media channels or GitHub repository.</p>
      </section>
    </div>
  );
}

// Privacy Policy Content
function PrivacyContent() {
  return (
    <div className="space-y-6 prose prose-invert max-w-none">
      <p className="text-sm text-gray-500">Last Updated: October 26, 2025</p>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">1. Introduction</h3>
        <p>PRIVA is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our decentralized voting platform. As a blockchain-based application, most data is stored on-chain and publicly accessible.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">2. Information We Collect</h3>
        
        <h4 className="text-lg font-semibold text-purple-400 mt-4 mb-2">On-Chain Data</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Wallet Addresses:</strong> Your Ethereum wallet address is recorded when you create polls or cast votes</li>
          <li><strong>Poll Data:</strong> Poll titles, options, deadlines, and creator addresses are stored on the blockchain</li>
          <li><strong>Encrypted Votes:</strong> Your votes are stored in encrypted form until the poll deadline</li>
          <li><strong>Transaction History:</strong> All blockchain interactions are publicly visible</li>
        </ul>

        <h4 className="text-lg font-semibold text-purple-400 mt-4 mb-2">Off-Chain Data</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Browser Data:</strong> Standard web browser information (user agent, IP address) may be collected by hosting services</li>
          <li><strong>Wallet Connection:</strong> Temporary session data when connecting your wallet</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h3>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Facilitate poll creation and voting functionality</li>
          <li>Display voting statistics and results</li>
          <li>Ensure one vote per wallet address</li>
          <li>Maintain platform security and prevent abuse</li>
          <li>Improve user experience and platform features</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">4. Data Privacy & Encryption</h3>
        <p>PRIVA leverages TEN Protocol's confidential computing to protect vote privacy:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li><strong>Vote Encryption:</strong> Individual votes are encrypted and cannot be viewed until the poll deadline</li>
          <li><strong>Result Revelation:</strong> After the deadline, votes are automatically decrypted and aggregated results become public</li>
          <li><strong>Blockchain Transparency:</strong> While votes are private during voting, wallet addresses and poll data are visible on-chain</li>
          <li><strong>No Central Storage:</strong> We do not store votes on centralized servers; everything is on the blockchain</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">5. Data Sharing</h3>
        <p>PRIVA does not sell or share your personal information with third parties. However:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Blockchain data is public by nature and accessible to anyone</li>
          <li>Third-party blockchain explorers can view on-chain transactions</li>
          <li>Hosting providers may have access to standard web traffic data</li>
          <li>We do not control how blockchain data is used by others</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">6. Cookies and Tracking</h3>
        <p>PRIVA uses minimal tracking technologies:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li><strong>Local Storage:</strong> Used to cache wallet connection status</li>
          <li><strong>No Analytics:</strong> We do not use Google Analytics or similar tracking services</li>
          <li><strong>Third-Party Services:</strong> Wallet providers (MetaMask) may have their own privacy policies</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">7. User Rights</h3>
        <p>As a decentralized platform, data rights are limited by blockchain immutability:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li><strong>Right to Access:</strong> All blockchain data is publicly accessible via block explorers</li>
          <li><strong>Right to Deletion:</strong> Blockchain data cannot be deleted once recorded</li>
          <li><strong>Right to Portability:</strong> You can export your blockchain transaction history</li>
          <li><strong>Wallet Control:</strong> You maintain full control over your wallet and private keys</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">8. Security Measures</h3>
        <p>We implement security best practices to protect user data:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Smart contracts audited for security vulnerabilities</li>
          <li>Encryption provided by TEN Protocol's confidential computing</li>
          <li>Secure HTTPS connection for the web interface</li>
          <li>No storage of private keys or sensitive user credentials</li>
          <li>Regular security updates and monitoring</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">9. Children's Privacy</h3>
        <p>PRIVA is not intended for users under 13 years of age. We do not knowingly collect information from children. If we become aware of data collected from children, we will take steps to delete such information.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">10. International Users</h3>
        <p>PRIVA is accessible globally. By using the platform, you consent to the transfer and processing of your data on the blockchain, which operates across international borders.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">11. Third-Party Links</h3>
        <p>Our platform may contain links to TEN Protocol, block explorers, and other external sites. We are not responsible for the privacy practices of these third-party services.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">12. Changes to Privacy Policy</h3>
        <p>We may update this Privacy Policy periodically. Continued use of PRIVA after changes constitutes acceptance of the updated policy. Check this page regularly for updates.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-3">13. Contact Us</h3>
        <p>If you have questions about this Privacy Policy or how we handle your data, please reach out through:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Twitter/X: @andcrypto23</li>
          <li>GitHub: Check our repository for issues and discussions</li>
          <li>Discord: Join our community server</li>
        </ul>
      </section>

      <section className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Important Notice</h3>
        <p className="text-gray-300">
          PRIVA is a decentralized application built on blockchain technology. While we implement privacy measures through encryption, 
          blockchain data is inherently public and permanent. Users should be aware that their wallet addresses and transaction 
          history are visible on-chain. We recommend using dedicated wallets for voting if you wish to maintain additional privacy.
        </p>
      </section>
    </div>
  );
}