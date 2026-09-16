/**
 * GermanApp Online - Student Portal Application
 * File: js/student-portal.js
 * Context: React 18 frontend script for student-portal.html
 */

const { useState, useEffect, useMemo } = React;

// Shared Storage Keys with Admin Portal
const STORAGE_KEYS = {
    ASSIGNMENTS: 'germanapp_assignments',
    BULLETINS: 'germanapp_bulletins',
    LIVE_ROOMS: 'germanapp_live_rooms',
    SUBMISSIONS: 'germanapp_student_submissions'
};

// Fallback Mock Data
const DEFAULT_ASSIGNMENTS = [
    { id: 1, course_code: 'A1', title: 'Chapter 1: German Greetings & Alphabet', description: 'Complete exercises on Seite 12 und 13 in the Arbeitsbuch. Submit your notes or worksheet.', external_url: 'https://example.com/homework1', deadline: '2026-09-20' },
    { id: 2, course_code: 'A1', title: 'Vocabulary Quiz: Food & Drinks', description: 'Memorize der/die/das for 30 grocery items. Submit your self-test recording or photo.', external_url: '', deadline: '2026-09-24' },
    { id: 3, course_code: 'A2', title: 'Perfekt Tense Writing Practice', description: 'Write 8 sentences describing what you did yesterday using sein and haben auxiliaries.', external_url: 'https://example.com/perfekt', deadline: '2026-09-28' },
    { id: 4, course_code: 'B1', title: 'Subjunctive II (Konjunktiv II)', description: 'Polite requests and hypothetical scenarios exercise sheet.', external_url: '', deadline: '2026-10-02' }
];

const DEFAULT_LIVE_ROOMS = [
    { id: 1, group_tag: 'Group 5 (Intensive)', instructor: 'Herr Issa', schedule: 'Mon & Wed @ 8:00 PM', meet_url: 'https://meet.google.com/abc-defg-hij', is_active: true },
    { id: 2, group_tag: 'Group 6 (Standard)', instructor: 'Frau Weber', schedule: 'Tue & Thu @ 7:30 PM', meet_url: 'https://meet.google.com/uvw-xyza-bcd', is_active: false },
    { id: 3, group_tag: 'B1 Exam Speaking Club', instructor: 'Herr Schmidt', schedule: 'Saturdays @ 10:00 AM', meet_url: 'https://meet.google.com/klm-nopq-rst', is_active: false }
];

const DEFAULT_BULLETINS = [
    { id: 1, category: 'Important', title: 'Public Holiday Notice', description: 'No online live session scheduled for next Monday due to the public holiday.' },
    { id: 2, category: 'Notification', title: 'A2 Exam Prep Session', description: 'Registration for the Goethe mock test closes this Friday at midnight.' },
    { id: 3, category: 'System', title: 'Audio Server Update', description: 'Maintenance scheduled on Sunday from 2 AM to 4 AM UTC.' }
];

const GERMAN_LEVELS = [
    {
        code: 'A1',
        title: 'A1: Beginner German',
        subtitle: 'Foundations, greetings, alphabet & daily routines',
        progress: 82,
        completedLessons: 18,
        totalLessons: 22,
        mapUrl: 'course-map-a1.html',
        status: 'In Progress',
        themeBg: 'bg-brand-yellow',
        themeLight: 'bg-brand-yellowLight',
        badgeBg: 'bg-brand-dark text-white'
    },
    {
        code: 'A2',
        title: 'A2: Elementary German',
        subtitle: 'Past tense (Perfekt), travel, shopping & modal verbs',
        progress: 45,
        completedLessons: 10,
        totalLessons: 22,
        mapUrl: 'course-map-a2.html',
        status: 'In Progress',
        themeBg: 'bg-brand-lavender',
        themeLight: 'bg-brand-lavenderLight',
        badgeBg: 'bg-brand-dark text-white'
    },
    {
        code: 'B1',
        title: 'B1: Intermediate German',
        subtitle: 'Subjunctive II (Konjunktiv), complex opinions & work life',
        progress: 15,
        completedLessons: 3,
        totalLessons: 20,
        mapUrl: 'b1-course-map.html',
        status: 'Enrolled',
        themeBg: 'bg-brand-coralLight',
        themeLight: 'bg-white',
        badgeBg: 'bg-brand-coral text-white'
    }
];

