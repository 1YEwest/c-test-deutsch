/**
 * C-TEST DEUTSCH - Textdatenbank von A1 bis C1
 * Authentische deutsche Texte für alle Niveaustufen: A1, A2, B1, B2, C1.
 * Jeder Text erzeugt exakt 20 Lücken nach offiziellem C-Test-Standard.
 */

const TEXTS_DATABASE = {
  // 1. STANDARD-PRÜFUNG (B1 -> B2 -> C1: OnSET / Studienkolleg / TestDaF Standard)
  standardExamTexts: [
    {
      id: "exam_std_1",
      title: "Das Fahrrad in deutschen Städten",
      level: "B1",
      theme: "Mobilität & Umwelt",
      description: "Bedeutung des Fahrrads für modernen Stadtverkehr und Gesundheit.",
      rawText: "Das Fahrrad gewinnt in deutschen Großstädten immer mehr an Bedeutung. Immer mehr Menschen verzichten auf das Auto und nutzen stattdessen das Rad, um zur Arbeit oder zur Universität zu fahren. Dies schont nicht nur die Umwelt, sondern fördert auch die eigene Gesundheit. Viele Städte investieren deshalb in breitere Radwege und moderne Leihsysteme. Dadurch soll der Verkehr spürbar entlastet und die Luftqualität nachhaltig verbessert werden. Auch E-Bikes erfreuen sich wachsender Beliebtheit bei Jung und Alt."
    },
    {
      id: "exam_std_2",
      title: "Kaffee – Das beliebteste Heißgetränk",
      level: "B1",
      theme: "Kultur & Alltag",
      description: "Kaffeekonsum und Tradition der Kaffeepause in Deutschland.",
      rawText: "Kaffee ist für viele Menschen in Deutschland ein unverzichtbarer Teil des Alltags. Fast jeder Deutsche trinkt morgens mindestens eine Tasse des heißen Getränks, um wach zu werden und Energie für den Tag zu tanken. In vielen Büros gilt die gemeinsame Kaffeepause als wichtiges soziales Ritual. Wissenschaftler betonen zusätzlich, dass moderater Kaffeekonsum positive Effekte auf die Gesundheit haben kann, wenn man es nicht übertreibt. Besonders beliebt sind neben klassischem Filterkaffee auch Cappuccino und Espresso."
    },
    {
      id: "exam_std_3",
      title: "Die WG-Kultur unter Studierenden",
      level: "B2",
      theme: "Studentenleben & Wohnen",
      description: "Wohngemeinschaften als typische studentische Lebensform in Deutschland.",
      rawText: "Die Wohngemeinschaft ist die beliebteste Wohnform unter Studierenden in Deutschland. In einer typischen WG teilen sich mehrere Personen eine Wohnung, um Kosten für Miete und Nebenkosten zu sparen. Neben den finanziellen Vorteilen bietet das Zusammenleben auch viele Gelegenheiten für gemeinsame Abende und neue Freundschaften. Dennoch bringt der Alltag in einer WG manchmal auch Konflikte über Ordnung, Putzpläne und Ruhezeiten mit sich. Gute Kommunikation und Kompromissbereitschaft sind deshalb unerlässlich für ein harmonisches Zusammenleben."
    },
    {
      id: "exam_std_4",
      title: "Erneuerbare Energien und Windkraft",
      level: "B2",
      theme: "Technologie & Umwelt",
      description: "Die Energiewende und der Ausbau moderner Windenergieanlagen.",
      rawText: "Deutschland setzt bei der Umgestaltung seiner Energieversorgung verstärkt auf erneuerbare Quellen. Besonders die Windenergie spielt dabei eine entscheidende Rolle, da sowohl an Land als auch auf hoher See gewaltige Windparks entstehen. Diese Anlagen produzieren sauberen Strom ohne schädliche Treibhausgase, was für den Klimaschutz von großer Bedeutung ist. Allerdings steht der Ausbau der Stromnetze vor großen technischen Herausforderungen. Bürgerinitiativen und Umweltschützer fordern zudem mehr Rücksicht auf lokale Ökosysteme und den Artenschutz."
    },
    {
      id: "exam_std_5",
      title: "Künstliche Intelligenz in der Medizin",
      level: "B2",
      theme: "Wissenschaft & Zukunft",
      description: "Einsatz von KI-Algorithmen bei Diagnose und Bildgebung.",
      rawText: "Moderne Algorithmen revolutionieren die Diagnostik in Krankenhäusern weltweit. Intelligente Systeme analysieren medizinische Bilder mittels komplexer neuronaler Netze und erkennen Erkrankungen oft früher als erfahrene Ärzte. Dadurch können Therapien schneller eingeleitet und Patienten gezielter behandelt werden. Trotz des raschen Fortschritts bleibt die letzte Verantwortung jedoch beim medizinischen Fachpersonal, da menschliche Empathie unersetzbar ist. Zudem müssen ethische Richtlinien sicherstellen, dass sensible Patientendaten stets geschützt bleiben."
    },
    {
      id: "exam_std_6",
      title: "Der demografische Wandel in Europa",
      level: "C1",
      theme: "Gesellschaft & Ökonomie",
      description: "Alterung der Gesellschaft und Herausforderungen für Sozialsysteme.",
      rawText: "Die Alterung der Bevölkerung stellt die europäischen Sozialsysteme vor fundamentale Herausforderungen. Sinkende Geburtenraten und eine steigende Lebenserwartung führen dazu, dass immer weniger Beitragszahler für immer mehr Rentner aufkommen müssen. Gleichzeitig klafft in vielen Branchen eine spürbare Fachkräftelücke, die das wirtschaftliche Wachstum bremsen könnte. Um dieser Entwicklung entgegenzuwirken, fordern Experten tiefgreifende Reformen der Altersvorsorge sowie gezielte Zuwanderung. Auch die Erhöhung des Renteneintrittsalters wird in der Politik kontrovers diskutiert."
    },
    {
      id: "exam_std_7",
      title: "Bilinguale Erziehung und Kognition",
      level: "C1",
      theme: "Kognitionsforschung & Linguistik",
      description: "Auswirkungen von Mehrsprachigkeit auf das menschliche Gehirn.",
      rawText: "Neurolinguistische Studien belegen die weitreichenden Vorzüge eines bilingualen Aufwachsens. Wer frühzeitig zwei oder mehr Sprachen erlernt, trainiert kontinuierlich seine kognitive Flexibilität und die Fähigkeit zur selektiven Aufmerksamkeit. Dieses ständige Wechseln zwischen Sprachsystemen stärkt exekutive Hirnfunktionen und kann den Ausbruch altersbedingter Demenzerkrankungen nachweislich verzögern. Zudem fördert Mehrsprachigkeit das interkulturelle Verständnis und eröffnet globale Perspektiven auf dem internationalen Arbeitsmarkt."
    },
    {
      id: "exam_std_8",
      title: "Klimaforschung in den Alpen",
      level: "C1",
      theme: "Ökologie & Geowissenschaften",
      description: "Schwinden der Gletscher und ökologische Verschiebungen im Hochgebirge.",
      rawText: "Die alpinen Ökosysteme reagieren mit außergewöhnlicher Sensibilität auf globale Temperaturveränderungen. In den vergangenen Jahrzehnten sind zahlreiche Gletscher drastisch geschrumpft, was die regionale Wasserversorgung erheblich beeinträchtigt. Forscher beobachten zusätzlich eine Aufwärtswanderung kälteangepasster Pflanzenarten, die den wärmeren Bedingungen weichen müssen. Diese Veränderungen gefährden nicht nur die alpine Biodiversität, sondern erhöhen auch das Risiko von Erdrutschen und verheerenden Lawinenabgängen. Internationale Forschungsteams messen kontinuierlich Permafrosttemperaturen, um Frühwarnsysteme für Bergdörfer zu optimieren."
    }
  ],

  // 2. BASIS-PRÜFUNG FÜR ANFÄNGER (A1 -> A2 -> B1: Grundstufe & Einstieg)
  beginnerExamTexts: [
    {
      id: "exam_beg_1",
      title: "Mein typischer Tagesablauf",
      level: "A1",
      theme: "Alltag & Gewohnheiten",
      description: "Tagesroutine, Aufstehen, Frühstück und Arbeitsweg.",
      rawText: "Mein Name ist Thomas und ich wohne seit zwei Jahren in München. Jeden Tag stehe ich früh um sieben Uhr auf und trinke eine Tasse Tee in der Küche. Danach esse ich frisches Brot mit Butter und Käse zum Frühstück. Um acht Uhr fahre ich mit dem Bus zur Arbeit im Zentrum der Stadt. Am Abend koche ich gern zusammen mit meiner Freundin und wir hören schöne Musik."
    },
    {
      id: "exam_beg_2",
      title: "Meine Familie und meine Wohnung",
      level: "A1",
      theme: "Familie & Wohnen",
      description: "Beschreibung der Familie, Berufe der Eltern und Wohnung.",
      rawText: "Ich lebe mit meiner kleinen Familie in einer gemütlichen Wohnung in Köln. Mein Vater arbeitet als Lehrer an einer Schule und meine Mutter arbeitet im Krankenhaus. Ich habe auch einen jüngeren Bruder, der sehr gern Fußball mit seinen Freunden spielt. Unsere Wohnung hat drei helle Zimmer, eine große Küche und einen kleinen Balkon mit Blumen. Am Wochenende besuchen wir oft unsere Großeltern auf dem Land und essen leckeren Kuchen."
    },
    {
      id: "exam_beg_3",
      title: "Einkaufen auf dem Wochenmarkt",
      level: "A1",
      theme: "Essen & Einkaufen",
      description: "Kauf von frischem Obst, Gemüse und Brot auf dem Markt.",
      rawText: "Jeden Samstagmorgen geht Frau Müller früh zum großen Markt in der Stadt. Dort kauft sie frisches Obst, grünes Gemüse und leckere Äpfel für die ganze Woche. Die Verkäufer sind immer sehr freundlich und die Preise sind nicht zu teuer für Kunden. Danach geht sie noch in die kleine Bäckerei und kauft frische Brötchen fürs Wochenende. Sie kocht am Sonntag eine warme Suppe für ihre Kinder und backt einen süßen Apfelkuchen."
    },
    {
      id: "exam_beg_4",
      title: "Mein Haustier: Katze Luna",
      level: "A1",
      theme: "Freizeit & Tiere",
      description: "Leben mit einer Katze in der Wohnung und Pflege.",
      rawText: "Seit drei Monaten habe ich ein neues Haustier in meiner kleinen Wohnung. Meine Katze heißt Luna und hat weiches weißes Fell und große grüne Augen. Am Morgen wartet sie immer vor der Tür und möchte frisches Futter in ihrer Schale haben. Nach dem Essen schläft sie viele Stunden auf dem warmen Sofa im gemütlichen Wohnzimmer. Wenn ich nach Hause komme, freut sie sich sehr und spielt gern mit einem kleinen bunten Ball."
    },
    {
      id: "exam_beg_5",
      title: "Ein schöner Urlaub an der Ostsee",
      level: "A2",
      theme: "Reisen & Erholung",
      description: "Erlebnisse am Strand, Fahrradtouren und Abendessen im Restaurant.",
      rawText: "Im letzten Sommer haben wir zwei wunderbare Wochen an der deutschen Ostseeküste verbracht. Das Wetter war fast jeden Tag sonnig und angenehm warm für lange Spaziergänge am Strand. Wir haben in einem kleinen gemütlichen Hotel gewohnt und morgens immer draußen auf der Terrasse gefrühstückt. Nachmittags sind wir oft mit geliehenen Fahrrädern durch die schönen Dörfer und Wälder gefahren. Am Abend haben wir in traditionellen Restaurants frischen Fisch gegessen und den Sonnenuntergang bewundert."
    },
    {
      id: "exam_beg_6",
      title: "Ein Besuch beim Arzt",
      level: "A2",
      theme: "Gesundheit & Medizin",
      description: "Krankheit, Untersuchung beim Arzt und Genesung zu Hause.",
      rawText: "Gestern Nachmittag fühlte sich Anna plötzlich gar nicht gut und hatte hohes Fieber. Sie hat sofort in der Praxis angerufen und glücklicherweise noch einen schnellen Termin bekommen. Die freundliche Ärztin hat ihren Hals untersucht, den Blutdruck gemessen und ihr gute Medikamente verschrieben. Anna soll jetzt drei Tage im Bett bleiben, viel heißen Kräutertee trinken und sich gründlich ausruhen. Ihre Mitbewohnerin hat frisches Obst für sie eingekauft und kocht ihr eine gesunde Hühnersuppe."
    },
    {
      id: "exam_beg_7",
      title: "Mein neues Hobby: Kochen",
      level: "A2",
      theme: "Freizeit & Ernährung",
      description: "Selbst kochen, gesunde Ernährung und Essen mit Freunden.",
      rawText: "Seit Beginn des Jahres koche ich fast jeden Tag selbst in meiner Küche. Früher habe ich oft fertige Pizza gekauft oder ungesundes Fastfood im Restaurant gegessen. Jetzt probiere ich regelmäßig neue Rezepte aus dem Internet aus und kaufe frische Zutaten im Supermarkt. Besonders gern bereite ich italienische Nudelgerichte mit frischen Kräutern und aromatischem Gemüse zu. Meine besten Freunde kommen am Freitag zu Besuch und ich koche ein großes Drei-Gänge-Menü für alle."
    },
    {
      id: "exam_beg_8",
      title: "Urban Gardening in der Großstadt",
      level: "B1",
      theme: "Gemeinschaft & Natur",
      description: "Gemüseanbau und Gemeinschaftsgärten mitten in der Stadt.",
      rawText: "Immer mehr Stadtbewohner entdecken die Freude am eigenen Gemüseanbau mitten in der Großstadt. Auf ungenutzten Brachflächen, Dächern oder Balkonen pflanzen engagierte Nachbarn Tomaten, Kräuter und bunte Blumen in Kisten und Töpfen. Dieses gemeinsame Gärtnern verschönert nicht nur den grauen Beton, sondern stärkt auch den Zusammenhalt im Stadtviertel. Kinder lernen dabei ganz praktisch, woher frische Lebensmittel kommen und wie wichtig biologische Vielfalt für unsere Städte ist."
    }
  ],

  // 3. GESAMTSPEKTRUM-PRÜFUNG (A1 -> C1: Umfassender Einstufungstest)
  fullSpectrumExamTexts: [
    {
      id: "exam_full_1",
      title: "Mein typischer Tagesablauf",
      level: "A1",
      theme: "Alltag & Zeit",
      description: "Einstiegs-Text A1: Grundwortschatz und Präsens.",
      rawText: "Mein Name ist Thomas und ich wohne seit zwei Jahren in München. Jeden Tag stehe ich früh um sieben Uhr auf und trinke eine Tasse Tee in der Küche. Danach esse ich frisches Brot mit Butter und Käse zum Frühstück. Um acht Uhr fahre ich mit dem Bus zur Arbeit im Zentrum der Stadt. Am Abend koche ich gern zusammen mit meiner Freundin und wir hören schöne Musik."
    },
    {
      id: "exam_full_2",
      title: "Einkaufen auf dem Wochenmarkt",
      level: "A1",
      theme: "Essen & Einkaufen",
      description: "A1 Text: Dialoge, Lebensmittel, Preise.",
      rawText: "Jeden Samstagmorgen geht Frau Müller früh zum großen Markt in der Stadt. Dort kauft sie frisches Obst, grünes Gemüse und leckere Äpfel für die ganze Woche. Die Verkäufer sind immer sehr freundlich und die Preise sind nicht zu teuer für Kunden. Danach geht sie noch in die kleine Bäckerei und kauft frische Brötchen fürs Wochenende. Sie kocht am Sonntag eine warme Suppe für ihre Kinder und backt einen süßen Apfelkuchen."
    },
    {
      id: "exam_full_3",
      title: "Ein schöner Urlaub an der Ostsee",
      level: "A2",
      theme: "Reisen & Freizeit",
      description: "A2 Text: Perfekt, Reisevokabular, Freizeitaktivitäten.",
      rawText: "Im letzten Sommer haben wir zwei wunderbare Wochen an der deutschen Ostseeküste verbracht. Das Wetter war fast jeden Tag sonnig und angenehm warm für lange Spaziergänge am Strand. Wir haben in einem kleinen gemütlichen Hotel gewohnt und morgens immer draußen auf der Terrasse gefrühstückt. Nachmittags sind wir oft mit geliehenen Fahrrädern durch die schönen Dörfer und Wälder gefahren. Am Abend haben wir in traditionellen Restaurants frischen Fisch gegessen und den Sonnenuntergang bewundert."
    },
    {
      id: "exam_full_4",
      title: "Leben in der Stadt oder auf dem Land",
      level: "A2",
      theme: "Wohnen & Umwelt",
      description: "A2 Text: Vergleiche, Vor- und Nachteile, Alltag.",
      rawText: "Viele Menschen diskutieren darüber, ob das Leben in der Stadt oder auf dem Land besser ist. In einer großen Metropole gibt es viele kulturelle Angebote, Kinos, Restaurants und gute Einkaufsmöglichkeiten. Allerdings sind die Wohnungen dort oft sehr teuer und der ständige Verkehr erzeugt viel Lärm und Schmutz. Auf dem Dorf ist die Luft viel sauberer und die Menschen genießen die ruhige Natur rund um ihre Häuser. Dafür muss man auf dem Land fast jeden Weg mit dem eigenen Auto zurücklegen."
    },
    {
      id: "exam_full_5",
      title: "Das Fahrrad in deutschen Städten",
      level: "B1",
      theme: "Mobilität & Umwelt",
      description: "B1 Text: Radfahren, Stadtverkehr und Gesundheit.",
      rawText: "Das Fahrrad gewinnt in deutschen Großstädten immer mehr an Bedeutung. Immer mehr Menschen verzichten auf das Auto und nutzen stattdessen das Rad, um zur Arbeit oder zur Universität zu fahren. Dies schont nicht nur die Umwelt, sondern fördert auch die eigene Gesundheit. Viele Städte investieren deshalb in breitere Radwege und moderne Leihsysteme. Dadurch soll der Verkehr spürbar entlastet und die Luftqualität nachhaltig verbessert werden. Auch E-Bikes erfreuen sich wachsender Beliebtheit bei Jung und Alt."
    },
    {
      id: "exam_full_6",
      title: "Die WG-Kultur unter Studierenden",
      level: "B2",
      theme: "Studentenleben & Wohnen",
      description: "B2 Text: Universitätsleben, Zusammenleben, Konflikte.",
      rawText: "Die Wohngemeinschaft ist die beliebteste Wohnform unter Studierenden in Deutschland. In einer typischen WG teilen sich mehrere Personen eine Wohnung, um Kosten für Miete und Nebenkosten zu sparen. Neben den finanziellen Vorteilen bietet das Zusammenleben auch viele Gelegenheiten für gemeinsame Abende und neue Freundschaften. Dennoch bringt der Alltag in einer WG manchmal auch Konflikte über Ordnung, Putzpläne und Ruhezeiten mit sich. Gute Kommunikation und Kompromissbereitschaft sind deshalb unerlässlich für ein harmonisches Zusammenleben."
    },
    {
      id: "exam_full_7",
      title: "Künstliche Intelligenz in der Medizin",
      level: "B2",
      theme: "Wissenschaft & Zukunft",
      description: "B2 Text: Medizinische Algorithmen, Ethik und Verantwortung.",
      rawText: "Moderne Algorithmen revolutionieren die Diagnostik in Krankenhäusern weltweit. Intelligente Systeme analysieren medizinische Bilder mittels komplexer neuronaler Netze und erkennen Erkrankungen oft früher als erfahrene Ärzte. Dadurch können Therapien schneller eingeleitet und Patienten gezielter behandelt werden. Trotz des raschen Fortschritts bleibt die letzte Verantwortung jedoch beim medizinischen Fachpersonal, da menschliche Empathie unersetzbar ist. Zudem müssen ethische Richtlinien sicherstellen, dass sensible Patientendaten stets geschützt bleiben."
    },
    {
      id: "exam_full_8",
      title: "Der demografische Wandel in Europa",
      level: "C1",
      theme: "Gesellschaft & Ökonomie",
      description: "C1 Text: Akademischer Stil, Fachsprache, Wirtschaftspolitik.",
      rawText: "Die Alterung der Bevölkerung stellt die europäischen Sozialsysteme vor fundamentale Herausforderungen. Sinkende Geburtenraten und eine steigende Lebenserwartung führen dazu, dass immer weniger Beitragszahler für immer mehr Rentner aufkommen müssen. Gleichzeitig klafft in vielen Branchen eine spürbare Fachkräftelücke, die das wirtschaftliche Wachstum bremsen könnte. Um dieser Entwicklung entgegenzuwirken, fordern Experten tiefgreifende Reformen der Altersvorsorge sowie gezielte Zuwanderung. Auch die Erhöhung des Renteneintrittsalters wird in der Politik kontrovers diskutiert."
    }
  ],

  // 4. ÜBUNGSTEXTE NACH NIVEAUSTUFEN (A1, A2, B1, B2, C1)
  practiceTexts: [
    // === A1 LEVEL ===
    {
      id: "prac_a1_1",
      title: "Mein typischer Tagesablauf",
      level: "A1",
      theme: "Alltag & Zeit",
      description: "Tagesroutine, Aufstehen, Frühstück und Arbeitsweg.",
      rawText: "Mein Name ist Thomas und ich wohne seit zwei Jahren in München. Jeden Tag stehe ich früh um sieben Uhr auf und trinke eine Tasse Tee in der Küche. Danach esse ich frisches Brot mit Butter und Käse zum Frühstück. Um acht Uhr fahre ich mit dem Bus zur Arbeit im Zentrum der Stadt. Am Abend koche ich gern zusammen mit meiner Freundin und wir hören schöne Musik."
    },
    {
      id: "prac_a1_2",
      title: "Meine Familie und meine Wohnung",
      level: "A1",
      theme: "Familie & Wohnen",
      description: "Beschreibung der Familie, Berufe und Wohnung.",
      rawText: "Ich lebe mit meiner kleinen Familie in einer gemütlichen Wohnung in Köln. Mein Vater arbeitet als Lehrer an einer Schule und meine Mutter arbeitet im Krankenhaus. Ich habe auch einen jüngeren Bruder, der sehr gern Fußball mit seinen Freunden spielt. Unsere Wohnung hat drei helle Zimmer, eine große Küche und einen kleinen Balkon mit Blumen. Am Wochenende besuchen wir oft unsere Großeltern auf dem Land und essen leckeren Kuchen."
    },
    {
      id: "prac_a1_3",
      title: "Einkaufen auf dem Wochenmarkt",
      level: "A1",
      theme: "Essen & Einkaufen",
      description: "Kauf von frischem Obst, Gemüse und Brot auf dem Markt.",
      rawText: "Jeden Samstagmorgen geht Frau Müller früh zum großen Markt in der Stadt. Dort kauft sie frisches Obst, grünes Gemüse und leckere Äpfel für die ganze Woche. Die Verkäufer sind immer sehr freundlich und die Preise sind nicht zu teuer für Kunden. Danach geht sie noch in die kleine Bäckerei und kauft frische Brötchen fürs Wochenende. Sie kocht am Sonntag eine warme Suppe für ihre Kinder und backt einen süßen Apfelkuchen."
    },
    {
      id: "prac_a1_4",
      title: "Mein Haustier: Katze Luna",
      level: "A1",
      theme: "Freizeit & Tiere",
      description: "Leben mit einer Katze in der Wohnung und Pflege.",
      rawText: "Seit drei Monaten habe ich ein neues Haustier in meiner kleinen Wohnung. Meine Katze heißt Luna und hat weiches weißes Fell und große grüne Augen. Am Morgen wartet sie immer vor der Tür und möchte frisches Futter in ihrer Schale haben. Nach dem Essen schläft sie viele Stunden auf dem warmen Sofa im gemütlichen Wohnzimmer. Wenn ich nach Hause komme, freut sie sich sehr und spielt gern mit einem kleinen bunten Ball."
    },

    // === A2 LEVEL ===
    {
      id: "prac_a2_1",
      title: "Ein schöner Urlaub an der Ostsee",
      level: "A2",
      theme: "Reisen & Erholung",
      description: "Erlebnisse am Strand, Fahrradtouren und Restaurantbesuche.",
      rawText: "Im letzten Sommer haben wir zwei wunderbare Wochen an der deutschen Ostseeküste verbracht. Das Wetter war fast jeden Tag sonnig und angenehm warm für lange Spaziergänge am Strand. Wir haben in einem kleinen gemütlichen Hotel gewohnt und morgens immer draußen auf der Terrasse gefrühstückt. Nachmittags sind wir oft mit geliehenen Fahrrädern durch die schönen Dörfer und Wälder gefahren. Am Abend haben wir in traditionellen Restaurants frischen Fisch gegessen und den Sonnenuntergang bewundert."
    },
    {
      id: "prac_a2_2",
      title: "Ein Besuch beim Arzt",
      level: "A2",
      theme: "Gesundheit & Medizin",
      description: "Krankheit, Untersuchung beim Arzt und Genesung.",
      rawText: "Gestern Nachmittag fühlte sich Anna plötzlich gar nicht gut und hatte hohes Fieber. Sie hat sofort in der Praxis angerufen und glücklicherweise noch einen schnellen Termin bekommen. Die freundliche Ärztin hat ihren Hals untersucht, den Blutdruck gemessen und ihr gute Medikamente verschrieben. Anna soll jetzt drei Tage im Bett bleiben, viel heißen Kräutertee trinken und sich gründlich ausruhen. Ihre Mitbewohnerin hat frisches Obst für sie eingekauft und kocht ihr eine gesunde Hühnersuppe."
    },
    {
      id: "prac_a2_3",
      title: "Mein neues Hobby: Kochen",
      level: "A2",
      theme: "Freizeit & Ernährung",
      description: "Selbst kochen, gesunde Ernährung und Essen mit Freunden.",
      rawText: "Seit Beginn des Jahres koche ich fast jeden Tag selbst in meiner Küche. Früher habe ich oft fertige Pizza gekauft oder ungesundes Fastfood im Restaurant gegessen. Jetzt probiere ich regelmäßig neue Rezepte aus dem Internet aus und kaufe frische Zutaten im Supermarkt. Besonders gern bereite ich italienische Nudelgerichte mit frischen Kräutern und aromatischem Gemüse zu. Meine besten Freunde kommen am Freitag zu Besuch und ich koche ein großes Drei-Gänge-Menü für alle."
    },
    {
      id: "prac_a2_4",
      title: "Leben in der Stadt oder auf dem Land",
      level: "A2",
      theme: "Wohnen & Umwelt",
      description: "Vor- und Nachteile von Stadtleben versus Landleben.",
      rawText: "Viele Menschen diskutieren darüber, ob das Leben in der Stadt oder auf dem Land besser ist. In einer großen Metropole gibt es viele kulturelle Angebote, Kinos, Restaurants und gute Einkaufsmöglichkeiten. Allerdings sind die Wohnungen dort oft sehr teuer und der ständige Verkehr erzeugt viel Lärm und Schmutz. Auf dem Dorf ist die Luft viel sauberer und die Menschen genießen die ruhige Natur rund um ihre Häuser. Dafür muss man auf dem Land fast jeden Weg mit dem eigenen Auto zurücklegen."
    },

    // === B1 LEVEL ===
    {
      id: "prac_b1_1",
      title: "Urban Gardening: Grüne Oasen",
      level: "B1",
      theme: "Gemeinschaft & Natur",
      description: "Gemüseanbau und Gemeinschaftsgärten in deutschen Großstädten.",
      rawText: "Immer mehr Stadtbewohner entdecken die Freude am eigenen Gemüseanbau mitten in der Großstadt. Auf ungenutzten Brachflächen, Dächern oder Balkonen pflanzen engagierte Nachbarn Tomaten, Kräuter und bunte Blumen in Kisten und Töpfen. Dieses gemeinsame Gärtnern verschönert nicht nur den grauen Beton, sondern stärkt auch den Zusammenhalt im Stadtviertel. Kinder lernen dabei ganz praktisch, woher frische Lebensmittel kommen und wie wichtig biologische Vielfalt für unsere Städte ist."
    },
    {
      id: "prac_b1_2",
      title: "Vegane Ernährung im Trend",
      level: "B1",
      theme: "Ernährung & Lifestyle",
      description: "Wachsendes Angebot pflanzlicher Produkte und Motive der Verbraucher.",
      rawText: "In deutschen Supermärkten wächst das Angebot an pflanzlichen Alternativen seit Jahren kontinuierlich. Immer mehr Menschen ernähren sich rein pflanzlich oder verzichten zumindest mehrmals pro Woche bewusst auf Fleisch und Milchprodukte. Als Hauptgründe nennen Verbraucher vor allem das Tierwohl, den Schutz des Klimas und persönliche gesundheitliche Vorteile. Ernährungswissenschaftler weisen jedoch darauf hin, dass man bei rein veganer Kost auf eine ausreichende Versorgung mit bestimmten Vitaminen achten muss."
    },
    {
      id: "prac_b1_3",
      title: "Carsharing: Teilen statt Besitzen",
      level: "B1",
      theme: "Mobilität & Konsum",
      description: "Das Konzept des Carsharings als Alternative zum eigenen Pkw.",
      rawText: "Das eigene Auto verliert für viele junge Menschen in Deutschland zunehmend an Attraktivität. Statt hohe Summen für Anschaffung, Versicherung und Reparaturen auszugeben, greifen viele lieber auf flexible Carsharing-Angebote zurück. Per Smartphone-App lässt sich ein passendes Fahrzeug in wenigen Sekunden reservieren und direkt an der Straßenecke öffnen. Dies spart nicht nur bares Geld, sondern reduziert auch den Parkplatzmangel in dicht besiedelten Innenstädten spürbar."
    },

    // === B2 LEVEL ===
    {
      id: "prac_b2_1",
      title: "Bibliotheken im digitalen Wandel",
      level: "B2",
      theme: "Bildung & Medien",
      description: "Vom klassischen Büchermagazin zum modernen Lern- und Kommunikationszentrum.",
      rawText: "Moderne Bibliotheken haben sich von reinen Büchermagazinen zu lebendigen Lernorten entwickelt. Neben gedruckten Büchern bieten sie heute Zugriff auf digitale Datenbanken, elektronische Zeitschriften und multimediale Arbeitsplätze. Viele Studierende schätzen die ruhige Atmosphäre und die moderne technische Ausstattung für konzentriertes Arbeiten. Darüber hinaus organisieren Bibliotheken regelmäßig Lesungen, Workshops zur Medienkompetenz und interkulturelle Veranstaltungen für alle Altersgruppen."
    },
    {
      id: "prac_b2_2",
      title: "Das duale Ausbildungssystem",
      level: "B2",
      theme: "Bildung & Karriere",
      description: "Kombination aus praktischer Lehre im Betrieb und Berufsschule.",
      rawText: "Das duale Ausbildungssystem in Deutschland genießt weltweit ein hohes Ansehen. Auszubildende lernen die praktischen Fähigkeiten direkt in einem Ausbildungsbetrieb und besuchen parallel dazu eine staatliche Berufsschule. Diese enge Verzahnung von beruflicher Praxis und theoretischem Fachwissen erleichtert Jugendlichen den direkten Einstieg in die Arbeitswelt. Viele Unternehmen sichern sich auf diese Weise qualifizierten Nachwuchs und beugen einem drohenden Mangel an Fachkräften wirksam vor."
    },
    {
      id: "prac_b2_3",
      title: "Homeoffice: Chancen und Risiken",
      level: "B2",
      theme: "Moderne Arbeitswelt",
      description: "Flexibilität und psychologische Aspekte des ortsunabhängigen Arbeitens.",
      rawText: "Die Digitalisierung hat die Arbeitswelt grundlegend verändert und mobiles Arbeiten zur Normalität gemacht. Viele Beschäftigte schätzen die flexible Zeiteinteilung und den Wegfall des täglichen Arbeitsweges, was zu einer besseren Vereinbarkeit von Beruf und Privatleben führt. Allerdings warnen Arbeitspsychologen vor der Gefahr einer ständigen Erreichbarkeit und der schleichenden Vereinsamung im häuslichen Arbeitszimmer. Erfolgreiches Arbeiten im Homeoffice erfordert daher klare Grenzen und eine transparente Kommunikation innerhalb des gesamten Teams."
    },
    {
      id: "prac_b2_4",
      title: "Mikroplastik in Gewässern",
      level: "B2",
      theme: "Umweltforschung",
      description: "Ursachen und Gefahren mikroskopischer Plastikpartikel in der Natur.",
      rawText: "Winzige Kunststoffpartikel stellen eine ernsthafte Bedrohung für maritime Lebensräume weltweit dar. Durch den Zerfall von Plastikmüll und den Abrieb von Autoreifen gelangen gigantische Mengen unsichtbarer Teilchen in Flüsse und Meere. Fische und andere Meerestiere nehmen diese Partikel mit der Nahrung auf, wodurch Schadstoffe in die Nahrungskette gelangen können. Forscher suchen intensiv nach biologisch abbaubaren Alternativen und verbesserten Filtersystemen für Kläranlagen."
    },

    // === C1 LEVEL ===
    {
      id: "prac_c1_1",
      title: "Die Psychologie der Prokrastination",
      level: "C1",
      theme: "Psychologie & Verhalten",
      description: "Ursachen des chronischen Aufschiebens und Interventionsstrategien.",
      rawText: "Das pathologische Aufschieben dringender Aufgaben betrifft erstaunlich viele Studierende und Berufstätige. Psychologen erklären dieses Verhalten selten mit Faulheit, sondern primär mit Versagensängsten und mangelnder Selbstregulation. Betroffene flüchten vor unangenehmen Emotionen in kurzfristige Ablenkungen, was mittelfristig zu erheblichem Stress und massiven Schuldgefühlen führt. Therapeutische Ansätze setzen bei der Aufteilung komplexer Vorhaben in winzige Teilschritte und dem bewussten Umgang mit inneren Perfektionsansprüchen an."
    },
    {
      id: "prac_c1_2",
      title: "Quantencomputer und Informationssicherheit",
      level: "C1",
      theme: "Informatik & Sicherheit",
      description: "Potenziale von Quantenprozessoren und Implikationen für Kryptografie.",
      rawText: "Die Quanteninformatik verspricht Rechenleistungen, die herkömmliche Supercomputer um ein Vielfaches übertreffen. Durch die Nutzung quantenmechanischer Phänomene können neuartige Prozessoren hochkomplexe Optimierungsprobleme in Sekundenschnelle lösen. Diese bahnbrechende Leistungsfähigkeit birgt jedoch erhebliche Risiken für moderne kryptografische Verschlüsselungsverfahren im Internet. Sicherheitsbehörden und Technologiekonzerne arbeiten weltweit unter Hochdruck an post-quantenresistenten Algorithmen zur Sicherung digitaler Datenströme."
    },
    {
      id: "prac_c1_3",
      title: "Urbanisierung und soziale Isolation",
      level: "C1",
      theme: "Soziologie & Stadtplanung",
      description: "Die Paradoxie der Einsamkeit in dicht besiedelten Metropolen.",
      rawText: "Trotz der räumlichen Enge leiden Millionen Stadtbewohner unter tief empfundener Isolation und sozialer Entfremdung. Soziologen bezeichnen dieses Phänomen als urbane Einsamkeit, die häufig durch anonyme Architektur und flüchtige Nachbarschaftsbeziehungen verstärkt wird. Die permanente Reizüberflutung in Metropolen verleitet Menschen dazu, sich emotional abzuschirmen und zwischenmenschliche Kontakte im öffentlichen Raum auf ein Minimum zu reduzieren. Stadtplaner experimentieren daher zunehmend mit Begegnungszonen, die zufällige Gespräche und soziales Miteinander gezielt fördern."
    }
  ]
};

// Standard-Alias für Abwärtskompatibilität
TEXTS_DATABASE.examTexts = TEXTS_DATABASE.standardExamTexts;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TEXTS_DATABASE };
}
