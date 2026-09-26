const SECTIONS_CH1 = [
    { id: 'guide', label: 'Overview', icon: 'school', title: 'Chapter 1: Gute Reise! Overview' },
    { id: 'p8', label: 'Page 8', icon: 'flight_takeoff', title: 'Page 8: Wo möchten Sie gern Urlaub machen?' },
    { id: 'p9', label: 'Page 9', icon: 'surfing', title: 'Page 9: Urlaubstypen & Hörverstehen' },
    { id: 'p10', label: 'Page 10', icon: 'edit_calendar', title: 'Page 10: Die Urlaubsplanung & Infinitiv mit zu' },
    { id: 'p11', label: 'Page 11', icon: 'luggage', title: 'Page 11: Im Reisebüro: Angebote & Buchung' },
    { id: 'p12', label: 'Page 12', icon: 'map', title: 'Page 12: Reiseziele in Deutschland & da/weil, obwohl' },
    { id: 'p13', label: 'Page 13', icon: 'record_voice_over', title: 'Page 13: Bild-Geschichte & Aussprache n, ng, nk' },
    { id: 'p14', label: 'Page 14', icon: 'train', title: 'Page 14: Bahnhofsdurchsagen verstehen' },
    { id: 'p15', label: 'Page 15', icon: 'nature_people', title: 'Page 15: Timos Blog von der Alm' },
    { id: 'p16', label: 'Page 16', icon: 'forest', title: 'Page 16: Ranger im Nationalpark Schwarzwald' },
    { id: 'gram1', label: 'Grammar 1', icon: 'psychology', title: 'Grammar 1: Infinitiv mit zu (Infinitive Clauses)' },
    { id: 'gram2', label: 'Grammar 2', icon: 'alt_route', title: 'Grammar 2: da/weil vs. obwohl & trotzdem' },
    { id: 'klar', label: 'Kurz & Klar', icon: 'fact_check', title: 'Kurz und Klar: B1 Masterclass Blueprint' }
];

