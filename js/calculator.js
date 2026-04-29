/**
 * Starter Refresh Calculator Module
 *
 * Calcola le proporzioni ottimali per il rinfresco del lievito madre
 * basandosi su quantità desiderata, idratazione e finestra temporale.
 */

import { fermentationData } from './data.js?v=0.5';

/**
 * Arrotonda un valore a un numero "comodo" (multiplo di 5)
 * Arrotonda sempre per eccesso, con un massimo di 4g di aggiunta
 *
 * @param {number} value - Valore da arrotondare
 * @returns {number} Valore arrotondato
 */
function roundToNiceNumber(value) {
    const rounded = Math.round(value);
    const remainder = rounded % 5;

    if (remainder === 0) {
        return rounded;
    }

    // Arrotonda per eccesso al prossimo multiplo di 5
    // Ma solo se l'aggiunta è <= 4g
    const roundedUp = rounded + (5 - remainder);
    const difference = roundedUp - value;

    if (difference <= 4) {
        return roundedUp;
    }

    // Se l'arrotondamento per eccesso supera 4g, usa il valore arrotondato semplice
    return rounded;
}

/**
 * Calcola le quantità di starter, farina e acqua dato un rapporto e la quantità totale desiderata
 *
 * REGOLA: Farina e acqua vengono arrotondate a numeri "comodi" (multipli di 5),
 * lo starter viene ricalcolato per mantenere la ratio corretta e centrare l'obiettivo.
 *
 * @param {number} targetAmount - Quantità totale desiderata in grammi
 * @param {number} hydration - Percentuale di idratazione (es. 100 = 100%)
 * @param {Object} ratioData - Dati del rapporto dal JSON
 * @returns {Object} Quantità calcolate {starter, flour, water, total}
 */
export function calculateAmounts(targetAmount, hydration, ratioData) {
    const { starterPart, flourPart } = ratioData;

    // L'idratazione influenza il rapporto acqua/farina
    const adjustedWaterPart = flourPart * (hydration / 100);

    // Somma totale delle parti
    const totalParts = starterPart + flourPart + adjustedWaterPart;

    // Calcola il peso di ogni parte (valori grezzi)
    const partWeight = targetAmount / totalParts;
    const rawFlour = partWeight * flourPart;
    const rawWater = partWeight * adjustedWaterPart;

    // Arrotonda farina e acqua a numeri comodi
    const flour = roundToNiceNumber(rawFlour);
    const water = roundToNiceNumber(rawWater);

    // Ricalcola lo starter per mantenere la ratio corretta
    // La ratio dice: starter : flour = starterPart : flourPart
    // Quindi: starter = flour * (starterPart / flourPart)
    const starterFromRatio = flour * (starterPart / flourPart);
    const starter = Math.round(starterFromRatio);

    // Calcola il totale effettivo
    const total = starter + flour + water;

    return {
        starter,
        flour,
        water,
        total
    };
}

/**
 * Trova i rapporti adatti per una determinata finestra temporale
 *
 * @param {number} targetHours - Ore entro cui si vuole usare lo starter
 * @param {Array} ratios - Array di rapporti dal JSON
 * @returns {Array} Rapporti compatibili con indicazione se raccomandato
 */
export function findSuitableRatios(targetHours, ratios) {
    const suitable = [];

    for (const ratioData of ratios) {
        const compatibility = checkTimeCompatibility(targetHours, ratioData.times);

        if (compatibility.isCompatible) {
            suitable.push({
                ...ratioData,
                compatibility
            });
        }
    }

    // Ordina per quanto bene il tempo target cade nel range
    suitable.sort((a, b) => {
        // Priorità ai rapporti dove il target è più centrato nel range
        return a.compatibility.score - b.compatibility.score;
    });

    // Il primo è il raccomandato
    if (suitable.length > 0) {
        suitable[0].isRecommended = true;
    }

    return suitable;
}

/**
 * Verifica se un tempo target è compatibile con i tempi di un rapporto
 *
 * @param {number} targetHours - Ore desiderate
 * @param {Object} times - Oggetto con tempi per temperatura {cool, medium, warm}
 * @returns {Object} Risultato compatibilità
 */
function checkTimeCompatibility(targetHours, times) {
    // Controlla compatibilità per ogni range di temperatura
    const tempResults = {};
    let hasAnyMatch = false;
    let bestScore = Infinity;

    for (const [temp, range] of Object.entries(times)) {
        const { min, max } = range;

        // Il target deve cadere nel range (con un po' di tolleranza)
        const tolerance = 1; // 1 ora di tolleranza
        const isInRange = targetHours >= (min - tolerance) && targetHours <= (max + tolerance);
        const isExactMatch = targetHours >= min && targetHours <= max;

        // Calcola quanto il target è centrato nel range
        const midpoint = (min + max) / 2;
        const distanceFromCenter = Math.abs(targetHours - midpoint);
        const rangeSize = max - min;
        const score = distanceFromCenter / rangeSize;

        tempResults[temp] = {
            isInRange,
            isExactMatch,
            score
        };

        if (isInRange) {
            hasAnyMatch = true;
            bestScore = Math.min(bestScore, score);
        }
    }

    return {
        isCompatible: hasAnyMatch,
        tempResults,
        score: bestScore
    };
}

