/**
 * C-TEST DEUTSCH - Main Application Controller
 * Verbindet UI-Events, Exam-Manager, Generator und Analytics.
 */

// Globaler Anwendungszustand
const AppState = {
  activeTab: "exam", // "exam", "practice", "generator", "results", "history"
  examManager: null,
  activePracticeCTest: null,
  activePracticeAnswers: {},
  activePracticeTextInfo: null,
  practiceTimerInterval: null,
  practiceTimeRemaining: 300,
  lastReport: null,
  focusedInput: null,
  history: JSON.parse(localStorage.getItem("ctest_history") || "[]")
};

// Initialisierung bei DOM-Bereitschaft
document.addEventListener("DOMContentLoaded", () => {
  initLucide();
  initTabs();
  initUmlautBar();
  initExamMode();
  initPracticeMode();
  initGeneratorMode();
  initHistoryView();
});

function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Tab-Navigation
 */
function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabTarget;
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  AppState.activeTab = tabId;

  // Buttons aktualisieren
  document.querySelectorAll("[data-tab-target]").forEach(btn => {
    if (btn.dataset.tabTarget === tabId) {
      btn.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-2 transition";
    } else {
      btn.className = "px-4 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 flex items-center gap-2 transition";
    }
  });

  // Tab-Inhalte umschalten
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.toggle("hidden", content.id !== `tab-${tabId}`);
  });

  if (tabId === "history") {
    renderHistory();
  }

  initLucide();
}

/**
 * Deutsche Umlaut-Tastaturleiste (ä, ö, ü, ß, Ä, Ö, Ü)
 */
function initUmlautBar() {
  const umlautBtns = document.querySelectorAll(".umlaut-btn");
  umlautBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const char = btn.dataset.char;
      if (AppState.focusedInput) {
        const input = AppState.focusedInput;
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const val = input.value;
        const max = parseInt(input.maxLength, 10) || 10;

        if (val.length < max || start !== end) {
          input.value = val.slice(0, start) + char + val.slice(end);
          input.setSelectionRange(start + 1, start + 1);
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        input.focus();
      }
    });
  });
}

/**
 * -----------------------------------------------------------------------------
 * 1. PRÜFUNGSMODUS (EXAM MODE: 8 TEXTE x 5 MINUTEN)
 * -----------------------------------------------------------------------------
 */
function initExamMode() {
  const startBtn = document.getElementById("btn-start-exam");
  const nextBtn = document.getElementById("btn-exam-next");
  const prevBtn = document.getElementById("btn-exam-prev");
  const finishBtn = document.getElementById("btn-exam-finish");
  const pauseBtn = document.getElementById("btn-exam-pause");

  if (startBtn) {
    startBtn.addEventListener("click", startExamSession);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (AppState.examManager) {
        AppState.examManager.nextText();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (AppState.examManager) {
        AppState.examManager.prevText();
      }
    });
  }

  if (finishBtn) {
    finishBtn.addEventListener("click", () => {
      if (confirm("Вы уверены, что хотите завершить экзамен сейчас? Все текущие ответы будут отправлены на проверку.")) {
        if (AppState.examManager) {
          AppState.examManager.finishExam();
        }
      }
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      if (AppState.examManager) {
        const isPaused = AppState.examManager.togglePause();
        pauseBtn.innerHTML = isPaused
          ? `<i data-lucide="play" class="w-4 h-4"></i> Продолжить`
          : `<i data-lucide="pause" class="w-4 h-4"></i> Пауза`;
        initLucide();
      }
    });
  }
}

function startExamSession() {
  document.getElementById("exam-welcome-card").classList.add("hidden");
  document.getElementById("exam-active-card").classList.remove("hidden");

  // Gewähltes Prüfungsprofil
  const profileSelect = document.getElementById("exam-profile-select");
  const profile = profileSelect ? profileSelect.value : "standard";

  let examTextsToUse = TEXTS_DATABASE.standardExamTexts;
  if (profile === "beginner") {
    examTextsToUse = TEXTS_DATABASE.beginnerExamTexts;
  } else if (profile === "full") {
    examTextsToUse = TEXTS_DATABASE.fullSpectrumExamTexts;
  }

  // Initialisiere ExamManager mit den 8 Prüfungstexten
  AppState.examManager = new ExamManager(examTextsToUse, {
    timePerText: 300, // 5 Minuten = 300 Sekunden

    onTick: (timerState) => {
      updateExamTimerUI(timerState);
    },

    onTextChange: (textState, textIndex) => {
      renderExamTextUI(textState, textIndex);
      updateExamPillsUI(textIndex);
    },

    onTimeExpired: (expiredInfo) => {
      showToastNotification(`⏰ Время вышло! Переход к тексту ${expiredInfo.nextTextIndex + 1} из 8.`, "warning");
    },

    onExamComplete: (summary) => {
      finishAndShowResults(summary);
    }
  });

  renderExamPills();
  AppState.examManager.startExam();
}

