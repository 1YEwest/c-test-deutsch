/**
 * C-TEST DEUTSCH - PDF-Export & KI-Analyse-Prompt Generator
 * Generiert druckfertige PDF-Diagnoseberichte und maßgeschneiderte
 * Prompts für ChatGPT / Claude / Gemini zur detaillierten Fehleranalyse.
 */

class PdfExporter {
  /**
   * Erzeugt einen formatierten KI-Prompt für externe Sprachmodelle
   * @param {object} report - Diagnosebericht von AnalyticsEngine
   * @returns {string} Textueller Prompt
   */
  static generateAiPrompt(report) {
    const errorCount = report.allErrors.length;
    const errorListFormatted = report.allErrors.map((err, i) => {
      const userAns = err.userAnswer ? `"${err.userAnswer}"` : "(пропущено)";
      return `${i + 1}. [${err.textTitle} | Уровень ${err.textLevel}]
   - Контекст: "...${err.sentenceContext}..."
   - Заданный префикс: "${err.prefix}___" (Полное слово: "${err.fullWord}")
   - Мой ответ: ${userAns}
   - Правильный ответ: "${err.solution}"
   - Грамматическая категория: ${err.category.nameRu}`;
    }).join("\n\n");

    const weaknessesList = report.weaknesses.map(w =>
      `- ${w.nameRu}: ${w.percentage}% успешности (ошибок: ${w.errors.length})`
    ).join("\n");

    const prompt = `Ты опытный преподаватель немецкого языка DaF и эксперт по подготовке к экзаменам TestDaF, DSH и Studienkolleg Aufnahmetest.

Я только что прошел тест в формате C-Test Deutsch. Вот мои результаты:
- Общий балл: ${report.correctCount} из ${report.totalGaps} (${report.percentage}%)
- Ориентировочный уровень: ${report.cefr.title}
- Дата тестирования: ${report.date}

Мои слабые зоны:
${weaknessesList || "Серьезных слабых зон не выявлено (все категории выше 70%)."}

Вот список всех моих ${errorCount} ошибок с контекстом предложений и правильными ответами:

${errorListFormatted}

ПОЖАЛУЙСТА, СДЕЛАЙ ДЛЯ МЕНЯ ПОДРОБНЫЙ РАЗБОР:
1. ДЕТАЛЬНЫЙ АНАЛИЗ ОШИБОК: Разбери каждую мою ошибку. Объясни простыми словами грамматическое правило (падеж, род, окончание прилагательного, тип союза, спряжение), из-за которого требовалось именно это слово/окончание.
2. ГРАММАТИЧЕСКИЕ ТРИГГЕРЫ: Укажи, какие слова в предложении являлись маркерами-подсказками (например, предлог, требующий Dativ, или глагол в конце придаточного предложения).
3. 5 ПРАКТИЧЕСКИХ МИКРО-УПРАЖНЕНИЙ: Составь 5 коротких упражнений именно на мои самые частые ошибки (с ключами ответов в конце), чтобы я мог сразу закрепить материал.
4. ПРАКТИЧЕСКИЕ ЛАЙФХАКИ: Дай мне 3 мнемоники или правила-ориентира для быстрого решения C-Test за 5 минут.`;

    return prompt;
  }

