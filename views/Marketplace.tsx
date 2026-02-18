
import React, { useState, useMemo } from 'react';
import { 
    Search, Plus, Sparkles, Briefcase, Building, Calendar as CalendarIcon, 
    MapPin, ArrowRight, Rocket, TrendingUp, Heart as HeartIcon, 
    MessageCircle, Share2, Filter, Zap, DollarSign, Plane, Globe, 
    Wifi, Music, Maximize, Users, Star, ShieldCheck, Check, Loader2, Info, ChevronDown, Clock, Move, MoreHorizontal, Layers
} from 'lucide-react';
// Corrected import path for OfferedSpace from types.ts
import { Job, MarketplaceItem, RentalSpace, UserRole, OfferedSpace } from '../types';
import { MOCK_MARKETPLACE_ITEMS, MOCK_RENTAL_SPACES } from '../constants';
import { JobCard } from '../components/Shared';

const AmenityIcons = ({ amenities, size = 12 }: { amenities: string[], size?: number }) => {
    return (
        <div className="flex gap-2.5 text-gray-500">
            {amenities.includes('Wifi') && <Wifi size={size} className="hover:text-teal-400 transition-colors" />}
            {(amenities.includes('Sound') || amenities.includes('Pro Audio')) && <Music size={size} className="hover:text-purple-400 transition-colors" />}
            {amenities.includes('Mirror') && <Maximize size={size} className="hover:text-blue-400 transition-colors" />}
            {(amenities.includes('Move') || amenities.includes('Dance Floor')) && <Layers size={size} className="hover:text-yellow-400 transition-colors" />}
        </div>
    );
};

// --- TRAINER: COMPACT SPACE CARD ---
const CompactSpaceCard = ({ space, nextSlot, onBook }: { space: RentalSpace, nextSlot?: string, onBook: () => void, key?: React.Key }) => (
    <div className="bg-surfaceHighlight/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all group flex h-32 md:h-36">
        {/* Left: Small Image */}
        <div className={`w-32 md:w-40 bg-gradient-to-br ${space.imageGradient} relative flex-shrink-0 overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            {nextSlot && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-teal-500 text-black text-[7px] font-black uppercase rounded shadow-lg z-10 animate-pulse">
                    Next: {nextSlot}
                </div>
            )}
        </div>
        
        {/* Right: Info Area */}
        <div className="flex-1 p-3 md:p-4 flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                    <h3 className="text-sm md:text-base font-black text-white truncate uppercase tracking-tight">{space.name}</h3>
                    <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                        <MapPin size={8} /> {space.location}
                    </div>
                </div>
                <div className="text-right flex-shrink-0">
                    <div className="text-base md:text-lg font-black text-white leading-none">€{space.pricePerHour}<span className="text-[9px] text-gray-600 font-normal">/h</span></div>
                    <div className="text-[8px] font-bold text-gray-500 mt-1 uppercase">{space.capacity} m²</div>
                </div>
            </div>

            <div className="flex justify-between items-end">
                {/* Specific Amenity Icons for Trainers */}
                <AmenityIcons amenities={['Wifi', 'Sound', 'Mirror', 'Move']} size={12} />
                <button 
                    onClick={(e) => { e.stopPropagation(); onBook(); }}
                    className="px-4 py-1.5 bg-white text-black font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-teal-400 transition-all shadow-xl"
                >
                    Book Now
                </button>
            </div>
        </div>
    </div>
);

// --- SCHOOL: INVENTORY MANAGEMENT CARD ---
const OwnSpaceManagementCard = ({ space, offeredCount }: { space: RentalSpace, offeredCount: number }) => (
    <div className="bg-surface border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${space.imageGradient} flex items-center justify-center border border-white/10`}>
                    <Building size={20} className="text-white opacity-40" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-white">{space.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${offeredCount > 0 ? 'bg-teal-500 animate-pulse' : 'bg-gray-700'}`}></span>
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
                            {offeredCount > 0 ? `Status: Live (Auto-Monetize active)` : 'Status: Offline'}
                        </span>
                    </div>
                </div>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 transition-colors"><MoreHorizontal size={20}/></button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Current Revenue</div>
                <div className="text-lg font-black font-mono text-white">€{(offeredCount * space.pricePerHour * 1.5).toFixed(0)}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Fill Rate</div>
                <div className="text-lg font-black text-teal-400 uppercase tracking-tighter">{offeredCount > 0 ? 'Optimal' : '0%'}</div>
            </div>
        </div>

        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-300 transition-all">
            Manage Room Settings
        </button>
    </div>
);

export const JobMarketplace = ({ jobs, onAccept }: { jobs: Job[], onAccept: (j: Job) => void }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} onAccept={onAccept} />
            ))}
        </div>
    );
};

