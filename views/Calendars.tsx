
import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, RefreshCw, Zap, ShieldCheck, Info, DollarSign, TrendingUp, Lock, Clock, Building, User, Sparkles, Calendar, Plus, Check, Wallet, BarChart3, Users, Flame, Target, Globe, MousePointer2, ArrowRight, MapPin, ArrowUpRight, Search, TrendingDown, Activity, Settings2,
  CheckCircle2, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
// Corrected import path for OfferedSpace from types.ts
import { Job, RegularClass, OwnClass, OfferedSpace } from '../types';
import { ImportModal } from '../components/Modals';
import { GAME_RULES } from '../gameRules';

const DAYS_FULL: Record<string, string> = {
    'Mo': 'Montag', 
    'Di': 'Dienstag', 
    'Mi': 'Mittwoch', 
    'Do': 'Donnerstag', 
    'Fr': 'Freitag', 
    'Sa': 'Samstag', 
    'So': 'Sonntag'
};
const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 8);

/**
 * SHARED MOBILE DAY SWITCHER COMPONENT
 */
const DaySwitcher = ({ currentDay, onNext, onPrev }: { currentDay: string, onNext: () => void, onPrev: () => void }) => (
    <div className="flex md:hidden items-center justify-between bg-surfaceHighlight border border-white/10 rounded-2xl p-2 mb-4">
        <button onClick={onPrev} className="p-3 hover:bg-white/5 rounded-xl text-gray-400 active:scale-90 transition-all">
            <ChevronLeft size={24} />
        </button>
        <div className="text-center">
            <div className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em] mb-0.5">Wochentag</div>
            <div className="text-sm font-black text-white uppercase tracking-widest">{DAYS_FULL[currentDay] || 'Unbekannt'}</div>
        </div>
        <button onClick={onNext} className="p-3 hover:bg-white/5 rounded-xl text-gray-400 active:scale-90 transition-all">
            <ChevronRight size={24} />
        </button>
    </div>
);

/**
 * TRAINER CALENDAR VIEW
 */
