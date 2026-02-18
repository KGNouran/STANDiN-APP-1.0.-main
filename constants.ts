
import { Job, UserProfile, MarketplaceItem, RegularClass, Story, OwnClass, Friend, RentalSpace } from './types';
import { GAME_RULES } from './gameRules';

export const IS_DEMO_MODE = true;

// Statische UUIDs für Mocks - Aktualisiert auf den spezifischen Test-User '7b9e6f3d-8a5c-4d32-9f1e-3b2a6c1d5e4f'
const UUID_TRAINER = '7b9e6f3d-8a5c-4d32-9f1e-3b2a6c1d5e4f';
const UUID_SCHOOL_1 = 'd2f4e6c8-a0b2-4c4d-8e6f-1a3b5c7d9e0f';
const UUID_SCHOOL_2 = 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';
const UUID_SCHOOL_3 = 'f1e2d3c4-b5a6-4098-9765-43210fedcba9';

export const TRUST_LEVELS = {
    NEWBIE: { ...GAME_RULES.TRUST.TIERS.NEWBIE, color: 'text-gray-400', border: 'border-gray-500' },
    VERIFIED: { ...GAME_RULES.TRUST.TIERS.VERIFIED, color: 'text-teal-400', border: 'border-teal-500' },
    ELITE: { ...GAME_RULES.TRUST.TIERS.ELITE, color: 'text-purple-400', border: 'border-purple-500' },
    LEGEND: { ...GAME_RULES.TRUST.TIERS.LEGEND, color: 'text-yellow-400', border: 'border-yellow-500' }
};

export const MOCK_TRAINER: UserProfile = {
  id: UUID_TRAINER,
  name: "Urban",
  role: 'TRAINER',
  balance: 0.00, // Wird jetzt dynamisch berechnet
  avatarInitials: "UR",
  is_verified: true,
  profileQuality: 85,
  location: "Berlin",
  rating: 4.8,
  reviewCount: 12,
  skills: ['Hip Hop', 'Commercial', 'House'],
  bio: "Professioneller Tänzer und Choreograf mit Fokus auf Urban Styles.",
  trustLevel: 'VERIFIED',
  trustScore: 72,
  verificationLevel: 1,
  isSmallBusiness: true,
  legalAddress: "Berlin"
};

export const MOCK_SCHOOL: UserProfile = {
  id: UUID_SCHOOL_1,
  name: "Urban Dance Academy",
  role: 'SCHOOL',
  balance: -450.00,
  avatarInitials: "UD",
  studioName: "Urban Dance Academy Berlin",
  location: "Berlin",
  is_verified: true,
  trustLevel: 'ELITE',
  trustScore: 94,
  amenities: ['Wifi', 'Sound', 'Mirror', 'AC'],
  defaultArrivalMinutes: 15,
  invoiceEmail: 'billing@uda-berlin.com',
  companyName: 'UDA Berlin GmbH',
  billingAddress: 'Musterstr. 12, 10115 Berlin',
  vatId: 'DE 123 456 789',
  wifiSsid: 'UDA_GUEST',
  wifiPass: 'dance2025!',
  emergencyContact: { name: 'Klaus (Hauswart)', phone: '+49 170 1234567' },
  accessInfo: 'Hinterhof, Aufgang B, 2. Stock. Schlüsselbox Code: 1234',
  studioRules: ['Keine Straßenschuhe', 'Musik nach 22 Uhr leiser', 'Licht aus beim Verlassen']
};