function renderExamPills() {
  const container = document.getElementById("exam-texts-pills");
  if (!container || !AppState.examManager) return;

  container.innerHTML = AppState.examManager.textsData.map((t, idx) => `
    <button
      type="button"
      onclick="handleExamPillClick(${idx})"
      id="exam-pill-${idx}"
      class="px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
        idx === 0
          ? 'bg-sky-500 text-white border-sky-400 shadow-md'
          : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
      }"
    >
      <span>Текст ${idx + 1}</span>
      <span class="text-[10px] px-1 py-0.2 rounded bg-black/30 font-mono">${t.level}</span>
    </button>
  `).join("");
}

window.handleExamPillClick = function(index) {
  if (AppState.examManager) {
    AppState.examManager.goToText(index);
  }
};

function updateExamPillsUI(currentIndex) {
  if (!AppState.examManager) return;
  AppState.examManager.textsData.forEach((t, idx) => {
    const pill = document.getElementById(`exam-pill-${idx}`);
    if (!pill) return;

    const answeredCount = Object.keys(t.userAnswers).filter(k => (t.userAnswers[k] || "").trim().length > 0).length;
    const isDone = answeredCount >= 18;

    if (idx === currentIndex) {
      pill.className = "px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 bg-sky-500 text-white border-sky-400 shadow-lg ring-2 ring-sky-500/30";
    } else if (isDone) {
      pill.className = "px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    } else {
      pill.className = "px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200";
    }
  });
}

function updateExamTimerUI(timerState) {
  const timerDisplay = document.getElementById("exam-timer-display");
  const timerBar = document.getElementById("exam-timer-bar");
  const examTotalDisplay = document.getElementById("exam-total-timer-display");

  if (!timerDisplay) return;

  const seconds = timerState.timeRemaining;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  timerDisplay.textContent = formatted;

  // Prozentualer Fortschritt (5 Min = 300 Sek)
  const perc = (seconds / timerState.totalTimePerText) * 100;
  if (timerBar) {
    timerBar.style.width = `${perc}%`;
    if (seconds <= 45) {
      timerBar.className = "h-full bg-rose-500 transition-all duration-300";
      timerDisplay.classList.add("timer-urgent");
    } else if (seconds <= 120) {
      timerBar.className = "h-full bg-amber-500 transition-all duration-300";
      timerDisplay.classList.remove("timer-urgent");
    } else {
      timerBar.className = "h-full bg-sky-500 transition-all duration-300";
      timerDisplay.classList.remove("timer-urgent");
    }
  }

  if (examTotalDisplay) {
    const totSec = timerState.totalExamRemaining;
    const tMin = Math.floor(totSec / 60);
    const tSec = totSec % 60;
    examTotalDisplay.textContent = `Всего: ${String(tMin).padStart(2, "0")}:${String(tSec).padStart(2, "0")}`;
  }
}

function renderExamTextUI(textState, textIndex) {
  document.getElementById("exam-current-title").textContent = `Текст ${textIndex + 1} из 8: ${textState.title}`;
  document.getElementById("exam-current-theme").textContent = `${textState.level} • ${textState.theme}`;

  const container = document.getElementById("exam-passage-container");
  container.innerHTML = "";

  const formFragment = document.createDocumentFragment();

  textState.ctest.elements.forEach(el => {
    if (el.type === "text") {
      const span = document.createElement("span");
      span.textContent = el.content;
      formFragment.appendChild(span);
    } else if (el.type === "gap") {
      const wrap = document.createElement("span");
      wrap.className = "gap-wrapper";

      const prefixSpan = document.createElement("span");
      prefixSpan.className = "gap-prefix";
      prefixSpan.textContent = el.prefix;
      wrap.appendChild(prefixSpan);

      const input = document.createElement("input");
      input.type = "text";
      input.className = "gap-input";
      input.dataset.gapId = el.gapId;
      input.dataset.length = el.length;
      input.maxLength = el.length;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.autocapitalize = "none";
      // Berechne Breite anhand der fehlenden Zeichen
      input.style.width = `${Math.max(2.2, el.length * 1.1 + 0.6)}ch`;
      input.placeholder = "•".repeat(el.length);

      // Falls bereits ausgefüllt
      if (textState.userAnswers[el.gapId]) {
        input.value = textState.userAnswers[el.gapId];
        input.classList.add("gap-filled");
      }

      // Event-Handler für Eingabe und Tastaturnavigation
      attachGapInputEvents(input, (gapId, val) => {
        AppState.examManager.setAnswer(gapId, val);
        updateExamFilledCounter();
      });

      wrap.appendChild(input);
      formFragment.appendChild(wrap);
    }
  });

  container.appendChild(formFragment);
  updateExamFilledCounter();

  // Fokus auf erstes leeres Feld
  setTimeout(() => {
    const firstEmpty = container.querySelector(".gap-input:not(.gap-filled)");
    if (firstEmpty) {
      firstEmpty.focus();
    } else {
      const firstInput = container.querySelector(".gap-input");
      if (firstInput) firstInput.focus();
    }
  }, 50);

  // Buttons Vorheriger/Nächster
  const prevBtn = document.getElementById("btn-exam-prev");
  const nextBtn = document.getElementById("btn-exam-next");
  if (prevBtn) prevBtn.disabled = textIndex === 0;
  if (nextBtn) {
    if (textIndex === 7) {
      nextBtn.innerHTML = `Завершить экзамен <i data-lucide="check-circle" class="w-4 h-4"></i>`;
    } else {
      nextBtn.innerHTML = `Следующий текст <i data-lucide="chevron-right" class="w-4 h-4"></i>`;
    }
    initLucide();
  }
}

