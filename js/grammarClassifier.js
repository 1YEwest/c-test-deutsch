/**
 * C-TEST DEUTSCH - Grammatik-Klassifizierer & Wissensanalyse
 * Analysiert Lückenwörter morphologisch und syntaktisch,
 * um präzise Schwachstellen und Stärken zu ermitteln.
 */

const GRAMMAR_CATEGORIES = {
  NOUNS: {
    id: "nouns",
    nameDe: "Substantive & Wortbildung",
    nameRu: "Существительные и словообразование",
    descriptionRu: "Словарный запас существительных, сложные слова (Komposita) и суффиксы (-heit, -keit, -ung, -schaft, -tät).",
    adviceRu: "Обратите внимание на род существительных и словообразовательные суффиксы. В C-Test немецкие композиты часто делятся ровно пополам (например, Putz-pläne, Fachkräfte-lücke).",
    topics: ["Komposita", "Nomen-Suffixe (-ung, -heit, -keit, -schaft, -tion)", "Pluralformen"]
  },
  VERBS: {
    id: "verbs",
    nameDe: "Verben & Konjugation",
    nameRu: "Глаголы и спряжение",
    descriptionRu: "Личные окончания глаголов, формы Präteritum/Partizip II, отделяемые приставки и модальные глаголы.",
    adviceRu: "Определяйте подлежащее в предложении, чтобы правильно выбрать окончание глагола (-t, -en, -te). Обращайте внимание на порядок слов в придаточных предложениях (глагол в конце!).",
    topics: ["Konjugation im Präsens & Präteritum", "Partizip II", "Trennbare Verben", "Modalverben"]
  },
  ADJECTIVES: {
    id: "adjectives",
    nameDe: "Adjektivdeklination & Adverbien",
    nameRu: "Склонение прилагательных и наречия",
    descriptionRu: "Окончания прилагательных (-e, -en, -er, -es, -em), степени сравнения (-er, -ste) и качественные наречия.",
    adviceRu: "Это классическая ловушка C-Test! Всегда смотрите на предшествующий артикль и падеж: определенный артикль в Dativ/Akkusativ требует окончания -en (den neuen... / mit den großen...). Повторите таблицу слабой и сильной деклинации.",
    topics: ["Schwache / Starke Adjektivdeklination", "Komparativ & Superlativ (-er, -ste)", "Partizipien als Adjektive"]
  },
  PRONOUNS_ARTICLES: {
    id: "pronouns_articles",
    nameDe: "Artikel & Pronomen (Kasus)",
    nameRu: "Артикли, местоимения и падежи",
    descriptionRu: "Определенные/неопределенные артикли, притяжательные (sein-, ihr-) и указательные местоимения, падежи (Dativ/Akkusativ/Genitiv).",
    adviceRu: "Внимательно анализируйте предлоги и управление глаголов. Короткие слова вроде 'd[em]', 'd[en]', 'z[ur]', 'sei[ne]' дают легкие баллы, если вы уверенно владеете падежами (Kasus).",
    topics: ["Kasus (Dativ vs. Akkusativ vs. Genitiv)", "Possessivpronomen (sein, ihr, mein)", "Relativpronomen (der, die, das, welche)"]
  },
  PREPOSITIONS_CONJUNCTIONS: {
    id: "prepositions_conjunctions",
    nameDe: "Präpositionen & Konjunktionen",
    nameRu: "Предлоги, союзы и синтаксис",
    descriptionRu: "Союзы (dass, weil, obwohl, sondern), предлоги (durch, für, gegen, ohne, um, wegen) и структура сложных предложений.",
    adviceRu: "Обращайте внимание на парные союзы (nicht nur ... sondern auch, sowohl ... als auch) и подчинительные союзы (obwohl, während, damit). Они восстанавливаются исключительно из логики контекста.",
    topics: ["Konnektoren (weil, dass, obwohl, sondern)", "Wechselpräpositionen", "Feste Nomen-Verb-Verbindungen mit Präpositionen"]
  }
};

