/**
 * Internationalization (i18n) Module
 *
 * Gestisce le traduzioni italiano/inglese del sito.
 */

export const translations = {
    it: {
        // Header
        tagline: "Strumenti per il panificatore",

        // Navigation
        "nav.calculator": "Calcolatore Rinfresco",

        // Calculator
        "calculator.title": "Calcolatore Lievito Madre",
        "calculator.description": "Calcola le proporzioni ottimali per preparare il levain o per il rinfresco giornaliero.",

        // Tabs
        "tabs.levain": "Prepara Levain",
        "tabs.maintenance": "Rinfresco Giornaliero",
        "tabs.maintenance.short": "Rinfresco",
        "tabs.storage": "Pausa",

        // Levain tab
        "levain.description": "Calcola le quantità per ottenere lo starter desiderato per la panificazione.",
        "levain.targetAmount": "Quantità starter desiderata",
        "levain.maturationWindow": "Finestra di maturazione",
        "levain.maturationHint": "Quando prevedi di usare lo starter",

        // Maintenance tab
        "maintenance.description": "Calcola l'inoculo ottimale partendo dalla farina disponibile e dal tempo al prossimo rinfresco.",
        "maintenance.flourAmount": "Farina disponibile",
        "maintenance.nextRefresh": "Ore al prossimo rinfresco",
        "maintenance.nextRefreshHint": "Quando prevedi di rinfrescare di nuovo",
        "maintenance.calculateInoculum": "Calcola Inoculo",

        // Form common
        "form.parameters": "Parametri",
        "form.hydration": "Idratazione",
        "form.hydrationHint": "100% = parti uguali farina e acqua",
        "form.hours": "ore",
        "form.calculate": "Calcola",

        // Results
        "results.title": "Risultati",
        "results.placeholder": "Inserisci i parametri e premi Calcola",
        "results.recommended": "Consigliato",
        "results.total": "Totale",
        "results.starter": "Starter",
        "results.starterVariable": "(variabile)",
        "results.inoculum": "Inoculo",
        "results.flour": "Farina",
        "results.water": "Acqua",
        "results.summaryLevain": "Per ottenere circa <strong>{amount}g</strong> di starter al <strong>{hydration}%</strong> di idratazione in circa <strong>{hours} ore</strong>:",
        "results.summaryMaintenance": "Con <strong>{flour}g</strong> di farina al <strong>{hydration}%</strong> di idratazione, per rinfrescare tra <strong>{hours} ore</strong>:",
        "results.noteLevain": "Farina e acqua sono arrotondate a numeri comodi, lo starter è calcolato per rispettare la ratio.",
        "results.noteMaintenance": "L'inoculo (starter) determina la velocità di fermentazione.",

        // Reference table
        "reference.title": "Tabella di Riferimento",
        "reference.intro": "Tempi indicativi di maturazione per rapporto e temperatura ambiente. Conferma sempre osservando volume, superficie e aroma.",
        "reference.ratio": "Rapporto",

        // Storage
        "storage.shortTerm.title": "Conservazione in Frigo",
        "storage.shortTerm.duration": "fino a 2 settimane",
        "storage.shortTerm.intro": "Per fare una pausa dalla panificazione fino a due settimane, rallenta lo starter con idratazione ridotta e temperatura bassa.",
        "storage.shortTerm.step1.title": "Prepara",
        "storage.shortTerm.step1.text": "In un barattolo pulito con coperchio, aggiungi 20g di starter maturo con 100g di farina e 80g di acqua a temperatura ambiente. Mescola fino a incorporare tutta la farina.",
        "storage.shortTerm.step2.title": "Fermenta e Refrigera",
        "storage.shortTerm.step2.text": "Copri e lascia riposare a temperatura ambiente per 1-2 ore per avviare la fermentazione. Poi metti in frigorifero per un massimo di 2 settimane.",
        "storage.shortTerm.step3.title": "Riattiva",
        "storage.shortTerm.step3.text": "Lascia lo starter a temperatura ambiente per 1-2 ore. Mescola il contenuto per reincorporare tutto - potrebbe avere o meno bolle, va bene lo stesso.",
        "storage.shortTerm.step4.title": "Rinfreschi di Recupero",
        "storage.shortTerm.step4.text": "Procedi con il normale rinfresco (scarta, aggiungi farina e acqua fresche) e metti in un posto caldo. A 23-24°C ci vorranno circa 12 ore. Fai 2-3 rinfreschi regolari prima di usarlo per panificare.",
        "storage.tip": "Consiglio:",
        "storage.shortTerm.tip": "L'idratazione ridotta (80%) rende lo starter più denso e rallenta ulteriormente la fermentazione in frigo.",
        "storage.starter": "starter",
        "storage.flour": "farina",
        "storage.water": "acqua",

        // Errors
        "error.minAmount": "La quantità deve essere almeno 10g",
        "error.maxAmount": "La quantità massima è 5000g",
        "error.minFlour": "La farina deve essere almeno 10g",
        "error.maxFlour": "La farina massima è 1000g",
        "error.minHydration": "L'idratazione deve essere almeno 50%",
        "error.maxHydration": "L'idratazione massima è 150%",
        "error.minTime": "Il tempo minimo è 2 ore",
        "error.maxTime": "Il tempo massimo è 24 ore",
        "error.tooShort": "{hours} ore è troppo breve. Il tempo minimo con rapporto 1:1:1 a temperatura alta è {min} ore.",
        "error.tooLong": "{hours} ore è troppo lungo. Considera di conservare lo starter in frigorifero oppure usa un rapporto 1:20:20 o superiore.",
        "error.noMatch": "Nessun rapporto trovato per questi parametri.",

        // Validation
        "validation.minAmount": "La quantità deve essere almeno {min}",
        "validation.maxAmount": "La quantità massima è {max}",
        "validation.minFlour": "La farina deve essere almeno {min}",
        "validation.maxFlour": "La farina massima è {max}",
        "validation.minHydration": "L'idratazione deve essere almeno 50%",
        "validation.maxHydration": "L'idratazione massima è 150%",
        "validation.minHours": "Il tempo minimo è 2 ore",
        "validation.maxHours": "Il tempo massimo è 24 ore"
    },

    en: {
        // Header
        tagline: "Tools for bakers",

        // Navigation
        "nav.calculator": "Refresh Calculator",

        // Calculator
        "calculator.title": "Sourdough Starter Calculator",
        "calculator.description": "Calculate optimal proportions for levain preparation or daily maintenance feeding.",

        // Tabs
        "tabs.levain": "Build Levain",
        "tabs.maintenance": "Daily Feeding",
        "tabs.maintenance.short": "Feeding",
        "tabs.storage": "Storage",

        // Levain tab
        "levain.description": "Calculate quantities to obtain the desired starter for baking.",
        "levain.targetAmount": "Desired starter amount",
        "levain.maturationWindow": "Maturation window",
        "levain.maturationHint": "When you plan to use the starter",

        // Maintenance tab
        "maintenance.description": "Calculate optimal inoculum from available flour and time to next feeding.",
        "maintenance.flourAmount": "Available flour",
        "maintenance.nextRefresh": "Hours to next feeding",
        "maintenance.nextRefreshHint": "When you plan to feed again",
        "maintenance.calculateInoculum": "Calculate Inoculum",

        // Form common
        "form.parameters": "Parameters",
        "form.hydration": "Hydration",
        "form.hydrationHint": "100% = equal parts flour and water",
        "form.hours": "hours",
        "form.calculate": "Calculate",

        // Results
        "results.title": "Results",
        "results.placeholder": "Enter parameters and press Calculate",
        "results.recommended": "Recommended",
        "results.total": "Total",
        "results.starter": "Starter",
        "results.starterVariable": "(variable)",
        "results.inoculum": "Inoculum",
        "results.flour": "Flour",
        "results.water": "Water",
        "results.summaryLevain": "To obtain approximately <strong>{amount}g</strong> of starter at <strong>{hydration}%</strong> hydration in about <strong>{hours} hours</strong>:",
        "results.summaryMaintenance": "With <strong>{flour}g</strong> of flour at <strong>{hydration}%</strong> hydration, to feed in <strong>{hours} hours</strong>:",
        "results.noteLevain": "Flour and water are rounded to convenient numbers, starter is calculated to maintain the ratio.",
        "results.noteMaintenance": "The inoculum (starter) determines fermentation speed.",

        // Reference table
        "reference.title": "Reference Table",
        "reference.intro": "Approximate maturation times by ratio and ambient temperature. Always confirm by observing volume, surface and aroma.",
        "reference.ratio": "Ratio",

        // Storage
        "storage.shortTerm.title": "Refrigerator Storage",
        "storage.shortTerm.duration": "up to 2 weeks",
        "storage.shortTerm.intro": "To take a break from baking for up to two weeks, slow down your starter with reduced hydration and low temperature.",
        "storage.shortTerm.step1.title": "Prepare",
        "storage.shortTerm.step1.text": "To a clean jar with a lid, add 20g ripe starter along with 100g all-purpose flour. Add 80g room-temperature water and mix until no dry flour remains.",
        "storage.shortTerm.step2.title": "Ferment and Refrigerate",
        "storage.shortTerm.step2.text": "Cover and let sit on the counter for 1-2 hours to allow fermentation to get going. Place in the refrigerator for up to 2 weeks.",
        "storage.shortTerm.step3.title": "Revive",
        "storage.shortTerm.step3.text": "Let the starter sit at room temperature for 1-2 hours to warm up. Stir the contents so everything is reincorporated - it may or may not have bubbles at this point; that's okay.",
        "storage.shortTerm.step4.title": "Recovery Feedings",
        "storage.shortTerm.step4.text": "Proceed with your normal starter feeding (discard, add fresh flour and water) and place in a warm spot. At 74-76°F (23-24°C), this is usually around 12 hours. Give the starter 2-3 more regular refreshments before using for baking.",
        "storage.tip": "Tip:",
        "storage.shortTerm.tip": "The reduced hydration (80%) makes the starter stiffer and further slows fermentation in the fridge.",
        "storage.starter": "starter",
        "storage.flour": "flour",
        "storage.water": "water",

        // Errors
        "error.minAmount": "Amount must be at least 10g",
        "error.maxAmount": "Maximum amount is 5000g",
        "error.minFlour": "Flour must be at least 10g",
        "error.maxFlour": "Maximum flour is 1000g",
        "error.minHydration": "Hydration must be at least 50%",
        "error.maxHydration": "Maximum hydration is 150%",
        "error.minTime": "Minimum time is 2 hours",
        "error.maxTime": "Maximum time is 24 hours",
        "error.tooShort": "{hours} hours is too short. Minimum time with 1:1:1 ratio at high temperature is {min} hours.",
        "error.tooLong": "{hours} hours is too long. Consider refrigerating the starter or use a 1:20:20 ratio or higher.",
        "error.noMatch": "No suitable ratio found for these parameters.",

        // Validation
        "validation.minAmount": "Amount must be at least {min}",
        "validation.maxAmount": "Maximum amount is {max}",
        "validation.minFlour": "Flour must be at least {min}",
        "validation.maxFlour": "Maximum flour is {max}",
        "validation.minHydration": "Hydration must be at least 50%",
        "validation.maxHydration": "Maximum hydration is 150%",
        "validation.minHours": "Minimum time is 2 hours",
        "validation.maxHours": "Maximum time is 24 hours"
    }
};