  /**
   * Lädt den fertigen PDF-Bericht herunter
   * @param {object} report - Diagnosebericht von AnalyticsEngine
   */
  static exportToPdf(report) {
    const element = document.createElement("div");
    element.className = "pdf-report-container p-8 bg-white text-slate-900 font-sans";
    element.style.width = "800px";
    element.style.padding = "30px";
    element.style.backgroundColor = "#ffffff";
    element.style.color = "#0f172a";

    const aiPromptText = this.generateAiPrompt(report);

    element.innerHTML = `
      <div style="border-bottom: 3px solid #0284c7; padding-bottom: 16px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">C-TEST DEUTSCH – DIAGNOSEBERICHT</h1>
            <p style="font-size: 13px; color: #64748b; margin: 0;">Официальный диагностический отчет и профиль языковых компетенций</p>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; padding: 4px 12px; background: #e0f2fe; color: #0369a1; font-weight: 700; border-radius: 9999px; font-size: 12px;">${report.isFullExam ? "8-ТЕКСТОВЫЙ ЭКЗАМЕН" : "ТРЕНИРОВОЧНЫЙ ТЕСТ"}</span>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">${report.date}</div>
          </div>
        </div>
      </div>

      <!-- Scorecard -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Результат</div>
          <div style="font-size: 22px; font-weight: 800; color: #0284c7; margin-top: 4px;">${report.correctCount} / ${report.totalGaps}</div>
          <div style="font-size: 11px; color: #94a3b8;">верных пропусков</div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Процент</div>
          <div style="font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 4px;">${report.percentage}%</div>
          <div style="font-size: 11px; color: #94a3b8;">точность</div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; text-align: center; grid-column: span 2;">
          <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Уровень GER / CEFR</div>
          <div style="font-size: 18px; font-weight: 800; color: #16a34a; margin-top: 4px;">${report.cefr.title}</div>
          <div style="font-size: 10px; color: #64748b;">${report.cefr.shortDesc}</div>
        </div>
      </div>

      <!-- Категориальный анализ -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 15px; font-weight: 700; color: #1e293b; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">1. Диагностика по грамматическим категориям</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; color: #475569;">
              <th style="padding: 8px; border: 1px solid #e2e8f0;">Грамматическая категория</th>
              <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">Успешность</th>
              <th style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">Баллы</th>
              <th style="padding: 8px; border: 1px solid #e2e8f0;">Статус</th>
            </tr>
          </thead>
          <tbody>
            ${report.categoryAnalysis.map(cat => `
              <tr>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: 600;">${cat.nameRu} <span style="font-size: 10px; color: #64748b;">(${cat.nameDe})</span></td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; color: ${cat.percentage >= 70 ? '#16a34a' : '#dc2626'};">${cat.percentage}%</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${cat.correct} / ${cat.total}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-size: 11px;">${cat.percentage >= 70 ? '✅ Сильная сторона' : '⚠️ Требует тренировки'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Сильные и слабые стороны -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px; border-radius: 8px;">
          <h4 style="font-size: 13px; font-weight: 700; color: #166534; margin: 0 0 8px 0;">💪 Сильные стороны:</h4>
          ${report.strengths.length > 0 ? `
            <ul style="margin: 0; padding-left: 18px; font-size: 11px; color: #15803d; line-height: 1.5;">
              ${report.strengths.map(s => `<li><strong>${s.nameRu}</strong> (${s.percentage}%): уверенное владение.</li>`).join("")}
            </ul>
          ` : '<p style="margin: 0; font-size: 11px; color: #15803d;">Рекомендуется комплексное повторение грамматической базы.</p>'}
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 14px; border-radius: 8px;">
          <h4 style="font-size: 13px; font-weight: 700; color: #991b1b; margin: 0 0 8px 0;">🎯 Точки роста (Слабые места):</h4>
          ${report.weaknesses.length > 0 ? `
            <ul style="margin: 0; padding-left: 18px; font-size: 11px; color: #b91c1c; line-height: 1.5;">
              ${report.weaknesses.map(w => `<li><strong>${w.nameRu}</strong> (${w.percentage}%): ${w.adviceRu}</li>`).join("")}
            </ul>
          ` : '<p style="margin: 0; font-size: 11px; color: #166534;">Отличная работа! Критических слабостей не выявлено.</p>'}
        </div>
      </div>

      <!-- Таблица ошибок -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 15px; font-weight: 700; color: #1e293b; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">2. Список неверных ответов для проработки (${report.allErrors.length})</h3>
        ${report.allErrors.length === 0 ? '<p style="font-size: 12px; color: #16a34a; font-weight: 600;">Поздравляем! 100% правильных ответов. Ни одной ошибки!</p>' : `
          <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
            <thead>
              <tr style="background: #f8fafc; text-align: left; color: #475569;">
                <th style="padding: 6px 8px; border: 1px solid #e2e8f0;">Текст</th>
                <th style="padding: 6px 8px; border: 1px solid #e2e8f0;">Начало</th>
                <th style="padding: 6px 8px; border: 1px solid #e2e8f0;">Ваш ответ</th>
                <th style="padding: 6px 8px; border: 1px solid #e2e8f0;">Правильно</th>
                <th style="padding: 6px 8px; border: 1px solid #e2e8f0;">Категория</th>
              </tr>
            </thead>
            <tbody>
              ${report.allErrors.slice(0, 30).map(err => `
                <tr>
                  <td style="padding: 6px 8px; border: 1px solid #e2e8f0; color: #64748b;">${err.textTitle}</td>
                  <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">${err.prefix}___</td>
                  <td style="padding: 6px 8px; border: 1px solid #e2e8f0; color: #dc2626; font-weight: 600;">${err.userAnswer ? err.userAnswer : '<span style="color: #94a3b8; font-style: italic;">пусто</span>'}</td>
                  <td style="padding: 6px 8px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: 700;">${err.solution} <span style="font-size: 9px; color: #64748b;">(${err.fullWord})</span></td>
                  <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-size: 10px;">${err.category.nameRu}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          ${report.allErrors.length > 30 ? `<p style="font-size: 10px; color: #64748b; margin-top: 6px;">Показаны первые 30 из ${report.allErrors.length} ошибок.</p>` : ''}
        `}
      </div>

      <!-- Блок промпта для ИИ -->
      <div style="background: #f8fafc; border: 1px dashed #94a3b8; padding: 14px; border-radius: 8px; margin-top: 24px; font-family: monospace; font-size: 10px; color: #334155; line-height: 1.4;">
        <div style="font-weight: 700; color: #0284c7; margin-bottom: 6px; font-family: sans-serif; font-size: 11px;">🤖 ГОТОВЫЙ ПРОМПТ ДЛЯ ИИ-АНАЛИЗА (ChatGPT / Claude / Gemini):</div>
        <div style="white-space: pre-wrap; max-height: 250px; overflow: hidden;">${aiPromptText.slice(0, 600)}... [Полный текст промпта можно скопировать в 1 клик на сайте]</div>
      </div>
    `;

    document.body.appendChild(element);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `C-Test-Report-${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save().then(() => {
        document.body.removeChild(element);
      }).catch(err => {
        console.error("PDF generation failed:", err);
        document.body.removeChild(element);
        window.print();
      });
    } else {
      document.body.removeChild(element);
      window.print();
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PdfExporter };
}
