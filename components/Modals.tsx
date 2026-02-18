
import React, { useState, useEffect, useRef } from 'react';
import { 
    X, Rocket, ArrowRight, Plane, Locate, Navigation, MessageSquare, Phone, 
    FileText, CheckCircle2, Zap, Star, Users, Briefcase, Coins, Send, Check, Loader2, Building, Clock, AlertTriangle, Wallet, TrendingDown, RefreshCw, Info, FileSpreadsheet, Camera, Cloud, Sparkles, Target, Globe, Apple, LayoutGrid, Search, ShieldCheck, Lock, MousePointer2, Euro, Play, Shield
} from 'lucide-react';
import { MarketplaceItem, OwnClass, Job, Story, UserProfile, RegularClass, UrgencyLevel, JobCategory } from '../types';
import { MOCK_FRIENDS, MOCK_SCHEDULE } from '../constants';
import { GAME_RULES } from '../gameRules';
import { CreatorFlyerTicket } from './Shared';

/**
 * --- CATEGORY 1: SHARED UTILITIES ---
 */

export const QRScannerModal = ({ onScan, onClose }: { onScan: () => void, onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => { onScan(); }, 2000);
        return () => clearTimeout(timer);
    }, [onScan]);
    return (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-40px p-10 w-full max-sm animate-bounce-up text-center relative"><h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">QR Scanner</h2><div className="relative aspect-square bg-black rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center mb-8 overflow-hidden"><Lock size={120} className="text-white/20" /><div className="absolute inset-0 border-2 border-teal-500 rounded-3xl animate-pulse"></div><div className="absolute top-0 left-0 w-full h-1 bg-teal-500/5 animate-scan"></div></div><button onClick={onClose} className="w-full py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-colors uppercase tracking-widest text-xs">Abbrechen</button></div>
        </div>
    );
};

