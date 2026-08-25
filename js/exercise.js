/* ============================================================
   exercise.js — practice exercise runner & test harness (Part 8.5)
   ------------------------------------------------------------
   Contract:
   - FSA.exercise.mount({ el, id, title, prompt, starterCode, tests, solution, hints })
   - Executes student function in Worker against test cases.
   - Per-test pass/fail status + output diff.
   - 3-level progressive hint ladder.
   - Solution gate: unlocked ONLY after at least 1 test execution run.
   - Transparent local testing without servers.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  function mount(config) {
    const rootEl = typeof config.el === 'string' ? document.getElementById(config.el) : config.el;
    if (!rootEl) return null;

    const id = config.id || rootEl.id || 'exercise-1';
    const title = config.title || 'Practice Exercise';
    const prompt = config.prompt || 'Write a function to solve the problem.';
    const promptAr = config.promptAr || '';
    const starterCode = config.starterCode || '// Write your solution here\nfunction solution() {\n  \n}\n';
    const tests = config.tests || [];
    const hints = config.hints || [];
    const solution = config.solution || '';
    const solutionWhyAr = config.solutionWhyAr || '';

    let hasRun = false;
    let hintLevel = 0;

    rootEl.innerHTML = `
      <div class="fsa-card" style="margin-block:var(--space-6);">
        <div class="fsa-card__title" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <span>${title}</span>
          <span class="fsa-badge">Hands-On Practice</span>
        </div>

        <div style="margin-block:var(--space-3); font-size:var(--fs-sm);">
          <p>${prompt}</p>
          ${promptAr ? `<p class="fsa-ar" dir="rtl" style="color:var(--text-secondary); margin-block-start:4px;">${promptAr}</p>` : ''}
        </div>

        <!-- Exercise Editor -->
        <div class="fsa-playground" id="${id}-playground" style="margin-block:var(--space-4);">
          <div class="fsa-playground__bar">
            <span style="font-size:var(--fs-xs); font-family:var(--font-mono); color:var(--text-muted);">solution.js</span>
            <button class="fsa-btn fsa-btn--primary fsa-btn--sm fsa-exercise-btn-run">
              <svg style="width:12px;height:12px;"><use href="../../assets/icons.svg#fsa-icon-play"></use></svg>
              <span>Run Tests · تشغيل الاختبارات</span>
            </button>
          </div>
          <div class="fsa-playground__editor-wrap">
            <textarea class="fsa-playground__editor" spellcheck="false">${starterCode}</textarea>
          </div>
        </div>

        <!-- Test Results Output -->
        <div class="fsa-exercise-results" style="display:none; margin-block:var(--space-4); padding:var(--space-4); background:var(--bg-raised); border-radius:var(--radius-md);">
          <div style="font-size:var(--fs-xs); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-block-end:var(--space-2); color:var(--text-muted);">
            Test Results · نتائج الاختبارات
          </div>
          <div class="fsa-exercise-results__list"></div>
        </div>

        <!-- Hints & Solution Gate -->
        <div style="display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap; margin-block-start:var(--space-4); border-block-start:1px solid var(--border-subtle); padding-block-start:var(--space-3);">
          <div>
            ${hints.length > 0 ? `
              <button class="fsa-btn fsa-btn--ghost fsa-btn--sm fsa-exercise-btn-hint">
                <svg style="width:14px;height:14px;"><use href="../../assets/icons.svg#fsa-icon-lightbulb"></use></svg>
                <span>Get Hint (${hintLevel}/${hints.length}) · تلميح</span>
              </button>
            ` : ''}
          </div>

          <div>
            <button class="fsa-btn fsa-btn--ghost fsa-btn--sm fsa-exercise-btn-solution" title="Run tests at least once to unlock solution">
              <svg style="width:14px;height:14px;"><use href="../../assets/icons.svg#fsa-icon-code"></use></svg>
              <span>View Solution (Locked 🔒)</span>
            </button>
          </div>
        </div>

        <!-- Hint Display Area -->
        <div class="fsa-exercise-hint-box" style="display:none; margin-block-start:var(--space-3); padding:var(--space-3); background:var(--tint-warning); border-radius:var(--radius-sm); font-size:var(--fs-sm);"></div>

        <!-- Solution Display Area (Gated) -->
        <div class="fsa-exercise-solution-box" style="display:none; margin-block-start:var(--space-4); padding:var(--space-4); background:var(--bg-code); border:1px solid var(--border-subtle); border-radius:var(--radius-md);">
          <div style="font-weight:700; color:var(--accent-success); margin-block-end:var(--space-2);">Reference Solution & Why:</div>
          <pre style="color:var(--text-primary); font-family:var(--font-mono); font-size:var(--fs-xs); overflow-x:auto;"><code>${escapeHtml(solution)}</code></pre>
          ${solutionWhyAr ? `<div class="fsa-ar" dir="rtl" style="margin-block-start:var(--space-3); font-size:var(--fs-sm); color:var(--text-secondary);">${solutionWhyAr}</div>` : ''}
        </div>
      </div>
    `;

    const textarea = rootEl.querySelector('.fsa-playground__editor');
    const runBtn = rootEl.querySelector('.fsa-exercise-btn-run');
    const resultsBox = rootEl.querySelector('.fsa-exercise-results');
    const resultsList = rootEl.querySelector('.fsa-exercise-results__list');
    const hintBtn = rootEl.querySelector('.fsa-exercise-btn-hint');
    const hintBox = rootEl.querySelector('.fsa-exercise-hint-box');
    const solutionBtn = rootEl.querySelector('.fsa-exercise-btn-solution');
    const solutionBox = rootEl.querySelector('.fsa-exercise-solution-box');

    // Handle Hints
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        if (hintLevel < hints.length) {
          hintLevel++;
          hintBox.style.display = 'block';
          hintBox.innerHTML = `
            <div style="font-weight:700; margin-block-end:2px;">💡 Hint ${hintLevel}:</div>
            <div>${hints[hintLevel - 1]}</div>
          `;
          hintBtn.querySelector('span').textContent = `Get Hint (${hintLevel}/${hints.length}) · تلميح`;
        }
      });
    }

    // Handle Solution Gate
    solutionBtn.addEventListener('click', () => {
      if (!hasRun) {
        alert('Please click "Run Tests" at least once before unlocking the reference solution!');
        return;
      }
      const isVisible = solutionBox.style.display === 'block';
      solutionBox.style.display = isVisible ? 'none' : 'block';
    });

    // Handle Test Execution
    runBtn.addEventListener('click', () => {
      hasRun = true;
      solutionBtn.querySelector('span').textContent = 'View Solution · كشف الحل';
      solutionBtn.title = 'View reference solution';

      resultsBox.style.display = 'block';
      resultsList.innerHTML = '<span style="color:var(--text-muted); font-size:var(--fs-xs);">Running tests in worker sandbox...</span>';

      const userCode = textarea.value;

      // Build test suite script
      const testWorkerCode = `
        ${userCode}

        const tests = ${JSON.stringify(tests)};
        const results = [];

        for (let i = 0; i < tests.length; i++) {
          const t = tests[i];
          try {
            const fn = eval(t.fnName || 'solution');
            const actual = fn(...(t.args || []));
            const passed = JSON.stringify(actual) === JSON.stringify(t.expected);
            results.push({
              name: t.name || ('Test ' + (i + 1)),
              passed: passed,
              expected: t.expected,
              actual: actual
            });
          } catch (err) {
            results.push({
              name: t.name || ('Test ' + (i + 1)),
              passed: false,
              error: err.message
            });
          }
        }
        postMessage({ type: 'test_results', results: results });
      `;

      try {
        const blob = new Blob([testWorkerCode], { type: 'application/javascript' });
        const blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);

        const timeout = setTimeout(() => {
          worker.terminate();
          URL.revokeObjectURL(blobUrl);
          resultsList.innerHTML = '<div style="color:var(--accent-danger); font-size:var(--fs-xs);">⚠️ Test execution timed out (3s). Infinite loop prevented!</div>';
        }, 3000);

        worker.onmessage = (e) => {
          clearTimeout(timeout);
          URL.revokeObjectURL(blobUrl);
          worker.terminate();

          if (e.data.type === 'test_results') {
            const results = e.data.results;
            let html = '';
            let allPassed = true;

            results.forEach(r => {
              if (!r.passed) allPassed = false;
              html += `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 8px; margin-block:4px; border-radius:var(--radius-sm); font-size:var(--fs-xs); font-family:var(--font-mono); background:${r.passed ? 'var(--tint-success)' : 'var(--tint-danger)'}; border:1px solid ${r.passed ? 'var(--accent-success)' : 'var(--accent-danger)'};">
                  <span>${r.passed ? '✅' : '❌'} ${escapeHtml(r.name)}</span>
                  <span>${r.passed ? 'PASSED' : (r.error ? 'ERROR: ' + escapeHtml(r.error) : 'Expected: ' + JSON.stringify(r.expected) + ', Got: ' + JSON.stringify(r.actual))}</span>
                </div>
              `;
            });

            resultsList.innerHTML = html;
          }
        };

        worker.onerror = (err) => {
          clearTimeout(timeout);
          URL.revokeObjectURL(blobUrl);
          worker.terminate();
          resultsList.innerHTML = `<div style="color:var(--accent-danger); font-size:var(--fs-xs);">Syntax / Runtime Error: ${escapeHtml(err.message)}</div>`;
        };

      } catch (e) {
        resultsList.innerHTML = `<div style="color:var(--accent-danger); font-size:var(--fs-xs);">Worker setup failed: ${escapeHtml(e.message)}</div>`;
      }
    });

    return {
      run: () => runBtn.click()
    };
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  window.FSA.exercise = {
    mount
  };
})();
