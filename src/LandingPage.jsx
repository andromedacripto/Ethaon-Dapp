import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock, Zap, Eye, Shield, Vote, Users, BarChart3 } from 'lucide-react';

export default function LandingPage({ onLaunchApp }) {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      size: Math.random() * 2 + 1
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30 - 15,
        y: (e.clientY / window.innerHeight) * 30 - 15
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* VIDEO DE FUNDO */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/enquete.mp4" type="video/mp4" />
      </video>

      {/* Overlay para escurecer e deixar o conteúdo legível */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Partículas minimalistas */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float-slow ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.15,
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      {/* Spotlight effects */}
      <div 
        className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
          transform: `translate(calc(-50% + ${mousePosition.x}px), ${mousePosition.y}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>

      {/* Header - Launch Button */}
      <div className="fixed top-8 right-8 z-[100]">
        <button
          onClick={onLaunchApp}
          className="group relative px-8 py-3 bg-white text-black font-semibold rounded-none overflow-hidden transition-all hover:scale-[1.02] border-2 border-white cursor-pointer"
        >
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
          <span className="relative z-10 flex items-center space-x-2 group-hover:text-white transition-colors pointer-events-none">
            <span>JOIN TESTNET</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        
        {/* Logo Icon */}
        <div className="mb-12 relative group">
          <div className="absolute inset-0 border border-white/20 blur-xl group-hover:border-white/40 transition-all"></div>
          <div className="relative border-2 border-white p-6 bg-black">
            <Lock className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-white/30 -z-10"></div>
        </div>

        {/* Title with Letter Animation */}
        <div className="mb-8 relative">
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black leading-none tracking-tighter text-center">
            <span className="inline-block">
              {'ethaon'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="inline-block text-white animate-letter"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    textShadow: '0 0 80px rgba(255,255,255,0.2)'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white animate-line-expand"></div>
        </div>

        {/* Subtitle with Glitch Effect */}
        <p className="text-lg md:text-xl text-white mb-6 font-semibold tracking-[0.3em] uppercase text-center animate-glitch">
          Community Governance • On-Chain
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl text-center px-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Powers community decisions for DAOs, NFT communities, and DeFi projects—
          <span className="text-white font-semibold"> transparent, verifiable, and on-chain</span>
        </p>

        {/* Privacy Highlight Banner */}
        <div className="relative mb-16 px-4">
          <div className="relative border-2 border-white/20 bg-black/50 backdrop-blur-md p-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer-bg"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-white animate-pulse-glow" />
                <span className="text-2xl md:text-3xl font-black text-white tracking-wider animate-text-glow">
                  ENCRYPTED
                </span>
              </div>
              <div className="w-12 h-[2px] md:w-[2px] md:h-12 bg-white/30"></div>
              <div className="flex items-center space-x-3">
                <Lock className="w-8 h-8 text-white animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                <span className="text-2xl md:text-3xl font-black text-white tracking-wider animate-text-glow" style={{ animationDelay: '0.5s' }}>
                  PRIVATE
                </span>
              </div>
            </div>
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-16 w-full px-4">
          {[
            { icon: Vote, title: 'DAO VOTING', desc: 'Democratic governance on-chain', num: '01' },
            { icon: Users, title: 'NFT COMMUNITIES', desc: 'Engage your holders', num: '02' },
            { icon: BarChart3, title: 'DEFI DECISIONS', desc: 'Protocol governance made easy', num: '03' }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative border border-white/10 p-6 bg-black/40 backdrop-blur-sm hover:border-white/30 transition-all cursor-pointer"
              style={{ animation: `fade-in-up 0.8s ease-out ${idx * 0.15 + 0.8}s both` }}
            >
              <div className="absolute top-3 right-3 text-5xl font-black text-white/5">
                {feature.num}
              </div>
              <feature.icon className="w-8 h-8 text-white mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-2 text-white tracking-wider">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm tracking-wide">{feature.desc}</p>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Tech Specs */}
        <div className="flex flex-wrap justify-center gap-8 items-center mb-12 px-4">
          <div className="flex items-center space-x-3 text-white text-lg md:text-xl font-black tracking-wider animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="animate-text-shimmer">TRANSPARENT</span>
          </div>
          <div className="w-px h-6 bg-white/30"></div>
          <div className="flex items-center space-x-3 text-white text-lg md:text-xl font-black tracking-wider animate-fade-in-up" style={{ animationDelay: '1.7s' }}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span className="animate-text-shimmer" style={{ animationDelay: '0.3s' }}>VERIFIABLE</span>
          </div>
          <div className="w-px h-6 bg-white/30"></div>
          <div className="flex items-center space-x-3 text-white text-lg md:text-xl font-black tracking-wider animate-fade-in-up" style={{ animationDelay: '1.9s' }}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span className="animate-text-shimmer" style={{ animationDelay: '0.6s' }}>ON-CHAIN</span>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center px-4 animate-fade-in-up" style={{ animationDelay: '2.1s' }}>
          <p className="text-sm text-white mb-2 tracking-[0.2em] uppercase font-semibold">Powered by</p>
          <div className="text-2xl md:text-3xl font-black tracking-[0.15em] text-white animate-pulse-slow">ethaon</div>
        </div>
      </div>

      {/* Footer line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.3; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes letter {
          0% { 
            opacity: 0; 
            transform: translateY(-50px) rotateX(-90deg);
            filter: blur(10px);
          }
          50% {
            filter: blur(5px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes glitch {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
            transform: translateX(0);
          }
          25% { 
            text-shadow: -2px 0 10px rgba(255,0,255,0.7), 2px 0 10px rgba(0,255,255,0.7);
            transform: translateX(-2px);
          }
          50% {
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
            transform: translateX(0);
          }
          75% { 
            text-shadow: 2px 0 10px rgba(255,0,255,0.7), -2px 0 10px rgba(0,255,255,0.7);
            transform: translateX(2px);
          }
        }
        
        @keyframes line-expand {
          from { width: 0; opacity: 0; }
          to { width: 75%; opacity: 1; }
        }
        
        @keyframes text-shimmer {
          0%, 100% { 
            filter: brightness(1);
            text-shadow: 0 0 10px rgba(255,255,255,0.3);
          }
          50% { 
            filter: brightness(1.3);
            text-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.3);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 1;
            text-shadow: 0 0 20px rgba(255,255,255,0.4);
          }
          50% { 
            opacity: 0.7;
            text-shadow: 0 0 40px rgba(255,255,255,0.8);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));
            transform: scale(1);
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(255,255,255,1)) drop-shadow(0 0 30px rgba(255,255,255,0.5));
            transform: scale(1.1);
          }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2);
          }
          50% { 
            text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3);
          }
        }
        
        @keyframes shimmer-bg {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-letter {
          animation: letter 0.8s ease-out both;
        }
        
        .animate-glitch {
          animation: glitch 3s ease-in-out infinite;
        }
        
        .animate-line-expand {
          animation: line-expand 1s ease-out 0.5s both;
        }
        
        .animate-text-shimmer {
          animation: text-shimmer 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        
        .animate-shimmer-bg {
          animation: shimmer-bg 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