export const StoryViewer = ({ story, onClose }: { story: Story, onClose: () => void }) => {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => { if (prev >= 100) { onClose(); return 100; } return prev + 0.5; });
        }, 50); // Slower for video context
        return () => clearInterval(interval);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[500] bg-black flex items-center justify-center animate-fade-in">
            <div className="w-full max-w-lg aspect-[9/16] relative bg-black overflow-hidden flex flex-col shadow-2xl">
                {/* Background Video or Gradient */}
                {story.videoUrl ? (
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
                        <video 
                            ref={videoRef}
                            src={story.videoUrl} 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover grayscale-[0.2] opacity-80"
                        />
                    </div>
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-20`}></div>
                )}

                <div className="absolute top-0 left-0 right-0 p-4 z-20 pt-[calc(1.5rem+env(safe-area-inset-top))]">
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-xs font-bold border-2 border-white/20 shadow-xl`}>
                                {story.trainerAvatar}
                            </div>
                            <div>
                                <div className="text-sm font-black text-white uppercase tracking-tight">{story.trainerName}</div>
                                <div className="text-[10px] text-white/60 font-mono">{story.timestamp} • LIVE</div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/80 hover:text-white transition-all">
                            <X size={24}/>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center p-12 text-center relative z-10">
                    {!story.videoUrl && <h2 className="text-4xl font-black text-white italic drop-shadow-2xl">"{story.caption}"</h2>}
                    {story.videoUrl && (
                        <div className="absolute bottom-32 left-8 right-8 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full mb-3">
                                <Sparkles size={10} /> Performance Check
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{story.caption}</h2>
                        </div>
                    )}
                </div>

                <div className="p-8 bg-gradient-to-t from-black via-black/40 to-transparent pb-[calc(2rem+env(safe-area-inset-bottom))] relative z-20 space-y-4">
                    <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all">
                            <MessageSquare size={16} /> Message
                        </button>
                        <button className="p-4 bg-teal-500/20 border border-teal-500/30 text-teal-400 rounded-2xl hover:bg-teal-500 hover:text-black transition-all group" title="Add to Trust Circle">
                            <Shield size={20} />
                        </button>
                        <button className="p-4 bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 rounded-2xl hover:bg-yellow-500 hover:text-black transition-all" title="Favorite">
                            <Star size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * --- CATEGORY 2: TRAINER MODALS (Booking, Creator, Workflow) ---
 */

export const ManageClassModal = ({ cls, onClose, onCancel, onFindSub }: { cls: RegularClass, onClose: () => void, onCancel: () => void, onFindSub: () => void }) => {
    return (
        <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[48px] w-full max-md animate-bounce-up overflow-hidden shadow-2xl relative"><div className="p-8 border-b border-white/5 bg-surfaceHighlight"><div className="flex justify-between items-start mb-6"><div className="p-3 bg-white/5 rounded-2xl text-gray-400"><Clock size={24} /></div><button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors"><X size={24}/></button></div><h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">Manage Session</h2><p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{cls.title}</p></div><div className="p-8 space-y-4"><button onClick={onFindSub} className="w-full py-6 bg-teal-500 text-black font-black rounded-[24px] shadow-[0_0_40px_rgba(45,212,191,0.2)] hover:bg-white transition-all flex flex-col items-center gap-1 uppercase tracking-[0.2em] text-xs"><Zap size={24} fill="currentColor" className="mb-1" />Vertretung suchen (SOS)<span className="text-[8px] opacity-60 font-bold">Squad & Community aktivieren</span></button><button onClick={onCancel} className="w-full py-6 bg-white/5 border border-white/10 text-rose-500 font-black rounded-[24px] hover:bg-rose-500/10 hover:border-rose-500/30 transition-all flex flex-col items-center gap-1 uppercase tracking-[0.2em] text-xs"><AlertTriangle size={24} className="mb-1" />Klasse absagen<span className="text-[8px] text-gray-500 font-bold tracking-normal italic">Studio wird sofort benachrichtigt</span></button><button onClick={onClose} className="w-full py-4 text-[10px] font-black uppercase text-gray-600 tracking-[0.3em] hover:text-white transition-colors pt-4">Zurück zum Plan</button></div></div>
        </div>
    );
};

export const FindSubWorkflowModal = ({ cls, onClose, onConfirm }: { cls: RegularClass, onClose: () => void, onConfirm: (strategy: string) => void }) => {
    const [strategy, setStrategy] = useState<'INNER' | 'BROADCAST'>('INNER');
    const [isProcessing, setIsProcessing] = useState(false);
    const handleConfirm = () => { setIsProcessing(true); setTimeout(() => { onConfirm(strategy === 'INNER' ? 'Inner Circle' : 'Community Broadcast'); setIsProcessing(false); }, 1500); };
    return (
        <div className="fixed inset-0 z-[260] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="bg-surface border border-teal-500/30 rounded-[48px] w-full max-w-lg animate-bounce-up overflow-hidden shadow-2xl relative"><div className="p-10 border-b border-white/5 bg-surfaceHighlight relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[40px] -mr-16 -mt-16"></div><div className="relative z-10 flex items-center gap-4 mb-4"><div className="p-3 bg-teal-500/20 rounded-2xl text-teal-400"><Search size={28} /></div><div><h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">Sub Finder</h2><p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">Organizing backup for: {cls.title}</p></div></div></div><div className="p-10 space-y-8"><div className="space-y-4"><div onClick={() => setStrategy('INNER')} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-6 relative overflow-hidden ${strategy === 'INNER' ? 'border-teal-500 bg-teal-500/10' : 'border-white/5 bg-white/5 opacity-50 hover:opacity-80'}`}><div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${strategy === 'INNER' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'bg-gray-800 text-gray-500'}`}><Users size={24} /></div><div className="flex-1"><h4 className="font-black text-white uppercase text-sm tracking-widest mb-1">My Inner Circle first</h4><p className="text-[10px] text-gray-400 font-bold leading-tight">Push an deine Favoriten & Freunde. Exklusiv für 15 Min.</p></div>{strategy === 'INNER' && <CheckCircle2 size={24} className="text-teal-400" />}</div><div onClick={() => setStrategy('BROADCAST')} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-6 relative overflow-hidden ${strategy === 'BROADCAST' ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-white/5 opacity-50 hover:opacity-80'}`}><div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${strategy === 'BROADCAST' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-gray-800 text-gray-500'}`}><Users size={24} /></div><div className="flex-1"><h4 className="font-black text-white uppercase text-sm tracking-widest mb-1">Broadcast to Community</h4><p className="text-[10px] text-gray-400 font-bold leading-tight">Sofortiger Post im Radar für alle qualifizierten Trainer.</p></div>{strategy === 'BROADCAST' && <CheckCircle2 size={24} className="text-purple-400" />}</div></div><div className="bg-black/40 border border-white/5 rounded-3xl p-5 flex items-start gap-4"><div className="p-2 bg-blue-500/10 rounded-xl"><ShieldCheck size={18} className="text-blue-400"/></div><p className="text-[10px] text-gray-500 leading-relaxed italic">Das Studio wird erst informiert, wenn ein valider Ersatz gefunden wurde. Deine Zuverlässigkeit bleibt bei <span className="text-white font-bold">100%</span>.</p></div><button onClick={handleConfirm} disabled={isProcessing} className="w-full py-5 bg-white text-black hover:bg-teal-400 transition-all font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs">{isProcessing ? <Loader2 className="animate-spin" size={18} /> : strategy === 'INNER' ? 'Squad aktivieren' : 'Broadcast starten'}</button><button onClick={onClose} className="w-full text-[10px] font-black uppercase text-gray-600 tracking-[0.3em] hover:text-white transition-colors">Abbrechen</button></div></div>
        </div>
    );
};

export const StudentCheckoutModal = ({ cls, onClose, onSuccess }: { cls: OwnClass, onClose: () => void, onSuccess: () => void }) => {
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'DONE'>('IDLE');
    const handlePay = () => { setStatus('PROCESSING'); setTimeout(() => { setStatus('DONE'); setTimeout(onSuccess, 1000); }, 2000); };
    return (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-sm h-[90vh] bg-white rounded-[40px] overflow-hidden flex flex-col shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-[8px] border-gray-900 animate-bounce-up"><div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-col gap-2"><div className="flex justify-between items-center px-2"><X size={20} className="text-gray-400 cursor-pointer" onClick={onClose} /><div className="bg-gray-200/80 px-10 py-1.5 rounded-full flex items-center gap-2"><Lock size={10} className="text-gray-500" /><span className="text-[10px] text-gray-600 font-medium">standin.app</span></div><RefreshCw size={16} className="text-gray-400" /></div></div><div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col p-6 text-gray-900"><div className="mb-8 scale-90 -mt-6"><CreatorFlyerTicket cls={cls} /></div><div className="space-y-4 mb-10"><h3 className="text-xl font-bold tracking-tight">Checkout</h3><div className="bg-white rounded-2xl p-4 border border-gray-200 flex justify-between items-center"><div><p className="text-xs text-gray-500 uppercase font-black">Gast-Ticket</p><p className="font-bold">{cls.title}</p></div><p className="font-mono font-bold text-lg">€{cls.ticketPrice.toFixed(2)}</p></div></div>{status === 'IDLE' ? (<button onClick={handlePay} className="w-full py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"><Apple size={20} fill="currentColor" /> Pay with Apple Pay</button>) : (<div className="flex flex-col items-center justify-center py-5">{status === 'PROCESSING' ? (<><Loader2 className="animate-spin text-gray-400 mb-4" size={32} /><p className="text-sm font-bold text-gray-500">Processing Transaction...</p></>) : (<><div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce-up"><Check size={32} className="text-white" /></div><p className="text-sm font-bold text-green-600">Payment Successful!</p></>)}</div>)}<div className="mt-auto pt-6 text-center"><p className="text-[10px] text-gray-400">Powered by StandIn Guest Checkout Engine</p></div></div></div>
        </div>
    );
};

