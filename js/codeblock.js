/* ============================================================
   codeblock.js — copy buttons, line permalinks, anatomy sync
   ------------------------------------------------------------
   Contract:
   - Enhances .fsa-code blocks:
     * One-click copy (strips CLI prompt prefixes '$ ' or '> ')
     * Visual 'Copied! · تم النسخ' feedback
   - Enhances .fsa-anatomy two-pane synced highlight:
     * Hover/click on code line highlights corresponding note
     * Hover/click on note highlights corresponding code line
   - Works offline and from file:// without any CDN syntax highlighters.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  function initCopyButtons() {
    document.querySelectorAll('.fsa-code').forEach((block) => {
      let copyBtn = block.querySelector('.fsa-code__copy');
      const pre = block.querySelector('pre');
      if (!pre) return;

      if (!copyBtn) {
        let bar = block.querySelector('.fsa-code__bar');
        if (!bar) {
          bar = document.createElement('div');
          bar.className = 'fsa-code__bar';
          bar.innerHTML = `
            <div class="fsa-code__dots"><div class="fsa-code__dot"></div></div>
            <span class="fsa-code__file">code</span>
          `;
          block.insertBefore(bar, pre);
        }

        copyBtn = document.createElement('button');
        copyBtn.className = 'fsa-code__copy';
        copyBtn.type = 'button';
        copyBtn.setAttribute('aria-label', 'Copy code snippet');
        copyBtn.innerHTML = `
          <svg style="width:14px;height:14px;"><use href="../../assets/icons.svg#fsa-icon-copy"></use></svg>
          <span>Copy</span>
        `;
        bar.appendChild(copyBtn);
      }

      copyBtn.addEventListener('click', async () => {
        let text = pre.innerText || pre.textContent;
        // Strip command line prompts if shell snippet
        text = text.replace(/^\$\s+/gm, '').replace(/^>\s+/gm, '');

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            // Fallback for file:// or restricted contexts
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }

          const originalHtml = copyBtn.innerHTML;
          copyBtn.innerHTML = `
            <svg style="width:14px;height:14px;color:var(--accent-success);"><use href="../../assets/icons.svg#fsa-icon-check"></use></svg>
            <span style="color:var(--accent-success);">Copied!</span>
          `;
          setTimeout(() => {
            copyBtn.innerHTML = originalHtml;
          }, 2000);
        } catch (err) {
          console.warn('Copy failed:', err);
        }
      });
    });
  }

  function initCodeAnatomy() {
    document.querySelectorAll('.fsa-anatomy').forEach((anatomy) => {
      const lines = anatomy.querySelectorAll('.fsa-anatomy__line[data-line]');
      const notes = anatomy.querySelectorAll('[data-line]');

      function activate(lineNum) {
        lines.forEach(l => l.classList.toggle('is-active', l.getAttribute('data-line') === lineNum));
        notes.forEach(n => {
          if (n.classList.contains('fsa-anatomy__line')) return;
          n.classList.toggle('is-active', n.getAttribute('data-line') === lineNum);
        });
      }

      function deactivate() {
        lines.forEach(l => l.classList.remove('is-active'));
        notes.forEach(n => {
          if (n.classList.contains('fsa-anatomy__line')) return;
          n.classList.remove('is-active');
        });
      }

      lines.forEach(line => {
        const lineNum = line.getAttribute('data-line');
        line.addEventListener('mouseenter', () => activate(lineNum));
        line.addEventListener('mouseleave', deactivate);
        line.addEventListener('click', () => activate(lineNum));
      });
    });
  }

  function init() {
    initCopyButtons();
    initCodeAnatomy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.FSA.codeblock = {
    init
  };
})();
