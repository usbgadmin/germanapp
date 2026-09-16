/**
 * GermanApp Online - B1 Course Map Application
 * File: js/course-map-b1.js
 * Context: React 18 frontend script for b1-course-map.html
 */

const { useState, useEffect, useMemo } = React;

const STORAGE_KEY_PROGRESS = 'germanapp_b1_progress';

// Full B1 Curriculum Data (Coursebook & Workbook 1-12 + PDFs)
const B1_CHAPTERS_DATA = [
    // B1.1 (Chapters 1 - 6)
    { id: 1, part: 'B1.1', title: 'Gute Reise!', subtitle: 'Travel, bookings, transport & expressing preferences', coursebookUrl: 'b1_course/b1_coursebook/cp1-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp1-b1workbook.html', pdfUrl: 'pdfs/b1_cp1_grammar.pdf', grammarFocus: 'Temporale Nebensätze mit während & bevor' },
    { id: 2, part: 'B1.1', title: 'Das ist ja praktisch!', subtitle: 'Technology, everyday gadgets & complaining politely', coursebookUrl: 'b1_course/b1_coursebook/cp2-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp2-b1workbook.html', pdfUrl: 'pdfs/b1_cp2_grammar.pdf', grammarFocus: 'Relativsätze mit Präpositionen' },
    { id: 3, part: 'B1.1', title: 'Veränderungen', subtitle: 'Life stages, milestones & personal decisions', coursebookUrl: 'b1_course/b1_coursebook/cp3-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp3-b1workbook.html', pdfUrl: 'pdfs/b1_cp3_grammar.pdf', grammarFocus: 'Passiv in Präsens und Präteritum' },
    { id: 4, part: 'B1.1', title: 'Arbeitswelt', subtitle: 'Workplace culture, applications & career dreams', coursebookUrl: 'b1_course/b1_coursebook/cp4-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp4-b1workbook.html', pdfUrl: 'pdfs/b1_cp4_grammar.pdf', grammarFocus: 'Infinitiv mit zu & Konjunktiv II Höflichkeit' },
    { id: 5, part: 'B1.1', title: 'Umweltfreundlich?', subtitle: 'Ecology, sustainability & future projections', coursebookUrl: 'b1_course/b1_coursebook/cp5-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp5-b1workbook.html', pdfUrl: 'pdfs/b1_cp5grammar.pdf', grammarFocus: 'Futur I & Verben mit Präpositionalergänzung' },
    { id: 6, part: 'B1.1', title: 'Blick nach vorn', subtitle: 'Aspirations, society & reviewing Level B1.1', coursebookUrl: 'b1_course/b1_coursebook/cp6-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp6-b1workbook.html', pdfUrl: 'pdfs/b1_cp6_grammar.pdf', grammarFocus: 'Nebensätze mit da, sodass & damit' },

    // B1.2 (Chapters 7 - 12)
    { id: 7, part: 'B1.2', title: 'Zwischenmenschliches', subtitle: 'Relationships, emotions & conflict resolution', coursebookUrl: 'b1_course/b1_coursebook/cp7-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp7-b1workbook.html', pdfUrl: 'pdfs/b1_cp7_grammar.pdf', grammarFocus: 'Zweiteilige Konnektoren (sowohl... als auch)' },
    { id: 8, part: 'B1.2', title: 'Rund um Körper und Geist', subtitle: 'Health, wellness, fitness & medical advice', coursebookUrl: 'b1_course/b1_coursebook/cp8-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp8-b1workbook.html', pdfUrl: 'pdfs/b1_cp8_grammar.pdf', grammarFocus: 'Konzessive Nebensätze mit obwohl & trotzdem' },
    { id: 9, part: 'B1.2', title: 'Kunststücke', subtitle: 'Arts, theater, music & cultural critique', coursebookUrl: 'b1_course/b1_coursebook/cp9-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp9-b1workbook.html', pdfUrl: 'pdfs/b1_cp9_grammar.pdf', grammarFocus: 'Partizip I und II als Adjektive' },
    { id: 10, part: 'B1.2', title: 'Miteinander', subtitle: 'Volunteering, communities & diverse lifestyles', coursebookUrl: 'b1_course/b1_coursebook/cp10-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp10-b1workbook.html', pdfUrl: 'pdfs/b1_cp10_grammar.pdf', grammarFocus: 'Relativpronomen im Genitiv (dessen, deren)' },
    { id: 11, part: 'B1.2', title: 'Stadt, Land, Fluss', subtitle: 'Urban vs. rural living, geography & nature', coursebookUrl: 'b1_course/b1_coursebook/cp11-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp11-b1workbook.html', pdfUrl: 'pdfs/b1_cp11_grammar.pdf', grammarFocus: 'Konnektoren: je... desto / umso' },
    { id: 12, part: 'B1.2', title: 'Geld regiert die Welt?', subtitle: 'Economy, finances, trade & B1 Exam Readiness', coursebookUrl: 'b1_course/b1_coursebook/cp12-b1coursebook.html', workbookUrl: 'b1_course/b1_workbook/cp12-b1workbook.html', pdfUrl: 'pdfs/b1_cp12_grammar.pdf', grammarFocus: 'Zustandspassiv & Konjunktiv II Vergangenheit' }
];

