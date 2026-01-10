/**
 * UI Module
 *
 * Gestisce il rendering dei risultati e l'interfaccia utente.
 */

import { fermentationData } from './data.js';
import { t, getCurrentLang } from './i18n.js';
import { getTemperatureRanges, isCelsius } from './temperature.js';
import { formatWeight, getWeightUnitLabel, isGrams, gramsToOz } from './units.js';

/**
 * Renderizza i risultati del calcolo
 *
 * @param {Object} calcResult - Risultato da calculateRefresh()
 * @param {HTMLElement} container - Container dove renderizzare
 */
export function renderResults(calcResult, container) {
    container.innerHTML = '';

    if (!calcResult.success) {
        renderError(calcResult.message, container);
        return;
    }

    const { results, params } = calcResult;
    const tempRanges = getTemperatureRanges();

    // Intestazione risultati
    const header = document.createElement('div');
    header.className = 'results-header';

    const summaryText = t('results.summaryLevain', {
        amount: params.targetAmount,
        hydration: params.hydration,
        hours: params.targetHours
    });

    header.innerHTML = `
        <p class="results-summary">${summaryText}</p>
        <p class="results-note">${t('results.noteLevain')}</p>
    `;
    container.appendChild(header);

    // Renderizza ogni risultato
    for (const result of results) {
        const card = createResultCard(result, tempRanges);
        container.appendChild(card);
    }
}

/**
 * Crea una card per un singolo risultato
 */
function createResultCard(result, tempRanges) {
    const card = document.createElement('div');
    card.className = `result-card${result.isRecommended ? ' recommended' : ''}`;

    const { ratio, amounts, times, isRecommended } = result;

    card.innerHTML = `
        <div class="result-card-header">
            <span class="ratio-badge">${ratio}</span>
            ${isRecommended ? `<span class="recommended-badge">${t('results.recommended')}</span>` : ''}
            <span class="total-badge">${t('results.total')}: ${formatWeight(amounts.total)}</span>
        </div>

        <div class="result-amounts">
            <div class="amount-item starter-amount">
                <span class="amount-label">${t('results.starter')}</span>
                <span class="amount-value">${formatWeight(amounts.starter)}</span>
            </div>
            <div class="amount-item">
                <span class="amount-label">${t('results.flour')}</span>
                <span class="amount-value">${formatWeight(amounts.flour)}</span>
            </div>
            <div class="amount-item">
                <span class="amount-label">${t('results.water')}</span>
                <span class="amount-value">${formatWeight(amounts.water)}</span>
            </div>
        </div>

        <div class="temp-times">
            <div class="temp-time-item cool">
                <span class="temp-label" data-temp-c="${fermentationData.temperatureRanges.cool.label}" data-temp-f="70–72 °F">${tempRanges.cool.label}</span>
                <span class="temp-value">${times.cool.min}–${times.cool.max} h</span>
            </div>
            <div class="temp-time-item medium">
                <span class="temp-label" data-temp-c="${fermentationData.temperatureRanges.medium.label}" data-temp-f="72–75 °F">${tempRanges.medium.label}</span>
                <span class="temp-value">${times.medium.min}–${times.medium.max} h</span>
            </div>
            <div class="temp-time-item warm">
                <span class="temp-label" data-temp-c="${fermentationData.temperatureRanges.warm.label}" data-temp-f="> 75 °F">${tempRanges.warm.label}</span>
                <span class="temp-value">${times.warm.min}–${times.warm.max} h</span>
            </div>
        </div>
    `;

    return card;
}

/**
 * Renderizza un messaggio di errore
 */
function renderError(message, container) {
    container.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}

/**
 * Formatta un valore di peso per i messaggi di errore
 */
function formatWeightForError(grams) {
    if (isGrams()) {
        return `${grams}g`;
    } else {
        const oz = gramsToOz(grams);
        return `${oz.toFixed(1)} oz`;
    }
}

/**
 * Renderizza errori di validazione
 */
export function renderValidationErrors(errors, container) {
    // Mappa dei limiti per la validazione (in grammi)
    const limits = {
        'validation.minAmount': { min: formatWeightForError(10) },
        'validation.maxAmount': { max: formatWeightForError(5000) },
        'validation.minFlour': { min: formatWeightForError(10) },
        'validation.maxFlour': { max: formatWeightForError(1000) }
    };

    const translatedErrors = errors.map(errorKey => {
        const replacements = limits[errorKey] || {};
        return t(errorKey, replacements);
    });

    container.innerHTML = `
        <div class="validation-errors">
            <ul>
                ${translatedErrors.map(e => `<li>${e}</li>`).join('')}
            </ul>
        </div>
    `;
}

