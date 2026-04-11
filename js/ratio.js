/**
 * Ratio Calculator Module
 * Calcolatore proporzioni rinfresco: dato un ratio starter:farina:acqua
 * e i grammi di uno degli ingredienti, calcola gli altri due.
 */

let calcLastEdited = 'starter';

export function initRatioCalculator() {
    const ratioS = document.getElementById('ratio-s');
    const ratioF = document.getElementById('ratio-f');
    const ratioA = document.getElementById('ratio-a');
    const inputStarter = document.getElementById('ratio-starter-g');
    const inputFarina  = document.getElementById('ratio-farina-g');
    const inputAcqua   = document.getElementById('ratio-acqua-g');

    if (!ratioS) return;

    // Cambio ratio → ricalcola
    [ratioS, ratioF, ratioA].forEach(el => {
        el.addEventListener('input', () => recalc());
    });

    // Cambio grammi → aggiorna sorgente e ricalcola
    inputStarter.addEventListener('input', () => { calcLastEdited = 'starter'; updateStyles(); recalc(); });
    inputFarina.addEventListener('input',  () => { calcLastEdited = 'farina';  updateStyles(); recalc(); });
    inputAcqua.addEventListener('input',   () => { calcLastEdited = 'acqua';   updateStyles(); recalc(); });

    updateStyles();
    recalc();
}

function updateStyles() {
    const map = {
        starter: document.getElementById('ratio-starter-g'),
        farina:  document.getElementById('ratio-farina-g'),
        acqua:   document.getElementById('ratio-acqua-g'),
    };
    Object.entries(map).forEach(([key, el]) => {
        if (!el) return;
        el.classList.toggle('ratio-source', key === calcLastEdited);
        el.classList.toggle('ratio-derived', key !== calcLastEdited);
    });
}

function recalc() {
    const rS = parseFloat(document.getElementById('ratio-s').value) || 0;
    const rF = parseFloat(document.getElementById('ratio-f').value) || 0;
    const rA = parseFloat(document.getElementById('ratio-a').value) || 0;

    const idMap = {
        starter: document.getElementById('ratio-starter-g'),
        farina:  document.getElementById('ratio-farina-g'),
        acqua:   document.getElementById('ratio-acqua-g'),
    };
    const ratioMap = { starter: rS, farina: rF, acqua: rA };

    const srcEl = idMap[calcLastEdited];
    const gSrc  = parseFloat(srcEl.value) || 0;
    const rSrc  = ratioMap[calcLastEdited];

    const results = {};
    ['starter', 'farina', 'acqua'].forEach(f => {
        results[f] = (f === calcLastEdited)
            ? gSrc
            : (rSrc > 0 && gSrc > 0 ? Math.round((ratioMap[f] / rSrc) * gSrc * 10) / 10 : 0);
    });

    ['starter', 'farina', 'acqua'].forEach(f => {
        if (f !== calcLastEdited) {
            idMap[f].value = results[f];
        }
    });

    const total = (results.starter || 0) + (results.farina || 0) + (results.acqua || 0);
    const totalEl = document.getElementById('ratio-total');
    if (totalEl) totalEl.textContent = Math.round(total * 10) / 10 + 'g';
}