function updateExamFilledCounter() {
  if (!AppState.examManager) return;
  const current = AppState.examManager.getCurrentTextState();
  const filled = Object.keys(current.userAnswers).filter(k => (current.userAnswers[k] || "").trim().length > 0).length;
  const counterEl = document.getElementById("exam-filled-count");
  if (counterEl) {
    counterEl.textContent = `${filled} / ${current.ctest.gaps.length} заполнено`;
  }
}

/**
 * -----------------------------------------------------------------------------
 * 2. ÜBUNGSMODUS (PRACTICE MODE)
 * -----------------------------------------------------------------------------
 */
function initPracticeMode() {
  const levelSelect = document.getElementById("practice-level-select");
  const textSelect = document.getElementById("practice-text-select");
  const randomBtn = document.getElementById("btn-practice-random");
  const checkBtn = document.getElementById("btn-practice-check");
  const resetBtn = document.getElementById("btn-practice-reset");
  const hintBtn = document.getElementById("btn-practice-hint");

  populatePracticeTextsDropdown("all");

  if (levelSelect) {
    levelSelect.addEventListener("change", (e) => {
      populatePracticeTextsDropdown(e.target.value);
    });
  }

  if (textSelect) {
    textSelect.addEventListener("change", (e) => {
      loadSelectedPracticeText(e.target.value);
    });
  }

  if (randomBtn) {
    randomBtn.addEventListener("click", () => {
      const allAvailable = [...TEXTS_DATABASE.examTexts, ...TEXTS_DATABASE.practiceTexts];
      const lvl = levelSelect.value;
      const filtered = lvl === "all" ? allAvailable : allAvailable.filter(t => t.level === lvl);
      const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
      if (randomItem) {
        textSelect.value = randomItem.id;
        loadSelectedPracticeText(randomItem.id);
      }
    });
  }

  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      evaluateSinglePractice();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (AppState.activePracticeTextInfo) {
        loadSelectedPracticeText(AppState.activePracticeTextInfo.id);
      }
    });
  }

  if (hintBtn) {
    hintBtn.addEventListener("click", () => {
      givePracticeHint();
    });
  }

  // Lade initial den 1. Übungstext
  if (TEXTS_DATABASE.practiceTexts.length > 0) {
    loadSelectedPracticeText(TEXTS_DATABASE.practiceTexts[0].id);
  }
}

function populatePracticeTextsDropdown(levelFilter) {
  const select = document.getElementById("practice-text-select");
  if (!select) return;

  const allTexts = [...TEXTS_DATABASE.standardExamTexts, ...TEXTS_DATABASE.beginnerExamTexts, ...TEXTS_DATABASE.practiceTexts];
  // Deduplicate by ID
  const uniqueMap = new Map();
  allTexts.forEach(t => {
    if (!uniqueMap.has(t.id)) uniqueMap.set(t.id, t);
  });
  const uniqueTexts = Array.from(uniqueMap.values());

  const filtered = levelFilter === "all" ? uniqueTexts : uniqueTexts.filter(t => t.level === levelFilter);

  select.innerHTML = filtered.map(t => `
    <option value="${t.id}">[${t.level}] ${t.title} (${t.theme})</option>
  `).join("");
}

function loadSelectedPracticeText(textId) {
  const allTexts = [...TEXTS_DATABASE.standardExamTexts, ...TEXTS_DATABASE.beginnerExamTexts, ...TEXTS_DATABASE.practiceTexts];
  const found = allTexts.find(t => t.id === textId) || allTexts[0];

  AppState.activePracticeTextInfo = found;
  AppState.activePracticeAnswers = {};
  AppState.activePracticeCTest = CTestGenerator.generate(found.rawText, { targetGaps: 20 });

  document.getElementById("practice-title").textContent = found.title;
  document.getElementById("practice-theme").textContent = `${found.level} • ${found.theme} • ${found.description}`;

  renderPracticePassage(AppState.activePracticeCTest);
}

