
import React, { useState } from 'react';
import { ShieldCheck, Star, Lock, Info, Trophy, ChevronRight, X, ShieldAlert, Sparkles, Key, ArrowRight } from 'lucide-react';
import { UserProfile, TrustLevel } from '../types';
import { TRUST_LEVELS } from '../constants';
import { CountUp } from './Shared';

// 1. TRUST LEVEL CARD (Gamification Display)
export const TrustLevelCard = ({ user }: { user: UserProfile }) => {
    const config = TRUST_LEVELS[user.trustLevel] || TRUST_LEVELS.NEWBIE;
    // We use reliability for the progress bar as requested, but maintain trustScore for the overall rating
    const progress = Math.min(100, Math.max(0, user.reliability || user.trustScore));

    return (
        <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-2xl group">
             {/* Dynamic Background Glow based on Level */}
             <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 rounded-full transition-colors ${config.color === 'text-yellow-400' ? 'bg-yellow-500' : config.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-teal-500'}`}></div>

             <div className="relative z-10">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 font-mono">Trust Score</div>
                         <h3 className={`text-2xl font-bold flex items-center gap-2 ${config.color}`}>
                             <ShieldCheck size={24} /> {config.label}
                         </h3>
                     </div>
                     <div className="text-right">
                         <div className="text-3xl font-mono font-bold text-white tracking-tighter">
                             <CountUp end={user.trustScore} suffix="%" /> 
                         </div>
                     </div>
                 </div>

                 {/* Progress Bar: Reliability Focus */}
                 <div className="mb-4">
                     <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                         <span className="flex items-center gap-1.5">Reliability Level {progress >= 90 && <Sparkles size={12} className="text-teal-400 animate-pulse" />}</span>
                         <span className="font-mono">{progress}% / 100%</span>
                     </div>
                     <div className="h-2 bg-black rounded-full overflow-hidden border border-white/5">
                         <div 
                            className={`h-full transition-all duration-1000 ease-out rounded-full ${config.color === 'text-yellow-400' ? 'bg-yellow-500' : config.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-teal-500'}`} 
                            style={{ width: `${progress}%` }}
                         ></div>
                     </div>
                 </div>

                 {/* Benefits/Info */}
                 <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-mono">
                     <div className="px-2 py-1 bg-white/5 rounded border border-white/5 flex items-center gap-1">
                         <Trophy size={10} className="text-yellow-500"/> Benefits Active
                     </div>
                     <div className={`px-2 py-1 rounded border flex items-center gap-1 ${user.trustLevel === 'ELITE' || user.trustLevel === 'LEGEND' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 'bg-white/5 text-gray-500 border-white/5'}`}>
                         Instant Payouts {user.trustLevel === 'ELITE' || user.trustLevel === 'LEGEND' ? '✅' : '🔒'}
                     </div>
                     <div className={`px-2 py-1 rounded border flex items-center gap-1 ${progress >= 90 ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 'bg-white/5 text-gray-500 border-white/5'}`}>
                         Radar Priority {progress >= 90 ? '✅' : '🔒'}
                     </div>
                 </div>
             </div>
        </div>
    );
};

// 2. REVIEW MODAL (Double Blind Input)
export const ReviewModal = ({ jobTitle, targetName, onClose, onSubmit }: { jobTitle: string, targetName: string, onClose: () => void, onSubmit: (rating: number, comment: string) => void }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[40px] w-full max-w-md animate-bounce-up relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                 <div className="p-8">
                     <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
                     
                     <div className="text-center mb-8 pt-4">
                         <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500/20 to-purple-500/10 rounded-3xl flex items-center justify-center mb-6 border border-white/10 shadow-2xl rotate-3">
                             <Star size={36} className="text-teal-400 fill-teal-400" />
                         </div>
                         <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter">Bewerte {targetName}</h2>
                         <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">{jobTitle}</p>
                     </div>

                     <div className="flex justify-center gap-3 mb-10">
                         {[1, 2, 3, 4, 5].map((star) => (
                             <button 
                                key={star}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="transition-all hover:scale-125 focus:outline-none"
                             >
                                 <Star 
                                    size={40} 
                                    className={`${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'text-gray-800'}`} 
                                    strokeWidth={1.5}
                                 />
                             </button>
                         ))}
                     </div>

                     <div className="relative mb-6">
                        <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Wie war die Zusammenarbeit? Dein Feedback hilft der Community..." 
                            className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-teal-500 outline-none resize-none transition-all placeholder:text-gray-700"
                        />
                        <div className="absolute bottom-3 right-3 text-[10px] text-gray-600 font-mono">
                            Double-Blind Mode Active
                        </div>
                     </div>

                     <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-2xl flex gap-4 mb-8">
                         <div className="p-2 bg-blue-500/20 rounded-xl h-fit"><ShieldCheck size={20} className="text-blue-400" /></div>
                         <p className="text-xs text-blue-300 leading-relaxed">
                             <span className="font-bold text-white">Sicher & Fair:</span> Dein Feedback wird erst freigeschaltet, wenn beide Seiten bewertet haben. Kein Stress, keine Beeinflussung.
                         </p>
                     </div>

                     <button 
                        onClick={() => onSubmit(rating, comment)}
                        disabled={rating === 0}
                        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl ${rating > 0 ? 'bg-white text-black hover:bg-teal-400 hover:scale-[1.02]' : 'bg-gray-900 text-gray-700 cursor-not-allowed'}`}
                     >
                         Bewertung Absenden <ArrowRight size={18} />
                     </button>
                 </div>
            </div>
        </div>
    );
};

// 3. BLIND REVIEW CARD (Used in Lists)
export const BlindReviewCard = ({ isLocked, rating, comment, authorName, date }: { isLocked: boolean, rating?: number, comment?: string, authorName: string, date: string, key?: React.Key }) => {
    if (isLocked) {
        return (
            <div className="bg-surfaceHighlight/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px]"></div>
                
                <div className="absolute inset-0 backdrop-blur-md bg-black/60 z-20 flex items-center justify-center flex-col gap-4 text-center p-6 transition-all group-hover:bg-black/40">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:scale-110 transition-transform">
                        <Lock size={20} className="text-gray-500 group-hover:text-teal-400 transition-colors" />
                    </div>
                    <div>
                        <span className="text-xs font-black text-white uppercase tracking-[0.2em] block mb-1">Feedback Locked</span>
                        <p className="text-[10px] text-gray-500 max-w-[200px] leading-relaxed">
                            Bewerte dein Gegenüber, um dieses Feedback freizuschalten.
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
                        Jetzt Bewerten
                    </button>
                </div>

                {/* Blurry Content Proxy */}
                <div className="filter blur-[6px] select-none opacity-20 relative z-10">
                     <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                         <div className="h-4 bg-gray-700 rounded w-24"></div>
                     </div>
                     <div className="flex gap-1 mb-4">
                         {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-gray-600" />)}
                     </div>
                     <div className="space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-full"></div>
                        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                     </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all shadow-xl group">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-bold text-xs border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                        {authorName.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <div className="font-bold text-sm text-white">{authorName}</div>
                        <div className="text-[10px] text-gray-600 font-mono tracking-tighter uppercase">{date}</div>
                    </div>
                </div>
                <div className="flex gap-1 bg-black/40 px-2 py-1.5 rounded-lg border border-white/5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                        key={star}
                        size={12} 
                        className={`${(rating || 0) >= star ? 'fill-yellow-500 text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.3)]' : 'text-gray-800'}`} 
                        />
                    ))}
                </div>
            </div>
            <div className="relative">
                <span className="absolute -top-3 -left-2 text-4xl text-teal-500/10 font-serif leading-none">“</span>
                <p className="text-sm text-gray-400 leading-relaxed italic pl-4">
                    {comment}
                </p>
            </div>
        </div>
    );
};
