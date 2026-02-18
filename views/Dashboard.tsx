
import React, { useState } from 'react';
import { 
    Users, CreditCard, Loader2, Navigation, Zap, AlertTriangle, 
    ArrowRight, Wallet, CheckCircle2, Coins, Locate, 
    Sparkles, ShieldCheck, MapPin, Instagram, Link as LinkIcon,
    Plus, LayoutGrid, Eye, Share2, Receipt, Clock, ExternalLink, X, User, ChevronDown, Check, DollarSign, Play, Star, Globe, MessageSquare
} from 'lucide-react';
import { Job, UserProfile, OwnClass, JobApplication, JobApplicationWithProfile } from '../types';
import { TrustLevelCard, ReviewModal } from '../components/TrustSystem';
import { TicketView, CreatorFlyerTicket, CountUp } from '../components/Shared';

/**
 * MODAL: QUICK TRAINER PREVIEW
 * Eine kompakte, hochglanz Version der Sedcard für das schnelle Review im Cockpit.
 */
const TrainerPreviewModal = ({ trainer, jobId, onConfirm, onClose }: { trainer: UserProfile, jobId: string, onConfirm: (jId: string, tId: string) => void, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-fade-in">
            <div className="bg-surface border border-white/10 rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 transition-all"><X size={24}/></button>
                
                {/* Visual Side (Videos/Image) */}
                <div className="w-full md:w-1/2 bg-black relative border-r border-white/5 overflow-y-auto custom-scrollbar p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400"><Play size={20} /></div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Performance Check</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                        {trainer.sedcard?.gallery && trainer.sedcard.gallery.length > 0 ? (
                            trainer.sedcard.gallery.map((url, idx) => (
                                <div key={idx} className="aspect-video bg-surfaceHighlight rounded-2xl border border-white/5 relative group overflow-hidden shadow-xl">
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play size={20} className="fill-white text-white ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/40 uppercase truncate max-w-[150px]">{url}</div>
                                </div>
                            ))
                        ) : (
                            <div className="aspect-video bg-surfaceHighlight rounded-2xl border border-dashed border-white/5 flex flex-col items-center justify-center opacity-30 text-center p-6">
                                <Users size={32} className="mb-2" />
                                <p className="text-[9px] font-black uppercase">Keine Videos hinterlegt</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Side */}
                <div className="flex-1 p-10 overflow-y-auto custom-scrollbar flex flex-col">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-black text-2xl border border-white/10 shadow-xl relative">
                            {trainer.avatarInitials}
                            {trainer.is_verified && <div className="absolute -bottom-1 -right-1 bg-teal-500 text-black rounded-full p-1 border-2 border-surface"><ShieldCheck size={14} /></div>}
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{trainer.name}</h2>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <MapPin size={12} className="text-teal-400" /> Berlin
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Trust Score</div>
                            <div className="text-xl font-black font-mono text-teal-400">{trainer.trustScore || 85}%</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Reliability</div>
                            <div className="text-xl font-black font-mono text-purple-400">{trainer.reliability || 100}%</div>
                        </div>
                    </div>

                    <div className="mb-10 flex-1">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Background</h4>
                        <p className="text-sm text-gray-300 leading-relaxed italic mb-8">
                            "{trainer.bio || "Professioneller Artist im StandIn Cloud Netzwerk. Fokus auf Qualität und Zuverlässigkeit."}"
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {trainer.skills?.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-bold text-teal-400 uppercase tracking-wider">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex gap-4 mt-auto">
                        <div className="flex gap-2">
                            <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/5"><Instagram size={20}/></button>
                            <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/5"><Globe size={20}/></button>
                        </div>
                        <button 
                            onClick={() => { onConfirm(jobId, trainer.id); onClose(); }}
                            className="flex-1 py-4 bg-teal-500 text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(45,212,191,0.2)]"
                        >
                            Trainer Buchen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * NUDGE CARD: REVIEW REQUIRED
 */
const ReviewNudgeCard = ({ job, onRate, role }: { job: Job, onRate: (job: Job) => void, role: 'STUDIO' | 'TRAINER' }) => (
    <div className="bg-surfaceHighlight/60 border border-teal-500/30 rounded-3xl p-6 relative overflow-hidden group shadow-2xl animate-bounce-up">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shadow-neon">
                <Star size={28} className="fill-teal-400" />
            </div>
            <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Feedback fällig</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Mission "{job.title}" abgeschlossen
                </p>
            </div>
        </div>
        <button 
            onClick={() => onRate(job)}
            className="w-full py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-teal-400 transition-all flex items-center justify-center gap-2 shadow-xl"
        >
            Jetzt Bewerten <ArrowRight size={14} />
        </button>
    </div>
);

const ApplicantRow = ({ app, onConfirm, onPreview }: { app: JobApplicationWithProfile, onConfirm: (tId: string) => void, onPreview: (profile: UserProfile) => void }) => {
    if (!app) return null;
    const profile = app?.trainerProfile;

    return (
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10 flex-1" onClick={() => profile && onPreview(profile)}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-black text-sm border border-white/5 shadow-inner transition-transform group-hover:scale-105">
                    {profile?.avatarInitials || 'TR'}
                    {profile?.sedcard?.gallery && profile.sedcard.gallery.length > 0 && (
                         <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-black flex items-center justify-center animate-pulse">
                             <Play size={8} fill="white" className="ml-0.5" />
                         </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="font-black text-white text-sm uppercase tracking-tight group-hover:text-teal-400 transition-colors">{profile?.name || 'Trainer'}</div>
                        <ShieldCheck size={12} className="text-teal-500" />
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                        <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-1">
                            <Star size={8} className="text-yellow-500 fill-yellow-500" /> 4.9
                        </div>
                        <div className="text-[9px] text-teal-400 font-black uppercase tracking-widest border-l border-white/10 pl-3">Sedcard ansehen</div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
                <button 
                    onClick={(e) => { e.stopPropagation(); onConfirm(app?.trainerId || ''); }}
                    className="px-6 py-2.5 bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-teal-500 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                    Buchen
                </button>
            </div>
        </div>
    );
};

const ApplicantCard = ({ job, applications, onConfirmTrainer, onPreviewTrainer }: { job: Job, applications: JobApplicationWithProfile[], onConfirmTrainer: (jId: string, tId: string) => void, onPreviewTrainer: (profile: UserProfile, jId: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false); 
    if (!job) return null;
    
    const jobApplications = (applications || []).filter(a => a && a.jobId === job?.id);
    const count = jobApplications.length || job?.applicant_count || 0;
    
    return (
        <div className="flex flex-col gap-2">
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-surfaceHighlight border rounded-[24px] p-5 flex items-center justify-between hover:border-teal-500/40 transition-all group cursor-pointer ${isOpen ? 'border-teal-500/40 shadow-[0_0_40px_rgba(45,212,191,0.05)]' : 'border-teal-500/20'}`}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${count > 0 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'}`}>
                        <Users size={22} />
                    </div>
                    <div>
                        <h4 className="font-black text-white text-sm uppercase tracking-tight leading-none mb-1">{job?.title || 'Mission'}</h4>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></div>
                             <p className="text-[10px] text-teal-400 font-black uppercase tracking-widest">
                                {count} {count === 1 ? 'Bewerber' : 'Bewerber'} bereit
                             </p>
                        </div>
                    </div>
                </div>
                <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-gray-600 group-hover:text-white" />
                </div>
            </div>

            {isOpen && (
                <div className="px-1 pt-2 space-y-3 animate-fade-in mb-6">
                    {jobApplications.length > 0 ? (
                        jobApplications.map(app => (
                            <ApplicantRow 
                                key={app?.id || Math.random()} 
                                app={app} 
                                onConfirm={(tId) => onConfirmTrainer(job?.id || '', tId)} 
                                onPreview={(profile) => onPreviewTrainer(profile, job.id)}
                            />
                        ))
                    ) : (
                        <div className="p-12 text-center bg-black/20 rounded-3xl border border-dashed border-white/5 opacity-50 flex flex-col items-center">
                            <div className="relative mb-4">
                                 <Loader2 size={24} className="animate-spin text-teal-500" />
                                 <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full"></div>
                            </div>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Radar Scan aktiv...</p>
                            <p className="text-[8px] text-gray-700 mt-2 italic uppercase">Passende Talente werden benachrichtigt</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const ActiveMissionCard = ({ job, onCheckIn, onPay }: { job: Job, onCheckIn: (id: string) => void, onPay: (id: string) => void }) => {
    if (!job) return null;
    const isCheckedIn = job.status === 'CHECKED_IN';
    
    return (
        <div className="bg-surface border border-white/10 rounded-3xl p-6 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${isCheckedIn ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                            {isCheckedIn ? 'Session Live 📡' : 'Warte auf Check-in'}
                        </span>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{job.title}</h3>
                </div>
                <div className="text-right">
                    <div className="text-lg font-mono font-black text-white">€{job.totalFee.toFixed(0)}</div>
                    <div className="text-[8px] font-black text-teal-500/60 uppercase mt-1">Gage gesichert</div>
                </div>
            </div>

            <div className="flex gap-4">
                {!isCheckedIn ? (
                    <button 
                        onClick={() => onCheckIn(job.id)}
                        className="flex-1 py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                        <Check size={16} /> Check-In Bestätigen
                    </button>
                ) : (
                    <button 
                        onClick={() => onPay(job.id)}
                        className="flex-1 py-4 bg-teal-500 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-teal-500/20"
                    >
                        <DollarSign size={16} /> Honorar Auszahlen
                    </button>
                )}
            </div>
        </div>
    );
};

const UnassignedActionCard = ({ job, onOpenRadar }: { job: Job, onOpenRadar: (j: Job) => void }) => {
    if (!job) return null;
    const isUrgent = job?.urgency?.includes('SOS');
    return (
        <div className={`relative overflow-hidden rounded-[32px] border transition-all group ${
            isUrgent ? 'bg-surface border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'bg-surfaceHighlight border-white/10 hover:border-teal-500/30'
        }`}>
            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-2xl transition-colors ${isUrgent ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 'bg-white/5 text-gray-400 border border-white/5'}`}>
                            <AlertTriangle size={24} className={isUrgent ? 'animate-bounce' : ''} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isUrgent ? 'text-red-400' : 'text-gray-500'}`}>
                                    {isUrgent ? 'SOS Priority Mission' : 'Radar Mission aktiv'}
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{job?.title || 'Untitled'}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="text-[10px] font-mono text-gray-600 uppercase">Tracking: 0 Bewerber</div>
                    <button onClick={() => onOpenRadar(job)} className="px-6 py-3 bg-white text-black hover:bg-teal-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
                        Konfig
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SchoolCockpit = ({ myJobs, applications = [], onConfirmTrainer, onCheckIn, onPay, onTrack, onOpenRadarControl, onRateTrainer }: { 
    myJobs: Job[], applications?: JobApplicationWithProfile[], onConfirmTrainer: (jobId: string, trainerId: string) => void, onCheckIn: (id: string) => void, onPay: (id: string) => void, onTrack: (job: Job) => void, onOpenRadarControl: (job: Job) => void, onRateTrainer: (job: Job) => void, assigneeStripeStatus: boolean
}) => {
    const [previewTrainer, setPreviewTrainer] = useState<{ profile: UserProfile, jobId: string } | null>(null);
    if (!myJobs) return null;

    const unassigned = myJobs.filter(j => j && j.status === 'OPEN');
    const incoming = myJobs.filter(j => j && j.status === 'APPLIED');
    const active = myJobs.filter(j => j && (j.status === 'ACCEPTED' || j.status === 'CHECKED_IN'));
    const pendingReview = myJobs.filter(j => j && j.status === 'COMPLETED' && !j.creatorRated);

    return (
        <div className="animate-fade-in space-y-12 pb-24 max-w-7xl mx-auto px-4 md:px-0">
            
            {/* 0. FEEDBACK NUDGES */}
            {pendingReview.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                         <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                             <Star size={18} className="text-teal-400" /> Ausstehende Bewertungen
                         </h2>
                         <div className="h-px bg-white/5 flex-1 mx-6"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingReview.map(job => (
                            <ReviewNudgeCard key={job.id} job={job} role="STUDIO" onRate={onRateTrainer} />
                        ))}
                    </div>
                </section>
            )}

            {/* 1. AKTIVE SESSIONS */}
            {active.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                         <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                             <div className="w-2 h-2 bg-teal-500 rounded-full shadow-neon animate-pulse"></div>
                             Live Operationen
                         </h2>
                         <div className="h-px bg-white/5 flex-1 mx-6"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {active.map(job => (
                            <ActiveMissionCard 
                                key={job.id} 
                                job={job} 
                                onCheckIn={onCheckIn} 
                                onPay={onPay} 
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* 2. INCOMING APPLICATIONS */}
            {incoming.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                         <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                             <Zap size={18} className="text-purple-400" /> Neue Bewerber
                         </h2>
                         <div className="h-px bg-white/5 flex-1 mx-6"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {incoming.map(job => (
                            <ApplicantCard 
                                key={job.id} 
                                job={job} 
                                applications={applications} 
                                onConfirmTrainer={onConfirmTrainer} 
                                onPreviewTrainer={(profile, jId) => setPreviewTrainer({ profile, jobId: jId })}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* 3. RADAR MISSIONS */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                    <div className="p-2.5 bg-purple-500/10 rounded-2xl text-purple-400 border border-purple-500/20"><Sparkles size={22} /></div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1">Radar Missions</h2>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Unbesetzte Slots im Markt-Scan</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unassigned.length > 0 ? unassigned.map(job => <UnassignedActionCard key={job.id} job={job} onOpenRadar={onOpenRadarControl} />) : (
                        <div className="col-span-full py-16 border-2 border-dashed border-white/5 rounded-[48px] flex flex-col items-center justify-center text-gray-800 bg-white/[0.01]">
                            <CheckCircle2 size={40} className="mb-4 opacity-10" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Alle Missionen besetzt</p>
                        </div>
                    )}
                </div>
            </section>

            {/* PROFILE PREVIEW MODAL */}
            {previewTrainer && (
                <TrainerPreviewModal 
                    trainer={previewTrainer.profile} 
                    jobId={previewTrainer.jobId}
                    onConfirm={onConfirmTrainer}
                    onClose={() => setPreviewTrainer(null)}
                />
            )}
        </div>
    );
};

export const TrainerCockpit = ({ user, myJobs, ownClasses = [], onNavigate, onCreateEvent, onCancelJob, onShowNotification, onOpenPreview, onOpenManager, dynamicEarnings = 0, onRateStudio }: { 
    user: UserProfile, myJobs: Job[], ownClasses?: OwnClass[], onNavigate: (t: string) => void, onCreateEvent: () => void, onCancelJob: (j: Job) => void, onShowNotification: (m: string) => void, onOpenPreview: (c: OwnClass) => void, onOpenManager: (c: OwnClass) => void, dynamicEarnings?: number, onRateStudio: (job: Job) => void
}) => {
    if (!user) return null;
    const activeJobs = (myJobs || []).filter(j => j && (j.status === 'ACCEPTED' || j.status === 'CHECKED_IN'));
    const pendingReview = (myJobs || []).filter(j => j && j.status === 'COMPLETED' && !j.assigneeRated);
    
    return (
        <div className="animate-fade-in pb-24 max-w-7xl mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-12">
                    {/* 0. FEEDBACK NUDGES FOR TRAINERS */}
                    {pendingReview.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                    <Sparkles size={18} className="text-teal-400" /> Reputation Boost fällig
                                </h2>
                                <div className="h-px bg-white/5 flex-1 mx-6"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {pendingReview.map(job => (
                                    <ReviewNudgeCard key={job.id} job={job} role="TRAINER" onRate={onRateStudio} />
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="space-y-8">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Deine nächsten Gigs</h2>
                        {activeJobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{activeJobs.map(job => (<div key={job.id} className="space-y-4"><TicketView job={job} /><button onClick={() => onCancelJob(job)} className="w-full py-4 border border-white/5 hover:border-red-500/30 text-gray-600 hover:text-red-500 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest">Gig absagen</button></div>))}</div>
                        ) : (
                            <div className="py-20 border-2 border-dashed border-white/5 rounded-[40px] text-center opacity-30 font-black uppercase text-[10px] tracking-widest">Keine aktiven Buchungen</div>
                        )}
                    </section>
                </div>

                <div className="space-y-6">
                    <TrustLevelCard user={user} />
                    <div className="bg-surfaceHighlight border border-white/5 rounded-[32px] p-8 text-center relative overflow-hidden group shadow-2xl">
                        <div className="p-5 bg-teal-500/10 rounded-3xl text-teal-400 mb-6 inline-block"><Coins size={36}/></div>
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Guthaben</div>
                        <div className="text-5xl font-black font-mono text-white tracking-tighter mb-8">€<CountUp end={dynamicEarnings || 0} /></div>
                        <button onClick={() => onNavigate('wallet')} className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white hover:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Wallet öffnen</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
