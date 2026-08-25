/* ============================================================
   tips.js — Contextual tip banners from data/tips.js
   ------------------------------------------------------------
   Contract:
   - Matches current track/lesson or global tips.
   - Dismissible banners; saves dismissed IDs to tipsSeen.
   - Pure DOM generation, no external dependencies.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  function initTips() {
    const tips = window.FSA.tips || [];
    if (!tips.length) return;

    const lessonMeta = window.FSA.app ? window.FSA.app.getMetadata() : null;
    const currentTrack = lessonMeta ? lessonMeta.track : null;

    // Find relevant tip not seen yet
    const matchingTip = tips.find((tip) => {
      if (window.FSA.progress && window.FSA.progress.isTipSeen(tip.id)) return false;
      if (tip.track === 'global') return true;
      if (currentTrack && tip.track === currentTrack) return true;
      return false;
    });

    if (!matchingTip) return;

    const banner = document.createElement('div');
    banner.className = 'fsa-callout';
    banner.setAttribute('data-kind', 'info');
    banner.style.marginBlock = 'var(--space-4)';
    banner.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
        <div>
          <div class="fsa-callout__title">
            <svg style="width:14px;height:14px;"><use href="../../assets/icons.svg#fsa-icon-lightbulb"></use></svg>
            <span>Tip: ${matchingTip.title}</span>
          </div>
          <p style="font-size:var(--fs-sm); margin-block-start:4px;">${matchingTip.contentEn}</p>
          ${matchingTip.contentAr ? `<p class="fsa-ar" dir="rtl" style="font-size:var(--fs-sm); color:var(--text-secondary); margin-block-start:4px;">${matchingTip.contentAr}</p>` : ''}
        </div>
        <button class="fsa-btn fsa-btn--ghost fsa-btn--icon fsa-tip-dismiss" style="width:28px; height:28px; min-height:28px;" title="Dismiss Tip · إغلاق">
          <svg style="width:14px;height:14px;"><use href="../../assets/icons.svg#fsa-icon-x"></use></svg>
        </button>
      </div>
    `;

    const mainArticle = document.querySelector('.fsa-article') || document.querySelector('main');
    if (mainArticle) {
      const header = mainArticle.querySelector('.fsa-lesson-header') || mainArticle.firstElementChild;
      if (header && header.nextSibling) {
        mainArticle.insertBefore(banner, header.nextSibling);
      } else {
        mainArticle.prepend(banner);
      }
    }

    banner.querySelector('.fsa-tip-dismiss').addEventListener('click', () => {
      if (window.FSA.progress) {
        window.FSA.progress.markTipSeen(matchingTip.id);
      }
      banner.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTips);
  } else {
    initTips();
  }

  window.FSA.tipsEngine = {
    init: initTips
  };
})();
