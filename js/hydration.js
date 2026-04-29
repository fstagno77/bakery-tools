import { formatWeight, fromCurrentUnit, toCurrentUnit } from './units.js';
import { t, getCurrentLang } from './i18n.js';
import { FLOUR_TYPES, HYDRATION_INSIGHTS, getFascia, getFlourById, getBlendAbsorptionDelta } from './flour-data.js';

let inputs = null;
let lockHydration = false;
let lockWater = false;

// Flour state
let flourEntries = [{ typeId: 'generic', pct: 100 }];

// ─── Core calculation ───────────────────────────────────────────────────────

function computeHydration(farinaG, acquaG, lmG, lmIdr) {
    const flourLm = lmG / (1 + lmIdr / 100);
    const waterLm = lmG - flourLm;
    const totalFlour = farinaG + flourLm;
    const totalWater = acquaG + waterLm;
    const hydration = totalFlour > 0 ? (totalWater / totalFlour) * 100 : 0;
    return { hydration, totalFlour, totalWater, flourLm, waterLm };
}

function computeWaterFromTarget(farinaG, lmG, lmIdr, targetHyd) {
    const flourLm = lmG / (1 + lmIdr / 100);
    const waterLm = lmG - flourLm;
    const totalFlour = farinaG + flourLm;
    const targetTotalWater = (targetHyd / 100) * totalFlour;
    const acquaG = Math.max(0, targetTotalWater - waterLm);
    return { acquaG, flourLm, waterLm, totalFlour };
}

function getGrams(input) {
    return fromCurrentUnit(parseFloat(input.value) || 0);
}

// ─── Percentage utils ────────────────────────────────────────────────────────

function equalPcts(n) {
    const base = Math.floor(100 / n);
    const rem = 100 - base * n;
    return Array.from({ length: n }, (_, i) => base + (i === 0 ? rem : 0));
}

function syncPcts() {
    const pcts = equalPcts(flourEntries.length);
    flourEntries.forEach((e, i) => { e.pct = pcts[i]; });
}

function getPctTotal() {
    return flourEntries.reduce((sum, e) => sum + (parseInt(e.pct) || 0), 0);
}

function autoBalancePcts(editedIndex) {
    if (flourEntries.length <= 1) return;
    const n = flourEntries.length;
    const minPct = 1;
    const maxPct = 100 - (n - 1) * minPct;
    const raw = parseInt(flourEntries[editedIndex].pct) || minPct;
    flourEntries[editedIndex].pct = Math.max(minPct, Math.min(maxPct, raw));

    const remainder = 100 - flourEntries[editedIndex].pct;
    const othersCount = n - 1;
    const base = Math.floor(remainder / othersCount);
    let leftover = remainder - base * othersCount;
    flourEntries.forEach((e, i) => {
        if (i === editedIndex) return;
        e.pct = base + (leftover-- > 0 ? 1 : 0);
    });
}

// ─── Suggested water ─────────────────────────────────────────────────────────

function computeSuggestedWater() {
    const isGeneric = flourEntries.length === 1 && flourEntries[0].typeId === 'generic';
    if (isGeneric) return null;

    const total = getPctTotal();
    if (flourEntries.length > 1 && total !== 100) return null;

    const delta = getBlendAbsorptionDelta(flourEntries);
    if (Math.abs(delta) < 1) return null;

    const farinaG = getGrams(inputs.farina);
    const lmG = getGrams(inputs.lm);
    const lmIdr = parseFloat(inputs.lmIdr.value) || 100;
    const currentHyd = parseFloat(inputs.target.value) || 0;
    const suggestedHyd = currentHyd + delta;

    const { acquaG } = computeWaterFromTarget(farinaG, lmG, lmIdr, suggestedHyd);
    return acquaG >= 0 ? acquaG : null;
}

function renderAcquaHint() {
    if (!inputs.acquaHint) return;
    const suggestedG = computeSuggestedWater();
    if (suggestedG === null) {
        inputs.acquaHint.innerHTML = '';
        return;
    }
    const actualG = getGrams(inputs.acqua);
    const diff = Math.round(suggestedG - actualG);
    const diffStr = diff >= 0 ? `+${formatWeight(diff)}` : formatWeight(diff);
    const lang = getCurrentLang();
    const label = lang === 'it'
        ? `Consigliata <strong>${formatWeight(suggestedG)}</strong> <span class="hyd-hint-diff">${diffStr}</span>`
        : `Suggested <strong>${formatWeight(suggestedG)}</strong> <span class="hyd-hint-diff">${diffStr}</span>`;
    inputs.acquaHint.innerHTML = label;
}