/**
 * Esegue il calcolo completo per il rinfresco
 *
 * @param {number} targetAmount - Grammi di starter desiderati
 * @param {number} hydration - Percentuale idratazione
 * @param {number} targetHours - Ore per la maturazione
 * @returns {Object} Risultati completi
 */
export function calculateRefresh(targetAmount, hydration, targetHours) {
    const { ratios, temperatureRanges } = fermentationData;

    // Trova rapporti compatibili con il tempo
    const suitableRatios = findSuitableRatios(targetHours, ratios);

    if (suitableRatios.length === 0) {
        return {
            success: false,
            message: getNoMatchMessage(targetHours, ratios),
            results: []
        };
    }

    // Calcola le quantità per ogni rapporto compatibile
    const results = suitableRatios.map(ratioData => {
        const amounts = calculateAmounts(targetAmount, hydration, ratioData);

        return {
            ratio: ratioData.ratio,
            isRecommended: ratioData.isRecommended || false,
            amounts,
            times: ratioData.times,
            compatibility: ratioData.compatibility
        };
    });

    return {
        success: true,
        results,
        temperatureRanges,
        params: {
            targetAmount,
            hydration,
            targetHours
        }
    };
}

/**
 * Genera un messaggio quando non ci sono rapporti compatibili
 */
function getNoMatchMessage(targetHours, ratios) {
    const allTimes = ratios.flatMap(r =>
        Object.values(r.times).flatMap(t => [t.min, t.max])
    );
    const minTime = Math.min(...allTimes);
    const maxTime = Math.max(...allTimes);

    if (targetHours < minTime) {
        return `${targetHours} ore è troppo breve. Il tempo minimo con rapporto 1:1:1 a temperatura alta è ${minTime} ore.`;
    }
    if (targetHours > maxTime) {
        return `${targetHours} ore è troppo lungo. Considera di conservare lo starter in frigorifero oppure usa un rapporto 1:20:20 o superiore.`;
    }

    return 'Nessun rapporto trovato per questi parametri.';
}

/**
 * Valida i parametri di input per Prepara Levain
 * I valori sono sempre in grammi internamente
 */
export function validateParams(targetAmount, hydration, targetHours) {
    const errors = [];

    if (!targetAmount || targetAmount < 10) {
        errors.push('validation.minAmount');
    }
    if (targetAmount > 5000) {
        errors.push('validation.maxAmount');
    }
    if (!hydration || hydration < 50) {
        errors.push('validation.minHydration');
    }
    if (hydration > 150) {
        errors.push('validation.maxHydration');
    }
    if (!targetHours || targetHours < 2) {
        errors.push('validation.minHours');
    }
    if (targetHours > 24) {
        errors.push('validation.maxHours');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// ============================================
// RINFRESCO GIORNALIERO (Maintenance)
// ============================================

/**
 * Calcola l'inoculo ottimale per il rinfresco giornaliero
 *
 * Partendo dalla farina disponibile e dal tempo al prossimo rinfresco,
 * calcola la quantità di starter (inoculo) da usare per ogni temperatura.
 *
 * @param {number} flourAmount - Grammi di farina disponibile
 * @param {number} hydration - Percentuale di idratazione
 * @param {number} targetHours - Ore al prossimo rinfresco
 * @returns {Object} Risultati con inoculo per ogni temperatura
 */
export function calculateMaintenance(flourAmount, hydration, targetHours) {
    const { ratios, temperatureRanges } = fermentationData;

    // Trova i rapporti compatibili con il tempo desiderato
    const suitableRatios = findSuitableRatios(targetHours, ratios);

    if (suitableRatios.length === 0) {
        return {
            success: false,
            message: getNoMatchMessage(targetHours, ratios),
            results: []
        };
    }

    // Calcola l'acqua in base all'idratazione
    const water = roundToNiceNumber(flourAmount * (hydration / 100));

    // Per ogni rapporto compatibile, calcola l'inoculo
    const results = suitableRatios.map(ratioData => {
        // La ratio dice: starter : flour = starterPart : flourPart
        // Quindi: starter = flour * (starterPart / flourPart)
        const starterRaw = flourAmount * (ratioData.starterPart / ratioData.flourPart);
        const starter = Math.round(starterRaw);

        // Totale risultante
        const total = starter + flourAmount + water;

        return {
            ratio: ratioData.ratio,
            isRecommended: ratioData.isRecommended || false,
            amounts: {
                starter,
                flour: flourAmount,
                water,
                total
            },
            times: ratioData.times,
            compatibility: ratioData.compatibility
        };
    });

    return {
        success: true,
        results,
        temperatureRanges,
        params: {
            flourAmount,
            hydration,
            targetHours
        }
    };
}

/**
 * Valida i parametri per il Rinfresco Giornaliero
 * I valori sono sempre in grammi internamente
 */
export function validateMaintenanceParams(flourAmount, hydration, targetHours) {
    const errors = [];

    if (!flourAmount || flourAmount < 10) {
        errors.push('validation.minFlour');
    }
    if (flourAmount > 1000) {
        errors.push('validation.maxFlour');
    }
    if (!hydration || hydration < 50) {
        errors.push('validation.minHydration');
    }
    if (hydration > 150) {
        errors.push('validation.maxHydration');
    }
    if (!targetHours || targetHours < 2) {
        errors.push('validation.minHours');
    }
    if (targetHours > 24) {
        errors.push('validation.maxHours');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
