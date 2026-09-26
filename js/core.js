    const { useState, useEffect, useRef, useMemo } = React;

    const STORAGE_KEY_DESKTOP_VIEW = 'germanapp_desktop_view';

    const playFeedbackSound = (type = 'success') => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'success') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.setValueAtTime(659.25, now + 0.08);
                osc.frequency.setValueAtTime(783.99, now + 0.16);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'error') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(280, now);
                osc.frequency.setValueAtTime(200, now + 0.1);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
                osc.start(now);
                osc.stop(now + 0.28);
            } else if (type === 'station-chime') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(349.23, now);
                osc.frequency.setValueAtTime(523.25, now + 0.25);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.6);
            } else {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.09, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
            }
        } catch (e) {
        }
    };

    const GermanFlagIcon = ({ className = "w-8 h-8" }) => (
        <div className={`${className} bg-brand-yellowLight rounded-xl border border-brand-dark flex items-center justify-center overflow-hidden shrink-0 shadow-chunky-sm`}>
        <svg viewBox="0 0 64 64" className="w-full h-full p-0.5" fill="none">
        <rect x="4" y="10" width="56" height="14.66" fill="#161618" rx="2" />
        <rect x="4" y="24.66" width="56" height="14.68" fill="#E11D48" />
        <rect x="4" y="39.34" width="56" height="14.66" fill="#FED74C" rx="2" />
        <rect x="4" y="10" width="56" height="44" rx="8" stroke="#161618" strokeWidth="3" fill="none" />
        </svg>
    </div>
    );

    const SelfStudyGuide = ({ englishTask, grammarRule, formula, pitfalls, culturalNote, vocabulary, tip, modelAnswer, englishMode }) => {
        const [open, setOpen] = useState(Boolean(englishMode));
        const [activeTab, setActiveTab] = useState('task');

        useEffect(() => {
            if (englishMode !== undefined) {
                setOpen(englishMode);
            }
        }, [englishMode]);

        return (
            <div className="bg-gradient-to-br from-amber-50/90 via-white to-orange-50/70 border-2 border-brand-dark/20 rounded-2xl p-3.5 my-2.5 text-xs shadow-xs">
            <div className="flex items-center justify-between">
            <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-left font-black text-brand-dark cursor-pointer select-none"
            >
            <span className="w-6 h-6 rounded-lg bg-brand-coral text-white flex items-center justify-center text-xs shadow-xs">
            💡
            </span>
            <div>
            <span className="text-xs font-black text-brand-coral uppercase tracking-wide block">
            Self-Study Tutor &bull; German B1.1 Helper
        </span>
        <span className="text-[10.5px] text-zinc-500 font-semibold">
        {open ? 'Detailed explanations active' : 'Click to expand grammar notes, tips & vocabulary'}
        </span>
    </div>
    </button>
    <button
    type="button"
    onClick={() => setOpen(!open)}
    className="text-[10px] font-black uppercase tracking-wider text-zinc-600 bg-white hover:bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-300 shadow-xs cursor-pointer"
    >
    {open ? 'Hide Explanations ▲' : 'Show Explanations ▼'}
    </button>
    </div>

    {open && (
        <div className="mt-3 pt-2.5 border-t border-brand-dark/10 space-y-3">
        <div className="flex items-center gap-1.5 flex-wrap">
        <button
        type="button"
        onClick={() => setActiveTab('task')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
            activeTab === 'task' ? 'bg-brand-dark text-white border-brand-dark shadow-xs' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
            }`}
            >
            🇬🇧 Task &amp; Vocabulary
            </button>
            {(grammarRule || formula || pitfalls) && (
                <button
                type="button"
                onClick={() => setActiveTab('grammar')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                    activeTab === 'grammar' ? 'bg-brand-dark text-white border-brand-dark shadow-xs' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                    }`}
                    >
                    📐 Grammar Breakdown
                    </button>
                    )}
                    {culturalNote && (
                        <button
                        type="button"
                        onClick={() => setActiveTab('culture')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                            activeTab === 'culture' ? 'bg-brand-dark text-white border-brand-dark shadow-xs' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                            }`}
                            >
                            🇩🇪 German Culture &amp; Context
                            </button>
                            )}
                            </div>

                            {activeTab === 'task' && (
                            <div className="space-y-2.5">
                            {englishTask && (
                                <div className="p-2.5 bg-white rounded-xl border border-zinc-200 leading-relaxed text-zinc-700">
                                <strong className="text-brand-dark block text-[11px] uppercase tracking-wide text-brand-coral mb-0.5">
                                🇬🇧 What you are asked to do:
                                </strong>
                                <p className="text-xs">{englishTask}</p>
                                </div>
                                )}

                                {vocabulary && vocabulary.length > 0 && (
                                    <div>
                                    <strong className="text-brand-dark block mb-1 text-[11px] uppercase tracking-wider text-zinc-500">
                                    Key Words &amp; Gender (Nomen mit Artikel):
                                    </strong>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                                    {vocabulary.map((v, i) => (
                                        <div key={i} className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-zinc-200 shadow-2xs">
                                        <span className="font-black text-brand-dark">{v.de}</span>
                                        <span className="text-zinc-500 italic text-[10.5px]">{v.en}</span>
                                        </div>
                                        ))}
                                        </div>
                                        </div>
                                        )}

                                        {tip && (
                                            <div className="p-2.5 bg-brand-yellowLight/90 rounded-xl border border-brand-yellow text-[11px] text-zinc-800 leading-relaxed">
                                            <strong className="text-brand-dark block font-black mb-0.5">💡 Strategy Tip:</strong>
                                            {tip}
                                            </div>
                                            )}

                                            {modelAnswer && (
                                                <div className="p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-300 text-[11px] text-emerald-950 leading-relaxed">
                                                <strong className="text-emerald-800 block font-black mb-0.5">📝 Musterlösung (Model Answer):</strong>
                                                <p className="italic">{modelAnswer}</p>
                                                </div>
                                                )}
                                                </div>
                                                )}

                                                {activeTab === 'grammar' && (
                                                <div className="space-y-2.5">
                                                {formula && (
                                                    <div className="p-2.5 bg-zinc-900 text-white rounded-xl border border-zinc-700 font-mono text-[11px] space-y-1">
                                                    <span className="text-brand-yellow text-[10px] font-black uppercase tracking-wider block font-sans">
                                                    Sentence Blueprint / Satzstruktur:
                                                    </span>
                                                    <div className="p-1.5 bg-black/40 rounded border border-zinc-800 text-brand-mint text-xs">
                                                    {formula}
                                                    </div>
                                                    </div>
                                                    )}

                                                    {grammarRule && (
                                                        <div className="p-2.5 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-700 leading-relaxed space-y-1.5">
                                                        <strong className="text-brand-dark block text-[11px] uppercase tracking-wide text-brand-coral">
                                                        Rule Explanation:
                                                        </strong>
                                                        <p>{grammarRule}</p>
                                                        </div>
                                                        )}

                                                        {pitfalls && (
                                                            <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-300 text-[11px] text-rose-950 leading-relaxed">
                                                            <strong className="text-rose-700 block font-black mb-0.5">⚠️ Common Mistakes to Avoid (Typische Fehler):</strong>
                                                            <p>{pitfalls}</p>
                                                            </div>
                                                            )}
                                                            </div>
                                                            )}

                                                            {activeTab === 'culture' && culturalNote && (
                                                            <div className="p-3 bg-white rounded-xl border border-brand-lavender text-xs text-zinc-800 leading-relaxed space-y-1.5">
                                                            <div className="flex items-center gap-1.5 text-brand-dark font-black">
                                                            <span className="material-symbols-rounded text-sm text-brand-coral">explore</span>
                                                            <span>Cultural Insight / Landeskunde:</span>
                                                            </div>
                                                            <p className="text-[11.5px] text-zinc-700">{culturalNote}</p>
                                                            </div>
                                                            )}
                                                            </div>
                                                            )}
                                                        </div>
                                                        );
    };

    const AudioTrackPlayer = ({ trackNumber, title, duration = "1:45", transcript, englishTranscript, englishMode, onPlayAudio }) => {
        const [isPlaying, setIsPlaying] = useState(false);
        const [playbackSpeed, setPlaybackSpeed] = useState(1);
        const [showTranscript, setShowTranscript] = useState(false);

        const togglePlayback = () => {
            if (!isPlaying) {
                playFeedbackSound('click');
                setIsPlaying(true);
                if (onPlayAudio) onPlayAudio(trackNumber);
            } else {
                setIsPlaying(false);
            }
        };

        const toggleSpeed = () => {
            setPlaybackSpeed(prev => (prev === 1 ? 0.8 : 1));
        };

        return (
            <div className="bg-brand-lavenderLight/70 border-2 border-brand-dark rounded-2xl p-3 my-2 shadow-chunky-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
            <button
            type="button"
            onClick={togglePlayback}
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-brand-dark shadow-chunky-sm transition cursor-pointer ${
                isPlaying ? 'bg-brand-coral text-white animate-pulse' : 'bg-brand-yellow text-brand-dark hover:bg-yellow-400'
            }`}
            title={isPlaying ? "Pause Audio" : "Play Audio"}
            >
            <span className="material-symbols-rounded text-lg">
            {isPlaying ? 'pause' : 'play_arrow'}
            </span>
        </button>
        <div>
        <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-black uppercase text-brand-coral tracking-wider">
        Audio Track {trackNumber}
        </span>
        <span className="px-1.5 py-0.2 bg-white text-brand-dark border border-zinc-300 rounded text-[9px] font-mono font-bold">
        {playbackSpeed}x
    </span>
    </div>
    <span className="text-xs font-black text-brand-dark block truncate max-w-[200px] sm:max-w-xs">
    {title}
    </span>
    </div>
    </div>

    <div className="flex items-center gap-1.5">
    <button
    type="button"
    onClick={toggleSpeed}
    className="px-2 py-0.5 bg-white text-[10px] font-black rounded-lg border border-zinc-300 hover:bg-zinc-100 text-zinc-700 cursor-pointer"
    title="Slow down audio for self-learning"
    >
    {playbackSpeed === 1 ? 'Slow (0.8x)' : 'Normal (1x)'}
    </button>
    <span className="text-[11px] font-mono font-bold text-zinc-500 hidden sm:inline">{duration}</span>
    {transcript && (
        <button
        type="button"
        onClick={() => setShowTranscript(!showTranscript)}
        className="px-2 py-0.5 bg-white text-zinc-700 hover:text-brand-dark text-[10.5px] font-bold rounded-lg border border-zinc-300 cursor-pointer shadow-2xs"
        >
        {showTranscript ? 'Hide' : 'Text'}
        </button>
    )}
    </div>
    </div>

    {showTranscript && transcript && (
        <div className="pt-2 border-t border-brand-dark/10 space-y-1.5 text-xs text-zinc-700">
        <div className="bg-white p-2.5 rounded-xl border border-zinc-200 leading-relaxed font-serif">
        <span className="font-sans text-[10px] font-black uppercase text-zinc-400 block mb-1">
        Transkript (Deutsch):
        </span>
        "{transcript}"
        </div>
        {englishMode && englishTranscript && (
            <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-amber-950 leading-relaxed text-[11.5px]">
            <span className="font-sans text-[10px] font-black uppercase text-amber-700 block mb-1">
            English Translation:
            </span>
            "{englishTranscript}"
            </div>
        )}
        </div>
    )}
    </div>
    );
    };

    const VideoScenePlayer = ({ scenes, englishMode, onAwardXp }) => {
        const [activeSceneIndex, setActiveSceneIndex] = useState(0);
        const [isPlaying, setIsPlaying] = useState(false);
        const [showSubtitle, setShowSubtitle] = useState(true);

        const activeScene = scenes[activeSceneIndex];

        const handlePlay = () => {
            playFeedbackSound('click');
            setIsPlaying(!isPlaying);
            if (!isPlaying && onAwardXp) {
                onAwardXp(10, 'video_play');
            }
        };

        return (
            <div className="bg-zinc-900 border-2 border-brand-dark rounded-3xl overflow-hidden shadow-chunky-sm text-white space-y-3 p-3 sm:p-4 my-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs font-black">
            ▶
            </span>
            <div>
            <span className="text-[10.5px] font-black uppercase text-brand-yellow tracking-wider block">
            Video-Reportage
        </span>
        <span className="text-xs font-black text-zinc-100">
        {activeScene.title}
        </span>
    </div>
    </div>

    <div className="flex items-center gap-1.5 self-end sm:self-auto">
    {scenes.map((s, idx) => (
        <button
        key={s.id}
        type="button"
        onClick={() => {
            playFeedbackSound('click');
            setActiveSceneIndex(idx);
            setIsPlaying(true);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition cursor-pointer ${
                activeSceneIndex === idx
                ? 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-xs'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                }`}
                >
                Szene {idx + 1}
                </button>
                ))}
            </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-zinc-800">
            <img
            src={activeScene.coverImage}
            alt={activeScene.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-85' : 'opacity-50'}`}
            onError={(e) => { e.target.src = 'https://placehold.co/700x400/161618/FED74C?text=Video+Szene'; }}
            />

            <button
            type="button"
            onClick={handlePlay}
            className={`absolute w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-white shadow-xl transition-transform hover:scale-105 cursor-pointer z-10 ${
                isPlaying ? 'bg-red-600/90' : 'bg-black/70 hover:bg-black/90'
            }`}
            >
            <span className="material-symbols-rounded text-3xl">
            {isPlaying ? 'pause' : 'play_arrow'}
            </span>
        </button>

        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-mono flex items-center gap-1.5 z-10">
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`}></span>
        <span>{isPlaying ? 'PLAYING (1080p HD)' : 'READY'}</span>
        </div>

        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-mono z-10">
        {activeScene.duration}
        </div>

        {showSubtitle && (
            <div className="absolute bottom-2 inset-x-2 p-2 bg-black/80 backdrop-blur-xs rounded-xl text-center text-xs leading-snug font-medium text-brand-yellowLight z-10">
            "{activeScene.captionDe}"
            </div>
            )}
        </div>

        <div className="flex items-center justify-between text-xs pt-0.5">
        <div className="flex items-center gap-2">
        <button
        type="button"
        onClick={() => setShowSubtitle(!showSubtitle)}
        className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
            showSubtitle ? 'bg-zinc-700 text-white border-zinc-600' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
        }`}
        >
        {showSubtitle ? 'Subtitles: ON' : 'Subtitles: OFF'}
        </button>
        <span className="text-zinc-400 text-[11px] hidden sm:inline">
        Focus: {activeScene.focusTopic}
    </span>
    </div>

    <span className="text-[10px] font-mono text-zinc-400">
    German B1.1 Seh-Hörverstehen
    </span>
    </div>

    <div className="bg-zinc-800/80 rounded-2xl p-3 text-xs space-y-1.5 border border-zinc-700/60">
    <span className="font-black text-brand-coral uppercase tracking-wide text-[10.5px] block">
    Szene-Beschreibung &amp; Dialog:
    </span>
    <p className="text-zinc-200 leading-relaxed font-sans">
    {activeScene.scriptDe}
    </p>
    {englishMode && (
        <p className="text-zinc-400 text-[11px] italic leading-relaxed pt-1 border-t border-zinc-700">
        🇬🇧 {activeScene.scriptEn}
        </p>
    )}
    </div>
    </div>
    );
    };

    const GermanyDestinationsMap = ({ onSelectDestination, activeDestId, destinations }) => {
        const [selectedPin, setSelectedPin] = useState(activeDestId || (destinations && destinations[0]?.id));
        const [filterCategory, setFilterCategory] = useState('all');

        const DESTINATIONS = destinations || [];

        const filteredDestinations = useMemo(() => {
            if (filterCategory === 'all') return DESTINATIONS;
            return DESTINATIONS.filter(d => d.category === filterCategory);
        }, [filterCategory, DESTINATIONS]);

        const current = DESTINATIONS.find(d => d.id === selectedPin) || DESTINATIONS[0];

        if (!current) return null;

        return (
        <div className="bg-brand-yellowLight/90 border-2 border-brand-dark rounded-3xl p-3.5 sm:p-4 my-2.5 shadow-chunky-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
        <span className="material-symbols-rounded text-brand-coral text-2xl">map</span>
        <div>
        <span className="text-xs font-black text-brand-dark uppercase tracking-wide block">
        Interaktive Deutschlandkarte
        </span>
        <span className="text-[10.5px] text-zinc-600 font-semibold">
        Explore authentic regions, cultural facts, and linked lessons
        </span>
        </div>
        </div>
        </div>

        <div className="relative w-full h-80 sm:h-92 bg-gradient-to-b from-sky-100/90 via-sky-50 to-emerald-50/40 border-2 border-brand-dark rounded-2xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-zinc-400 fill-white/85 filter drop-shadow-xs" strokeWidth="0.75">
        <path d="M 45,4 C 60,6 74,9 81,17 C 87,23 83,36 78,44 C 74,54 69,67 66,77 C 62,88 53,94 48,93 C 40,92 31,84 27,74 C 21,65 19,51 23,41 C 25,29 34,14 45,4 Z" />
        <path d="M 75,32 Q 65,34 50,42 Q 35,50 24,53" fill="none" stroke="#BAE6FD" strokeWidth="1.2" strokeDasharray="1 1" />
        <path d="M 32,74 Q 28,60 22,50" fill="none" stroke="#BAE6FD" strokeWidth="1.2" />
        <text x="18" y="9" fontSize="3.2" fill="#0369A1" fontWeight="bold" letterSpacing="0.5">Nordsee</text>
        <text x="68" y="7" fontSize="3.2" fill="#0369A1" fontWeight="bold" letterSpacing="0.5">Ostsee</text>
        <text x="40" y="97" fontSize="3.2" fill="#161618" fontWeight="bold" letterSpacing="0.5">Alpen (Süden)</text>
        </svg>

        {DESTINATIONS.map(pin => {
            const isSelected = selectedPin === pin.id;
            const isDimmed = filterCategory !== 'all' && pin.category !== filterCategory;

            return (
            <button
            key={pin.id}
            type="button"
            onClick={() => {
                playFeedbackSound('click');
                setSelectedPin(pin.id);
            }}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all transform cursor-pointer group flex flex-col items-center ${
                isSelected ? 'scale-125 z-30' : isDimmed ? 'opacity-30 scale-90 z-0' : 'hover:scale-115 z-10'
            }`}
            title={pin.name}
            >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-brand-dark shadow-xs font-black text-[11px] ${
                isSelected ? 'bg-brand-coral text-white animate-bounce' : 'bg-brand-yellow text-brand-dark'
            }`}>
            📍
            </span>
            <span className={`bg-brand-dark text-white text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-xs whitespace-nowrap mt-0.5 border border-white/30 hidden sm:block ${
                isSelected ? 'ring-2 ring-brand-coral' : ''
            }`}>
            {pin.name.split(':')[0]}
            </span>
            </button>
            );
        })}
        </div>

        <div className="bg-white p-3.5 rounded-2xl border-2 border-brand-dark/20 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
        <div>
        <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-black bg-brand-coralLight text-brand-coral px-2 py-0.5 rounded-full uppercase tracking-wider">
        {current.type}
        </span>
        <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
        Bundesland: {current.state}
        </span>
        </div>
        <h4 className="text-sm font-black text-brand-dark mt-1 flex items-center gap-1.5">
        <span>{current.name}</span>
        <span className="text-[11px] text-zinc-400 font-semibold">&bull; {current.desc}</span>
        </h4>
        </div>

        <button
        type="button"
        onClick={() => {
            playFeedbackSound('click');
            if (onSelectDestination) onSelectDestination(current.page);
        }}
        className="px-3.5 py-1.5 bg-brand-dark hover:bg-zinc-800 text-white text-xs font-black rounded-xl border border-brand-dark shadow-chunky-sm cursor-pointer shrink-0 self-end sm:self-auto flex items-center gap-1"
        >
        <span>Go to {current.page.toUpperCase()} Lesson</span>
        <span>&rarr;</span>
        </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
        <span className="font-black text-brand-coral uppercase tracking-wide text-[10px] block flex items-center gap-1">
        <span className="material-symbols-rounded text-xs">star</span>
        Highlight:
        </span>
        <p className="text-[11px] text-zinc-700 leading-snug">{current.feature}</p>
        </div>

        <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
        <span className="font-black text-amber-800 uppercase tracking-wide text-[10px] block flex items-center gap-1">
        <span className="material-symbols-rounded text-xs">tune</span>
        Besonderheit:
        </span>
        <p className="text-[11px] text-amber-950 font-medium leading-snug">{current.specialty}</p>
        </div>

        <div className="p-2.5 bg-sky-50/70 rounded-xl border border-sky-200 space-y-1">
        <span className="font-black text-sky-800 uppercase tracking-wide text-[10px] block flex items-center gap-1">
        <span className="material-symbols-rounded text-xs">tips_and_updates</span>
        Tipp:
        </span>
        <p className="text-[11px] text-sky-950 leading-snug">{current.travelTip}</p>
        </div>
        </div>

        <div className="p-2 bg-brand-yellowLight/60 rounded-xl border border-brand-yellow/80 flex items-start gap-2 text-[11px]">
        <span className="material-symbols-rounded text-brand-dark text-base shrink-0 mt-0.5">translate</span>
        <div>
        <strong className="text-brand-dark">Wortschatz-Spotlight: </strong>
        <span className="text-zinc-700 italic">{current.vocab}</span>
        </div>
        </div>
        </div>
        </div>
        );
    };

    const ScoreFeedbackBanner = ({ isChecked, correctCount, totalCount, onReset, showSolution, onToggleSolution }) => {
        const isFullScore = correctCount === totalCount;
        const percentage = Math.round((correctCount / totalCount) * 100);

        return (
        <div className={`p-3.5 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-2 ${
            isFullScore ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-amber-50 border-amber-500 text-amber-950'
        }`}>
        <div className="flex items-center gap-2">
        <span className="material-symbols-rounded text-2xl shrink-0">
        {isFullScore ? 'check_circle' : 'stars'}
        </span>
        <div>
        <span className="font-black text-sm block">
        Score: {correctCount} of {totalCount} correct ({percentage}%)
        </span>
        <span className="text-[11px] opacity-80 font-semibold">
        {isFullScore ? 'Outstanding work! Full XP earned.' : 'Review marked answers and try again.'}
        </span>
        </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
        {onToggleSolution && (
            <button
            type="button"
            onClick={onToggleSolution}
            className="px-3 py-1.5 rounded-xl text-xs font-black bg-white border border-current hover:bg-zinc-50 cursor-pointer shadow-2xs"
            >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
        )}
        <button
        type="button"
        onClick={onReset}
        className="px-3 py-1.5 rounded-xl text-xs font-black bg-brand-dark text-white hover:bg-zinc-800 cursor-pointer shadow-chunky-sm"
        >
        Try Again
        </button>
        </div>
        </div>
        );
    };

    const SmartImage = ({ src, secondarySrc, alt, className = "w-full h-full object-cover", icon = "image", label = "" }) => {
        const [imgSrc, setImgSrc] = useState(src);
        const [failed, setFailed] = useState(false);

        useEffect(() => {
            setImgSrc(src);
            setFailed(false);
        }, [src]);

        const handleError = () => {
            if (secondarySrc && imgSrc !== secondarySrc) {
                setImgSrc(secondarySrc);
            } else {
                setFailed(true);
            }
        };

        if (failed) {
            return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 text-brand-dark p-2 text-center select-none relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-brand-dark flex items-center justify-center shadow-chunky-sm mb-1 z-10">
            <span className="material-symbols-rounded text-xl text-brand-coral">{icon}</span>
            </div>
            {label && (
                <span className="text-[9.5px] font-black uppercase tracking-wide bg-brand-dark text-white px-2 py-0.5 rounded-md z-10 border border-white/20">
                {label}
                </span>
            )}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#161618_1px,transparent_1px)] [background-size:8px_8px]"></div>
            </div>
            );
        }

        return (
        <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        loading="lazy"
        />
        );
    };

    const ScoreBreakdownModal = ({ isOpen, onClose, xp, level, streak }) => {
        if (!isOpen) return null;

        return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border-3 border-brand-dark shadow-chunky-lg max-w-sm w-full p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
        <div className="flex items-center gap-2">
        <span className="material-symbols-rounded text-brand-yellow text-2xl">emoji_events</span>
        <h4 className="text-base font-black text-brand-dark">Score &amp; Progress</h4>
        </div>
        <button
        type="button"
        onClick={onClose}
        className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-brand-dark font-black flex items-center justify-center cursor-pointer"
        >
        &times;
        </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 bg-brand-yellowLight rounded-2xl border border-brand-yellow">
        <span className="text-[10px] font-bold text-zinc-500 uppercase block">Total XP</span>
        <span className="text-base font-black text-brand-dark">{xp}</span>
        </div>
        <div className="p-2.5 bg-brand-lavenderLight rounded-2xl border border-brand-lavender">
        <span className="text-[10px] font-bold text-zinc-500 uppercase block">Level</span>
        <span className="text-base font-black text-brand-dark">{level}</span>
        </div>
        <div className="p-2.5 bg-brand-coralLight rounded-2xl border border-brand-coral">
        <span className="text-[10px] font-bold text-zinc-500 uppercase block">Streak</span>
        <span className="text-base font-black text-brand-coral">{streak}d</span>
        </div>
        </div>

        <p className="text-xs text-zinc-600 font-medium text-center leading-relaxed">
        Complete exercises across the pages and master the Grammar Masterclasses to maximize your B1.1 German proficiency!
        </p>

        <button
        type="button"
        onClick={onClose}
        className="w-full py-2 bg-brand-dark text-white font-black text-xs rounded-full cursor-pointer hover:bg-zinc-800"
        >
        Close
        </button>
        </div>
        </div>
        );
    };

    function App({ chapterTitle, sections, renderSectionContent }) {
        const [activeSection, setActiveSection] = useState('guide');
        const [englishMode, setEnglishMode] = useState(() => {
            try {
                return localStorage.getItem('germanapp_english_mode') === 'true';
            } catch (e) {
                return true;
            }
        });

        const [isDesktopView, setIsDesktopView] = useState(() => {
            try {
                return localStorage.getItem(STORAGE_KEY_DESKTOP_VIEW) === 'true';
            } catch (e) {
                return false;
            }
        });

        const toggleDesktopView = () => {
            setIsDesktopView(prev => {
                const nextState = !prev;
                try {
                    localStorage.setItem(STORAGE_KEY_DESKTOP_VIEW, String(nextState));
                    if (nextState) {
                        document.documentElement.classList.add('desktop-view-mode');
                    } else {
                        document.documentElement.classList.remove('desktop-view-mode');
                    }
                } catch (e) {}
                return nextState;
            });
        };

        const [scoreState, setScoreState] = useState(() => {
            try {
                const saved = localStorage.getItem('germanapp_student_score');
                return saved ? JSON.parse(saved) : { xp: 1250, level: 3, streak: 5 };
            } catch (e) {
                return { xp: 1250, level: 3, streak: 5 };
            }
        });

        const [showProfileDropdown, setShowProfileDropdown] = useState(false);
        const [showScoreModal, setShowScoreModal] = useState(false);
        const tabsScrollRef = useRef(null);

        const toggleEnglish = () => {
            setEnglishMode(prev => {
                const next = !prev;
                try {
                    localStorage.setItem('germanapp_english_mode', String(next));
                } catch (e) {}
                return next;
            });
        };

        const awardXp = (amount) => {
            setScoreState(prev => {
                const nextXp = prev.xp + amount;
                const nextLevel = Math.floor(nextXp / 500) + 1;
                const updated = { ...prev, xp: nextXp, level: nextLevel };
                try {
                    localStorage.setItem('germanapp_student_score', JSON.stringify(updated));
                } catch (e) {}
                return updated;
            });
        };

        const scrollTabs = (offset) => {
            if (tabsScrollRef.current) {
                tabsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
            }
        };

        const currentIndex = sections.findIndex(s => s.id === activeSection);

        useEffect(() => {
            if (tabsScrollRef.current) {
                const activeBtn = tabsScrollRef.current.querySelector(`[data-tab-id="${activeSection}"]`);
                if (activeBtn) {
                    const container = tabsScrollRef.current;
                    const btnLeft = activeBtn.offsetLeft;
                    const btnWidth = activeBtn.offsetWidth;
                    const containerWidth = container.offsetWidth;
                    container.scrollTo({
                        left: btnLeft - containerWidth / 2 + btnWidth / 2,
                        behavior: 'smooth'
                    });
                }
            }
        }, [activeSection]);

        return (
            <div className={`w-full ${isDesktopView ? 'max-w-5xl lg:max-w-6xl' : 'max-w-xl md:max-w-2xl'} mx-auto min-h-screen bg-brand-cream pb-28 relative shadow-2xl overflow-x-hidden transition-all duration-300`}>
            <header className="sticky top-0 z-30 bg-brand-cream/95 backdrop-blur-md px-4 pt-3.5 pb-2.5 border-b-2 border-brand-dark/10 flex items-center justify-between">
            <div>
            <div className="inline-flex items-center gap-1.5 bg-brand-dark text-white px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide">
            <span>GermanApp</span>
            <span className="text-brand-yellow">✦</span>
            <span>B1.1</span>
        </div>
        <h1 className="text-lg sm:text-xl font-black tracking-tight text-brand-dark mt-0.5">
        {chapterTitle}
        </h1>
    </div>

    <div className="flex items-center gap-1.5 sm:gap-2">
    <button
    type="button"
    onClick={toggleEnglish}
    className={`px-2.5 py-1 rounded-full text-xs font-black border-2 border-brand-dark flex items-center gap-1 transition cursor-pointer shadow-chunky-sm ${
        englishMode ? 'bg-brand-coral text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100'
    }`}
    title="Toggle English Support"
    >
    <span className="material-symbols-rounded text-sm">translate</span>
    <span className="hidden sm:inline">{englishMode ? 'EN Help: ON' : 'EN Help: OFF'}</span>
    </button>

    <button
    type="button"
    onClick={() => setShowScoreModal(true)}
    className="flex items-center gap-1 bg-brand-yellowLight border-2 border-brand-dark px-2.5 py-1 rounded-full shadow-chunky-sm text-xs font-black text-brand-dark cursor-pointer hover:bg-yellow-200"
    >
    <span className="material-symbols-rounded text-brand-coral text-sm">stars</span>
    <span>{scoreState.xp} XP</span>
    </button>

    <div className="relative">
    <button
    type="button"
    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
    className="cursor-pointer"
    aria-label="Open Course Menu"
    >
    <GermanFlagIcon className="w-8 h-8" />
    </button>

    {showProfileDropdown && (
        <>
        <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)}></div>
        <div className="absolute right-0 top-full mt-2 w-52 bg-white border-2 border-brand-dark rounded-2xl shadow-chunky p-1.5 z-50 animate-in fade-in duration-100 space-y-1">
        <button
        type="button"
        onClick={() => {
            setShowProfileDropdown(false);
            toggleDesktopView();
        }}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black text-brand-dark hover:bg-brand-yellowLight transition text-left cursor-pointer"
        >
        <div className="flex items-center gap-2">
        <span className="material-symbols-rounded text-base text-brand-coral">
        {isDesktopView ? 'smartphone' : 'desktop_windows'}
        </span>
        <span>Desktop View</span>
        </div>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${isDesktopView ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-zinc-100 text-zinc-500 border-zinc-200'}`}>
        {isDesktopView ? 'Active' : 'Toggle'}
        </span>
            
        </button>
        <button
        type="button"
        onClick={() => {
            window.location.href = 'ch1-b1-coursebook.html';
            setShowProfileDropdown(false);
        }}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-brand-dark hover:bg-brand-yellowLight transition text-left cursor-pointer"
        >
        <span className="material-symbols-rounded text-base text-brand-coral">school</span>
        <span>Chapter 1</span>
        </button>

        <button
        type="button"
        onClick={() => {
            window.location.href = 'ch2-b1-coursebook.html';
            setShowProfileDropdown(false);
        }}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-brand-dark hover:bg-brand-yellowLight transition text-left cursor-pointer"
        >
        <span className="material-symbols-rounded text-base text-brand-coral">school</span>
        <span>Chapter 2</span>
        </button>

        <button
        type="button"
        onClick={() => {
            window.location.href = 'ch3-b1-coursebook.html';
            setShowProfileDropdown(false);
        }}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-brand-dark hover:bg-brand-yellowLight transition text-left cursor-pointer"
        >
        <span className="material-symbols-rounded text-base text-brand-coral">school</span>
        <span>Chapter 3</span>
        </button>
        </div>
        </>
    )}
    </div>
    </div>
    </header>

    <div className="px-3 pt-3 flex items-center gap-1">
    <button
    type="button"
    onClick={() => scrollTabs(-180)}
    className="w-8 h-8 rounded-full bg-white border-2 border-brand-dark flex items-center justify-center shrink-0 shadow-chunky-sm hover:bg-zinc-100 cursor-pointer"
    aria-label="Scroll left"
    >
    <span className="material-symbols-rounded text-base">chevron_left</span>
    </button>

    <div ref={tabsScrollRef} className="flex-1 overflow-x-auto hide-scrollbar flex items-center gap-1.5 py-1">
    {sections.map(s => (
        <button
        key={s.id}
        data-tab-id={s.id}
        type="button"
        onClick={() => {
            playFeedbackSound('click');
            setActiveSection(s.id);
        }}
        className={`px-3 py-1.5 rounded-full text-xs font-black shrink-0 border border-brand-dark flex items-center gap-1 transition cursor-pointer ${
            activeSection === s.id
            ? 'bg-brand-dark text-white shadow-chunky-sm'
            : 'bg-white text-zinc-700 hover:bg-brand-yellowLight'
        }`}
        >
        <span className="material-symbols-rounded text-sm">{s.icon}</span>
        <span>{s.label}</span>
        </button>
    ))}
    </div>

    <button
    type="button"
    onClick={() => scrollTabs(180)}
    className="w-8 h-8 rounded-full bg-white border-2 border-brand-dark flex items-center justify-center shrink-0 shadow-chunky-sm hover:bg-zinc-100 cursor-pointer"
    aria-label="Scroll right"
    >
    <span className="material-symbols-rounded text-base">chevron_right</span>
    </button>
    </div>

    <main className="px-3 sm:px-4 mt-3">
    {renderSectionContent(activeSection, { englishMode, awardXp, setActiveSection })}
    </main>

    <nav className="fixed bottom-3 left-0 right-0 z-40 max-w-xl md:max-w-2xl mx-auto px-4 pointer-events-none">
    <div className="bg-brand-dark/95 text-white backdrop-blur-md p-2 rounded-full border-2 border-brand-dark shadow-2xl flex items-center justify-between pointer-events-auto">
    <button
    type="button"
    onClick={() => {
        if (currentIndex > 0) {
            playFeedbackSound('click');
            setActiveSection(sections[currentIndex - 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }}
    disabled={currentIndex === 0}
    className={`flex-1 py-1.5 rounded-full flex items-center justify-center gap-1 text-xs font-black transition cursor-pointer ${
        currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-800'
    }`}
    >
    <span className="material-symbols-rounded text-base">arrow_back</span>
    <span>Back</span>
    </button>

    <div className="px-3 py-1 bg-brand-yellow text-brand-dark rounded-full text-xs font-black border border-brand-dark">
    {sections[currentIndex]?.label}
    </div>

    <button
    type="button"
    onClick={() => {
        if (currentIndex < sections.length - 1) {
            playFeedbackSound('click');
            setActiveSection(sections[currentIndex + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }}
    disabled={currentIndex === sections.length - 1}
    className={`flex-1 py-1.5 rounded-full flex items-center justify-center gap-1 text-xs font-black transition cursor-pointer ${
        currentIndex === sections.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-800'
    }`}
    >
    <span>Next</span>
    <span className="material-symbols-rounded text-base">arrow_forward</span>
    </button>
    </div>
    </nav>

    <ScoreBreakdownModal
    isOpen={showScoreModal}
    onClose={() => setShowScoreModal(false)}
    xp={scoreState.xp}
    level={scoreState.level}
    streak={scoreState.streak}
    />
    </div>
    );
    }
