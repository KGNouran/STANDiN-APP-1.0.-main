
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Job, UserProfile, RegularClass, JobStatus, JobApplication, JobCategory } from '../types';

export const useStudioData = (schoolId: string) => {
    const [myJobs, setMyJobs] = useState<Job[]>([]);
    const [incomingApplications, setIncomingApplications] = useState<any[]>([]);
    const [classes, setClasses] = useState<RegularClass[]>([]);
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
            // Fetch My Jobs
            const { data: jobsData } = await supabase.from('jobs').select('*').eq('creator_id', schoolId).order('created_at', { ascending: false });
            if (jobsData) {
                setMyJobs(jobsData.map(dbJob => ({
                    id: dbJob.id, creatorId: dbJob.creator_id, assigneeId: dbJob.assignee_id,
                    title: dbJob.title || 'Untitled', studioName: dbJob.studio_name || 'Academy',
                    category: dbJob.category || inferCategory(dbJob.title), urgency: dbJob.urgency || 'STANDARD',
                    date: dbJob.date_label || 'Heute', timeStart: dbJob.time_start?.slice(0, 5) || '00:00',
                    timeEnd: dbJob.time_end?.slice(0, 5) || '00:00', fee: dbJob.fee || 0,
                    totalFee: dbJob.total_fee || 0, location: dbJob.location_text || 'Berlin', 
                    status: (dbJob.status as JobStatus) || 'OPEN', 
                    payout_status: dbJob.payout_status,
                    creatorRated: dbJob.creator_rated,
                    assigneeRated: dbJob.assignee_rated,
                    createdAt: new Date(dbJob.created_at || Date.now()).getTime(),
                    applicant_count: dbJob.applicant_count || 0, classId: dbJob.class_id
                } as Job)));
            }

            // Fetch Applications with FULL profile data
            const { data: appsData, error: appsError } = await supabase
                .from('job_applications')
                .select('*, users(*)');
            
            if (appsError) throw appsError;
            
            if (appsData) {
                setIncomingApplications(appsData.map(app => ({
                    id: app.id,
                    jobId: app.job_id,
                    trainerId: app.trainer_id,
                    status: app.status,
                    message: app.message,
                    createdAt: new Date(app.created_at).getTime(),
                    trainerProfile: app.users ? {
                        id: app.users.id,
                        name: app.users.name,
                        avatarInitials: app.users.avatar_initials || app.users.name?.substring(0,2).toUpperCase(),
                        bio: app.users.bio,
                        skills: app.users.styles || [],
                        is_verified: app.users.is_verified,
                        social_instagram: app.users.social_instagram,
                        social_website: app.users.social_website,
                        sedcard: {
                            gallery: app.users.video_urls || []
                        },
                        trustScore: 78, // Fallback for demo
                        reliability: 100
                    } as UserProfile : undefined
                })));
            }

            // Fetch Inventory
            const { data: classData } = await supabase.from('classes').select('*').order('day_of_week', { ascending: true });
            if (classData) setClasses(classData.map(c => ({ id: c.id, day: c.day_label || 'Mo', timeStart: c.time_start?.slice(0,5) || '00:00', timeEnd: c.time_end?.slice(0,5) || '00:00', title: c.title, category: c.category || inferCategory(c.title), room: c.room_name || 'Studio 1', regularTeacher: c.teacher_name || 'Unbekannt', baseFee: c.base_fee || 40 })));

        } catch (err) { console.error("Studio Data Fetch Error:", err); }
        finally { setIsLoading(false); }
    }, [schoolId]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    return { myJobs, incomingApplications, classes, isLoading, refresh: fetchAll };
};
