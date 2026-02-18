
import React, { useState, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { UserProfile, Job, RegularClass } from '../types';
import { Sidebar, Header, MobileNavigation } from '../layout/Navigation';
import { useStudioData } from '../hooks/useStudioData';
import { SchoolCockpit } from '../views/Dashboard'; 
import { JobPostingWizard } from '../views/JobWizard';
import { SmartScheduleView } from '../views/Calendars'; 
import { FinanceView } from '../views/Finance';
import { SchoolProfileView } from '../views/MySpace';
import { SchoolTeamView } from '../views/Team';
import { SchoolAIView } from '../views/Landing';
import { MarketplaceView } from '../views/Marketplace';
import { MessagingView } from '../views/Messaging';
import { ReviewModal } from '../components/TrustSystem';
import { supabase } from '../supabaseClient';

export const StudioEngine = ({ user, onLogout, onToggleRole }: { user: UserProfile, onLogout: () => void, onToggleRole: () => void }) => {
    const [activeTab, setActiveTab] = useState('ai-home');
    const [marketplaceSubTab, setMarketplaceSubTab] = useState<'DISCOVER' | 'SPACES' | 'CREATOR' | 'TOUR' | 'COMMUNITY'>('DISCOVER');
    const { myJobs, incomingApplications, classes, refresh } = useStudioData(user.id);
    const [draftJob, setDraftJob] = useState<RegularClass | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [ratingJob, setRatingJob] = useState<Job | null>(null);

    const showNotification = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(null), 4000); };

    const handleCreateJob = async (jobData: Partial<Job>) => {
        try {
            const payload = {
                creator_id: user.id, title: jobData.title, category: jobData.category,
                urgency: jobData.urgency || 'STANDARD', date_label: jobData.date || 'Heute',
                time_start: jobData.timeStart, time_end: jobData.timeEnd, fee: jobData.fee,
                total_fee: jobData.totalFee, location_text: jobData.location,
                description: jobData.description, status: 'OPEN',
                studio_name: user.studioName || user.name, class_id: jobData.classId
            };
            const { error } = await supabase.from('jobs').insert([payload]);
            if (error) throw error;
            refresh();
            showNotification('Job veröffentlicht! 📡');
            setActiveTab('dashboard');
        } catch (err) { showNotification('Fehler.'); }
    };

    const handleConfirmTrainer = async (jobId: string, trainerId: string) => {
        try {
            await supabase.from('jobs').update({ status: 'ACCEPTED', assignee_id: trainerId }).eq('id', jobId);
            await supabase.from('job_applications').update({ status: 'ACCEPTED' }).eq('job_id', jobId).eq('trainer_id', trainerId);
            refresh();
            showNotification('Trainer bestätigt! ✅');
        } catch (err) { showNotification('Fehler.'); }
    };

    const handleCheckIn = async (jobId: string) => {
        try {
            await supabase.from('jobs').update({ status: 'CHECKED_IN' }).eq('id', jobId);
            refresh();
            showNotification('Check-In bestätigt! 🕒');
        } catch (err) { showNotification('Fehler.'); }
    };

    const handlePay = async (jobId: string) => {
        try {
            await supabase.from('jobs').update({ status: 'COMPLETED', payout_status: 'released' }).eq('id', jobId);
            refresh();
            showNotification('Gage ausgezahlt! 💸');
        } catch (err) { showNotification('Fehler.'); }
    };

    const handleRateTrainer = async (rating: number, comment: string) => {
        if (!ratingJob) return;
        try {
            await supabase.from('reviews').insert([{
                job_id: ratingJob.id,
                author_id: user.id,
                target_id: ratingJob.assigneeId,
                rating,
                comment
            }]);
            await supabase.from('jobs').update({ creator_rated: true }).eq('id', ratingJob.id);
            setRatingJob(null);
            refresh();
            showNotification('Feedback gesendet! ⭐');
        } catch (err) { showNotification('Fehler.'); }
    };

    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-black">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole="SCHOOL" onLogout={onLogout} onResetDemo={() => {}} />
            <main className="md:ml-64 p-4 md:p-10 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-24 min-h-screen relative overflow-x-hidden">
                <Header user={user} onToggleRole={onToggleRole} onOpenScanner={() => {}} activeTab={activeTab} onLogout={onLogout} onNavigate={setActiveTab} onResetDemo={() => {}} />
                
                {activeTab === 'ai-home' && <SchoolAIView onManualPost={() => setActiveTab('post-job')} />}
                {activeTab === 'dashboard' && (
                    <SchoolCockpit 
                        myJobs={myJobs} 
                        applications={incomingApplications} 
                        onConfirmTrainer={handleConfirmTrainer} 
                        onCheckIn={handleCheckIn} 
                        onPay={handlePay} 
                        onTrack={() => {}} 
                        onOpenRadarControl={() => {}} 
                        onRateTrainer={setRatingJob}
                        assigneeStripeStatus={true} 
                    />
                )}
                {activeTab === 'messages' && <MessagingView user={user} jobs={myJobs} />}
                {activeTab === 'schedule' && <SmartScheduleView classes={classes} jobs={myJobs} onQuickPost={(cls) => { setDraftJob(cls); setActiveTab('post-job'); }} onUpdateClass={() => {}} onCreateClass={() => {}} onOfferSpaces={() => {}} onShowNotification={showNotification} onOpenImport={() => {}} />}
                {activeTab === 'post-job' && <JobPostingWizard onPublish={handleCreateJob} onCancel={() => setActiveTab('dashboard')} initialData={draftJob} />}
                {activeTab === 'finances' && <FinanceView user={user} onOpenInvoice={() => {}} />}
                {activeTab === 'myspace' && <SchoolProfileView user={user} onUpdateProfile={() => {}} />}
                {activeTab === 'team' && <SchoolTeamView setActiveStory={() => {}} />}
                {activeTab === 'marketplace' && <MarketplaceView activeTab={marketplaceSubTab} setActiveTab={setMarketplaceSubTab} userRole="SCHOOL" offeredSpaces={[]} onOpenCreator={() => {}} onOpenTourWizard={() => {}} onQuickCreate={() => {}} />}

            </main>
            <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} userRole="SCHOOL" />
            {notification && <div className="fixed bottom-24 right-4 glass-panel-highlight text-white px-6 py-4 rounded-xl z-[100] animate-fade-in flex items-center gap-3 border border-teal-500/20"><CheckCircle2 className="text-teal-400" /><span>{notification}</span></div>}
            {ratingJob && (
                <ReviewModal 
                    jobTitle={ratingJob.title} 
                    targetName="Trainer" 
                    onClose={() => setRatingJob(null)} 
                    onSubmit={handleRateTrainer}
                />
            )}
        </div>
    );
};
