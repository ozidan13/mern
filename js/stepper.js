/* ============================================================
   stepper.js — narrated stepper ENGINE (Part 8.1)
   ------------------------------------------------------------
   Contract:
   - FSA.stepper.mount({ el, title, init, steps, render, labels })
   - Pure state factory + precomputed steps + renderer.
   - Provides:
     * Play/Pause (700ms tick)
     * Step Forward / Backward
     * Reset
     * New Example (re-invokes init)
     * Interactive Scrubber range slider
     * Capped execution log panel
     * aria-live="polite" narration channel
     * Keyboard controls (ArrowLeft, ArrowRight, Space)
     * prefers-reduced-motion support
   - ZERO algorithm-specific code in this engine.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  function mount(config) {
    const rootEl = typeof config.el === 'string' ? document.getElementById(config.el) : config.el;
    if (!rootEl) {
      console.warn(`[FSA.stepper] Root element not found:`, config.el);
      return null;
    }

    const title = config.title || 'Interactive Stepper Visualizer';
    const initFn = config.init || (() => ({}));
    const stepsFn = config.steps || (() => []);
    const renderFn = config.render || (() => {});
    const labels = config.labels || {};

    let state = initFn();
    let stepList = stepsFn(state);
    let currentIndex = 0;
    let timerId = null;
    const tickInterval = 700;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Build DOM Shell
    rootEl.innerHTML = `
      <div class="fsa-stepper__header">
        <span class="fsa-stepper__title">${title}</span>
        <div class="fsa-stepper__legend" style="display:flex; gap:8px; font-size:11px;">
          ${Object.entries(labels).map(([key, val]) => `
            <span style="display:flex; align-items:center; gap:4px; color:var(--text-muted);">
              <span class="fsa-viz-cell is-${key}" style="width:12px; height:12px; min-width:12px; min-height:12px; border-radius:2px; display:inline-block; transform:none;"></span>
              <span>${val}</span>
            </span>
          `).join('')}
        </div>
      </div>

      <div class="fsa-stepper__stage" role="region" aria-label="Visualizer Stage" tabindex="0">
        <div class="fsa-stepper__viz-mount" style="width:100%; display:flex; justify-content:center;"></div>
      </div>

      <div class="fsa-stepper__log" aria-live="polite" aria-atomic="true">
        <div class="fsa-stepper__log-msg fsa-ar" dir="rtl"></div>
      </div>

      <div class="fsa-stepper__controls">
        <div class="fsa-stepper__transport">
          <button class="fsa-btn fsa-btn--ghost fsa-btn--icon fsa-stepper-btn-reset" title="Reset (0) · إعادة للبداية" aria-label="Reset">
            <svg><use href="../../assets/icons.svg#fsa-icon-reset"></use></svg>
          </button>
          <button class="fsa-btn fsa-btn--ghost fsa-btn--icon fsa-stepper-btn-prev" title="Step Back (Left Arrow) · خطوة للخلف" aria-label="Step Back">
            <svg><use href="../../assets/icons.svg#fsa-icon-chevron-left"></use></svg>
          </button>
          <button class="fsa-btn fsa-btn--primary fsa-btn--icon fsa-stepper-btn-play" title="Play / Pause (Space) · تشغيل / إيقاف" aria-label="Play">
            <svg><use href="../../assets/icons.svg#fsa-icon-play"></use></svg>
          </button>
          <button class="fsa-btn fsa-btn--ghost fsa-btn--icon fsa-stepper-btn-next" title="Step Forward (Right Arrow) · خطوة للأمام" aria-label="Step Forward">
            <svg><use href="../../assets/icons.svg#fsa-icon-chevron-right"></use></svg>
          </button>
        </div>

        <div class="fsa-stepper__scrubber">
          <input type="range" class="fsa-stepper__range" min="0" max="${Math.max(0, stepList.length - 1)}" value="0" aria-label="Step Progress">
          <span class="fsa-stepper__step-count">0 / ${Math.max(0, stepList.length - 1)}</span>
        </div>

        <div>
          <button class="fsa-btn fsa-btn--ghost fsa-btn--sm fsa-stepper-btn-new" title="New Example · مثال جديد">
            <svg style="width:14px; height:14px;"><use href="../../assets/icons.svg#fsa-icon-refresh"></use></svg>
            <span>New Example</span>
          </button>
        </div>
      </div>
    `;

    // Cache elements
    const stage = rootEl.querySelector('.fsa-stepper__stage');
    const vizMount = rootEl.querySelector('.fsa-stepper__viz-mount');
    const logMsg = rootEl.querySelector('.fsa-stepper__log-msg');
    const playBtn = rootEl.querySelector('.fsa-stepper-btn-play');
    const prevBtn = rootEl.querySelector('.fsa-stepper-btn-prev');
    const nextBtn = rootEl.querySelector('.fsa-stepper-btn-next');
    const resetBtn = rootEl.querySelector('.fsa-stepper-btn-reset');
    const newBtn = rootEl.querySelector('.fsa-stepper-btn-new');
    const rangeInput = rootEl.querySelector('.fsa-stepper__range');
    const stepCountLabel = rootEl.querySelector('.fsa-stepper__step-count');

    function updateUI() {
      if (!stepList || stepList.length === 0) return;
      
      const currentStep = stepList[currentIndex] || {};
      
      // Update scrubber
      rangeInput.value = currentIndex;
      rangeInput.max = stepList.length - 1;
      stepCountLabel.textContent = `${currentIndex} / ${stepList.length - 1}`;

      // Update log text & narration
      const narration = currentStep.sayAr || currentStep.say || `Step ${currentIndex + 1}`;
      logMsg.textContent = narration;

      // Invoke consumer render function
      renderFn(state, currentStep, {
        container: rootEl,
        viz: vizMount,
        log: logMsg,
        stepIndex: currentIndex,
        totalSteps: stepList.length
      });
    }

    function stop() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        const iconUse = playBtn.querySelector('svg use');
        if (iconUse) {
          const base = (iconUse.getAttribute('href') || '').split('#')[0];
          iconUse.setAttribute('href', `${base}#fsa-icon-play`);
        }
      }
    }

    function play() {
      if (timerId) {
        stop();
        return;
      }
      if (currentIndex >= stepList.length - 1) {
        currentIndex = 0;
      }
      const iconUse = playBtn.querySelector('svg use');
      if (iconUse) {
        const base = (iconUse.getAttribute('href') || '').split('#')[0];
        iconUse.setAttribute('href', `${base}#fsa-icon-pause`);
      }
      timerId = setInterval(() => {
        if (currentIndex < stepList.length - 1) {
          currentIndex++;
          updateUI();
        } else {
          stop();
        }
      }, tickInterval);
    }

    function stepForward() {
      stop();
      if (currentIndex < stepList.length - 1) {
        currentIndex++;
        updateUI();
      }
    }

    function stepBackward() {
      stop();
      if (currentIndex > 0) {
        currentIndex--;
        updateUI();
      }
    }

    function reset() {
      stop();
      currentIndex = 0;
      updateUI();
    }

    function newExample() {
      stop();
      state = initFn();
      stepList = stepsFn(state);
      currentIndex = 0;
      updateUI();
    }

    // Attach Event Listeners
    playBtn.addEventListener('click', play);
    nextBtn.addEventListener('click', stepForward);
    prevBtn.addEventListener('click', stepBackward);
    resetBtn.addEventListener('click', reset);
    newBtn.addEventListener('click', newExample);

    rangeInput.addEventListener('input', (e) => {
      stop();
      currentIndex = parseInt(e.target.value, 10);
      updateUI();
    });

    // Keyboard support when focused on stage or root
    rootEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepBackward();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        play();
      }
    });

    // Initial render
    updateUI();

    return {
      play,
      stop,
      stepForward,
      stepBackward,
      reset,
      newExample,
      getCurrentIndex: () => currentIndex
    };
  }

  window.FSA.stepper = {
    mount
  };
})();
