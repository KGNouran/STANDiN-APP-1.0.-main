import React, { useState, useEffect, useMemo } from 'react';
import { 
    Users, Star, UserPlus, Search, ShieldCheck, Zap, Smartphone, Check, Copy, 
    MessageSquare, MoreHorizontal, Filter, Play, Camera, ExternalLink, 
    Loader2, ArrowRight, MapPin, Instagram, Globe, X, FileText, Target, 
    Dumbbell, Music, Sparkles, Phone, Shield, Briefcase, Heart
} from 'lucide-react';
import { StoryRail } from '../components/Shared';
import { MOCK_FRIENDS, RESIDENTS, TRUST_LEVELS } from '../constants';
import { Story, UserProfile, JobCategory, Friend } from '../types';
import { supabase } from '../supabaseClient';
import { StoryViewer } from '../components/Modals';

// TAXONOMY DEFINITION (SHARED)
const SKILL_TAXONOMY: Record<JobCategory, { label: string, icon: any }> = {
    'DANCE': { label: 'Dance', icon: Sparkles },
    'BODY_MIND': { label: 'Body & Mind', icon: Dumbbell },
    'MUSIC_VOICE': { label: 'Music & Voice', icon: Music },
    'EVENTS_FASHION': { label: 'Events & Fashion', icon: Camera }
};

/**
 * CINEMATIC TRAINER PROFILE OVERLAY (FULL SEDCARD)
 */
