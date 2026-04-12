/**
 * Ratio Calculator — tabella completa ratio
 *
 * Data farina + acqua + temperatura, mostra starter necessario
 * per ogni ratio con stima tempo picco.
 * Salva l'ultimo calcolo in localStorage.
 */

import { fermentationData } from './data.js';
import { isCelsius } from './temperature.js';
import { isGrams, getWeightUnitLabel, convertValue, fromCurrentUnit } from './units.js';

const STORAGE_KEY = 'proof-last-calc';

const zones = [
    { label: 'Riattivazione aggressiva', color: '#C0392B', bg: 'rgba(192,57,43,0.07)',   flourParts: [1, 2] },
    { label: 'Riattivazione normale',    color: '#D68910', bg: 'rgba(214,137,16,0.07)',  flourParts: [3, 4] },
    { label: 'Mantenimento standard',    color: '#1A7A5E', bg: 'rgba(26,122,94,0.07)',   flourParts: [5, 6] },
    { label: 'Mantenimento lento',       color: '#2471A3', bg: 'rgba(36,113,163,0.07)',  flourParts: [7, 8, 9, 10] },
    { label: 'Pausa / frigo',            color: '#717D7E', bg: 'rgba(113,125,126,0.06)', flourParts: [11,12,13,14,15,16,17,18,19,20] },
];

function getZone(flourPart) {
    return zones.find(z => z.flourParts.includes(flourPart)) || zones[zones.length - 1];
}

function getTempBand(tempC) {
    if (tempC <= 22) return 'cool';
    if (tempC <= 24) return 'medium';
    return 'warm';
}

function fmtWeight(grams) {
    const val = isGrams() ? grams : convertValue(grams, false);
    return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1));
}

function saveState(farina, acqua, temp) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ farina, acqua, temp }));
    } catch {}
}

function loadState() {
    try {
        const s = localStorage.getItem(STORAGE_KEY);
        return s ? JSON.parse(s) : null;
    } catch { return null; }
}

function render() {
    const farInput = document.getElementById('calc-farina');
    const acqInput = document.getElementById('calc-acqua');
    const tempInput = document.getElementById('calc-temp');
    const tempOut = document.getElementById('calc-temp-out');
    const tableEl = document.getElementById('calc-table');

    if (!farInput) return;

    const farinaGrams = fromCurrentUnit(parseFloat(farInput.value) || 30);
    const acquaGrams  = fromCurrentUnit(parseFloat(acqInput.value) || 30);
    const tempC       = parseInt(tempInput.value) || 22;
    const band        = getTempBand(tempC);
    const unit        = getWeightUnitLabel();

    // Update temp label
    if (isCelsius()) {
        tempOut.textContent = tempC + '°C';
    } else {
        tempOut.textContent = Math.round(tempC * 9 / 5 + 32) + '°F';
    }

    // Update weight unit labels
    document.querySelectorAll('.calc-weight-unit').forEach(el => {
        el.textContent = unit;
    });

    // Save
    saveState(parseFloat(farInput.value), parseFloat(acqInput.value), tempC);

    // Build table
    let html = '<div class="calc-table-wrapper">';
    html += `<div class="calc-table-header">
        <span>Ratio</span>
        <span>Starter</span>
        <span>Farina</span>
        <span>Acqua</span>
        <span>Totale</span>
        <span>Picco est.</span>
    </div>`;

    fermentationData.ratios.forEach(r => {
        const zone    = getZone(r.flourPart);
        const starter = farinaGrams / r.flourPart;
        const totale  = starter + farinaGrams + acquaGrams;
        const times   = r.times[band];
        const timeStr = `${times.min}–${times.max}h`;

        html += `<div class="calc-table-row" style="background: ${zone.bg};" data-zone="${zone.label}">
            <span class="calc-ratio" style="color: ${zone.color};">${r.ratio}</span>
            <span class="calc-val-primary">${fmtWeight(starter)}${unit}</span>
            <span class="calc-val-muted">${fmtWeight(farinaGrams)}${unit}</span>
            <span class="calc-val-muted">${fmtWeight(acquaGrams)}${unit}</span>
            <span class="calc-val-muted">${fmtWeight(totale)}${unit}</span>
            <span class="calc-val-muted">${timeStr}</span>
        </div>`;
    });

    html += '</div>';
    tableEl.innerHTML = html;
}

let activeZones = new Set();

function filterRows() {
    const tableEl = document.getElementById('calc-table');
    if (!tableEl) return;
    tableEl.querySelectorAll('.calc-table-row').forEach(row => {
        const zone = row.dataset.zone;
        row.style.display = (activeZones.size === 0 || activeZones.has(zone)) ? '' : 'none';
    });
}

function buildLegend() {
    const legendEl = document.getElementById('calc-legend');
    if (!legendEl) return;
    legendEl.innerHTML = '';
    zones.forEach(z => {
        const chip = document.createElement('span');
        chip.className = 'calc-legend-item';
        chip.textContent = z.label;
        chip.style.color = z.color;
        chip.style.borderColor = z.color;
        chip.dataset.zone = z.label;

        chip.addEventListener('click', () => {
            const isActive = chip.classList.toggle('active');
            if (isActive) {
                chip.style.backgroundColor = z.bg;
                chip.style.fontWeight = '700';
                activeZones.add(z.label);
            } else {
                chip.style.backgroundColor = 'transparent';
                chip.style.fontWeight = '';
                activeZones.delete(z.label);
            }
            filterRows();
        });

        legendEl.appendChild(chip);
    });
}

export function rerenderCalcolatore() {
    render();
}

export function initRatioCalculator() {
    const farInput = document.getElementById('calc-farina');
    if (!farInput) return;

    // Load saved state
    const saved = loadState();
    if (saved) {
        document.getElementById('calc-farina').value = saved.farina ?? 30;
        document.getElementById('calc-acqua').value  = saved.acqua  ?? 30;
        document.getElementById('calc-temp').value   = saved.temp   ?? 22;
    }

    buildLegend();

    farInput.addEventListener('input', render);
    document.getElementById('calc-acqua').addEventListener('input', render);
    document.getElementById('calc-temp').addEventListener('input', render);

    render();
}
