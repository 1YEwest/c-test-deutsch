/**
 * C-TEST DEUTSCH - Generator Engine
 * Implementiert die offizielle C-Test-Logik (Klein-Braley & Raatz Standard, OnSET / Studienkolleg).
 *
 * Regeln:
 * 1. Der 1. Satz bleibt vollständig intakt (Kontexteinführung).
 * 2. Ab dem 2. Satz wird jedes 2. Wort in der zweiten Hälfte gelöscht.
 * 3. Bei ungerader Buchstabenanzahl wird die größere Hälfte gelöscht (z.B. 5 Buchstaben: 2 gegeben, 3 Lücke).
 * 4. Einsilbige 1-Buchstaben-Wörter oder Ziffern werden übersprungen.
 * 5. Nach Erreichen der Zielanzahl (Standard: 20 Lücken) bleibt der Rest des Textes intakt.
 */

class CTestGenerator {
  /**
   * Generiert ein spielbares C-Test-Objekt aus einem Rohtext
   * @param {string} rawText - Vollständiger deutscher Text
   * @param {object} options - Einstellungen (targetGaps: 20, strictCase: false)
   * @returns {object} C-Test Modell mit Token, Lücken und Metadaten
   */
  static generate(rawText, options = {}) {
    const targetGaps = options.targetGaps || 20;

    if (!rawText || typeof rawText !== "string") {
      throw new Error("Ungültiger Text für C-Test-Generierung.");
    }

    const trimmed = rawText.trim();
    // Aufteilung in Sätze: Suche nach Punkt, Ausrufezeichen oder Fragezeichen gefolgt von Leerzeichen
    const sentenceMatches = trimmed.match(/[^.!?]+[.!?]+(\s+|$)/g) || [trimmed];

    if (sentenceMatches.length < 2) {
      // Falls keine eindeutigen Satzenden gefunden wurden, nach erstem Punkt trennen
      const firstDot = trimmed.indexOf(".");
      if (firstDot === -1 || firstDot === trimmed.length - 1) {
        throw new Error("Der Text muss mindestens 2 Sätze enthalten (der erste Satz bleibt unberührt).");
      }
    }

    const firstSentence = sentenceMatches[0].trim();
    const restText = sentenceMatches.slice(1).join("").trim();

    // Zerlege den Resttext in Wörter, Interpunktion und Leerzeichen
    // Regex für deutsche Wörter inklusive Umlauten und Eszett
    const tokens = restText.match(/[\wäöüÄÖÜß]+|[^\w\s]+|\s+/g) || [];

    const gaps = [];
    const elements = [];
    let gapCount = 0;
    let wordCounter = 0;

    // Erster Satz als reines Text-Element
    elements.push({
      type: "text",
      content: firstSentence + " "
    });

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const isWord = /^[\wäöüÄÖÜß]+$/.test(token) && !/^\d+$/.test(token);

      if (isWord) {
        wordCounter++;
        // Jedes 2. Wort wird zur Lücke, bis targetGaps erreicht ist
        const shouldBeGap = wordCounter % 2 === 0 && gapCount < targetGaps && token.length >= 2;

        if (shouldBeGap) {
          gapCount++;
          const len = token.length;
          // Standard: prefixLen = Math.floor(len / 2) -> bei ungerader Länge wird mehr gelöscht
          const prefixLen = Math.floor(len / 2);
          const prefix = token.slice(0, prefixLen);
          const solution = token.slice(prefixLen);

          // Bestimme Grammatik-Kategorie
          const category = typeof GrammarClassifier !== "undefined"
            ? GrammarClassifier.classify(token, prefix, solution)
            : { id: "general", nameRu: "Общая лексика", nameDe: "Allgemein" };

          const gapObj = {
            id: gapCount,
            index: gaps.length,
            fullWord: token,
            prefix: prefix,
            solution: solution,
            length: solution.length,
            category: category,
            // Kontext für spätere Analyse
            sentenceContext: this.extractSentenceContext(tokens, i)
          };

          gaps.push(gapObj);
          elements.push({
            type: "gap",
            gapId: gapCount,
            prefix: prefix,
            length: solution.length,
            fullWord: token,
            solution: solution,
            category: category
          });
        } else {
          elements.push({
            type: "text",
            content: token
          });
        }
      } else {
        elements.push({
          type: "text",
          content: token
        });
      }
    }

    return {
      rawText: trimmed,
      targetGaps: targetGaps,
      actualGaps: gapCount,
      elements: elements,
      gaps: gaps,
      firstSentence: firstSentence
    };
  }

  /**
   * Hilfsfunktion zum Extrahieren des Satzkontextes um eine Lücke
   */
  static extractSentenceContext(tokens, tokenIndex) {
    const start = Math.max(0, tokenIndex - 6);
    const end = Math.min(tokens.length, tokenIndex + 7);
    return tokens.slice(start, end).join("").trim();
  }

  /**
   * Bewertet die Antworten des Nutzers für einen C-Test
   * @param {object} ctest - Das generierte C-Test Objekt
   * @param {object} userAnswers - Map { [gapId]: "userString" }
   * @param {boolean} strictCase - Ob Groß-/Kleinschreibung beachtet werden soll
   * @returns {object} Auswertungsergebnis
   */
  static evaluate(ctest, userAnswers = {}, strictCase = false) {
    let correctCount = 0;
    const results = [];
    const categoryStats = {};

    ctest.gaps.forEach(gap => {
      const rawUserAns = (userAnswers[gap.id] || "").trim();
      const expectedAns = gap.solution.trim();

      const isCorrect = strictCase
        ? rawUserAns === expectedAns
        : rawUserAns.toLowerCase() === expectedAns.toLowerCase();

      if (isCorrect) correctCount++;

      const catId = gap.category.id;
      if (!categoryStats[catId]) {
        categoryStats[catId] = {
          category: gap.category,
          total: 0,
          correct: 0,
          errors: []
        };
      }
      categoryStats[catId].total++;

      const gapResult = {
        gapId: gap.id,
        fullWord: gap.fullWord,
        prefix: gap.prefix,
        solution: expectedAns,
        userAnswer: rawUserAns,
        isCorrect: isCorrect,
        category: gap.category,
        sentenceContext: gap.sentenceContext
      };

      if (isCorrect) {
        categoryStats[catId].correct++;
      } else {
        categoryStats[catId].errors.push(gapResult);
      }

      results.push(gapResult);
    });

    const total = ctest.gaps.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      totalGaps: total,
      correctCount: correctCount,
      percentage: percentage,
      results: results,
      categoryStats: categoryStats
    };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CTestGenerator };
}
