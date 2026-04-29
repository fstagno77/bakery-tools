export const FLOUR_TYPES = [
    {
        id: 'generic',
        it: 'Generica (non specificata)',
        en: 'Generic (unspecified)',
        absorptionDelta: 0,
        protein: null,
        flourNote: null
    },
    {
        id: '00-debole',
        it: 'Farina 00 debole (dolci, W150)',
        en: 'Type 00 weak (pastry, W150)',
        absorptionDelta: -5,
        protein: '8.5–9.5%',
        flourNote: {
            it: 'Questa farina assorbe meno acqua delle farine da pane. L\'idratazione si sente "più alta" di quello che la bilancia indica: a 70% nominale l\'impasto si comporta come se fosse intorno al 75% con una farina media. Non è adatta oltre il 65–68% — sopra quella soglia la rete glutinica non regge e l\'impasto collassa. Usarla per pane dolce, grissini o impasti arricchiti.',
            en: 'This flour absorbs less water than bread flours. The hydration feels "higher" than the scale shows: at 70% nominal, the dough behaves like ~75% with a medium flour. Not suitable above 65–68% — above that threshold the gluten network won\'t hold. Use it for enriched doughs, grissini, or sweet breads.'
        }
    },
    {
        id: '00',
        it: 'Farina 00 classica (uso comune, W180–240)',
        en: 'Type 00 classic (all-purpose, W180–240)',
        absorptionDelta: -2,
        protein: '10–11%',
        flourNote: {
            it: 'La farina 00 classica è il riferimento della cucina italiana ma non è ideale per il pane a pasta madre ad alta idratazione. Regge bene fino al 68–70%; oltre inizia a perdere struttura e l\'alveolatura ne risente. Se vuoi andare oltre il 70% con sicurezza, passa a una 00 forte o a una farina 0.',
            en: 'Classic 00 flour is the Italian kitchen standard but is not ideal for high-hydration sourdough. It holds well up to 68–70%; above that it begins to lose structure and crumb suffers. If you want to exceed 70% reliably, switch to a strong 00 or Type 0 flour.'
        }
    },
    {
        id: '00-forte',
        it: 'Farina 00 forte (pizza/pane, W260–320)',
        en: 'Strong Type 00 (pizza/bread, W260–320)',
        absorptionDelta: 0,
        protein: '12–13%',
        flourNote: {
            it: 'Ottima scelta per il pane a pasta madre. La rete glutinica è forte e regge bene la fermentazione lunga tipica del lievito madre. Gestisce senza problemi il range 68–78%. Produce un\'alveolatura semi-aperta ben strutturata e una crosta con buona crosticina.',
            en: 'Excellent choice for sourdough bread. The gluten network is strong and handles the long fermentation typical of sourdough well. Manages the 68–78% range without issues. Produces a well-structured semi-open crumb and a crust with good crunch.'
        }
    },
    {
        id: '0',
        it: 'Farina 0',
        en: 'Type 0 flour',
        absorptionDelta: 1,
        protein: '11–12%',
        flourNote: {
            it: 'Leggermente più proteica e meno raffinata della 00. Offre un buon equilibrio tra lavorabilità e struttura glutinica fino al 75%. Aggiunge un po\' di carattere al sapore rispetto alla 00 classica. Molto usata nei forni artigianali italiani per pani di ogni giorno.',
            en: 'Slightly more protein and less refined than 00. Offers a good balance of workability and gluten structure up to 75%. Adds a touch of character to the flavour compared to classic 00. Widely used in Italian artisan bakeries for everyday bread.'
        }
    },
    {
        id: '1',
        it: 'Farina 1 (semi-integrale)',
        en: 'Type 1 flour (high extraction)',
        absorptionDelta: 3,
        protein: '11–13%',
        flourNote: {
            it: 'Contiene una quota di crusca e germe, il che aumenta l\'assorbimento di acqua di 2–3% rispetto alla 00. L\'impasto avrà un aspetto leggermente più scuro e granuloso. Aggiunge profondità di sapore e produce un\'alveolatura meno regolare ma più rustica e appealing. Ottima per pane quotidiano di carattere.',
            en: 'Contains a share of bran and germ, which increases water absorption by 2–3% vs. 00. The dough will appear slightly darker and more textured. Adds depth of flavour and produces a less regular but more rustic, appealing crumb. Excellent for characterful everyday bread.'
        }
    },
    {
        id: '2',
        it: 'Farina 2 (semi-integrale scura)',
        en: 'Type 2 flour (dark high extraction)',
        absorptionDelta: 5,
        protein: '12–13%',
        flourNote: {
            it: 'Alta estrazione: assorbe sensibilmente più acqua della farina bianca, +4–6% rispetto alla 00. L\'idratazione che scegli si traduce in un impasto più sodo del previsto se non aumenti l\'acqua rispetto alle ricette standard. Produce una mollica più scura, umida, con sapore marcato di grano. Ottima in blend con una parte di farina bianca forte.',
            en: 'High extraction: absorbs significantly more water than white flour, +4–6% vs. 00. The hydration you choose results in a stiffer dough than expected if you don\'t increase water from standard recipes. Produces a darker, moist crumb with pronounced wheat flavour. Excellent in blend with a portion of strong white flour.'
        }
    },
    {
        id: 'integrale',
        it: 'Farina integrale',
        en: 'Wholemeal flour',
        absorptionDelta: 7,
        protein: '12–14%',
        flourNote: {
            it: 'La crusca assorbe molta acqua: aspettati di dover aggiungere 5–8% più acqua rispetto a una ricetta con farina bianca per ottenere la stessa consistenza di impasto. L\'alveolatura sarà più rustica e meno aperta, perché i frammenti di crusca tagliano fisicamente le bolle durante la fermentazione. Il sapore è molto più ricco e nutty. Per la prima volta, prova in blend: 70–80% farina 0 o 00 forte + 20–30% integrale.',
            en: 'Bran absorbs a lot of water: expect to add 5–8% more water than a white flour recipe to achieve the same dough consistency. The crumb will be more rustic and less open, as bran fragments physically cut through gas bubbles during fermentation. Flavour is much richer and nuttier. For a first attempt, try in a blend: 70–80% Type 0 or strong 00 + 20–30% wholemeal.'
        }
    },
    {
        id: 'manitoba',
        it: 'Manitoba / Farina forte (W350–400)',
        en: 'Manitoba / Strong flour (W350–400)',
        absorptionDelta: 5,
        protein: '13.5–15%',
        flourNote: {
            it: 'Assorbe più acqua rispetto alle farine standard e tiene una struttura eccellente anche oltre l\'80% di idratazione. Usata spesso in blend per "rinforzare" farine più deboli. A idratazioni molto alte è la scelta obbligata per evitare lo spreading in forno. Attenzione: da sola può dare un impasto gommoso — in blend con 00 forte o farina 1 dà risultati equilibrati.',
            en: 'Absorbs more water than standard flours and maintains excellent structure even above 80% hydration. Often used in blends to "strengthen" weaker flours. At very high hydrations it\'s the mandatory choice to prevent oven spreading. Note: alone it can produce a gummy crumb — in blend with strong 00 or Type 1 it gives balanced results.'
        }
    },
    {
        id: 'semola',
        it: 'Semola rimacinata di grano duro',
        en: 'Re-milled durum wheat semolina',
        absorptionDelta: 2,
        protein: '12–14%',
        flourNote: {
            it: 'Farina di grano duro: produce una mollica più fine, compatta e gialla, con una crosta più friabile e dorata. Il glutine è diverso da quello del grano tenero: meno elastico, più resistente all\'estensione. L\'idratazione ottimale è tra 65–72%. Tipica dei pani del Sud Italia (pane di Altamura, pane cafone). Si lavora bene in blend con farina 0 o 00.',
            en: 'Durum wheat flour: produces a finer, more compact, yellower crumb with a more crumbly, golden crust. The gluten is different from soft wheat: less elastic, more resistant to extension. Optimal hydration is 65–72%. Typical of Southern Italian breads (Altamura bread, pane cafone). Works well in blend with Type 0 or 00.'
        }
    },
    {
        id: 'farro-spelta',
        it: 'Farro spelta',
        en: 'Spelt wheat',
        absorptionDelta: 8,
        protein: '11–14%',
        flourNote: {
            it: 'Il glutine del farro spelta è più fragile e meno elastico di quello del grano tenero. Assorbe più acqua ma il rischio è che l\'impasto si sciolga se si lavora troppo o si impasta a lungo. Non superare il 70–72% di idratazione. Evita l\'impastatrice a velocità alta. Il sapore è nocciolato e delicato. Ottimo in blend 30–40% con farina forte.',
            en: 'Spelt gluten is more fragile and less elastic than common wheat. It absorbs more water but risks dissolving if overworked or kneaded too long. Do not exceed 70–72% hydration. Avoid a stand mixer at high speed. Flavour is nutty and delicate. Excellent in 30–40% blend with strong flour.'
        }
    },
    {
        id: 'segale',
        it: 'Segale chiara',
        en: 'Light rye flour',
        absorptionDelta: 10,
        protein: '8–10%',
        flourNote: {
            it: 'La segale ha pochissimo glutine elastico e invece molta pentosana (amidi viscosi) che assorbe acqua in grandi quantità. L\'impasto non si comporta come un normale impasto di frumento: è viscoso, appiccicoso e non si stende. Va usata quasi sempre in blend con una farina forte (massimo 20–30% di segale). Il sapore acidulo è caratteristico e si abbina perfettamente alla fermentazione del lievito madre.',
            en: 'Rye has very little elastic gluten and instead lots of pentosans (viscous starches) that absorb water in large quantities. The dough does not behave like normal wheat dough: it is viscous, sticky and won\'t stretch. Almost always used in blend with a strong flour (max 20–30% rye). The sour, earthy flavour is characteristic and pairs perfectly with sourdough fermentation.'
        }
    },
    {
        id: 'segale-integrale',
        it: 'Segale integrale',
        en: 'Wholemeal rye flour',
        absorptionDelta: 14,
        protein: '8–10%',
        flourNote: {
            it: 'Assorbimento estremo: può assorbire fino al 10–15% più acqua rispetto alla farina bianca. L\'impasto finito sarà estremamente appiccicoso e quasi impossibile da formare con le mani — cuoce necessariamente in uno stampo. Usata in blend (10–20%) regala sapore e complessità straordinari. La fermentazione è più rapida del solito per via degli enzimi presenti nella crusca: monitora attentamente.',
            en: 'Extreme absorption: can absorb up to 10–15% more water than white flour. The finished dough will be extremely sticky and almost impossible to hand-shape — it must bake in a tin. Used in a blend (10–20%) it adds extraordinary flavour and complexity. Fermentation is faster than usual due to enzymes in the bran: monitor carefully.'
        }
    },
    {
        id: 'kamut',
        it: 'Kamut (grano Khorasan)',
        en: 'Kamut (Khorasan wheat)',
        absorptionDelta: 3,
        protein: '14–16%',
        flourNote: {
            it: 'Alta percentuale di proteine ma il glutine è più estensibile e meno tenace di quello del frumento moderno. Produce un sapore burroso e dolce molto apprezzato. Idratazione ottimale 68–74%. In blend al 20–30% con una farina forte è il modo migliore per introdurlo senza perdere struttura. Sopra il 75% tende a cedere — la struttura si affloscia durante la lievitazione finale.',
            en: 'High protein content but the gluten is more extensible and less tenacious than modern wheat. Produces a buttery, sweet flavour that is much appreciated. Optimal hydration 68–74%. In a 20–30% blend with a strong flour is the best way to introduce it without losing structure. Above 75% it tends to give — the structure weakens during final proof.'
        }
    }
];

