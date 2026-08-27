/* ============================================================
   sections.js — Learning Section Manager
   ------------------------------------------------------------
   Manages full-width lesson sections, navigation progress dots,
   intersection-based activation, and immersive mode.
   Namespace: FSA.sections
   ============================================================ */

window.FSA = window.FSA || {};

window.FSA.sections = (function() {
  'use strict';

  // --- State & DOM References ---
  let sections = [];
  let navDots = [];
  let navBar = null;
  let observer = null;
  let ariaLiveRegion = null;

  // --- Helpers ---
  function getPrefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function createAriaLiveRegion() {
    if (!ariaLiveRegion) {
      ariaLiveRegion = document.createElement('div');
      ariaLiveRegion.setAttribute('aria-live', 'polite');
      ariaLiveRegion.setAttribute('aria-atomic', 'true');
      ariaLiveRegion.className = 'fsa-sr-only';
      Object.assign(ariaLiveRegion.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      });
      document.body.appendChild(ariaLiveRegion);
    }
  }

  function announce(message) {
    if (!ariaLiveRegion) createAriaLiveRegion();
    ariaLiveRegion.textContent = message;
  }

  // --- Navigation Bar Generation ---
  function buildNavigationBar() {
    if (sections.length <= 1) return null;

    const nav = document.createElement('nav');
    nav.className = 'fsa-section-nav';
    nav.setAttribute('aria-label', 'Lesson sections');

    const list = document.createElement('ul');
    list.className = 'fsa-section-nav__list';

    sections.forEach((section, index) => {
      if (!section.id) {
        section.id = `section-${index + 1}`;
      }

      const label = section.getAttribute('data-fsa-section-label') || `المحطة ${index + 1}`;
      
      const li = document.createElement('li');
      li.className = 'fsa-section-nav__item';

      const dot = document.createElement('button');
      dot.className = 'fsa-section-nav__dot';
      dot.setAttribute('type', 'button');
      dot.setAttribute('aria-label', `${label} (${index + 1} من ${sections.length})`);
      dot.setAttribute('data-index', String(index));
      dot.setAttribute('data-target-id', section.id);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'fsa-section-nav__label';
      labelSpan.textContent = label;

      dot.addEventListener('click', () => {
        scrollToSection(index);
      });

      li.appendChild(dot);
      li.appendChild(labelSpan);
      list.appendChild(li);
      navDots.push(dot);
    });

    nav.appendChild(list);
    return nav;
  }

  function scrollToSection(index) {
    if (!sections[index]) return;
    const target = sections[index];
    const topbarOffset = 70; // Topbar height + breathing room
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - topbarOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: getPrefersReducedMotion() ? 'auto' : 'smooth'
    });

    const label = target.getAttribute('data-fsa-section-label') || `المحطة ${index + 1}`;
    announce(`الانتقال إلى: ${label}`);
  }

  // --- Visibility & Intersection Tracking ---
  function setupIntersectionObserver() {
    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    if (observer) {
      observer.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = sections.indexOf(entry.target);
        if (index === -1 || !navDots[index]) return;

        if (entry.isIntersecting) {
          navDots.forEach((d, i) => {
            if (i === index) {
              d.classList.add('is-active');
              d.setAttribute('aria-current', 'step');
            } else {
              d.classList.remove('is-active');
              d.removeAttribute('aria-current');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  // --- Public API ---
  function init() {
    sections = Array.from(document.querySelectorAll('[data-fsa-section]'));
    if (sections.length === 0) return;

    navDots = [];
    navBar = buildNavigationBar();

    if (navBar) {
      const header = document.querySelector('.fsa-lesson-header');
      if (header && header.nextSibling) {
        header.parentNode.insertBefore(navBar, header.nextSibling);
      } else {
        const main = document.querySelector('.fsa-article') || document.querySelector('.fsa-main');
        if (main && main.firstChild) {
          main.insertBefore(navBar, main.firstChild);
        }
      }
    }

    setupIntersectionObserver();

    // Check for saved immersive mode preference
    if (sessionStorage.getItem('fsa_immersive') === 'true') {
      setImmersive(true);
    }
  }

  function setImmersive(enabled) {
    const shell = document.querySelector('.fsa-shell');
    if (!shell) return;

    if (enabled) {
      shell.setAttribute('data-immersive', 'true');
      sessionStorage.setItem('fsa_immersive', 'true');
      announce('تم تفعيل وضع الانغماس الكامل');
    } else {
      shell.removeAttribute('data-immersive');
      sessionStorage.removeItem('fsa_immersive');
      announce('تم إلغاء وضع الانغماس الكامل');
    }
  }

  function toggleImmersive() {
    const shell = document.querySelector('.fsa-shell');
    if (!shell) return;
    const isCurrentlyImmersive = shell.hasAttribute('data-immersive');
    setImmersive(!isCurrentlyImmersive);
  }

  function complete(sectionEl) {
    if (!sectionEl) return;
    sectionEl.classList.add('is-completed');
    const index = sections.indexOf(sectionEl);
    if (index !== -1 && navDots[index]) {
      navDots[index].classList.add('is-completed');
    }
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init: init,
    setImmersive: setImmersive,
    toggleImmersive: toggleImmersive,
    complete: complete,
    scrollToSection: scrollToSection
  };
})();