function renderPctWarning() {
    if (!inputs.pctWarning) return;
    if (flourEntries.length <= 1) { inputs.pctWarning.hidden = true; return; }
    const total = getPctTotal();
    if (total !== 100) {
        inputs.pctWarning.textContent = `${total}%`;
        inputs.pctWarning.hidden = false;
    } else {
        inputs.pctWarning.hidden = true;
    }
}

// ─── Flour selector (custom dropdown) ──────────────────────────────────────

const CHEVRON = `<svg class="hyd-flour-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

function closeAllPanels() {
    if (!inputs?.flourSection) return;
    inputs.flourSection.querySelectorAll('.hyd-flour-panel').forEach(p => p.classList.remove('open'));
    inputs.flourSection.querySelectorAll('.hyd-flour-trigger').forEach(b => b.classList.remove('open'));
}

function renderFlourSelector() {
    const lang = getCurrentLang();

    const pills = flourEntries.map((entry, i) => {
        const flour = getFlourById(entry.typeId);
        const name = flour[lang] || flour.it;
        const hasMultiple = flourEntries.length > 1;
        const pctRow = hasMultiple
            ? `<div class="hyd-flour-pct-row">
                   <input type="number" class="hyd-flour-pct-input" value="${entry.pct}"
                          min="1" max="98" step="1" data-pindex="${i}">
                   <span class="hyd-flour-pct-symbol">%</span>
               </div>`
            : '';
        const removeBtn = hasMultiple
            ? `<button class="hyd-flour-remove" data-index="${i}" type="button" aria-label="Rimuovi">×</button>`
            : '';
        const options = FLOUR_TYPES.map(f => {
            const fn = f[lang] || f.it;
            return `<li class="hyd-flour-option${f.id === entry.typeId ? ' selected' : ''}" data-id="${f.id}" data-pindex="${i}">${fn}</li>`;
        }).join('');

        return `
            <div class="hyd-flour-pill${hasMultiple ? ' has-pct' : ''}" data-index="${i}">
                ${removeBtn}
                <button class="hyd-flour-trigger" data-index="${i}" type="button">
                    <span class="hyd-flour-trigger-name">${name}</span>
                    ${CHEVRON}
                </button>
                ${pctRow}
                <ul class="hyd-flour-panel" data-panel="${i}">${options}</ul>
            </div>`;
    }).join('');

    const addSlot = flourEntries.length < 4
        ? `<button class="hyd-flour-add-slot" id="hyd-flour-add-btn" type="button">
               <span class="hyd-flour-add-text">${t('hydration.addFlourRow')}</span>
           </button>`
        : '';

    inputs.flourSection.innerHTML = `<div class="hyd-flour-selector">${pills}${addSlot}</div>`;
    bindFlourEvents();
}

function bindFlourEvents() {
    const c = inputs.flourSection;

    c.querySelectorAll('.hyd-flour-trigger').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = parseInt(btn.dataset.index);
            const panel = c.querySelector(`.hyd-flour-panel[data-panel="${i}"]`);
            const wasOpen = panel.classList.contains('open');
            closeAllPanels();
            if (!wasOpen) {
                panel.classList.add('open');
                btn.classList.add('open');
            }
            e.stopPropagation();
        });
    });

    c.querySelectorAll('.hyd-flour-option').forEach(opt => {
        opt.addEventListener('click', e => {
            flourEntries[parseInt(opt.dataset.pindex)].typeId = opt.dataset.id;
            closeAllPanels();
            renderFlourSelector();
            updateAll();
            e.stopPropagation();
        });
    });

    c.querySelectorAll('.hyd-flour-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            flourEntries.splice(parseInt(btn.dataset.index), 1);
            syncPcts();
            renderFlourSelector();
            updateAll();
            e.stopPropagation();
        });
    });

    c.querySelectorAll('.hyd-flour-pct-input').forEach(inp => {
        inp.addEventListener('click', e => e.stopPropagation());

        inp.addEventListener('input', e => {
            flourEntries[parseInt(inp.dataset.pindex)].pct = parseInt(inp.value) || 0;
            renderPctWarning();
            e.stopPropagation();
        });

        inp.addEventListener('blur', e => {
            const idx = parseInt(inp.dataset.pindex);
            autoBalancePcts(idx);
            // Aggiorna i valori degli altri input in-place (senza re-render, preservando focus)
            c.querySelectorAll('.hyd-flour-pct-input').forEach(other => {
                other.value = flourEntries[parseInt(other.dataset.pindex)].pct;
            });
            renderPctWarning();
            updateAll();
        });
    });

    const addBtn = document.getElementById('hyd-flour-add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', e => {
            flourEntries.push({ typeId: 'generic', pct: 0 });
            syncPcts();
            renderFlourSelector();
            updateAll();
            e.stopPropagation();
        });
    }
}

// ─── Rendering ──────────────────────────────────────────────────────────────

function renderBreakdown(farinaG, acquaG, lmG, result) {
    const { totalFlour, totalWater, flourLm, waterLm } = result;
    const hasLm = lmG > 0;

    inputs.breakdown.innerHTML = `
        <div class="hyd-breakdown-grid">
            <div class="hyd-bk-item">
                <span class="hyd-bk-label">${t('hydration.totalFlour')}</span>
                <span class="hyd-bk-value">${formatWeight(totalFlour)}</span>
                ${hasLm ? `<span class="hyd-bk-sub">${formatWeight(farinaG)} + ${formatWeight(flourLm)} LM</span>` : ''}
            </div>
            <div class="hyd-bk-item">
                <span class="hyd-bk-label">${t('hydration.totalWater')}</span>
                <span class="hyd-bk-value">${formatWeight(totalWater)}</span>
                ${hasLm ? `<span class="hyd-bk-sub">${formatWeight(acquaG)} + ${formatWeight(waterLm)} LM</span>` : ''}
            </div>
        </div>
    `;
}

function renderInsights(hydration) {
    const container = inputs.insightsSection;
    if (!container) return;

    const lang = getCurrentLang();
    const fasciaKey = getFascia(hydration);
    const data = HYDRATION_INSIGHTS[fasciaKey];
    const absorptionDelta = getBlendAbsorptionDelta(flourEntries);
    const isGeneric = flourEntries.length === 1 && flourEntries[0].typeId === 'generic';
    const flourNoteHtml = buildFlourNoteHtml(lang, absorptionDelta, isGeneric);
    const paniTags = data.pani[lang].map(p => `<span class="hyd-pane-tag">${p}</span>`).join('');

    container.innerHTML = `
        <div class="hyd-insights-card">
            <div class="hyd-insights-header">
                <span class="hyd-fascia-badge" style="background:${data.colorHex}">${data.badge[lang]}</span>
                <span class="hyd-level-badge">${data.livello[lang]}</span>
                <span class="hyd-range-badge">${data.fascia[lang]}</span>
            </div>
            <div class="hyd-insights-grid">
                <div class="hyd-insight-block">
                    <h4 class="hyd-insight-title">${t('hydration.insightImpasto')}</h4>
                    <p class="hyd-insight-text">${data.impasto[lang]}</p>
                </div>
                <div class="hyd-insight-block">
                    <h4 class="hyd-insight-title">${t('hydration.insightRisultato')}</h4>
                    <p class="hyd-insight-text">${data.risultato[lang]}</p>
                </div>
                <div class="hyd-insight-block">
                    <h4 class="hyd-insight-title">${t('hydration.insightTempi')}</h4>
                    <p class="hyd-insight-text">${data.tempi[lang]}</p>
                </div>
                <div class="hyd-insight-block hyd-insight-attenzione">
                    <h4 class="hyd-insight-title">${t('hydration.insightAttenzione')}</h4>
                    <p class="hyd-insight-text">${data.attenzione[lang]}</p>
                </div>
            </div>
            ${flourNoteHtml}
            <div class="hyd-pani-section">
                <span class="hyd-pani-label">${t('hydration.breadsLabel')}</span>
                <div class="hyd-pani-tags">${paniTags}</div>
            </div>
        </div>
    `;
}

function buildFlourNoteHtml(lang, absorptionDelta, isGeneric) {
    if (isGeneric) return '';

    const parts = flourEntries.map(e => {
        const flour = getFlourById(e.typeId);
        if (!flour || flour.id === 'generic') return null;
        const name = flour[lang] || flour.it;
        const note = flour.flourNote?.[lang];
        if (!note) return null;
        const pctLabel = flourEntries.length > 1 ? ` <span class="hyd-flour-pct">${e.pct}%</span>` : '';
        return `<div class="hyd-flour-note-entry"><strong>${name}${pctLabel}</strong><p>${note}</p></div>`;
    }).filter(Boolean);

    if (parts.length === 0) return '';

    let deltaHint = '';
    if (Math.abs(absorptionDelta) >= 2) {
        const direction = absorptionDelta > 0
            ? (lang === 'it' ? 'assorbe più acqua del riferimento generico' : 'absorbs more water than the generic reference')
            : (lang === 'it' ? 'assorbe meno acqua del riferimento generico' : 'absorbs less water than the generic reference');
        const adj = Math.abs(Math.round(absorptionDelta));
        const hintText = lang === 'it'
            ? `Questo mix di farine ${direction} di circa ${adj}%. Considera di aggiustare l'acqua di conseguenza.`
            : `This flour mix ${direction} by about ${adj}%. Consider adjusting water accordingly.`;
        deltaHint = `<p class="hyd-delta-hint">${hintText}</p>`;
    }

    return `
        <div class="hyd-flour-notes">
            <h4 class="hyd-insight-title">${t('hydration.flourNoteTitle')}</h4>
            ${deltaHint}
            ${parts.join('')}
        </div>
    `;
}