const FritzMascot = ({ className = "w-24 h-24" }) => (
    <svg viewBox="0 0 160 170" className={`${className} animate-mascot drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <path d="M52 74 C52 74 62 66 80 66 C98 66 108 74 108 74 L106 114 H54 Z" fill="#FFFFFF" stroke="#161618" strokeWidth="4" strokeLinejoin="round" />
        <path d="M63 72 L64 114" stroke="#4A2D17" strokeWidth="6" strokeLinecap="round" />
        <path d="M97 72 L96 114" stroke="#4A2D17" strokeWidth="6" strokeLinecap="round" />
        <rect x="62" y="86" width="36" height="11" rx="3" fill="#4A2D17" stroke="#161618" strokeWidth="2.5" />
        <circle cx="80" cy="91.5" r="2.5" fill="#FFFFFF" />
        <circle cx="80" cy="91.5" r="1" fill="#FED74C" />
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
    </svg>
);

const GermanFlagIcon = ({ className = "w-8 h-8" }) => (
    <div className={`${className} bg-brand-yellowLight rounded-xl border border-brand-dark flex items-center justify-center overflow-hidden shrink-0 shadow-chunky-sm`}>
        <svg viewBox="0 0 64 64" className="w-full h-full p-0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="flagRoundedClipNav">
                <rect x="4" y="10" width="56" height="44" rx="12" />
            </clipPath>
            <g clipPath="url(#flagRoundedClipNav)">
                <rect x="4" y="10" width="56" height="14.66" fill="#161618" />
                <rect x="4" y="24.66" width="56" height="14.68" fill="#E11D48" />
                <rect x="4" y="39.34" width="56" height="14.66" fill="#FED74C" />
                <path d="M4 10 L60 10 L4 44 Z" fill="#FFFFFF" opacity="0.15" />
            </g>
            <rect x="4" y="10" width="56" height="44" rx="12" stroke="#161618" strokeWidth="3" fill="none" />
        </svg>
    </div>
);

function App() {
    const [activeSublevel, setActiveSublevel] = useState('b1-1');
    const [bookFilter, setBookFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [completedChapters, setCompletedChapters] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
            return saved ? JSON.parse(saved) : { cb: [1, 2], wb: [1] };
        } catch (e) {
            return { cb: [1, 2], wb: [1] };
        }
    });

    const [selectedChapter, setSelectedChapter] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(completedChapters));
        } catch (e) {}
    }, [completedChapters]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const toggleChapterDone = (type, chapterId) => {
        setCompletedChapters(prev => {
            const list = prev[type] || [];
            const isDone = list.includes(chapterId);
            const updated = isDone ? list.filter(id => id !== chapterId) : [...list, chapterId];
            showToast(isDone ? `Marked Ch. ${chapterId} as incomplete` : `🎉 Ch. ${chapterId} marked completed!`);
            return { ...prev, [type]: updated };
        });
    };

    const totalModules = B1_CHAPTERS_DATA.length * 2;
    const doneModules = (completedChapters.cb?.length || 0) + (completedChapters.wb?.length || 0);
    const overallPercent = Math.min(100, Math.round((doneModules / totalModules) * 100));

    const filteredChapters = useMemo(() => {
        const targetPart = activeSublevel === 'b1-1' ? 'B1.1' : activeSublevel === 'b1-2' ? 'B1.2' : null;

        return B1_CHAPTERS_DATA.filter(ch => {
            if (targetPart && ch.part !== targetPart) return false;
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
                ch.title.toLowerCase().includes(q) ||
                ch.subtitle.toLowerCase().includes(q) ||
                ch.grammarFocus.toLowerCase().includes(q) ||
                ch.id.toString() === q
            );
        });
    }, [activeSublevel, searchQuery]);

    return (
        <div className="w-full max-w-md md:max-w-xl mx-auto min-h-screen bg-brand-cream pb-32 relative shadow-2xl overflow-x-hidden">
            
            {/* Header */}
            <header className="sticky top-0 z-30 bg-brand-cream/95 backdrop-blur-md px-5 pt-4 pb-3 border-b-2 border-brand-dark/10 flex items-center justify-between">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-dark text-white px-3 py-1 rounded-full text-xs font-black tracking-wide">
                        <span>GermanApp</span>
                        <span className="text-brand-coral">✦</span>
                        <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">Curriculum Map</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-brand-dark mt-1 flex items-center gap-2">
                        <span>Level B1: Intermediate</span>
                    </h1>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowProfileDropdown(prev => !prev)}
                        className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 text-brand-dark p-1 sm:px-2.5 sm:py-1 rounded-full border-2 border-brand-dark shadow-chunky-sm active:translate-y-0.5 transition"
                        aria-expanded={showProfileDropdown}
                        aria-label="Open User Menu"
                    >
                        <GermanFlagIcon className="w-8 h-8" />
                        <span className="material-symbols-rounded text-base text-brand-dark hidden sm:inline">
                            {showProfileDropdown ? 'expand_less' : 'expand_more'}
                        </span>
                    </button>

                    {showProfileDropdown && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-brand-dark rounded-2xl shadow-chunky p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                                <div className="px-3 py-2 border-b border-zinc-100 mb-1 flex items-center gap-2.5">
                                    <GermanFlagIcon className="w-7 h-7 rounded-lg" />
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block leading-tight">Student Account</span>
                                        <span className="text-xs font-black text-brand-dark">German Learner</span>
                                    </div>
                                </div>

                                <a
                                    href="student-portal.html"
                                    onClick={() => setShowProfileDropdown(false)}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-brand-dark hover:bg-brand-yellowLight transition"
                                >
                                    <span className="material-symbols-rounded text-base text-brand-coral">dashboard</span>
                                    <span>Portal</span>
                                </a>

                                <hr className="my-1 border-zinc-100" />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowProfileDropdown(false);
                                        setShowLogoutModal(true);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-red-600 hover:bg-red-50 transition text-left"
                                >
                                    <span className="material-symbols-rounded text-base">logout</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </header>

            {/* Level Switcher */}
            <div className="px-4 pt-3">
                <div className="bg-white border-2 border-brand-dark rounded-2xl p-1.5 shadow-chunky-sm flex items-center justify-between gap-1.5">
                    <a href="course-map-a1.html" className="flex-1 text-center py-2 rounded-xl text-xs font-black text-zinc-600 hover:text-brand-dark hover:bg-zinc-100 transition">
                        Level A1
                    </a>
                    <a href="course-map-a2.html" className="flex-1 text-center py-2 rounded-xl text-xs font-black text-zinc-600 hover:text-brand-dark hover:bg-zinc-100 transition">
                        Level A2
                    </a>
                    <div className="flex-1 text-center py-2 rounded-xl text-xs font-black bg-brand-coral text-white border border-brand-dark shadow-chunky-sm">
                        Level B1 ✦
                    </div>
                </div>
            </div>

            {/* Hero Card */}
            <section className="px-4 pt-3">
                <div className="bg-brand-coralLight rounded-4xl p-5 sm:p-6 border-3 border-brand-dark shadow-chunky relative overflow-hidden">
                    <span className="absolute top-4 right-6 text-xl">✦</span>
                    <span className="absolute bottom-4 left-6 text-xl">♥</span>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="max-w-[64%]">
                            <div className="inline-flex items-center gap-1.5 bg-brand-coral text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                                <span>Zertifikat B1 Prep</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark leading-tight tracking-tight">
                                B1 Course Map
                            </h2>
                            <p className="text-xs font-semibold text-brand-dark/85 mt-1.5 leading-relaxed">
                                12 interactive chapters covering complex grammar, work life, travel, and Goethe B1 exam readiness.
                            </p>
                        </div>

                        <div className="w-24 flex justify-center items-center">
                            <FritzMascot className="w-24 h-24" />
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-brand-dark/15">
                        <div className="flex items-center justify-between text-xs font-black text-brand-dark mb-1">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-rounded text-sm text-brand-coral">trophy</span>
                                <span>B1 Completion Progress</span>
                            </span>
                            <span>{doneModules} / {totalModules} Completed ({overallPercent}%)</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-3 border-2 border-brand-dark overflow-hidden">
                            <div className="bg-brand-coral h-full rounded-full transition-all duration-500" style={{ width: `${overallPercent}%` }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="px-4 mt-5">
                <div className="flex items-center gap-2 p-1.5 bg-white border-2 border-brand-dark rounded-3xl shadow-chunky-sm">
                    <button
                        onClick={() => setActiveSublevel('b1-1')}
                        className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                            activeSublevel === 'b1-1'
                                ? 'bg-brand-yellow text-brand-dark border-2 border-brand-dark shadow-chunky-sm'
                                : 'text-zinc-600 hover:text-brand-dark'
                        }`}
                    >
                        <span className="material-symbols-rounded text-sm">menu_book</span>
                        <span>B1.1 (Ch. 1–6)</span>
                    </button>

                    <button
                        onClick={() => setActiveSublevel('b1-2')}
                        className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                            activeSublevel === 'b1-2'
                                ? 'bg-brand-lavender text-brand-dark border-2 border-brand-dark shadow-chunky-sm'
                                : 'text-zinc-600 hover:text-brand-dark'
                        }`}
                    >
                        <span className="material-symbols-rounded text-sm">menu_book</span>
                        <span>B1.2 (Ch. 7–12)</span>
                    </button>

                    <button
                        onClick={() => setActiveSublevel('vocab')}
                        className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                            activeSublevel === 'vocab'
                                ? 'bg-brand-coral text-white border-2 border-brand-dark shadow-chunky-sm'
                                : 'text-zinc-600 hover:text-brand-dark'
                        }`}
                    >
                        <span className="material-symbols-rounded text-sm">folder</span>
                        <span>Additional Materials</span>
                    </button>
                </div>
            </section>

            {/* Search & Book Filter */}
            {activeSublevel !== 'vocab' && (
                <section className="px-4 mt-4 space-y-2.5">
                    <div className="relative">
                        <span className="material-symbols-rounded absolute left-3.5 top-2.5 text-zinc-400 text-lg">search</span>
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search chapter title, grammar focus..."
                            className="w-full bg-white border-2 border-brand-dark rounded-2xl pl-10 pr-9 py-2 text-xs font-bold text-brand-dark placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-coral shadow-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-zinc-400 hover:text-brand-dark">
                                <span className="material-symbols-rounded text-base">cancel</span>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-1.5 text-xs font-black">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Show:</span>
                        <div className="flex items-center gap-1.5 flex-1 justify-end">
                            <button
                                onClick={() => setBookFilter('all')}
                                className={`px-3 py-1 rounded-full border text-[11px] font-black transition ${
                                    bookFilter === 'all'
                                        ? 'bg-brand-dark text-white border-brand-dark'
                                        : 'bg-white text-zinc-600 border-black/15'
                                }`}
                            >
                                All Books
                            </button>
                            <button
                                onClick={() => setBookFilter('coursebook')}
                                className={`px-3 py-1 rounded-full border text-[11px] font-black transition flex items-center gap-1 ${
                                    bookFilter === 'coursebook'
                                        ? 'bg-brand-yellow text-brand-dark border-brand-dark font-black'
                                        : 'bg-white text-zinc-600 border-black/15'
                                }`}
                            >
                                <span>Coursebook</span>
                            </button>
                            <button
                                onClick={() => setBookFilter('workbook')}
                                className={`px-3 py-1 rounded-full border text-[11px] font-black transition flex items-center gap-1 ${
                                    bookFilter === 'workbook'
                                        ? 'bg-brand-lavender text-brand-dark border-brand-dark font-black'
                                        : 'bg-white text-zinc-600 border-black/15'
                                }`}
                            >
                                <span>Workbook</span>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Chapter List */}
            {activeSublevel !== 'vocab' && (
                <section className="px-4 mt-4 space-y-3">
                    {filteredChapters.map(ch => {
                        const isCbDone = completedChapters.cb?.includes(ch.id);
                        const isWbDone = completedChapters.wb?.includes(ch.id);

                        return (
                            <div key={ch.id} className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-brand-dark shadow-chunky-sm transition hover:-translate-y-0.5">
                                <div className="flex items-start justify-between gap-2.5">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="w-10 h-10 rounded-2xl bg-brand-yellowLight border-2 border-brand-dark text-brand-dark font-black text-base flex items-center justify-center shrink-0 shadow-chunky-sm">
                                            {ch.id}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md border border-black/10">
                                                    {ch.part} &bull; Kapitel {ch.id}
                                                </span>
                                                <span className="text-[10px] font-bold text-zinc-400">
                                                    {isCbDone && isWbDone ? '✦ Completed' : isCbDone || isWbDone ? 'In Progress' : 'Not Started'}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-black text-brand-dark mt-1 leading-tight">{ch.title}</h3>
                                            <p className="text-xs font-semibold text-zinc-600 mt-0.5 leading-relaxed">{ch.subtitle}</p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setSelectedChapter(ch)}
                                        className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-brand-dark flex items-center justify-center border border-black/10 shrink-0 transition"
                                        title="View Grammar & Details"
                                    >
                                        <span className="material-symbols-rounded text-base">info</span>
                                    </button>
                                </div>

                                <div className="mt-3 p-2 bg-brand-cream rounded-xl border border-black/10 flex items-center justify-between text-[11px] font-semibold text-zinc-700">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <span className="material-symbols-rounded text-sm text-brand-coral">psychology</span>
                                        <span className="truncate"><strong>Fokus:</strong> {ch.grammarFocus}</span>
                                    </div>
                                </div>

                                <div className="mt-3.5 pt-3 border-t border-zinc-100 space-y-2">
                                    {(bookFilter === 'all' || bookFilter === 'coursebook') && (
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow border border-brand-dark"></span>
                                                <span className="text-xs font-black text-brand-dark">Coursebook</span>
                                                {isCbDone && (
                                                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                                                        Done
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <button 
                                                    onClick={() => toggleChapterDone('cb', ch.id)}
                                                    className={`p-1.5 rounded-full border border-black/20 text-xs transition ${
                                                        isCbDone ? 'bg-emerald-500 text-white' : 'bg-white text-zinc-400 hover:text-brand-dark'
                                                    }`}
                                                    title={isCbDone ? 'Mark as incomplete' : 'Mark as done'}
                                                >
                                                    <span className="material-symbols-rounded text-sm">
                                                        {isCbDone ? 'check' : 'radio_button_unchecked'}
                                                    </span>
                                                </button>
                                                <a 
                                                    href={ch.coursebookUrl}
                                                    className="bg-brand-dark hover:bg-zinc-800 text-white font-black text-xs px-3.5 py-1.5 rounded-full border border-brand-dark shadow-chunky-sm active:translate-y-0.5 transition flex items-center gap-1"
                                                >
                                                    <span>Start Coursebook</span>
                                                    <span className="material-symbols-rounded text-xs">arrow_forward</span>
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {(bookFilter === 'all' || bookFilter === 'workbook') && (
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-brand-lavender border border-brand-dark"></span>
                                                <span className="text-xs font-black text-brand-dark">Workbook</span>
                                                {isWbDone && (
                                                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                                                        Done
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <button 
                                                    onClick={() => toggleChapterDone('wb', ch.id)}
                                                    className={`p-1.5 rounded-full border border-black/20 text-xs transition ${
                                                        isWbDone ? 'bg-emerald-500 text-white' : 'bg-white text-zinc-400 hover:text-brand-dark'
                                                    }`}
                                                    title={isWbDone ? 'Mark as incomplete' : 'Mark as done'}
                                                >
                                                    <span className="material-symbols-rounded text-sm">
                                                        {isWbDone ? 'check' : 'radio_button_unchecked'}
                                                    </span>
                                                </button>
                                                <a 
                                                    href={ch.workbookUrl}
                                                    className="bg-brand-lavender hover:bg-brand-yellow text-brand-dark font-black text-xs px-3.5 py-1.5 rounded-full border border-brand-dark shadow-chunky-sm active:translate-y-0.5 transition flex items-center gap-1"
                                                >
                                                    <span>Open Workbook</span>
                                                    <span className="material-symbols-rounded text-xs">edit</span>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {filteredChapters.length === 0 && (
                        <div className="text-center py-10 bg-white rounded-3xl border-2 border-dashed border-zinc-300 p-6">
                            <p className="text-xs font-bold text-zinc-500">No chapters match your search query.</p>
                            <button onClick={() => setSearchQuery('')} className="mt-2 text-xs font-black text-brand-coral underline">
                                Clear Search
                            </button>
                        </div>
                    )}
                </section>
            )}

            {/* Additional Materials */}
            {activeSublevel === 'vocab' && (
                <section className="px-4 mt-4 space-y-3">
                    <div className="bg-brand-coral text-white rounded-3xl p-5 border-3 border-brand-dark shadow-chunky relative overflow-hidden">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <span className="bg-white text-brand-coral text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5">
                                    Master Reference
                                </span>
                                <h3 className="text-lg font-black leading-tight">Complete B1 Grammar &amp; Vocab Bundle</h3>
                                <p className="text-xs text-white/90 font-medium mt-1 leading-relaxed">
                                    All 12 chapters bundled with full grammar explanations, vocabulary lists, and exam phrase sheets.
                                </p>
                            </div>
                            <span className="material-symbols-rounded text-3xl opacity-80 shrink-0">auto_stories</span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/20">
                            <a 
                                href="pdfs/b1_complete_grammar.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-white text-brand-dark font-black text-xs py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-100 shadow-sm active:translate-y-0.5 transition"
                            >
                                <span className="material-symbols-rounded text-base text-brand-coral">download</span>
                                <span>Download Complete Bundle (PDF)</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <h4 className="text-sm font-black text-brand-dark flex items-center gap-1.5">
                            <span>Individual Chapter Grammar Sheets</span>
                            <span className="text-[10px] bg-brand-yellow px-2 py-0.5 rounded-full font-extrabold">12 PDFs</span>
                        </h4>
                    </div>

                    <div className="space-y-2.5">
                        {B1_CHAPTERS_DATA.map(ch => (
                            <div key={ch.id} className="bg-white rounded-2xl p-3.5 border-2 border-brand-dark shadow-chunky-sm flex items-center justify-between gap-3 hover:border-black transition">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <span className="w-8 h-8 rounded-xl bg-brand-cream border border-brand-dark text-brand-dark font-black text-xs flex items-center justify-center shrink-0">
                                        {ch.id}
                                    </span>
                                    <div className="truncate">
                                        <h5 className="text-xs font-black text-brand-dark truncate">{ch.title}</h5>
                                        <p className="text-[11px] text-zinc-500 font-medium truncate">{ch.grammarFocus}</p>
                                    </div>
                                </div>

                                <a 
                                    href={ch.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-brand-lavenderLight hover:bg-brand-lavender text-brand-dark font-black text-xs px-3 py-1.5 rounded-full border border-brand-dark shadow-chunky-sm shrink-0 flex items-center gap-1 transition"
                                >
                                    <span className="material-symbols-rounded text-sm">download</span>
                                    <span>PDF</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Chapter Modal */}
            {selectedChapter && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-brand-cream w-full max-w-md rounded-t-5xl sm:rounded-5xl border-t-2 sm:border-2 border-brand-dark shadow-2xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between pb-3 border-b border-black/10">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-brand-coral text-white font-black text-xs flex items-center justify-center border border-brand-dark">
                                    {selectedChapter.id}
                                </span>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-coral">Chapter Summary</span>
                                    <h3 className="text-lg font-black text-brand-dark leading-tight">{selectedChapter.title}</h3>
                                </div>
                            </div>
                            <button onClick={() => setSelectedChapter(null)} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100">
                                <span className="material-symbols-rounded text-sm">close</span>
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className="bg-white p-3.5 rounded-2xl border border-black/10">
                                <span className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Topics &amp; Competencies</span>
                                <p className="text-xs text-brand-dark font-semibold leading-relaxed">{selectedChapter.subtitle}</p>
                            </div>

                            <div className="bg-white p-3.5 rounded-2xl border border-black/10">
                                <span className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Key Grammar Target</span>
                                <p className="text-xs text-brand-coral font-black leading-relaxed">{selectedChapter.grammarFocus}</p>
                            </div>

                            <div className="pt-2 flex flex-col gap-2">
                                <a href={selectedChapter.coursebookUrl} className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-dark py-3 rounded-full font-black text-xs flex items-center justify-center gap-2 border-2 border-brand-dark shadow-chunky-sm active:translate-y-0.5 transition">
                                    <span className="material-symbols-rounded text-base">menu_book</span>
                                    <span>Launch Coursebook Chapter {selectedChapter.id}</span>
                                    <span>➔</span>
                                </a>

                                <a href={selectedChapter.workbookUrl} className="w-full bg-brand-lavender hover:bg-brand-lavenderLight text-brand-dark py-3 rounded-full font-black text-xs flex items-center justify-center gap-2 border-2 border-brand-dark shadow-chunky-sm active:translate-y-0.5 transition">
                                    <span className="material-symbols-rounded text-base">edit_note</span>
                                    <span>Launch Workbook Exercises {selectedChapter.id}</span>
                                    <span>➔</span>
                                </a>

                                <a href={selectedChapter.pdfUrl} target="_blank" rel="noreferrer" className="w-full bg-white hover:bg-zinc-100 text-brand-dark py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-2 border border-black/20 active:translate-y-0.5 transition">
                                    <span className="material-symbols-rounded text-base text-brand-coral">download</span>
                                    <span>Download Chapter PDF Summary</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white w-full max-w-sm rounded-t-4xl sm:rounded-4xl border-2 border-brand-dark shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-200">
                            <span className="material-symbols-rounded text-2xl font-bold">logout</span>
                        </div>
                        <h4 className="text-lg font-black text-brand-dark">Sign Out of GermanApp?</h4>
                        <p className="text-xs text-zinc-600 font-semibold mt-1">
                            Your chapter progress is saved. You can sign back in anytime to continue learning.
                        </p>

                        <div className="mt-5 flex gap-2">
                            <button onClick={() => setShowLogoutModal(false)} className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-brand-dark py-2.5 rounded-full font-extrabold text-xs transition">
                                Stay
                            </button>
                            <button 
                                onClick={async () => {
                                    try {
                                        await fetch('/api/logout', { method: 'POST' });
                                    } catch (e) {}
                                    window.location.href = 'index.html';
                                }}
                                className="flex-1 bg-brand-coral hover:bg-red-600 text-white py-2.5 rounded-full font-extrabold text-xs shadow-md transition"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Feedback */}
            {toastMessage && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-brand-dark text-white text-xs font-black px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-brand-yellow animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Footer Dock */}
            <nav className="fixed bottom-3 left-0 right-0 z-40 max-w-md md:max-w-xl mx-auto px-4 pointer-events-none">
                <div className="bg-brand-dark/95 text-white backdrop-blur-lg p-2 rounded-full border-2 border-brand-dark shadow-2xl flex items-center justify-between pointer-events-auto">
                    <a href="student-portal.html" className="flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold text-zinc-400 hover:text-white transition">
                        <span className="material-symbols-rounded text-base">dashboard</span>
                        <span>Portal</span>
                    </a>

                    <a href="course-map-a1.html" className="flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold text-zinc-400 hover:text-white transition">
                        <span className="material-symbols-rounded text-base">school</span>
                        <span>A1</span>
                    </a>

                    <a href="course-map-a2.html" className="flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold text-zinc-400 hover:text-white transition">
                        <span className="material-symbols-rounded text-base">school</span>
                        <span>A2</span>
                    </a>

                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5 text-[10px] font-extrabold bg-brand-yellow text-brand-dark shadow-sm transition">
                        <span className="material-symbols-rounded text-base">map</span>
                        <span>B1 Map</span>
                    </button>
                </div>
            </nav>

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);