const CH1_MAP_DESTINATIONS = [
    {
        id: 'ruegen', category: 'coast', name: 'Ostsee: Rügen', state: 'Mecklenburg-Vorpommern', type: 'Küste & Insel', x: 68, y: 12, page: 'p8',
        desc: 'Kreidefelsen, Strandkörbe und Ostseewind.', feature: 'Nationalpark Jasmund mit berühmtem Königsstuhl und historischen Seebädern wie Binz.',
        specialty: 'Räucherfisch, Sanddornlikör & frische Heringe', travelTip: 'Am besten mit der Schmalspurbahn „Rasender Roland“ die Insel erkunden.',
        vocab: 'der Strandkorb (hooded beach chair), die Kreidefelsen (chalk cliffs), die Seebrücke (pier)'
    },
    {
        id: 'usedom', category: 'coast', name: 'Kaiserbad Heringsdorf (Usedom)', state: 'Mecklenburg-Vorpommern', type: 'Bäderarchitektur & Strand', x: 82, y: 18, page: 'p12',
        desc: 'Endlose weiße Sandstrände & prachtvolle historische Villen.', feature: 'Längste Seebrücke Kontinentaleuropas (508 Meter lang) und 42 km feiner Sandstrand.',
        specialty: 'Usedomer Fischbrötchen & Ostsee-Dorsch', travelTip: 'Wird auch als „die Badewanne Berlins“ bezeichnet, da man per Bahn in gut zwei Stunden anreisen kann.',
        vocab: 'die Bäderarchitektur (resort architecture), die Promenade (esplanade), flanieren (to stroll)'
    },
    {
        id: 'berlin', category: 'city', name: 'Berlin & Spreewald', state: 'Berlin & Brandenburg', type: 'Metropole & UNESCO-Biosphäre', x: 74, y: 33, page: 'p11',
        desc: 'Wellness-Hotels, weltbekannte Museen & idyllische Kahnfahrten.', feature: 'Perfekte Symbiose aus pulsierendem Großstadtleben und lautlosem Gleiten durch grüne Flusskanäle.',
        specialty: 'Berliner Currywurst, Spreewälder Gurken & Plinse', travelTip: 'Kombinieren Sie ein Wochenende im Berliner Museumsviertel mit einer traditionellen Holzkahn-Tour im Spreewald.',
        vocab: 'die Kahnfahrt (punt boat tour), das Biosphärenreservat (biosphere reserve), die Kunstausstellung (art exhibition)'
    },
    {
        id: 'thueringen', category: 'mountain', name: 'Thüringer Wald', state: 'Thüringen', type: 'Mittelgebirge & Wanderregion', x: 52, y: 46, page: 'p8',
        desc: 'Das grüne Herz Deutschlands mit dichten Tannenwäldern.', feature: 'Der fast 170 km lange Höhenwanderweg „Rennsteig“ und die geschichtsträchtige Wartburg in Eisenach.',
        specialty: 'Original Thüringer Rostbratwurst & Thüringer Klöße', travelTip: 'Ideal für Aktivurlauber, die Ruhe, saubere Bergluft und authentische Gasthöfe schätzen.',
        vocab: 'das Mittelgebirge (low mountain range), der Wanderpfad (hiking trail), die Einkehr (rest stop at inn)'
    },
    {
        id: 'mosel', category: 'river', name: 'Moseltal', state: 'Rheinland-Pfalz', type: 'Flusstal & Steillagen-Weinbau', x: 22, y: 52, page: 'p8',
        desc: 'Steile Schieferweinberge, edle Riesling-Weine und trutzige Burgen.', feature: 'Der Bremmer Calmont ist der steilste Weinberg Europas mit bis zu 68 Grad Hangneigung.',
        specialty: 'Mosel-Riesling, Zwiebelkuchen & Winzerbraten', travelTip: 'Der Mosel-Radweg führt fast eben an spektakulären Flussschleifen und Fachwerkdörfern vorbei.',
        vocab: 'der Weinberg (vineyard), die Weinprobe (wine tasting), die Flussschleife (river bend)'
    },
    {
        id: 'rothenburg', category: 'culture', name: 'Rothenburg ob der Tauber', state: 'Bayern (Franken)', type: 'Mittelalterstadt an der Romantischen Straße', x: 48, y: 62, page: 'p12',
        desc: 'Vollständig begehbare Stadtmauer, Kopfsteinpflaster & Fachwerkhäuser.', feature: 'Gilt weltweit als Inbegriff einer deutschen mittelalterlichen Traumstadt und zieht Gäste aus aller Welt an.',
        specialty: 'Rothenburger Schneeballen (traditionelles Mürbeteiggebäck)', travelTip: 'Abends den Rundgang mit dem Nachtwächter mitmachen, um die Stadt im Fackelschein ohne Touristentrubel zu erleben.',
        vocab: 'die Stadtmauer (rampart/wall), das Kopfsteinpflaster (cobblestone), der Nachtwächter (night watchman)'
    },
    {
        id: 'schwarzwald', category: 'forest', name: 'Nationalpark Schwarzwald', state: 'Baden-Württemberg', type: 'Wilder Urwald & Naturschutzgebiet', x: 32, y: 74, page: 'p16',
        desc: 'Tiefe Wälder, Ranger Florian Hofmann & unberührte Kernzonen.', feature: 'Das Motto lautet „Natur Natur sein lassen“: Sturmwurfholz bleibt liegen und schafft Lebensraum für Auerhühner.',
        specialty: 'Schwarzwälder Kirschtorte & Schwarzwälder Schinken', travelTip: 'Besuchen Sie das moderne Nationalparkzentrum am Ruhestein mit interaktiver Erlebnisausstellung.',
        vocab: 'die Kernzone (wilderness core zone), die Totholzwirtschaft (deadwood conservation), das Auerhuhn (capercaillie)'
    },
    {
        id: 'bergneralm', category: 'alpine', name: 'Bergner-Alm (Alpen)', state: 'Bayern / Österreichischer Grenzraum', type: 'Hochgebirge auf 1.800 Meter', x: 64, y: 88, page: 'p15',
        desc: 'Timos dreimonatige Auszeit mit 30 Milchkühen auf der Alm.', feature: 'Körperliche Arbeit von 5:30 bis 21:00 Uhr ohne Handynetz, dafür mit absoluter Ruhe und Berggipfel-Panorama.',
        specialty: 'Frische Almmilch, Bergkäse, Buttermilch & Kaiserschmarrn', travelTip: 'Im Spätsommer den traditionellen Almabtrieb miterleben, wenn die Kühe festlich mit Blumen geschmückt ins Tal ziehen.',
        vocab: 'die Almwirtschaft (alpine pasture farming), das Melken (milking), der Almabtrieb (cattle drive festival)'
    }
];