// Stato corrente
let currentLang = 'it';

/**
 * Ottiene la lingua corrente
 */
export function getCurrentLang() {
    return currentLang;
}

/**
 * Imposta la lingua
 */
export function setLang(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('bakery-tools-lang', lang);
        return true;
    }
    return false;
}

/**
 * Rileva la lingua del browser
 */
function detectBrowserLang() {
    const browserLang = navigator.language || navigator.userLanguage || '';
    // Se la lingua del browser inizia con 'it', usa italiano
    return browserLang.toLowerCase().startsWith('it') ? 'it' : 'en';
}

/**
 * Carica la lingua salvata o rileva automaticamente
 */
export function loadSavedLang() {
    const saved = localStorage.getItem('bakery-tools-lang');
    if (saved && translations[saved]) {
        currentLang = saved;
    } else {
        // Nessuna preferenza salvata: rileva dalla lingua del browser
        currentLang = detectBrowserLang();
    }
    return currentLang;
}

/**
 * Ottiene una traduzione
 */
export function t(key, replacements = {}) {
    const text = translations[currentLang][key] || translations['it'][key] || key;

    // Sostituisci i placeholder {key} con i valori
    return text.replace(/\{(\w+)\}/g, (match, key) => {
        return replacements[key] !== undefined ? replacements[key] : match;
    });
}

/**
 * Aggiorna tutti gli elementi con data-i18n
 */
export function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Aggiorna anche il title della pagina
    document.title = currentLang === 'it'
        ? 'Bakery Tools - Strumenti per la Panificazione'
        : 'Bakery Tools - Baking Tools';

    // Aggiorna l'attributo lang dell'html
    document.documentElement.lang = currentLang;
}

/**
 * Toggle tra italiano e inglese
 */
export function toggleLang() {
    const newLang = currentLang === 'it' ? 'en' : 'it';
    setLang(newLang);
    updatePageTranslations();
    return newLang;
}
