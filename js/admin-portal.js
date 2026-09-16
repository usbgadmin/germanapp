/**
 * GermanApp Online - Admin Studio Portal Application
 * File: js/admin-portal.js
 * Context: React 18 frontend script for admin-portal.html
 */

const { useState, useEffect, useMemo } = React;

const INITIAL_ASSIGNMENTS = [
    { id: 1, course_code: 'A1', title: 'Chapter 1: German Greetings & Alphabet', description: 'Complete exercises on Seite 12 und 13 in the Arbeitsbuch.', external_url: 'https://example.com/homework1', deadline: '2026-09-20' },
    { id: 2, course_code: 'A1', title: 'Vocabulary Quiz: Food & Drinks', description: 'Memorize der/die/das for 30 common grocery items.', external_url: '', deadline: '2026-09-24' },
    { id: 3, course_code: 'A2', title: 'Perfekt Tense Writing Practice', description: 'Write 8 sentences describing what you did yesterday using sein/haben.', external_url: 'https://example.com/perfekt', deadline: '2026-09-28' },
    { id: 4, course_code: 'B1', title: 'Subjunctive II (Konjunktiv II)', description: 'Polite requests and hypothetical scenarios worksheet.', external_url: '', deadline: '2026-10-02' },
    { id: 5, course_code: 'A2', title: 'Modal Verbs in Präteritum', description: 'Exercises covering konnte, musste, wollte, durfte.', external_url: '', deadline: '2026-10-05' }
];

const INITIAL_CLASSES = [
    { id: 1, name: 'Group 5 (Intensive)', level: 'A1', instructor: 'Herr Issa', schedule: 'Mon & Wed @ 8:00 PM', student_count: 14, max_capacity: 20, color: 'lavender' },
    { id: 2, name: 'Group 6 (Standard)', level: 'A2', instructor: 'Frau Weber', schedule: 'Tue & Thu @ 7:30 PM', student_count: 18, max_capacity: 20, color: 'yellow' },
    { id: 3, name: 'Group 7 (Weekend B1)', level: 'B1', instructor: 'Herr Schmidt', schedule: 'Saturdays @ 10:00 AM', student_count: 11, max_capacity: 15, color: 'coral' }
];

const INITIAL_LIVE_ROOMS = [
    { id: 1, group_tag: 'Group 5 (Intensive)', instructor: 'Herr Issa', schedule: 'Mon & Wed @ 8:00 PM', meet_url: 'https://meet.google.com/abc-defg-hij', is_active: true },
    { id: 2, group_tag: 'Group 6 (Standard)', instructor: 'Frau Weber', schedule: 'Tue & Thu @ 7:30 PM', meet_url: 'https://meet.google.com/uvw-xyza-bcd', is_active: false },
    { id: 3, group_tag: 'B1 Exam Speaking Club', instructor: 'Herr Schmidt', schedule: 'Saturdays @ 10:00 AM', meet_url: 'https://meet.google.com/klm-nopq-rst', is_active: false }
];

const INITIAL_NOTICES = [
    { id: 1, category: 'Important', title: 'Public Holiday Notice', description: 'No online live session scheduled for next Monday due to the public holiday.' },
    { id: 2, category: 'Notification', title: 'A2 Exam Prep Session', description: 'Registration for the Goethe mock test closes this Friday at midnight.' },
    { id: 3, category: 'System', title: 'Audio Server Update', description: 'Maintenance on Sunday from 2 AM to 4 AM UTC.' }
];

const INITIAL_STUDENTS = [
    { id: 1, name: 'Haikal Razak', phone: '+60123456789', email: 'haikal.razak@student.com', class_name: 'Group 5 (Intensive)' },
    { id: 2, name: 'Sarah Tan', phone: '+60178899123', email: 'sarah.tan@student.com', class_name: 'Group 5 (Intensive)' },
    { id: 3, name: 'Ahmad Faiz', phone: '+60193451122', email: 'ahmad.faiz@example.com', class_name: 'Group 6 (Standard)' },
    { id: 4, name: 'Nurul Huda', phone: '+60112345678', email: 'huda@example.com', class_name: 'Group 6 (Standard)' },
    { id: 5, name: 'Kevin Lee', phone: '+60162349988', email: 'kevin.lee@example.com', class_name: 'Group 7 (Weekend B1)' }
];