// --- Page 8 Component ---
const Page8Content = ({ englishMode, onAwardXp, onNavigateSection }) => {
    const [selectedPhoto, setSelectedPhoto] = React.useState({});
    const [checked, setChecked] = React.useState(false);
    const [showSolution, setShowSolution] = React.useState(false);
    const [writtenAnswer, setWrittenAnswer] = React.useState("");
    const [submittedWritten, setSubmittedWritten] = React.useState(false);

    const POSTCARDS = [
        { id: 1, text: "Liebe Grüße von der Ostsee! Wir sitzen im Strandkorb und genießen den Wind und das Meer.", answer: "A", en: "Greetings from the Baltic Sea! Sitting in the strandkorb enjoying the wind and the sea." },
        { id: 2, text: "Hallo aus dem grünen Herzen Deutschlands! Nach 15 km Wanderung durch dichte Tannenwälder schmeckt das Abendessen.", answer: "B", en: "Hello from the green heart of Germany! After a 15 km hike through dense pine forests dinner tastes amazing." },
        { id: 3, text: "Wunderschöne Grüße von der Mosel! Wir machen eine Radtour entlang der Weinberge und probieren heute Riesling.", answer: "C", en: "Beautiful greetings from the Mosel! We are cycling along the vineyards and tasting Riesling today." },
        { id: 4, text: "Endlich Pause am Wasser. Die Kreidefelsen sind gigantisch! Bis bald!", answer: "A", en: "Finally a break by the water. The chalk cliffs are gigantic! See you soon!" },
        { id: 5, text: "Morgen geht es früh los zur nächsten Bergetappe. Absolute Ruhe hier in den Thüringer Bergen!", answer: "B", en: "Tomorrow starting early for the next mountain stage. Absolute tranquillity here in the Thuringian mountains!" },
    ];

    const handleCheck = () => {
        let correct = 0;
        POSTCARDS.forEach(p => {
            if (selectedPhoto[p.id] === p.answer) correct++;
        });
        setChecked(true);
        if (correct === POSTCARDS.length) {
            playFeedbackSound('success');
            onAwardXp(30, 'p8_postcards');
        } else {
            playFeedbackSound('error');
            onAwardXp(10, 'p8_postcards_partial');
        }
    };

    const correctCount = React.useMemo(() => {
        let count = 0;
        POSTCARDS.forEach(p => {
            if (selectedPhoto[p.id] === p.answer) count++;
        });
        return count;
    }, [selectedPhoto, checked]);

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-brand-dark shadow-chunky-sm space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-black bg-brand-yellow px-2.5 py-1 rounded-full border border-brand-dark">
                        Seite 8 &bull; Einstieg
                    </span>
                    <span className="text-xs font-bold text-zinc-500">1a-c Einstieg</span>
                </div>

                <div>
                    <h3 className="text-sm sm:text-base font-black text-brand-dark">
                        1a Sehen Sie die Fotos an. Wo möchten Sie gern Urlaub machen? Warum? Erzählen Sie.
                    </h3>
                    {englishMode && (
                        <p className="text-xs text-brand-coral font-bold mt-0.5">
                            🇬🇧 1a: Look at the photos. Where would you like to spend your vacation? Why?
                        </p>
                    )}
                </div>

                <SelfStudyGuide
                    englishMode={englishMode}
                    englishTask="Look at the photos (A, B, C). Where would you like to spend your vacation? Why? Practice constructing sentences with 'weil' (because)."
                    grammarRule="In German, when giving a reason using 'weil' (because), the conjugated verb must be sent to the very end of the subordinate clause. [Hauptsatz] + , weil + [Subjekt] + ... + [Verb am ENDE]."
                    formula="Hauptsatz [Verb Pos 2] + , weil + [Subjekt] + [Angaben] + [Verb am ENDE]."
                    pitfalls="Do not put the verb directly after 'weil'! Incorrect: *...weil ich liebe das Meer. Correct: ...weil ich das Meer LIEBE."
                    culturalNote="Germany boasts diverse vacation landscapes. Rügen is famous for the Strandkorb (invented 1882) and chalk cliffs. The Thuringian Forest is known as 'das grüne Herz Deutschlands'."
                    vocabulary={[
                        { de: 'der Strandkorb, -¨e', en: 'hooded wicker beach chair' },
                        { de: 'die Kreidefelsen (Pl.)', en: 'chalk cliffs landmark' },
                        { de: 'das Flusstal, -¨er', en: 'river valley' },
                        { de: 'die Weinberge (Pl.)', en: 'vineyard slopes' }
                    ]}
                    tip="Use modal constructions: 'Ich möchte gern...' or 'Am liebsten würde ich...'"
                    modelAnswer="Ich möchte am liebsten auf Rügen Urlaub machen, weil ich das Meer und lange Spaziergänge am Strand liebe."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="bg-brand-cream rounded-2xl border-2 border-brand-dark p-2 space-y-1.5 shadow-2xs">
                        <div className="h-44 rounded-xl overflow-hidden border border-brand-dark/20 bg-zinc-200">
                            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80" alt="Rügen" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-black text-xs text-brand-dark block">Foto A: Rügen Ostseeküste</span>
                    </div>
                    <div className="bg-brand-cream rounded-2xl border-2 border-brand-dark p-2 space-y-1.5 shadow-2xs">
                        <div className="h-44 rounded-xl overflow-hidden border border-brand-dark/20 bg-zinc-200">
                            <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80" alt="Thüringer Wald" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-black text-xs text-brand-dark block">Foto B: Thüringer Wald</span>
                    </div>
                    <div className="bg-brand-cream rounded-2xl border-2 border-brand-dark p-2 space-y-1.5 shadow-2xs">
                        <div className="h-44 rounded-xl overflow-hidden border border-brand-dark/20 bg-zinc-200">
                            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80" alt="Moseltal" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-black text-xs text-brand-dark block">Foto C: Moseltal Weinberge</span>
                    </div>
                </div>

                <GermanyDestinationsMap onSelectDestination={onNavigateSection} destinations={CH1_MAP_DESTINATIONS} activeDestId="ruegen" />

                <div className="pt-2 space-y-2">
                    <label className="block text-xs font-black text-brand-dark">Ihre Antwort zu 1a:</label>
                    <textarea
                        value={writtenAnswer}
                        onChange={(e) => setWrittenAnswer(e.target.value)}
                        placeholder="z. B. Ich möchte gern an der Mosel Urlaub machen, weil..."
                        rows={2}
                        className="w-full text-xs p-3 rounded-xl border-2 border-brand-dark focus:border-brand-coral bg-white"
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                if (writtenAnswer.trim().length > 5) {
                                    setSubmittedWritten(true);
                                    playFeedbackSound('success');
                                    onAwardXp(15, 'p8_written');
                                }
                            }}
                            className="px-4 py-1.5 bg-brand-coral text-white font-black text-xs rounded-full border border-brand-dark shadow-chunky-sm cursor-pointer"
                        >
                            {submittedWritten ? 'Antwort gespeichert (+15 XP) ✓' : 'Antwort speichern'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-brand-dark shadow-chunky-sm space-y-3">
                <h3 className="text-sm sm:text-base font-black text-brand-dark">
                    2 Urlaubsgrüße. Welche Nachricht passt zu welchem Foto? Ordnen Sie zu.
                </h3>
                <div className="space-y-2.5 pt-1">
                    {POSTCARDS.map((item) => (
                        <div key={item.id} className="p-3 rounded-2xl border-2 bg-brand-cream/60 border-brand-dark/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                            <p className="text-xs font-semibold text-brand-dark">{item.id}. "{item.text}"</p>
                            <div className="flex items-center gap-1.5">
                                {['A', 'B', 'C'].map((photoKey) => (
                                    <button
                                        key={photoKey}
                                        type="button"
                                        onClick={() => setSelectedPhoto({ ...selectedPhoto, [item.id]: photoKey })}
                                        className={`px-3 py-1 rounded-xl text-xs font-black border ${selectedPhoto[item.id] === photoKey ? 'bg-brand-dark text-white' : 'bg-white text-zinc-700'}`}
                                    >
                                        Foto {photoKey}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {checked ? (
                    <ScoreFeedbackBanner isChecked={checked} correctCount={correctCount} totalCount={POSTCARDS.length} onReset={() => setChecked(false)} />
                ) : (
                    <button type="button" onClick={handleCheck} className="w-full py-2.5 rounded-full font-black text-xs bg-brand-dark text-white shadow-chunky-sm">
                        Antworten überprüfen
                    </button>
                )}
            </div>
        </div>
    );
};

// Placeholder components for remaining pages to prevent ReferenceErrors
const Page9Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 9: Urlaubstypen</div>;
const Page10Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 10: Die Urlaubsplanung</div>;
const Page11Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 11: Im Reisebüro</div>;
const Page12Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 12: Reiseziele in Deutschland</div>;
const Page13Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 13: Bild-Geschichte</div>;
const Page14Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 14: Bahnhofsdurchsagen</div>;
const Page15Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 15: Timos Blog</div>;
const Page16Content = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Page 16: Ranger im Schwarzwald</div>;
const Grammar1InfinitiveUnit = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Grammar 1: Infinitiv mit zu</div>;
const Grammar2ConnectorsUnit = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Grammar 2: da/weil vs. obwohl</div>;
const KurzUndKlarMasterclass = () => <div className="p-5 bg-white rounded-3xl border-2 border-brand-dark">Kurz &amp; Klar Masterclass</div>;

// Helper to render Chapter 1 sections
function renderCh1Content(activeSection, { englishMode, awardXp, setActiveSection }) {
    switch (activeSection) {
        case 'guide':
            return (
                <div className="bg-brand-lavenderLight rounded-3xl p-5 border-2 border-brand-dark shadow-chunky-sm space-y-4">
                    <div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-dark text-brand-yellow rounded-full text-[10px] font-black uppercase mb-1">
                            Kapitel 1 &bull; Study Roadmap
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-brand-dark">
                            Kapitel 1: „Gute Reise!“ — Travel Planning &amp; Sabbaticals
                        </h3>
                    </div>
                    <GermanyDestinationsMap onSelectDestination={(p) => setActiveSection(p)} destinations={CH1_MAP_DESTINATIONS} />
                </div>
            );
        case 'p8': return <Page8Content englishMode={englishMode} onAwardXp={awardXp} onNavigateSection={(p) => setActiveSection(p)} />;
        case 'p9': return <Page9Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p10': return <Page10Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p11': return <Page11Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p12': return <Page12Content englishMode={englishMode} onAwardXp={awardXp} onNavigateSection={(p) => setActiveSection(p)} />;
        case 'p13': return <Page13Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p14': return <Page14Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p15': return <Page15Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p16': return <Page16Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'gram1': return <Grammar1InfinitiveUnit englishMode={englishMode} onAwardXp={awardXp} />;
        case 'gram2': return <Grammar2ConnectorsUnit englishMode={englishMode} onAwardXp={awardXp} />;
        case 'klar': return <KurzUndKlarMasterclass englishMode={englishMode} />;
        default: return null;
    }
}

// Expose variables globally to window for in-browser Babel
window.SECTIONS_CH1 = SECTIONS_CH1;
window.renderCh1Content = renderCh1Content;
window.Page8Content = Page8Content;
window.Page9Content = Page9Content;
window.Page10Content = Page10Content;
window.Page11Content = Page11Content;
window.Page12Content = Page12Content;
window.Page13Content = Page13Content;
window.Page14Content = Page14Content;
window.Page15Content = Page15Content;
window.Page16Content = Page16Content;
window.Grammar1InfinitiveUnit = Grammar1InfinitiveUnit;
window.Grammar2ConnectorsUnit = Grammar2ConnectorsUnit;
window.KurzUndKlarMasterclass = KurzUndKlarMasterclass;
