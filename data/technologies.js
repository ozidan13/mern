/* ============================================================
   data/technologies.js — Technology Registry & Version Truth
   ------------------------------------------------------------
   Contract:
   - Single source of truth for library/runtime versions.
   - Assigned to window.FSA.technologies.
   - Reviewed quarterly against ecosystem reality.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  window.FSA.technologies = {
    foundations: {
      id: 'foundations',
      name: 'Web & JS Foundations',
      currentVersion: 'ES2026 / HTML5 / HTTP/3',
      reviewedDate: '2026-08',
      patternLabel: 'Core Protocols & Standards',
      accentToken: 'var(--track-found)'
    },
    react: {
      id: 'react',
      name: 'React.js',
      currentVersion: '19.2',
      reviewedDate: '2026-08',
      patternLabel: 'Component-Driven UI & Hooks',
      accentToken: 'var(--track-react)'
    },
    nodejs: {
      id: 'nodejs',
      name: 'Node.js',
      currentVersion: '24 LTS',
      reviewedDate: '2026-08',
      patternLabel: 'Event-Driven Asynchronous Runtime',
      accentToken: 'var(--track-node)'
    },
    express: {
      id: 'express',
      name: 'Express.js',
      currentVersion: '5.2',
      reviewedDate: '2026-08',
      patternLabel: 'Middleware Pipeline & REST',
      accentToken: 'var(--track-express)'
    },
    mongodb: {
      id: 'mongodb',
      name: 'MongoDB',
      currentVersion: '8.0',
      reviewedDate: '2026-08',
      patternLabel: 'Document Model & Aggregation Pipeline',
      accentToken: 'var(--track-mongo)'
    },
    postgresql: {
      id: 'postgresql',
      name: 'PostgreSQL',
      currentVersion: '18.x',
      reviewedDate: '2026-08',
      patternLabel: 'Relational Model, Joins & ACID',
      accentToken: 'var(--track-pg)'
    },
    prisma: {
      id: 'prisma',
      name: 'Prisma',
      currentVersion: '7.x',
      reviewedDate: '2026-08',
      patternLabel: 'Type-Safe ORM & Data Layer',
      accentToken: 'var(--track-prisma)'
    },
    architecture: {
      id: 'architecture',
      name: 'Full-Stack Architecture',
      currentVersion: 'Modern Full-Stack',
      reviewedDate: '2026-08',
      patternLabel: 'Distributed Systems & Boundaries',
      accentToken: 'var(--track-arch)'
    }
  };
})();
