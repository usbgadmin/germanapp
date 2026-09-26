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
                        <p className="text-xs text-brand-dark font-medium leading-relaxed mt-1">
                            Welcome to Chapter 1! Here you will practice travel consultation dialogues, discuss holiday types, master <em>Infinitiv mit „zu“</em>, and contrast causes (<em>da/weil</em>) with concessions (<em>obwohl/trotzdem</em>).
                        </p>
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