export const HYDRATION_INSIGHTS = {
    bassa: {
        range: [0, 65],
        colorHex: '#2563eb',
        badge: { it: 'Bassa idratazione', en: 'Low hydration' },
        fascia: { it: '55–65%', en: '55–65%' },
        livello: { it: 'Principiante', en: 'Beginner' },
        impasto: {
            it: "L'impasto è sodo, compatto e non appiccicoso. Si stacca nettamente dalle mani e dal piano di lavoro, mantiene la forma senza bisogno di sostegno. La rete glutinica è molto tesa: alta tenacità, bassa estensibilità. È la fascia più facile da lavorare a mano, adatta anche a chi inizia senza esperienza con il lievito madre.",
            en: "The dough is firm, compact and non-sticky. It releases cleanly from hands and work surface, holding shape without support. The gluten network is very tight: high tenacity, low extensibility. This is the easiest range to work by hand, suitable even for those starting out with sourdough."
        },
        risultato: {
            it: "Mollica densa e uniforme con alveoli piccoli e regolari. Crosta spessa e consistente, con una masticabilità pronunciata che ricorda i pani contadini tradizionali. La struttura interna è ottima per il taglio preciso e per la conservazione: la minor umidità residua rallenta l'indurimento del pane anche dopo qualche giorno.",
            en: "Dense, uniform crumb with small, regular holes. Thick, consistent crust with pronounced chewiness reminiscent of traditional country bread. The internal structure is excellent for clean slicing and shelf life: lower residual moisture slows staling even after several days."
        },
        tempi: {
            it: "La fermentazione in bulk è più lenta — a 24°C aspettati un aumento di volume del 50–75% prima di procedere, spesso 6–10 ore. Questa fascia ha il vantaggio di una finestra di fermentazione più ampia rispetto alle idratazioni più alte: il rischio di sovra-fermentazione è ridotto e hai più margine di manovra se la giornata prende una piega diversa.",
            en: "Bulk fermentation is slower — at 24°C expect a 50–75% volume increase before proceeding, often 6–10 hours. This range has the advantage of a wider fermentation window compared to higher hydrations: the risk of over-fermentation is reduced and you have more room to manoeuvre if the day goes differently than planned."
        },
        attenzione: {
            it: "Attenzione alla sotto-fermentazione: la densità dell'impasto tende a mascherare l'attività della lievitazione. Non fidarti solo dei tempi — osserva attentamente l'aumento di volume. L'altro errore tipico è la sovra-impastatura: un impasto troppo teso non si estende correttamente in forno e produce una crosta che scoppia ai lati invece che lungo il taglio. Se usi il lievito madre solido (italiano, al 50% di idratazione), sei tecnicamente già in questa fascia.",
            en: "Watch for under-fermentation: the dough's density tends to mask fermentation activity. Don't rely on time alone — observe volume increase carefully. The other typical mistake is over-kneading: an overly tight dough won't expand properly in the oven and produces a crust that bursts at the sides rather than along the score. If you use stiff sourdough starter (Italian-style, 50% hydration), you are technically already in this range."
        },
        pani: {
            it: ['Bagel', 'Pretzel', 'Pane casareccio compatto', 'Pane di semola', 'Grissini', 'Trecce e pani decorati', 'Lievito madre italiano (impasto solido)'],
            en: ['Bagels', 'Pretzels', 'Compact country bread', 'Semolina bread', 'Grissini', 'Braided and decorative loaves', 'Stiff sourdough starter breads']
        }
    },
    media: {
        range: [65, 75],
        colorHex: '#16a34a',
        badge: { it: 'Idratazione media', en: 'Medium hydration' },
        fascia: { it: '65–75%', en: '65–75%' },
        livello: { it: 'Intermedio', en: 'Intermediate' },
        impasto: {
            it: "L'impasto è morbido e leggermente appiccicoso all'inizio, ma diventa sempre più lavorabile man mano che costruisci la forza con le pieghe (stretch & fold). L'equilibrio tra tenacità ed estensibilità è ottimale: risponde bene alla lavorazione manuale. A 65–68% è ancora abbordabile per chi inizia; a 72–75% inizia a richiedere tecnica di base — bench rest, pre-forma, forma finale.",
            en: "The dough is soft and slightly sticky at first, but becomes increasingly workable as you build strength through stretch and fold. The balance between tenacity and extensibility is optimal: it responds well to hand manipulation. At 65–68% it's still approachable for beginners; at 72–75% it starts requiring basic technique — bench rest, pre-shape, final shape."
        },
        risultato: {
            it: "Mollica semi-aperta con alveoli di dimensione media, distribuiti abbastanza uniformemente. Crosta sottile e croccante, specialmente con cottura in pentola (Dutch oven) o con vapore iniziale. Con farina di forza a 70–72% si ottiene il profilo artigianale classico: ear ben definita, sviluppo verticale pronunciato e alveolatura visibile ma non caotica. È la fascia target per la maggior parte dei pani artigianali da tavola.",
            en: "Semi-open crumb with medium-sized holes, fairly evenly distributed. Thin, crispy crust, especially when baked in a Dutch oven or with initial steam. With strong flour at 70–72% you get the classic artisan profile: well-defined ear, pronounced vertical rise and visible but not chaotic alveoli. This is the target range for most artisan table breads."
        },
        tempi: {
            it: "La fermentazione bulk dura tipicamente 4–6 ore a 24°C. La finestra di fermentazione è più stretta rispetto alla fascia bassa: sopra i 26°C riduci i tempi del 20–30%. La cold retard (12–14 ore in frigo) funziona molto bene: migliora la complessità del sapore per via delle fermentazioni più lente al freddo e facilita la formatura, perché l'impasto freddo è più compatto e maneggevole.",
            en: "Bulk fermentation typically lasts 4–6 hours at 24°C. The fermentation window is narrower than at low hydration: above 26°C reduce times by 20–30%. Cold retard (12–14 hours in the fridge) works very well: it improves flavour complexity through slower cold fermentation and makes shaping easier, as the cold dough is more compact and manageable."
        },
        attenzione: {
            it: "Il vapore nei primi 15 minuti di cottura è fondamentale: senza di esso la crosta si indurisce prima che il pane finisca di espandersi, togliendo volume e compromettendo l'apertura del taglio. Tieni d'occhio la sovra-lievitazione finale: il test del dito (poke test) è il tuo strumento principale — l'impronta deve risalire lentamente, non immediatamente e non restare impressa. Uno starter poco attivo produce struttura scarsa: la bolla deve raggiungere il picco entro 4–6 ore dall'ultimo rinfresco prima di usarla.",
            en: "Steam in the first 15 minutes of baking is essential: without it the crust hardens before the bread finishes expanding, reducing volume and compromising score opening. Watch for over-proofing: the poke test is your main tool — the indent should spring back slowly, not immediately and not stay impressed. A weak starter produces poor structure: the levain must peak within 4–6 hours of the last feeding before using it."
        },
        pani: {
            it: ['Pane artigianale quotidiano', 'Baguette (65–70%)', 'Pane di semola rimacinata', 'Miche', 'Filone toscano', 'Pane in cassetta'],
            en: ['Daily artisan sourdough', 'Baguette (65–70%)', 'Semolina bread', 'Miche', 'Tuscan loaf', 'Sandwich loaf']
        }
    },
    alta: {
        range: [75, 85],
        colorHex: '#d97706',
        badge: { it: 'Alta idratazione', en: 'High hydration' },
        fascia: { it: '75–85%', en: '75–85%' },
        livello: { it: 'Avanzato', en: 'Advanced' },
        impasto: {
            it: "L'impasto è molto appiccicoso e slack — molle, poco resistente, tende ad allargarsi sul piano. Richiede 5–6 set di pieghe per costruire forza sufficiente. La formatura è impegnativa e richiede sicurezza: movimenti decisi e rapidi, bench rest di 20–30 minuti tra pre-forma e forma finale, abbondante farina di riso o semola nel banneton per evitare che si attacchi.",
            en: "The dough is very sticky and slack — soft, low resistance, tends to spread on the bench. Requires 5–6 fold sets to build sufficient strength. Shaping is demanding and requires confidence: decisive, quick moves, 20–30 minute bench rest between pre-shape and final shape, ample rice flour or semolina in the banneton to prevent sticking."
        },
        risultato: {
            it: "Alveolatura aperta con fori grandi e irregolari — il risultato visivo a cui molti panettieri casalinghi aspirano. Mollica leggera, umida, quasi 'custard-like' al tatto quando è appena tagliata. Crosta ultrasottile e croccante, con il caratteristico crackle nei minuti subito dopo la sfornatura. Sapore più pronunciato e complesso per via della fermentazione più lunga necessaria per costruire la struttura.",
            en: "Open crumb with large, irregular holes — the visual result many home bakers aspire to. Light, moist crumb, almost 'custard-like' to the touch when freshly cut. Ultra-thin, crispy crust with the characteristic crackle in the minutes just after coming out of the oven. More pronounced, complex flavour due to the longer fermentation needed to build structure."
        },
        tempi: {
            it: "La finestra di fermentazione in bulk è critica e più stretta delle fasce inferiori. A 24°C circa 3–4,5 ore con pieghe frequenti (ogni 30 minuti): il passo da 'perfetto' a 'sovra-fermentato' è di soli 30–60 minuti e si paga caro in termini di struttura persa. La cold retard (12–16 ore in frigo) è caldamente raccomandata: raffredda e compatta l'impasto rendendolo molto più maneggevole, e si cuoce direttamente dal frigo. Aspetta almeno 1–2 ore prima di tagliare: la gelatinizzazione dell'amido non è completa fino al raffreddamento completo.",
            en: "The bulk fermentation window is critical and narrower than lower ranges. At 24°C about 3–4.5 hours with frequent folds (every 30 minutes): the gap between 'perfect' and 'over-fermented' is just 30–60 minutes and costs dearly in terms of lost structure. Cold retard (12–16 hours in fridge) is strongly recommended: it chills and firms the dough making it much more manageable, and you bake straight from the fridge. Wait at least 1–2 hours before cutting: starch gelatinisation is not complete until fully cooled."
        },
        attenzione: {
            it: "Se l'impasto si allarga in forno invece di svilupparsi verso l'alto (spreading), le cause sono due: glutine insufficientemente sviluppato durante il bulk, oppure sovra-fermentazione. La soluzione è sempre la stessa — più pieghe e cottura diretta dal frigo. Il taglio (scoring) deve essere profondo almeno 1–1,5 cm inclinato a 45° per consentire l'oven spring: un taglio superficiale su un impasto slack non si apre. Con farine con meno del 12% di proteine la rete glutinica non regge: usa bread flour o farine di forza.",
            en: "If the dough spreads in the oven instead of rising (spreading), there are two causes: insufficiently developed gluten during bulk, or over-fermentation. The solution is always the same — more folds and baking straight from the fridge. Scoring must be at least 1–1.5 cm deep at 45° to allow oven spring: a shallow score on a slack dough won't open. With flours below 12% protein the gluten network won't hold: use bread flour or strong flour."
        },
        pani: {
            it: ['Sourdough artisan loaf', 'Pane integrale ad alta idratazione', 'Blend frumento/segale', 'Miche parigina', 'Pane nordico in blend'],
            en: ['Artisan sourdough loaf', 'High-hydration wholemeal bread', 'Wheat/rye blend bread', 'Parisian miche', 'Nordic-style blend bread']
        }
    },
    'molto-alta': {
        range: [85, 999],
        colorHex: '#dc2626',
        badge: { it: 'Molto alta idratazione', en: 'Very high hydration' },
        fascia: { it: '85%+', en: '85%+' },
        livello: { it: 'Esperto', en: 'Expert' },
        impasto: {
            it: "L'impasto assomiglia più a una pastella densa che a un impasto tradizionale. Praticamente impossibile da formare con le tecniche classiche: non si modella, si 'trasferisce' e si 'guida'. Richiede quasi sempre un contenitore — teglia, stampo o ciotola — per la cottura. Sopra il 90% è di fatto versabile. Anche con la tecnica migliore, il margine di errore è sottile.",
            en: "The dough resembles a thick batter more than a traditional dough. Practically impossible to shape with classic techniques: it doesn't mould, it 'transfers' and 'guides'. Almost always requires a container — baking tin, loaf pan, or bowl — for baking. Above 90% it is effectively pourable. Even with the best technique, the margin for error is thin."
        },
        risultato: {
            it: "Alveolatura estrema con fori molto grandi, irregolari, distribuiti in modo caotico — visivamente spettacolare ma difficile da replicare con coerenza. Mollica leggerissima, quasi eterea al morso, con alta percentuale di umidità residua. Crosta sottilissima e friabile, con crackle pronunciato. Sopra l'85% le bolle tendono a scoppiare e a fondersi: la struttura alveolare fine rischia di compromettersi se la fermentazione o la farina non sono perfette.",
            en: "Extreme crumb with very large, irregular, chaotically distributed holes — visually spectacular but difficult to replicate consistently. Extremely light, almost ethereal crumb texture, with high residual moisture. Very thin, brittle crust with pronounced crackle. Above 85% bubbles tend to burst and merge: the fine alveolar structure risks breaking down if fermentation or flour are not perfect."
        },
        tempi: {
            it: "La fermentazione bulk è estesa — 6–8 ore per costruire forza strutturale tramite acidificazione graduale. L'alternativa è una bulk più breve abbinata a una cold retard prolungata (18–24 ore) per sviluppare struttura tramite il freddo. Il forno deve essere a 240–260°C con pentola o pietra già nella camera di cottura: il contenuto di acqua altissimo richiede temperature elevate e tempi più lunghi (40–50 minuti totali). Raffreddamento obbligatorio di almeno 2 ore prima del taglio — tagliare prima è quasi sempre fatale per la struttura interna.",
            en: "Bulk fermentation is extended — 6–8 hours to build structural strength through gradual acidification. The alternative is a shorter bulk combined with an extended cold retard (18–24 hours) to develop structure through cold. The oven must be at 240–260°C with the Dutch oven or baking stone already in the chamber: the very high water content requires high temperatures and longer total baking times (40–50 minutes). At least 2 hours cooling before cutting is mandatory — cutting earlier is almost always fatal to the internal structure."
        },
        attenzione: {
            it: "La farina inadeguata è il rischio principale: con meno del 12,5–13% di proteine la rete glutinica collassa sotto il peso dell'acqua. È obbligatoria una farina di forza (W300+ o bread flour al 13–14% di proteine). Non tagliare prima del raffreddamento completo: a queste idratazioni la struttura interna si regge in parte sul vapore ancora presente — tagliare presto fa collassare la mollica. La focaccia in teglia è più gestibile del pane libero: il contenitore elimina il problema della formatura.",
            en: "Inadequate flour is the main risk: below 12.5–13% protein the gluten network collapses under the weight of water. Strong flour is mandatory (W300+ or bread flour at 13–14% protein). Do not cut before full cooling: at these hydrations the internal structure partly depends on steam still present — early cutting causes the crumb to collapse. Focaccia in a tin is more manageable than free-form loaves: the container eliminates the shaping problem."
        },
        pani: {
            it: ['Ciabatta (80–85%)', 'Focaccia genovese', 'Pizza in teglia romana', 'Sourdough showcase'],
            en: ['Ciabatta (80–85%)', 'Ligurian focaccia', 'Roman pan pizza', 'Sourdough showcase loaf']
        }
    }
};

export function getFascia(hydration) {
    for (const [key, data] of Object.entries(HYDRATION_INSIGHTS)) {
        if (hydration >= data.range[0] && hydration < data.range[1]) return key;
    }
    return 'bassa';
}

export function getFlourById(id) {
    return FLOUR_TYPES.find(f => f.id === id) || FLOUR_TYPES[0];
}

export function getBlendAbsorptionDelta(entries) {
    let totalPct = 0;
    let weightedDelta = 0;
    for (const { typeId, pct } of entries) {
        const flour = getFlourById(typeId);
        weightedDelta += flour.absorptionDelta * pct;
        totalPct += pct;
    }
    return totalPct > 0 ? weightedDelta / totalPct : 0;
}
