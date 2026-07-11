export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Translation lab", href: "#translation-lab" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" }
];

export const projects = [
  {
    id: "dst",
    index: "01",
    title: "Don't Starve Together",
    subtitle: "Full unofficial Arabic localization mod",
    type: "Survival · Narrative · UI",
    strings: "~85,000 strings",
    image: "images/dst.png",
    imageAlt: "Don't Starve Together with Arabic localization",
    description:
      "A complete Arabic localization covering UI, character dialogue, lore entries, item descriptions, crafting text, and gameplay terminology. The translation preserves the strange, dark, humorous tone of the original while staying natural for Arabic players.",
    highlights: [
      "Full unofficial Arabic localization",
      "UI, dialogue, lore, items, crafting, and gameplay text",
      "Tone, humor, and terminology consistency",
      "In-game testing and revision"
    ],
    tags: ["Translation", "Terminology", "In-game review"],
    href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3641916210",
    linkLabel: "View on Steam Workshop"
  },
  {
    id: "ds",
    index: "02",
    title: "Don't Starve",
    subtitle: "Full unofficial Arabic localization mod",
    type: "Survival · Dark fantasy",
    strings: "~44,000 strings",
    image: "images/ds.png",
    imageAlt: "Don't Starve with Arabic localization",
    description:
      "A complete Arabic localization for the original Don't Starve, adapting its survival mechanics, dark fantasy tone, strange humor, and UI into natural Arabic while keeping the original atmosphere intact.",
    highlights: [
      "Full unofficial Arabic localization",
      "Consistent terminology with Don't Starve Together",
      "Gameplay systems, dialogue, items, world interactions, and UI",
      "In-game review and correction"
    ],
    tags: ["Translation", "Gameplay text", "Consistency"],
    href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3704921982",
    linkLabel: "View on Steam Workshop"
  },
  {
    id: "obscure",
    index: "03",
    title: "Obscure",
    subtitle: "Full unofficial Arabic localization",
    type: "Survival horror",
    strings: "~3,000 strings",
    image: "images/obscure.png",
    imageAlt: "Arabic title card for Obscure",
    description:
      "A complete Arabic localization for the 2005 survival horror game Obscure, preserving the horror atmosphere, character dialogue, school setting, puzzle instructions, and narrative tension.",
    highlights: ["Story, dialogue, menus, and puzzle text", "Horror-tone adaptation", "Gameplay-context review"],
    tags: ["Narrative", "Horror", "QA"],
    href: "https://youtu.be/EPQiBmMiE8w",
    linkLabel: "Watch showcase"
  },
  {
    id: "obscure-2",
    index: "04",
    title: "ObsCure II: Aftermath",
    subtitle: "Full unofficial Arabic localization",
    type: "Horror narrative",
    strings: "~3,000 strings",
    image: "images/obscure2.png",
    imageAlt: "Arabic title card for ObsCure II: Aftermath",
    description:
      "A full Arabic localization that continues the horror series with attention to story continuity, tone, dialogue style, and naturally immersive Arabic inside the survival-horror experience.",
    highlights: ["Dialogue, menus, and in-game text", "Character voice and tense horror scenes", "Terminology continuity"],
    tags: ["Narrative", "Continuity", "LQA"],
    href: "https://youtu.be/BLvX2O0kuvM",
    linkLabel: "Watch showcase"
  }
];

export const translationSamples = [
  {
    id: "narrative",
    label: "Narrative",
    source: [
      "While toiling away in his home laboratory late one night, Wilson was startled to hear a voice on the radio speaking directly to him.",
      "At first he feared he'd gone mad from too many late nights of experiments and accidentally-inhaled chemical fumes, but the voice assured him that it was no mere figment of the imagination.",
      "Well, at least not in this world."
    ],
    arabic: [
      "بينما كان ويلسون يكدّ في مختبره المنزلي في ساعةٍ متأخرة من الليل، فُوجئ بسماع صوتٍ في الراديو يخاطبه مباشرة.",
      "في البداية خشي أن يكون قد فقد صوابه بسبب ليالي التجارب الطويلة وأبخرة المواد الكيميائية التي استنشقها دون قصد، لكن الصوت أكّد له أنه ليس مجرّد وهمٍ من خياله.",
      "حسنًا… على الأقل، ليس في هذا العالم."
    ],
    note: "Tone, rhythm, and storytelling are carried across—not translated word for word."
  },
  {
    id: "dialogue",
    label: "Dialogue",
    source: [
      "Wendy's tale of woe began with the untimely loss of her dear sister Abigail.",
      "Unable to accept the thought of life without her twin, Wendy began turning to the occult in the hopes of finding some way to communicate with the other side.",
      "Until finally, there was a sign."
    ],
    arabic: [
      "بدأت حكاية معاناة ويندي مع الفقد المبكر لأختها العزيزة أبيغيل.",
      "وعاجزةً عن تقبّل فكرة الحياة دون توأمها، لجأت ويندي إلى الخفايا أملًا في إيجاد وسيلةٍ للتواصل مع العالم الآخر.",
      "إلى أن ظهر أخيرًا دليلٌ ما."
    ],
    note: "Character voice stays intimate and deliberate while reading naturally in Arabic."
  },
  {
    id: "voice",
    label: "Character voice",
    source: [
      "We nearly lost one of our number today. In a mad daze I created... something... that managed to pull our friend back to the land of the living, but... whatever it was, I fear I cannot rightfully say it was within the realm of science..."
    ],
    arabic: [
      "كدنا نفقد أحدنا اليوم. في حالة ذهول مجنون، صنعت... شيئًا... تمكن من إعادة صديقنا إلى أرض الأحياء، لكن... أيًا كان ذلك الشيء، أخشى أنني لا أستطيع القول حقًا إنه كان ضمن نطاق العلم..."
    ],
    note: "Pacing, pauses, and personality are part of the localization."
  },
  {
    id: "ui",
    label: "UI & terminology",
    source: ["The Gnaw's demands know no end."],
    arabic: ["مطالب النَّهَّاش لا تنتهي."],
    note: "Short player-facing copy stays readable, evocative, and consistent with the project glossary."
  }
];

