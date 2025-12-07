import { useEffect, useRef, useState } from 'react';
import { Columns, Eye, Lightbulb, Users } from 'lucide-react';

function App() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionsRef.current.set(id, el);
    }
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-white">
      <section
        id="hero"
        ref={setSectionRef('hero')}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-stone-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(218,165,32,0.1),transparent_50%)]"></div>
        <div className={`text-center z-10 px-4 max-w-5xl ${isVisible('hero') ? 'fade-in' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-stone-800 mb-6 tracking-tight">
            La Formella di
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-700 mt-2">
              Lorenzo Ghiberti
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 font-light max-w-3xl mx-auto leading-relaxed">
            Il capolavoro che segnò l'inizio del Rinascimento italiano
          </p>
          <div className="mt-8 h-1 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>
      </section>

      <section
        id="introduzione"
        ref={setSectionRef('introduzione')}
        className="py-24 px-6 bg-white"
      >
        <div className={`max-w-4xl mx-auto ${isVisible('introduzione') ? 'fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-stone-800 mb-12 text-center">
            Il Concorso del 1401
          </h2>
          <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed space-y-6">
            <p>
              Nel <strong>1401</strong>, l'Arte di Calimala, potente corporazione mercantile fiorentina,
              bandì un concorso pubblico per realizzare la seconda porta bronzea del Battistero di San Giovanni
              a Firenze. L'evento rappresentò un momento cruciale nella storia dell'arte italiana,
              segnando la transizione dal gotico al Rinascimento.
            </p>
            <p>
              Il tema proposto era il <strong>Sacrificio di Isacco</strong>, episodio biblico che richiedeva
              grande abilità nel rappresentare drammaticità, composizione e tecnica scultorea.
              Tra i sette artisti partecipanti, emersero due nomi destinati a lasciare un'impronta indelebile
              nella storia dell'arte: <strong>Lorenzo Ghiberti</strong> e <strong>Filippo Brunelleschi</strong>.
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8">
              <h3 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3">
                <Users className="text-amber-600" size={28} />
                Lorenzo Ghiberti (1378-1455)
              </h3>
              <p className="text-stone-700">
                Orafo e scultore fiorentino, Ghiberti fu un maestro della fusione a cera persa.
                La sua vittoria nel concorso del 1401 lo consacrò come uno dei più grandi artisti
                del primo Rinascimento. Dedicò gran parte della sua vita alla realizzazione delle
                porte del Battistero, che Michelangelo definirà "Porte del Paradiso".
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="opera"
        ref={setSectionRef('opera')}
        className="py-24 px-6 bg-gradient-to-b from-stone-50 to-white"
      >
        <div className={`max-w-4xl mx-auto ${isVisible('opera') ? 'fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-stone-800 mb-12 text-center">
            Descrizione dell'Opera
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <Columns className="text-amber-600" size={32} />
                <h3 className="text-2xl font-bold text-stone-800">Tecnica e Materiali</h3>
              </div>
              <p className="text-stone-700 leading-relaxed">
                La formella è realizzata in <strong>bronzo dorato</strong> con la tecnica della
                fusione a cera persa. Misura circa <strong>45 x 38 cm</strong> e presenta una
                cornice a quadrifoglio gotica. Ghiberti dimostrò straordinaria maestria nella
                lavorazione del metallo, creando diverse profondità di rilievo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-stone-200">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-amber-600" size={32} />
                <h3 className="text-2xl font-bold text-stone-800">Composizione</h3>
              </div>
              <p className="text-stone-700 leading-relaxed">
                La scena si svolge su più livelli: in primo piano Abramo e Isacco sull'altare,
                in secondo piano i due servitori con l'asino, in alto l'angelo che ferma il
                sacrificio. L'equilibrio compositivo crea un senso di armonia e naturalezza.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed space-y-6">
            <p>
              Il <strong>soggetto biblico</strong> narra il momento in cui Dio ordina ad Abramo di
              sacrificare suo figlio Isacco per metterne alla prova la fede. Nell'istante culminante,
              quando Abramo sta per colpire, un angelo interviene fermando il suo braccio.
            </p>
            <p>
              Ghiberti rappresenta questo momento drammatico con <strong>eleganza e armonia</strong>.
              Le figure sono snelle e proporzionate, i gesti naturali, le vesti fluide.
              La composizione è bilanciata: ogni elemento occupa il proprio spazio senza sovrapposizioni caotiche.
            </p>
          </div>
        </div>
      </section>

      <section
        id="confronto"
        ref={setSectionRef('confronto')}
        className="py-24 px-6 bg-white"
      >
        <div className={`max-w-5xl mx-auto ${isVisible('confronto') ? 'fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-stone-800 mb-12 text-center">
            Confronto con Brunelleschi
          </h2>

          <div className="bg-gradient-to-br from-stone-50 to-amber-50 p-8 rounded-2xl shadow-lg border border-stone-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-amber-700">Ghiberti</h3>
                <ul className="space-y-3 text-stone-700">
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Armonia ed eleganza:</strong> composizione equilibrata e fluida</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Bellezza idealizzata:</strong> figure proporzionate e aggraziate</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Spazi definiti:</strong> ogni elemento ha il suo luogo preciso</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Economicità:</strong> fusione in unico pezzo, minor costo</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Tecnica raffinata:</strong> superficie levigata e dettagliata</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-stone-700">Brunelleschi</h3>
                <ul className="space-y-3 text-stone-700">
                  <li className="flex gap-3">
                    <span className="text-stone-500 font-bold">•</span>
                    <span><strong>Drammaticità intensa:</strong> pathos e tensione emotiva</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-500 font-bold">•</span>
                    <span><strong>Realismo crudo:</strong> corpi muscolosi e anatomicamente precisi</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-500 font-bold">•</span>
                    <span><strong>Dinamismo:</strong> movimento violento e improvviso</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-500 font-bold">•</span>
                    <span><strong>Fusione multipla:</strong> elementi assemblati separatamente</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-500 font-bold">•</span>
                    <span><strong>Innovazione prospettica:</strong> primi esperimenti di profondità</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg border-2 border-amber-300">
              <p className="text-stone-700 text-center leading-relaxed">
                <strong>La vittoria di Ghiberti</strong> fu determinata dalla sua capacità di coniugare
                innovazione tecnica, equilibrio compositivo ed eleganza formale. La giuria apprezzò
                la raffinatezza esecutiva e l'economia del progetto, preferendolo alla drammaticità
                più cruda di Brunelleschi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="analisi"
        ref={setSectionRef('analisi')}
        className="py-24 px-6 bg-gradient-to-b from-stone-50 to-white"
      >
        <div className={`max-w-4xl mx-auto ${isVisible('analisi') ? 'fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-stone-800 mb-12 text-center">
            Analisi Artistica
          </h2>

          <div className="space-y-10">
            <div className="bg-white p-8 rounded-xl shadow-md border border-stone-200">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="text-amber-600" size={36} />
                <h3 className="text-3xl font-bold text-stone-800">Stile e Innovazione</h3>
              </div>
              <p className="text-stone-700 leading-relaxed mb-4">
                Ghiberti si pone come <strong>ponte tra Gotico e Rinascimento</strong>.
                Mantiene la cornice gotica a quadrifoglio e l'eleganza lineare tardogotica,
                ma introduce elementi innovativi tipicamente rinascimentali.
              </p>
              <p className="text-stone-700 leading-relaxed">
                Le figure presentano <strong>proporzioni classiche</strong> ispirate all'arte greco-romana.
                Il corpo di Isacco ricorda le sculture antiche: anatomia accurata, equilibrio posturale,
                idealizzazione della bellezza fisica.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-stone-200">
              <h3 className="text-3xl font-bold text-stone-800 mb-6">Prospettiva e Spazio</h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                Uno degli aspetti più innovativi è l'uso della <strong>prospettiva empirica</strong>.
                Ghiberti crea diversi piani di profondità attraverso il rilievo graduato:
                altorilievo per le figure principali, bassorilievo per gli elementi secondari.
              </p>
              <p className="text-stone-700 leading-relaxed">
                Lo sfondo roccioso e il paesaggio creano un senso di <strong>profondità spaziale</strong>
                che anticipa le ricerche prospettiche che Brunelleschi svilupperà sistematicamente
                negli anni successivi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-stone-200">
              <h3 className="text-3xl font-bold text-stone-800 mb-6">Luce e Superficie</h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                La <strong>doratura</strong> del bronzo non è solo decorativa, ma funzionale.
                La superficie dorata riflette la luce in modo variabile a seconda del rilievo,
                creando effetti chiaroscurali naturali che accentuano volumi e profondità.
              </p>
              <p className="text-stone-700 leading-relaxed">
                Ghiberti leviga e rifinisce ogni dettaglio con precisione orafa:
                dai riccioli dei capelli alle pieghe delle vesti, fino alle texture
                dell'altare e del paesaggio roccioso.
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-xl border-l-4 border-amber-500">
              <h3 className="text-3xl font-bold text-stone-800 mb-6">Eredità e Significato</h3>
              <p className="text-stone-700 leading-relaxed">
                La formella di Ghiberti rappresenta <strong>l'inizio ufficiale del Rinascimento</strong>
                nella scultura italiana. La sua vittoria nel concorso del 1401 segnò il trionfo
                di una nuova concezione artistica basata su armonia, proporzione, studio dell'antico
                e innovazione tecnica. Questo capolavoro aprì la strada a generazioni di artisti
                che avrebbero rivoluzionato l'arte occidentale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="modello3d"
        ref={setSectionRef('modello3d')}
        className="py-24 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900"
      >
        <div className={`max-w-5xl mx-auto ${isVisible('modello3d') ? 'fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-amber-100 mb-6 text-center">
            Esplora il Modello 3D
          </h2>
          <p className="text-amber-200 text-center text-lg mb-12 max-w-2xl mx-auto">
            Interagisci con il modello tridimensionale: ruota, ingrandisci e osserva ogni dettaglio della formella
          </p>

          <div className="bg-gradient-to-br from-stone-700 to-stone-800 p-4 rounded-2xl shadow-2xl">
            <model-viewer
              src="/formella.glb"
              alt="Formella del Sacrificio di Isacco - Lorenzo Ghiberti"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              exposure="1.2"
              style={{
                width: '100%',
                height: '600px',
                borderRadius: '1rem',
              }}
            >
            </model-viewer>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-300 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
          <p className="text-2xl font-bold text-amber-100">Marco Ceriani</p>
          <p className="text-stone-400">Anno scolastico 2025/2026</p>
          <p className="text-sm text-stone-500 mt-8">
            Approfondimento didattico sulla Formella di Lorenzo Ghiberti
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