const GermanLederhosenMascot = ({ className = "w-32 h-32" }) => (
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
    const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
    const [classes, setClasses] = useState(INITIAL_CLASSES);
    const [notices, setNotices] = useState(INITIAL_NOTICES);
    const [students, setStudents] = useState(INITIAL_STUDENTS);
    const [liveRooms, setLiveRooms] = useState(INITIAL_LIVE_ROOMS);

    const [activeTab, setActiveTab] = useState('overview');
    const [filterCategory, setFilterCategory] = useState('all');

    const [sheetType, setSheetType] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const [selectedClassRoster, setSelectedClassRoster] = useState(null);
    const [rosterSearch, setRosterSearch] = useState('');
    const [pendingDelete, setPendingDelete] = useState(null);
    const [toast, setToast] = useState('');

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3200);
    };

    const triggerDeleteConfirmation = (type, id, title) => {
        setPendingDelete({ type, id, title });
        setSheetType('confirm-delete');
    };

    const confirmDeletion = () => {
        if (!pendingDelete) return;
        const { type, id } = pendingDelete;

        if (type === 'assignment') {
            setAssignments(prev => prev.filter(a => a.id !== id));
            showToast('Assignment deleted 🗑️');
        } else if (type === 'class') {
            const cls = classes.find(c => c.id === id);
            setClasses(prev => prev.filter(c => c.id !== id));
            if (cls) setStudents(prev => prev.filter(s => s.class_name !== cls.name));
            showToast('Class and enrolled roster removed 🗑️');
        } else if (type === 'notice') {
            setNotices(prev => prev.filter(n => n.id !== id));
            showToast('Bulletin announcement removed 🗑️');
        } else if (type === 'student') {
            setStudents(prev => prev.filter(s => s.id !== id));
            showToast('Student removed from roster 🗑️');
        } else if (type === 'liveRoom') {
            setLiveRooms(prev => prev.filter(r => r.id !== id));
            showToast('Live Google Meet room removed 🗑️');
        }
        setSheetType(null);
        setPendingDelete(null);
    };

    const openEditSheet = (type, item) => {
        setEditingItem(item);
        setSheetType(`edit-${type}`);
    };

    const filteredAssignments = useMemo(() => {
        if (filterCategory === 'all') return assignments;
        return assignments.filter(a => a.course_code.toLowerCase() === filterCategory.toLowerCase());
    }, [assignments, filterCategory]);

    return (
        <div className="w-full max-w-md md:max-w-xl mx-auto min-h-screen bg-brand-cream pb-28 sm:pb-32 relative shadow-2xl overflow-x-hidden">
            
            {/* Header */}
            <header className="sticky top-0 z-30 bg-brand-cream/90 backdrop-blur-md px-5 pt-4 pb-3 border-b border-black/5 flex items-center justify-between">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-xs font-black tracking-wide">
                        <span>GermanApp</span>
                        <span className="text-brand-yellow">✦</span>
                        <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">Admin</span>
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-brand-dark mt-1 flex items-center gap-1">
                        Control Studio
                    </h1>
                </div>

                <button 
                    onClick={() => setSheetType('confirm-logout')}
                    className="group flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-700 px-3.5 py-2 rounded-full font-black text-xs border border-red-300 shadow-sm active:scale-95 transition-transform"
                    title="Log Out of Admin Portal"
                >
                    <span className="material-symbols-rounded text-sm font-bold">logout</span>
                    <span>Log Out</span>
                </button>
            </header>

            {/* Hero Banner */}
            <section className="px-4 pt-3">
                <div className="bg-brand-yellow rounded-4xl p-6 border-2 border-brand-dark shadow-chunky relative overflow-hidden">
                    <span className="absolute top-4 right-6 text-xl">✦</span>
                    <span className="absolute bottom-6 left-6 text-xl">♥</span>
                    
                    <div className="flex items-center justify-between relative z-10">
                        <div className="max-w-[62%]">
                            <div className="inline-flex items-center gap-1.5 bg-brand-dark text-white px-3 py-1 rounded-full text-[11px] font-extrabold mb-2.5">
                                <span>Live Management</span>
                                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse"></span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark leading-[1.15] tracking-tight">
                                Teach with Ease &amp; Joy.
                            </h2>
                            <p className="text-xs font-semibold text-brand-dark/80 mt-2 leading-relaxed">
                                {classes.length} classes &bull; {liveRooms.length} live rooms &bull; {students.length} students.
                            </p>
                        </div>

                        <div className="w-28 flex justify-center items-center">
                            <GermanLederhosenMascot className="w-28 h-28" />
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-brand-dark/15 flex items-center justify-between gap-2">
                        <button
                            onClick={() => { setEditingItem(null); setSheetType('create-assignment'); }}
                            className="flex-1 bg-brand-dark hover:bg-zinc-800 text-white py-2.5 px-3 rounded-full font-bold text-xs flex items-center justify-between shadow-sm active:scale-95 transition"
                        >
                            <span>+ Task</span>
                            <span className="w-4 h-4 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center text-[10px]">➔</span>
                        </button>
                        <button
                            onClick={() => { setEditingItem(null); setSheetType('create-class'); }}
                            className="bg-white hover:bg-zinc-50 text-brand-dark border-2 border-brand-dark py-2 px-3 rounded-full font-black text-xs flex items-center gap-1 active:scale-95 transition"
                        >
                            <span>+ Class</span>
                        </button>
                        <button
                            onClick={() => { setEditingItem(null); setSheetType('create-live-room'); }}
                            className="bg-brand-coral hover:bg-orange-600 text-white border-2 border-brand-dark py-2 px-3 rounded-full font-black text-xs flex items-center gap-1 active:scale-95 transition"
                        >
                            <span>+ Live</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Live Rooms Section */}
            {(activeTab === 'overview' || activeTab === 'live') && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>Google Meet Rooms</span>
                                <span className="text-xs bg-brand-coral text-white px-2 py-0.5 rounded-full font-extrabold">{liveRooms.length}</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Tap any room to view full details</p>
                        </div>

                        <button 
                            onClick={() => { setEditingItem(null); setSheetType('create-live-room'); }}
                            className="text-xs font-black text-white bg-brand-dark px-3 py-1.5 rounded-full hover:bg-zinc-800 flex items-center gap-1 active:scale-95 transition shadow-sm"
                        >
                            <span className="material-symbols-rounded text-sm">add</span>
                            <span>Add Room</span>
                        </button>
                    </div>

                    <div className="space-y-3">
                        {liveRooms.map(room => (
                            <div 
                                key={room.id}
                                onClick={() => setViewingItem({ type: 'liveRoom', data: room })}
                                className="bg-brand-coral text-white rounded-3xl p-4 border-2 border-brand-dark shadow-chunky-sm relative overflow-hidden cursor-pointer hover:brightness-105 active:scale-[0.99] transition group"
                                title="Click to view details"
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

                                    <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); openEditSheet('live-room', room); }}
                                            className="w-8 h-8 bg-white/20 hover:bg-white/35 text-white rounded-full flex items-center justify-center border border-white/40 active:scale-90 transition"
                                            title="Edit Live Room"
                                        >
                                            <span className="material-symbols-rounded text-sm">edit</span>
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); triggerDeleteConfirmation('liveRoom', room.id, room.group_tag); }}
                                            className="w-8 h-8 bg-white/20 hover:bg-red-600 text-white rounded-full flex items-center justify-center border border-white/40 active:scale-90 transition"
                                            title="Delete Live Room"
                                        >
                                            <span className="material-symbols-rounded text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                    <a 
                                        href={room.meet_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        className="flex-1 bg-white text-brand-dark py-2.5 px-3.5 rounded-full font-black text-xs flex items-center justify-between hover:bg-zinc-100 active:scale-95 transition"
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-rounded text-base text-brand-coral">video_call</span>
                                            Launch Meet
                                        </span>
                                        <span className="w-4 h-4 rounded-full bg-brand-dark text-white flex items-center justify-center text-[9px]">➔</span>
                                    </a>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard?.writeText(room.meet_url);
                                            showToast('Meet link copied to clipboard! 📋');
                                        }}
                                        className="p-2.5 bg-brand-dark/30 hover:bg-brand-dark/50 rounded-full border border-white/30 text-white active:scale-90 transition flex items-center justify-center"
                                        title="Copy Room Link"
                                    >
                                        <span className="material-symbols-rounded text-sm">content_copy</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {liveRooms.length === 0 && (
                            <div className="text-center py-8 bg-white rounded-3xl border-2 border-dashed border-zinc-300 p-6">
                                <p className="text-xs font-bold text-zinc-500">No live Google Meet rooms configured yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Classes Section */}
            {(activeTab === 'overview' || activeTab === 'classes') && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>Active Batches</span>
                                <span className="text-xs bg-brand-lavender px-2 py-0.5 rounded-full font-extrabold">{classes.length}</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Tap a class card to inspect enrolled roster</p>
                        </div>
                        <button 
                            onClick={() => { setEditingItem(null); setSheetType('create-class'); }}
                            className="text-xs font-black text-brand-dark bg-white border border-black/10 px-3 py-1.5 rounded-full hover:bg-zinc-100 flex items-center gap-1 active:scale-95 transition"
                        >
                            <span className="material-symbols-rounded text-sm">add</span>
                            <span>Add Group</span>
                        </button>
                    </div>

                    <div className="space-y-3">
                        {classes.map(cls => {
                            const enrolled = students.filter(s => s.class_name === cls.name).length;
                            const percentage = Math.min(100, Math.round((enrolled / cls.max_capacity) * 100));
                            const bgToken = cls.color === 'yellow' ? 'bg-brand-yellow' : cls.color === 'coral' ? 'bg-brand-coralLight' : 'bg-brand-lavender';

                            return (
                                <div 
                                    key={cls.id}
                                    onClick={() => setViewingItem({ type: 'class', data: cls })}
                                    className={`${bgToken} rounded-3xl p-4 border-2 border-brand-dark shadow-chunky-sm transition hover:-translate-y-0.5 cursor-pointer active:scale-[0.99] group`}
                                    title="Click to view class summary"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-brand-dark text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                                                    Level {cls.level}
                                                </span>
                                                <h4 className="font-extrabold text-sm text-brand-dark group-hover:underline">{cls.name}</h4>
                                                <span className="text-[10px] bg-black/10 text-brand-dark px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-0.5">
                                                    <span className="material-symbols-rounded text-[11px]">visibility</span>
                                                    <span>Details</span>
                                                </span>
                                            </div>
                                            <p className="text-xs text-zinc-700 font-semibold mt-1">
                                                Instructor: <strong>{cls.instructor}</strong> &bull; {cls.schedule}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); openEditSheet('class', cls); }}
                                                className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-brand-dark flex items-center justify-center transition"
                                                title="Edit Class"
                                            >
                                                <span className="material-symbols-rounded text-xs">edit</span>
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); triggerDeleteConfirmation('class', cls.id, cls.name); }}
                                                className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-zinc-500 hover:text-red-600 flex items-center justify-center transition"
                                                title="Delete Class"
                                            >
                                                <span className="material-symbols-rounded text-xs">delete</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-3 bg-white/70 p-2 rounded-2xl border border-black/10">
                                        <div className="flex justify-between text-[11px] font-extrabold mb-1 text-brand-dark">
                                            <span>Enrolled Learners</span>
                                            <span>{enrolled} / {cls.max_capacity} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className="bg-brand-dark h-full rounded-full transition-all duration-500" 
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedClassRoster(cls.name);
                                                setSheetType('roster');
                                            }}
                                            className="flex-1 bg-brand-dark hover:bg-zinc-800 text-white py-2.5 px-4 rounded-full font-bold text-xs flex items-center justify-between active:scale-95 transition"
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <span className="material-symbols-rounded text-sm">groups</span>
                                                Manage Roster ({enrolled})
                                            </span>
                                            <span className="text-xs">➔</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Assignments Section */}
            {(activeTab === 'overview' || activeTab === 'assignments') && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>Assignments</span>
                                <span className="text-xs bg-brand-yellow px-2 py-0.5 rounded-full font-extrabold">{assignments.length}</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Tap a task to preview instructions &amp; links</p>
                        </div>

                        <button 
                            onClick={() => { setEditingItem(null); setSheetType('create-assignment'); }}
                            className="text-xs font-black text-white bg-brand-dark px-3 py-1.5 rounded-full hover:bg-zinc-800 flex items-center gap-1 active:scale-95 transition shadow-sm"
                        >
                            <span className="material-symbols-rounded text-sm">add</span>
                            <span>New Task</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                        {['all', 'A1', 'A2', 'B1'].map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => setFilterCategory(lvl)}
                                className={`px-3 py-1 rounded-full text-xs font-black transition ${
                                    filterCategory === lvl 
                                        ? 'bg-brand-dark text-white' 
                                        : 'bg-white text-zinc-600 border border-black/10'
                                }`}
                            >
                                {lvl.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        {filteredAssignments.map(asg => (
                            <div 
                                key={asg.id}
                                onClick={() => setViewingItem({ type: 'assignment', data: asg })}
                                className="bg-white rounded-3xl p-4 border-2 border-brand-dark shadow-chunky-sm flex flex-col justify-between cursor-pointer hover:border-black active:scale-[0.99] transition group"
                                title="Click to view full instructions"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="bg-brand-yellowLight text-brand-dark border border-brand-yellow font-black text-[10px] px-2.5 py-0.5 rounded-full">
                                                Level {asg.course_code}
                                            </span>
                                            <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-0.5">
                                                <span className="material-symbols-rounded text-[11px]">visibility</span>
                                                <span>View</span>
                                            </span>
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
                                </div>

                                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between" onClick={e => e.stopPropagation()}>
                                    {asg.external_url ? (
                                        <a 
                                            href={asg.external_url} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            onClick={e => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-dark bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition"
                                        >
                                            <span className="material-symbols-rounded text-sm">link</span>
                                            <span>Worksheet</span>
                                        </a>
                                    ) : (
                                        <span className="text-[11px] font-semibold text-zinc-400">In-app Exercise</span>
                                    )}

                                    <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); openEditSheet('assignment', asg); }}
                                            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition"
                                            title="Edit Assignment"
                                        >
                                            <span className="material-symbols-rounded text-sm">edit</span>
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); triggerDeleteConfirmation('assignment', asg.id, asg.title); }}
                                            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-600 flex items-center justify-center transition"
                                            title="Delete Assignment"
                                        >
                                            <span className="material-symbols-rounded text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredAssignments.length === 0 && (
                            <div className="text-center py-8 bg-white rounded-3xl border-2 border-dashed border-zinc-300 p-6">
                                <p className="text-xs font-bold text-zinc-500">No assignments found for this level.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Bulletins Section */}
            {activeTab === 'overview' && (
                <section className="px-4 mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-brand-dark flex items-center gap-1.5">
                                <span>Bulletin Board</span>
                                <span className="text-xs bg-brand-coral text-white px-2 py-0.5 rounded-full font-extrabold">{notices.length}</span>
                            </h3>
                            <p className="text-[11px] font-bold text-zinc-500">Tap to view full announcement message</p>
                        </div>

                        <button 
                            onClick={() => { setEditingItem(null); setSheetType('create-notice'); }}
                            className="text-xs font-black text-brand-dark bg-white border border-black/10 px-3 py-1.5 rounded-full hover:bg-zinc-100 flex items-center gap-1 active:scale-95 transition"
                        >
                            <span className="material-symbols-rounded text-sm">campaign</span>
                            <span>Post</span>
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        {notices.map(notice => {
                            const isImp = notice.category.toLowerCase() === 'important';
                            return (
                                <div 
                                    key={notice.id}
                                    onClick={() => setViewingItem({ type: 'notice', data: notice })}
                                    className={`p-4 rounded-3xl border-2 border-brand-dark shadow-chunky-sm flex items-start justify-between gap-3 cursor-pointer hover:brightness-95 active:scale-[0.99] transition ${
                                        isImp ? 'bg-brand-coralLight' : 'bg-brand-lavenderLight'
                                    }`}
                                    title="Click to view bulletin notice"
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
                                                <span>View</span>
                                            </span>
                                        </div>
                                        <h4 className="font-black text-sm text-brand-dark">{notice.title}</h4>
                                        <p className="text-xs text-zinc-700 font-medium mt-1 leading-relaxed line-clamp-2">{notice.description}</p>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); openEditSheet('notice', notice); }}
                                            className="w-7 h-7 rounded-full bg-white text-zinc-600 hover:bg-zinc-100 flex items-center justify-center shadow-sm"
                                            title="Edit Notice"
                                        >
                                            <span className="material-symbols-rounded text-xs">edit</span>
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); triggerDeleteConfirmation('notice', notice.id, notice.title); }}
                                            className="w-7 h-7 rounded-full bg-white text-zinc-500 hover:text-red-600 flex items-center justify-center shadow-sm"
                                            title="Delete Notice"
                                        >
                                            <span className="material-symbols-rounded text-xs">close</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
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
                        onClick={() => setActiveTab('live')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'live' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">videocam</span>
                        <span>Live</span>
                    </button>

                    <button
                        onClick={() => { setEditingItem(null); setSheetType('create-assignment'); }}
                        className="w-12 h-12 -mt-4 bg-brand-coral text-white rounded-full flex items-center justify-center border-2 border-brand-dark shadow-chunky-sm active:scale-95 transition transform hover:rotate-12"
                        title="Add New Item"
                    >
                        <span className="material-symbols-rounded text-2xl font-bold">add</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('classes')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'classes' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">school</span>
                        <span>Classes</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('assignments')}
                        className={`flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold transition ${
                            activeTab === 'assignments' ? 'bg-brand-yellow text-brand-dark shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        <span className="material-symbols-rounded text-base">assignment</span>
                        <span>Tasks</span>
                    </button>
                </div>
            </nav>

            {/* Student Roster Bottom Sheet */}
            {sheetType === 'roster' && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between pb-3 border-b border-black/10">
                            <div>
                                <span className="text-[11px] font-black text-brand-coral uppercase tracking-wider">Class Roster</span>
                                <h3 className="text-xl font-black text-brand-dark">{selectedClassRoster}</h3>
                            </div>
                            <button 
                                onClick={() => { setSheetType(null); setRosterSearch(''); }}
                                className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-zinc-600"
                            >
                                <span className="material-symbols-rounded text-sm">close</span>
                            </button>
                        </div>

                        <div className="mt-3 relative">
                            <span className="material-symbols-rounded absolute left-3.5 top-3 text-zinc-400 text-lg">search</span>
                            <input 
                                type="text" 
                                placeholder="Search by name, phone or email..."
                                value={rosterSearch}
                                onChange={e => setRosterSearch(e.target.value)}
                                className="w-full bg-white border-2 border-brand-dark rounded-full pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                            />
                        </div>

                        <div className="my-4 overflow-y-auto space-y-2 flex-1 hide-scrollbar">
                            {students
                                .filter(s => s.class_name === selectedClassRoster)
                                .filter(s => {
                                    const q = rosterSearch.toLowerCase();
                                    return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.phone.includes(q);
                                })
                                .map(std => (
                                    <div 
                                        key={std.id} 
                                        onClick={() => setViewingItem({ type: 'student', data: std })}
                                        className="bg-white p-3.5 rounded-2xl border border-black/10 flex items-center justify-between cursor-pointer hover:border-brand-dark active:scale-[0.99] transition"
                                        title="Click to view student contact card"
                                    >
                                        <div>
                                            <h5 className="font-extrabold text-xs text-brand-dark flex items-center gap-1">
                                                <span>{std.name}</span>
                                                <span className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded-full font-bold">Inspect</span>
                                            </h5>
                                            <p className="text-[11px] text-zinc-500 font-semibold">{std.phone} &bull; {std.email}</p>
                                        </div>
                                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); openEditSheet('student', std); }}
                                                className="text-zinc-500 hover:text-brand-dark p-1.5"
                                                title="Edit student"
                                            >
                                                <span className="material-symbols-rounded text-sm">edit</span>
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); triggerDeleteConfirmation('student', std.id, std.name); }}
                                                className="text-zinc-400 hover:text-red-600 p-1.5"
                                                title="Remove student"
                                            >
                                                <span className="material-symbols-rounded text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {students.filter(s => s.class_name === selectedClassRoster).length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-xs font-bold text-zinc-400">No students enrolled yet.</p>
                                </div>
                            )}
                        </div>

                        <div className="pt-2 border-t border-black/10 flex gap-2">
                            <button 
                                onClick={() => { setEditingItem(null); setSheetType('create-student'); }}
                                className="flex-1 bg-brand-dark hover:bg-zinc-800 text-white py-3 rounded-full font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
                            >
                                <span className="material-symbols-rounded text-sm">person_add</span>
                                <span>Add New Student</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dynamic Form Sheet */}
            {sheetType && (
                sheetType.startsWith('create-') || sheetType.startsWith('edit-')
            ) && (
                <DynamicFormSheet 
                    sheetType={sheetType}
                    classes={classes}
                    selectedClass={selectedClassRoster}
                    initialData={editingItem}
                    onClose={() => { setSheetType(null); setEditingItem(null); }}
                    onSubmit={(payload) => {
                        const isEdit = sheetType.startsWith('edit-');

                        if (sheetType.includes('assignment')) {
                            if (isEdit) {
                                setAssignments(prev => prev.map(a => a.id === editingItem.id ? { ...a, ...payload } : a));
                                showToast('Assignment updated successfully! ✏️');
                            } else {
                                setAssignments(prev => [{ id: Date.now(), ...payload }, ...prev]);
                                showToast('New assignment published! 🎯');
                            }
                        } else if (sheetType.includes('class')) {
                            if (isEdit) {
                                setClasses(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...payload } : c));
                                showToast('Class details updated! ✏️');
                            } else {
                                setClasses(prev => [...prev, { id: Date.now(), student_count: 0, color: 'lavender', ...payload }]);
                                showToast('New class batch created! 🚀');
                            }
                        } else if (sheetType.includes('notice')) {
                            if (isEdit) {
                                setNotices(prev => prev.map(n => n.id === editingItem.id ? { ...n, ...payload } : n));
                                showToast('Bulletin updated! ✏️');
                            } else {
                                setNotices(prev => [{ id: Date.now(), ...payload }, ...prev]);
                                showToast('Bulletin announcement posted! 📢');
                            }
                        } else if (sheetType.includes('student')) {
                            if (isEdit) {
                                setStudents(prev => prev.map(s => s.id === editingItem.id ? { ...s, ...payload } : s));
                                showToast('Student information saved! ✏️');
                            } else {
                                setStudents(prev => [...prev, { id: Date.now(), ...payload }]);
                                showToast('Student registered to class! 🎓');
                            }
                        } else if (sheetType.includes('live-room')) {
                            if (isEdit) {
                                setLiveRooms(prev => prev.map(r => r.id === editingItem.id ? { ...r, ...payload } : r));
                                showToast('Live Google Meet room updated! 🎥');
                            } else {
                                setLiveRooms(prev => [...prev, { id: Date.now(), is_active: false, ...payload }]);
                                showToast('New Live Google Meet room added! 🚀');
                            }
                        }

                        setSheetType(null);
                        setEditingItem(null);
                    }}
                />
            )}

            {/* Confirm Delete Sheet */}
            {sheetType === 'confirm-delete' && pendingDelete && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white w-full max-w-sm rounded-t-4xl sm:rounded-4xl border-2 border-brand-dark shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="material-symbols-rounded text-2xl">delete_forever</span>
                        </div>
                        <h4 className="text-lg font-black text-brand-dark">Confirm Deletion</h4>
                        <p className="text-xs text-zinc-600 font-semibold mt-1">
                            Are you sure you want to remove <strong className="text-brand-dark">"{pendingDelete.title}"</strong>?
                        </p>

                        <div className="mt-5 flex gap-2">
                            <button 
                                onClick={() => { setSheetType(null); setPendingDelete(null); }}
                                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-brand-dark py-2.5 rounded-full font-extrabold text-xs transition"
                            >
                                Keep It
                            </button>
                            <button 
                                onClick={confirmDeletion}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-full font-extrabold text-xs shadow-md transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Log Out Modal */}
            {sheetType === 'confirm-logout' && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white w-full max-w-sm rounded-t-4xl sm:rounded-4xl border-2 border-brand-dark shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                        <div className="w-14 h-14 bg-brand-yellowLight text-brand-dark rounded-full flex items-center justify-center mx-auto mb-3 border border-brand-yellow">
                            <span className="material-symbols-rounded text-2xl">logout</span>
                        </div>
                        <h4 className="text-lg font-black text-brand-dark">Sign Out of Studio?</h4>
                        <p className="text-xs text-zinc-600 font-semibold mt-1">
                            You will be safely logged out from the GermanApp Administrative Portal.
                        </p>

                        <div className="mt-5 flex gap-2">
                            <button 
                                onClick={() => setSheetType(null)}
                                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-brand-dark py-2.5 rounded-full font-extrabold text-xs transition"
                            >
                                Stay Logged In
                            </button>
                            <button 
                                onClick={() => {
                                    setSheetType(null);
                                    showToast('Logged out successfully. Auf Wiedersehen! 👋');
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

            {/* Item Detail Sheet */}
            {viewingItem && (
                <ItemDetailSheet 
                    item={viewingItem}
                    students={students}
                    onClose={() => setViewingItem(null)}
                    onEdit={(type, data) => {
                        setViewingItem(null);
                        openEditSheet(type, data);
                    }}
                    onDelete={(type, id, title) => {
                        setViewingItem(null);
                        triggerDeleteConfirmation(type, id, title);
                    }}
                    onOpenRoster={(className) => {
                        setViewingItem(null);
                        setSelectedClassRoster(className);
                        setSheetType('roster');
                    }}
                    showToast={showToast}
                />
            )}

            {/* Toast Container */}
            {toast && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-brand-dark text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-brand-yellow/30 animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                    <span>{toast}</span>
                </div>
            )}

        </div>
    );
}

function ItemDetailSheet({ item, students, onClose, onEdit, onDelete, onOpenRoster, showToast }) {
    const { type, data } = item;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 max-h-[88vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center font-black text-sm border border-brand-dark">
                            <span className="material-symbols-rounded text-base">
                                {type === 'assignment' ? 'task_alt' :
                                 type === 'class' ? 'school' :
                                 type === 'notice' ? 'campaign' :
                                 type === 'liveRoom' ? 'videocam' : 'badge'}
                            </span>
                        </span>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-brand-coral block">
                                {type === 'assignment' ? 'Assignment Details' :
                                 type === 'class' ? 'Class Batch Summary' :
                                 type === 'notice' ? 'Bulletin Notice' :
                                 type === 'liveRoom' ? 'Live Classroom Info' : 'Student Record'}
                            </span>
                            <h3 className="text-lg font-black text-brand-dark leading-tight">
                                {data.title || data.name || data.group_tag}
                            </h3>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                    >
                        <span className="material-symbols-rounded text-sm">close</span>
                    </button>
                </div>

                <div className="mt-4 space-y-4 text-xs font-semibold text-zinc-700">
                    
                    {/* ASSIGNMENT VIEW */}
                    {type === 'assignment' && (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="bg-brand-dark text-white px-3 py-1 rounded-full text-xs font-black">
                                    Level {data.course_code}
                                </span>
                                <span className="bg-white border border-black/10 text-zinc-600 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                                    <span className="material-symbols-rounded text-sm">event</span>
                                    Deadline: {data.deadline}
                                </span>
                            </div>

                            <div className="bg-white p-4 rounded-3xl border border-black/10 space-y-2">
                                <span className="text-[10px] font-black uppercase text-zinc-400 block tracking-wider">Instructions &amp; Overview</span>
                                <p className="text-xs text-brand-dark font-medium leading-relaxed">
                                    {data.description || 'No detailed instructions provided.'}
                                </p>
                            </div>

                            {data.external_url ? (
                                <div className="bg-brand-yellowLight p-3.5 rounded-3xl border border-brand-yellow flex items-center justify-between">
                                    <div className="flex items-center gap-2 overflow-hidden pr-2">
                                        <span className="material-symbols-rounded text-base text-brand-dark shrink-0">link</span>
                                        <span className="truncate text-[11px] font-bold text-brand-dark">{data.external_url}</span>
                                    </div>
                                    <a 
                                        href={data.external_url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="bg-brand-dark text-white px-3 py-1.5 rounded-full text-[11px] font-black whitespace-nowrap active:scale-95 transition"
                                    >
                                        Open Link
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-zinc-100 p-3 rounded-2xl text-center text-zinc-500 text-[11px] font-bold">
                                    Standard In-App Grammar Exercise
                                </div>
                            )}

                            <div className="pt-2 flex gap-2">
                                <button 
                                    onClick={() => onEdit('assignment', data)}
                                    className="flex-1 bg-white border-2 border-brand-dark py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1 hover:bg-zinc-50"
                                >
                                    <span className="material-symbols-rounded text-sm">edit</span>
                                    <span>Edit Task</span>
                                </button>
                                <button 
                                    onClick={() => onDelete('assignment', data.id, data.title)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 px-4 py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">delete</span>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </>
                    )}

                    {/* CLASS VIEW */}
                    {type === 'class' && (() => {
                        const enrolledList = students.filter(s => s.class_name === data.name);
                        const percentage = Math.min(100, Math.round((enrolledList.length / data.max_capacity) * 100));

                        return (
                            <>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white p-3 rounded-2xl border border-black/10">
                                        <span className="text-[10px] text-zinc-400 font-bold block uppercase">Level</span>
                                        <span className="text-sm font-black text-brand-dark">{data.level}</span>
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl border border-black/10">
                                        <span className="text-[10px] text-zinc-400 font-bold block uppercase">Instructor</span>
                                        <span className="text-sm font-black text-brand-dark">{data.instructor}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-3.5 rounded-2xl border border-black/10">
                                    <span className="text-[10px] text-zinc-400 font-bold block uppercase mb-1">Class Timetable</span>
                                    <div className="flex items-center gap-2 text-brand-dark font-bold text-xs">
                                        <span className="material-symbols-rounded text-base text-brand-coral">schedule</span>
                                        <span>{data.schedule}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-3.5 rounded-2xl border border-black/10">
                                    <div className="flex justify-between text-xs font-black text-brand-dark mb-1.5">
                                        <span>Enrolled Roster</span>
                                        <span>{enrolledList.length} / {data.max_capacity} Seats ({percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-black/10 rounded-full h-2.5 overflow-hidden">
                                        <div 
                                            className="bg-brand-dark h-full rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-zinc-100">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1.5">Recent Students:</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {enrolledList.slice(0, 4).map(s => (
                                                <span key={s.id} className="bg-brand-cream border border-black/10 px-2.5 py-1 rounded-full text-[11px] font-extrabold text-brand-dark">
                                                    {s.name}
                                                </span>
                                            ))}
                                            {enrolledList.length > 4 && (
                                                <span className="bg-zinc-100 text-zinc-500 px-2 py-1 rounded-full text-[10px] font-bold">
                                                    +{enrolledList.length - 4} more
                                                </span>
                                            )}
                                            {enrolledList.length === 0 && (
                                                <span className="text-[11px] text-zinc-400 italic">No students enrolled yet.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 flex gap-2">
                                    <button 
                                        onClick={() => onOpenRoster(data.name)}
                                        className="flex-1 bg-brand-dark hover:bg-zinc-800 text-white py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1 active:scale-95 transition"
                                    >
                                        <span className="material-symbols-rounded text-sm">groups</span>
                                        <span>Open Full Roster</span>
                                    </button>
                                    <button 
                                        onClick={() => onEdit('class', data)}
                                        className="bg-white border-2 border-brand-dark px-3 py-2.5 rounded-full font-black text-xs flex items-center justify-center"
                                        title="Edit Class Details"
                                    >
                                        <span className="material-symbols-rounded text-sm">edit</span>
                                    </button>
                                    <button 
                                        onClick={() => onDelete('class', data.id, data.name)}
                                        className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 px-3 py-2.5 rounded-full font-black text-xs flex items-center justify-center"
                                        title="Delete Class"
                                    >
                                        <span className="material-symbols-rounded text-sm">delete</span>
                                    </button>
                                </div>
                            </>
                        );
                    })()}

                    {/* LIVE ROOM VIEW */}
                    {type === 'liveRoom' && (
                        <>
                            <div className="bg-brand-coral text-white p-4 rounded-3xl border-2 border-brand-dark shadow-chunky-sm space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase bg-white text-brand-coral px-2.5 py-0.5 rounded-full">
                                        Google Meet Classroom
                                    </span>
                                    {data.is_active && (
                                        <span className="bg-brand-yellow text-brand-dark text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                            Session Active
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-xl font-black">{data.group_tag}</h4>
                                <p className="text-xs text-white/90 font-medium">
                                    Instructor: <strong>{data.instructor}</strong> &bull; {data.schedule}
                                </p>
                            </div>

                            <div className="bg-white p-3.5 rounded-2xl border border-black/10 flex items-center justify-between gap-2">
                                <div className="truncate text-xs font-mono text-zinc-600">
                                    {data.meet_url}
                                </div>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard?.writeText(data.meet_url);
                                        showToast('Meet link copied! 📋');
                                    }}
                                    className="bg-zinc-100 hover:bg-zinc-200 text-brand-dark p-2 rounded-full border border-black/10 shrink-0"
                                    title="Copy URL"
                                >
                                    <span className="material-symbols-rounded text-sm">content_copy</span>
                                </button>
                            </div>

                            <a 
                                href={data.meet_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full bg-brand-dark hover:bg-zinc-800 text-white py-3 rounded-full font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition"
                            >
                                <span className="material-symbols-rounded text-base text-brand-coral">video_call</span>
                                <span>Launch Google Meet Session</span>
                                <span className="text-xs">➔</span>
                            </a>

                            <div className="pt-2 flex gap-2">
                                <button 
                                    onClick={() => onEdit('live-room', data)}
                                    className="flex-1 bg-white border-2 border-brand-dark py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">edit</span>
                                    <span>Edit Details</span>
                                </button>
                                <button 
                                    onClick={() => onDelete('liveRoom', data.id, data.group_tag)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 px-4 py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">delete</span>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </>
                    )}

                    {/* BULLETIN NOTICE VIEW */}
                    {type === 'notice' && (
                        <>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                                    data.category.toLowerCase() === 'important' ? 'bg-brand-coral text-white' : 'bg-brand-lavender text-brand-dark'
                                }`}>
                                    Category: {data.category}
                                </span>
                            </div>

                            <div className="bg-white p-4 rounded-3xl border border-black/10 space-y-2">
                                <h4 className="text-base font-black text-brand-dark leading-snug">{data.title}</h4>
                                <p className="text-xs text-zinc-700 font-medium leading-relaxed whitespace-pre-line">
                                    {data.description}
                                </p>
                            </div>

                            <div className="pt-2 flex gap-2">
                                <button 
                                    onClick={() => onEdit('notice', data)}
                                    className="flex-1 bg-white border-2 border-brand-dark py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">edit</span>
                                    <span>Edit Notice</span>
                                </button>
                                <button 
                                    onClick={() => onDelete('notice', data.id, data.title)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 px-4 py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">delete</span>
                                    <span>Remove</span>
                                </button>
                            </div>
                        </>
                    )}

                    {/* STUDENT VIEW */}
                    {type === 'student' && (
                        <>
                            <div className="bg-white p-4 rounded-3xl border border-black/10 text-center">
                                <div className="w-16 h-16 rounded-full bg-brand-yellowLight border-2 border-brand-dark text-brand-dark font-black text-xl flex items-center justify-center mx-auto mb-2">
                                    {data.name.charAt(0)}
                                </div>
                                <h4 className="text-base font-black text-brand-dark">{data.name}</h4>
                                <span className="bg-brand-lavender text-brand-dark text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block mt-1">
                                    {data.class_name}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <a 
                                    href={`tel:${data.phone}`} 
                                    className="bg-white p-3 rounded-2xl border border-black/10 flex items-center justify-between hover:bg-zinc-50"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-rounded text-base text-brand-coral">call</span>
                                        <span className="font-bold text-xs text-brand-dark">{data.phone}</span>
                                    </div>
                                    <span className="text-[10px] font-extrabold text-zinc-400">Call ➔</span>
                                </a>

                                <a 
                                    href={`mailto:${data.email}`} 
                                    className="bg-white p-3 rounded-2xl border border-black/10 flex items-center justify-between hover:bg-zinc-50"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-rounded text-base text-brand-yellow">mail</span>
                                        <span className="font-bold text-xs text-brand-dark">{data.email}</span>
                                    </div>
                                    <span className="text-[10px] font-extrabold text-zinc-400">Email ➔</span>
                                </a>
                            </div>

                            <div className="pt-2 flex gap-2">
                                <button 
                                    onClick={() => onEdit('student', data)}
                                    className="flex-1 bg-white border-2 border-brand-dark py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">edit</span>
                                    <span>Edit Profile</span>
                                </button>
                                <button 
                                    onClick={() => onDelete('student', data.id, data.name)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 px-4 py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-rounded text-sm">delete</span>
                                    <span>Drop</span>
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

function DynamicFormSheet({ sheetType, classes, selectedClass, initialData, onClose, onSubmit }) {
    const isEdit = sheetType.startsWith('edit-');
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const getTitle = () => {
        if (sheetType.includes('assignment')) return isEdit ? 'Edit Assignment' : 'Create Assignment';
        if (sheetType.includes('class')) return isEdit ? 'Edit Class Batch' : 'Create Class Batch';
        if (sheetType.includes('notice')) return isEdit ? 'Edit Bulletin' : 'Post Announcement';
        if (sheetType.includes('student')) return isEdit ? 'Edit Student Details' : 'Enroll Student';
        if (sheetType.includes('live-room')) return isEdit ? 'Edit Live Google Meet Room' : 'Add Live Google Meet Room';
        return 'Configure Item';
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                            {isEdit ? 'Update existing record' : 'Add new entry'}
                        </span>
                        <h3 className="text-xl font-black text-brand-dark">{getTitle()}</h3>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center">
                        <span className="material-symbols-rounded text-sm">close</span>
                    </button>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }} className="mt-4 space-y-3">
                    
                    {/* Assignment Fields */}
                    {sheetType.includes('assignment') && (
                        <>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Level</label>
                                <select 
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    value={formData.course_code || 'A1'}
                                    onChange={e => setFormData({ ...formData, course_code: e.target.value })}
                                >
                                    <option value="A1">A1 (Beginner)</option>
                                    <option value="A2">A2 (Elementary)</option>
                                    <option value="B1">B1 (Intermediate)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Title</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.title || ''}
                                    placeholder="e.g. Kapitel 4: Akkusativ Übungen"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Instructions / Description</label>
                                <textarea 
                                    rows="2"
                                    value={formData.description || ''}
                                    placeholder="Details of the worksheet or vocabulary..."
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Worksheet URL (Optional)</label>
                                <input 
                                    type="url" 
                                    value={formData.external_url || ''}
                                    placeholder="https://"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, external_url: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Due Deadline</label>
                                <input 
                                    type="date" 
                                    required
                                    value={formData.deadline || ''}
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {/* Class Batch Fields */}
                    {sheetType.includes('class') && (
                        <>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Group Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.name || ''}
                                    placeholder="e.g. Group 8 (Weekend Evening)"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Course Level</label>
                                <select 
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    value={formData.level || 'A1'}
                                    onChange={e => setFormData({ ...formData, level: e.target.value })}
                                >
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="B1">B1</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Instructor</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.instructor || ''}
                                    placeholder="e.g. Herr Issa"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Schedule</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.schedule || ''}
                                    placeholder="e.g. Sat & Sun @ 8:00 PM"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, schedule: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Max Capacity</label>
                                <input 
                                    type="number" 
                                    value={formData.max_capacity ?? 20}
                                    min="1"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, max_capacity: parseInt(e.target.value, 10) || 20 })}
                                />
                            </div>
                        </>
                    )}

                    {/* Live Google Meet Room Fields */}
                    {sheetType.includes('live-room') && (
                        <>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Batch / Group Tag</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.group_tag || ''}
                                    placeholder="e.g. Group 5 (Intensive)"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, group_tag: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Instructor Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.instructor || ''}
                                    placeholder="e.g. Herr Issa"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Schedule Details</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.schedule || ''}
                                    placeholder="e.g. Mon & Wed @ 8:00 PM"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, schedule: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Google Meet URL</label>
                                <input 
                                    type="url" 
                                    required
                                    value={formData.meet_url || ''}
                                    placeholder="https://meet.google.com/..."
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, meet_url: e.target.value })}
                                />
                            </div>
                            <div className="pt-1">
                                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brand-dark">
                                    <input 
                                        type="checkbox"
                                        checked={!!formData.is_active}
                                        onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-4 h-4 accent-brand-coral rounded"
                                    />
                                    <span>Highlight as Active Classroom</span>
                                </label>
                            </div>
                        </>
                    )}

                    {/* Bulletin Notice Fields */}
                    {sheetType.includes('notice') && (
                        <>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Category</label>
                                <select 
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    value={formData.category || 'Important'}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Important">🔴 Important</option>
                                    <option value="Notification">🔵 Notification</option>
                                    <option value="System">⚪ System</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Title</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.title || ''}
                                    placeholder="e.g. Schedule Alteration"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Details</label>
                                <textarea 
                                    rows="3"
                                    required
                                    value={formData.description || ''}
                                    placeholder="Write your bulletin announcement..."
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                        </>
                    )}

                    {/* Student Fields */}
                    {sheetType.includes('student') && (
                        <>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.name || ''}
                                    placeholder="e.g. Maya Lin"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Phone</label>
                                <input 
                                    type="tel" 
                                    required 
                                    value={formData.phone || ''}
                                    placeholder="+601..."
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Email</label>
                                <input 
                                    type="email" 
                                    required 
                                    value={formData.email || ''}
                                    placeholder="maya@example.com"
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider block mb-1">Assign to Class</label>
                                <select 
                                    className="w-full bg-white border-2 border-brand-dark rounded-2xl px-3.5 py-2.5 text-xs font-bold"
                                    value={formData.class_name || selectedClass || classes[0]?.name || ''}
                                    onChange={e => setFormData({ ...formData, class_name: e.target.value })}
                                >
                                    {classes.map(c => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="pt-3 flex gap-2">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 bg-white border-2 border-brand-dark py-3 rounded-full font-bold text-xs active:scale-95 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 bg-brand-dark text-white py-3 rounded-full font-extrabold text-xs shadow-md active:scale-95 transition"
                        >
                            {isEdit ? 'Save Changes' : 'Publish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);