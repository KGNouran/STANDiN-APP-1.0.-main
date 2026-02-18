
import React, { useState, useEffect } from 'react';
import { 
  Clock, MapPin, ArrowRight, Building, Ticket, Move, Flower, Sparkles, Mic, 
  QrCode, Plus, Play, CheckCheck, PartyPopper, Calendar, Navigation, Share2, Download, Camera, ShieldCheck, Instagram, Link as LinkIcon, Loader2, CheckCircle2, Shield, CreditCard, Star, Zap
} from 'lucide-react';
import { Job, Story, JobCategory, UrgencyLevel, OwnClass } from '../types';
import { URGENCY_COLORS, MOCK_STORIES } from '../constants';

export const CountUp = ({ end, duration = 1500, prefix = '', suffix = '' }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{prefix}{count.toFixed(2)}{suffix}</span>;
};

/**
 * HIGH-END INSTAGRAM READY FLYER TICKET
 * Optimiert für Social Media & Direct Booking
 */
export const CreatorFlyerTicket = ({ cls, onShare }: { cls: OwnClass, onShare?: () => void }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 2000);
    };

    // Dynamische Hintergründe basierend auf Keywords im Titel
    const getBgImage = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('yoga') || t.includes('zen')) return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800';
        if (t.includes('hip hop') || t.includes('urban')) return 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=800';
        if (t.includes('heels') || t.includes('dance')) return 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800';
        return 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800';
    };

    const themes = {
        'NEON': 'from-indigo-600/80 via-purple-600/80 to-pink-500/80',
        'CLEAN': 'from-gray-900/90 via-gray-800/90 to-black/90',
        'GLITCH': 'from-cyan-500/80 via-blue-600/80 to-purple-600/80',
        'ZEN': 'from-teal-800/80 via-emerald-900/80 to-black/80'
    };

    const currentTheme = themes[cls.theme || 'NEON'];

    return (
        <div className="relative group w-full max-w-[320px] mx-auto">
            {/* Quick Actions (Floating) */}
            <div className="absolute -top-12 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-50 transform translate-y-2 group-hover:translate-y-0">
                <button onClick={handleExport} className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all shadow-xl">
                    <Download size={18} />
                </button>
                <button onClick={onShare} className="p-2.5 bg-teal-400 text-black rounded-full font-bold shadow-lg shadow-teal-400/20 hover:scale-110 transition-all">
                    <Instagram size={18} />
                </button>
            </div>

            {/* FLYER CONTAINER (4:6 Ratio for Stories) */}
            <div className={`relative w-full aspect-[4/6] rounded-[40px] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-700 ${isExporting ? 'scale-95 blur-sm' : 'scale-100 group-hover:shadow-teal-500/20 group-hover:border-white/20'}`}>
                
                {/* Background Image & Gradient Layer */}
                <div className="absolute inset-0">
                    <img src={getBgImage(cls.title)} alt="Vibe" className="w-full h-full object-cover grayscale-[0.2] brightness-[0.4]" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme} mix-blend-overlay`}></div>
                </div>
                
                {/* EXCLUSIVE BADGE (STÖRER) */}
                <div className="absolute top-8 left-[-45px] -rotate-45 bg-teal-400 text-black px-14 py-1.5 shadow-2xl z-30 border-y border-teal-500/50">
                    <div className="flex items-center justify-center gap-2">
                        <Zap size={10} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tickets only on standIn</span>
                    </div>
                </div>

                {/* Main Content Overlay */}
                <div className="relative h-full flex flex-col p-8 z-10 text-white">
                    
                    {/* Header: Branding */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2.5">
                            <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 flex items-center justify-center font-black text-lg shadow-2xl">
                                {cls.hostName?.substring(0,2).toUpperCase() || 'SI'}
                            </div>
                            <div>
                                <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50">Hosted by</div>
                                <div className="text-sm font-bold tracking-tight">{cls.hostName || 'StandIn Creator'}</div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2">
                            <QrCode size={24} className="opacity-80" />
                        </div>
                    </div>

                    {/* Body: Title */}
                    <div className="flex-1 flex flex-col justify-end mb-8">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[8px] font-black uppercase tracking-[0.3em] text-teal-400">
                                <Sparkles size={10} /> Limited Masterclass
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.85] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                                {cls.title}
                            </h2>
                        </div>
                    </div>

                    {/* Footer: Details */}
                    <div className="mt-auto space-y-6">
                        <div className="grid grid-cols-2 gap-4 items-end">
                            <div className="space-y-3">
                                <div>
                                    <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Schedule</div>
                                    <div className="text-xs font-bold">{cls.date} • {cls.time.split(' - ')[0]}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Location</div>
                                    <div className="text-xs font-bold truncate max-w-[100px]">{cls.roomName}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Entry</div>
                                <div className="text-4xl font-black font-mono tracking-tighter">€{cls.ticketPrice}</div>
                            </div>
                        </div>

                        {/* FINAL STANDIN BRANDING */}
                        <div className="pt-6 border-t border-white/20 flex flex-col items-center gap-3">
                            <div className="text-center w-full">
                                <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/60 mb-2">Book your spot via</div>
                                <div className="bg-white text-black px-4 py-2 rounded-full font-black text-[10px] tracking-widest shadow-xl flex items-center justify-center gap-2">
                                    standin.app/<span className="text-teal-600 font-bold">tickets</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                <span className="text-[7px] font-black uppercase tracking-widest">Powered by</span>
                                <div className="w-4 h-4 bg-black rounded flex items-center justify-center text-[7px] font-black">SI</div>
                                <span className="text-[7px] font-bold tracking-tighter uppercase">stand<span className="text-teal-400">In</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glassy Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>
        </div>
    );
};

export const JobCard = ({ job, onAccept }: { job: Job, onAccept: (job: Job) => void, key?: React.Key }) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const mockDistance = (job.id.charCodeAt(0) % 8 + 1.2).toFixed(1); 
  
  const handleInternalAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
        onAccept(job);
    }, 800);
  };

  // Fixed: UrgencyLevel comparison mismatch by changing 'Standard' to 'STANDARD'.
  const isUrgent = job.urgency !== 'STANDARD';

  return (
    <div className={`group relative h-64 glass-panel rounded-3xl transition-all duration-500 overflow-hidden flex ${isAccepting ? 'scale-90 opacity-0 translate-y-10 blur-md' : 'scale-100 opacity-100'} hover:border-white/20 hover:shadow-2xl hover:translate-y-[-4px]`}>
      
      {isAccepting && (
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in">
              <Loader2 className="animate-spin text-white mb-2" size={32} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white font-mono">Processing...</span>
          </div>
      )}

      {/* TICKET LEFT (CONTENT) */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2">
                    <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-gray-500">
                        {job.category}
                    </div>
                    {isUrgent && (
                        <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border animate-pulse-slow ${URGENCY_COLORS[job.urgency]}`}>
                            {job.urgency}
                        </div>
                    )}
                </div>
                <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest font-mono">{job.date}</div>
            </div>

            <h3 className="text-xl font-bold text-white leading-none mb-2 truncate group-hover:text-primary transition-colors">{job.title}</h3>
            
            <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded bg-black/40 flex items-center justify-center font-bold text-[8px] border border-white/5 text-gray-500">{job.studioName.charAt(0)}</div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">{job.studioName}</span>
            </div>
        </div>

        <div className="flex gap-4 items-end">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={12} />
                    <span className="font-mono text-[10px] font-bold text-gray-400">{job.timeStart} - {job.timeEnd}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Navigation size={12} className="text-teal-500" />
                    <span className="text-[10px] font-bold">{mockDistance} km</span>
                </div>
            </div>
            
            <button 
                onClick={handleInternalAccept}
                className="ml-auto w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-primary transition-all active:scale-90"
            >
                <ArrowRight size={18} />
            </button>
        </div>
      </div>

      {/* TICKET PERFORATION LINE */}
      <div className="w-px border-l border-dashed border-white/20 my-4 relative">
          <div className="absolute -top-6 -left-2 w-4 h-4 bg-background rounded-full border border-white/5"></div>
          <div className="absolute -bottom-6 -left-2 w-4 h-4 bg-background rounded-full border border-white/5"></div>
      </div>

      {/* TICKET RIGHT (FEE) */}
      <div className="w-24 bg-black/20 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1 rotate-90 origin-center whitespace-nowrap">Session Fee</div>
          <div className="text-2xl font-mono font-black text-white mt-2">€{job.totalFee.toFixed(0)}</div>
          {isUrgent && <div className="text-[8px] font-black text-teal-400 mt-1">SOS +50%</div>}
      </div>
    </div>
  );
};

