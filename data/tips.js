/* ============================================================
   data/tips.js — Contextual Tips & Learning Reminders
   ------------------------------------------------------------
   Contract:
   - Keyed by track/lesson or global context.
   - Assigned to window.FSA.tips.
   - Bilingual content (English title + Arabic explanation).
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  window.FSA.tips = [
    {
      id: 'offline-study',
      track: 'global',
      title: 'Study Offline Anywhere',
      contentAr: 'تقدر تذاكر من غير إنترنت تماماً! حمّل مجلد المشروع وافتحه في المتصفح وهيشتغل بكامل مميزاته.',
      contentEn: 'You can study completely offline without any servers or build steps.'
    },
    {
      id: 'state-immutability',
      track: 'react',
      title: 'Remember: State is Immutable',
      contentAr: 'في React إياك تعدل الـ State مباشرة! استخدم دائماً الـ Setter function عشان React يحس بالتغيير ويعمل Re-render.',
      contentEn: 'Never mutate state directly. Always use the setter function to trigger reconciliation.'
    },
    {
      id: 'event-loop-microtasks',
      track: 'nodejs',
      title: 'Microtasks Run First',
      contentAr: 'الـ Promise callbacks و queueMicrotask بيتنفذوا قبل الـ setTimeout حتى لو كانت الـ timer 0ms!',
      contentEn: 'Microtask queue empties completely before the next phase of the event loop.'
    },
    {
      id: 'express-middleware-next',
      track: 'express',
      title: 'Never Forget next()',
      contentAr: 'لو الميدلوير مابعتش Response ومستدعىش next()، الطلب هيفضل معلق ومش هينتهي أبداً.',
      contentEn: 'Always call next() or send a response in middleware to avoid hanging requests.'
    }
  ];
})();
