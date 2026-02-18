
export type UrgencyLevel = 'STANDARD' | 'SOS_LEVEL_1' | 'SOS_LEVEL_2' | 'SOS_LEVEL_3';
export type JobCategory = 'DANCE' | 'BODY_MIND' | 'EVENTS_FASHION' | 'MUSIC_VOICE';
export type JobStatus = 'OPEN' | 'APPLIED' | 'ACCEPTED' | 'CHECKED_IN' | 'COMPLETED' | 'DISPUTED' | 'CANCELED';
export type UserRole = 'TRAINER' | 'SCHOOL' | 'SCOUT';
export type MarketplaceType = 'WORKSHOP' | 'AUDITION' | 'SPACE' | 'BROADCAST';
export type TrustLevel = 'NEWBIE' | 'VERIFIED' | 'ELITE' | 'LEGEND';

export interface Review {
    id: string;
    jobId: string;
    authorId: string;
    targetId: string;
    rating: number;
    comment: string;
    createdAt: number;
    isVisible: boolean; 
}

export interface Job {
  id: string;
  type?: 'JOB' | 'AUDITION';
  creatorId: string; 
  assigneeId?: string; 
  classId?: string; // New: For matching with schedule classes
  title: string;
  studioName: string;
  category: JobCategory;
  urgency: UrgencyLevel;
  date: string;
  timeStart: string;
  timeEnd: string;
  fee: number; 
  totalFee: number; 
  salary?: number;
  location: string;
  description: string;
  status: JobStatus;
  payout_status?: 'initiated' | 'released' | 'pending';
  isExclusive?: boolean; 
  createdAt: number;
  creatorRated?: boolean;
  assigneeRated?: boolean;
  regularTeacher?: string;
  isInternalOnly?: boolean;
  application_link?: string;
  applicant_count?: number; // New: For visualizing interest
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  balance: number;
  avatarInitials: string;
  studioName?: string;
  companyName?: string; 
  vatId?: string;
  billingAddress?: string;
  invoiceEmail?: string;
  amenities?: string[]; 
  defaultArrivalMinutes?: number; 
  openInvoices?: number;
  wifiSsid?: string;
  wifiPass?: string;
  emergencyContact?: { name: string; phone: string; };
  accessInfo?: string;
  studioRules?: string[];
  is_verified?: boolean;
  profileQuality?: number; 
  location?: string;
  skills?: string[];
  bio?: string;
  phone?: string;
  whatsapp_alerts_enabled?: boolean;
  social_instagram?: string; 
  social_website?: string;   
  socials?: { instagram?: string; tiktok?: string; website?: string; };
  rating?: number;
  reviewCount?: number;
  reliability?: number; 
  hourlyRate?: number;
  yearsExperience?: number;
  trustLevel: TrustLevel;
  trustScore: number; 
  verificationLevel?: 1 | 2; 
  taxId?: string; 
  isSmallBusiness?: boolean; 
  iban?: string;
  legalAddress?: string;
  isResidentOf?: string; 
  inviteCode?: string;
  stripe_account_id?: string;
  sedcard?: {
    height?: number; 
    eyes?: string;
    hair?: string;
    size?: string; 
    gallery?: string[];
  };
}

export interface JobApplication {
  id: string;
  jobId: string;
  trainerId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  message?: string;
  createdAt: number;
}

// Added missing interface for applications with trainer profiles
export interface JobApplicationWithProfile extends JobApplication {
  trainerProfile?: UserProfile;
}

export interface MarketplaceItem {
  id: string;
  type: MarketplaceType;
  title: string;
  organizer: string;
  dateOrDeadline: string;
  price?: string;
  location: string;
  imageGradient: string; 
  tags: string[];
}

export interface RegularClass {
  id: string;
  creatorId?: string;
  day: string; 
  timeStart: string;
  timeEnd: string;
  title: string;
  category: JobCategory;
  room: string;
  regularTeacher: string;
  baseFee: number;
  residentStatus?: 'CONFIRMED' | 'AWAY' | 'PENDING';
  isSearchingSub?: boolean;
}

export interface Story {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  gradient: string; 
  caption: string;
  timestamp: string;
  videoUrl?: string; 
}

export interface OwnClass {
    id: string;
    title: string;
    description?: string;
    roomName: string;
    date: string;
    time: string;
    ticketPrice: number;
    ticketsSold: number;
    capacity: number;
    revenue: number;
    status: 'UPCOMING' | 'COMPLETED';
    theme?: 'NEON' | 'CLEAN' | 'GLITCH' | 'ZEN';
    short_link?: string;
    hostName?: string;
}

export interface Friend {
    id: string;
    name: string;
    initials: string;
    style: string;
    rating: number;
    isOnline: boolean;
}

export interface RentalSpace {
    id: string;
    name: string;
    location: string;
    city: string;
    capacity: number;
    pricePerHour: number;
    amenities: string[];
    imageGradient: string;
}

// Added missing interface for rental slots in the marketplace
export interface OfferedSpace {
    key: string;
    day: string;
    hour: number;
    pricePerHour?: number;
}
