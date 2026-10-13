/**
 * C-TEST DEUTSCH - Analytics & Knowledge Evaluation Engine
 * Berechnet detaillierte Stärken- und Schwächenanalyse, CEFR-Prognose
 * und einen individuellen Vorbereitungsplan für das nächste Mal.
 */

class AnalyticsEngine {
  /**
   * Erstellt einen vollständigen Diagnosebericht
   * @param {object} examOrTestResult - Entweder Einzelauswertung oder Gesamtexam-Ergebnis
   * @returns {object} Detaillierter Analysebericht
   */
  static generateReport(examOrTestResult) {
    const isFullExam = Boolean(examOrTestResult.isFullExam);
    const evaluatedTexts = isFullExam
      ? examOrTestResult.evaluatedTexts
      : [{
          id: examOrTestResult.textId || "single_test",
          title: examOrTestResult.title || "Übungstext",
          level: examOrTestResult.level || "B2",
          theme: examOrTestResult.theme || "Allgemein",
          timeSpent: examOrTestResult.timeSpent || 0,
          evaluation: examOrTestResult.evaluation || examOrTestResult
        }];

    // Aggregiere Statistiken über alle Lücken
    let grandTotal = 0;
    let grandCorrect = 0;
    const categoryTotals = {};
    const allErrors = [];

    evaluatedTexts.forEach(textItem => {
      const evalData = textItem.evaluation;
      grandTotal += evalData.totalGaps;
      grandCorrect += evalData.correctCount;

      evalData.results.forEach(res => {
        const catId = res.category.id;
        if (!categoryTotals[catId]) {
          categoryTotals[catId] = {
            category: res.category,
            total: 0,
            correct: 0,
            errors: []
          };
        }
        categoryTotals[catId].total++;
        if (res.isCorrect) {
          categoryTotals[catId].correct++;
        } else {
          categoryTotals[catId].errors.push({
            ...res,
            textTitle: textItem.title,
            textLevel: textItem.level
          });
          allErrors.push({
            ...res,
            textTitle: textItem.title,
            textLevel: textItem.level
          });
        }
      });
    });

    const percentage = grandTotal > 0 ? Math.round((grandCorrect / grandTotal) * 100) : 0;
    const cefr = this.determineCEFR(percentage);

    // Berechne Prozentwerte je Kategorie
    const categoryAnalysis = Object.keys(categoryTotals).map(catKey => {
      const item = categoryTotals[catKey];
      const catPerc = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
      return {
        id: catKey,
        nameDe: item.category.nameDe,
        nameRu: item.category.nameRu,
        descriptionRu: item.category.descriptionRu,
        adviceRu: item.category.adviceRu,
        topics: item.category.topics,
        total: item.total,
        correct: item.correct,
        percentage: catPerc,
        status: catPerc >= 80 ? "strong" : catPerc >= 60 ? "medium" : "weak",
        errors: item.errors
      };
    });

    // Bestimme Stärken und Schwächen
    const strengths = categoryAnalysis.filter(c => c.percentage >= 70);
    const weaknesses = categoryAnalysis.filter(c => c.percentage < 70);

    // Erstelle personalisierten Vorbereitungsplan
    const prepPlan = this.generatePreparationPlan(weaknesses, strengths, cefr, percentage);

    return {
      isFullExam: isFullExam,
      date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      totalGaps: grandTotal,
      correctCount: grandCorrect,
      wrongCount: grandTotal - grandCorrect,
      percentage: percentage,
      cefr: cefr,
      categoryAnalysis: categoryAnalysis,
      strengths: strengths,
      weaknesses: weaknesses,
      preparationPlan: prepPlan,
      allErrors: allErrors,
      evaluatedTexts: evaluatedTexts
    };
  }

