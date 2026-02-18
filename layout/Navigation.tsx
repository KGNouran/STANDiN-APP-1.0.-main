
import React from 'react';
import { Target, LayoutDashboard, Search, Wallet, Globe, User, Sparkles, PlusCircle, CalendarDays, FileText, CreditCard, Building, LogOut, Settings, ScanLine, Bell, LayoutGrid, Plus, Users, MessageSquare } from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { IS_DEMO_MODE } from '../constants';

export const Sidebar = ({ activeTab, setActiveTab, userRole, onLogout, onResetDemo }: { activeTab: string, setActiveTab: (t: string) => void, userRole: UserRole, onLogout: () => void, onResetDemo: () => void }) => {
    const trainerItems = [
        { id: 'radar-home', label: 'Radar', icon: Target },
        { id: 'cockpit', label: 'Cockpit', icon: LayoutDashboard },
        { id: 'schedule', label: 'Schedule', icon: CalendarDays }, 
        { id: 'find-jobs', label: 'Find Jobs', icon: Search },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'wallet', label: 'Wallet', icon: Wallet },           
        { id: 'marketplace', label: 'Market', icon: Globe },
        { id: 'profile', label: 'MySpace', icon: User },
    ];
    const schoolItems = [
        { id: 'ai-home', label: 'AI Search', icon: Sparkles },
        { id: 'dashboard', label: 'Cockpit', icon: LayoutDashboard },
        { id: 'schedule', label: 'Schedule', icon: CalendarDays },
        { id: 'post-job', label: 'Job Posten', icon: PlusCircle },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'marketplace', label: 'Market', icon: Globe },
        { id: 'finances', label: 'Finanzen', icon: CreditCard },
        { id: 'myspace', label: 'Studio', icon: Building },
    ];
    const items = userRole === 'TRAINER' ? trainerItems : schoolItems;

    return (
        <aside className="fixed left-0 top-0 h-full w-64 glass-panel border-r border-white/5 px-6 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))] hidden md:flex flex-col justify-between z-[60]">
            <div>
                <div 
                    onClick={onResetDemo}
                    className="flex items-center gap-2 mb-12 px-2 cursor-pointer group active:scale-95 transition-all"
                    title="Reset Demo Data"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-purple-600 rounded-lg flex items-center justify-center font-bold text-black text-xs shadow-neon group-hover:shadow-[0_0_15px_rgba(45,212,191,0.4)] transition-shadow">SI</div>
                    <span className="font-bold text-xl tracking-tighter text-glow group-hover:text-white transition-colors">stand<span className="text-teal-400">In</span>.</span>
                </div>
                <nav className="space-y-2">{items.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-white text-black shadow-lg shadow-white/10 scale-[1.02]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}><item.icon size={18} />{item.label}</button>)}</nav>
            </div>
            <div>
                <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                    <Settings size={18} /> Einstellungen
                </button>
                <div className="mt-4 pt-4 border-t border-white/5">
                    <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"><LogOut size={18} />Logout</button>
                </div>
                <div className="mt-6 px-4 py-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold font-mono border border-white/10">{userRole === 'TRAINER' ? 'TR' : 'SC'}</div><div><div className="text-xs font-bold text-white">{userRole === 'TRAINER' ? 'Trainer' : 'School'}</div><div className="text-[10px] text-gray-500 font-mono">Pro Account</div></div></div></div>
            </div>
        </aside>
    );
};

export const Header = ({ user, onToggleRole, onOpenScanner, activeTab, onLogout, onNavigate, onResetDemo }: { user: UserProfile, onToggleRole: () => void, onOpenScanner: () => void, activeTab: string, onLogout: () => void, onNavigate: (t: string) => void, onResetDemo: () => void }) => {
    return (
        <header className="flex justify-between items-center mb-8 relative z-20">
            <div 
                onClick={onResetDemo}
                className="md:hidden flex items-center gap-2 cursor-pointer active:scale-95 group transition-transform"
            >
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-purple-600 rounded-lg flex items-center justify-center font-bold text-black text-xs group-active:shadow-neon">SI</div>
                <span className="font-bold text-lg tracking-tighter">stand<span className="text-teal-400">In</span>.</span>
            </div>
            <div className="hidden md:block"><h2 className="text-gray-500 text-sm font-bold uppercase tracking-wider font-mono bg-white/5 px-3 py-1 rounded-full border border-white/5 inline-block">{activeTab.replace('-', ' ')}</h2></div>
            <div className="flex items-center gap-4">
                {IS_DEMO_MODE && <button onClick={onToggleRole} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-gray-400 hover:bg-white/5 hover:text-white transition-colors glass-panel"><Users size={12} />SWITCH ROLE</button>}
                {user.role === 'SCHOOL' && <button onClick={onOpenScanner} className="p-3 glass-panel rounded-full hover:bg-white hover:text-black transition-colors group"><ScanLine size={18} className="group-hover:scale-110 transition-transform" /></button>}
                
                <button 
                    onClick={() => onNavigate('settings')} 
                    className={`p-3 glass-panel rounded-full transition-colors ${activeTab === 'settings' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
                >
                    <Settings size={18} />
                </button>

                <button className="p-3 glass-panel rounded-full hover:bg-white hover:text-black transition-colors relative"><Bell size={18} /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span></button>
                <div className="md:hidden" onClick={onLogout}><LogOut size={18} className="text-gray-500" /></div>
            </div>
        </header>
    );
};

export const MobileNavigation = ({ activeTab, setActiveTab, userRole }: { activeTab: string, setActiveTab: (t: string) => void, userRole: UserRole }) => {
    const trainerItems = [
        { id: 'radar-home', label: 'Radar', icon: Target },
        { id: 'cockpit', label: 'Home', icon: LayoutGrid },
        { id: 'schedule', label: 'Plan', icon: CalendarDays }, 
        { id: 'find-jobs', label: 'Jobs', icon: Search },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'wallet', label: 'Wallet', icon: Wallet },
        { id: 'profile', label: 'Me', icon: User },
    ];
    const schoolItems = [
        { id: 'ai-home', label: 'AI', icon: Sparkles },
        { id: 'dashboard', label: 'Home', icon: LayoutGrid },
        { id: 'schedule', label: 'Plan', icon: CalendarDays },
        { id: 'post-job', label: 'Post', icon: Plus },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'myspace', label: 'Studio', icon: Building },
    ];
    const items = userRole === 'TRAINER' ? trainerItems : schoolItems;

    return (
        <div className="fixed bottom-0 left-0 right-0 glass-panel-highlight border-t border-white/5 pt-1.5 pb-[env(safe-area-inset-bottom)] md:hidden z-[100] flex overflow-x-auto no-scrollbar justify-between px-2 shadow-2xl bg-black/80 backdrop-blur-xl">
            {items.map(item => (
                <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)} 
                    className={`flex flex-col items-center justify-start pt-1 gap-0.5 rounded-xl transition-all min-w-[14%] flex-1 ${activeTab === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <div className={`relative p-1 rounded-lg transition-all duration-300 ${activeTab === item.id ? '-translate-y-1' : ''}`}>
                        <item.icon 
                            size={20} 
                            strokeWidth={activeTab === item.id ? 2.5 : 1.5} 
                            className={`transition-colors ${activeTab === item.id ? 'text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]' : 'text-current'}`} 
                        />
                         {activeTab === item.id && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full"></div>}
                    </div>
                    <span className={`text-[9px] font-medium leading-none pb-1 ${activeTab === item.id ? 'opacity-100 font-bold' : 'opacity-70'}`}>{item.label}</span>
                </button>
            ))}
        </div>
    );
};
