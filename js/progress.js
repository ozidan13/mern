/* ============================================================
   progress.js — the localStorage store API (Part 9)
   ------------------------------------------------------------
   Contract:
   - Owns all persistence under key 'fsa.store.v1'.
   - Schema version 1 with corruption-safe defaults.
   - Non-punitive streak tracking (calendar days recorded).
   - Local review queue (SM-2-lite scheduling).
   - Export / Import progress JSON for backup & multi-device study.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  const STORE_KEY = 'fsa.store.v1';
  const listeners = new Set();

  function getDefaultStore() {
    return {
      version: 1,
      theme: 'dark',
      lessons: {},
      bookmarks: [],
      notes: {},
      drafts: {},
      reviewQueue: [],
      streak: { days: [], lastActive: null },
      projects: {},
      tipsSeen: []
    };
  }

  function getTodayString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getStore() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return getDefaultStore();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return getDefaultStore();
      return { ...getDefaultStore(), ...parsed };
    } catch (_) {
      return getDefaultStore();
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
      listeners.forEach((fn) => {
        try { fn(store); } catch (_) {}
      });
      window.dispatchEvent(new CustomEvent('fsa:progressupdate', { detail: store }));
    } catch (e) {
      console.warn('Failed to save FSA store:', e);
    }
  }

  function touchStreak(store) {
    const today = getTodayString();
    store.streak = store.streak || { days: [], lastActive: null };
    if (!store.streak.days.includes(today)) {
      store.streak.days.push(today);
    }
    store.streak.lastActive = today;
  }

  function isCompleted(slug) {
    const store = getStore();
    return store.lessons[slug]?.status === 'completed';
  }

  function markComplete(slug) {
    const store = getStore();
    const existing = store.lessons[slug] || {};
    store.lessons[slug] = {
      ...existing,
      status: 'completed',
      updatedAt: Date.now()
    };
    touchStreak(store);
    saveStore(store);
  }

  function recordQuiz(slug, passed) {
    const store = getStore();
    const existing = store.lessons[slug] || {};
    store.lessons[slug] = {
      ...existing,
      quizPassed: passed,
      attempts: (existing.attempts || 0) + 1,
      updatedAt: Date.now()
    };
    if (!passed) {
      // Add to review queue if not present
      if (!store.reviewQueue.some(r => r.slug === slug)) {
        store.reviewQueue.push({
          slug,
          dueAt: Date.now() + 86400000, // 24h later
          intervalDays: 1
        });
      }
    }
    touchStreak(store);
    saveStore(store);
  }

  function toggleBookmark(slug) {
    const store = getStore();
    const idx = store.bookmarks.indexOf(slug);
    if (idx === -1) {
      store.bookmarks.push(slug);
    } else {
      store.bookmarks.splice(idx, 1);
    }
    saveStore(store);
    return idx === -1;
  }

  function isBookmarked(slug) {
    const store = getStore();
    return store.bookmarks.includes(slug);
  }

  function saveNote(slug, text) {
    const store = getStore();
    store.notes[slug] = text;
    saveStore(store);
  }

  function getNote(slug) {
    const store = getStore();
    return store.notes[slug] || '';
  }

  function markTipSeen(tipId) {
    const store = getStore();
    if (!store.tipsSeen.includes(tipId)) {
      store.tipsSeen.push(tipId);
      saveStore(store);
    }
  }

  function isTipSeen(tipId) {
    const store = getStore();
    return store.tipsSeen.includes(tipId);
  }

  function getStats() {
    const store = getStore();
    const curriculum = window.FSA.curriculum || { flatList: [] };
    const total = curriculum.flatList.length || 1;
    let completedCount = 0;

    curriculum.flatList.forEach((item) => {
      if (store.lessons[item.slug]?.status === 'completed') {
        completedCount++;
      }
    });

    const percent = Math.round((completedCount / total) * 100);

    return {
      total,
      completedCount,
      percent,
      streakDays: store.streak.days.length,
      lastActive: store.streak.lastActive,
      bookmarksCount: store.bookmarks.length,
      reviewQueueCount: store.reviewQueue.length
    };
  }

  function exportJSON() {
    const store = getStore();
    const jsonStr = JSON.stringify(store, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fsa-progress-backup-${getTodayString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON format');
      }
      const merged = { ...getDefaultStore(), ...parsed };
      saveStore(merged);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  function reset() {
    saveStore(getDefaultStore());
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  // Auto-connect Mark Complete button on lesson pages
  document.addEventListener('DOMContentLoaded', () => {
    const markBtn = document.getElementById('markCompleteBtn');
    const lessonMeta = window.FSA.app ? window.FSA.app.getMetadata() : null;
    
    if (markBtn && lessonMeta && lessonMeta.track && lessonMeta.lesson) {
      const slug = `${lessonMeta.track}/${lessonMeta.lesson}`;
      
      function updateButtonUI() {
        const completed = isCompleted(slug);
        if (completed) {
          markBtn.innerHTML = `
            <svg style="width:16px;height:16px;"><use href="../../assets/icons.svg#fsa-icon-check-circle"></use></svg>
            <span>Completed! · تم إكمال الدرس</span>
          `;
          markBtn.classList.remove('fsa-btn--primary');
          markBtn.classList.add('fsa-btn--ghost');
          markBtn.style.color = 'var(--accent-success)';
        }
      }

      updateButtonUI();

      markBtn.addEventListener('click', () => {
        markComplete(slug);
        updateButtonUI();
      });
    }
  });

  window.FSA.progress = {
    getStore,
    saveStore,
    isCompleted,
    markComplete,
    recordQuiz,
    toggleBookmark,
    isBookmarked,
    saveNote,
    getNote,
    markTipSeen,
    isTipSeen,
    getStats,
    exportJSON,
    importJSON,
    reset,
    subscribe
  };
})();
