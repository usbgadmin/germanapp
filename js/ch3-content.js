const SECTIONS_CH3 = [
    { id: 'guide', label: 'Overview', icon: 'school', title: 'Kapitel 3: Veränderungen Overview' },
    { id: 'p28', label: 'Page 28', icon: 'history_edu', title: 'Page 28: Wandel in Medizin & Arbeit' },
    { id: 'p29', label: 'Page 29', icon: 'podcasts', title: 'Page 29: Schule & Hörverstehen' },
    { id: 'p30', label: 'Page 30', icon: 'explore', title: 'Page 30: Sebastian Hilpert (Namibia)' },
    { id: 'p31', label: 'Page 31', icon: 'military_tech', title: 'Page 31: Kristina Vogel & Präteritum' },
    { id: 'p32', label: 'Page 32', icon: 'sentiment_very_satisfied', title: 'Page 32: Die Sache mit dem Glück' },
    { id: 'p33', label: 'Page 33', icon: 'favorite', title: 'Page 33: Davide Romano in Leipzig' },
    { id: 'p34', label: 'Page 34', icon: 'inventory_2', title: 'Page 34: Eva Fesslers persönliche Objekte' },
    { id: 'p35', label: 'Page 35', icon: 'handshake', title: 'Page 35: Gutes Benehmen früher & heute' },
    { id: 'p36', label: 'Page 36', icon: 'sports_mma', title: 'Page 36: Video Doha: Boxen & Wandel' },
    { id: 'p37', label: 'Page 37', icon: 'fitness_center', title: 'Page 37: Beliebteste Sportarten' },
    { id: 'p38', label: 'Page 38-39', icon: 'casino', title: 'Plattform 1: Das Punkterennen' },
    { id: 'p40', label: 'Page 40-41', icon: 'edit_note', title: 'Plattform 1: Schreibwerkstatt & Elfchen' },
    { id: 'p42', label: 'Page 42-43', icon: 'account_balance', title: 'Plattform 1: Berlin & Mauerfall' },
    { id: 'gram1', label: 'Grammar 1', icon: 'psychology', title: 'Grammar 1: Präteritum Masterclass' },
    { id: 'gram2', label: 'Grammar 2', icon: 'schedule', title: 'Grammar 2: Zeitangaben Dativ & Genitiv' },
    { id: 'klar', label: 'Kurz & Klar', icon: 'fact_check', title: 'Kurz und Klar: B1 Blueprint' }
];

const CH3_MAP_DESTINATIONS = [
    {
        id: 'berlin', category: 'history', name: 'Berlin: Mauer & Wiedervereinigung', state: 'Berlin', type: 'Geschichte & Kultur', x: 74, y: 33, page: 'p42',
        desc: 'Checkpoint Charlie, Brandenburger Tor & East Side Gallery.', feature: 'Symbol der Teilung und friedlichen Revolution am 9. November 1989.',
        specialty: 'Currywurst & multikulturelle Gastronomie', travelTip: 'Radtour entlang des Berliner Mauerwegs machen.',
        vocab: 'der Mauerfall (fall of the wall), die Wiedervereinigung (reunification)'
    },
    {
        id: 'erfurt', category: 'biography', name: 'Erfurt: Kristina Vogel Wirkungsstätte', state: 'Thüringen', type: 'Sport & Kommunalpolitik', x: 52, y: 50, page: 'p31',
        desc: 'Olympiastützpunkt & Stadtratsarbeit von Kristina Vogel.', feature: 'Erfurter Stadtrat, Bundespolizei und Sportförderung.',
        specialty: 'Thüringer Klöße & Erfurter Puffbohnen', travelTip: 'Krämerbrücke mit historischen Fachwerkhäusern besuchen.',
        vocab: 'der Stadtrat (city council), die Ehrung (honour/award)'
    },
    {
        id: 'leipzig', category: 'medicine', name: 'Leipzig: Klinikum St. Georg (Dr. Romano)', state: 'Sachsen', type: 'Medizin & Zuwanderung', x: 68, y: 48, page: 'p33',
        desc: 'Wirkungsstätte von Dr. Davide Romano.', feature: 'Klinikalltag, Fachkräfteintegration und lebendige Stadtviertel.',
        specialty: 'Leipziger Allerlei & Lerche (Gebäck)', travelTip: 'Kanalrundfahrt durch Plagwitz und Völkerschlachtdenkmal.',
        vocab: 'die Zuwanderung (immigration), der Facharzt (specialist doctor)'
    },
    {
        id: 'koeln', category: 'work', name: 'Köln / Ruhrgebiet: Industriewandel', state: 'Nordrhein-Westfalen', type: 'Industrie & Wandel', x: 22, y: 48, page: 'p28',
        desc: 'Von Handarbeit & Kohle hin zur automatisierten Hightech-Industrie.', feature: 'Automatisierung, Roboterfertigung und moderner Gesundheitsschutz.',
        specialty: 'Kölsch & Halve Hahn', travelTip: 'Industriekultur im Landschaftspark Duisburg-Nord erleben.',
        vocab: 'automatisiert (automated), die Handarbeit (manual work)'
    }
];

// Section renderer for Chapter 3
function renderCh3Content(activeSection, { englishMode, awardXp, setActiveSection }) {
    switch (activeSection) {
        case 'guide':
            return (
                <div className="bg-brand-lavenderLight rounded-3xl p-5 border-2 border-brand-dark shadow-chunky-sm space-y-4">
                    <div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-dark text-brand-yellow rounded-full text-[10px] font-black uppercase mb-1">
                            Kapitel 3 &amp; Plattform 1 Roadmap
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-brand-dark">
                            Kapitel 3: „Veränderungen“ &amp; Plattform 1 Review
                        </h3>
                        <p className="text-xs text-brand-dark font-medium leading-relaxed mt-1">
                            Explore societal, professional, and personal changes. Master the <strong>Präteritum</strong> tense, learn temporal prepositions with <strong>Dativ</strong> and <strong>Genitiv</strong>, play the <strong>Punkterennen</strong> review game, and discover the history of the <strong>Berlin Wall</strong>.
                        </p>
                    </div>
                    <GermanyDestinationsMap onSelectDestination={(p) => setActiveSection(p)} activeDestId="berlin" destinations={CH3_MAP_DESTINATIONS} />
                </div>
            );
        case 'p28': return <Page28Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p29': return <Page29Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p30': return <Page30Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p31': return <Page31Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p32': return <Page32Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p33': return <Page33Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p34': return <Page34Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p35': return <Page35Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p36': return <Page36Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p37': return <Page37Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p38': return <BoardGamePunkterennen englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p40': return <SchreibwerkstattContent englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p42': return <BerlinHistoryContent englishMode={englishMode} onAwardXp={awardXp} />;
        case 'gram1': return <Grammar1PrateritumUnit englishMode={englishMode} onAwardXp={awardXp} />;
        case 'gram2': return <Grammar2PrepositionsUnit englishMode={englishMode} onAwardXp={awardXp} />;
        case 'klar': return <KurzUndKlarMasterclass englishMode={englishMode} />;
        default: return null;
    }
}