
import React, { useState, useMemo } from 'react';
import { Power, CheckCircle2 } from 'lucide-react';
import { UserProfile, Job, Story } from '../types';
import { Sidebar, Header, MobileNavigation } from '../layout/Navigation';
import { useTrainerData } from '../hooks/useTrainerData';
import { TrainerCockpit } from '../views/Dashboard'; 
import { JobMarketplace, MarketplaceView } from '../views/Marketplace';
import { SmartCalendarView } from '../views/Calendars'; 
import { TrainerWalletView } from '../views/Finance';
import { MySpaceView } from '../views/MySpace';
import { MessagingView } from '../views/Messaging';
import { StoryViewer, LiveTrackingModal } from '../components/Modals';
import { ReviewModal } from '../components/TrustSystem';
import { supabase } from '../supabaseClient';

export const TrainerEngine = ({ user, onLogout, onToggleRole }: { user: UserProfile, onLogout: () => void, onToggleRole: () => void }) => {
    const [activeTab, setActiveTab] = useState('radar-home');
    const [marketplaceSubTab, setMarketplaceSubTab] = useState<'DISCOVER' | 'SPACES' | 'CREATOR' | 'TOUR' | 'COMMUNITY'>('DISCOVER');
    const { jobs, availability, regularClasses, refresh, setAvailability } = useTrainerData(user);
    
    // UI State
    const [isScanning, setIsScanning] = useState(false);
    const [isRadarActive, setIsRadarActive] = useState(false);
    const [activeStory, setActiveStory] = useState<Story | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [ratingJob, setRatingJob] = useState<Job | null>(null);

    const showNotification = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(null), 4000); };

    /**
     * CORE MATCHING LOGIC
     */
    const isJobMatching = (job: Job): boolean => {
        if (job.status === 'APPLIED') return true; 
        if (job.status !== 'OPEN') return false;

        const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        let jobDay = job.date;
        if (job.date === 'Heute') {
            jobDay = days[new Date().getDay()];
        } else if (job.date.includes('.')) {
            jobDay = days[new Date().getDay()]; 
        } else {
            jobDay = job.date.substring(0, 2); 
        }

        const jobHour = job.timeStart.split(':')[0];
        const availabilityKey = `${jobDay}-${jobHour}`;
        
        const hasAvailability = availability.has(availabilityKey);
        if (!hasAvailability) return false;

        const trainerSkillsLower = (user.skills || []).map(s => s.toLowerCase());
        const jobCategoryMatch = trainerSkillsLower.includes(job.category.toLowerCase());
        const jobTitleMatch = trainerSkillsLower.some(skill => job.title.toLowerCase().includes(skill));
        
        return jobCategoryMatch || jobTitleMatch;
    };

    const openJobs = useMemo(() => {
        return jobs.filter(j => isJobMatching(j));
    }, [jobs, availability, user.skills]);

    const myGigs = useMemo(() => jobs.filter(j => j.assigneeId === user.id && j.status !== 'COMPLETED'), [jobs, user.id]);
    const earnings = useMemo(() => jobs.filter(j => j.assigneeId === user.id && j.status === 'COMPLETED').reduce((acc, j) => acc + (j.salary || j.totalFee || 0), 0), [jobs, user.id]);

    const handleApply = async (job: Job) => {
        try {
            await supabase.from('job_applications').insert([{ job_id: job.id, trainer_id: user.id, status: 'PENDING' }]);
            await supabase.from('jobs').update({ status: 'APPLIED' }).eq('id', job.id);
            refresh();
            showNotification('Bewerbung gesendet! 📡');
        } catch (err) { showNotification('Fehler.'); }
    };

    const handleToggleAvailability = async (day: string, hour: number) => {
        const key = `${day}-${hour.toString().padStart(2, '0')}`;
        const nextSet = new Set(availability);
        if (nextSet.has(key)) nextSet.delete(key); else nextSet.add(key);
        try {
            setAvailability(nextSet);
            await supabase.from('users').update({ radar_slots: Array.from(nextSet) }).eq('id', user.id);
        } catch (err) { console.error(err); }
    };

    const handleSubmitReview = async (rating: number, comment: string) => {
        if (!ratingJob) return;
        try {
            await supabase.from('reviews').insert([{
                job_id: ratingJob.id,
                author_id: user.id,
                target_id: ratingJob.creatorId,
                rating,
                comment
            }]);
            await supabase.from('jobs').update({ assignee_rated: true }).eq('id', ratingJob.id);
            setRatingJob(null);
            refresh();
            showNotification('Bewertung gespeichert! ⭐');
        } catch (err) { showNotification('Fehler.'); }
    };

    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-black">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole="TRAINER" onLogout={onLogout} onResetDemo={() => {}} />
            <main className="md:ml-64 p-4 md:p-10 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-24 min-h-screen relative overflow-x-hidden">
                <Header user={user} onToggleRole={onToggleRole} onOpenScanner={() => {}} activeTab={activeTab} onLogout={onLogout} onNavigate={setActiveTab} onResetDemo={() => {}} />
                
                {activeTab === 'radar-home' && (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                        <div className="mb-16 space-y-4 animate-fade-in">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
                                Ready for a<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">New Mission?</span>
                            </h1>
                            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                                Starte den Echtzeit-Scan für verfügbare Gigs
                            </p>
                        </div>

                        <button onClick={() => { setIsScanning(true); setTimeout(() => { setIsScanning(false); setIsRadarActive(true); }, 1500); }} className="w-56 h-56 rounded-full border border-white/5 flex flex-col items-center justify-center bg-white/5 relative group transition-all hover:border-teal-500/30 hover:bg-white/[0.08]">
                            {isScanning && <div className="absolute inset-[-10px] rounded-full border-2 border-teal-500 border-t-transparent animate-spin"></div>}
                            <Power size={64} className={`relative z-10 transition-all duration-500 ${isRadarActive ? 'text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)] scale-110' : 'text-gray-700'}`} />
                        </button>
                        
                        {isRadarActive && openJobs.length > 0 && (
                            <button onClick={() => setActiveTab('find-jobs')} className="mt-16 px-12 py-5 bg-white text-black font-black rounded-3xl animate-bounce-up uppercase tracking-widest text-xs hover:bg-teal-400 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                Radar Treffer ({openJobs.length})
                            </button>
                        )}
                    </div>
                )}

                {activeTab === 'cockpit' && <TrainerCockpit user={user} myJobs={jobs} dynamicEarnings={earnings} onNavigate={setActiveTab} onShowNotification={showNotification} onCancelJob={() => {}} onCreateEvent={() => {}} onOpenPreview={() => {}} onOpenManager={() => {}} onRateStudio={setRatingJob} />}
                {activeTab === 'messages' && <MessagingView user={user} jobs={jobs} />}
                {activeTab === 'find-jobs' && <JobMarketplace jobs={openJobs} onAccept={handleApply} />}
                {activeTab === 'schedule' && <SmartCalendarView jobs={myGigs} regularClasses={regularClasses} availability={availability} onToggleAvailability={handleToggleAvailability} />}
                {activeTab === 'wallet' && <TrainerWalletView user={{...user, balance: earnings}} onUpdateProfile={() => {}} completedJobs={jobs.filter(j => j.status === 'COMPLETED')} />}
                {activeTab === 'profile' && <MySpaceView user={user} onUpdateProfile={() => {}} />}
                {activeTab === 'marketplace' && <MarketplaceView activeTab={marketplaceSubTab} setActiveTab={setMarketplaceSubTab} userRole="TRAINER" offeredSpaces={[]} onOpenCreator={() => {}} onOpenTourWizard={() => {}} onQuickCreate={() => {}} />}
                {activeTab === 'settings' && <div className="p-20 text-center text-gray-500">Settings inside Trainer Engine.</div>}

            </main>
            <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} userRole="TRAINER" />
            {notification && <div className="fixed bottom-24 right-4 glass-panel-highlight text-white px-6 py-4 rounded-xl z-[100] animate-fade-in flex items-center gap-3 border border-teal-500/20"><CheckCircle2 className="text-teal-400" /><span>{notification}</span></div>}
            {activeStory && <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />}
            {ratingJob && (
                <ReviewModal 
                    jobTitle={ratingJob.title} 
                    targetName={ratingJob.studioName} 
                    onClose={() => setRatingJob(null)} 
                    onSubmit={handleSubmitReview}
                />
            )}
        </div>
    );
};