export const MOCK_TRAINER_REGULARS: RegularClass[] = [
    { id: '11111111-1111-4111-a111-111111111111', day: 'Mo', timeStart: '18:30', timeEnd: '20:00', title: 'Commercial Open', category: 'DANCE', room: 'Studio 1', regularTeacher: 'Urban', baseFee: 75 },
    { id: '22222222-2222-4222-a222-222222222222', day: 'Mi', timeStart: '19:30', timeEnd: '21:00', title: 'Hip Hop Adv', category: 'DANCE', room: 'Studio 1', regularTeacher: 'Urban', baseFee: 85 },
    { id: '33333333-3333-4333-a333-333333333333', day: 'Fr', timeStart: '18:00', timeEnd: '19:30', title: 'House Dance', category: 'DANCE', room: 'Studio 2', regularTeacher: 'Urban', baseFee: 75 },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'a0000000-0000-4000-b000-000000000001',
    creatorId: UUID_SCHOOL_1,
    title: 'Hip Hop Vertretung',
    studioName: 'Urban Dance Academy',
    category: 'DANCE',
    urgency: 'SOS_LEVEL_2',
    date: 'Heute',
    timeStart: '18:00',
    timeEnd: '19:30',
    fee: 85,
    totalFee: 127.50,
    location: 'Berlin',
    description: 'Advanced Level.',
    status: 'OPEN',
    createdAt: Date.now()
  }
];

export const MOCK_SCHEDULE: RegularClass[] = [
  { id: 'b1111111-1111-4111-a111-111111111111', day: 'Mo', timeStart: '09:00', timeEnd: '10:30', title: 'Morning Yoga', category: 'BODY_MIND', room: 'Studio 2', regularTeacher: 'Elena', baseFee: 45 },
  { id: 'b2222222-2222-4222-a222-222222222222', day: 'Mo', timeStart: '17:00', timeEnd: '18:30', title: 'Hip Hop Kids', category: 'DANCE', room: 'Studio 1', regularTeacher: 'Sarah', baseFee: 50 },
  { id: 'b3333333-3333-4333-a333-333333333333', day: 'Di', timeStart: '10:00', timeEnd: '11:30', title: 'Pilates Flow', category: 'BODY_MIND', room: 'Studio 2', regularTeacher: 'Julia', baseFee: 40 },
  { id: 'b4444444-4444-4444-a444-444444444444', day: 'Di', timeStart: '17:30', timeEnd: '19:00', title: 'Ballet Basics', category: 'DANCE', room: 'Studio 1', regularTeacher: 'Anna', baseFee: 60 }
];

export const MOCK_OWN_CLASSES: OwnClass[] = [
    {
        id: 'c1111111-1111-4111-a111-111111111111',
        title: 'Morning Yoga Flow',
        roomName: 'Zen Space Mitte',
        date: 'Mi, 14.12.',
        time: '09:00 - 10:30',
        ticketPrice: 15,
        ticketsSold: 8,
        capacity: 20,
        revenue: 120,
        status: 'UPCOMING',
        hostName: 'Urban',
        theme: 'ZEN'
    }
];

export const MOCK_STORIES: Story[] = [
    { id: 's1111111-1111-4111-a111-111111111111', trainerId: UUID_TRAINER, trainerName: 'Urban', trainerAvatar: 'UR', gradient: 'from-purple-500 to-pink-500', caption: 'Freestyle Session 🔥', timestamp: '2h ago' },
    { id: 's2222222-2222-4222-a222-222222222222', trainerId: 'e2e2e2e2-e2e2-4e2e-a2e2-e2e2e2e2e2e2', trainerName: 'Sarah', trainerAvatar: 'SM', gradient: 'from-teal-400 to-blue-500', caption: 'New Choreo dropping!', timestamp: '4h ago' }
];

export const MOCK_MARKETPLACE_ITEMS: MarketplaceItem[] = [
    {
        id: 'm1111111-1111-4111-a111-111111111111',
        type: 'WORKSHOP',
        title: 'Heels Masterclass with Brianna',
        organizer: 'Flying Steps Academy',
        dateOrDeadline: '15. Jan 2025',
        price: '€35.00',
        location: 'Berlin Mitte',
        imageGradient: 'from-pink-600 to-indigo-900',
        tags: ['Heels', 'Advanced']
    }
];

