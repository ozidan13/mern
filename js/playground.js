/* ============================================================
   playground.js — editor + Worker runner + console capture (Part 8.3)
   ------------------------------------------------------------
   Contract:
   - FSA.playground.mount({ el, id, initialCode, mode })
   - Sandbox execution inside Blob Worker (Tier 1).
   - Console capture: log, warn, error, info, dir.
   - 3-second execution timeout guard (worker.terminate()).
   - Infinite loop cannot hang the page.
   - Autosaves draft to localStorage (survives reload).
   - Tier 0 static fallback: code is readable with JS off.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  const DRAFT_PREFIX = 'fsa.drafts.';

  function createWorkerBlobScript(userCode) {
    return `
      const customConsole = {
        log: (...args) => postMessage({ type: 'log', args: args.map(formatArg) }),
        warn: (...args) => postMessage({ type: 'warn', args: args.map(formatArg) }),
        error: (...args) => postMessage({ type: 'error', args: args.map(formatArg) }),
        info: (...args) => postMessage({ type: 'info', args: args.map(formatArg) }),
        dir: (...args) => postMessage({ type: 'dir', args: args.map(formatArg) })
      };

      function formatArg(arg) {
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (_) {
            return String(arg);
          }
        }
        return String(arg);
      }

      self.console = customConsole;

      try {
        const result = (function() {
          ${userCode}
        })();
        if (result !== undefined) {
          postMessage({ type: 'result', args: [formatArg(result)] });
        }
        postMessage({ type: 'done' });
      } catch (err) {
        postMessage({ type: 'error', args: [err.name + ': ' + err.message] });
        postMessage({ type: 'done' });
      }
    `;
  }

  function mount(config) {
    const rootEl = typeof config.el === 'string' ? document.getElementById(config.el) : config.el;
    if (!rootEl) return null;

    const id = config.id || rootEl.id || 'default-playground';
    const initialCode = config.initialCode || config.starterCode || '// Write JavaScript and click Run\nconsole.log("Hello, FullStack Academy!");\n';
    
    // Load draft if saved
    let savedCode = initialCode;
    try {
      const draft = localStorage.getItem(DRAFT_PREFIX + id);
      if (draft !== null) savedCode = draft;
    } catch (_) {}

    // Build DOM
    rootEl.innerHTML = `
      <div class="fsa-playground__bar">
        <span style="font-size:var(--fs-xs); font-family:var(--font-mono); color:var(--text-muted);">
          JavaScript Playground (Sandboxed)
        </span>
        <div style="display:flex; gap:8px;">
          <button class="fsa-btn fsa-btn--ghost fsa-btn--sm fsa-playground-btn-reset" title="Reset Code">
            <svg style="width:12px;height:12px;"><use href="../../assets/icons.svg#fsa-icon-reset"></use></svg>
            <span>Reset</span>
          </button>
          <button class="fsa-btn fsa-btn--primary fsa-btn--sm fsa-playground-btn-run" title="Run Code (Ctrl+Enter)">
            <svg style="width:12px;height:12px;"><use href="../../assets/icons.svg#fsa-icon-play"></use></svg>
            <span>Run</span>
          </button>
        </div>
      </div>

      <div class="fsa-playground__editor-wrap">
        <textarea class="fsa-playground__editor" spellcheck="false" aria-label="JavaScript Editor">${savedCode}</textarea>
      </div>

      <div class="fsa-playground__output">
        <div class="fsa-playground__output-label">Console Output · مخرجات الكود</div>
        <div class="fsa-playground__output-log">Click "Run" to execute.</div>
      </div>
    `;

    const textarea = rootEl.querySelector('.fsa-playground__editor');
    const runBtn = rootEl.querySelector('.fsa-playground-btn-run');
    const resetBtn = rootEl.querySelector('.fsa-playground-btn-reset');
    const outputLog = rootEl.querySelector('.fsa-playground__output-log');

    let currentWorker = null;
    let timeoutId = null;

    // Autosave on input
    textarea.addEventListener('input', () => {
      try {
        localStorage.setItem(DRAFT_PREFIX + id, textarea.value);
      } catch (_) {}
    });

    function runCode() {
      // Clear previous output & terminate running worker
      if (currentWorker) {
        currentWorker.terminate();
        currentWorker = null;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      outputLog.innerHTML = '<span style="color:var(--text-muted);">Executing...</span>';
      const userCode = textarea.value;

      try {
        const blob = new Blob([createWorkerBlobScript(userCode)], { type: 'application/javascript' });
        const blobUrl = URL.createObjectURL(blob);
        currentWorker = new Worker(blobUrl);

        let outputLines = [];

        currentWorker.onmessage = (e) => {
          const { type, args } = e.data;
          if (type === 'done') {
            clearTimeout(timeoutId);
            URL.revokeObjectURL(blobUrl);
            currentWorker = null;
            return;
          }

          const line = args ? args.join(' ') : '';
          let color = 'var(--text-primary)';
          if (type === 'warn') color = 'var(--accent-warning)';
          if (type === 'error') color = 'var(--accent-danger)';
          if (type === 'result') color = 'var(--accent-success)';

          outputLines.push(`<div style="color:${color}; margin-block:2px;">${escapeHtml(line)}</div>`);
          outputLog.innerHTML = outputLines.join('');
        };

        currentWorker.onerror = (err) => {
          clearTimeout(timeoutId);
          URL.revokeObjectURL(blobUrl);
          outputLog.innerHTML = `<div style="color:var(--accent-danger);">Runtime Error: ${escapeHtml(err.message)}</div>`;
          currentWorker = null;
        };

        // 3-second terminate guard
        timeoutId = setTimeout(() => {
          if (currentWorker) {
            currentWorker.terminate();
            currentWorker = null;
            URL.revokeObjectURL(blobUrl);
            outputLog.innerHTML += `<div style="color:var(--accent-danger); font-weight:bold; margin-block-start:4px;">⚠️ Execution timed out (3s limit). Infinite loop safely terminated!</div>`;
          }
        }, 3000);

      } catch (workerErr) {
        outputLog.innerHTML = `<div style="color:var(--accent-danger);">Worker Execution Error: ${escapeHtml(workerErr.message)}</div>`;
      }
    }

    function resetCode() {
      textarea.value = initialCode;
      try {
        localStorage.removeItem(DRAFT_PREFIX + id);
      } catch (_) {}
      outputLog.innerHTML = '<span style="color:var(--text-muted);">Reset to initial code.</span>';
    }

    runBtn.addEventListener('click', runCode);
    resetBtn.addEventListener('click', resetCode);

    // Ctrl+Enter / Cmd+Enter shortcut
    textarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      // Tab key indent
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }
    });

    return {
      run: runCode,
      reset: resetCode,
      getCode: () => textarea.value,
      setCode: (code) => { textarea.value = code; }
    };
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Auto-mount on elements with .fsa-playground and data-initial
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fsa-playground[id]').forEach((el) => {
      if (!el.children.length) {
        mount({ el });
      }
    });
  });

  window.FSA.playground = {
    mount
  };
})();