function renderPracticePassage(ctest) {
  const container = document.getElementById("practice-passage-container");
  container.innerHTML = "";
  const formFragment = document.createDocumentFragment();

  ctest.elements.forEach(el => {
    if (el.type === "text") {
      const span = document.createElement("span");
      span.textContent = el.content;
      formFragment.appendChild(span);
    } else if (el.type === "gap") {
      const wrap = document.createElement("span");
      wrap.className = "gap-wrapper";

      const prefixSpan = document.createElement("span");
      prefixSpan.className = "gap-prefix";
      prefixSpan.textContent = el.prefix;
      wrap.appendChild(prefixSpan);

      const input = document.createElement("input");
      input.type = "text";
      input.className = "gap-input";
      input.dataset.gapId = el.gapId;
      input.dataset.length = el.length;
      input.maxLength = el.length;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.autocapitalize = "none";
      input.style.width = `${Math.max(2.2, el.length * 1.1 + 0.6)}ch`;
      input.placeholder = "•".repeat(el.length);

      attachGapInputEvents(input, (gapId, val) => {
        AppState.activePracticeAnswers[gapId] = val;
      });

      wrap.appendChild(input);
      formFragment.appendChild(wrap);
    }
  });

  container.appendChild(formFragment);

  // Verberge vorherige Auswertungskarten
  const singleEvalCard = document.getElementById("practice-single-result");
  if (singleEvalCard) singleEvalCard.classList.add("hidden");
}

function givePracticeHint() {
  if (!AppState.activePracticeCTest) return;
  const inputs = document.querySelectorAll("#practice-passage-container .gap-input");
  for (let input of inputs) {
    const gapId = parseInt(input.dataset.gapId, 10);
    const gap = AppState.activePracticeCTest.gaps.find(g => g.id === gapId);
    if (gap && (!input.value || input.value.toLowerCase() !== gap.solution.toLowerCase())) {
      const hintChar = gap.solution[0];
      input.value = hintChar;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
      showToastNotification(`💡 Подсказка для ${gap.prefix}...: начинается с "${hintChar}" (${gap.category.nameRu})`, "info");
      break;
    }
  }
}

function evaluateSinglePractice() {
  if (!AppState.activePracticeCTest || !AppState.activePracticeTextInfo) return;

  const evalResult = CTestGenerator.evaluate(AppState.activePracticeCTest, AppState.activePracticeAnswers);
  const report = AnalyticsEngine.generateReport({
    isFullExam: false,
    textId: AppState.activePracticeTextInfo.id,
    title: AppState.activePracticeTextInfo.title,
    level: AppState.activePracticeTextInfo.level,
    theme: AppState.activePracticeTextInfo.theme,
    timeSpent: 180,
    evaluation: evalResult
  });

  evalResult.results.forEach(res => {
    const input = document.querySelector(`#practice-passage-container .gap-input[data-gap-id="${res.gapId}"]`);
    if (input) {
      input.readOnly = true;
      if (res.isCorrect) {
        input.className = "gap-input gap-correct";
      } else {
        input.className = "gap-input gap-wrong";
        input.title = `Правильно: ${res.solution} (Ваш ответ: ${res.userAnswer || 'пусто'})`;
      }
    }
  });

  const singleEvalCard = document.getElementById("practice-single-result");
  if (singleEvalCard) {
    singleEvalCard.classList.remove("hidden");
    document.getElementById("practice-score-text").textContent = `${evalResult.correctCount} / ${evalResult.totalGaps} (${evalResult.percentage}%)`;
    document.getElementById("practice-cefr-badge").textContent = report.cefr.title;
  }

  AppState.lastReport = report;
  saveToHistory(report);

  if (report.percentage >= 70 && window.confetti) {
    window.confetti({ particleCount: 50, spread: 60 });
  }

  showToastNotification(`Тест завершен! Результат: ${evalResult.correctCount}/${evalResult.totalGaps} (${evalResult.percentage}%).`, "success");
}

/**
 * -----------------------------------------------------------------------------
 * 3. GENERATOR MODUS: A1 BIS C1 & EIGENER TEXT
 * -----------------------------------------------------------------------------
 */
