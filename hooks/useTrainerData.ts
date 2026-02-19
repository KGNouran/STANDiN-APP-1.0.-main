
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Job, UserProfile, RegularClass, Review, JobStatus, JobApplication, JobCategory } from '../types';
import { MOCK_TRAINER, MOCK_TRAINER_REGULARS } from '../constants';

export const useTrainerData = (baseTrainer: UserProfile) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [myApplications, setMyApplications] = useState<JobApplication[]>([]);
    const [availability, setAvailability] = useState<Set<string>>(new Set());
    const [regularClasses] = useState<RegularClass[]>(MOCK_TRAINER_REGULARS);
    const [isLoading, setIsLoading] = useState(false);

    const inferCategory = (title: string): JobCategory => {
        if (!title) return 'DANCE';
        const t = title.toLowerCase();
        if (t.includes('yoga') || t.includes('pilates') || t.includes('meditation')) return 'BODY_MIND';
        return 'DANCE';
    };

    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetch Jobs
            const { data: jobsData } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
            if (jobsData) {
                setJobs(jobsData.map(dbJob => ({
                    id: dbJob.id, creatorId: dbJob.creator_id, assigneeId: dbJob.assignee_id,
                    title: dbJob.title || 'Untitled', studioName: dbJob.studio_name || 'Academy',
                    category: dbJob.category || inferCategory(dbJob.title), urgency: dbJob.urgency || 'STANDARD',
                    date: dbJob.date_label || 'Heute', timeStart: dbJob.time_start?.slice(0, 5) || '00:00',
                    timeEnd: dbJob.time_end?.slice(0, 5) || '00:00', fee: dbJob.fee || 0, 
                    totalFee: dbJob.total_fee || 0, salary: dbJob.salary || 0, 
                    location: dbJob.location_text || 'Berlin', status: (dbJob.status as JobStatus) || 'OPEN',
                    payout_status: dbJob.payout_status,
                    creatorRated: dbJob.creator_rated,
                    assigneeRated: dbJob.assignee_rated,
                    createdAt: new Date(dbJob.created_at || Date.now()).getTime()
                } as Job)));
            }

            // Fetch My Applications
            const { data: appsData } = await supabase.from('job_applications').select('*').eq('trainer_id', baseTrainer.id);
            if (appsData) setMyApplications(appsData);

            // Fetch Profile for Availability (Radar Slots)
            const { data: profile } = await supabase.from('users').select('radar_slots',).eq('id', baseTrainer.id).single();
            if (profile?.radar_slots) setAvailability(new Set(profile.radar_slots));

        } catch (err) { console.error("Trainer Data Fetch Error:", err); }
        finally { setIsLoading(false); }
    }, [baseTrainer.id]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    return { jobs, myApplications, availability, regularClasses, isLoading, refresh: fetchAll, setAvailability };
};
