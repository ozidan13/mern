/* ============================================================
   theme.js — dark/light + persisted preference, no flash
   ------------------------------------------------------------
   Contract:
   - Applies data-theme from localStorage before first paint.
   - Dark is the default; supports explicit 'dark' / 'light'.
   - Dispatches custom 'fsa:themechange' event on changes.
   - Components never fork on theme.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  const STORAGE_KEY = 'fsa.theme';
  const STORE_V1_KEY = 'fsa.store.v1';

  function getStoredTheme() {
    try {
      const explicit = localStorage.getItem(STORAGE_KEY);
      if (explicit === 'dark' || explicit === 'light') return explicit;

      const storeRaw = localStorage.getItem(STORE_V1_KEY);
      if (storeRaw) {
        const store = JSON.parse(storeRaw);
        if (store && (store.theme === 'dark' || store.theme === 'light')) {
          return store.theme;
        }
      }
    } catch (_) {
      // Storage access disabled or corrupt
    }
    return 'dark'; // Dark is the default
  }

  function applyTheme(theme) {
    const valid = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', valid);
    
    // Update theme toggle icons across page
    document.querySelectorAll('[data-fsa-theme-toggle], #themeToggleBtn').forEach((btn) => {
      btn.setAttribute('aria-label', valid === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', valid === 'dark' ? 'Switch to light mode · الوضع النهاري' : 'Switch to dark mode · الوضع الليلي');
      const iconUse = btn.querySelector('svg use');
      if (iconUse) {
        const href = iconUse.getAttribute('href') || '';
        const base = href.split('#')[0];
        iconUse.setAttribute('href', `${base}#fsa-icon-${valid === 'dark' ? 'sun' : 'moon'}`);
      }
    });

    window.dispatchEvent(new CustomEvent('fsa:themechange', { detail: { theme: valid } }));
  }

  function setTheme(theme) {
    const valid = theme === 'light' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, valid);
      const storeRaw = localStorage.getItem(STORE_V1_KEY);
      if (storeRaw) {
        const store = JSON.parse(storeRaw);
        store.theme = valid;
        localStorage.setItem(STORE_V1_KEY, JSON.stringify(store));
      }
    } catch (_) {}
    applyTheme(valid);
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Auto-init on script execution & DOMContentLoaded
  const initial = getStoredTheme();
  applyTheme(initial);

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getStoredTheme());
    document.querySelectorAll('[data-fsa-theme-toggle], #themeToggleBtn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });
    });
  });

  window.FSA.theme = {
    get: () => document.documentElement.getAttribute('data-theme') || 'dark',
    set: setTheme,
    toggle: toggle,
    init: applyTheme
  };
})();