export const MOCK_FRIENDS: Friend[] = [
    { id: 'f1111111-1111-4111-a111-111111111111', name: 'Sarah Miller', initials: 'SM', style: 'Hip Hop', rating: 4.9, isOnline: true },
    { id: 'f2222222-2222-4222-a222-222222222222', name: 'Mike Thompson', initials: 'MT', style: 'Contemporary', rating: 4.7, isOnline: false }
];

export const RESIDENTS = [
    { id: 'r1111111-1111-4111-a111-111111111111', name: 'Sarah Miller', style: 'Hip Hop Kids', avatar: 'SM', status: 'Active' },
    { id: 'r2222222-2222-4222-a222-222222222222', name: 'Mike Johnson', style: 'Fitness & Box', avatar: 'MJ', status: 'Active' },
    { id: 'r3333333-3333-4333-a333-333333333333', name: 'Anna Lee', style: 'Ballet Basics', avatar: 'AL', status: 'On Leave' },
];

export const MOCK_CONVERSATIONS = [
    {
        id: 'cc111111-1111-4111-a111-111111111111',
        name: 'Urban Dance Academy',
        avatar: 'UD',
        lastMessage: 'Vielen Dank für den Einsatz heute!',
        time: '14:02',
        isOnline: true,
        unread: 1,
        messages: [
            { id: 'msg11111-1111-4111-a111-111111111111', senderId: UUID_SCHOOL_1, text: 'Hey Urban, danke dass du so spontan einspringen konntest! 🙏', timestamp: '13:45', isMe: false },
            { id: 'msg22222-2222-4222-a222-222222222222', senderId: UUID_TRAINER, text: 'Gerne! Bin in 10 Minuten da. 🚀', timestamp: '13:50', isMe: true },
            { id: 'msg33333-3333-4333-a333-333333333333', senderId: UUID_SCHOOL_1, text: 'Super, der Code für die Tür ist 4711.', timestamp: '13:52', isMe: false },
            { id: 'msg44444-4444-4444-a444-444444444444', senderId: UUID_SCHOOL_1, text: 'Vielen Dank für den Einsatz heute!', timestamp: '14:02', isMe: false },
        ]
    },
    {
        id: 'cc222222-2222-4222-a222-222222222222',
        name: 'Sarah Miller',
        avatar: 'SA',
        lastMessage: 'Kannst du nächsten Dienstag übernehmen?',
        time: 'Gestern',
        isOnline: false,
        unread: 0,
        messages: [
            { id: 'msg55555-5555-4555-a555-555555555555', senderId: 'e2e2e2e2-e2e2-4e2e-a2e2-e2e2e2e2e2e2', text: 'Hey! Kannst du nächsten Dienstag übernehmen?', timestamp: 'Gestern', isMe: false },
        ]
    }
];

export const MOCK_RENTAL_SPACES: RentalSpace[] = [
    {
        id: 'rs111111-1111-4111-a111-111111111111',
        name: 'The Loft Berlin',
        location: 'Kreuzberg',
        city: 'Berlin',
        capacity: 25,
        pricePerHour: 45,
        amenities: ['Wifi', 'Sound', 'Mirror', 'Kitchen'],
        imageGradient: 'from-gray-800 to-black'
    }
];

export const URGENCY_COLORS = { 
    'STANDARD': 'bg-gray-500/10 text-gray-400 border-white/5', 
    'SOS_LEVEL_1': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', 
    'SOS_LEVEL_2': 'bg-red-500/10 text-red-500 border-red-500/20', 
    'SOS_LEVEL_3': 'bg-rose-500 text-white border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
};

export const TEST_SCENARIO_JOBS: Job[] = [
    { id: 'test0000-0000-4000-b000-000000000001', creatorId: UUID_SCHOOL_1, title: 'Test Job', studioName: 'UDA', category: 'DANCE', urgency: 'STANDARD', date: 'Heute', timeStart: '16:00', timeEnd: '17:00', fee: 50, totalFee: 50, location: 'Studio 1', description: 'Test', status: 'ACCEPTED', assigneeId: UUID_TRAINER, createdAt: Date.now() }
];