export const skills = [
  "Arabic game localization",
  "English → Arabic game translation",
  "Modern Standard Arabic",
  "Dialogue localization",
  "Lore & narrative localization",
  "UI & gameplay text localization",
  "Item names & descriptions",
  "Terminology consistency",
  "Localization testing",
  "Steam Workshop localization mods",
  "PO file workflows",
  "Crowdin familiarity",
  "Arabic RTL awareness",
  "Font & readability awareness",
  "GitHub basics",
  "Game modding workflow awareness"
];

export const capabilities = [
  {
    number: "01",
    title: "Narrative & dialogue",
    description: "Natural Modern Standard Arabic that keeps character voice, pacing, humor, and emotional weight intact.",
    accent: "mint"
  },
  {
    number: "02",
    title: "UI & gameplay text",
    description: "Player-facing language shaped for clarity, brevity, and the context of the actual game.",
    accent: "blue"
  },
  {
    number: "03",
    title: "Terminology systems",
    description: "Glossaries and consistent naming across mechanics, items, characters, and recurring concepts.",
    accent: "amber"
  },
  {
    number: "04",
    title: "RTL & font fitting",
    description: "Arabic shaping, punctuation, readability, direction, and screen-space checks.",
    accent: "violet"
  },
  {
    number: "05",
    title: "In-game LQA",
    description: "Review where it matters: inside the live game experience, not only a spreadsheet.",
    accent: "coral"
  },
  {
    number: "06",
    title: "Release-ready workflow",
    description: "PO files, string tables, context notes, revision passes, and mod-release handoff.",
    accent: "mint"
  }
];

export const tools = [
  { mark: "PO", title: "PO file workflows", description: "Structured strings, context notes, fuzzy entries, and revision passes without losing formatting." },
  { mark: "CR", title: "Crowdin familiarity", description: "Translation platforms, project context, glossary use, and collaborative review flows." },
  { mark: "CSV", title: "Spreadsheets & string tables", description: "Tracking notes, variants, and terminology decisions through large batches of game text." },
  { mark: "QA", title: "In-game testing", description: "Checking line breaks, UI fit, tone, context, and player-facing clarity in the actual experience." },
  { mark: "RTL", title: "Arabic RTL checks", description: "Reviewing Arabic shaping, readability, punctuation, layout direction, and text length concerns." },
  { mark: "GH", title: "GitHub & releases", description: "Managing project files, update history, workshop releases, and handoff-ready packages." }
];

export const workflow = [
  {
    number: "01",
    title: "Understand tone & context",
    description: "Study the game’s setting and writing style—whether it is dark, humorous, dramatic, mysterious, casual, or technical."
  },
  {
    number: "02",
    title: "Build consistent terminology",
    description: "Create a working glossary for items, mechanics, characters, and recurring terms before inconsistency can grow."
  },
  {
    number: "03",
    title: "Translate with the player in mind",
    description: "Keep UI and gameplay language brief and clear, while narrative Arabic retains the original emotional weight."
  },
  {
    number: "04",
    title: "Review in gameplay context",
    description: "Check text in the game whenever possible to catch line breaks, tone mismatches, and context errors."
  },
  {
    number: "05",
    title: "Revise for clarity & consistency",
    description: "Use a dedicated revision pass to tighten phrasing and keep terminology coherent from start to finish."
  },
  {
    number: "06",
    title: "Preserve creative direction",
    description: "The goal is not to rewrite: it is to give Arabic players the original experience, naturally."
  }
];