export const TicketView = ({ job }: { job: Job }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  if (!job) return null;

  const handleScan = () => {
    if (isVerified) return;
    setIsScanning(true);
    setTimeout(() => {
        setIsScanning(false);
        setIsVerified(true);
    }, 1500);
  };

  return (
    <div className={`w-full max-w-sm mx-auto h-[500px] rounded-[48px] border-t border-white/20 shadow-2xl overflow-hidden relative flex flex-col transition-all duration-700 ${isVerified ? 'bg-teal-500/10 border-teal-500/30' : 'bg-surfaceHighlight border-white/10'}`}>
        
        {/* Background Animation */}
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none transition-colors duration-1000 ${isVerified ? 'bg-teal-500/30' : 'bg-primary/5'}`}></div>
        
        {/* Success Overlay */}
        {isVerified && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md animate-fade-in text-center p-8">
                <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(45,212,191,0.5)] animate-bounce-up">
                    <CheckCircle2 size={48} className="text-black" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Check-in Success</h3>
                <p className="text-teal-400 font-mono text-sm">Payment released via Stripe.</p>
            </div>
        )}

        {/* Scanning Overlay */}
        {isScanning && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-lg animate-fade-in">
                <Loader2 size={48} className="text-teal-400 animate-spin mb-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Verifying Handshake...</span>
            </div>
        )}

        <div className="p-10 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-black text-xs">
                    {job.studioName.substring(0,2).toUpperCase()}
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Session ID</div>
                    <div className="text-sm font-mono text-white">#STN-{job.id.slice(-4).toUpperCase()}</div>
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-4xl font-black tracking-tighter leading-none mb-4 uppercase">{job.title}</h2>
                <div className="flex items-center gap-2 text-gray-500">
                    <Building size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">{job.studioName}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-auto">
                <div>
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Starts</div>
                    <div className="text-2xl font-black font-mono text-white">{job.timeStart}</div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Ends</div>
                    <div className="text-2xl font-black font-mono text-white">{job.timeEnd}</div>
                </div>
            </div>

            {/* THE QR CORE - INTERACTIVE */}
            <div 
                onClick={handleScan}
                className="relative group cursor-pointer mt-8"
            >
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-white p-6 rounded-[32px] relative z-10 shadow-2xl transition-transform group-hover:scale-[1.02] group-active:scale-95">
                    <QrCode size={140} className="text-black mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/80 backdrop-blur-sm rounded-[32px] transition-opacity">
                        <div className="flex flex-col items-center gap-2">
                            <Navigation className="text-black animate-pulse" />
                            <span className="text-[10px] font-black text-black uppercase tracking-widest">Tap to Scan</span>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Check-in at Reception</div>
                </div>
            </div>
        </div>

        {/* Ticket Perforation */}
        <div className="h-10 flex items-center px-4 relative">
            <div className="absolute -left-5 w-10 h-10 bg-background rounded-full border border-white/5"></div>
            <div className="absolute -right-5 w-10 h-10 bg-background rounded-full border border-white/5"></div>
            <div className="w-full border-t border-dashed border-white/20"></div>
        </div>

        <div className="p-8 bg-black/40 backdrop-blur-xl flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/20 rounded-lg"><Shield size={16} className="text-teal-400" /></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Escrow Active</span>
            </div>
            <div className="font-mono font-bold text-white text-lg">€{job.totalFee.toFixed(0)}</div>
        </div>
    </div>
  );
};

export const StoryRail = ({ onOpenStory }: { onOpenStory: (story: Story) => void }) => {
    return (
        <div className="mb-8 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2 cursor-pointer min-w-[72px]">
                    <div className="w-18 h-18 rounded-full border border-dashed border-white/30 p-1 hover:border-white transition-colors">
                        <div className="w-16 h-16 rounded-full bg-surfaceHighlight flex items-center justify-center">
                            <Plus size={24} className="text-gray-400" />
                        </div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">Add Story</span>
                </div>

                {MOCK_STORIES.map(story => (
                    <div 
                        key={story.id} 
                        onClick={() => onOpenStory(story)}
                        className="flex flex-col items-center gap-2 cursor-pointer min-w-[72px] group"
                    >
                        <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] transform transition-transform duration-300 group-hover:scale-105">
                            <div className="w-16 h-16 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-sm font-bold overflow-hidden relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-50`}></div>
                                <span className="relative z-10 font-mono">{story.trainerAvatar}</span>
                            </div>
                        </div>
                        <span className="text-xs text-gray-300 truncate w-16 text-center">{story.trainerName}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