const TrainerProfileOverlay = ({ trainer, onClose, onOpenVideo }: { trainer: UserProfile, onClose: () => void, onOpenVideo: (url: string) => void }) => {
    const [showInviteMenu, setShowInviteMenu] = useState(false);

    // Dummy Open Jobs for Magic Invite
    const openJobs = [
        { id: '1', title: 'Hip Hop Fundamentals', time: 'Mon, 18:00' },
        { id: '2', title: 'Commercial Advanced', time: 'Wed, 19:30' }
    ];

    return (
        <div className="fixed inset-0 z-[600] bg-black/98 backdrop-blur-3xl flex items-center justify-center md:p-6 animate-fade-in">
            <div className="w-full h-full max-w-5xl bg-[#0A0A0A] md:rounded-[48px] border border-white/10 overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                
                {/* CLOSE BUTTON */}
                <button onClick={onClose} className="absolute top-8 right-8 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all border border-white/5">
                    <X size={24} />
                </button>

                {/* LEFT: HERO & STATS */}
                <div className="w-full md:w-[380px] bg-surfaceHighlight p-10 flex flex-col border-r border-white/5">
                    <div className="relative mb-10 self-center">
                        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-black shadow-2xl flex items-center justify-center overflow-hidden">
                             <span className="text-5xl font-black text-white/30">{trainer.avatarInitials}</span>
                             {trainer.is_verified && <div className="absolute -bottom-2 -right-2 bg-teal-500 text-black rounded-full p-2.5 border-4 border-[#0A0A0A] shadow-xl"><ShieldCheck size={24} /></div>}
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 leading-none">{trainer.name}</h2>
                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                            <MapPin size={12} className="text-teal-400" /> {trainer.location}
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="bg-black/40 rounded-3xl p-5 border border-white/5 flex justify-between items-center group hover:border-teal-500/30 transition-all">
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Trust Score</div>
                            <div className="text-2xl font-black font-mono text-teal-400">{trainer.trustScore || 75}%</div>
                        </div>
                        <div className="bg-black/40 rounded-3xl p-5 border border-white/5 flex justify-between items-center group hover:border-purple-500/30 transition-all">
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Reliability</div>
                            <div className="text-2xl font-black font-mono text-purple-400">{trainer.reliability || 100}%</div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="relative">
                            <button 
                                onClick={() => setShowInviteMenu(!showInviteMenu)}
                                className="w-full py-4 bg-teal-500 text-black font-black rounded-2xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(45,212,191,0.2)] hover:bg-white transition-all group"
                            >
                                <Zap size={18} fill="currentColor" className="group-hover:animate-pulse" /> Magic Invite
                            </button>

                            {showInviteMenu && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 bg-surfaceHighlight border border-white/10 rounded-2xl shadow-2xl p-4 animate-bounce-up z-[70]">
                                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2 flex justify-between">
                                        Open Slots <span>Direct Offer</span>
                                    </div>
                                    <div className="space-y-2">
                                        {openJobs.map(job => (
                                            <button key={job.id} className="w-full p-3 bg-black/40 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition-all text-left">
                                                <div className="font-bold text-xs text-white uppercase">{job.title}</div>
                                                <div className="text-[9px] text-gray-500 font-mono mt-1">{job.time}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={() => trainer.social_instagram && window.open(`https://instagram.com/${trainer.social_instagram.replace('@','')}`, '_blank')}
                                className="flex-1 p-4 bg-white/5 hover:bg-white hover:text-black rounded-2xl border border-white/10 transition-all flex items-center justify-center"
                            >
                                <Instagram size={20} />
                            </button>
                            <button 
                                onClick={() => trainer.social_website && window.open(trainer.social_website, '_blank')}
                                className="flex-1 p-4 bg-white/5 hover:bg-white hover:text-black rounded-2xl border border-white/10 transition-all flex items-center justify-center"
                            >
                                <Globe size={20} />
                            </button>
                            <button className="flex-1 p-4 bg-white/5 hover:bg-white hover:text-black rounded-2xl border border-white/10 transition-all flex items-center justify-center">
                                <Phone size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: PORTFOLIO AREA */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-16 space-y-16 bg-[#080808]">
                    
                    {/* VIDEO SEDCARDS GALLERY - FIRST POSITION */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h3 className="text-[11px] font-black text-purple-400 uppercase tracking-[0.4em]">Performance Gallery</h3>
                            <div className="h-px bg-purple-500/10 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {trainer.sedcard?.gallery?.map((url, idx) => (
                                <div key={idx} onClick={() => onOpenVideo(url)} className="aspect-[9/16] bg-surfaceHighlight rounded-3xl border border-white/5 relative group cursor-pointer overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play size={24} className="fill-white text-white ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest truncate">{url}</div>
                                    </div>
                                </div>
                            ))}
                            {(!trainer.sedcard?.gallery || trainer.sedcard.gallery.length === 0) && (
                                <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center opacity-30">
                                    <Camera size={48} className="mb-4 text-gray-500" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">No videos available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* BIO - SECOND POSITION */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h3 className="text-[11px] font-black text-teal-400 uppercase tracking-[0.4em]">Background</h3>
                            <div className="h-px bg-teal-500/10 flex-1"></div>
                        </div>
                        <p className="text-xl md:text-2xl font-medium text-gray-300 leading-relaxed italic">
                            "{trainer.bio || "Professioneller Artist im StandIn Cloud Netzwerk."}"
                        </p>
                    </div>

                    {/* SKILLS GROUPED */}
                    <div className="space-y-8 pb-10">
                        <div className="flex items-center gap-4">
                            <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">Expertise</h3>
                            <div className="h-px bg-blue-500/10 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {(Object.keys(SKILL_TAXONOMY) as JobCategory[]).map(catKey => {
                                if (catKey === 'DANCE' && trainer.skills && trainer.skills.length > 0) {
                                    return (
                                        <div key={catKey} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-white/5 rounded-xl text-gray-400">
                                                    {React.createElement(SKILL_TAXONOMY[catKey].icon, { size: 18 })}
                                                </div>
                                                <h4 className="font-bold text-white uppercase tracking-tight">{SKILL_TAXONOMY[catKey].label}</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {trainer.skills.map(skill => (
                                                    <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-400 tracking-widest">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * HIGH-END VIDEO PLAYER MODAL
 */
const VideoScoutModal = ({ url, onClose }: { url: string, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[700] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in">
             <button onClick={onClose} className="absolute top-10 right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shadow-2xl">
                 <X size={32} />
             </button>
             <div className="w-full max-w-3xl aspect-video bg-black rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(45,212,191,0.2)]">
                <iframe 
                    src={url}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    title="Trainer Sedcard"
                />
             </div>
        </div>
    );
};

/**
 * REFINED VIDEO AVATAR COMPONENT
 */
const TalentVideoAvatar = ({ trainer, onClick }: { trainer: UserProfile, onClick: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasVideo = trainer.sedcard?.gallery && trainer.sedcard.gallery.length > 0;
    
    return (
        <div 
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-surface shadow-2xl relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {hasVideo && isHovered ? (
                <div className="absolute inset-0 bg-black animate-fade-in">
                    <div className="w-full h-full flex items-center justify-center bg-purple-500/20">
                        <Play size={24} className="text-white fill-white animate-pulse" />
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-xl md:text-2xl text-white/40">
                    {trainer.avatarInitials}
                </div>
            )}
            
            {trainer.is_verified && (
                <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-teal-500 shadow-neon">
                    <ShieldCheck size={16} className="text-teal-400" />
                </div>
            )}
            
            <div className={`absolute inset-0 bg-teal-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
    );
};

/**
 * MAGIC INVITE LINK MODAL
 */
const MagicInviteModal = ({ onClose }: { onClose: () => void }) => {
    const [copied, setCopied] = useState(false);
    const inviteLink = "https://standin.app/join/uda-berlin-2025";

    const handleCopy = () => {
        navigator.clipboard.writeText(`Hey Team! Tretet unserer StandIn Gruppe bei, damit wir Vertretungen schneller organisieren können: ${inviteLink}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[650] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-fade-in">
            <div className="bg-gradient-to-br from-yellow-500/20 to-black border border-yellow-500/30 rounded-[40px] p-8 md:p-10 w-full max-w-xl relative overflow-hidden shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400">
                    <X size={20} />
                </button>
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white mb-4 flex items-center gap-2 uppercase tracking-tighter">
                        <Zap className="text-yellow-500" fill="currentColor" /> Magic Invite Link
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                        Teile diesen Link in deiner Lehrer-WhatsApp-Gruppe. Jeder, der sich darüber registriert, wird automatisch als <span className="text-yellow-500 font-bold uppercase">Resident Pro</span> deinem Studio zugeordnet.
                    </p>
                    <div className="bg-black/60 border border-white/10 rounded-3xl p-8 mb-8">
                        <div className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Vorschau Einladung</div>
                        <div className="text-sm text-gray-300 italic mb-6 leading-relaxed">
                            "Hey Team! Wir nutzen jetzt StandIn für unsere Vertretungsplanung. Bitte registriert euch über diesen Link..."
                        </div>
                        <div className="flex gap-4">
                            <button onClick={handleCopy} className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-yellow-400 shadow-xl">
                                {copied ? <Check size={18}/> : <Copy size={18} />}
                                {copied ? 'Kopiert!' : 'Link kopieren'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SchoolTeamView = ({ setActiveStory }: { setActiveStory: (story: Story) => void }) => {
    const [activeSection, setActiveSection] = useState<'MY_TEAM' | 'SCOUT'>('MY_TEAM');
    const [trainers, setTrainers] = useState<UserProfile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [teamFilter, setTeamFilter] = useState<'ALL' | 'TRUST' | 'STYLE'>('ALL');
    const [selectedStyle, setSelectedStyle] = useState<string>('');
    
    // UI STATES
    const [selectedTrainerProfile, setSelectedTrainerProfile] = useState<UserProfile | null>(null);
    const [scoutVideoUrl, setScoutVideoUrl] = useState<string | null>(null);
    const [activeHeroStory, setActiveHeroStory] = useState<Story | null>(null);
    const [showInviteModal, setShowInviteModal] = useState(false);

    useEffect(() => {
        if (activeSection === 'SCOUT') {
            fetchTrainers();
        }
    }, [activeSection]);

    const fetchTrainers = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('role', 'TRAINER')
                .limit(24);

            if (error) throw error;
            if (data) {
                const mapped: UserProfile[] = data.map(d => ({
                    id: d.id,
                    name: d.name,
                    role: 'TRAINER',
                    balance: 0,
                    avatarInitials: d.avatar_initials || d.name.substring(0,2).toUpperCase(),
                    is_verified: d.is_verified || false,
                    location: d.location || 'Berlin',
                    skills: d.styles || [],
                    bio: d.bio || '',
                    trustLevel: 'VERIFIED',
                    trustScore: 75,
                    reliability: 100,
                    social_instagram: d.social_instagram,
                    social_website: d.social_website,
                    sedcard: {
                        gallery: d.video_urls || []
                    }
                }));
                setTrainers(mapped);
            }
        } catch (err) {
            console.error('Error fetching trainers:', err);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * UNIFIED TEAM ROSTER (Residents + Trust Circle)
     */
    const myTeam = useMemo(() => {
        // Convert RESIDENTS mock to full profiles
        const residentsList: UserProfile[] = RESIDENTS.map(r => ({
            id: r.id,
            name: r.name,
            role: 'TRAINER',
            balance: 0,
            avatarInitials: r.avatar,
            is_verified: true,
            location: 'Berlin',
            skills: [r.style],
            bio: "Resident Pro at Urban Dance Academy.",
            trustLevel: 'VERIFIED',
            trustScore: 82,
            reliability: 100,
            sedcard: { gallery: [] }
        }));

        // Convert MOCK_FRIENDS to full profiles and mark as trust circle
        const trustCircleList: UserProfile[] = MOCK_FRIENDS.map(f => ({
            id: f.id,
            name: f.name,
            role: 'TRAINER',
            balance: 0,
            avatarInitials: f.initials,
            is_verified: true,
            location: 'Berlin',
            skills: [f.style],
            bio: "Verified High-Performance Partner.",
            trustLevel: 'ELITE',
            trustScore: 98,
            reliability: 100,
            isResidentOf: 'STUDIO_ID', // Marker for Trust Circle/Priority
            sedcard: { gallery: [] }
        }));

        const combined = [...residentsList, ...trustCircleList];

        return combined.filter(t => {
            if (teamFilter === 'TRUST') return t.trustLevel === 'ELITE' || t.isResidentOf;
            if (teamFilter === 'STYLE' && selectedStyle) return t.skills?.some(s => s.toLowerCase().includes(selectedStyle.toLowerCase()));
            return true;
        });
    }, [teamFilter, selectedStyle]);

    const filteredScout = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return trainers;
        return trainers.filter(t => {
            const nameMatch = t.name.toLowerCase().includes(q);
            const bioMatch = (t.bio || '').toLowerCase().includes(q);
            const styleMatch = (t.skills || []).some(s => s.toLowerCase().includes(q));
            return nameMatch || bioMatch || styleMatch;
        });
    }, [trainers, searchQuery]);

    const handleOpenStory = (s: Story) => {
        const trainer = trainers.find(t => t.id === s.trainerId);
        if (trainer && trainer.sedcard?.gallery && trainer.sedcard.gallery.length > 0) {
            setActiveHeroStory({
                ...s,
                videoUrl: trainer.sedcard.gallery[0],
                caption: `Watching: ${trainer.name} Performance`
            });
        } else {
            setActiveStory(s);
        }
    };

    const handleTrainerCardClick = (id: string) => {
        // Find in scout pool or local team
        const trainer = trainers.find(t => t.id === id) || myTeam.find(t => t.id === id);
        if (trainer) setSelectedTrainerProfile(trainer);
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto min-h-screen pb-20 px-4 md:px-0">
            {/* REFACTORED HEADER ROW */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6 pt-4">
                {/* LEFT: TABS */}
                <div className="flex bg-white/5 border border-white/5 rounded-2xl p-1 shadow-2xl overflow-hidden min-w-[320px]">
                    <button 
                        onClick={() => setActiveSection('MY_TEAM')}
                        className={`flex-1 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeSection === 'MY_TEAM' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Users size={14} /> Mein Team
                    </button>
                    <button 
                        onClick={() => setActiveSection('SCOUT')}
                        className={`flex-1 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeSection === 'SCOUT' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Zap size={14} /> Talent Scout
                    </button>
                </div>
                
                {/* RIGHT: INVITE BUTTON */}
                <button 
                    onClick={() => setShowInviteModal(true)}
                    className="flex items-center gap-2 px-6 py-4 border border-white/20 hover:border-teal-500 hover:text-teal-400 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl whitespace-nowrap bg-white/5"
                >
                    <Smartphone size={16} /> + Externes Talent einladen
                </button>
            </div>

            {/* TAB CONTENT: MY TEAM */}
            {activeSection === 'MY_TEAM' && (
                <div className="animate-fade-in space-y-10">
                    {/* REFACTORED FILTER BAR (UNDER TABS) */}
                    <div className="flex flex-wrap items-center gap-4 bg-surfaceHighlight/30 border border-white/5 p-4 rounded-2xl">
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">Filter:</span>
                        <button 
                            onClick={() => setTeamFilter('ALL')}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${teamFilter === 'ALL' ? 'bg-white text-black border-white' : 'bg-black/40 text-gray-500 border-white/5 hover:border-white/20'}`}
                        >
                            Alle
                        </button>
                        <button 
                            onClick={() => setTeamFilter('TRUST')}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 border ${teamFilter === 'TRUST' ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : 'bg-black/40 text-gray-500 border-white/5 hover:border-white/20'}`}
                        >
                            <ShieldCheck size={12} /> Trust Circle
                        </button>
                        
                        <div className="h-4 w-px bg-white/10 mx-2"></div>
                        
                        <div className="relative flex-1 max-w-xs">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                            <input 
                                placeholder="Filter by Style..." 
                                value={selectedStyle}
                                onChange={(e) => { setSelectedStyle(e.target.value); setTeamFilter('STYLE'); }}
                                className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-[10px] font-black uppercase text-white focus:border-teal-500 outline-none transition-all placeholder:text-gray-700"
                            />
                        </div>
                    </div>

                    {/* TEAM LISTING */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myTeam.map(trainer => (
                            <div 
                                key={trainer.id} 
                                onClick={() => handleTrainerCardClick(trainer.id)}
                                className="glass-panel rounded-3xl p-6 flex items-center justify-between group hover:border-teal-500/30 transition-all cursor-pointer shadow-xl relative overflow-hidden"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-black text-lg border border-white/10 relative shadow-lg group-hover:scale-105 transition-transform">
                                        {trainer.avatarInitials}
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full border-2 border-surface flex items-center justify-center shadow-neon">
                                            <Check size={10} className="text-black" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="font-bold text-white uppercase tracking-tight">{trainer.name}</div>
                                            {(trainer.isResidentOf || trainer.trustLevel === 'ELITE') && (
                                                <Star size={14} className="text-teal-400 fill-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                                            )}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                                            {trainer.skills?.[0] || 'Trainer'}
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white/5 rounded-lg text-gray-600 transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB CONTENT: TALENT SCOUT */}
            {activeSection === 'SCOUT' && (
                <div className="animate-fade-in space-y-12">
                    {/* SCOUT SEARCH ROW */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-2">Talent Pool</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Scanning local ecosystem for verified pros</p>
                        </div>
                        <div className="relative group w-full md:w-80">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Style or Skill..." 
                                className="bg-black/60 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-[10px] font-black uppercase text-white focus:border-teal-500 outline-none w-full transition-all shadow-xl" 
                            />
                        </div>
                    </div>

                    {/* LIVE SHOWCASE FEED */}
                    <div>
                        <div className="flex justify-between items-end mb-6 px-2">
                            <div>
                                <h3 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] mb-1">Live Feed</h3>
                                <h4 className="text-2xl font-black text-white uppercase tracking-tight">Talent Showcases</h4>
                            </div>
                        </div>
                        <StoryRail onOpenStory={handleOpenStory} />
                    </div>
                    
                    <div className="h-px bg-white/5 w-full"></div>

                    {/* SCOUT RESULTS */}
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-teal-400" size={48} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Accessing Cloud Network...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                            {filteredScout.map((trainer) => (
                                <div key={trainer.id} className="glass-panel rounded-[32px] p-6 group hover:border-teal-500/40 transition-all cursor-pointer shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none"></div>
                                    <div className="flex gap-6 relative z-10">
                                        <TalentVideoAvatar 
                                            trainer={trainer} 
                                            onClick={() => trainer.sedcard?.gallery?.[0] && setScoutVideoUrl(trainer.sedcard.gallery[0])} 
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-black text-lg text-white uppercase tracking-tight leading-none">{trainer.name}</h4>
                                                <button className="p-2 hover:bg-rose-500/20 text-gray-600 hover:text-rose-500 transition-all rounded-full"><Heart size={16} /></button>
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <MapPin size={10} className="text-teal-500" /> {trainer.location}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {trainer.skills?.slice(0, 3).map(skill => (
                                                    <span key={skill} className={`px-2 py-0.5 border rounded text-[8px] font-black uppercase tracking-tighter transition-all ${searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase()) ? 'bg-teal-500 text-black border-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'bg-white/5 border-white/10 text-gray-400 group-hover:border-teal-500/30'}`}>{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        <button 
                                            onClick={() => setSelectedTrainerProfile(trainer)}
                                            className="flex-1 py-3 bg-white text-black font-black rounded-xl text-[9px] uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl"
                                        >
                                            Full Sedcard
                                        </button>
                                        <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                                            <MessageSquare size={16}/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!isLoading && filteredScout.length === 0 && (
                        <div className="py-20 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center opacity-40">
                            <Zap size={48} className="mb-4 text-gray-600" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Keine passenden Trainer gefunden</p>
                        </div>
                    )}
                </div>
            )}

            {/* SHARED MODALS */}
            {selectedTrainerProfile && (
                <TrainerProfileOverlay 
                    trainer={selectedTrainerProfile} 
                    onClose={() => setSelectedTrainerProfile(null)} 
                    onOpenVideo={setScoutVideoUrl}
                />
            )}

            {scoutVideoUrl && (
                <VideoScoutModal 
                    url={scoutVideoUrl} 
                    onClose={() => setScoutVideoUrl(null)} 
                />
            )}

            {activeHeroStory && (
                <StoryViewer 
                    story={activeHeroStory} 
                    onClose={() => setActiveHeroStory(null)} 
                />
            )}

            {showInviteModal && (
                <MagicInviteModal onClose={() => setShowInviteModal(false)} />
            )}
        </div>
    );
};