const GrammarClassifier = {
  articlesAndPronouns: new Set([
    "der", "die", "das", "des", "dem", "den",
    "ein", "eine", "einer", "einem", "einen", "eines",
    "er", "sie", "es", "wir", "ihr", "mich", "dich", "sich", "uns", "euch", "ihm", "ihnen",
    "sein", "seine", "seinem", "seinen", "seiner", "seines",
    "ihr", "ihre", "ihrem", "ihren", "ihrer", "ihres",
    "mein", "meine", "meinem", "meinen", "meiner",
    "dein", "deine", "deinem", "deinen", "deiner",
    "unser", "unsere", "unserem", "unseren", "unserer",
    "dieser", "diese", "dieses", "diesem", "diesen",
    "jeder", "jede", "jedes", "jedem", "jeden",
    "welcher", "welche", "welches", "welchem", "welchen",
    "man", "jemand", "niemand", "alle", "allem", "allen", "aller",
    "manche", "einige", "wer", "was",
    "zur", "zum", "am", "im", "ins", "ans", "vom", "beim"
  ]),

  prepositionsAndConjunctions: new Set([
    "in", "an", "auf", "aus", "bei", "mit", "nach", "von", "zu", "für", "durch", "gegen", "ohne",
    "um", "unter", "über", "vor", "hinter", "neben", "zwischen", "wegen", "während", "trotz", "statt",
    "mittels", "gemäß", "laut", "zufolge", "dank",
    "und", "oder", "aber", "denn", "sondern", "weil", "dass", "da", "wenn", "als", "ob", "obwohl",
    "damit", "sodass", "nachdem", "bevor", "solange", "weshalb", "weswegen", "deshalb", "trotzdem",
    "jedoch", "dennoch", "außerdem", "zudem", "daher", "somit", "entweder", "weder", "sowohl",
    "stattdessen", "inzwischen", "bislang", "bisher"
  ]),

  /**
   * Bestimmt die grammatische Kategorie eines deutschen Wortes
   * @param {string} fullWord - Das vollständige Wort (z.B. "Gesundheit")
   * @param {string} prefix - Der gegebene Anfang (z.B. "Gesun")
   * @param {string} suffix - Die gesuchte Ergänzung (z.B. "dheit")
   * @returns {object} Kategorie-Objekt
   */
  classify(fullWord, prefix, suffix) {
    if (!fullWord) return GRAMMAR_CATEGORIES.NOUNS;
    const clean = fullWord.trim().toLowerCase();

    // 1. Artikel & Pronomen
    if (this.articlesAndPronouns.has(clean)) {
      return GRAMMAR_CATEGORIES.PRONOUNS_ARTICLES;
    }

    // 2. Präpositionen & Konjunktionen
    if (this.prepositionsAndConjunctions.has(clean)) {
      return GRAMMAR_CATEGORIES.PREPOSITIONS_CONJUNCTIONS;
    }

    // 3. Substantive (Großgeschrieben)
    if (/^[A-ZÄÖÜ]/.test(fullWord)) {
      return GRAMMAR_CATEGORIES.NOUNS;
    }

    // 4. Adjektive / Adverbien
    const adjSuffixes = ["lich", "ig", "isch", "bar", "sam", "voll", "los", "haft", "ell", "iv", "al"];
    const hasAdjSuffix = adjSuffixes.some(s => clean.includes(s));
    const compEndings = ["ere", "eren", "erer", "eres", "ste", "sten", "stem", "ster"];
    const isComparative = compEndings.includes(suffix.toLowerCase());

    if (hasAdjSuffix || isComparative) {
      return GRAMMAR_CATEGORIES.ADJECTIVES;
    }

    // 5. Verben
    const verbEndings = ["en", "te", "ten", "tet", "test", "st", "et", "t", "e"];
    const isVerbCandidate = verbEndings.some(e => clean.endsWith(e)) && !clean.endsWith("heit") && !clean.endsWith("keit") && !clean.endsWith("ung");

    // Falls Suffix typische Adjektivendung ist (z.B. "große" -> "e", "alten" -> "en")
    if (clean.length <= 6 && ["es", "em", "er"].includes(suffix.toLowerCase())) {
      return GRAMMAR_CATEGORIES.ADJECTIVES;
    }

    if (isVerbCandidate) {
      return GRAMMAR_CATEGORIES.VERBS;
    }

    // Standardfall
    return GRAMMAR_CATEGORIES.ADJECTIVES;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GRAMMAR_CATEGORIES, GrammarClassifier };
}