export const SmartCalendarView = ({ 
    jobs = [], 
    ownClasses = [], 
    regularClasses = [], 
    availability = new Set(), 
    onToggleAvailability,
    onManageClass
}: { 
    jobs?: Job[], 
    ownClasses?: OwnClass[], 
    regularClasses?: RegularClass[],
    availability?: Set<string>,
    onToggleAvailability?: (day: string, hour: number) => void,
    onManageClass?: (cls: RegularClass) => void
}) => {
    const [activeDayIdx, setActiveDayIdx] = useState(0);
    
    useEffect(() => {
        const today = new Date().getDay(); 
        const adjustedIdx = today === 0 ? 6 : today - 1;
        setActiveDayIdx(adjustedIdx);
    }, []);

    const calendarItemsMap = useMemo(() => {
        const map: Record<string, any[]> = {};
        (regularClasses || []).forEach((c: RegularClass) => {
            if (!c?.timeStart) return;
            const hourPart = c.timeStart.split(':')[0];
            const key = `${c.day}-${hourPart}`;
            if (!map[key]) map[key] = [];
            map[key].push({ ...c, type: 'REGULAR' });
        });
        (jobs || []).forEach((j: Job) => {
            if (!j?.timeStart) return;
            const hourPart = j.timeStart.split(':')[0];
            const dayKey = j.date === 'Heute' ? DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] : j.date?.substring(0, 2);
            const key = `${dayKey}-${hourPart}`;
            if (!map[key]) map[key] = [];
            map[key].push({ ...j, type: 'JOB' });
        });
        (ownClasses || []).forEach((c: OwnClass) => {
            if (!c?.time) return;
            const hourPart = c.time.split(' - ')[0].split(':')[0];
            const dayKey = c.date?.substring(0, 2);
            const key = `${dayKey}-${hourPart}`;
            if (!map[key]) map[key] = [];
            map[key].push({ ...c, type: 'OWN' });
        });
        return map;
    }, [jobs, ownClasses, regularClasses]);

    const stats = useMemo(() => {
        const currentRegular = (regularClasses || []).reduce((acc, c) => acc + (c?.baseFee || 0), 0);
        const currentJobs = (jobs || []).reduce((acc, j) => acc + (j?.totalFee || 0), 0);
        const currentCreator = (ownClasses || []).reduce((acc, c) => acc + (c?.revenue || 0), 0);
        const currentTotal = currentRegular + currentJobs + currentCreator;
        const potentialExtra = (availability?.size || 0) * 40;
        return { current: currentTotal || 0, potential: (currentTotal + potentialExtra) || 0, availableHours: availability?.size || 0 };
    }, [regularClasses, jobs, ownClasses, availability]);

    const cycleDay = (dir: number) => {
        setActiveDayIdx(prev => (prev + dir + 7) % 7);
    };

    return (
        <div className="animate-fade-in space-y-8 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Radar Sync Active</span>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter">Your Schedule</h2>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="glass-panel-highlight rounded-[32px] p-6 flex items-center gap-5 border border-teal-500/20 shadow-[0_0_40px_rgba(45,212,191,0.1)] flex-1 md:flex-none transition-all hover:scale-105">
                         <div className="bg-teal-500/10 p-3 rounded-2xl text-teal-400"><TrendingUp size={28} /></div>
                         <div>
                            <div className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1 flex items-center gap-1">Weekly Potential <Zap size={10} fill="currentColor" /></div>
                            <div className="text-3xl font-black font-mono text-white tracking-tighter">€{(stats.potential || 0).toFixed(0)}</div>
                         </div>
                    </div>
                    <div className="glass-panel rounded-[32px] p-6 flex items-center gap-5 border border-white/5 flex-1 md:flex-none opacity-80">
                         <div className="bg-white/5 p-3 rounded-2xl text-gray-400"><Wallet size={28} /></div>
                         <div>
                            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Fixed Regulars</div>
                            <div className="text-3xl font-black font-mono text-white tracking-tighter">€{(stats.current || 0).toFixed(0)}</div>
                         </div>
                    </div>
                </div>
            </div>

            <DaySwitcher 
                currentDay={DAYS[activeDayIdx]} 
                onNext={() => cycleDay(1)} 
                onPrev={() => cycleDay(-1)} 
            />

            <div className="bg-surfaceHighlight border border-white/5 rounded-[48px] overflow-hidden shadow-2xl relative">
                <div className="hidden md:grid grid-cols-[80px_repeat(7,1fr)] bg-black/60 border-b border-white/10 sticky top-0 z-20 backdrop-blur-md">
                    <div className="p-4 text-center text-[10px] font-black uppercase text-gray-600 italic border-r border-white/5">Time</div>
                    {DAYS.map(d => (
                        <div key={d} className="p-4 text-center font-black text-[11px] uppercase text-gray-400 border-r border-white/5 last:border-0">{DAYS_FULL[d] || d}</div>
                    ))}
                </div>

                <div className="flex flex-col divide-y divide-white/5">
                    {HOURS.map(h => {
                        const hStr = h.toString().padStart(2, '0');
                        return (
                            <div key={h} className="grid grid-cols-[80px_1fr] md:grid-cols-[80px_repeat(7,1fr)] min-h-[150px]">
                                <div className="p-4 border-r border-white/5 flex items-center justify-center font-mono text-gray-800 font-bold bg-black/10 text-xs">{hStr}:00</div>
                                {DAYS.map((d, dIdx) => {
                                    const key = `${d}-${hStr}`;
                                    const items = calendarItemsMap[key] || [];
                                    const isAvailable = availability?.has(key);
                                    const isEmpty = items.length === 0;
                                    const isVisibleOnMobile = dIdx === activeDayIdx;

                                    return (
                                        <div key={key} 
                                             onClick={() => isEmpty && onToggleAvailability?.(d, h)} 
                                             className={`p-2 border-r border-white/5 hover:bg-white/[0.02] flex flex-col gap-2 last:border-0 transition-all relative group/cell min-h-[150px] cursor-pointer 
                                                ${isAvailable ? 'bg-teal-500/[0.03]' : ''} 
                                                ${!isVisibleOnMobile ? 'hidden md:flex' : 'flex'}
                                             `}>
                                            {items.map((item, idx) => (
                                                <div key={idx} onClick={(e) => { if (item.type === 'REGULAR') { e.stopPropagation(); onManageClass?.(item); } }} className={`p-3 rounded-2xl border transition-all h-full flex flex-col justify-between shadow-lg relative overflow-hidden group/item ${item.isSearchingSub ? 'bg-orange-500/20 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : item.type === 'REGULAR' ? 'bg-surface border-white/10' : item.type === 'JOB' ? 'bg-teal-500/10 border-teal-500/30' : 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]'}`}>
                                                    <div>
                                                        <div className={`text-[7px] font-black uppercase mb-1 tracking-widest ${item.isSearchingSub ? 'text-orange-400' : item.type === 'REGULAR' ? 'text-gray-500' : item.type === 'JOB' ? 'text-teal-400' : 'text-purple-400'} flex items-center gap-1`}>
                                                            {item.isSearchingSub ? 'Searching Sub...' : item.type === 'REGULAR' ? 'Studio Class' : item.type === 'JOB' ? 'StandIn Job' : 'Creator Event'}
                                                        </div>
                                                        <div className="text-[10px] font-black text-white leading-tight uppercase tracking-tight line-clamp-2">{item?.title || 'Untitled'}</div>
                                                    </div>
                                                    <div className="flex justify-between items-end mt-2">
                                                        <div className={`text-[8px] font-bold uppercase ${item.isSearchingSub ? 'text-orange-400' : item.type === 'REGULAR' ? 'text-gray-500' : item.type === 'JOB' ? 'text-teal-400' : 'text-purple-400'} flex items-center gap-1`}>€{item.baseFee || item.totalFee || item.revenue || 0}</div>
                                                        <ArrowUpRight size={12} className={`${item.isSearchingSub ? 'text-orange-500' : 'text-gray-700'} group-hover/item:text-white transition-colors`} />
                                                    </div>
                                                </div>
                                            ))}
                                            {isEmpty && (
                                                <div className={`absolute inset-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 ${isAvailable ? 'border-teal-500 bg-teal-500/10 opacity-100 shadow-[0_0_20px_rgba(45,212,191,0.2)]' : 'border-white/5 opacity-0 group-hover/cell:opacity-100 group-hover/cell:border-white/20'}`}>
                                                    {isAvailable ? (<><Zap size={24} className="text-teal-400 fill-teal-400 animate-pulse" /><span className="text-[8px] font-black uppercase tracking-[0.2em] mt-2 text-teal-400">Marked Ready</span></>) : (<><Plus size={20} className="text-gray-700" /><span className="text-[7px] font-black uppercase tracking-widest mt-1 text-gray-700">Set Ready</span></>)}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

/**
 * SCHOOL SCHEDULE VIEW
 */
export const SmartScheduleView = ({ 
    classes = [],
    jobs = [], 
    offeredSpaces = [],
    onQuickPost, 
    onCreateClass,
    onOfferSpaces,
    onOpenImport
}: { 
    classes?: RegularClass[],
    jobs?: Job[],
    offeredSpaces?: OfferedSpace[],
    onQuickPost: (cls: RegularClass) => void,
    onUpdateClass: (id: string, updates: Partial<RegularClass>) => void,
    onCreateClass: (day: string, hour: number) => void,
    onOfferSpaces: (slots: {day: string, hour: number}[]) => void,
    onShowNotification: (msg: string) => void,
    onOpenImport: () => void
}) => {
    const [activeDayIdx, setActiveDayIdx] = useState(0);
    const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

    const scheduleMap = useMemo(() => {
        const map: Record<string, RegularClass[]> = {};
        (classes || []).forEach((c: RegularClass) => {
            if (!c?.timeStart) return;
            const hourPart = c.timeStart.split(':')[0];
            const key = `${c.day}-${hourPart}`;
            if (!map[key]) map[key] = [];
            map[key].push(c);
        });
        return map;
    }, [classes]);

    const offeredMap = useMemo(() => {
        const map = new Set<string>();
        (offeredSpaces || []).forEach(s => map.add(s?.key || ''));
        return map;
    }, [offeredSpaces]);

    const handleSlotClick = (day: string, hour: number) => {
        const key = `${day}-${hour.toString().padStart(2, '0')}`;
        const next = new Set(selectedSlots);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        setSelectedSlots(next);
    };

    const cycleDay = (dir: number) => {
        setActiveDayIdx(prev => (prev + dir + 7) % 7);
    };

    return (
        <div className="animate-fade-in space-y-8 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Studio Schedule</h2>
                </div>
                <div className="flex gap-4">
                    {selectedSlots.size > 0 ? (
                        <button 
                            onClick={() => {
                                const slots = Array.from(selectedSlots).map((k: string) => {
                                    const [d, h] = k.split('-');
                                    return { day: d, hour: parseInt(h) };
                                });
                                onOfferSpaces(slots);
                                setSelectedSlots(new Set());
                            }} 
                            className="px-8 py-4 bg-teal-500 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl animate-bounce-up"
                        >
                            Offer {selectedSlots.size} Slots
                        </button>
                    ) : (
                        <button onClick={onOpenImport} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2">
                            <RefreshCw size={14} /> Import Schedule
                        </button>
                    )}
                </div>
            </div>

            <DaySwitcher 
                currentDay={DAYS[activeDayIdx]} 
                onNext={() => cycleDay(1)} 
                onPrev={() => cycleDay(-1)} 
            />

            <div className="bg-surfaceHighlight border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
                <div className="flex flex-col divide-y divide-white/5">
                    {HOURS.map(h => {
                        const hStr = h.toString().padStart(2, '0');
                        return (
                            <div key={h} className="grid grid-cols-[80px_1fr] md:grid-cols-[80px_repeat(7,1fr)] min-h-[140px]">
                                <div className="p-4 border-r border-white/5 flex items-center justify-center font-mono text-gray-800 font-bold bg-black/10 text-xs">{hStr}:00</div>
                                {DAYS.map((d, dIdx) => {
                                    const key = `${d}-${hStr}`;
                                    const items = scheduleMap[key] || [];
                                    const isOffered = offeredMap.has(key);
                                    const isSelected = selectedSlots.has(key);
                                    const isVisibleOnMobile = dIdx === activeDayIdx;

                                    return (
                                        <div 
                                            key={key} 
                                            onClick={() => items.length === 0 && handleSlotClick(d, h)}
                                            className={`p-2 border-r border-white/5 hover:bg-white/[0.02] flex flex-col gap-2 last:border-0 transition-all relative group cursor-pointer 
                                                ${isOffered ? 'bg-purple-500/[0.03]' : ''}
                                                ${isSelected ? 'bg-teal-500/[0.05]' : ''}
                                                ${!isVisibleOnMobile ? 'hidden md:flex' : 'flex'}
                                            `}
                                        >
                                            {items.map((cls, idx) => {
                                                // Härtung: Defensive Suche
                                                const jobMatch = (jobs || []).find(j => 
                                                    j && (j.classId === cls?.id || 
                                                    (j.status === 'OPEN' && j.title?.includes(cls?.title || '')) ||
                                                    (j.status === 'APPLIED' && j.title?.includes(cls?.title || '')))
                                                );
                                                const hasApplied = jobMatch?.status === 'APPLIED';
                                                const isOpenSearch = jobMatch?.status === 'OPEN';

                                                return (
                                                    <div 
                                                        key={idx} 
                                                        className={`p-3 rounded-2xl border transition-all shadow-lg flex flex-col justify-between h-full group/item relative overflow-hidden
                                                            ${hasApplied ? 'bg-yellow-500/10 border-yellow-500/30' : isOpenSearch ? 'bg-surface border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'bg-surface border-white/10'}
                                                        `}
                                                    >
                                                        {hasApplied && <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500 text-black text-[7px] font-black uppercase rounded shadow-lg animate-pulse">{jobMatch?.applicant_count || 1} Bewerber</div>}
                                                        <div>
                                                            <div className="text-[7px] font-black uppercase text-gray-500 mb-1 tracking-widest">Permanent Session</div>
                                                            <div className="text-[10px] font-black text-white leading-tight uppercase line-clamp-2">{cls?.title || 'Untitled'}</div>
                                                            <div className="text-[8px] text-gray-600 mt-1 italic">{cls?.regularTeacher}</div>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-3">
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); if(!jobMatch) onQuickPost(cls); }}
                                                                className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest transition-all ${jobMatch ? 'bg-black/40 text-gray-500 cursor-default' : 'bg-white/5 hover:bg-teal-500 hover:text-black'}`}
                                                            >
                                                                {hasApplied ? 'Auswahl läuft...' : isOpenSearch ? 'Suche läuft...' : 'FIND SUB'}
                                                            </button>
                                                            <ArrowRight size={12} className={`transition-colors ${jobMatch ? 'text-yellow-500' : 'text-gray-800'} group-hover/item:text-teal-400`} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {items.length === 0 && (
                                                <div className={`absolute inset-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 
                                                    ${isSelected ? 'border-teal-500 bg-teal-500/10 opacity-100' : isOffered ? 'border-purple-500/30 bg-purple-500/10 opacity-100' : 'border-white/5 opacity-0 group-hover:opacity-100'}
                                                `}>
                                                    {isOffered ? (
                                                        <Globe size={20} className="text-purple-400 animate-pulse" />
                                                    ) : isSelected ? (
                                                        <Check size={20} className="text-teal-400" />
                                                    ) : (
                                                        <button onClick={(e) => { e.stopPropagation(); onCreateClass(d, h); }} className="flex flex-col items-center">
                                                            <Plus size={18} className="text-gray-700" />
                                                            <span className="text-[7px] font-black uppercase tracking-widest mt-1 text-gray-700">Add Class</span>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
