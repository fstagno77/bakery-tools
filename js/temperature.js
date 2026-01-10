/**
 * Temperature Unit Module
 *
 * Gestisce la conversione e visualizzazione Celsius/Fahrenheit.
 */

// Stato corrente
let useCelsius = true;

// Dati temperature per i range
export const temperatureRanges = {
    cool: {
        celsius: { label: "21–22 °C", min: 21, max: 22 },
        fahrenheit: { label: "70–72 °F", min: 70, max: 72 }
    },
    medium: {
        celsius: { label: "22–24 °C", min: 22, max: 24 },
        fahrenheit: { label: "72–75 °F", min: 72, max: 75 }
    },
    warm: {
        celsius: { label: "> 24 °C", min: 24, max: 30 },
        fahrenheit: { label: "> 75 °F", min: 75, max: 86 }
    }
};

/**
 * Ottiene l'unità corrente
 */
export function isCelsius() {
    return useCelsius;
}

/**
 * Imposta l'unità
 */
export function setUnit(celsius) {
    useCelsius = celsius;
    localStorage.setItem('bakery-tools-temp-unit', celsius ? 'C' : 'F');
}

/**
 * Carica l'unità salvata
 */
export function loadSavedUnit() {
    const saved = localStorage.getItem('bakery-tools-temp-unit');
    if (saved) {
        useCelsius = saved === 'C';
    }
    return useCelsius;
}

/**
 * Toggle tra Celsius e Fahrenheit
 */
export function toggleUnit() {
    useCelsius = !useCelsius;
    localStorage.setItem('bakery-tools-temp-unit', useCelsius ? 'C' : 'F');
    updatePageTemperatures();
    return useCelsius;
}

/**
 * Ottiene i range di temperatura per l'unità corrente
 */
export function getTemperatureRanges() {
    const unit = useCelsius ? 'celsius' : 'fahrenheit';
    return {
        cool: temperatureRanges.cool[unit],
        medium: temperatureRanges.medium[unit],
        warm: temperatureRanges.warm[unit]
    };
}

/**
 * Aggiorna tutte le temperature nella pagina
 */
export function updatePageTemperatures() {
    // Aggiorna gli header della tabella
    document.querySelectorAll('.temp-header').forEach(el => {
        const tempC = el.getAttribute('data-temp-c');
        const tempF = el.getAttribute('data-temp-f');
        el.textContent = useCelsius ? tempC : tempF;
    });

    // Aggiorna i label nelle card dei risultati
    document.querySelectorAll('.temp-label').forEach(el => {
        const tempC = el.getAttribute('data-temp-c');
        const tempF = el.getAttribute('data-temp-f');
        if (tempC && tempF) {
            el.textContent = useCelsius ? tempC : tempF;
        }
    });
}

/**
 * Ottiene il label dell'unità corrente
 */
export function getUnitLabel() {
    return useCelsius ? '°C' : '°F';
}
