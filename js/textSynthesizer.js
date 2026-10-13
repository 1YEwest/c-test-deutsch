/**
 * C-TEST DEUTSCH - German Text Synthesizer & Generator (A1 bis C1)
 * Generiert dynamische, grammatikalisch korrekte deutsche Texte für jedes GER-Niveau
 * mit exakt 20 C-Test-Lücken.
 */

const GermanTextSynthesizer = {
  levels: {
    A1: {
      name: "A1 (Anfänger / Grundstufe 1)",
      descriptionRu: "Простая повседневная лексика, настоящее время (Präsens), базовые предложения.",
      grammarFocusRu: "Спряжение слабых глаголов, артикли ein/der, базовые существительные.",
      topics: [
        { id: "alltag", name: "Tagesablauf & Alltag (Распорядок дня)" },
        { id: "familie", name: "Familie & Freunde (Семья и друзья)" },
        { id: "einkaufen", name: "Einkaufen & Essen (Покупки и еда)" },
        { id: "wohnung", name: "Wohnung & Zimmer (Мой дом)" }
      ]
    },
    A2: {
      name: "A2 (Grundstufe 2)",
      descriptionRu: "Прошедшее время (Perfekt), модальные глаголы, предлоги с Dativ/Akkusativ.",
      grammarFocusRu: "Perfekt mit haben/sein, Modalverben, Wechselpräpositionen.",
      topics: [
        { id: "urlaub", name: "Urlaub & Reisen (Отпуск и поездки)" },
        { id: "gesundheit", name: "Gesundheit & Arzt (Здоровье и визит к врачу)" },
        { id: "kochen", name: "Kochen & Hobbys (Кулинария и хобби)" },
        { id: "stadt_land", name: "Stadt vs. Land (Жизнь в городе и деревне)" }
      ]
    },
    B1: {
      name: "B1 (Mittelstufe 1 - Zertifikat Deutsch)",
      descriptionRu: "Придаточные предложения (weil, dass, wenn), склонение прилагательных, пассив.",
      grammarFocusRu: "Adjektivdeklination, Relativsätze, Infinitiv mit zu, Passiv.",
      topics: [
        { id: "mobilitaet", name: "Mobilität & Umwelt (Транспорт и экология)" },
        { id: "ernaehrung", name: "Ernährung & Lifestyle (Питание и здоровый образ жизни)" },
        { id: "medien", name: "Digitale Medien & Kommunikation (Цифровые медиа)" },
        { id: "beruf", name: "Beruf & Praktikum (Работа и карьера)" }
      ]
    },
    B2: {
      name: "B2 (Mittelstufe 2 - Studienkolleg / Beruf)",
      descriptionRu: "Академическая лексика, сложные союзы (obwohl, während), Nomen-Verb-Verbindungen.",
      grammarFocusRu: "Konjunktiv II, Passiv mit Modalverben, Partizipialkonstruktionen.",
      topics: [
        { id: "technik", name: "Künstliche Intelligenz & Technik (ИИ и технологии)" },
        { id: "studium", name: "Studieren in Deutschland & WG (Университет и жизнь в WG)" },
        { id: "energie", name: "Energiewende & Klima (Энергетика и экология)" },
        { id: "arbeitswelt", name: "Moderne Arbeitswelt & Homeoffice (Работа и гибкий график)" }
      ]
    },
    C1: {
      name: "C1 (Oberstufe - TestDaF / DSH / Uni)",
      descriptionRu: "Научный и академический немецкий язык, номинальный стиль (Nominalstil), абстрактные понятия.",
      grammarFocusRu: "Nominalstil, Funktionsverbgefüge, komplexe Satzgefüge.",
      topics: [
        { id: "neurologie", name: "Kognition & Mehrsprachigkeit (Когнитивные науки и мозг)" },
        { id: "demografie", name: "Demografischer Wandel (Демография и экономика)" },
        { id: "klimaforschung", name: "Ökologie & Gletscherforschung (Климатические исследования)" },
        { id: "quanten", name: "Quantenphysik & Datensicherheit (Квантовые технологии)" }
      ]
    }
  },

  // Generator-Datenbank für dynamische Texte
  templates: {
    A1: {
      alltag: [
        {
          title: "Mein Tag in Hamburg",
          theme: "Alltag & Zeit",
          text: "Mein Name ist Thomas und ich wohne seit zwei Jahren in Hamburg. Jeden Tag stehe ich früh um sieben Uhr auf und trinke eine Tasse Tee in der Küche. Danach esse ich frisches Brot mit Butter und Käse zum Frühstück. Um acht Uhr fahre ich mit dem Bus zur Arbeit im Zentrum der Stadt. Am Abend koche ich gern zusammen mit meiner Freundin und wir hören schöne Musik."
        },
        {
          title: "Ein sonniger Sonntag in Berlin",
          theme: "Freizeit & Alltag",
          text: "Am Sonntag schläft Familie Becker immer bis neun Uhr morgens im gemütlichen Bett. Danach deckt die Mutter den großen Tisch im Esszimmer und kocht heißen Kaffee für alle. Die Kinder trinken frische Milch und essen warme Brötchen mit süßer Erdbeermarmelade. Nach dem Frühstück spazieren sie gemeinsam durch den grünen Park an der Spree. Am Nachmittag spielen die Kinder draußen im Garten und lachen sehr viel."
        }
      ],
      familie: [
        {
          title: "Meine Familie und meine Wohnung",
          theme: "Familie & Wohnen",
          text: "Ich lebe mit meiner kleinen Familie in einer gemütlichen Wohnung in Köln. Mein Vater arbeitet als Lehrer an einer Schule und meine Mutter arbeitet im Krankenhaus. Ich habe auch einen jüngeren Bruder, der sehr gern Fußball mit seinen Freunden spielt. Unsere Wohnung hat drei helle Zimmer, eine große Küche und einen kleinen Balkon mit Blumen. Am Wochenende besuchen wir oft unsere Großeltern auf dem Land und essen leckeren Kuchen."
        }
      ],
      einkaufen: [
        {
          title: "Einkaufen auf dem Wochenmarkt",
          theme: "Essen & Einkaufen",
          text: "Jeden Samstagmorgen geht Frau Müller früh zum großen Markt in der Stadt. Dort kauft sie frisches Obst, grünes Gemüse und leckere Äpfel für die ganze Woche. Die Verkäufer sind immer sehr freundlich und die Preise sind nicht zu teuer für Kunden. Danach geht sie noch in die kleine Bäckerei und kauft frische Brötchen fürs Wochenende. Sie kocht am Sonntag eine warme Suppe für ihre Kinder und backt einen süßen Apfelkuchen."
        }
      ],
      wohnung: [
        {
          title: "Mein Haustier in der neuen Wohnung",
          theme: "Wohnen & Tiere",
          text: "Seit drei Monaten habe ich ein neues Haustier in meiner kleinen Wohnung. Meine Katze heißt Luna und hat weiches weißes Fell und große grüne Augen. Am Morgen wartet sie immer vor der Tür und möchte frisches Futter in ihrer Schale haben. Nach dem Essen schläft sie viele Stunden auf dem warmen Sofa im gemütlichen Wohnzimmer. Wenn ich nach Hause komme, freut sie sich sehr und spielt gern mit einem kleinen bunten Ball."
        }
      ]
    },

    A2: {
      urlaub: [
        {
          title: "Ein schöner Urlaub an der Ostsee",
          theme: "Reisen & Erholung",
          text: "Im letzten Sommer haben wir zwei wunderbare Wochen an der deutschen Ostseeküste verbracht. Das Wetter war fast jeden Tag sonnig und angenehm warm für lange Spaziergänge am Strand. Wir haben in einem kleinen gemütlichen Hotel gewohnt und morgens immer draußen auf der Terrasse gefrühstückt. Nachmittags sind wir oft mit geliehenen Fahrrädern durch die schönen Dörfer und Wälder gefahren. Am Abend haben wir in traditionellen Restaurants frischen Fisch gegessen und den Sonnenuntergang bewundert."
        }
      ],
      gesundheit: [
        {
          title: "Ein Besuch beim Arzt",
          theme: "Gesundheit & Medizin",
          text: "Gestern Nachmittag fühlte sich Anna plötzlich gar nicht gut und hatte hohes Fieber. Sie hat sofort in der Praxis angerufen und glücklicherweise noch einen schnellen Termin bekommen. Die freundliche Ärztin hat ihren Hals untersucht, den Blutdruck gemessen und ihr gute Medikamente verschrieben. Anna soll jetzt drei Tage im Bett bleiben, viel heißen Kräutertee trinken und sich gründlich ausruhen. Ihre Mitbewohnerin hat frisches Obst für sie eingekauft und kocht ihr eine gesunde Hühnersuppe."
        }
      ],
      kochen: [
        {
          title: "Mein neues Hobby: Frisches Kochen",
          theme: "Freizeit & Ernährung",
          text: "Seit Beginn des Jahres koche ich fast jeden Tag selbst in meiner Küche. Früher habe ich oft fertige Pizza gekauft oder ungesundes Fastfood im Restaurant gegessen. Jetzt probiere ich regelmäßig neue Rezepte aus dem Internet aus und kaufe frische Zutaten im Supermarkt. Besonders gern bereite ich italienische Nudelgerichte mit frischen Kräutern und aromatischem Gemüse zu. Meine besten Freunde kommen am Freitag zu Besuch und ich koche ein großes Drei-Gänge-Menü für alle."
        }
      ],
      stadt_land: [
        {
          title: "Leben in der Stadt oder auf dem Land",
          theme: "Wohnen & Umwelt",
          text: "Viele Menschen diskutieren darüber, ob das Leben in der Stadt oder auf dem Land besser ist. In einer großen Metropole gibt es viele kulturelle Angebote, Kinos, Restaurants und gute Einkaufsmöglichkeiten. Allerdings sind die Wohnungen dort oft sehr teuer und der ständige Verkehr erzeugt viel Lärm und Schmutz. Auf dem Dorf ist die Luft viel sauberer und die Menschen genießen die ruhige Natur rund um ihre Häuser. Dafür muss man auf dem Land fast jeden Weg mit dem eigenen Auto zurücklegen."
        }
      ]
    },

    B1: {
      mobilitaet: [
        {
          title: "Das Fahrrad in deutschen Großstädten",
          theme: "Mobilität & Umwelt",
          text: "Das Fahrrad gewinnt in deutschen Großstädten immer mehr an Bedeutung. Immer mehr Menschen verzichten auf das Auto und nutzen stattdessen das Rad, um zur Arbeit oder zur Universität zu fahren. Dies schont nicht nur die Umwelt, sondern fördert auch die eigene Gesundheit. Viele Städte investieren deshalb in breitere Radwege und moderne Leihsysteme. Dadurch soll der Verkehr spürbar entlastet und die Luftqualität nachhaltig verbessert werden. Auch E-Bikes erfreuen sich wachsender Beliebtheit bei Jung und Alt."
        }
      ],
      ernaehrung: [
        {
          title: "Vegane Ernährung im Trend",
          theme: "Ernährung & Lifestyle",
          text: "In deutschen Supermärkten wächst das Angebot an pflanzlichen Alternativen seit Jahren kontinuierlich. Immer mehr Menschen ernähren sich rein pflanzlich oder verzichten zumindest mehrmals pro Woche bewusst auf Fleisch und Milchprodukte. Als Hauptgründe nennen Verbraucher vor allem das Tierwohl, den Schutz des Klimas und persönliche gesundheitliche Vorteile. Ernährungswissenschaftler weisen jedoch darauf hin, dass man bei rein veganer Kost auf eine ausreichende Versorgung mit bestimmten Vitaminen achten muss."
        }
      ],
      medien: [
        {
          title: "Carsharing und moderne Mobilität",
          theme: "Mobilität & Konsum",
          text: "Das eigene Auto verliert für viele junge Menschen in Deutschland zunehmend an Attraktivität. Statt hohe Summen für Anschaffung, Versicherung und Reparaturen auszugeben, greifen viele lieber auf flexible Carsharing-Angebote zurück. Per Smartphone-App lässt sich ein passendes Fahrzeug in wenigen Sekunden reservieren und direkt an der Straßenecke öffnen. Dies spart nicht nur bares Geld, sondern reduziert auch den Parkplatzmangel in dicht besiedelten Innenstädten spürbar."
        }
      ],
      beruf: [
        {
          title: "Urban Gardening in Großstädten",
          theme: "Gemeinschaft & Natur",
          text: "Immer mehr Stadtbewohner entdecken die Freude am eigenen Gemüseanbau mitten in der Großstadt. Auf ungenutzten Brachflächen, Dächern oder Balkonen pflanzen engagierte Nachbarn Tomaten, Kräuter und bunte Blumen in Kisten und Töpfen. Dieses gemeinsame Gärtnern verschönert nicht nur den grauen Beton, sondern stärkt auch den Zusammenhalt im Stadtviertel. Kinder lernen dabei ganz praktisch, woher frische Lebensmittel kommen und wie wichtig biologische Vielfalt für unsere Städte ist."
        }
      ]
    },

    B2: {
      technik: [
        {
          title: "Künstliche Intelligenz in der Medizin",
          theme: "Wissenschaft & Zukunft",
          text: "Moderne Algorithmen revolutionieren die Diagnostik in Krankenhäusern weltweit. Intelligente Systeme analysieren medizinische Bilder mittels komplexer neuronaler Netze und erkennen Erkrankungen oft früher als erfahrene Ärzte. Dadurch können Therapien schneller eingeleitet und Patienten gezielter behandelt werden. Trotz des raschen Fortschritts bleibt die letzte Verantwortung jedoch beim medizinischen Fachpersonal, da menschliche Empathie unersetzbar ist. Zudem müssen ethische Richtlinien sicherstellen, dass sensible Patientendaten stets geschützt bleiben."
        }
      ],
      studium: [
        {
          title: "Die WG-Kultur unter Studierenden",
          theme: "Studentenleben & Wohnen",
          text: "Die Wohngemeinschaft ist die beliebteste Wohnform unter Studierenden in Deutschland. In einer typischen WG teilen sich mehrere Personen eine Wohnung, um Kosten für Miete und Nebenkosten zu sparen. Neben den finanziellen Vorteilen bietet das Zusammenleben auch viele Gelegenheiten für gemeinsame Abende und neue Freundschaften. Dennoch bringt der Alltag in einer WG manchmal auch Konflikte über Ordnung, Putzpläne und Ruhezeiten mit sich. Gute Kommunikation und Kompromissbereitschaft sind deshalb unerlässlich für ein harmonisches Zusammenleben."
        }
      ],
      energie: [
        {
          title: "Erneuerbare Energien und Windkraft",
          theme: "Technologie & Umwelt",
          text: "Deutschland setzt bei der Umgestaltung seiner Energieversorgung verstärkt auf erneuerbare Quellen. Besonders die Windenergie spielt dabei eine entscheidende Rolle, da sowohl an Land als auch auf hoher See gewaltige Windparks entstehen. Diese Anlagen produzieren sauberen Strom ohne schädliche Treibhausgase, was für den Klimaschutz von großer Bedeutung ist. Allerdings steht der Ausbau der Stromnetze vor großen technischen Herausforderungen. Bürgerinitiativen und Umweltschützer fordern zudem mehr Rücksicht auf lokale Ökosysteme und den Artenschutz."
        }
      ],
      arbeitswelt: [
        {
          title: "Das duale Ausbildungssystem",
          theme: "Bildung & Karriere",
          text: "Das duale Ausbildungssystem in Deutschland genießt weltweit ein hohes Ansehen. Auszubildende lernen die praktischen Fähigkeiten direkt in einem Ausbildungsbetrieb und besuchen parallel dazu eine staatliche Berufsschule. Diese enge Verzahnung von beruflicher Praxis und theoretischem Fachwissen erleichtert Jugendlichen den direkten Einstieg in die Arbeitswelt. Viele Unternehmen sichern sich auf diese Weise qualifizierten Nachwuchs und beugen einem drohenden Mangel an Fachkräften wirksam vor."
        }
      ]
    },

    C1: {
      neurologie: [
        {
          title: "Bilinguale Erziehung und Kognition",
          theme: "Kognitionsforschung & Linguistik",
          text: "Neurolinguistische Studien belegen die weitreichenden Vorzüge eines bilingualen Aufwachsens. Wer frühzeitig zwei oder mehr Sprachen erlernt, trainiert kontinuierlich seine kognitive Flexibilität und die Fähigkeit zur selektiven Aufmerksamkeit. Dieses ständige Wechseln zwischen Sprachsystemen stärkt exekutive Hirnfunktionen und kann den Ausbruch altersbedingter Demenzerkrankungen nachweislich verzögern. Zudem fördert Mehrsprachigkeit das interkulturelle Verständnis und eröffnet globale Perspektiven auf dem internationalen Arbeitsmarkt."
        }
      ],
      demografie: [
        {
          title: "Der demografische Wandel in Europa",
          theme: "Gesellschaft & Ökonomie",
          text: "Die Alterung der Bevölkerung stellt die europäischen Sozialsysteme vor fundamentale Herausforderungen. Sinkende Geburtenraten und eine steigende Lebenserwartung führen dazu, dass immer weniger Beitragszahler für immer mehr Rentner aufkommen müssen. Gleichzeitig klafft in vielen Branchen eine spürbare Fachkräftelücke, die das wirtschaftliche Wachstum bremsen könnte. Um dieser Entwicklung entgegenzuwirken, fordern Experten tiefgreifende Reformen der Altersvorsorge sowie gezielte Zuwanderung. Auch die Erhöhung des Renteneintrittsalters wird in der Politik kontrovers diskutiert."
        }
      ],
      klimaforschung: [
        {
          title: "Klimaforschung in den Alpen",
          theme: "Ökologie & Geowissenschaften",
          text: "Die alpinen Ökosysteme reagieren mit außergewöhnlicher Sensibilität auf globale Temperaturveränderungen. In den vergangenen Jahrzehnten sind zahlreiche Gletscher drastisch geschrumpft, was die regionale Wasserversorgung erheblich beeinträchtigt. Forscher beobachten zusätzlich eine Aufwärtswanderung kälteangepasster Pflanzenarten, die den wärmeren Bedingungen weichen müssen. Diese Veränderungen gefährden nicht nur die alpine Biodiversität, sondern erhöhen auch das Risiko von Erdrutschen und verheerenden Lawinenabgängen. Internationale Forschungsteams messen kontinuierlich Permafrosttemperaturen, um Frühwarnsysteme für Bergdörfer zu optimieren."
        }
      ],
      quanten: [
        {
          title: "Quantencomputer und Informationssicherheit",
          theme: "Informatik & Sicherheit",
          text: "Die Quanteninformatik verspricht Rechenleistungen, die herkömmliche Supercomputer um ein Vielfaches übertreffen. Durch die Nutzung quantenmechanischer Phänomene können neuartige Prozessoren hochkomplexe Optimierungsprobleme in Sekundenschnelle lösen. Diese bahnbrechende Leistungsfähigkeit birgt jedoch erhebliche Risiken für moderne kryptografische Verschlüsselungsverfahren im Internet. Sicherheitsbehörden und Technologiekonzerne arbeiten weltweit unter Hochdruck an post-quantenresistenten Algorithmen zur Sicherung digitaler Datenströme."
        }
      ]
    }
  },

  /**
   * Generiert einen C-Test Text basierend auf dem gewählten Sprachniveau (A1, A2, B1, B2, C1)
   * @param {string} level - "A1", "A2", "B1", "B2", "C1"
   * @param {string} topicId - Optionale Themen-ID
   * @returns {object} Generierter Text mit Metadaten
   */
  generate(level = "B1", topicId = null) {
    const lvlKey = (level || "B1").toUpperCase();
    const lvlTemplates = this.templates[lvlKey] || this.templates.B1;
    const availableTopicKeys = Object.keys(lvlTemplates);

    const chosenTopicKey = topicId && lvlTemplates[topicId]
      ? topicId
      : availableTopicKeys[Math.floor(Math.random() * availableTopicKeys.length)];

    const textList = lvlTemplates[chosenTopicKey] || lvlTemplates[availableTopicKeys[0]];
    const selected = textList[Math.floor(Math.random() * textList.length)];

    return {
      id: `synth_${lvlKey.toLowerCase()}_${Date.now()}`,
      title: selected.title,
      level: lvlKey,
      theme: selected.theme,
      description: `Generierter C-Test für Niveau ${lvlKey} (${this.levels[lvlKey].name})`,
      rawText: selected.text,
      grammarFocus: this.levels[lvlKey].grammarFocusRu
    };
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GermanTextSynthesizer };
}
