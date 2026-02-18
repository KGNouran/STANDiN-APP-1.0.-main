
import React, { useState, useEffect } from 'react';
import { 
    ShieldCheck, Instagram, Linkedin, Globe, Play, MoreVertical, Send, 
    Building, Video, CalendarDays, Wifi, Clock, CheckCircle2, Info, 
    Search, MessageSquare, Plus, ChevronRight, Phone, MapPin, 
    Lock, FileText, AlertCircle, CreditCard, Zap, Maximize, Music, Layers, Trash2, Camera,
    RefreshCw, Mail, Star, BarChart3, X, Check, Dumbbell, Target, Sparkles, MessageCircle
} from 'lucide-react';
import { UserProfile, Review, JobCategory } from '../types';
import { TrustLevelCard, BlindReviewCard } from '../components/TrustSystem';

// SYNCED TAXONOMY WITH JOB WIZARD
const SKILL_TAXONOMY: Record<JobCategory, { label: string, icon: any, sub: string[] }> = {
    'DANCE': {
        label: 'Dance',
        icon: Sparkles,
        sub: ['Hip Hop', 'Ballet', 'Contemporary', 'Jazz', 'Commercial', 'House', 'Heels', 'Breakdance', 'Dancehall', 'K-Pop', 'Urban', 'Afro']
    },
    'BODY_MIND': {
        label: 'Body & Mind',
        icon: Dumbbell,
        sub: ['Vinyasa Yoga', 'Hatha Yoga', 'Pilates', 'HIIT / Fitness', 'Meditation', 'Barre', 'Mobility', 'Boxen']
    },
    'MUSIC_VOICE': {
        label: 'Music & Voice',
        icon: Music,
        sub: ['Vocal Coaching', 'Piano Begleitung', 'Gitarre', 'DJ', 'Sound Engineer', 'Chorleitung']
    },
    'EVENTS_FASHION': {
        label: 'Events & Fashion',
        icon: Camera,
        sub: ['Model', 'Host/Hostess', 'Promoter', 'Styling', 'Fotograf', 'Videograf']
    }
};

/**
 * TRAINER VIEW: MySpace
 * Fokus auf Portfolio, Video-Sedcards. (Messaging wurde in Dispatch-Tab ausgelagert)
 */
