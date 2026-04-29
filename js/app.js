/**
 * Bakery Tools - Main Application
 *
 * Entry point dell'applicazione.
 * Inizializza i moduli e gestisce gli eventi.
 */

import { initRatioCalculator, rerenderCalcolatore } from './ratio.js?v=0.5';
import { initHydrationCalculator, rerenderHydration } from './hydration.js?v=0.5';
import {
    calculateRefresh,
    validateParams,
    calculateMaintenance,
    validateMaintenanceParams
} from './calculator.js?v=0.5';
import {
    renderResults,
    renderMaintenanceResults,
    renderValidationErrors,
    injectErrorStyles
} from './ui.js?v=0.5';
import {
    loadSavedLang,
    getCurrentLang,
    toggleLang,
    updatePageTranslations,
    t
} from './i18n.js?v=0.5';
import {
    loadSavedUnit,
    isCelsius,
    toggleUnit,
    updatePageTemperatures,
    getUnitLabel
} from './temperature.js?v=0.5';
import {
    loadSavedWeightUnit,
    isGrams,
    toggleWeightUnit,
    getWeightUnitLabel,
    updatePageWeightUnits,
    convertValue,
    fromCurrentUnit
} from './units.js?v=0.5';

// Riferimenti globali per ricalcolo dopo cambio lingua
let levainInputs = null;
let maintenanceInputs = null;

/**
 * Inizializza l'applicazione
 */
function init() {
    // Carica preferenze salvate
    loadSavedLang();
    loadSavedUnit();
    loadSavedWeightUnit();

    // Inietta stili per errori
    injectErrorStyles();

    // Inizializza controlli header
    initMenuToggle();
    initLanguageToggle();
    initTemperatureToggle();
    initWeightToggle();

    // Aggiorna traduzioni, temperature e unità peso iniziali
    updatePageTranslations();
    updatePageTemperatures();
    updatePageWeightUnits();

    // Inizializza le tab
    initTabs();

    // Inizializza Prepara Levain
    initLevainCalculator();

    // Inizializza Rinfresco Giornaliero
    initMaintenanceCalculator();

    // Inizializza scroll to top button
    initScrollToTop();

    // Inizializza Calcolatore ratio
    initRatioCalculator();

    // Inizializza Calcolatore Idratazione
    initHydrationCalculator();
}

/**
 * Inizializza il menu hamburger per mobile
 */
function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const headerControls = document.getElementById('header-controls');

    if (!menuToggle || !headerControls) return;

    menuToggle.addEventListener('click', () => {
        headerControls.classList.toggle('open');
    });

    // Chiudi il menu quando si clicca fuori
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !headerControls.contains(e.target)) {
            headerControls.classList.remove('open');
        }
    });
}

/**
 * Inizializza il toggle lingua
 */
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langLabel = langToggle.querySelector('.control-label');

    // Imposta label iniziale
    langLabel.textContent = getCurrentLang().toUpperCase();

    langToggle.addEventListener('click', () => {
        const newLang = toggleLang();
        langLabel.textContent = newLang.toUpperCase();

        // Ricalcola i risultati con la nuova lingua
        if (levainInputs) {
            handleLevainCalculate(...levainInputs);
        }
    });
}

/**
 * Inizializza il toggle temperatura
 */
function initTemperatureToggle() {
    const tempToggle = document.getElementById('temp-toggle');
    const tempLabel = tempToggle.querySelector('.control-label');

    // Imposta label iniziale
    tempLabel.textContent = getUnitLabel();

    tempToggle.addEventListener('click', () => {
        const celsius = toggleUnit();
        tempLabel.textContent = getUnitLabel();

        // Ricalcola i risultati con la nuova unità
        if (levainInputs) {
            handleLevainCalculate(...levainInputs);
        }
        if (maintenanceInputs) {
            handleMaintenanceCalculate(...maintenanceInputs);
        }
        updatePageTemperatures();
        rerenderCalcolatore();
    });
}

/**
 * Inizializza il toggle unità peso
 */
function initWeightToggle() {
    const weightToggle = document.getElementById('weight-toggle');
    const weightLabel = weightToggle.querySelector('.control-label');

    // Imposta label iniziale
    weightLabel.textContent = getWeightUnitLabel();

    weightToggle.addEventListener('click', () => {
        const nowGrams = toggleWeightUnit();
        weightLabel.textContent = getWeightUnitLabel();

        // Converti i valori nei campi di input
        const targetAmountInput = document.getElementById('target-amount');
        const flourAmountInput = document.getElementById('flour-amount');

        if (targetAmountInput.value) {
            const currentValue = parseFloat(targetAmountInput.value);
            targetAmountInput.value = convertValue(currentValue, nowGrams);
        }
        if (flourAmountInput.value) {
            const currentValue = parseFloat(flourAmountInput.value);
            flourAmountInput.value = convertValue(currentValue, nowGrams);
        }

        // Converti anche i valori del calcolatore ratio
        const calcFarinaInput = document.getElementById('calc-farina');
        const calcAcquaInput  = document.getElementById('calc-acqua');
        if (calcFarinaInput?.value) {
            calcFarinaInput.value = convertValue(parseFloat(calcFarinaInput.value), nowGrams);
        }
        if (calcAcquaInput?.value) {
            calcAcquaInput.value = convertValue(parseFloat(calcAcquaInput.value), nowGrams);
        }

        // Converti i valori del calcolatore idratazione (solo campi peso, non percentuali)
        ['hyd-farina', 'hyd-acqua', 'hyd-lm'].forEach(id => {
            const el = document.getElementById(id);
            if (el?.value) el.value = convertValue(parseFloat(el.value), nowGrams);
        });

        // Aggiorna etichette nelle form
        updatePageWeightUnits();
        rerenderCalcolatore();

        // Ricalcola i risultati con la nuova unità
        if (levainInputs) {
            handleLevainCalculate(...levainInputs);
        }
        if (maintenanceInputs) {
            handleMaintenanceCalculate(...maintenanceInputs);
        }
        rerenderHydration();
    });
}

