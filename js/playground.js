/* ============================================================
   playground.js — Multi-Mode Code Playground (Phase 4 Framework)
   ------------------------------------------------------------
   Contract:
   - FSA.playground.mount({ el, id, initialCode, mode })
   - Output Modes: 'console' | 'dom-preview' | 'request-response'
   - Sandbox execution inside Blob Worker (Console) or srcdoc iframe (DOM).
   - 2.5-second execution timeout guard against infinite loops.
   - Autosaves drafts to localStorage.
   - Zero external dependencies; 100% offline via file:///.
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
    const supportedModes = config.supportedModes || ['console', 'dom-preview', 'request-response'];
    let activeMode = config.mode || rootEl.getAttribute('data-mode') || 'console';
    
    const initialCode = config.initialCode || config.starterCode || 
      '// Write JavaScript and click Run\nconsole.log("Hello, CodeHub Interactive Experience!");\n';
    
    // Load draft if saved
    let savedCode = initialCode;
    try {
      const draft = localStorage.getItem(DRAFT_PREFIX + id);
      if (draft !== null) savedCode = draft;
    } catch (_) {}

    // Build DOM
    rootEl.innerHTML = `
      <div class="fsa-playground__bar">
        <div class="fsa-playground__mode-tabs" role="tablist">
          <button class="fsa-playground__mode-tab ${activeMode === 'console' ? 'is-active' : ''}" data-mode="console" type="button" role="tab" aria-selected="${activeMode === 'console'}">Console</button>
          <button class="fsa-playground__mode-tab ${activeMode === 'dom-preview' ? 'is-active' : ''}" data-mode="dom-preview" type="button" role="tab" aria-selected="${activeMode === 'dom-preview'}">DOM Preview</button>
          <button class="fsa-playground__mode-tab ${activeMode === 'request-response' ? 'is-active' : ''}" data-mode="request-response" type="button" role="tab" aria-selected="${activeMode === 'request-response'}">HTTP Inspector</button>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="fsa-btn fsa-btn--ghost fsa-btn--sm fsa-playground-btn-reset" title="Reset Code" type="button">
            <svg style="width:12px;height:12px;"><use href="../../assets/icons.svg#fsa-icon-reset"></use></svg>
            <span>Reset</span>
          </button>
          <button class="fsa-btn fsa-btn--primary fsa-btn--sm fsa-playground-btn-run" title="Run Code (Ctrl+Enter)" type="button">
            <svg style="width:12px;height:12px;"><use href="../../assets/icons.svg#fsa-icon-play"></use></svg>
            <span>Run</span>
          </button>
        </div>
      </div>

      <div class="fsa-playground__editor-wrap">
        <textarea class="fsa-playground__editor" spellcheck="false" aria-label="Code Editor">${savedCode}</textarea>
      </div>

      <div class="fsa-playground__output">
        <!-- Console View -->
        <div class="fsa-playground__view fsa-playground__view--console" style="display:${activeMode === 'console' ? 'block' : 'none'};">
          <div class="fsa-playground__output-label">Console Output · مخرجات الكونسول</div>
          <div class="fsa-playground__output-log">Click "Run" to execute.</div>
        </div>

        <!-- DOM Preview View -->
        <div class="fsa-playground__view fsa-playground__view--dom" style="display:${activeMode === 'dom-preview' ? 'block' : 'none'};">
          <div class="fsa-playground__output-label">Live DOM Preview · العرض المباشر</div>
          <div class="fsa-playground__preview-container">
            <iframe class="fsa-playground__preview-frame" sandbox="allow-scripts" title="Code Output Preview"></iframe>
          </div>
        </div>

        <!-- HTTP Inspector View -->
        <div class="fsa-playground__view fsa-playground__view--api" style="display:${activeMode === 'request-response' ? 'block' : 'none'};">
          <div class="fsa-playground__output-label">HTTP Request & Response Inspector · فاحص الطلبات</div>
          <div class="fsa-api-inspector">
            <div class="fsa-api-inspector__req-bar">
              <span class="fsa-api-inspector__method fsa-api-inspector__method--get">GET</span>
              <span class="fsa-api-inspector__url">/api/v1/resource</span>
              <span class="fsa-api-inspector__status fsa-api-inspector__status--200">200 OK</span>
            </div>
            <div class="fsa-api-inspector__body">
              <pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text-secondary);">{
  "status": "success",
  "message": "Click Run to inspect API response payload."
}</pre>
            </div>
          </div>
        </div>
      </div>
    `;

    const textarea = rootEl.querySelector('.fsa-playground__editor');
    const runBtn = rootEl.querySelector('.fsa-playground-btn-run');
    const resetBtn = rootEl.querySelector('.fsa-playground-btn-reset');
    const outputLog = rootEl.querySelector('.fsa-playground__output-log');
    const iframe = rootEl.querySelector('.fsa-playground__preview-frame');
    const apiInspector = rootEl.querySelector('.fsa-api-inspector__body pre');
    const modeTabs = rootEl.querySelectorAll('.fsa-playground__mode-tab');
    const views = {
      console: rootEl.querySelector('.fsa-playground__view--console'),
      'dom-preview': rootEl.querySelector('.fsa-playground__view--dom'),
      'request-response': rootEl.querySelector('.fsa-playground__view--api')
    };

    let currentWorker = null;
    let timeoutId = null;

    // Mode Switcher
    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const selectedMode = tab.getAttribute('data-mode');
        setMode(selectedMode);
      });
    });

    function setMode(mode) {
      activeMode = mode;
      modeTabs.forEach(t => {
        const isMatch = t.getAttribute('data-mode') === mode;
        t.classList.toggle('is-active', isMatch);
        t.setAttribute('aria-selected', String(isMatch));
      });
      Object.keys(views).forEach(k => {
        if (views[k]) views[k].style.display = (k === mode) ? 'block' : 'none';
      });

      if (mode === 'dom-preview') {
        renderDomPreview();
      }
    }

    // Autosave on input
    textarea.addEventListener('input', () => {
      try {
        localStorage.setItem(DRAFT_PREFIX + id, textarea.value);
      } catch (_) {}

      if (activeMode === 'dom-preview') {
        renderDomPreview();
      }
    });

    function renderDomPreview() {
      if (!iframe) return;
      const code = textarea.value;
      const srcDoc = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; background: #ffffff; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${code.includes('<') ? code : '<pre>' + escapeHtml(code) + '</pre>'}
        </body>
        </html>
      `;
      iframe.srcdoc = srcDoc;
    }

    function runCode() {
      if (activeMode === 'dom-preview') {
        renderDomPreview();
        return;
      }

      if (activeMode === 'request-response') {
        runApiSimulation();
        return;
      }

      // Console Worker Execution
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

        timeoutId = setTimeout(() => {
          if (currentWorker) {
            currentWorker.terminate();
            currentWorker = null;
            URL.revokeObjectURL(blobUrl);
            outputLog.innerHTML += `<div style="color:var(--accent-danger); font-weight:bold; margin-block-start:4px;">⚠️ Execution timed out (2.5s limit). Infinite loop safely terminated!</div>`;
          }
        }, 2500);

      } catch (workerErr) {
        outputLog.innerHTML = `<div style="color:var(--accent-danger);">Worker Execution Error: ${escapeHtml(workerErr.message)}</div>`;
      }
    }

    function runApiSimulation() {
      if (!apiInspector) return;
      try {
        const userCode = textarea.value;
        apiInspector.textContent = `Processing simulated API request...\n\nResult:\n` + userCode;
      } catch (err) {
        apiInspector.textContent = `Simulation Error: ${err.message}`;
      }
    }

    function resetCode() {
      textarea.value = initialCode;
      try {
        localStorage.removeItem(DRAFT_PREFIX + id);
      } catch (_) {}
      outputLog.innerHTML = '<span style="color:var(--text-muted);">Reset to initial code.</span>';
      if (activeMode === 'dom-preview') renderDomPreview();
    }

    runBtn.addEventListener('click', runCode);
    resetBtn.addEventListener('click', resetCode);

    // Ctrl+Enter / Cmd+Enter shortcut
    textarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      // Tab key indent (2 spaces)
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
      setMode: setMode,
      getCode: () => textarea.value,
      setCode: (code) => { textarea.value = code; }
    };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Auto-mount on elements with .fsa-playground and ID
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
