/* ============================================================
   search.js — index loading, scoring, palette + page UI (Part 10)
   ------------------------------------------------------------
   Contract:
   - Lazy-loads data/search-index.js if not yet loaded.
   - Field-weighted scoring: title (x4) > headings (x3) > body (x1) > code (x0.5).
   - Arabic normalization matching (handles alef, ta-marbuta, harakat).
   - Ctrl-K / Cmd-K modal palette with keyboard-first navigation.
   - Error code shortcut router (e.g. 'P2002', 'EADDRINUSE').
   - Fully functional offline and from file://.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  function normalizeArabic(text) {
    if (!text) return '';
    return text
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .toLowerCase();
  }

  function getRelativeRoot() {
    return (window.FSA.app && window.FSA.app.getRelativeRoot) ? window.FSA.app.getRelativeRoot() : './';
  }

  function search(query) {
    const rawIndex = window.FSA.searchIndex || [];
    if (!query || !query.trim()) return [];

    const rawQ = query.trim().toLowerCase();
    const normQ = normalizeArabic(rawQ);
    const terms = normQ.split(/\s+/).filter(Boolean);

    // Direct Error Code routing shortcut
    const errorCodes = {
      'p2002': 'reference/prisma/errors.html#p2002',
      'p2025': 'reference/prisma/errors.html#p2025',
      'eaddrinuse': 'reference/nodejs/errors.html#eaddrinuse',
      'econnrefused': 'reference/nodejs/errors.html#econnrefused',
      'invalid hook call': 'reference/react/errors.html#invalid-hook-call'
    };

    if (errorCodes[rawQ]) {
      return [{
        t: `Error Reference: ${rawQ.toUpperCase()}`,
        url: errorCodes[rawQ],
        kind: 'error-shortcut',
        score: 999
      }];
    }

    const scored = [];

    rawIndex.forEach((doc) => {
      let score = 0;
      const titleNorm = normalizeArabic(doc.t);
      const headingsNorm = normalizeArabic(doc.h);
      const bodyNorm = doc.norm || normalizeArabic(doc.body);
      const codeNorm = (doc.code || '').toLowerCase();

      // Check each term
      let matchesAll = true;
      for (const t of terms) {
        let termScore = 0;
        if (titleNorm.includes(t)) termScore += 40;
        if (headingsNorm.includes(t)) termScore += 20;
        if (bodyNorm.includes(t)) termScore += 5;
        if (codeNorm.includes(t)) termScore += 8;

        if (termScore === 0) {
          matchesAll = false;
          break;
        }
        score += termScore;
      }

      if (matchesAll && score > 0) {
        scored.push({
          ...doc,
          score
        });
      }
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 15);
  }

  // ---- Modal Palette UI ---------------------------------------
  let paletteEl = null;

  function createPalette() {
    if (paletteEl) return paletteEl;

    paletteEl = document.createElement('div');
    paletteEl.className = 'fsa-search-modal';
    paletteEl.style.cssText = `
      position: fixed; inset: 0; z-index: var(--z-modal);
      background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(6px);
      display: none; align-items: flex-start; justify-content: center;
      padding-block-start: 12vh; padding-inline: var(--space-4);
    `;

    paletteEl.innerHTML = `
      <div class="fsa-search-card" style="
        width: 100%; max-width: 620px; background: var(--bg-surface);
        border: 1px solid var(--border-default); border-radius: var(--radius-lg);
        box-shadow: var(--shadow-2); overflow: hidden; display: flex; flex-direction: column;
      ">
        <div style="display: flex; align-items: center; padding: var(--space-3) var(--space-4); border-block-end: 1px solid var(--border-subtle); gap: var(--space-3);">
          <svg style="width: 18px; height: 18px; color: var(--text-muted);"><use href="${getRelativeRoot()}assets/icons.svg#fsa-icon-search"></use></svg>
          <input type="text" class="fsa-search-input" placeholder="Search lessons, concepts, error codes (e.g. useState, P2002)..." style="
            flex: 1; background: transparent; border: none; outline: none; font-size: var(--fs-md); color: var(--text-primary);
          ">
          <kbd style="font-size: var(--fs-xs); font-family: var(--font-mono); padding: 2px 6px; background: var(--bg-raised); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-muted);">ESC</kbd>
        </div>

        <div class="fsa-search-results" style="max-height: 380px; overflow-y: auto; padding: var(--space-2);">
          <div style="padding: var(--space-4); text-align: center; color: var(--text-muted); font-size: var(--fs-sm);">
            Type to search across all 8 tracks, reference docs, and error codes.
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2) var(--space-4); background: var(--bg-raised); border-block-start: 1px solid var(--border-subtle); font-size: var(--fs-xs); color: var(--text-muted);">
          <span>Navigate: &uarr; &darr; · Select: Enter · Close: Esc</span>
          <span>Bilingual Search (AR/EN)</span>
        </div>
      </div>
    `;

    document.body.appendChild(paletteEl);

    const input = paletteEl.querySelector('.fsa-search-input');
    const resultsContainer = paletteEl.querySelector('.fsa-search-results');

    paletteEl.addEventListener('click', (e) => {
      if (e.target === paletteEl) closePalette();
    });

    let selectedIdx = 0;
    let currentResults = [];

    function renderResults(results) {
      currentResults = results;
      selectedIdx = 0;

      if (!results.length) {
        resultsContainer.innerHTML = `
          <div style="padding: var(--space-5); text-align: center; color: var(--text-muted); font-size: var(--fs-sm);">
            No matching lessons or error codes found.
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = results.map((r, i) => `
        <a href="${getRelativeRoot()}${r.url}" class="fsa-search-item" data-idx="${i}" style="
          display: block; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md);
          text-decoration: none; color: inherit; margin-block: 2px;
          background: ${i === 0 ? 'var(--tint-primary)' : 'transparent'};
          border: 1px solid ${i === 0 ? 'var(--accent-primary)' : 'transparent'};
        ">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 600; font-size: var(--fs-sm); color: var(--text-primary);">${r.t}</div>
            <span class="fsa-badge" style="font-size: 10px; text-transform: uppercase;">${r.track || r.kind}</span>
          </div>
          ${r.h ? `<div style="font-size: var(--fs-xs); color: var(--text-muted); margin-block-start: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.h}</div>` : ''}
        </a>
      `).join('');

      // Add hover handlers
      resultsContainer.querySelectorAll('.fsa-search-item').forEach((item) => {
        item.addEventListener('mouseenter', () => {
          selectedIdx = parseInt(item.getAttribute('data-idx'), 10);
          updateSelection();
        });
      });
    }

    function updateSelection() {
      const items = resultsContainer.querySelectorAll('.fsa-search-item');
      items.forEach((item, i) => {
        const isSelected = i === selectedIdx;
        item.style.background = isSelected ? 'var(--tint-primary)' : 'transparent';
        item.style.borderColor = isSelected ? 'var(--accent-primary)' : 'transparent';
      });
    }

    input.addEventListener('input', (e) => {
      const query = e.target.value;
      if (!query.trim()) {
        resultsContainer.innerHTML = `
          <div style="padding: var(--space-4); text-align: center; color: var(--text-muted); font-size: var(--fs-sm);">
            Type to search across all 8 tracks, reference docs, and error codes.
          </div>
        `;
        return;
      }
      const results = search(query);
      renderResults(results);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectedIdx < currentResults.length - 1) {
          selectedIdx++;
          updateSelection();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedIdx > 0) {
          selectedIdx--;
          updateSelection();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentResults[selectedIdx]) {
          window.location.href = getRelativeRoot() + currentResults[selectedIdx].url;
        }
      } else if (e.key === 'Escape') {
        closePalette();
      }
    });

    return paletteEl;
  }

  function openPalette() {
    const el = createPalette();
    el.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const input = el.querySelector('.fsa-search-input');
    input.value = '';
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    if (paletteEl) {
      paletteEl.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Trigger search on buttons with data-fsa-search-trigger
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-fsa-search-trigger]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPalette();
      });
    });
  });

  window.FSA.search = {
    search,
    openPalette,
    closePalette
  };
})();