function initGeneratorMode() {
  const synthLevelSelect = document.getElementById("synth-level-select");
  const synthTopicSelect = document.getElementById("synth-topic-select");
  const synthGenerateBtn = document.getElementById("btn-synth-generate");
  const generateBtn = document.getElementById("btn-custom-generate");
  const sampleBtn = document.getElementById("btn-custom-sample");
  const checkBtn = document.getElementById("btn-custom-check");

  // Dynamische Themen nach Niveau aktualisieren
  function updateSynthTopics(level) {
    if (!synthTopicSelect || typeof GermanTextSynthesizer === "undefined") return;
    const lvlData = GermanTextSynthesizer.levels[level] || GermanTextSynthesizer.levels.B1;
    synthTopicSelect.innerHTML = `<option value="">🎲 Любая тема (Случайно)</option>` +
      lvlData.topics.map(t => `<option value="${t.id}">${t.name}</option>`).join("");

    const infoEl = document.getElementById("synth-level-info");
    if (infoEl) {
      infoEl.textContent = `${lvlData.descriptionRu} Фокус: ${lvlData.grammarFocusRu}`;
    }
  }

  if (synthLevelSelect) {
    updateSynthTopics(synthLevelSelect.value);
    synthLevelSelect.addEventListener("change", (e) => {
      updateSynthTopics(e.target.value);
    });
  }

  // Button: Текст уровня A1-C1 сгенерировать
  if (synthGenerateBtn) {
    synthGenerateBtn.addEventListener("click", () => {
      const lvl = synthLevelSelect ? synthLevelSelect.value : "B1";
      const topic = synthTopicSelect ? synthTopicSelect.value : null;

      try {
        const synthResult = GermanTextSynthesizer.generate(lvl, topic);
        const generated = CTestGenerator.generate(synthResult.rawText, { targetGaps: 20 });

        AppState.activePracticeCTest = generated;
        AppState.activePracticeAnswers = {};
        AppState.activePracticeTextInfo = synthResult;

        document.getElementById("custom-playable-card").classList.remove("hidden");
        document.getElementById("custom-playable-title").textContent = `[${synthResult.level}] ${synthResult.title}`;
        document.getElementById("custom-playable-meta").textContent = `${synthResult.theme} • Фокус: ${synthResult.grammarFocus}`;

        renderCustomPassage(generated);
        showToastNotification(`✨ Сгенерирован текст уровня ${synthResult.level}: "${synthResult.title}"!`, "success");
      } catch (err) {
        alert("Ошибка генерации: " + err.message);
      }
    });
  }

  if (sampleBtn) {
    sampleBtn.addEventListener("click", () => {
      document.getElementById("custom-text-input").value = "Die Erforschung des Weltraums fasziniert die Menschheit seit Jahrhunderten. Immer mehr Länder und private Unternehmen investieren enorme Geldsummen in die Entwicklung moderner Raketen und Satelliten, um den Mond oder den Mars zu erreichen. Diese Missionen liefern wertvolle wissenschaftliche Erkenntnisse über die Entstehung unseres Sonnensystems und fördern gleichzeitig bahnbrechende Technologien, die auch auf der Erde genutzt werden. Kritiker hinterfragen jedoch die immensen Kosten und fordern mehr Investitionen in drängende Probleme auf unserem Heimatplaneten.";
    });
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const raw = document.getElementById("custom-text-input").value;
      const gapCount = parseInt(document.getElementById("custom-gaps-count").value, 10) || 20;

      try {
        const generated = CTestGenerator.generate(raw, { targetGaps: gapCount });
        AppState.activePracticeCTest = generated;
        AppState.activePracticeAnswers = {};
        AppState.activePracticeTextInfo = {
          id: "custom_" + Date.now(),
          title: "Пользовательский текст",
          level: "Custom",
          theme: "Individuell",
          description: "Сгенерировано пользователем",
          rawText: raw,
          grammarFocus: "Пользовательский ввод"
        };

        document.getElementById("custom-playable-card").classList.remove("hidden");
        document.getElementById("custom-playable-title").textContent = "Пользовательский C-Test";
        document.getElementById("custom-playable-meta").textContent = `${generated.actualGaps} пропусков`;

        renderCustomPassage(generated);
        showToastNotification(`Успешно создано ${generated.actualGaps} пропусков! Можете проходить тест.`, "success");
      } catch (err) {
        alert("Ошибка генерации: " + err.message);
      }
    });
  }

  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      if (!AppState.activePracticeCTest) return;
      const evalResult = CTestGenerator.evaluate(AppState.activePracticeCTest, AppState.activePracticeAnswers);
      const info = AppState.activePracticeTextInfo || { title: "C-Test", level: "B1", theme: "Allgemein" };
      const report = AnalyticsEngine.generateReport({
        isFullExam: false,
        textId: info.id || "custom",
        title: info.title,
        level: info.level,
        theme: info.theme,
        timeSpent: 120,
        evaluation: evalResult
      });

      AppState.lastReport = report;
      renderAnalyticsReport(report);
      switchTab("results");
    });
  }
}

