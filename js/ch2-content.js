const SECTIONS_CH2 = [
    { id: 'guide', label: 'Overview', icon: 'school', title: 'Kapitel 2: Overview' },
    { id: 'p18', label: 'Page 18', icon: 'devices', title: 'Page 18: Nützliche Technik & Alltagshelfer' },
    { id: 'p19', label: 'Page 19', icon: 'podcasts', title: 'Page 19: Alltagstechnik & Hörverstehen' },
    { id: 'p20', label: 'Page 20', icon: 'build', title: 'Page 20: Reparieren vs. Neukauf & lassen' },
    { id: 'p21', label: 'Page 21', icon: 'shopping_bag', title: 'Page 21: Reklamation, Umtausch & Konsekutivsätze' },
    { id: 'p22', label: 'Page 22', icon: 'home_app_logo', title: 'Page 22: Smartes Wohnen & Genitiv' },
    { id: 'p23', label: 'Page 23', icon: 'forum', title: 'Page 23: wegen / trotz & Phonetik [ts]/[tst]' },
    { id: 'p24', label: 'Page 24', icon: 'campaign', title: 'Page 24: Werbeanzeigen & Marken' },
    { id: 'p25', label: 'Page 25', icon: 'handyman', title: 'Page 25: Zu Besuch im Repair Café' },
    { id: 'gram1', label: 'Grammar 1', icon: 'psychology', title: 'Grammar 1: lassen + Infinitiv' },
    { id: 'gram2', label: 'Grammar 2', icon: 'alt_route', title: 'Grammar 2: Genitiv & wegen / trotz' },
    { id: 'klar', label: 'Kurz & Klar', icon: 'fact_check', title: 'Kurz und Klar: B1 Masterclass Blueprint' }
];

const CH2_MAP_DESTINATIONS = [
    {
        id: 'berlin', category: 'tech', name: 'Berlin: Smart Home Innovation', state: 'Berlin', type: 'Smart Housing Hub', x: 74, y: 33, page: 'p22',
        desc: 'Musterhaus der Familie Singer in Berlin-Mitte.', feature: 'Touchscreens in jedem Raum, Remote-Kühlschrank-App & smarte Alarmanlage.',
        specialty: 'Smarte Energieeffizienz & Vernetzte Haussteuerung', travelTip: 'Technikmuseum Berlin und Smart-Living-Ausstellungen besuchen.',
        vocab: 'das Smart Home (smart home), die Jalousien (blinds), der Fingerabdruckscanner (biometric lock)'
    },
    {
        id: 'muenchen', category: 'mobility', name: 'München: MVG Klimaschutz', state: 'Bayern', type: 'Nachhaltige Mobilität', x: 58, y: 82, page: 'p24',
        desc: 'Lastenfahrräder, E-Trams & öffentlicher Nahverkehr.', feature: 'Inspiration für Werbekampagne: „Weise, dass du öffentlich fährst!“',
        specialty: 'Münchner MVG-Rad & Elektro-Lastenräder', travelTip: 'Erkunden Sie den Englischen Garten mit einem gemieteten Lastenrad.',
        vocab: 'das Lastenfahrrad (cargo bike), der Nahverkehr (public transport), der Klimaschützer (climate protector)'
    },
    {
        id: 'hamburg', category: 'repair', name: 'Hamburg: Repair Café Altona', state: 'Hamburg', type: 'Nachhaltigkeit & Reparieren', x: 48, y: 18, page: 'p25',
        desc: 'Ehrenamtliche Helfer reparieren gemeinsam Küchengeräte & Fahrräder.', feature: 'Einmal im Monat geöffnet. Hilfe zur Selbsthilfe gegen die Wegwerfgesellschaft.',
        specialty: 'Kaffee, Kuchen & kostenlose Reparaturhilfe auf Spendenbasis', travelTip: 'Bringen Sie Ihr defektes Lieblingsgerät mit und lernen Sie von Profis.',
        vocab: 'das Repair Café (repair café), die Spende (donation), ehrenamtlich (volunteer/pro bono)'
    },
    {
        id: 'koeln', category: 'tech', name: 'Köln: Elektronik & Reklamation', state: 'Nordrhein-Westfalen', type: 'Verbraucherschutz & Service', x: 22, y: 48, page: 'p21',
        desc: 'Elektronikfachgeschäfte & Umtauschservice im Zentrum.', feature: 'Kunden lassen Akkus tauschen oder nutzen Garantieansprüche bei fehlerhaften Geräten.',
        specialty: 'Garantieservice & Fachberatung', travelTip: 'Kassenzettel und Originalverpackung für Umtauschaktionen bereithalten.',
        vocab: 'die Reklamation (complaint/claim), der Kassenzettel (receipt), die Garantie (warranty)'
    }
];

// Helper to render Chapter 2 sections
function renderCh2Content(activeSection, { englishMode, awardXp, setActiveSection }) {
    switch (activeSection) {
        case 'guide':
            return (
                <div className="bg-brand-lavenderLight rounded-3xl p-5 border-2 border-brand-dark shadow-chunky-sm space-y-4">
                    <div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-dark text-brand-yellow rounded-full text-[10px] font-black uppercase mb-1">
                            Kapitel 2 &bull; Study Roadmap
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-brand-dark">
                            Kapitel 2: „Das ist ja praktisch!“ — Nützliche Technik &amp; Alltagshelfer
                        </h3>
                        <p className="text-xs text-brand-dark font-medium leading-relaxed mt-1">
                            Welcome to Chapter 2! Here you will practice discussing everyday gadgets, learning about Smart Homes, mastering service structures with <em>lassen + Infinitiv</em>, consequence clauses, and Genitive prepositions.
                        </p>
                    </div>
                    <GermanyDestinationsMap onSelectDestination={(p) => setActiveSection(p)} destinations={CH2_MAP_DESTINATIONS} />
                </div>
            );
        case 'p18': return <Page18Content englishMode={englishMode} onAwardXp={awardXp} onNavigateSection={(p) => setActiveSection(p)} />;
        case 'p19': return <Page19Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p20': return <Page20Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p21': return <Page21Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p22': return <Page22Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p23': return <Page23Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p24': return <Page24Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'p25': return <Page25Content englishMode={englishMode} onAwardXp={awardXp} />;
        case 'gram1': return <Grammar1LassenUnit englishMode={englishMode} onAwardXp={awardXp} />;
        case 'gram2': return <Grammar2GenitiveUnit englishMode={englishMode} onAwardXp={awardXp} />;
        case 'klar': return <KurzUndKlarMasterclass englishMode={englishMode} />;
        default: return null;
    }
}