export const CreatorManagerModal = ({ cls, onClose }: { cls: OwnClass, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[48px] w-full max-w-2xl animate-bounce-up overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"><div className="p-10 border-b border-white/5 bg-surfaceHighlight flex justify-between items-center"><div className="flex items-center gap-4"><div className="p-3 bg-purple-600/20 rounded-2xl text-purple-400"><LayoutGrid size={28} /></div><div><h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">Event Manager</h2><p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{cls.title}</p></div></div><button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-400"><X size={24}/></button></div><div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar"><div className="grid grid-cols-2 gap-6"><div className="bg-white/5 border border-white/5 rounded-3xl p-6"><p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Netto Umsatz</p><p className="text-4xl font-black font-mono text-white">€{cls.revenue.toFixed(2)}</p></div><div className="bg-white/5 border border-white/5 rounded-3xl p-6"><p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Tickets</p><p className="text-4xl font-black font-mono text-teal-400">{cls.ticketsSold}/{cls.capacity}</p></div></div><div className="space-y-6"><div className="flex justify-between items-end px-2"><h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><Users size={18} className="text-purple-400" /> Gästeliste</h3><button className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Export CSV</button></div><div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">{[1,2,3].map((_, idx) => (<div key={idx} className="p-5 flex justify-between items-center hover:bg-white/5 transition-colors"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-black text-[10px]">G{idx}</div><div><p className="text-sm font-bold text-white">Student {idx}</p><p className="text-[10px] text-gray-600 font-mono">Paid ✅</p></div></div></div>))}</div></div><div className="bg-blue-500/5 border border-blue-500/10 rounded-[32px] p-6 flex items-start gap-4"><div className="p-2 bg-blue-500/20 rounded-xl text-blue-400"><Info size={20} /></div><p className="text-xs text-gray-500 leading-relaxed">Auszahlungen erfolgen automatisch nach dem Event innerhalb von 24h.</p></div></div></div>
        </div>
    );
};