/**
 * Gestisce il sistema di tab
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Rimuovi active da tutti
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Attiva la tab selezionata
            btn.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');

            // Scrolla il bottone attivo in view nel tab nav (mobile)
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        });
    });
}

/**
 * Inizializza il calcolatore Prepara Levain
 */
function initLevainCalculator() {
    const targetAmountInput = document.getElementById('target-amount');
    const hydrationInput = document.getElementById('hydration');
    const targetHoursInput = document.getElementById('target-hours');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsContainer = document.getElementById('results-container');

    // Salva riferimenti per ricalcolo
    levainInputs = [targetAmountInput, hydrationInput, targetHoursInput, resultsContainer];

    // Event listener per il pulsante
    calculateBtn.addEventListener('click', () => {
        handleLevainCalculate(
            targetAmountInput,
            hydrationInput,
            targetHoursInput,
            resultsContainer
        );
    });

    // Permetti anche Enter per calcolare
    [targetAmountInput, hydrationInput, targetHoursInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleLevainCalculate(
                    targetAmountInput,
                    hydrationInput,
                    targetHoursInput,
                    resultsContainer
                );
            }
        });
    });

    // Calcola con i valori di default al caricamento
    handleLevainCalculate(
        targetAmountInput,
        hydrationInput,
        targetHoursInput,
        resultsContainer
    );
}

/**
 * Gestisce il calcolo Prepara Levain
 */
function handleLevainCalculate(amountInput, hydrationInput, hoursInput, container) {
    const inputValue = parseFloat(amountInput.value) || 0;
    const hydration = parseFloat(hydrationInput.value) || 100;
    const targetHours = parseFloat(hoursInput.value) || 12;

    // Converti in grammi per validazione e calcolo
    const targetAmount = fromCurrentUnit(inputValue);

    // Valida parametri (sempre in grammi)
    const validation = validateParams(targetAmount, hydration, targetHours);

    if (!validation.isValid) {
        renderValidationErrors(validation.errors, container);
        return;
    }

    // Esegui calcolo (sempre in grammi, la visualizzazione converte)
    const result = calculateRefresh(targetAmount, hydration, targetHours);

    // Renderizza risultati
    renderResults(result, container);

    // Scroll ai risultati su mobile
    scrollToResultsOnMobile(container);
}

/**
 * Inizializza il calcolatore Rinfresco Giornaliero
 */
function initMaintenanceCalculator() {
    const flourAmountInput = document.getElementById('flour-amount');
    const hydrationInput = document.getElementById('maintenance-hydration');
    const nextRefreshInput = document.getElementById('next-refresh-hours');
    const calculateBtn = document.getElementById('calculate-maintenance-btn');
    const resultsContainer = document.getElementById('maintenance-results-container');

    // Salva riferimenti per ricalcolo
    maintenanceInputs = [flourAmountInput, hydrationInput, nextRefreshInput, resultsContainer];

    // Event listener per il pulsante
    calculateBtn.addEventListener('click', () => {
        handleMaintenanceCalculate(
            flourAmountInput,
            hydrationInput,
            nextRefreshInput,
            resultsContainer
        );
    });

    // Permetti anche Enter per calcolare
    [flourAmountInput, hydrationInput, nextRefreshInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleMaintenanceCalculate(
                    flourAmountInput,
                    hydrationInput,
                    nextRefreshInput,
                    resultsContainer
                );
            }
        });
    });
}

/**
 * Gestisce il calcolo Rinfresco Giornaliero
 */
function handleMaintenanceCalculate(flourInput, hydrationInput, hoursInput, container) {
    const inputValue = parseFloat(flourInput.value) || 0;
    const hydration = parseFloat(hydrationInput.value) || 100;
    const targetHours = parseFloat(hoursInput.value) || 24;

    // Converti in grammi per validazione e calcolo
    const flourAmount = fromCurrentUnit(inputValue);

    // Valida parametri (sempre in grammi)
    const validation = validateMaintenanceParams(flourAmount, hydration, targetHours);

    if (!validation.isValid) {
        renderValidationErrors(validation.errors, container);
        return;
    }

    // Esegui calcolo (sempre in grammi, la visualizzazione converte)
    const result = calculateMaintenance(flourAmount, hydration, targetHours);

    // Renderizza risultati
    renderMaintenanceResults(result, container);

    // Scroll ai risultati su mobile
    scrollToResultsOnMobile(container);
}

/**
 * Inizializza il pulsante scroll to top
 */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (!scrollBtn) return;

    // Mostra/nascondi il pulsante in base allo scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Click per tornare in alto
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Scrolla ai risultati su dispositivi mobile dopo il calcolo
 * NOTA: Funzione disabilitata - lo scroll automatico era fastidioso su mobile
 */
function scrollToResultsOnMobile() {
    // Scroll automatico disabilitato
}

// Avvia l'app quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
