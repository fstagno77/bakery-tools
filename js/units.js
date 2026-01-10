/**
 * Weight Units Module
 *
 * Gestisce la conversione tra grammi e once (oz).
 * 1 oz = 28.35 g
 */

// Stato corrente
let useGrams = true;

// Fattore di conversione
const GRAMS_PER_OZ = 28.35;

/**
 * Ottiene l'unità corrente
 */
export function isGrams() {
    return useGrams;
}

/**
 * Imposta l'unità
 */
export function setWeightUnit(grams) {
    useGrams = grams;
    localStorage.setItem('bakery-tools-weight-unit', grams ? 'g' : 'oz');
}

/**
 * Carica l'unità salvata
 */
export function loadSavedWeightUnit() {
    const saved = localStorage.getItem('bakery-tools-weight-unit');
    if (saved) {
        useGrams = saved === 'g';
    }
    return useGrams;
}

/**
 * Toggle tra grammi e once
 */
export function toggleWeightUnit() {
    useGrams = !useGrams;
    localStorage.setItem('bakery-tools-weight-unit', useGrams ? 'g' : 'oz');
    return useGrams;
}

/**
 * Converte grammi in once
 */
export function gramsToOz(grams) {
    return grams / GRAMS_PER_OZ;
}

/**
 * Converte once in grammi
 */
export function ozToGrams(oz) {
    return oz * GRAMS_PER_OZ;
}

/**
 * Formatta un peso nell'unità corrente
 */
export function formatWeight(grams) {
    if (useGrams) {
        return `${Math.round(grams)}g`;
    } else {
        const oz = gramsToOz(grams);
        // Arrotonda a 1 decimale per le once
        return `${oz.toFixed(1)} oz`;
    }
}

/**
 * Ottiene il label dell'unità corrente
 */
export function getWeightUnitLabel() {
    return useGrams ? 'g' : 'oz';
}

/**
 * Ottiene il valore nell'unità corrente (per input)
 */
export function toCurrentUnit(grams) {
    if (useGrams) {
        return Math.round(grams);
    } else {
        return parseFloat(gramsToOz(grams).toFixed(1));
    }
}

/**
 * Converte dall'unità corrente a grammi (per calcoli)
 */
export function fromCurrentUnit(value) {
    if (useGrams) {
        return value;
    } else {
        return ozToGrams(value);
    }
}

/**
 * Aggiorna tutte le etichette di peso nella pagina
 */
export function updatePageWeightUnits() {
    const label = getWeightUnitLabel();
    document.querySelectorAll('.weight-unit').forEach(el => {
        el.textContent = label;
    });
}

/**
 * Converte un valore da un'unità all'altra
 * @param {number} value - Valore da convertire
 * @param {boolean} toGrams - true se stiamo convertendo verso grammi, false verso oz
 */
export function convertValue(value, toGrams) {
    if (toGrams) {
        return Math.round(ozToGrams(value));
    } else {
        return parseFloat(gramsToOz(value).toFixed(1));
    }
}