function renderCustomPassage(ctest) {
  const container = document.getElementById("custom-passage-container");
  container.innerHTML = "";
  const formFragment = document.createDocumentFragment();

  ctest.elements.forEach(el => {
    if (el.type === "text") {
      const span = document.createElement("span");
      span.textContent = el.content;
      formFragment.appendChild(span);
    } else if (el.type === "gap") {
      const wrap = document.createElement("span");
      wrap.className = "gap-wrapper";

      const prefixSpan = document.createElement("span");
      prefixSpan.className = "gap-prefix";
      prefixSpan.textContent = el.prefix;
      wrap.appendChild(prefixSpan);

      const input = document.createElement("input");
      input.type = "text";
      input.className = "gap-input";
      input.dataset.gapId = el.gapId;
      input.dataset.length = el.length;
      input.maxLength = el.length;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.autocapitalize = "none";
      input.style.width = `${Math.max(2.2, el.length * 1.1 + 0.6)}ch`;
      input.placeholder = "•".repeat(el.length);

      attachGapInputEvents(input, (gapId, val) => {
        AppState.activePracticeAnswers[gapId] = val;
      });

      wrap.appendChild(input);
      formFragment.appendChild(wrap);
    }
  });

  container.appendChild(formFragment);
}

/**
 * -----------------------------------------------------------------------------
 * 4. ERGEBNISSE & ANALYTIK (ANALYTICS, STRENGTHS/WEAKNESSES, PDF, AI PROMPT)
 * -----------------------------------------------------------------------------
 */
function finishAndShowResults(examSummary) {
  const report = AnalyticsEngine.generateReport(examSummary);
  AppState.lastReport = report;
  saveToHistory(report);

  if (window.confetti) {
    window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  }

  renderAnalyticsReport(report);
  switchTab("results");
}

