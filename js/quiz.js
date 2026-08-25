/* ============================================================
   quiz.js — checkpoint quiz component (Part 8.4)
   ------------------------------------------------------------
   Contract:
   - Reads question pool from <script type="application/json" class="fsa-quiz-data">
   - Samples 3-6 items from the pool (variant sampling)
   - Renders interactive multiple-choice checkpoints
   - Instant bilingual feedback (English + Arabic why)
   - Wrong answers link back to relevant teaching anchors
   - Reports pass/fail to FSA.progress
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};

  function mount(config) {
    const rootEl = typeof config.el === 'string' ? document.getElementById(config.el) : config.el;
    if (!rootEl) return null;

    let pool = [];
    if (config.pool) {
      pool = config.pool;
    } else {
      // Find embedded JSON data
      const jsonScript = document.querySelector('.fsa-quiz-data');
      if (jsonScript) {
        try {
          const parsed = JSON.parse(jsonScript.textContent);
          pool = parsed.pool || [];
        } catch (e) {
          console.warn('Failed to parse quiz data:', e);
        }
      }
    }

    if (!pool || pool.length === 0) {
      rootEl.innerHTML = '<div style="color:var(--text-muted); font-size:var(--fs-sm);">No checkpoint questions registered for this lesson yet.</div>';
      return null;
    }

    // Sample questions (1 to 3 items)
    const sampleSize = Math.min(pool.length, 3);
    const questions = [...pool].sort(() => 0.5 - Math.random()).slice(0, sampleSize);
    
    let currentIdx = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {
      const q = questions[currentIdx];
      
      rootEl.innerHTML = `
        <div class="fsa-checkpoint__header">
          <span class="fsa-checkpoint__badge">
            Checkpoint Question ${currentIdx + 1} of ${questions.length} · سؤال التحقق
          </span>
          <span style="font-size:var(--fs-xs); color:var(--text-muted); font-family:var(--font-mono);">
            Score: ${score}/${questions.length}
          </span>
        </div>

        <div class="fsa-checkpoint__q">
          ${q.q}
          ${q.qAr ? `<div class="fsa-ar" dir="rtl" style="margin-block-start:4px; font-weight:normal; font-size:var(--fs-sm); color:var(--text-secondary);">${q.qAr}</div>` : ''}
        </div>

        <div class="fsa-checkpoint__options">
          ${q.options.map((opt, i) => `
            <label class="fsa-checkpoint__opt" data-opt-idx="${i}">
              <input type="radio" name="fsa_quiz_choice" value="${i}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>

        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <button class="fsa-btn fsa-btn--primary fsa-btn--sm fsa-quiz-btn-submit" disabled>
            Check Answer · تحقق من الإجابة
          </button>
          <button class="fsa-btn fsa-btn--ghost fsa-btn--sm fsa-quiz-btn-next" style="display:none;">
            ${currentIdx < questions.length - 1 ? 'Next Question &rsaquo; · السؤال التالي' : 'Finish Quiz · إنهاء الاختبار'}
          </button>
        </div>

        <div class="fsa-checkpoint__feedback"></div>
      `;

      const options = rootEl.querySelectorAll('.fsa-checkpoint__opt');
      const submitBtn = rootEl.querySelector('.fsa-quiz-btn-submit');
      const nextBtn = rootEl.querySelector('.fsa-quiz-btn-next');
      const feedback = rootEl.querySelector('.fsa-checkpoint__feedback');

      let selectedIndex = null;

      options.forEach((opt) => {
        opt.addEventListener('click', () => {
          if (answered) return;
          selectedIndex = parseInt(opt.getAttribute('data-opt-idx'), 10);
          submitBtn.removeAttribute('disabled');
        });
      });

      submitBtn.addEventListener('click', () => {
        if (selectedIndex === null || answered) return;
        answered = true;
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';

        const isCorrect = selectedIndex === q.answer;
        if (isCorrect) score++;

        options.forEach((opt, idx) => {
          if (idx === q.answer) opt.classList.add('is-correct');
          if (idx === selectedIndex && !isCorrect) opt.classList.add('is-wrong');
        });

        feedback.className = `fsa-checkpoint__feedback is-visible ${isCorrect ? 'is-correct' : 'is-wrong'}`;
        feedback.innerHTML = `
          <div style="font-weight:700; margin-block-end:4px;">
            ${isCorrect ? '✅ Correct! · إجابة صحيحة' : '❌ Incorrect · إجابة غير صحيحة'}
          </div>
          <div>${q.why || ''}</div>
          ${q.whyAr ? `<div class="fsa-ar" dir="rtl" style="margin-block-start:4px;">${q.whyAr}</div>` : ''}
          ${!isCorrect && q.anchor ? `
            <div style="margin-block-start:8px; font-size:var(--fs-xs);">
              <a href="#${q.anchor}" style="color:inherit; font-weight:600;">&larr; Revisit relevant lesson section · راجع هذا القسم في الدرس</a>
            </div>
          ` : ''}
        `;

        // Report progress if completed
        if (currentIdx === questions.length - 1 && window.FSA.progress) {
          const passed = score >= Math.ceil(questions.length * 0.7);
          const lessonMeta = window.FSA.app ? window.FSA.app.getMetadata() : null;
          if (lessonMeta && lessonMeta.track && lessonMeta.lesson) {
            window.FSA.progress.recordQuiz(`${lessonMeta.track}/${lessonMeta.lesson}`, passed);
          }
        }
      });

      nextBtn.addEventListener('click', () => {
        if (currentIdx < questions.length - 1) {
          currentIdx++;
          answered = false;
          renderQuestion();
        } else {
          // Render final score summary
          renderSummary();
        }
      });
    }

    function renderSummary() {
      const passed = score >= Math.ceil(questions.length * 0.7);
      rootEl.innerHTML = `
        <div style="text-align:center; padding:var(--space-6);">
          <div style="font-size:var(--fs-xl); font-weight:700; color:${passed ? 'var(--accent-success)' : 'var(--accent-warning)'}; margin-block-end:var(--space-2);">
            ${passed ? '🎉 Checkpoint Passed!' : '📖 Keep Practicing!'}
          </div>
          <p style="font-size:var(--fs-md); margin-block-end:var(--space-4);">
            You scored <strong>${score}</strong> out of <strong>${questions.length}</strong> (${Math.round((score / questions.length) * 100)}%).
          </p>
          <p class="fsa-ar" dir="rtl" style="color:var(--text-secondary); margin-block-end:var(--space-6);">
            ${passed ? 'ممتاز! لقد اجتزت أسئلة التحقق بنجاح وتأكدت من فهمك للمفاهيم الأساسية.' : 'يمكنك إعادة المحاولة أو مراجعة أقسام الدرس لترسيخ المفاهيم قبل الانتقال للدرس التالي.'}
          </p>
          <button class="fsa-btn fsa-btn--primary fsa-btn--sm" onclick="location.reload();">
            Retake Checkpoint · إعادة الاختبار
          </button>
        </div>
      `;
    }

    renderQuestion();

    return {
      getScore: () => score,
      getTotal: () => questions.length
    };
  }

  // Auto-mount
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fsa-checkpoint[id]').forEach((el) => {
      if (!el.children.length) mount({ el });
    });
  });

  window.FSA.quiz = {
    mount
  };
})();
