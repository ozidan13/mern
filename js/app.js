/* ============================================================
   app.js — shell: tree render, breadcrumbs, prev/next, TOC spy, drawer
   ------------------------------------------------------------
   Contract:
   - Declarative initialization from page metadata:
     <meta name="fsa-track" content="react">
     <meta name="fsa-lesson" content="use-state">
     <meta name="fsa-level" content="1">
   - Auto-renders breadcrumbs, prev/next navigation, TOC spy,
     and mobile drawer navigation.
   - Handles keyboard shortcuts: [ for prev, ] for next, Ctrl+K for search.
   - Fully relative-path safe (works from file:// and GitHub Pages).
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  // Utility to determine relative root path to repo root based on document location
  function getRelativeRoot() {
    const metaRoot = document.querySelector('meta[name="fsa-root"]');
    if (metaRoot) return metaRoot.getAttribute('content') || './';
    
    // Auto-detect based on path depth
    const path = window.location.pathname.replace(/\\/g, '/');
    const segments = path.split('/').filter(Boolean);
    
    if (path.includes('/learn/') || path.includes('/reference/')) {
      const idx = segments.findIndex(s => s === 'learn' || s === 'reference');
      if (idx !== -1) {
        const depth = segments.length - 1 - idx;
        return '../'.repeat(depth) || './';
      }
    }
    return './';
  }

  function getMetadata() {
    const get = (name) => {
      const el = document.querySelector(`meta[name="fsa-${name}"]`);
      return el ? el.getAttribute('content') : null;
    };
    return {
      track: get('track'),
      lesson: get('lesson'),
      level: get('level'),
      title: get('title') || document.title.split('·')[0].trim(),
      estMinutes: get('est-minutes'),
      teachesVersion: get('teaches-version'),
      patternLabel: get('pattern-label')
    };
  }

  // ---- TOC Scrollspy ----------------------------------------
  function initTocScrollSpy() {
    const tocList = document.querySelector('.fsa-toc__list');
    const content = document.querySelector('.fsa-article') || document.querySelector('main');
    if (!content) return;

    const headings = content.querySelectorAll('h2[id], h3[id]');
    if (!headings.length) return;

    // If TOC container exists and is empty, auto-populate it
    if (tocList && tocList.children.length === 0) {
      headings.forEach((h) => {
        const li = document.createElement('li');
        li.className = h.tagName === 'H3' ? 'fsa-toc__item fsa-toc__item--sub' : 'fsa-toc__item';
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.className = 'fsa-toc__link';
        a.textContent = h.textContent.replace(/[#¶]/g, '').trim();
        li.appendChild(a);
        tocList.appendChild(li);
      });
    }

    const tocLinks = document.querySelectorAll('.fsa-toc__link');
    if (!tocLinks.length) return;

    // IntersectionObserver for active section highlight
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              tocLinks.forEach((link) => {
                if (link.getAttribute('href') === `#${id}`) {
                  link.classList.add('is-active');
                  link.setAttribute('aria-current', 'location');
                } else {
                  link.classList.remove('is-active');
                  link.removeAttribute('aria-current');
                }
              });
            }
          });
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      );

      headings.forEach((h) => observer.observe(h));
    }
  }

  // ---- Mobile Drawer & Bottombar ----------------------------
  function initMobileDrawer() {
    let backdrop = document.querySelector('.fsa-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'fsa-backdrop';
      document.body.appendChild(backdrop);
    }

    const drawer = document.querySelector('.fsa-drawer');
    const menuButtons = document.querySelectorAll('[data-fsa-drawer-toggle]');

    function toggleDrawer(open) {
      const isOpen = open !== undefined ? open : !drawer?.classList.contains('is-open');
      if (drawer) drawer.classList.toggle('is-open', isOpen);
      backdrop.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuButtons.forEach((btn) => {
      btn.addEventListener('click', () => toggleDrawer());
    });

    backdrop.addEventListener('click', () => toggleDrawer(false));

    // Close drawer on Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer?.classList.contains('is-open')) {
        toggleDrawer(false);
      }
    });
  }

  // ---- Keyboard Shortcuts ------------------------------------
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ignore inside inputs and textareas
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      if (e.key === '[' || e.key === 'BracketLeft') {
        const prevLink = document.querySelector('[data-fsa-nav="prev"]');
        if (prevLink && prevLink.href) window.location.href = prevLink.href;
      } else if (e.key === ']' || e.key === 'BracketRight') {
        const nextLink = document.querySelector('[data-fsa-nav="next"]');
        if (nextLink && nextLink.href) window.location.href = nextLink.href;
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (window.FSA.search && window.FSA.search.openPalette) {
          window.FSA.search.openPalette();
        } else {
          const searchBtn = document.querySelector('[data-fsa-search-trigger]');
          if (searchBtn) searchBtn.click();
        }
      }
    });
  }

  // ---- Initialize Shell --------------------------------------
  function init() {
    initTocScrollSpy();
    initMobileDrawer();
    initKeyboardShortcuts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.FSA.app = {
    getMetadata,
    getRelativeRoot,
    init
  };
})();
