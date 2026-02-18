
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
    Search, Send, MessageSquare, Lock, ShieldCheck, 
    Plus, Phone, Video, MoreVertical, 
    ArrowLeft, CheckCircle2, Zap, User, Clock, ChevronRight
} from 'lucide-react';
import { UserProfile, Job, UserRole } from '../types';

interface Message {
    id: string;
    jobId: string;
    senderId: string;
    text: string;
    timestamp: string;
    isMe: boolean;
}

export const MessagingView = ({ user, jobs = [] }: { user: UserProfile, jobs: Job[] }) => {
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [msgInput, setMsgInput] = useState('');
    const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>({});
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedJobId, localMessages]);

    // Filtere relevante Jobs für Chats (Nur wenn gebucht)
    const chatChannels = useMemo(() => {
        return jobs.filter(j => 
            (j.assigneeId === user.id || j.creatorId === user.id) &&
            (j.status === 'ACCEPTED' || j.status === 'CHECKED_IN' || j.status === 'COMPLETED')
        );
    }, [jobs, user.id]);

    const selectedJob = useMemo(() => 
        chatChannels.find(j => j.id === selectedJobId), 
        [chatChannels, selectedJobId]
    );

    const partnerName = useMemo(() => {
        if (!selectedJob) return '';
        return user.role === 'TRAINER' ? selectedJob.studioName : 'Trainer';
    }, [selectedJob, user.role]);

    const sendMessage = () => {
        if (!msgInput.trim() || !selectedJobId) return;
        
        const newMsg: Message = {
            id: Date.now().toString(),
            jobId: selectedJobId,
            senderId: user.id,
            text: msgInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setLocalMessages(prev => ({
            ...prev,
            [selectedJobId]: [...(prev[selectedJobId] || []), newMsg]
        }));
        setMsgInput('');
    };

    return (
        <div className="animate-fade-in h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] flex bg-surface border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
            
            {/* SIDEBAR: CONVERSATIONS LIST */}
            <div className={`w-full md:w-[360px] border-r border-white/5 flex flex-col bg-[#080808] transition-all ${selectedJobId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-8 border-b border-white/5">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Messages</h3>
                    <div className="relative group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-teal-400 transition-colors" />
                        <input 
                            placeholder="Suche Mission oder Name..." 
                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-[10px] font-black uppercase text-white focus:border-teal-500 transition-all outline-none"
                        />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chatChannels.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {chatChannels.map(job => (
                                <div 
                                    key={job.id} 
                                    onClick={() => setSelectedJobId(job.id)}
                                    className={`p-6 cursor-pointer transition-all relative group flex items-center gap-4 ${selectedJobId === job.id ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                                >
                                    {selectedJobId === job.id && <div className="absolute left-0 top-0 w-1 h-full bg-teal-500 shadow-[0_0_15px_#2dd4bf]"></div>}
                                    
                                    <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center font-black text-xs border border-white/10 shadow-lg group-hover:scale-105 transition-transform shrink-0">
                                        {user.role === 'TRAINER' ? job.studioName.substring(0,2).toUpperCase() : 'TR'}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <span className="text-sm font-black text-white truncate">{user.role === 'TRAINER' ? job.studioName : 'Pro Artist'}</span>
                                            <span className="text-[9px] text-gray-600 font-mono">12:45</span>
                                        </div>
                                        <div className="text-[10px] text-teal-400 font-black uppercase tracking-widest truncate mb-1">
                                            Job: {job.title}
                                        </div>
                                        <p className="text-xs text-gray-500 truncate font-medium">Klick zum Öffnen des Chats...</p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-800 group-hover:text-gray-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center flex flex-col items-center justify-center h-full opacity-30">
                            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                                <Lock size={32} className="text-gray-600" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Keine Chats aktiv</p>
                            <p className="text-[9px] mt-3 italic text-gray-500 max-w-[200px]">Nachrichten sind erst nach einer festen Buchung verfügbar.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT: THE CHAT WINDOW */}
            <div className={`flex-1 flex flex-col bg-black/20 relative ${!selectedJobId ? 'hidden md:flex' : 'flex'}`}>
                {selectedJob ? (
                    <>
                        {/* CHAT HEADER: MISSION FOCUS */}
                        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-surface/80 backdrop-blur-xl relative z-10">
                            <div className="flex items-center gap-5">
                                <button onClick={() => setSelectedJobId(null)} className="md:hidden p-3 hover:bg-white/5 rounded-full text-gray-400 mr-2">
                                    <ArrowLeft size={24} />
                                </button>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10 shadow-xl shrink-0">
                                    <span className="font-black text-sm text-white/50">{partnerName.substring(0,2).toUpperCase()}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">Session Context</span>
                                        <div className="h-px w-8 bg-teal-500/30"></div>
                                        <span className="text-[10px] font-mono text-gray-500 uppercase">Mission: {selectedJob.title}</span>
                                    </div>
                                    <div className="font-black text-xl md:text-2xl leading-none text-white uppercase tracking-tight">{partnerName}</div>
                                </div>
                            </div>
                            <div className="hidden md:flex gap-3">
                                <button className="p-4 bg-white/5 hover:bg-teal-500 hover:text-black rounded-2xl text-gray-400 transition-all border border-white/5 group shadow-lg">
                                    <Phone size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button className="p-4 bg-white/5 hover:bg-purple-500 hover:text-white rounded-2xl text-gray-400 transition-all border border-white/5 group shadow-lg">
                                    <Video size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* MESSAGES STREAM */}
                        <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar flex flex-col bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed opacity-95">
                            
                            <div className="flex justify-center mb-4">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-3 shadow-xl">
                                    <ShieldCheck size={16} className="text-teal-400" />
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">End-to-End Encrypted Mission Channel</span>
                                </div>
                            </div>

                            {/* PARTNER MESSAGE */}
                            <div className="flex justify-start">
                                <div className="max-w-[75%] md:max-w-[60%] flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-gray-800 shrink-0 mt-1 flex items-center justify-center font-black text-[10px] text-white/40 border border-white/5">
                                        {partnerName.substring(0,1)}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="p-5 rounded-[24px] rounded-tl-none text-sm leading-relaxed bg-surfaceHighlight text-gray-300 border border-white/5 shadow-2xl">
                                            Hey! Willkommen an Bord für die Mission <span className="text-teal-400 font-bold">"{selectedJob.title}"</span> am {selectedJob.date}. 
                                            Gibt es von deiner Seite noch Fragen zum Ablauf oder zum Equipment vor Ort?
                                        </div>
                                        <div className="text-[9px] font-mono text-gray-600 pl-1 uppercase">Partner • 09:41</div>
                                    </div>
                                </div>
                            </div>

                            {/* LOCAL (MY) MESSAGES */}
                            {(localMessages[selectedJob.id] || []).map(msg => (
                                <div key={msg.id} className="flex justify-end animate-bounce-up">
                                    <div className="max-w-[75%] md:max-w-[60%] flex flex-col items-end">
                                        <div className="p-5 rounded-[24px] rounded-tr-none text-sm leading-relaxed bg-teal-500/90 text-black font-medium shadow-[0_10px_30px_rgba(45,212,191,0.2)] border border-teal-400/30">
                                            {msg.text}
                                        </div>
                                        <div className="text-[9px] font-mono text-gray-500 mt-2 pr-1 uppercase">
                                            You • {msg.timestamp} <span className="text-teal-500 ml-1">✓✓</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* INPUT AREA */}
                        <div className="p-8 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="flex gap-4 items-center bg-surfaceHighlight/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 pl-8 focus-within:border-teal-500/50 focus-within:bg-surfaceHighlight/80 transition-all shadow-inner">
                                <input 
                                    value={msgInput} 
                                    onChange={(e) => setMsgInput(e.target.value)} 
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                                    placeholder="Nachricht schreiben..." 
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 py-4 font-medium" 
                                />
                                <button 
                                    onClick={sendMessage} 
                                    disabled={!msgInput.trim()} 
                                    className={`p-5 rounded-[24px] transition-all flex items-center justify-center ${msgInput.trim() ? 'bg-teal-500 text-black shadow-[0_0_25px_rgba(45,212,191,0.4)] hover:scale-105 active:scale-95' : 'bg-white/5 text-gray-700'}`}
                                >
                                    <Send size={24} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mb-10 border border-white/5 animate-pulse relative">
                            <div className="absolute inset-0 bg-teal-500/5 rounded-full blur-2xl"></div>
                            <MessageSquare size={48} className="text-gray-700 relative z-10" />
                        </div>
                        <h4 className="text-3xl font-black text-white/30 uppercase tracking-tighter mb-4 italic">Open a Mission</h4>
                        <p className="text-sm text-gray-600 max-w-xs leading-relaxed uppercase tracking-widest font-bold">
                            Wähle eine aktive Konversation aus der Sidebar aus.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