export const MarketplaceView = ({ activeTab, setActiveTab, userRole, offeredSpaces, onOpenCreator, onOpenTourWizard, onQuickCreate }: { 
    activeTab: 'DISCOVER' | 'SPACES' | 'CREATOR' | 'TOUR' | 'COMMUNITY',
    setActiveTab: (t: any) => void,
    userRole: UserRole,
    offeredSpaces: OfferedSpace[],
    onOpenCreator: (item: MarketplaceItem) => void, 
    onOpenTourWizard: () => void,
    onQuickCreate: (spaceName: string) => void
}) => {
    const isSchool = userRole === 'SCHOOL';
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [bookingSpace, setBookingSpace] = useState<any | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS'>('IDLE');
    const [dayFilter, setDayFilter] = useState<string>('ALL');

    const discoverItems = MOCK_MARKETPLACE_ITEMS.filter(i => i.type === 'WORKSHOP' || i.type === 'AUDITION');
    const communityItems = MOCK_MARKETPLACE_ITEMS.filter(i => i.type === 'BROADCAST');
    const staticSpaces = MOCK_RENTAL_SPACES;

    const handleBookSpace = (space: RentalSpace | OfferedSpace) => {
        setBookingSpace(space);
        setBookingStatus('PENDING');
        setTimeout(() => setBookingStatus('SUCCESS'), 1800);
    };

    const handleCreateTicket = () => {
        if (!bookingSpace) return;
        onQuickCreate(bookingSpace.name || 'UDA Hall 1');
        setBookingSpace(null);
        setBookingStatus('IDLE');
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto relative min-h-screen pb-20 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h2 className="text-5xl font-black tracking-tighter mb-2 text-white">The Hive</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        {isSchool ? 'B2B Inventory Management Hub.' : 'Marketplace & Community Hub.'}
                    </p>
                </div>
                <div className="relative">
                     <button onClick={() => setShowCreateMenu(!showCreateMenu)} className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2 shadow-2xl text-xs uppercase tracking-widest">
                        <Plus size={18} /> {isSchool ? 'Post New Asset' : 'Create Listing'}
                     </button>
                </div>
            </div>

            <div className="flex gap-8 border-b border-white/10 mb-10 overflow-x-auto no-scrollbar">
                {['DISCOVER', 'SPACES', 'CREATOR', 'TOUR', 'COMMUNITY'].map((tab) => {
                    if (isSchool && (tab === 'CREATOR' || tab === 'TOUR')) return null;
                    return (
                        <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>
                            {tab === 'CREATOR' ? 'CREATOR INFO' : tab === 'TOUR' ? 'TOUR MODE' : tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></div>}
                        </button>
                    );
                })}
            </div>

            {activeTab === 'SPACES' && (
                <div className="animate-fade-in space-y-12">
                    {isSchool ? (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Your Active Inventory</h3>
                                <div className="h-px bg-white/5 flex-1"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <OwnSpaceManagementCard space={staticSpaces[0]} offeredCount={offeredSpaces.length} />
                                <div className="aspect-[4/5] md:aspect-auto rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-4 group hover:border-white/20 transition-all cursor-pointer bg-white/[0.01]">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Plus size={24} className="text-gray-600" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:text-white">Add New Room</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full md:auto pb-2 md:pb-0">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">Day:</span>
                                    {['ALL', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                                        <button key={day} onClick={() => setDayFilter(day)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${dayFilter === day ? 'bg-white text-black border-white shadow-lg' : 'bg-surfaceHighlight text-gray-500 border-white/5 hover:border-white/10'}`}>{day === 'ALL' ? 'Any' : day}</button>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors"><Filter size={14}/> Size</button>
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors"><TrendingUp size={14}/> Price</button>
                                </div>
                            </div>

                            {offeredSpaces.length > 0 && (
                                <div className="space-y-4">
                                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 flex items-center gap-2 px-2">
                                        <Zap size={14} className="fill-teal-400 animate-pulse"/> Instant Booking Elite
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <CompactSpaceCard space={{...staticSpaces[0], name: 'UDA Hall 1'}} nextSlot="Heute 14:00" onBook={() => handleBookSpace(offeredSpaces[0])} />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 px-2">All Verified Studios</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {staticSpaces.map(space => (
                                        <CompactSpaceCard key={space.id} space={space} onBook={() => handleBookSpace(space)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'COMMUNITY' && (
                <div className="animate-fade-in space-y-8">
                    {isSchool ? (
                        <div className="space-y-8">
                             <div className="bg-surfaceHighlight border border-teal-500/20 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                                <div className="p-5 bg-teal-500/10 rounded-2xl text-teal-400"><Search size={32} /></div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Staff & Substitute Scout</h3>
                                    <p className="text-gray-500 text-sm max-w-xl">Scanne 450+ Profile in Berlin nach deinen Kriterien. Erhalte Benachrichtigungen, wenn Top-Talente für deine Styles verfügbar werden.</p>
                                </div>
                                <button className="ml-auto px-8 py-4 bg-teal-500 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-teal-500/10 transition-all hover:bg-white">Open Talent Radar</button>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-surface border border-white/5 rounded-3xl p-6">
                                    <div className="flex items-center gap-3 mb-6"><div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Globe size={18}/></div><h4 className="font-bold text-white uppercase tracking-widest text-xs">Local School News</h4></div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer flex justify-between items-center">
                                            <span className="text-xs text-gray-300">Studio Expansion in Mitte: Neue Förderungen</span>
                                            <ArrowRight size={14} className="text-gray-600" />
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer flex justify-between items-center">
                                            <span className="text-xs text-gray-300">GEMA Update 2025: Was Studios wissen müssen</span>
                                            <ArrowRight size={14} className="text-gray-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface border border-white/5 rounded-3xl p-6">
                                    <div className="flex items-center gap-3 mb-6"><div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Zap size={18}/></div><h4 className="font-bold text-white uppercase tracking-widest text-xs">B2B Networking</h4></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="aspect-square bg-white/5 rounded-2xl flex flex-col items-center justify-center p-4 text-center border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                            <Building size={24} className="text-gray-600 mb-2" />
                                            <span className="text-[9px] font-bold text-gray-500 uppercase">Lease Gear</span>
                                        </div>
                                        <div className="aspect-square bg-white/5 rounded-2xl flex flex-col items-center justify-center p-4 text-center border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                            <Users size={24} className="text-gray-600 mb-2" />
                                            <span className="text-[9px] font-bold text-gray-500 uppercase">Recruitment</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 animate-fade-in">
                            {communityItems.map(item => (
                                <div key={item.id} className="break-inside-avoid glass-panel rounded-2xl p-6 hover:border-white/20 transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold text-[10px]">{item.organizer.substring(0,2).toUpperCase()}</div>
                                        <div><div className="font-bold text-sm leading-none">{item.organizer}</div><div className="text-[10px] text-gray-500">vor 2 Std.</div></div>
                                    </div>
                                    <h3 className="font-bold text-lg mb-3 leading-tight">{item.title}</h3>
                                    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-gray-500">
                                        <div className="flex gap-4">
                                            <HeartIcon size={18} className="hover:text-red-500 cursor-pointer transition-colors"/>
                                            <MessageCircle size={18} className="hover:text-white cursor-pointer transition-colors"/>
                                        </div>
                                        <Share2 size={18} className="hover:text-white cursor-pointer transition-colors"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'TOUR' && (
                <div className="animate-fade-in">
                    <div className="bg-gradient-to-br from-yellow-500/10 to-black border border-yellow-500/20 rounded-[48px] p-8 md:p-16 relative overflow-hidden text-center mb-12 shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-yellow-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                                <Plane size={48} className="text-yellow-500" />
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">Tour Mode<span className="text-yellow-500">.</span></h2>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-medium leading-relaxed">Nimm deine Karriere mit auf Reisen. Wir finden freie Studios in fremden Städten, generieren deine Tickets und helfen dir bei der Promotion.</p>
                            <button onClick={onOpenTourWizard} className="px-12 py-6 bg-yellow-500 text-black font-black rounded-3xl hover:bg-yellow-400 shadow-[0_0_50px_rgba(234,179,8,0.3)] transition-all flex items-center gap-4 mx-auto text-xl group hover:scale-105 uppercase tracking-widest">
                                <Rocket size={28} className="group-hover:-rotate-45 transition-transform duration-300" /> Tour Wizard Starten
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-surfaceHighlight border border-white/5 rounded-[32px] p-8">
                            <Globe size={32} className="text-yellow-500 mb-6" />
                            <h3 className="font-black text-xl mb-3 text-white uppercase tracking-tight">Smart Routing</h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Gib deine Reisedaten ein. Wir zeigen dir, wo die Nachfrage nach deinem Style am höchsten ist.</p>
                        </div>
                        <div className="bg-surfaceHighlight border border-white/5 rounded-[32px] p-8">
                            <Building size={32} className="text-yellow-500 mb-6" />
                            <h3 className="font-black text-xl mb-3 text-white uppercase tracking-tight">Instant Spaces</h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Keine E-Mails, keine Anrufe. Buche verifizierte Studios direkt per App in Sekunden.</p>
                        </div>
                        <div className="bg-surfaceHighlight border border-white/5 rounded-[32px] p-8">
                            <TrendingUp size={32} className="text-yellow-500 mb-6" />
                            <h3 className="font-black text-xl mb-3 text-white uppercase tracking-tight">Ticket Sales</h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Wir erstellen automatisch Event-Seiten und Boarding Pässe für deine Schüler weltweit.</p>
                        </div>
                    </div>
                </div>
            )}

            {!isSchool && activeTab === 'DISCOVER' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {discoverItems.map(item => (
                         <div key={item.id} className="group glass-panel rounded-3xl overflow-hidden hover:border-white/20 transition-all hover:scale-[1.005] hover:shadow-2xl">
                             <div className={`h-40 bg-gradient-to-br ${item.imageGradient} relative p-6 flex flex-col justify-between`}><span className="self-start bg-black/40 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">{item.type}</span></div>
                             <div className="p-6">
                                 <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">{item.title}</h3>
                                 <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-4 font-mono">{item.organizer}</div>
                                 <div className="space-y-2 text-sm text-gray-300 mb-6"><div className="flex items-center gap-3"><CalendarIcon size={16} className="text-gray-500"/>{item.dateOrDeadline}</div><div className="flex items-center gap-3"><MapPin size={16} className="text-gray-500"/>{item.location}</div></div>
                                 <button className="w-full py-3 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">Details <ArrowRight size={16} /></button>
                             </div>
                         </div>
                    ))}
                </div>
            )}

            {!isSchool && activeTab === 'CREATOR' && (
                <div className="animate-fade-in max-w-3xl mx-auto text-center space-y-12 pt-10">
                    <div className="w-24 h-24 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto border border-purple-500/30"><Rocket size={48} className="text-purple-400" /></div>
                    <div className="space-y-4">
                        <h2 className="text-6xl font-black tracking-tighter uppercase text-white">Become a Creator</h2>
                        <p className="text-gray-400 text-xl leading-relaxed font-medium">Hast du eine eigene Community? Willst du Workshops geben, ohne das finanzielle Risiko allein zu tragen? Im Creator Mode buchst du einen Raum und wir erstellen dir in Sekunden den passenden Online-Shop für deine Tickets.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-left">
                        <div className="bg-surfaceHighlight p-8 rounded-[32px] border border-white/5"><TrendingUp className="text-teal-400 mb-4" size={32} /><h4 className="font-black text-xl text-white mb-2 uppercase tracking-tight">Max Profit</h4><p className="text-sm text-gray-500 leading-relaxed">Verkaufe Tickets direkt über die App. Ab dem 5. Schüler bist du im Plus.</p></div>
                        <div className="bg-surfaceHighlight p-8 rounded-[32px] border border-white/5"><Zap className="text-purple-400 mb-4" size={32} /><h4 className="font-black text-xl text-white mb-2 uppercase tracking-tight">Instant Assets</h4><p className="text-sm text-gray-500 leading-relaxed">Generiere automatisierte Social Media Assets für dein Marketing.</p></div>
                    </div>
                    <button onClick={() => setActiveTab('SPACES')} className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-3xl shadow-xl transition-all uppercase tracking-widest text-lg">Create Business</button>
                </div>
             )}

            {bookingSpace && bookingStatus !== 'IDLE' && (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="bg-surface border border-white/10 rounded-[40px] p-10 w-full max-w-sm animate-bounce-up shadow-2xl text-center relative overflow-hidden">
                        {bookingStatus === 'PENDING' ? (
                            <div className="py-10"><Loader2 className="animate-spin text-teal-400 mx-auto mb-6" size={48} /><h3 className="text-xl font-black text-white uppercase tracking-widest">Securing Slot...</h3></div>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(45,212,191,0.3)]"><Check size={40} className="text-black" /></div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Raum gesichert! ✅</h3>
                                <p className="text-gray-500 mb-8 text-sm">Der Slot ist für dich reserviert. Jetzt kannst du den Verkauf starten.</p>
                                <div className="bg-purple-600/10 border border-purple-500/20 rounded-3xl p-6 mb-8 text-left">
                                    <h4 className="text-purple-400 font-black text-xs uppercase tracking-widest mb-2">Monetarisieren?</h4>
                                    <p className="text-[11px] text-purple-200/60 leading-relaxed mb-6">Wir haben ein Demo-Event für dich vorbereitet. Du kannst es sofort im Cockpit verwalten.</p>
                                    <button onClick={handleCreateTicket} className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"><Sparkles size={14} /> Ticket erstellen</button>
                                </div>
                                <button onClick={() => { setBookingSpace(null); setBookingStatus('IDLE'); }} className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Vorerst nur Raum buchen</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