/**
 * --- CATEGORY 3: SCHOOL MODALS (Operations, Inventory, SOS) ---
 */

export const ImportModal = ({ onClose, onImportSuccess, onManualCreate }: { onClose: () => void, onImportSuccess: (data: RegularClass[]) => void, onManualCreate: () => void }) => {
    const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'PREVIEW' | 'SUCCESS'>('IDLE');
    const [extractedClasses, setExtractedClasses] = useState<RegularClass[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleMagicImport = (mode: string) => { 
        if (mode === 'AI' && fileInputRef.current) {
            fileInputRef.current.click();
            return;
        }
        setStatus('SCANNING'); 
        setTimeout(() => { 
            // Default Fallback
            setExtractedClasses(MOCK_SCHEDULE.map(c => ({ ...c, baseFee: 40 }))); 
            setStatus('PREVIEW'); 
        }, 2000); 
    };

    const handleFileChange = () => {
        setStatus('SCANNING');
        // REFINED AI EXTRACTION SIMULATION (Targeted: Morning Yoga & Pilates Flow)
        setTimeout(() => {
            const aiData: RegularClass[] = [
                {
                    id: crypto.randomUUID(),
                    title: 'Morning Yoga',
                    category: 'BODY_MIND',
                    day: 'Mo', 
                    timeStart: '09:00',
                    timeEnd: '10:30',
                    room: 'Studio 2',
                    regularTeacher: 'Elena',
                    baseFee: 40 
                },
                {
                    id: crypto.randomUUID(),
                    title: 'Pilates Flow',
                    category: 'BODY_MIND',
                    day: 'Mo', 
                    timeStart: '10:30',
                    timeEnd: '12:00',
                    room: 'Studio 2',
                    regularTeacher: 'Julia',
                    baseFee: 40 
                }
            ];
            setExtractedClasses(aiData);
            setStatus('PREVIEW');
        }, 3000);
    };

    const updateFee = (id: string, fee: number) => {
        setExtractedClasses(prev => prev.map(c => c.id === id ? { ...c, baseFee: fee } : c));
    };

    const handleConfirmImport = () => {
        setStatus('SUCCESS');
        // We use the refined list including updated prices
        onImportSuccess(extractedClasses);
    };

    return (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[32px] w-full max-w-2xl animate-bounce-up overflow-hidden shadow-2xl relative">
                <div className="p-8 border-b border-white/5 bg-surfaceHighlight flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <RefreshCw className={`text-teal-400 ${status === 'SCANNING' ? 'animate-spin' : ''}`} />
                            Schedule Import
                        </h2>
                        <p className="text-gray-500 text-sm">Vorschau & Validierung der erkannten Daten.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"><X size={20}/></button>
                </div>

                <div className="p-8">
                    {status === 'IDLE' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                            <button onClick={() => handleMagicImport('AI')} className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all flex flex-col items-center gap-4 text-center">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                    <Camera size={28} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase block tracking-widest">AI Photo Scan</span>
                                    <p className="text-[9px] text-gray-500 mt-1 uppercase">Stundenplan abfotografieren</p>
                                </div>
                            </button>
                            <button onClick={onManualCreate} className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/40 transition-all flex flex-col items-center gap-4 text-center">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                                    <MousePointer2 size={28} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase block tracking-widest">Manuell</span>
                                    <p className="text-[9px] text-gray-500 mt-1 uppercase">Slots händisch belegen</p>
                                </div>
                            </button>
                        </div>
                    )}

                    {status === 'SCANNING' && (
                        <div className="py-20 text-center">
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 border-4 border-teal-500/10 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-teal-400">
                                    <Sparkles size={32} className="animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 italic tracking-tighter uppercase">Vision Core extraction...</h3>
                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">Analysing Schedule Artifacts</p>
                        </div>
                    )}

                    {status === 'PREVIEW' && (
                        <div className="space-y-6 animate-fade-in max-h-[60vh] flex flex-col">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-xs font-black uppercase tracking-widest text-teal-400 flex items-center gap-2">
                                    <CheckCircle2 size={14} /> Scan Resultate ({extractedClasses.length})
                                </h3>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Honorar pro Kurs anpassen</span>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar border border-white/5 rounded-2xl bg-black/40">
                                <table className="w-full text-left border-collapse">
                                    <thead className="sticky top-0 bg-surfaceHighlight border-b border-white/5 z-10">
                                        <tr className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                            <th className="p-4">Kurs / Zeit</th>
                                            <th className="p-4">Lehrer</th>
                                            <th className="p-4 text-right">Gage (€)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {extractedClasses.map(cls => (
                                            <tr key={cls.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-4">
                                                    <div className="font-bold text-sm text-white">{cls.title}</div>
                                                    <div className="text-[10px] text-gray-500 mt-0.5">{cls.day} • {cls.timeStart} Uhr</div>
                                                </td>
                                                <td className="p-4 text-xs text-gray-400 font-bold italic">{cls.regularTeacher}</td>
                                                <td className="p-4 text-right">
                                                    <div className="inline-flex items-center bg-black border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-teal-500 transition-all">
                                                        <Euro size={12} className="text-gray-500 mr-2" />
                                                        <input 
                                                            type="number" 
                                                            value={cls.baseFee} 
                                                            onChange={(e) => updateFee(cls.id, Number(e.target.value))}
                                                            className="bg-transparent text-white font-mono font-bold text-sm w-12 outline-none text-right"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <button onClick={handleConfirmImport} className="w-full py-5 bg-teal-500 text-black font-black rounded-2xl shadow-xl hover:bg-white transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 group">
                                <Rocket size={18} className="group-hover:-translate-y-1 transition-transform" />
                                Bestätigen & Speichern
                            </button>
                        </div>
                    )}

                    {status === 'SUCCESS' && (
                        <div className="py-20 text-center animate-bounce-up">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                                <Check size={40} className="text-black" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Daten Transferiert ✅</h3>
                            <p className="text-sm text-gray-500 font-medium">Die Kurse erscheinen nun in deinem Kalender.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ManualClassEntryModal = ({ day, hour, onClose, onSubmit }: { day: string, hour: number, onClose: () => void, onSubmit: (data: Partial<RegularClass>) => void }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<JobCategory>('DANCE');
    const [teacher, setTeacher] = useState('');
    const [room, setRoom] = useState('Studio 1');
    const [fee, setFee] = useState(40);

    const handleSubmit = () => {
        onSubmit({
            title: title || 'Neue Klasse',
            category,
            day,
            timeStart: `${hour.toString().padStart(2, '0')}:00`,
            timeEnd: `${(hour + 1).toString().padStart(2, '0')}:30`,
            regularTeacher: teacher || 'Unbekannt',
            room,
            baseFee: fee
        });
    };

    return (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[40px] w-full max-w-md animate-bounce-up overflow-hidden shadow-2xl relative">
                <div className="p-8 border-b border-white/5 bg-surfaceHighlight flex justify-between items-center">
                    <div><h2 className="text-2xl font-black text-white uppercase tracking-tighter">Neue Klasse</h2><p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{DAYS_FULL[day]} • {hour}:00 Uhr</p></div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X size={20}/></button>
                </div>
                <div className="p-8 space-y-6">
                    <div><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Titel</label><input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-teal-500" placeholder="z.B. Morning Yoga" /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Lehrer</label><input value={teacher} onChange={e => setTeacher(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-teal-500" placeholder="Name" /></div>
                        <div><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Kategorie</label><select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-teal-500"><option value="DANCE">Dance</option><option value="BODY_MIND">Body & Mind</option></select></div>
                    </div>
                    <div><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Basis Gage (€)</label><input type="number" value={fee} onChange={e => setFee(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-teal-500" /></div>
                    <button onClick={handleSubmit} className="w-full py-5 bg-teal-500 text-black font-black rounded-2xl shadow-xl hover:bg-white transition-all uppercase tracking-widest text-xs">Kurs Speichern</button>
                </div>
            </div>
        </div>
    );
};

const DAYS_FULL: Record<string, string> = { 'Mo': 'Montag', 'Di': 'Dienstag', 'Mi': 'Mittwoch', 'Do': 'Donnerstag', 'Fr': 'Freitag', 'Sa': 'Samstag', 'So': 'Sonntag' };

export const CancellationModal = ({ job, onClose, onChooseOptionA, onChooseOptionB }: { job: Job, onClose: () => void, onChooseOptionA: () => void, onChooseOptionB: () => void }) => {
    return (
        <div className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-surface border border-red-500/30 rounded-3xl w-full max-w-2xl animate-bounce-up relative shadow-[0_0_50px_rgba(239,68,68,0.2)] max-h-[90vh] flex flex-col"><div className="bg-red-500/10 p-6 border-b border-red-500/20 flex items-center gap-4 flex-shrink-0"><AlertTriangle size={24} className="text-red-500" /><div><h2 className="text-xl font-bold text-white">Achtung: Kurzfristige Absage</h2><p className="text-red-300 text-sm">Weniger als 24h verbleibend.</p></div><button onClick={onClose} className="ml-auto p-2 hover:bg-white/10 rounded-full"><X size={20}/></button></div><div className="p-8 overflow-y-auto"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div onClick={onChooseOptionA} className="bg-surfaceHighlight border border-teal-500/30 rounded-2xl p-6 cursor-pointer group hover:border-teal-500 transition-all"><h3 className="font-bold text-lg text-white mb-2">Ersatz finden</h3><p className="text-xs text-gray-400 mb-6">Nutze deinen Inner Circle oder die Community, um den Job weiterzugeben.</p><button className="w-full py-3 bg-teal-500 text-black font-bold rounded-xl text-sm">Squad aktivieren <ArrowRight size={16} /></button></div><div onClick={onChooseOptionB} className="bg-surfaceHighlight border border-red-500/20 rounded-2xl p-6 cursor-pointer group hover:border-red-500 transition-all"><h3 className="font-bold text-lg text-white mb-2">Jetzt stornieren</h3><p className="text-xs text-gray-400 mb-6">Wir übernehmen den Ersatz. Die Kosten trägst du.</p><div className="bg-black/40 rounded-xl p-3 border border-white/5 mb-6 flex justify-between items-center"><span className="text-[10px] text-gray-500 uppercase font-black">Gebühr</span><span className="text-red-400 font-mono font-bold">€15.00</span></div><button className="w-full py-3 bg-white/5 text-gray-400 border border-white/10 font-bold rounded-xl text-sm">Kostenpflichtig Exit</button></div></div></div></div>
        </div>
    );
};

export const InvoiceModal = ({ user, onClose }: { user: UserProfile, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[32px] w-full max-w-2xl h-[80vh] flex flex-col animate-bounce-up overflow-hidden shadow-2xl"><div className="p-6 border-b border-white/10 flex justify-between items-center bg-surfaceHighlight"><h2 className="text-xl font-bold flex items-center gap-2"><FileText size={20} className="text-teal-400"/> Rechnungen</h2><button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button></div><div className="flex-1 overflow-y-auto p-8 space-y-4">{[1,2,3,4,5].map(i => (<div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all"><div><div className="font-bold text-white">RE-2025-00{i}</div><div className="text-xs text-gray-500">0{i}.12.2025</div></div><div className="flex items-center gap-4"><span className="font-mono text-white">€{(45 * i).toFixed(2)}</span></div></div>))}</div><div className="p-6 border-t border-white/10 bg-surfaceHighlight flex justify-end"><button onClick={onClose} className="px-6 py-2 bg-white text-black font-bold rounded-xl">Fertig</button></div></div>
        </div>
    );
};

export const LiveTrackingModal = ({ job, onClose }: { job: Job, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[40px] w-full max-w-md animate-bounce-up overflow-hidden shadow-2xl"><div className="h-64 bg-gray-800 relative overflow-hidden flex items-center justify-center"><div className="z-10 flex flex-col items-center"><div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center animate-bounce shadow-xl shadow-teal-500/20"><Navigation size={24} className="text-black" /></div><span className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Satellite Link Active</span></div><button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white z-20"><X size={20}/></button></div><div className="p-8 space-y-6"><div className="flex justify-between items-end"><div><h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">Live Tracking</h2><p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{job.title}</p></div><div className="text-right"><div className="text-3xl font-black font-mono text-teal-400">8m</div><div className="text-[8px] font-bold text-gray-600 uppercase">Ankunft</div></div></div><div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3"><div className="flex justify-between items-center text-xs"><span className="text-gray-500 font-bold uppercase">Status</span><span className="text-teal-400 font-black uppercase">Unterwegs</span></div><div className="flex justify-between items-center text-xs"><span className="text-gray-500 font-bold uppercase">Distanz</span><span className="text-white font-bold">2.4 km</span></div></div><button className="w-full py-4 bg-teal-500 text-black font-black rounded-xl flex items-center justify-center gap-2 text-xs uppercase shadow-lg shadow-teal-500/10"><Phone size={16} /> Trainer Kontaktieren</button></div></div>
        </div>
    );
};

// --- ADDITIONAL EXPORTED MODALS ---

// Class Creator Wizard for Trainers
export const ClassCreatorWizard = ({ space, onClose, onPublish }: { space: MarketplaceItem, onClose: () => void, onPublish: (cls: OwnClass) => void }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(20);
    return (
        <div className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[48px] w-full max-w-lg animate-bounce-up overflow-hidden shadow-2xl p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Event Erstellen</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500"><X size={24}/></button>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Event Titel</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold outline-none" placeholder="z.B. Heels Masterclass" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Ticket Preis (€)</label>
                        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                    </div>
                    <button onClick={() => {
                        onPublish({
                            id: crypto.randomUUID(),
                            title: title || 'New Event',
                            roomName: space.location,
                            date: 'Heute',
                            time: '18:00 - 19:30',
                            ticketPrice: price,
                            ticketsSold: 0,
                            capacity: 20,
                            revenue: 0,
                            status: 'UPCOMING',
                            theme: 'NEON',
                            hostName: 'Urban'
                        });
                        onClose();
                    }} className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs">
                        Event Veröffentlichen
                    </button>
                </div>
            </div>
        </div>
    );
};

// Travel/Tour Wizard Modal
export const TravelModal = ({ onClose, onSetLocation }: { onClose: () => void, onSetLocation: (loc: string) => void }) => {
    return (
        <div className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[48px] w-full max-w-lg animate-bounce-up overflow-hidden shadow-2xl p-10 text-center">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/30">
                    <Plane size={40} className="text-yellow-500" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Tour Wizard</h2>
                <p className="text-gray-500 text-sm mb-8">Wohin geht die Reise? Wir finden die passenden Studios für dich.</p>
                <div className="flex gap-4 mb-8">
                    <input placeholder="Stadt suchen..." className="flex-1 bg-black border border-white/10 rounded-2xl p-4 text-white outline-none" />
                    <button onClick={() => { onSetLocation('Berlin'); onClose(); }} className="px-8 py-4 bg-yellow-500 text-black font-black rounded-2xl uppercase tracking-widest text-xs">Suchen</button>
                </div>
                <button onClick={onClose} className="text-[10px] font-black uppercase text-gray-600 tracking-widest hover:text-white">Schließen</button>
            </div>
        </div>
    );
};

// Inner Circle Dispatch Modal
export const InnerCircleModal = ({ onClose, onSend, prefillTitle }: { onClose: () => void, onSend: () => void, prefillTitle: string }) => {
    return (
        <div className="fixed inset-0 z-[270] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="bg-surface border border-teal-500/30 rounded-[48px] w-full max-w-lg animate-bounce-up overflow-hidden shadow-2xl p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Inner Circle</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500"><X size={24}/></button>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5">
                    <p className="text-xs text-gray-400 mb-2 uppercase font-black">Empfänger: Deine Top 5 Favoriten</p>
                    <div className="font-bold text-lg text-white">"Hey, könntest du kurzfristig für {prefillTitle} einspringen?"</div>
                </div>
                <button onClick={onSend} className="w-full py-5 bg-teal-500 text-black font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    <Send size={18} /> Nachricht Senden
                </button>
            </div>
        </div>
    );
};

// Radar Control for Schools
export const RadarControlModal = ({ job, onClose, onUpdate }: { job: Job, onClose: () => void, onUpdate: (id: string, updates: any) => void }) => {
    return (
        <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[40px] w-full max-w-md animate-bounce-up overflow-hidden shadow-2xl p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Radar Control</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500"><X size={24}/></button>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Dringlichkeit anpassen</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['STANDARD', 'SOS_LEVEL_1', 'SOS_LEVEL_2', 'SOS_LEVEL_3'] as UrgencyLevel[]).map(level => (
                                <button key={level} onClick={() => onUpdate(job.id, { urgency: level })} className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest ${job.urgency === level ? 'bg-teal-500 text-black border-teal-500' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="w-full py-4 bg-white text-black font-black rounded-xl uppercase tracking-widest text-xs">Fertig</button>
                </div>
            </div>
        </div>
    );
};

// Bulk Space Offer Configuration
export const SpaceOfferModal = ({ slots, onClose, onConfirm }: { slots: {day: string, hour: number}[], onClose: () => void, onConfirm: (slots: {day: string, hour: number}[], price: number) => void }) => {
    const [price, setPrice] = useState(35);
    return (
        <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-[40px] w-full max-w-md animate-bounce-up overflow-hidden shadow-2xl p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Space Offer</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500"><X size={24}/></button>
                </div>
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-4xl font-black text-teal-400 mb-2">{slots.length} Slots</div>
                        <p className="text-xs text-gray-500 uppercase font-black">ausgewählt zur Vermietung</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 block">Preis pro Stunde (€)</label>
                        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                    </div>
                    <button onClick={() => onConfirm(slots, price)} className="w-full py-5 bg-teal-500 text-black font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                        Markt freigeben
                    </button>
                </div>
            </div>
        </div>
    );
};