// ─── Update pipeline ─────────────────────────────────────────────────────────

function updateAll() {
    if (lockHydration) return;
    const farinaG = getGrams(inputs.farina);
    const acquaG  = getGrams(inputs.acqua);
    const lmG     = getGrams(inputs.lm);
    const lmIdr   = parseFloat(inputs.lmIdr.value) || 100;

    const result = computeHydration(farinaG, acquaG, lmG, lmIdr);

    lockWater = true;
    inputs.target.value = result.hydration.toFixed(1);
    lockWater = false;

    renderBreakdown(farinaG, acquaG, lmG, result);
    renderInsights(result.hydration);
    renderAcquaHint();
    renderPctWarning();
}

function fromHydrationTarget() {
    if (lockWater) return;
    const farinaG   = getGrams(inputs.farina);
    const lmG       = getGrams(inputs.lm);
    const lmIdr     = parseFloat(inputs.lmIdr.value) || 100;
    const targetHyd = parseFloat(inputs.target.value) || 0;

    const { acquaG, flourLm, waterLm, totalFlour } = computeWaterFromTarget(farinaG, lmG, lmIdr, targetHyd);
    const totalWater = acquaG + waterLm;

    lockHydration = true;
    inputs.acqua.value = toCurrentUnit(acquaG);
    lockHydration = false;

    const result = {
        hydration: totalFlour > 0 ? (totalWater / totalFlour) * 100 : 0,
        totalFlour, totalWater, flourLm, waterLm
    };

    renderBreakdown(farinaG, acquaG, lmG, result);
    renderInsights(result.hydration);
    renderAcquaHint();
    renderPctWarning();
}

// ─── Init ────────────────────────────────────────────────────────────────────

export function initHydrationCalculator() {
    inputs = {
        farina:          document.getElementById('hyd-farina'),
        acqua:           document.getElementById('hyd-acqua'),
        lm:              document.getElementById('hyd-lm'),
        lmIdr:           document.getElementById('hyd-lm-idr'),
        target:          document.getElementById('hyd-target'),
        breakdown:       document.getElementById('hyd-breakdown'),
        flourSection:    document.getElementById('hyd-flour-section'),
        insightsSection: document.getElementById('hyd-insights'),
        acquaHint:       document.getElementById('hyd-acqua-hint'),
        pctWarning:      document.getElementById('hyd-pct-warning'),
    };

    [inputs.farina, inputs.acqua, inputs.lm, inputs.lmIdr].forEach(el => {
        el.addEventListener('input', updateAll);
    });
    inputs.target.addEventListener('input', fromHydrationTarget);

    document.addEventListener('click', closeAllPanels);

    renderFlourSelector();
    updateAll();
}

export function rerenderHydration() {
    if (!inputs) return;
    renderFlourSelector();
    updateAll();
}