export const MySpaceView = ({ user, onUpdateProfile, onOpenInvoice }: { user: UserProfile, onUpdateProfile: (data: Partial<UserProfile>) => void, onOpenInvoice?: () => void }) => {
    const [activeTab, setActiveTab] = useState('PROFIL');
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(user.bio || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [whatsappEnabled, setWhatsappEnabled] = useState(user.whatsapp_alerts_enabled || false);
    const [selectedSkills, setSelectedSkills] = useState<string[]>(user.skills || []);
    const [activeTaxonomyCat, setActiveTaxonomyCat] = useState<JobCategory>('DANCE');
    const [videoUrls, setVideoUrls] = useState<string[]>(user.sedcard?.gallery || []);
    const [newVideoUrl, setNewVideoUrl] = useState('');

    useEffect(() => {
        setBio(user.bio || '');
        setPhone(user.phone || '');
        setWhatsappEnabled(user.whatsapp_alerts_enabled || false);
        setSelectedSkills(user.skills || []);
        setVideoUrls(user.sedcard?.gallery || []);
    }, [user]);

    const handleSave = () => { 
        onUpdateProfile({ 
            bio, 
            phone,
            whatsapp_alerts_enabled: whatsappEnabled,
            skills: selectedSkills,
            sedcard: { ...user.sedcard, gallery: videoUrls }
        }); 
        setIsEditing(false); 
    };

    const toggleSkill = (skill: string, categoryKey: string) => {
        setSelectedSkills(prev => {
            let next = [...prev];
            if (next.includes(skill)) {
                next = next.filter(s => s !== skill);
                const otherSubSkillsInCat = SKILL_TAXONOMY[categoryKey as JobCategory].sub.filter(s => next.includes(s));
                if (otherSubSkillsInCat.length === 0) {
                    next = next.filter(s => s !== categoryKey);
                }
            } else {
                next.push(skill);
                if (!next.includes(categoryKey)) {
                    next.push(categoryKey);
                }
            }
            return next;
        });
    };

    const addVideo = () => {
        if (!newVideoUrl.trim()) return;
        setVideoUrls(prev => [...prev, newVideoUrl.trim()]);
        setNewVideoUrl('');
    };

    const removeVideo = (idx: number) => {
        setVideoUrls(prev => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-24 relative">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-bold mb-2 tracking-tighter">My<span className="text-white">Space</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Trainer Career Hub</p>
                </div>
                <button 
                    onClick={isEditing ? handleSave : () => setIsEditing(true)} 
                    className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isEditing ? 'bg-teal-500 text-black shadow-[0_0_20px_#2dd4bf]' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
                >
                    {isEditing ? 'Änderungen Speichern' : 'Profil Bearbeiten'}
                </button>
            </div>
            
            <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
                {['PROFIL', 'FAVORITEN', 'COMMUNITY'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white shadow-[0_0_10px_white]"></div>}
                    </button>
                ))}
            </div>

            {activeTab === 'PROFIL' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                    <div className="space-y-6">
                        <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-8 text-center relative group shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none"></div>
                            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gray-700 to-gray-800 mb-6 flex items-center justify-center border-4 border-surface shadow-2xl relative">
                                <span className="text-2xl font-black text-white">{user.avatarInitials}</span>
                                {user.is_verified && <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-teal-500 shadow-[0_0_10px_#2dd4bf]"><ShieldCheck size={20} className="text-teal-400" /></div>}
                            </div>
                            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                            <p className="text-gray-500 text-sm mb-4">{user.location}</p>
                            <div className="flex justify-center gap-4 mb-6"><div className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors border border-white/5"><Instagram size={18} className="text-gray-400 hover:text-white" /></div><div className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors border border-white/5"><Linkedin size={18} className="text-gray-400 hover:text-white" /></div><div className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors border border-white/5"><Globe size={18} className="text-gray-400 hover:text-white" /></div></div>
                        </div>

                        <div className="bg-surfaceHighlight border border-white/5 rounded-2xl p-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                <BarChart3 size={12} className="text-teal-400"/> Live Performance
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-gray-400">Zuverlässigkeit</span>
                                    <span className="text-sm font-mono font-black text-white">{user.reliability || 100}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${user.reliability || 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surfaceHighlight border border-white/5 rounded-2xl p-6 overflow-hidden">
                            <h4 className="font-bold text-sm mb-4 flex items-center gap-2"><Target size={16} className="text-teal-400" /> Skills & Styles</h4>
                            {isEditing ? (
                                <div className="space-y-6">
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                        {(Object.keys(SKILL_TAXONOMY) as JobCategory[]).map(catKey => {
                                            const CatIcon = SKILL_TAXONOMY[catKey].icon;
                                            return (
                                                <button 
                                                    key={catKey}
                                                    onClick={() => setActiveTaxonomyCat(catKey)}
                                                    className={`px-3 py-2 rounded-xl flex items-center gap-2 border transition-all whitespace-nowrap ${activeTaxonomyCat === catKey ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
                                                >
                                                    <CatIcon size={14} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">{SKILL_TAXONOMY[catKey].label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-2 animate-fade-in">
                                        {SKILL_TAXONOMY[activeTaxonomyCat].sub.map(skill => (
                                            <button 
                                                key={skill} 
                                                onClick={() => toggleSkill(skill, activeTaxonomyCat)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${selectedSkills.includes(skill) ? 'bg-teal-500/20 border-teal-500 text-teal-400' : 'bg-white/5 border-white/10 text-gray-600'}`}
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {(Object.keys(SKILL_TAXONOMY) as JobCategory[]).map(catKey => {
                                        const catSkills = SKILL_TAXONOMY[catKey].sub.filter(s => selectedSkills.includes(s));
                                        if (catSkills.length === 0) return null;
                                        return (
                                            <div key={catKey} className="space-y-2">
                                                <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">{SKILL_TAXONOMY[catKey].label}</div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {catSkills.map(skill => (
                                                        <span key={skill} className="px-2 py-0.5 bg-teal-500/10 border border-teal-500/30 rounded text-[10px] font-bold text-teal-400">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <TrustLevelCard user={user} />
                        
                        <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl flex items-center gap-2"><Play size={20} className="text-purple-500"/> Video Sedcards</h3>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{videoUrls.length} Videos</span>
                            </div>
                            {isEditing && (
                                <div className="flex gap-4 mb-8">
                                    <input 
                                        value={newVideoUrl} 
                                        onChange={e => setNewVideoUrl(e.target.value)}
                                        placeholder="Video Link (Cloudinary, Instagram, TikTok...)" 
                                        className="flex-1 bg-black border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-teal-500 transition-all"
                                    />
                                    <button onClick={addVideo} className="px-6 py-4 bg-teal-500 text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl"><Plus size={18} /></button>
                                </div>
                            )}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {videoUrls.map((url, idx) => (
                                    <div key={idx} className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-black rounded-[24px] border border-white/10 relative group cursor-pointer overflow-hidden shadow-2xl">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play size={24} className="fill-white ml-1 text-white"/>
                                            </div>
                                        </div>
                                        {isEditing && (
                                            <button onClick={() => removeVideo(idx)} className="absolute top-4 right-4 p-2 bg-rose-500/20 text-rose-500 rounded-full border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all shadow-xl"><Trash2 size={16} /></button>
                                        )}
                                        <div className="absolute bottom-4 left-4 right-4"><div className="text-[8px] font-mono text-gray-400 truncate opacity-40 uppercase tracking-widest">{url}</div></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-8 relative shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl flex items-center gap-2"><MessageCircle size={20} className="text-teal-400" /> Kontakt & Alerts</h3>
                            </div>
                            {isEditing ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-3 block">Mobilnummer (für WhatsApp)</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                                            <input 
                                                value={phone} 
                                                onChange={e => setPhone(e.target.value)} 
                                                placeholder="+49 170 1234567"
                                                className="w-full bg-black border border-white/10 rounded-2xl p-4 pl-12 text-white font-bold outline-none focus:border-teal-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-teal-500/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${whatsappEnabled ? 'bg-teal-500 text-black' : 'bg-white/5 text-gray-600'}`}><Zap size={20} fill={whatsappEnabled ? "currentColor" : "none"} /></div>
                                            <div><h4 className="text-sm font-bold text-white">WhatsApp Job-Alerts</h4><p className="text-[10px] text-gray-500">Matching Gigs sofort per WhatsApp erhalten.</p></div>
                                        </div>
                                        <div onClick={() => setWhatsappEnabled(!whatsappEnabled)} className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-all ${whatsappEnabled ? 'bg-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.3)]' : 'bg-gray-800'}`}><div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${whatsappEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-3"><Phone size={16} className="text-gray-500" /><span className="text-sm font-mono text-gray-300">{phone || "Nicht hinterlegt"}</span></div>
                                        <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${whatsappEnabled ? 'bg-teal-500 animate-pulse' : 'bg-gray-700'}`}></div><span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">{whatsappEnabled ? 'WhatsApp Alerts aktiv' : 'Alerts inaktiv'}</span></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-surfaceHighlight border border-white/5 rounded-3xl p-8 relative shadow-2xl">
                            <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-xl flex items-center gap-2"><FileText size={20} className="text-teal-400" /> Über mich</h3></div>
                            {isEditing ? (
                                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Erzähle Studios mehr über deinen Hintergrund..." className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white text-sm leading-relaxed min-h-[160px] focus:border-teal-500 outline-none transition-all shadow-inner custom-scrollbar" />
                            ) : (
                                <p className="text-gray-400 leading-relaxed text-sm font-medium italic">{bio || "Keine Bio hinterlegt."}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'FAVORITEN' && (
                <div className="animate-fade-in max-w-3xl"><h2 className="text-2xl font-bold mb-6">Meine Studios</h2><div className="space-y-4">{[1, 2, 3].map(i => (
                            <div key={i} className="bg-surfaceHighlight border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/20 transition-all group"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all"><Building size={20} className="transition-colors" /></div><div><h4 className="font-bold">Urban Dance Academy</h4><p className="text-xs text-gray-500">Kreuzberg, Berlin</p></div></div><div className="flex items-center gap-6"><div className="text-right"><div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider mb-1">Auto-Pilot</div><CheckCircle2 size={28} className="text-teal-500 cursor-pointer" /></div><button className="p-2 text-gray-600 hover:text-white transition-colors"><ChevronRight size={20}/></button></div></div>
                        ))}</div></div>
            )}
        </div>
    );
};

export const SchoolProfileView = ({ user, onUpdateProfile, reviews = [] }: { user: UserProfile, onUpdateProfile: (data: Partial<UserProfile>) => void, reviews?: Review[] }) => {
    const [activeTab, setActiveTab] = useState('STUDIO');
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="animate-fade-in max-w-6xl mx-auto pb-24 relative">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black mb-2 tracking-tighter uppercase">Studio<span className="text-teal-400">Profile</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"><Building size={12} className="text-teal-500" /> B2B Presentation Hub</p>
                </div>
                <button onClick={() => setIsEditing(!isEditing)} className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${isEditing ? 'bg-primary text-black border-primary shadow-[0_0_20px_#2dd4bf]' : 'border-white/10 hover:bg-white/5'}`}>{isEditing ? 'Save Changes' : 'Edit Profile'}</button>
            </div>
            <div className="flex gap-8 border-b border-white/10 mb-10 overflow-x-auto no-scrollbar">
                {['STUDIO', 'FACILITIES', 'REVIEWS'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>{tab}{activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 shadow-[0_0_15px_#2dd4bf]"></div>}</button>
                ))}
            </div>
            {activeTab === 'STUDIO' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="space-y-8">
                        <div className="bg-surfaceHighlight border border-white/5 rounded-[40px] p-10 text-center relative overflow-hidden shadow-2xl group">
                            <div className="w-40 h-40 mx-auto rounded-[32px] bg-black border-2 border-white/5 mb-8 flex items-center justify-center relative shadow-2xl transform group-hover:scale-105 transition-transform duration-500"><span className="text-4xl font-black text-white">{user.avatarInitials}</span>{user.is_verified && <div className="absolute -bottom-2 -right-2 bg-teal-500 text-black rounded-full p-2 border-4 border-surface shadow-xl"><ShieldCheck size={24} /></div>}</div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{user.studioName || user.name}</h2>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"><MapPin size={12} className="text-teal-400" /> {user.location}</p>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-10">
                        <TrustLevelCard user={user} />
                        <div className="bg-surfaceHighlight border border-white/5 rounded-[40px] p-10 relative shadow-2xl">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 mb-8"><Info size={24} className="text-teal-400" /> Bio & Vision</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-medium">{user.bio || "Keine Bio hinterlegt."}</p>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'REVIEWS' && (
                <div className="animate-fade-in space-y-8">
                    <div className="flex justify-between items-end"><div><h3 className="text-2xl font-black text-white uppercase tracking-tight">Trust Ledger</h3><p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Echte Bewertungen von verifizierten Partnern.</p></div></div>
                    {reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{reviews.map(review => (<BlindReviewCard key={review.id} isLocked={false} rating={review.rating} comment={review.comment} authorName="Verified Pro" date={new Date(review.createdAt).toLocaleDateString()} />))}</div>
                    ) : (
                        <div className="py-20 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center opacity-40"><MessageSquare size={48} className="mb-4 text-gray-600" /><p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Noch keine Bewertungen vorhanden</p></div>
                    )}
                </div>
            )}
        </div>
    );
};