  /**
   * Ermittelt das GER/CEFR Sprachniveau anhand der Trefferquote
   */
  static determineCEFR(percentage) {
    if (percentage >= 95) {
      return {
        level: "C2",
        title: "C2 – Exzellentes Niveau (DSH-3 / TestDaF TDN 5)",
        shortDesc: "Практически безошибочное владение языком на уровне образованного носителя.",
        color: "#10b981",
        badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      };
    } else if (percentage >= 85) {
      return {
        level: "C1",
        title: "C1 – Продвинутый уровень (TestDaF TDN 4 / DSH-2)",
        shortDesc: "Уверенная готовность к учебе в немецком университете. Отличное понимание контекста.",
        color: "#3b82f6",
        badgeBg: "bg-blue-500/20 text-blue-400 border-blue-500/30"
      };
    } else if (percentage >= 70) {
      return {
        level: "B2",
        title: "B2 – Средне-продвинутый (Studienkolleg / TestDaF TDN 3)",
        shortDesc: "Хорошая база для поступления в Штудиенколлег. Требуется отточить падежные окончания.",
        color: "#8b5cf6",
        badgeBg: "bg-purple-500/20 text-purple-400 border-purple-500/30"
      };
    } else if (percentage >= 50) {
      return {
        level: "B1",
        title: "B1 – Пороговый уровень (Mittelstufe 1)",
        shortDesc: "Базовые структуры усвоены, но не хватает академического словарного запаса и падежной точности.",
        color: "#f59e0b",
        badgeBg: "bg-amber-500/20 text-amber-400 border-amber-500/30"
      };
    } else {
      return {
        level: "A2/B1-",
        title: "A2/B1- – Базовый уровень (Grundstufe)",
        shortDesc: "Рекомендуется системное повторение грамматики и отработка базовых предлогов и артиклей.",
        color: "#ef4444",
        badgeBg: "bg-rose-500/20 text-rose-400 border-rose-500/30"
      };
    }
  }

  /**
   * Generiert einen maßgeschneiderten Lernplan für das nächste Mal
   */
  static generatePreparationPlan(weaknesses, strengths, cefr, overallPercentage) {
    const studyTopics = [];
    const tacticalAdvice = [];

    // Taktische Ratschläge für C-Test
    tacticalAdvice.push({
      icon: "eye",
      title: "Стратегия 'Двух проходов' (Zwei-Durchgänge-Methode)",
      text: "В первые 1.5–2 минуты заполняйте только те слова, в которых уверены на 100% (короткие артикли, союзы, очевидные глаголы). На втором проходе используйте оставшееся время на сложные существительные и окончания."
    });

    tacticalAdvice.push({
      icon: "hash",
      title: "Точный подсчет букв (Buchstaben-Zählung)",
      text: "Количество точек/символов в пропуске строго фиксировано! Всегда сверяйте длину вашего предположения с размером пропуска. Если слово длиннее или короче — это гарантированная ошибка."
    });

    tacticalAdvice.push({
      icon: "book-open",
      title: "Чтение первого предложения целиком",
      text: "Первое предложение всегда нетронуто и задает тему (Kontextanker). Не начинайте вводить ответы, пока не прочитаете первое предложение и не поймете главную мысль текста."
    });

    // Grammatische Empfehlungen basierend auf Schwachstellen
    if (weaknesses.length === 0) {
      studyTopics.push({
        topic: "Поддержание уровня C1/C2 и словарный запас Fachsprache",
        priority: "Высокая",
        description: "Ваш грамматический фундамент безупречен! Для закрепления максимума читайте статьи на Spiegel, Die Zeit и Spektrum der Wissenschaft, обращая внимание на редкие научные идиомы."
      });
    } else {
      weaknesses.forEach(w => {
        studyTopics.push({
          categoryName: w.nameRu,
          percentage: w.percentage,
          priority: w.percentage < 50 ? "Критическая" : "Высокая",
          advice: w.adviceRu,
          topics: w.topics
        });
      });
    }

    return {
      tacticalAdvice: tacticalAdvice,
      studyTopics: studyTopics
    };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { AnalyticsEngine };
}
