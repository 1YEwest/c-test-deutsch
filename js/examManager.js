/**
 * C-TEST DEUTSCH - Exam Manager
 * Steuert den 8-Texte-Prüfungsmodus mit individuellem 5-Minuten-Timer pro Text.
 * Automatische Weiterschaltung bei Ablauf der Zeit.
 */

class ExamManager {
  constructor(examTexts, options = {}) {
    this.rawTexts = examTexts || [];
    this.timePerText = options.timePerText || 300; // 5 Minuten = 300 Sekunden
    this.currentIndex = 0;
    this.isExamActive = false;
    this.isPaused = false;
    this.timerInterval = null;

    // Callbacks für die Benutzeroberfläche
    this.onTick = options.onTick || null;
    this.onTextChange = options.onTextChange || null;
    this.onTimeExpired = options.onTimeExpired || null;
    this.onExamComplete = options.onExamComplete || null;

    // Initialisiere die 8 Texte und deren Zustand
    this.textsData = this.rawTexts.map((item, idx) => {
      const generated = CTestGenerator.generate(item.rawText, { targetGaps: 20 });
      return {
        id: item.id || `exam_${idx + 1}`,
        title: item.title,
        level: item.level,
        theme: item.theme,
        description: item.description,
        ctest: generated,
        userAnswers: {},
        timeSpent: 0,
        timeRemaining: this.timePerText,
        isCompleted: false
      };
    });
  }

  /**
   * Startet die Prüfung mit Text 1
   */
  startExam() {
    this.currentIndex = 0;
    this.isExamActive = true;
    this.isPaused = false;
    this.startTimer();

    if (this.onTextChange) {
      this.onTextChange(this.getCurrentTextState(), this.currentIndex);
    }
  }

  /**
   * Startet den 1-Sekunden-Intervall-Timer
   */
  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      if (this.isPaused || !this.isExamActive) return;

      const current = this.textsData[this.currentIndex];
      if (current) {
        current.timeRemaining = Math.max(0, current.timeRemaining - 1);
        current.timeSpent++;

        if (this.onTick) {
          this.onTick({
            currentIndex: this.currentIndex,
            timeRemaining: current.timeRemaining,
            timeSpent: current.timeSpent,
            totalTimePerText: this.timePerText,
            totalExamRemaining: this.getTotalTimeRemaining()
          });
        }

        // Automatische Weiterschaltung bei 0 Sekunden
        if (current.timeRemaining <= 0) {
          this.handleTextTimeout();
        }
      }
    }, 1000);
  }

  /**
   * Stoppt den Timer
   */
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /**
   * Pausiert oder setzt die Prüfung fort
   */
  togglePause() {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  /**
   * Behandelt den Zeitablauf eines Textes (nach genau 5 Minuten)
   */
  handleTextTimeout() {
    const prevIndex = this.currentIndex;
    this.textsData[prevIndex].isCompleted = true;

    if (this.currentIndex < this.textsData.length - 1) {
      // Weiterschaltung zum nächsten Text
      this.currentIndex++;
      if (this.onTimeExpired) {
        this.onTimeExpired({
          expiredTextIndex: prevIndex,
          nextTextIndex: this.currentIndex
        });
      }
      if (this.onTextChange) {
        this.onTextChange(this.getCurrentTextState(), this.currentIndex);
      }
    } else {
      // Letzter Text ist abgelaufen -> Prüfung beenden
      this.finishExam();
    }
  }

  /**
   * Wechselt manuell zu einem anderen Text (1..8)
   */
  goToText(targetIndex) {
    if (targetIndex < 0 || targetIndex >= this.textsData.length) return false;
    this.currentIndex = targetIndex;

    if (this.onTextChange) {
      this.onTextChange(this.getCurrentTextState(), this.currentIndex);
    }
    return true;
  }

  /**
   * Nächster Text
   */
  nextText() {
    if (this.currentIndex < this.textsData.length - 1) {
      this.goToText(this.currentIndex + 1);
      return true;
    }
    return false;
  }

  /**
   * Vorheriger Text
   */
  prevText() {
    if (this.currentIndex > 0) {
      this.goToText(this.currentIndex - 1);
      return true;
    }
    return false;
  }

  /**
   * Speichert eine Antwort für den aktuellen Text
   */
  setAnswer(gapId, value) {
    const current = this.textsData[this.currentIndex];
    if (current) {
      current.userAnswers[gapId] = value;
    }
  }

  /**
   * Gibt den Zustand des aktuellen Textes zurück
   */
  getCurrentTextState() {
    return this.textsData[this.currentIndex];
  }

  /**
   * Berechnet die verbleibende Gesamtzeit aller Texte
   */
  getTotalTimeRemaining() {
    return this.textsData.reduce((acc, t) => acc + t.timeRemaining, 0);
  }

  /**
   * Beendet die Prüfung und berechnet Gesamtauswertung
   */
  finishExam() {
    this.stopTimer();
    this.isExamActive = false;

    // Bewerte jeden der 8 Texte
    let grandTotalGaps = 0;
    let grandCorrect = 0;
    const evaluatedTexts = [];

    this.textsData.forEach(textState => {
      const evalResult = CTestGenerator.evaluate(textState.ctest, textState.userAnswers);
      grandTotalGaps += evalResult.totalGaps;
      grandCorrect += evalResult.correctCount;

      evaluatedTexts.push({
        id: textState.id,
        title: textState.title,
        level: textState.level,
        theme: textState.theme,
        timeSpent: textState.timeSpent,
        evaluation: evalResult
      });
    });

    const overallPercentage = grandTotalGaps > 0
      ? Math.round((grandCorrect / grandTotalGaps) * 100)
      : 0;

    const examSummary = {
      isFullExam: true,
      totalTexts: this.textsData.length,
      grandTotalGaps: grandTotalGaps,
      grandCorrect: grandCorrect,
      overallPercentage: overallPercentage,
      totalTimeSpent: this.textsData.reduce((acc, t) => acc + t.timeSpent, 0),
      evaluatedTexts: evaluatedTexts,
      timestamp: new Date().toISOString()
    };

    if (this.onExamComplete) {
      this.onExamComplete(examSummary);
    }

    return examSummary;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ExamManager };
}
