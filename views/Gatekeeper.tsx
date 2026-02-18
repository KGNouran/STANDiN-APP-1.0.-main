
import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, ShieldCheck, Sparkles, Loader2, AlertCircle } from 'lucide-react';

export const GatekeeperView = ({ onUnlock }: { onUnlock: () => void }) => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'CHECKING' | 'ERROR' | 'SUCCESS'>('IDLE');
    const [shake, setShake] = useState(false);

    const MASTER_CODE = "BERLIN2025";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('CHECKING');
        
        setTimeout(() => {
            if (code.toUpperCase() === MASTER_CODE) {
                setStatus('SUCCESS');
                setTimeout(() => {
                    onUnlock();
                }, 800);
            } else {
                setStatus('ERROR');
                setShake(true);
                setTimeout(() => {
                    setShake(false);
                    setStatus('IDLE');
                    setCode('');
                }, 600);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Cinematic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-teal-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            </div>

            <div className={`max-w-md w-full relative z-10 transition-all duration-700 ${status === 'SUCCESS' ? 'scale-95 opacity-0 blur-xl' : 'scale-100 opacity-100'}`}>
                {/* Brand Logo */}
                <div className="flex flex-col items-center mb-12 animate-fade-in">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-purple-600 rounded-2xl flex items-center justify-center font-black text-black text-2xl shadow-[0_0_40px_rgba(45,212,191,0.3)] mb-6">
                        SI
                    </div>
                    <h1 className="text-sm font-black uppercase tracking-[0.4em] text-teal-400 mb-2">Private Beta Access</h1>
                    <div className="text-4xl font-black tracking-tighter uppercase text-white flex items-center gap-2">
                        Stand<span className="text-gray-700">In</span> <Lock size={24} className="text-gray-700" />
                    </div>
                </div>

                {/* Input Field */}
                <form 
                    onSubmit={handleSubmit}
                    className={`glass-panel-highlight rounded-[32px] p-8 border border-white/10 shadow-2xl transition-transform ${shake ? 'animate-shake' : ''}`}
                >
                    <div className="space-y-6">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                Bitte gib deinen persönlichen <br />Einladungscode ein.
                            </p>
                        </div>

                        <div className="relative group">
                            <input 
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="INVITATION-CODE"
                                className={`w-full bg-black/50 border-2 rounded-2xl p-5 text-center font-mono font-bold tracking-[0.3em] outline-none transition-all ${
                                    status === 'ERROR' ? 'border-red-500 text-red-500' : 
                                    status === 'SUCCESS' ? 'border-teal-500 text-teal-500' : 
                                    'border-white/5 focus:border-white/20 text-white'
                                }`}
                                disabled={status === 'CHECKING' || status === 'SUCCESS'}
                                autoFocus
                            />
                            {status === 'CHECKING' && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Loader2 size={20} className="animate-spin text-teal-400" />
                                </div>
                            )}
                        </div>

                        <button 
                            type="submit"
                            disabled={!code || status === 'CHECKING' || status === 'SUCCESS'}
                            className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                                code ? 'bg-white text-black hover:bg-teal-400 shadow-xl active:scale-95' : 'bg-white/5 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            {status === 'SUCCESS' ? (
                                <><ShieldCheck size={18} /> Access Granted</>
                            ) : (
                                <><Sparkles size={18} /> Enter Ecosystem</>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer Info */}
                <div className="mt-12 text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        Don't have a code? <br />
                        <span className="text-gray-500 mt-2 block">Apply for waitlist at standin.app</span>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
            `}</style>
        </div>
    );
};