function renderAnalyticsReport(report) {
  // Scorecard
  document.getElementById("res-total-score").textContent = `${report.correctCount} / ${report.totalGaps}`;
  document.getElementById("res-percentage").textContent = `${report.percentage}%`;
  document.getElementById("res-cefr-badge").textContent = report.cefr.title;
  document.getElementById("res-cefr-desc").textContent = report.cefr.shortDesc;
  document.getElementById("res-exam-type").textContent = report.isFullExam ? "Полный экзамен (8 текстов)" : "Одиночный тест";
  document.getElementById("res-date").textContent = report.date;

  // 1. Kategorien-Fortschrittsbalken
  const catContainer = document.getElementById("res-categories-container");
  catContainer.innerHTML = report.categoryAnalysis.map(cat => `
    <div class="glass-panel-subtle p-4 rounded-xl border border-slate-700/50">
      <div class="flex justify-between items-center mb-2">
        <div>
          <span class="font-semibold text-sm text-slate-200">${cat.nameRu}</span>
          <span class="text-xs text-slate-400 block">${cat.nameDe}</span>
        </div>
        <div class="text-right">
          <span class="text-lg font-bold ${cat.percentage >= 70 ? 'text-emerald-400' : 'text-rose-400'}">${cat.percentage}%</span>
          <span class="text-xs text-slate-500 block">${cat.correct} из ${cat.total} верных</span>
        </div>
      </div>
      <div class="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all duration-500 ${
          cat.percentage >= 75 ? 'bg-emerald-500' : cat.percentage >= 55 ? 'bg-amber-500' : 'bg-rose-500'
        }" style="width: ${cat.percentage}%"></div>
      </div>
      <p class="text-xs text-slate-400 mt-2">${cat.descriptionRu}</p>
    </div>
  `).join("");

  // 2. Stärken & Schwächen (Сильные стороны & Точки роста)
  const strengthsContainer = document.getElementById("res-strengths-container");
  if (report.strengths.length > 0) {
    strengthsContainer.innerHTML = report.strengths.map(s => `
      <div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-start gap-2.5">
        <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i>
        <div>
          <strong class="font-semibold text-emerald-200">${s.nameRu} (${s.percentage}%):</strong>
          Высокая точность. Вы уверенно ориентируетесь в этой части грамматики.
        </div>
      </div>
    `).join("");
  } else {
    strengthsContainer.innerHTML = `<p class="text-sm text-slate-400">Требуется комплексная проработка базовых грамматических структур.</p>`;
  }

  const weaknessesContainer = document.getElementById("res-weaknesses-container");
  if (report.weaknesses.length > 0) {
    weaknessesContainer.innerHTML = report.weaknesses.map(w => `
      <div class="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-2.5">
        <i data-lucide="alert-triangle" class="w-5 h-5 text-rose-400 shrink-0 mt-0.5"></i>
        <div>
          <strong class="font-semibold text-rose-200">${w.nameRu} (${w.percentage}%):</strong>
          ${w.adviceRu}
        </div>
      </div>
    `).join("");
  } else {
    weaknessesContainer.innerHTML = `<p class="text-sm text-emerald-400 font-semibold">Великолепный результат! Критических слабых зон не обнаружено.</p>`;
  }

  // 3. Vorbereitungsplan für das nächste Mal
  const planContainer = document.getElementById("res-plan-container");
  const tacticalList = report.preparationPlan.tacticalAdvice.map(t => `
    <li class="flex items-start gap-2 text-sm text-slate-300">
      <i data-lucide="compass" class="w-4 h-4 text-sky-400 shrink-0 mt-1"></i>
      <div>
        <strong class="text-sky-300 font-medium">${t.title}:</strong> ${t.text}
      </div>
    </li>
  `).join("");

  const studyList = report.preparationPlan.studyTopics.map(s => `
    <div class="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-sm">
      <div class="flex justify-between items-center mb-1">
        <span class="font-semibold text-slate-200">${s.categoryName || s.topic}</span>
        <span class="text-xs px-2 py-0.5 rounded font-mono ${s.priority === 'Критическая' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}">${s.priority} приоритет</span>
      </div>
      <p class="text-slate-400 text-xs">${s.advice || s.description}</p>
      ${s.topics ? `<div class="mt-2 flex flex-wrap gap-1">${s.topics.map(tp => `<span class="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-sky-300 border border-slate-700">${tp}</span>`).join("")}</div>` : ''}
    </div>
  `).join("");

  planContainer.innerHTML = `
    <div class="space-y-4">
      <div>
        <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Тактика сдачи C-Test (Тайм-менеджмент):</h5>
        <ul class="space-y-2">${tacticalList}</ul>
      </div>
      <div>
        <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Грамматические темы для отработки:</h5>
        <div class="space-y-2">${studyList}</div>
      </div>
    </div>
  `;

  // 4. KI-Prompt für ChatGPT / Claude / Gemini
  const aiPromptText = PdfExporter.generateAiPrompt(report);
  const aiPromptBox = document.getElementById("res-ai-prompt-box");
  if (aiPromptBox) {
    aiPromptBox.value = aiPromptText;
  }

  // Event-Buttons für PDF und KI
  const copyPromptBtn = document.getElementById("btn-copy-ai-prompt");
  if (copyPromptBtn) {
    copyPromptBtn.onclick = () => {
      navigator.clipboard.writeText(aiPromptText).then(() => {
        showToastNotification("✅ Промпт скопирован в буфер обмена! Вставьте его в ChatGPT или Claude.", "success");
      });
    };
  }

  const openChatGptBtn = document.getElementById("btn-open-chatgpt");
  if (openChatGptBtn) {
    openChatGptBtn.onclick = () => {
      navigator.clipboard.writeText(aiPromptText);
      showToastNotification("Промпт скопирован! Открываем ChatGPT...", "info");
      window.open("https://chatgpt.com", "_blank");
    };
  }

  const openClaudeBtn = document.getElementById("btn-open-claude");
  if (openClaudeBtn) {
    openClaudeBtn.onclick = () => {
      navigator.clipboard.writeText(aiPromptText);
      showToastNotification("Промпт скопирован! Открываем Claude...", "info");
      window.open("https://claude.ai", "_blank");
    };
  }

  const downloadPdfBtn = document.getElementById("btn-download-pdf");
  if (downloadPdfBtn) {
    downloadPdfBtn.onclick = () => {
      showToastNotification("Формирование PDF отчета...", "info");
      PdfExporter.exportToPdf(report);
    };
  }

  // 5. Detaillierter Text-Review (Alle Fehler durchgehen)
  renderDetailedReviewUI(report);

  initLucide();
}