const FritzStudentMascot = ({ className = "w-32 h-32" }) => (
    <svg viewBox="0 0 160 170" className={`${className} animate-float drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M110 88 C124 74 136 60 144 46" stroke="#161618" strokeWidth="4" strokeLinecap="round" />
        <path d="M106 90 C120 78 132 64 140 52" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
        <ellipse cx="145" cy="45" rx="7" ry="8" fill="#FFDFC4" stroke="#161618" strokeWidth="3" transform="rotate(20 145 45)" />
        <circle cx="151" cy="42" r="2.5" fill="#FFDFC4" stroke="#161618" strokeWidth="2.5" />
        <path d="M50 88 C38 98 32 110 40 120" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
        <path d="M50 88 C38 98 32 110 40 120" stroke="#161618" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="120" r="6" fill="#FFDFC4" stroke="#161618" strokeWidth="3" />
        <ellipse cx="64" cy="158" rx="11" ry="6" fill="#3D2314" stroke="#161618" strokeWidth="3" />
        <ellipse cx="96" cy="158" rx="11" ry="6" fill="#3D2314" stroke="#161618" strokeWidth="3" />
        <rect x="58" y="136" width="12" height="18" rx="4" fill="#FFFFFF" stroke="#161618" strokeWidth="3" />
        <rect x="90" y="136" width="12" height="18" rx="4" fill="#FFFFFF" stroke="#161618" strokeWidth="3" />
        <path d="M58 142H70M90 142H102" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <path d="M54 112 L50 138 L74 138 L80 125 L86 138 L110 138 L106 112 Z" fill="#5C381E" stroke="#161618" strokeWidth="4" strokeLinejoin="round" />
        <path d="M68 116 H92 V126 H68 Z" fill="#4A2D17" stroke="#FED74C" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="72" cy="121" r="1.5" fill="#FED74C" />
        <circle cx="88" cy="121" r="1.5" fill="#FED74C" />
        <path d="M78 121 Q80 123 82 121" stroke="#FED74C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M52 74 C52 74 62 66 80 66 C98 66 108 74 108 74 L106 114 H54 Z" fill="#FFFFFF" stroke="#161618" strokeWidth="4" strokeLinejoin="round" />
        <path d="M58 80H102M56 94H104M56 106H104" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <path d="M63 72 L64 114" stroke="#4A2D17" strokeWidth="6" strokeLinecap="round" />
        <path d="M63 72 L64 114" stroke="#FED74C" strokeWidth="1.5" strokeDasharray="2 3" />
        <path d="M97 72 L96 114" stroke="#4A2D17" strokeWidth="6" strokeLinecap="round" />
        <path d="M97 72 L96 114" stroke="#FED74C" strokeWidth="1.5" strokeDasharray="2 3" />
        <rect x="62" y="86" width="36" height="11" rx="3" fill="#4A2D17" stroke="#161618" strokeWidth="2.5" />
        <circle cx="80" cy="91.5" r="2.5" fill="#FFFFFF" />
        <circle cx="80" cy="91.5" r="1" fill="#FED74C" />
        <circle cx="64" cy="112" r="2" fill="#FED74C" stroke="#161618" strokeWidth="1" />
        <circle cx="96" cy="112" r="2" fill="#FED74C" stroke="#161618" strokeWidth="1" />
        <ellipse cx="80" cy="50" rx="22" ry="20" fill="#FFDFC4" stroke="#161618" strokeWidth="4" />
        <circle cx="58" cy="50" r="4.5" fill="#FFDFC4" stroke="#161618" strokeWidth="3" />
        <circle cx="102" cy="50" r="4.5" fill="#FFDFC4" stroke="#161618" strokeWidth="3" />
        <circle cx="68" cy="53" r="3.5" fill="#FFA58C" />
        <circle cx="92" cy="53" r="3.5" fill="#FFA58C" />
        <circle cx="72" cy="46" r="3.5" fill="#161618" />
        <circle cx="88" cy="46" r="3.5" fill="#161618" />
        <circle cx="71" cy="44.5" r="1.2" fill="#FFFFFF" />
        <circle cx="87" cy="44.5" r="1.2" fill="#FFFFFF" />
        <path d="M80 50 C76 46 66 48 66 52 C71 55 77 53 80 51 C83 53 89 55 94 52 C94 48 84 46 80 50 Z" fill="#E6A14B" stroke="#161618" strokeWidth="2" />
        <path d="M75 54 Q80 59 85 54" stroke="#161618" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M60 36 C64 16 96 16 100 36 Z" fill="#2E5A36" stroke="#161618" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="80" cy="36" rx="28" ry="6" fill="#234629" stroke="#161618" strokeWidth="3.5" />
        <path d="M58 35 Q80 33 102 35" stroke="#FED74C" strokeWidth="3" fill="none" />
        <path d="M96 28 Q108 14 112 8 Q104 18 98 24" fill="#FA7143" stroke="#161618" strokeWidth="2" strokeLinejoin="round" />
        <path d="M94 29 Q103 20 106 14 Q100 22 95 26" fill="#FED74C" stroke="#161618" strokeWidth="1.5" />
    </svg>
);

function App() {
    // Data Collections initialized with localStorage fallback
    const [assignments, setAssignments] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
            return saved ? JSON.parse(saved) : DEFAULT_ASSIGNMENTS;
        } catch (e) {
            return DEFAULT_ASSIGNMENTS;
        }
    });

    const [liveRooms, setLiveRooms] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.LIVE_ROOMS);
            return saved ? JSON.parse(saved) : DEFAULT_LIVE_ROOMS;
        } catch (e) {
            return DEFAULT_LIVE_ROOMS;
        }
    });

    const [bulletins, setBulletins] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.BULLETINS);
            return saved ? JSON.parse(saved) : DEFAULT_BULLETINS;
        } catch (e) {
            return DEFAULT_BULLETINS;
        }
    });

    const [submissions, setSubmissions] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    });

    // Navigation & Sheet States
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'courses' | 'live' | 'tasks' | 'bulletins'
    const [filterLevel, setFilterLevel] = useState('all');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [uploadingAssignment, setUploadingAssignment] = useState(null);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Upload Form Fields
    const [fileName, setFileName] = useState('');
    const [fileNote, setFileNote] = useState('');

    // Save submissions to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
        } catch (e) {}
    }, [submissions]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3200);
    };

    const handleFileUploadSubmit = (e) => {
        e.preventDefault();
        if (!uploadingAssignment) return;

        if (!fileName) {
            showToast('⚠️ Please select or specify a file to upload!');
            return;
        }

        const newSubmission = {
            fileName: fileName,
            note: fileNote,
            submittedAt: new Date().toLocaleDateString('en-GB') + ' • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setSubmissions(prev => ({
            ...prev,
            [uploadingAssignment.id]: newSubmission
        }));

        showToast('🎉 Task submitted successfully!');
        setUploadingAssignment(null);
        setFileName('');
        setFileNote('');
    };

    const filteredAssignments = useMemo(() => {
        if (filterLevel === 'all') return assignments;
        return assignments.filter(a => a.course_code.toLowerCase() === filterLevel.toLowerCase());
    }, [assignments, filterLevel]);

    return (
        <div className="w-full max-w-md md:max-w-xl mx-auto min-h-screen bg-brand-cream pb-28 sm:pb-32 relative shadow-2xl overflow-x-hidden">

            {/* Header with Log Out Action */}
            <header className="sticky top-0 z-30 bg-brand-cream/95 backdrop-blur-md px-5 pt-4 pb-3 border-b-2 border-brand-dark/10 flex items-center justify-between">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-dark text-white px-3 py-1 rounded-full text-xs font-black tracking-wide">
                        <span>GermanApp</span>
                        <span className="text-brand-yellow">✦</span>
                        <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">Student Hub</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-brand-dark mt-1 flex items-center gap-1.5">
                        Learner Portal
                    </h1>
                </div>

                <button 
                    onClick={() => setShowLogoutModal(true)}
                    className="group flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-700 px-3.5 py-2 rounded-full font-black text-xs border-2 border-brand-dark shadow-chunky-sm active:translate-y-0.5 active:shadow-chunky-press transition"
                    title="Log Out"
                >
                    <span className="material-symbols-rounded text-sm font-bold">logout</span>
                    <span>Log Out</span>
                </button>
            </header>

            {/* Hero Section */}
            <section className="px-4 pt-3">
                <div className="bg-brand-yellow rounded-4xl p-6 border-2 border-brand-dark shadow-chunky relative overflow-hidden">
                    <span className="absolute top-4 right-6 text-xl">✦</span>
                    <span className="absolute bottom-6 left-6 text-xl">♥</span>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="max-w-[62%]">
                            <div className="inline-flex items-center gap-1.5 bg-brand-dark text-white px-3 py-1 rounded-full text-[11px] font-extrabold mb-2.5">
                                <span>Willkommen zurück!</span>
                                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse"></span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark leading-[1.15] tracking-tight">
                                Lerne Deutsch jeden Tag.
                            </h2>
                            <p className="text-xs font-semibold text-brand-dark/85 mt-2 leading-relaxed">
                                {assignments.length} tasks assigned &bull; {liveRooms.length} meet rooms &bull; {bulletins.length} announcements.
                            </p>
                        </div>

                        <div className="w-28 flex justify-center items-center">
                            <FritzStudentMascot className="w-28 h-28" />
                        </div>
                    </div>

                    {/* Hero Bottom Bar Shortcuts */}
                    <div className="mt-4 pt-4 border-t border-brand-dark/15 flex items-center justify-between gap-2">
                        <button
                            onClick={() => setActiveTab('live')}
                            className="flex-1 bg-brand-coral hover:bg-orange-600 text-white py-2.5 px-3 rounded-full font-black text-xs flex items-center justify-between shadow-chunky-sm border border-brand-dark active:translate-y-0.5 transition"
                        >
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-rounded text-sm">videocam</span>
                                Live Class
                            </span>
                            <span className="w-4 h-4 rounded-full bg-white text-brand-coral flex items-center justify-center text-[10px] font-bold">➔</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('tasks')}
                            className="flex-1 bg-brand-dark hover:bg-zinc-800 text-white py-2.5 px-3 rounded-full font-black text-xs flex items-center justify-between shadow-chunky-sm active:translate-y-0.5 transition"
                        >
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-rounded text-sm">edit_note</span>
                                Homework
                            </span>
                            <span className="w-4 h-4 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center text-[10px] font-bold">➔</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Courses / Levels Section */}
            {(activeTab === 'overview' || activeTab === 'courses') && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>German Language Levels</span>
                                <span className="text-xs bg-brand-lavender text-brand-dark px-2 py-0.5 rounded-full font-extrabold">{GERMAN_LEVELS.length} Levels</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Tap Start to open interactive course map &amp; lessons</p>
                        </div>
                    </div>

                    <div className="space-y-3.5">
                        {GERMAN_LEVELS.map(level => (
                            <div 
                                key={level.code}
                                className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-brand-dark shadow-chunky-sm relative overflow-hidden transition hover:-translate-y-0.5"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`${level.badgeBg} text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                                                Level {level.code}
                                            </span>
                                            <span className="bg-zinc-100 text-zinc-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-black/10">
                                                {level.status}
                                            </span>
                                            <span className="text-[10px] font-bold text-zinc-400">
                                                {level.completedLessons}/{level.totalLessons} Lessons
                                            </span>
                                        </div>

                                        <h4 className="text-base font-black text-brand-dark mt-2 leading-tight">
                                            {level.title}
                                        </h4>
                                        <p className="text-xs font-semibold text-zinc-600 mt-1 leading-relaxed">
                                            {level.subtitle}
                                        </p>
                                    </div>

                                    <a 
                                        href={level.mapUrl}
                                        className="shrink-0 bg-brand-yellow hover:bg-yellow-400 text-brand-dark px-4 py-2 rounded-full font-black text-xs border-2 border-brand-dark shadow-chunky-sm active:translate-y-0.5 active:shadow-chunky-press transition flex items-center gap-1.5"
                                        title={`Start ${level.code} Course Map`}
                                    >
                                        <span>Start</span>
                                        <span className="material-symbols-rounded text-sm font-black">arrow_forward</span>
                                    </a>
                                </div>

                                <div className="mt-3.5 pt-3 border-t border-zinc-100">
                                    <div className="flex items-center justify-between text-[11px] font-black text-zinc-700 mb-1">
                                        <span>Curriculum Progress</span>
                                        <span className="text-brand-dark">{level.progress}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-100 rounded-full h-2.5 border border-black/10 overflow-hidden">
                                        <div 
                                            className="bg-brand-dark h-full rounded-full transition-all duration-500" 
                                            style={{ width: `${level.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Live Rooms Section */}
            {(activeTab === 'overview' || activeTab === 'live') && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>Google Meet Classrooms</span>
                                <span className="text-xs bg-brand-coral text-white px-2 py-0.5 rounded-full font-extrabold">{liveRooms.length}</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Tap to view room timetable &amp; launch session</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {liveRooms.map(room => (
                            <div 
                                key={room.id}
                                onClick={() => setSelectedRoom(room)}
                                className="bg-brand-coral text-white rounded-3xl p-4 border-2 border-brand-dark shadow-chunky-sm relative overflow-hidden cursor-pointer hover:brightness-105 active:scale-[0.99] transition group"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-white text-brand-coral px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-coral animate-ping"></span>
                                                Google Meet
                                            </span>
                                            {room.is_active && (
                                                <span className="bg-brand-yellow text-brand-dark text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                                    Active Now
                                                </span>
                                            )}
                                            <span className="text-[10px] bg-black/20 text-white/90 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-0.5">
                                                <span className="material-symbols-rounded text-[11px]">visibility</span>
                                                <span>View</span>
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-black mt-1.5 leading-tight group-hover:underline">
                                            {room.group_tag}
                                        </h4>
                                        <p className="text-xs text-white/90 font-semibold mt-0.5">
                                            {room.instructor} &bull; {room.schedule}
                                        </p>
                                    </div>

                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard?.writeText(room.meet_url);
                                            showToast('Room link copied to clipboard! 📋');
                                        }}
                                        className="w-8 h-8 bg-white/20 hover:bg-white/35 text-white rounded-full flex items-center justify-center border border-white/40 active:scale-90 transition"
                                        title="Copy Room Link"
                                    >
                                        <span className="material-symbols-rounded text-sm">content_copy</span>
                                    </button>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                    <a 
                                        href={room.meet_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 bg-white text-brand-dark py-2.5 px-3.5 rounded-full font-black text-xs flex items-center justify-between hover:bg-zinc-100 active:scale-95 transition"
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-rounded text-base text-brand-coral">video_call</span>
                                            Join Class Session
                                        </span>
                                        <span className="w-4 h-4 rounded-full bg-brand-dark text-white flex items-center justify-center text-[9px]">➔</span>
                                    </a>
                                </div>
                            </div>
                        ))}

                        {liveRooms.length === 0 && (
                            <div className="text-center py-8 bg-white rounded-3xl border-2 border-dashed border-zinc-300 p-6">
                                <p className="text-xs font-bold text-zinc-500">No scheduled Google Meet classes right now.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Assignments Section */}
            {(activeTab === 'overview' || activeTab === 'tasks') && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>Assignments &amp; Homework</span>
                                <span className="text-xs bg-brand-yellow px-2 py-0.5 rounded-full font-extrabold">{assignments.length}</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Tap to inspect instructions &amp; submit homework</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                        {['all', 'A1', 'A2', 'B1'].map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => setFilterLevel(lvl)}
                                className={`px-3 py-1 rounded-full text-xs font-black transition ${
                                    filterLevel === lvl 
                                        ? 'bg-brand-dark text-white' 
                                        : 'bg-white text-zinc-600 border border-black/10'
                                }`}
                            >
                                {lvl.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        {filteredAssignments.map(asg => {
                            const sub = submissions[asg.id];

                            return (
                                <div 
                                    key={asg.id}
                                    onClick={() => setSelectedAssignment(asg)}
                                    className="bg-white rounded-3xl p-4 border-2 border-brand-dark shadow-chunky-sm flex flex-col justify-between cursor-pointer hover:border-black active:scale-[0.99] transition group"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="bg-brand-yellowLight text-brand-dark border border-brand-yellow font-black text-[10px] px-2.5 py-0.5 rounded-full">
                                                    Level {asg.course_code}
                                                </span>
                                                {sub ? (
                                                    <span className="bg-brand-mint text-brand-mintDark font-black text-[10px] px-2.5 py-0.5 rounded-full border border-brand-mintDark/20 inline-flex items-center gap-1">
                                                        <span className="material-symbols-rounded text-xs font-bold">check_circle</span>
                                                        Submitted
                                                    </span>
                                                ) : (
                                                    <span className="bg-brand-coralLight text-brand-coral font-black text-[10px] px-2.5 py-0.5 rounded-full border border-brand-coral/20">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1">
                                                <span className="material-symbols-rounded text-xs">calendar_today</span>
                                                Due: {asg.deadline}
                                            </span>
                                        </div>

                                        <h4 className="font-extrabold text-sm text-brand-dark mt-2 leading-snug group-hover:text-brand-coral transition-colors">
                                            {asg.title}
                                        </h4>
                                        {asg.description && (
                                            <p className="text-xs text-zinc-600 font-medium mt-1 leading-relaxed line-clamp-2">
                                                {asg.description}
                                            </p>
                                        )}

                                        {sub && (
                                            <div className="mt-2.5 p-2 bg-brand-cream rounded-xl border border-black/10 text-[11px] font-semibold text-zinc-700 flex items-center justify-between">
                                                <div className="flex items-center gap-1 truncate">
                                                    <span className="material-symbols-rounded text-sm text-brand-mintDark">description</span>
                                                    <span className="truncate">{sub.fileName}</span>
                                                </div>
                                                <span className="text-[10px] text-zinc-400 shrink-0">{sub.submittedAt}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2" onClick={e => e.stopPropagation()}>
                                        {asg.external_url ? (
                                            <a 
                                                href={asg.external_url} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-black text-brand-dark bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition"
                                            >
                                                <span className="material-symbols-rounded text-sm">link</span>
                                                <span>Worksheet</span>
                                            </a>
                                        ) : (
                                            <span className="text-[11px] font-semibold text-zinc-400">Standard Task</span>
                                        )}

                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setUploadingAssignment(asg);
                                            }}
                                            className={`px-3.5 py-1.5 rounded-full font-black text-xs flex items-center gap-1.5 border-2 border-brand-dark shadow-chunky-sm active:translate-y-0.5 transition ${
                                                sub 
                                                    ? 'bg-brand-lavender text-brand-dark hover:bg-brand-yellow' 
                                                    : 'bg-brand-yellow text-brand-dark hover:bg-white'
                                            }`}
                                        >
                                            <span className="material-symbols-rounded text-sm">
                                                {sub ? 'refresh' : 'upload_file'}
                                            </span>
                                            <span>{sub ? 'Resubmit' : 'Upload Work'}</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredAssignments.length === 0 && (
                            <div className="text-center py-8 bg-white rounded-3xl border-2 border-dashed border-zinc-300 p-6">
                                <p className="text-xs font-bold text-zinc-500">No homework tasks found for this level.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Bulletins Section */}
            {(activeTab === 'overview' || activeTab === 'bulletins') && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>Bulletin Notice Board</span>
                                <span className="text-xs bg-brand-coral text-white px-2 py-0.5 rounded-full font-extrabold">{bulletins.length}</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Official course updates and announcements</p>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        {bulletins.map(notice => {
                            const isImp = notice.category?.toLowerCase() === 'important';
                            return (
                                <div 
                                    key={notice.id}
                                    onClick={() => setSelectedNotice(notice)}
                                    className={`p-4 rounded-3xl border-2 border-brand-dark shadow-chunky-sm flex items-start justify-between gap-3 cursor-pointer hover:brightness-95 active:scale-[0.99] transition ${
                                        isImp ? 'bg-brand-coralLight' : 'bg-brand-lavenderLight'
                                    }`}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${
                                                isImp ? 'bg-brand-coral text-white' : 'bg-brand-lavender text-brand-dark'
                                            }`}>
                                                {notice.category}
                                            </span>
                                            <span className="text-[10px] bg-black/10 text-brand-dark px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-0.5">
                                                <span className="material-symbols-rounded text-[11px]">visibility</span>
                                                <span>Read</span>
                                            </span>
                                        </div>
                                        <h4 className="font-black text-sm text-brand-dark">{notice.title}</h4>
                                        <p className="text-xs text-zinc-700 font-medium mt-1 leading-relaxed line-clamp-2">{notice.description}</p>
                                    </div>
                                </div>
                            );
                        })}

                        {bulletins.length === 0 && (
                            <div className="text-center py-8 bg-white rounded-3xl border-2 border-dashed border-zinc-300 p-6">
                                <p className="text-xs font-bold text-zinc-500">No active notices at this time.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Bottom Dock Navigation */}
            <nav className="fixed bottom-3 left-0 right-0 z-40 max-w-md md:max-w-xl mx-auto px-4 pointer-events-none">
                <div className="bg-brand-dark/95 text-white backdrop-blur-lg p-2 rounded-full border-2 border-brand-dark shadow-2xl flex items-center justify-between pointer-events-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'overview' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">dashboard</span>
                        <span>Overview</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'courses' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">map</span>
                        <span>Levels</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('live')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'live' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">videocam</span>
                        <span>Live Meet</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'tasks' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">edit_note</span>
                        <span>Homework</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('bulletins')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'bulletins' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">campaign</span>
                        <span>Bulletin</span>
                    </button>
                </div>
            </nav>

            {/* Upload Modal */}
            {uploadingAssignment && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between pb-3 border-b border-black/10">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-brand-coral">Homework Submission</span>
                                <h3 className="text-xl font-black text-brand-dark leading-tight">{uploadingAssignment.title}</h3>
                            </div>
                            <button 
                                onClick={() => setUploadingAssignment(null)} 
                                className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                            >
                                <span className="material-symbols-rounded text-sm">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleFileUploadSubmit} className="mt-4 space-y-3.5">
                            <div className="bg-brand-yellowLight p-3.5 rounded-2xl border border-brand-yellow text-xs font-semibold text-brand-dark">
                                <div className="flex items-center gap-1.5 font-black mb-1">
                                    <span className="material-symbols-rounded text-sm text-brand-coral">event</span>
                                    <span>Deadline: {uploadingAssignment.deadline}</span>
                                </div>
                                <p className="text-[11px] text-zinc-700 leading-relaxed">
                                    {uploadingAssignment.description || 'Complete the assigned task and submit your response file.'}
                                </p>
                            </div>

                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">
                                    Choose File (.pdf, .docx, .png, .mp3)
                                </label>
                                <input 
                                    type="file" 
                                    onChange={(e) => {
                                        const selected = e.target.files[0];
                                        if (selected) setFileName(selected.name);
                                    }}
                                    className="w-full text-xs font-bold text-brand-dark bg-white border-2 border-brand-dark rounded-2xl p-2.5 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-brand-dark file:text-white"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">
                                    Or Enter File / Link Reference
                                </label>
                                <input 
                                    type="text" 
                                    value={fileName}
                                    onChange={e => setFileName(e.target.value)}
                                    placeholder="e.g. MeinTag_A1_Kapitel1.pdf"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">
                                    Student Note / Comments (Optional)
                                </label>
                                <textarea 
                                    rows="2"
                                    value={fileNote}
                                    onChange={e => setFileNote(e.target.value)}
                                    placeholder="Notes for Herr Issa or Frau Weber..."
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                ></textarea>
                            </div>

                            <div className="pt-2 flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setUploadingAssignment(null)}
                                    className="flex-1 bg-white border-2 border-brand-dark py-3 rounded-full font-bold text-xs active:scale-95 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 bg-brand-dark text-white py-3 rounded-full font-extrabold text-xs shadow-chunky-sm active:translate-y-0.5 transition flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">cloud_upload</span>
                                    <span>Submit Task</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Task Detail Modal */}
            {selectedAssignment && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between pb-3 border-b border-black/10">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-brand-coral">Task Overview</span>
                                <h3 className="text-xl font-black text-brand-dark">{selectedAssignment.title}</h3>
                            </div>
                            <button 
                                onClick={() => setSelectedAssignment(null)} 
                                className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                            >
                                <span className="material-symbols-rounded text-sm">close</span>
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="bg-brand-dark text-white text-xs font-black px-3 py-1 rounded-full">
                                    Level {selectedAssignment.course_code}
                                </span>
                                <span className="bg-white border border-black/10 text-zinc-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <span className="material-symbols-rounded text-sm text-brand-coral">event</span>
                                    Due: {selectedAssignment.deadline}
                                </span>
                            </div>

                            <div className="bg-white p-4 rounded-3xl border border-black/10">
                                <span className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Instructions</span>
                                <p className="text-xs text-brand-dark font-medium leading-relaxed">
                                    {selectedAssignment.description || 'No detailed instructions provided.'}
                                </p>
                            </div>

                            {selectedAssignment.external_url && (
                                <a 
                                    href={selectedAssignment.external_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full bg-brand-yellowLight border border-brand-yellow p-3 rounded-2xl flex items-center justify-between text-brand-dark text-xs font-black"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-rounded text-base">link</span>
                                        Open Worksheet / Material Link
                                    </span>
                                    <span>➔</span>
                                </a>
                            )}

                            {submissions[selectedAssignment.id] ? (
                                <div className="bg-brand-mint/40 border border-brand-mintDark/30 p-3.5 rounded-2xl">
                                    <span className="text-[10px] font-black text-brand-mintDark uppercase block mb-1">Your Submission</span>
                                    <p className="text-xs font-bold text-brand-dark truncate">{submissions[selectedAssignment.id].fileName}</p>
                                    <span className="text-[10px] text-zinc-500 font-semibold">{submissions[selectedAssignment.id].submittedAt}</span>
                                </div>
                            ) : null}

                            <div className="pt-2 flex gap-2">
                                <button 
                                    onClick={() => {
                                        const target = selectedAssignment;
                                        setSelectedAssignment(null);
                                        setUploadingAssignment(target);
                                    }}
                                    className="flex-1 bg-brand-yellow text-brand-dark border-2 border-brand-dark py-3 rounded-full font-black text-xs shadow-chunky-sm active:translate-y-0.5 transition flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">
                                        {submissions[selectedAssignment.id] ? 'refresh' : 'upload_file'}
                                    </span>
                                    <span>{submissions[selectedAssignment.id] ? 'Resubmit File' : 'Upload Homework'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Live Room Modal */}
            {selectedRoom && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between pb-3 border-b border-black/10">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-brand-coral text-white flex items-center justify-center border border-brand-dark">
                                    <span className="material-symbols-rounded text-base">videocam</span>
                                </span>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-coral">Google Meet Class</span>
                                    <h3 className="text-lg font-black text-brand-dark">{selectedRoom.group_tag}</h3>
                                </div>
                            </div>
                            <button onClick={() => setSelectedRoom(null)} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center">
                                <span className="material-symbols-rounded text-sm">close</span>
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className="bg-white p-3.5 rounded-2xl border border-black/10">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Instructor &amp; Timetable</span>
                                <p className="text-xs font-black text-brand-dark mt-0.5">
                                    {selectedRoom.instructor} &bull; {selectedRoom.schedule}
                                </p>
                            </div>

                            <div className="bg-white p-3 rounded-2xl border border-black/10 flex items-center justify-between gap-2">
                                <span className="text-xs font-mono text-zinc-600 truncate">{selectedRoom.meet_url}</span>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard?.writeText(selectedRoom.meet_url);
                                        showToast('Meeting link copied! 📋');
                                    }}
                                    className="bg-zinc-100 hover:bg-zinc-200 text-brand-dark p-2 rounded-full border border-black/10 shrink-0"
                                    title="Copy link"
                                >
                                    <span className="material-symbols-rounded text-sm">content_copy</span>
                                </button>
                            </div>

                            <a 
                                href={selectedRoom.meet_url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-brand-coral hover:bg-orange-600 text-white py-3 rounded-full font-black text-xs flex items-center justify-center gap-2 border-2 border-brand-dark shadow-chunky-sm active:translate-y-0.5 transition"
                            >
                                <span className="material-symbols-rounded text-base">video_call</span>
                                <span>Join Google Meet Classroom</span>
                                <span className="text-xs">➔</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulletin Modal */}
            {selectedNotice && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between pb-3 border-b border-black/10">
                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-brand-coral text-white">
                                {selectedNotice.category}
                            </span>
                            <button onClick={() => setSelectedNotice(null)} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center">
                                <span className="material-symbols-rounded text-sm">close</span>
                            </button>
                        </div>

                        <div className="mt-4 space-y-2">
                            <h3 className="text-lg font-black text-brand-dark">{selectedNotice.title}</h3>
                            <p className="text-xs text-zinc-700 font-medium leading-relaxed whitespace-pre-line bg-white p-4 rounded-3xl border border-black/10">
                                {selectedNotice.description}
                            </p>
                        </div>

                        <button 
                            onClick={() => setSelectedNotice(null)}
                            className="w-full mt-4 bg-brand-dark text-white py-3 rounded-full font-black text-xs shadow-chunky-sm active:translate-y-0.5 transition"
                        >
                            Verstanden (Got it)
                        </button>
                    </div>
                </div>
            )}

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white w-full max-w-sm rounded-t-4xl sm:rounded-4xl border-2 border-brand-dark shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                        <div className="w-14 h-14 bg-brand-yellowLight text-brand-dark rounded-full flex items-center justify-center mx-auto mb-3 border border-brand-yellow">
                            <span className="material-symbols-rounded text-2xl">logout</span>
                        </div>
                        <h4 className="text-lg font-black text-brand-dark">Sign Out of GermanApp?</h4>
                        <p className="text-xs text-zinc-600 font-semibold mt-1">
                            You can log back in at any time to continue your German study streak.
                        </p>

                        <div className="mt-5 flex gap-2">
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-brand-dark py-2.5 rounded-full font-extrabold text-xs transition"
                            >
                                Stay
                            </button>
                            <button 
                                onClick={() => {
                                    setShowLogoutModal(false);
                                    showToast('Logged out safely. Bis bald! 👋');
                                    setTimeout(() => {
                                        window.location.href = 'index.html';
                                    }, 800);
                                }}
                                className="flex-1 bg-brand-dark hover:bg-zinc-800 text-white py-2.5 rounded-full font-extrabold text-xs shadow-md transition"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            {toastMessage && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-brand-dark text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-brand-yellow/30 animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                    <span>{toastMessage}</span>
                </div>
            )}

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);