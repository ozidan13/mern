/* ============================================================
   js/fsa-namespace.js — shared namespace bootstrap
   ------------------------------------------------------------
   Loaded FIRST on every page. Creates window.FSA exactly once.
   Every other shared script registers onto it.
   ============================================================ */
(function () {
  'use strict';
  window.FSA = window.FSA || {};
})();