function renderDetailedReviewUI(report) {
  const container = document.getElementById("res-review-container");
  if (!container) return;

  container.innerHTML = report.evaluatedTexts.map((textItem, idx) => `
    <div class="glass-panel p-5 rounded-xl border border-slate-700/60 mb-4">
      <div class="flex justify-between items-center mb-3">
        <div>
          <h4 class="font-bold text-slate-200 text-base">Текст ${idx + 1}: ${textItem.title}</h4>
          <span class="text-xs text-slate-400">${textItem.level} • ${textItem.theme}</span>
        </div>
        <div class="text-right">
          <span class="text-sm font-bold ${textItem.evaluation.percentage >= 70 ? 'text-emerald-400' : 'text-rose-400'}">
            ${textItem.evaluation.correctCount} / ${textItem.evaluation.totalGaps} (${textItem.evaluation.percentage}%)
          </span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        ${textItem.evaluation.results.map(res => `
          <div class="p-2 rounded-lg flex items-center justify-between ${
            res.isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'
          }">
            <div>
              <span class="font-bold text-slate-200">${res.prefix}</span><span class="${res.isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 line-through'}">${res.userAnswer || 'Ø'}</span>
              ${!res.isCorrect ? `<span class="text-emerald-300 font-bold ml-1.5">→ ${res.solution}</span>` : ''}
              <span class="text-[10px] text-slate-400 block">${res.category.nameRu}</span>
            </div>
            <span class="text-sm">${res.isCorrect ? '✅' : '❌'}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

/**
 * -----------------------------------------------------------------------------
 * 5. HISTORIE & SPEICHERUNG (LOCAL STORAGE)
 * -----------------------------------------------------------------------------
 */
function saveToHistory(report) {
  const item = {
    id: "rep_" + Date.now(),
    date: report.date,
    isFullExam: report.isFullExam,
    percentage: report.percentage,
    correctCount: report.correctCount,
    totalGaps: report.totalGaps,
    cefrTitle: report.cefr.title
  };
  AppState.history.unshift(item);
  if (AppState.history.length > 20) AppState.history.pop();
  localStorage.setItem("ctest_history", JSON.stringify(AppState.history));
}

function initHistoryView() {
  const clearBtn = document.getElementById("btn-clear-history");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Очистить историю всех сохраненных результатов?")) {
        AppState.history = [];
        localStorage.removeItem("ctest_history");
        renderHistory();
      }
    });
  }
}

function renderHistory() {
  const list = document.getElementById("history-list-container");
  if (!list) return;

  if (AppState.history.length === 0) {
    list.innerHTML = `<div class="text-center py-12 text-slate-500">История тестов пуста. Пройдите экзамен или тренировочный тест!</div>`;
    return;
  }

  list.innerHTML = AppState.history.map(item => `
    <div class="glass-panel p-4 rounded-xl border border-slate-700/60 flex justify-between items-center">
      <div>
        <div class="font-semibold text-slate-200 text-sm">${item.isFullExam ? '🎓 Полный экзамен (8 текстов)' : '🎯 Тренировочный тест'}</div>
        <div class="text-xs text-slate-400">${item.date} • ${item.cefrTitle}</div>
      </div>
      <div class="text-right">
        <div class="text-lg font-bold ${item.percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}">${item.percentage}%</div>
        <div class="text-xs text-slate-500">${item.correctCount} / ${item.totalGaps} баллов</div>
      </div>
    </div>
  `).join("");
}

/**
 * -----------------------------------------------------------------------------
 * HILFSFUNKTIONEN: INPUT AUTO-FOCUS & TOASTS
 * -----------------------------------------------------------------------------
 */
function attachGapInputEvents(input, onValueChange) {
  input.addEventListener("focus", () => {
    AppState.focusedInput = input;
  });

  input.addEventListener("input", (e) => {
    const val = input.value;
    const max = parseInt(input.maxLength, 10);
    const gapId = parseInt(input.dataset.gapId, 10);

    input.classList.toggle("gap-filled", val.trim().length > 0);

    if (onValueChange) {
      onValueChange(gapId, val);
    }

    // Auto-Advance: Wenn Feld voll ist, springe zum nächsten
    if (val.length >= max) {
      const container = input.closest(".ctest-passage");
      if (container) {
        const inputs = Array.from(container.querySelectorAll(".gap-input"));
        const currentIndex = inputs.indexOf(input);
        if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
          inputs[currentIndex + 1].focus();
        }
      }
    }
  });

  input.addEventListener("keydown", (e) => {
    const container = input.closest(".ctest-passage");
    if (!container) return;
    const inputs = Array.from(container.querySelectorAll(".gap-input"));
    const currentIndex = inputs.indexOf(input);

    if (e.key === "Backspace" && input.value.length === 0 && currentIndex > 0) {
      e.preventDefault();
      inputs[currentIndex - 1].focus();
    } else if (e.key === "ArrowRight" && input.selectionStart === input.value.length && currentIndex < inputs.length - 1) {
      e.preventDefault();
      inputs[currentIndex + 1].focus();
    } else if (e.key === "ArrowLeft" && input.selectionStart === 0 && currentIndex > 0) {
      e.preventDefault();
      inputs[currentIndex - 1].focus();
    } else if (e.key === "Enter" && currentIndex < inputs.length - 1) {
      e.preventDefault();
      inputs[currentIndex + 1].focus();
    }
  });
}

function showToastNotification(message, type = "info") {
  const toast = document.createElement("div");
  const bg = type === "warning" ? "bg-amber-500 text-slate-950" : type === "success" ? "bg-emerald-500 text-white" : "bg-sky-600 text-white";
  toast.className = `fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-2xl z-50 text-sm font-semibold flex items-center gap-2 transition-all transform duration-300 translate-y-4 opacity-0 ${bg}`;
  toast.innerHTML = `<span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => {
      if (toast.parentNode) document.body.removeChild(toast);
    }, 300);
  }, 3500);
}
