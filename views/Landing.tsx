
import React, { useState, useEffect } from 'react';
import { 
    Sparkles, ArrowRight, Zap, Building, Users, Rocket, Target, 
    ShieldCheck, Globe, Clock, Coins, Flame, MousePointer2, 
    ChevronDown, Play, MessageSquare, Plus, Check, Loader2, Search, Ticket, X
} from 'lucide-react';
// Added RegularClass to types import
import { UserRole, RegularClass } from '../types';
// Added import for MOCK_SCHEDULE
import { MOCK_SCHEDULE } from '../constants';

/**
 * SUB-COMPONENT: SCROLL DOWN INDICATOR
 */
const ScrollIndicator = () => (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
        <span className="text-[8px] font-black uppercase tracking-[0.3em]">Scroll for Vision</span>
        <ChevronDown size={14} />
    </div>
);

/**
 * SUB-COMPONENT: BENEFIT CARD
 */
const BenefitCard = ({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
    <div className="glass-panel p-8 rounded-[32px] border border-white/5 hover:border-white/20 transition-all group">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
);

/**
 * MAIN LANDING VIEW
 */
export const UniversalLandingView = ({ setIsLoggedIn, currentUserRole, setCurrentUserRole }: { setIsLoggedIn: (v: boolean) => void, currentUserRole: UserRole, setCurrentUserRole: (r: UserRole) => void }) => {
    const [view, setView] = useState<'STUDIO' | 'TRAINER' | 'STUDENT'>('TRAINER');
    const [isEntering, setIsEntering] = useState(false);

    const handleLogin = (role: UserRole) => {
        setCurrentUserRole(role);
        setIsEntering(true);
        setTimeout(() => {
            setIsLoggedIn(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background text-white selection:bg-teal-500/30 overflow-x-hidden">
            {/* CINEMATIC BACKGROUND ELEMENTS - REDESIGNED FOR SMOOTHNESS */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050505]">
                {/* Ultra Smooth Ambient Teal Glow (Top Left) */}
                <div className="absolute top-[-20%] left-[-15%] w-[70vw] h-[70vw] bg-teal-500/5 rounded-full blur-[250px] animate-pulse-slow"></div>
                
                {/* Ultra Smooth Ambient Purple Glow (Bottom Right) */}
                <div className="absolute bottom-[-20%] right-[-15%] w-[60vw] h-[60vw] bg-purple-600/5 rounded-full blur-[250px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                
                {/* Deep Anthracite Central Vibe */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60"></div>
            </div>

            {/* PERSISTENT HEADER */}
            <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[100] backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-purple-600 rounded-xl flex items-center justify-center font-black text-black shadow-neon group-hover:shadow-[0_0_30px_#2dd4bf] transition-all">SI</div>
                    <span className="text-2xl font-black tracking-tighter">stand<span className="text-teal-400">In</span>.</span>
                </div>
                <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <a href="#vision" className="hover:text-white transition-colors">Vision</a>
                    <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>
                <button 
                    onClick={() => handleLogin(currentUserRole)} 
                    className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                    Login
                </button>
            </nav>

            {/* SECTION 1: HERO - THE DUAL GATE */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 z-10">
                <div className="max-w-5xl w-full text-center space-y-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 mb-4">
                             <Sparkles size={12} /> The Future of Professional Booking
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                            Stop Chasing.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-white to-purple-500">Start Scaling.</span>
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                            Der automatisierte Hub für Studios, die Ruhe suchen, und Talente, die zum Business-Creator werden. 
                        </p>
                    </div>

                    {/* DUAL GATE SELECTOR */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-10">
                        {/* SCHOOL SIDE */}
                        <div 
                            onClick={() => handleLogin('SCHOOL')}
                            className="group relative bg-surfaceHighlight/40 border border-white/10 rounded-[40px] p-10 cursor-pointer hover:border-teal-500/50 transition-all hover:scale-[1.02] shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-teal-500/10 rounded-3xl flex items-center justify-center text-teal-400 mb-8 border border-teal-500/20 shadow-[0_0_40px_rgba(45,212,191,0.1)]">
                                    <Building size={40} />
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">I Own a Studio</h3>
                                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                    Vertretungs-Stress eliminieren. Leerräume monetarisieren. Automatisches Settlement.
                                </p>
                                <div className="flex items-center gap-3 text-teal-400 font-black uppercase text-[10px] tracking-[0.2em] group-hover:gap-5 transition-all">
                                    Enter Management <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>

                        {/* TRAINER SIDE */}
                        <div 
                            onClick={() => handleLogin('TRAINER')}
                            className="group relative bg-surfaceHighlight/40 border border-white/10 rounded-[40px] p-10 cursor-pointer hover:border-purple-500/50 transition-all hover:scale-[1.02] shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center text-purple-400 mb-8 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
                                    <Rocket size={40} />
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">I am a Creator</h3>
                                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                    Vom Honorar-Lehrer zum Entrepreneur. Eigene Events, automatisiertes Ticketing.
                                </p>
                                <div className="flex items-center gap-3 text-purple-400 font-black uppercase text-[10px] tracking-[0.2em] group-hover:gap-5 transition-all">
                                    Build your Empire <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollIndicator />
            </section>

            {/* SECTION 2: THE "SCHOOL" PROBLEM (SOS Automation) */}
            <section id="vision" className="relative py-32 px-6 z-10 border-t border-white/5 bg-black/40">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 text-teal-400 font-black uppercase text-[10px] tracking-[0.4em] mb-6">
                            <Zap size={14} fill="currentColor" /> Peace of Mind
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-10">
                            The End of the <br />
                            <span className="text-gray-700">"SOS Phone Call"</span>
                        </h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="p-3 h-fit bg-white/5 rounded-2xl border border-white/10 text-teal-400"><Clock size={24}/></div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2 uppercase">Sofortige Automatisierung</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">Trainer krank? Ein Klick (oder Voice Command) und das System matcht dein Profil mit hunderten geprüften Freelancern in Echtzeit.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="p-3 h-fit bg-white/5 rounded-2xl border border-white/10 text-purple-400"><Target size={24}/></div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2 uppercase">Matching-Intelligenz</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">Wir filtern nach Stil, Skill-Level und Distanz. Dein Studio-Standard bleibt zu 100% gewahrt, auch im Notfall.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-teal-500/5 blur-[120px] rounded-full"></div>
                        <div className="glass-panel-highlight rounded-[40px] p-8 border border-white/10 shadow-2xl relative animate-float">
                             <div className="flex items-center gap-4 mb-8">
                                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-red-400 font-mono">System SOS: HipHop Adv. Room 1</div>
                             </div>
                             <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center opacity-40">
                                    <span className="text-xs font-bold text-gray-500">Sarah Jones (Busy)</span>
                                    <X size={14} className="text-gray-600" />
                                </div>
                                <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/30 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-400 text-black flex items-center justify-center font-bold text-[10px]">UD</div>
                                        <span className="text-xs font-bold text-teal-400">Urban D. (Available)</span>
                                    </div>
                                    <Check size={14} className="text-teal-400" />
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center opacity-40">
                                    <span className="text-xs font-bold text-gray-500">Mike Th. (Distance Error)</span>
                                    <X size={14} className="text-gray-600" />
                                </div>
                             </div>
                             <div className="mt-10 py-4 bg-teal-500 text-black rounded-2xl font-black text-[10px] uppercase text-center tracking-widest">Substitution Locked ✅</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: YIELD MANAGEMENT (Empty Space = Money) */}
            <section id="ecosystem" className="relative py-32 px-6 z-10 overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-purple-400 font-black uppercase text-[10px] tracking-[0.4em] mb-6">
                            <Coins size={14} /> Yield Engine
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-10">
                            Turn your <span className="text-gray-800 italic">Empty Hall</span> <br />
                            into a Profit Hub.
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Warum stehen deine Räume vormittags oder am Wochenende leer? Mit dem <strong>StandIn Creator Mode</strong> buchen Trainer deine Flächen autonom, kreieren eigene Workshops und verkaufen Tickets über unsere integrierte Engine.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        <BenefitCard icon={Globe} title="Market Exposure" desc="Deine freien Räume werden automatisch im Creator-Radar unserer Elite-Trainer gelistet." color="bg-blue-500/10 text-blue-400" />
                        <BenefitCard icon={Ticket} title="Auto-Ticketing" desc="Der Trainer kreiert das Event, wir regeln den Checkout. Du bekommst deine Raummiete garantiert." color="bg-purple-500/10 text-purple-400" />
                        <BenefitCard icon={ShieldCheck} title="Zero Risk" desc="Keine Verträge, kein Marketing-Aufwand für dich. Wir sind das AirBnB für deine Studio-Yield." color="bg-teal-500/10 text-teal-400" />
                    </div>
                </div>
            </section>

            {/* SECTION 4: STUDENT GATE (Browsing Tickets) */}
            <section className="relative py-32 px-6 z-10 bg-surfaceHighlight/50 border-y border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="max-w-md">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Just looking for a Class?</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                            Entdecke exklusive Workshops und Masterclasses von den besten Creatoren deiner Stadt. Buche Tickets direkt über StandIn und lerne von den Besten.
                        </p>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-3xl opacity-20"></div>
                        <div className="relative bg-black/40 border border-white/10 rounded-3xl p-2 flex items-center">
                            <Search size={20} className="text-gray-600 ml-4" />
                            <input placeholder="Suche Workshop, Stil oder Stadt..." className="flex-1 bg-transparent border-none outline-none p-4 text-white font-bold" />
                            <button className="px-8 py-3 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all">Explore</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA: THE "SIMPLIFIED Presentation LOGIN" */}
            <section className="relative py-32 md:py-48 px-6 z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-12">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
                        Bereit für den <br />
                        <span className="text-teal-400">Standard der Zukunft?</span>
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button 
                            onClick={() => handleLogin('SCHOOL')} 
                            className="w-full md:w-auto px-12 py-6 bg-white text-black rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            Enter as Studio <Building size={20}/>
                        </button>
                        <button 
                            onClick={() => handleLogin('TRAINER')} 
                            className="w-full md:w-auto px-12 py-6 bg-teal-500 text-black rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(45,212,191,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            Enter as Trainer <Zap size={20} fill="currentColor"/>
                        </button>
                    </div>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">No Registration required for this Demo.</p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative py-20 px-6 z-10 border-t border-white/5 text-center text-gray-700">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center font-bold text-black text-[10px]">SI</div>
                        <span className="font-bold text-sm tracking-tighter">standin 1.0</span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Imprint</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                        <a href="#" className="hover:text-white transition-colors">Career</a>
                    </div>
                    <div className="text-[9px] font-mono opacity-50 uppercase tracking-widest">
                        © 2025 STANDIN GMBH • BERLIN 
                    </div>
                </div>
            </footer>

            {/* FULLSCREEN LOADING OVERLAY (DURING DEMO ENTRY) */}
            {isEntering && (
                <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-fade-in">
                    <div className="relative mb-8">
                        <div className="w-24 h-24 border-2 border-teal-500/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin text-teal-400" size={48} />
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-[0.4em] animate-pulse">Syncing Ecosystem...</h3>
                    <p className="text-gray-600 text-xs mt-4 font-mono">Initializing {currentUserRole} Cockpit</p>
                </div>
            )}
        </div>
    );
};

/**
 * SUB-COMPONENT: SCHOOL AI VIEW (KEEPING EXISTING LOGIC)
 */
export const SchoolAIView = ({ onManualPost }: { onManualPost: () => void }) => {
    const [aiInput, setAiInput] = useState('');
    const [aiSuggestion, setAiSuggestion] = useState<RegularClass | null>(null);
    const [isThinking, setIsThinking] = useState(false);

    const handleAIProcess = (e: React.FormEvent) => {
        e.preventDefault(); setIsThinking(true); setAiSuggestion(null);
        setTimeout(() => {
            const match = MOCK_SCHEDULE.find(cls => aiInput.toLowerCase().includes(cls.regularTeacher.toLowerCase()) || aiInput.toLowerCase().includes(cls.title.toLowerCase()));
            if (match) setAiSuggestion(match);
            setIsThinking(false);
        }, 1500); 
    };

    return (
        <div className="animate-fade-in flex flex-col items-center justify-center h-[calc(100vh-200px)] relative">
            <div className="w-full max-w-2xl text-center px-4">
                 <div className="mb-12"><h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">stand<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">In</span>.</h1><p className="text-xl font-medium text-gray-400">Wen müssen wir heute ersetzen?</p></div>
                 
                 <form onSubmit={handleAIProcess} className="w-full relative group mb-8 max-w-lg mx-auto">
                     <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-600/10 blur-[80px] rounded-full group-hover:opacity-100 transition-opacity opacity-50"></div>
                     <div className="relative bg-[#0A0A0A] border border-white/10 rounded-full flex items-center p-1.5 pl-5 shadow-2xl transition-all group-hover:border-white/20">
                         <div className="mr-3"><Sparkles size={18} className={`text-purple-400 ${isThinking ? 'animate-spin' : ''}`} /></div>
                         <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder='Tippe z.B. "Sarah fällt aus"' className="flex-1 bg-transparent border-none outline-none text-base text-white placeholder-gray-600" autoFocus />
                         <button type="submit" className="w-10 h-10 bg-white text-black rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center">{isThinking ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18}/>}</button>
                     </div>
                 </form>

                 <div className="text-center mb-8"><button onClick={onManualPost} className="text-sm text-gray-500 hover:text-white underline underline-offset-4 decoration-white/20">Oder manuell posten</button></div>
                 {aiSuggestion && (
                     <div className="w-full animate-bounce-up max-w-lg mx-auto">
                         <div className="bg-surface border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-2xl">
                             <div className="text-left"><div className="text-xs text-green-400 font-bold mb-1 flex items-center gap-1"><Check size={12} /> MATCH GEFUNDEN</div><div className="font-bold text-lg">{aiSuggestion.title} ({aiSuggestion.timeStart})</div><div className="text-sm text-gray-500">{aiSuggestion.regularTeacher} • {aiSuggestion.room}</div></div>
                             <button onClick={onManualPost} className="px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl text-sm font-bold transition-all">Vertretung Suchen</button>
                         </div>
                     </div>
                 )}
            </div>
        </div>
    );
};