/**
 * Renderizza i risultati per il Rinfresco Giornaliero
 *
 * @param {Object} calcResult - Risultato da calculateMaintenance()
 * @param {HTMLElement} container - Container dove renderizzare
 */
export function renderMaintenanceResults(calcResult, container) {
    container.innerHTML = '';

    if (!calcResult.success) {
        renderError(calcResult.message, container);
        return;
    }

    const { results, params } = calcResult;
    const tempRanges = getTemperatureRanges();

    // Intestazione risultati
    const header = document.createElement('div');
    header.className = 'results-header';

    const summaryText = t('results.summaryMaintenance', {
        flour: params.flourAmount,
        hydration: params.hydration,
        hours: params.targetHours
    });

    header.innerHTML = `
        <p class="results-summary">${summaryText}</p>
        <p class="results-note">${t('results.noteMaintenance')}</p>
    `;
    container.appendChild(header);

    // Renderizza ogni risultato
    for (const result of results) {
        const card = createMaintenanceCard(result, tempRanges);
        container.appendChild(card);
    }
}

/**
 * Crea una card per il Rinfresco Giornaliero
 */
function createMaintenanceCard(result, tempRanges) {
    const card = document.createElement('div');
    card.className = `result-card${result.isRecommended ? ' recommended' : ''}`;

    const { ratio, amounts, times, isRecommended } = result;

    card.innerHTML = `
        <div class="result-card-header">
            <span class="ratio-badge">${ratio}</span>
            ${isRecommended ? `<span class="recommended-badge">${t('results.recommended')}</span>` : ''}
            <span class="total-badge">${t('results.total')}: ${formatWeight(amounts.total)}</span>
        </div>

        <div class="result-amounts">
            <div class="amount-item inoculo-highlight">
                <span class="amount-label">${t('results.inoculum')}</span>
                <span class="amount-value">${formatWeight(amounts.starter)}</span>
            </div>
            <div class="amount-item">
                <span class="amount-label">${t('results.flour')}</span>
                <span class="amount-value">${formatWeight(amounts.flour)}</span>
            </div>
            <div class="amount-item">
                <span class="amount-label">${t('results.water')}</span>
                <span class="amount-value">${formatWeight(amounts.water)}</span>
            </div>
        </div>

        <div class="temp-times">
            <div class="temp-time-item cool">
                <span class="temp-label" data-temp-c="${fermentationData.temperatureRanges.cool.label}" data-temp-f="70–72 °F">${tempRanges.cool.label}</span>
                <span class="temp-value">${times.cool.min}–${times.cool.max} h</span>
            </div>
            <div class="temp-time-item medium">
                <span class="temp-label" data-temp-c="${fermentationData.temperatureRanges.medium.label}" data-temp-f="72–75 °F">${tempRanges.medium.label}</span>
                <span class="temp-value">${times.medium.min}–${times.medium.max} h</span>
            </div>
            <div class="temp-time-item warm">
                <span class="temp-label" data-temp-c="${fermentationData.temperatureRanges.warm.label}" data-temp-f="> 75 °F">${tempRanges.warm.label}</span>
                <span class="temp-value">${times.warm.min}–${times.warm.max} h</span>
            </div>
        </div>
    `;

    return card;
}

/**
 * Aggiunge stili per messaggi di errore (inline per semplicità)
 */
export function injectErrorStyles() {
    if (document.getElementById('error-styles')) return;

    const style = document.createElement('style');
    style.id = 'error-styles';
    style.textContent = `
        .error-message,
        .validation-errors {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: var(--radius-md);
            padding: var(--space-lg);
            color: #dc2626;
        }

        .validation-errors ul {
            margin: 0;
            padding-left: var(--space-lg);
        }

        .validation-errors li {
            margin-bottom: var(--space-xs);
        }

        .results-header {
            margin-bottom: var(--space-lg);
            padding-bottom: var(--space-md);
            border-bottom: 1px solid var(--color-border);
        }

        .results-summary {
            color: var(--color-text-secondary);
            margin: 0;
        }

        .results-summary strong {
            color: var(--color-text);
        }

        .results-note {
            font-size: var(--font-size-sm);
            color: var(--color-text-muted);
            margin: var(--space-sm) 0 0 0;
            font-style: italic;
        }

        .total-badge {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            font-weight: 500;
        }

        .starter-amount {
            position: relative;
        }

        .inoculo-highlight {
            background-color: rgba(180, 83, 9, 0.1);
            border-radius: var(--radius-sm);
            padding: var(--space-sm);
            margin: calc(-1 * var(--space-sm));
        }

        .inoculo-highlight .amount-value {
            color: var(--color-primary-dark);
        }
    `;
    document.head.appendChild(style);
}
