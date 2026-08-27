import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CaseStudyNav } from "./components/CaseStudyNav";
import { ImageLightbox, useImageLightbox } from "./components/ImageLightbox";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const displayAssetUrl = (path) => assetUrl(path.replace(/\.png$/, ".webp"));
const ease = [0.22, 1, 0.36, 1];
const workshopUrl = "https://steamcommunity.com/sharedfiles/filedetails/?id=3641916210";

const pageCopy = {
  en: {
    dir: "ltr",
    switchLabel: "العربية",
    switchHint: "View this page in Arabic",
    portfolio: "Portfolio",
    return: "Back to portfolio",
    kicker: "Localization case study / 01",
    title: "A survival world,\nmade at home in Arabic.",
    intro: "An unofficial Arabic localization for Don't Starve Together, shaped around its sharp humor, eerie world, and the small words players rely on while surviving.",
    workshop: "See the Workshop release",
    notes: "Read the translation notes",
    screenshot: "An Arabic in-game moment",
    recordKicker: "The field record",
    recordTitle: "Translation that stays alive in play.",
    record: "From a character's voice to a crafting prompt, every line was considered in context. The goal was not simply to convert text, but to let Arabic players feel the same strange, tense, playful world.",
    highlightsTitle: "What the project covers",
    voicesKicker: "Meet the voices",
    voicesTitle: "Two survivors.\nTwo distinct Arabic voices.",
    voices: "Wilson's confident scientific rhythm and Wendy's quiet, haunted voice need different treatment. Their Arabic lines were shaped to keep those personalities present.",
    galleryKicker: "Translation proof",
    galleryTitle: "The details\nthat carry a world.",
    quoteKicker: "A line from the Constant",
    quoteButton: "Draw another line",
    notesKicker: "Translation notes",
    notesTitle: "Built for the moment\nit is played.",
    closeKicker: "Made with care for Arabic players",
    closeTitle: "The Constant\nnow speaks Arabic.",
    closeText: "Explore the full community release, then return when the next translated world is ready.",
    closeButton: "View on Steam Workshop",
    attribution: "Rights & attribution",
    footer: "Arabic localization case study by Azaam Alghamdi",
    legal: "Don't Starve Together, its characters, original English text, artwork, images, and other game assets are the property of Klei Entertainment. The Arabic localization showcased on this page was created by Azaam for portfolio and demonstration purposes. This project is not affiliated with or endorsed by Klei Entertainment.",
    highlights: [["~85,000", "localized strings"], ["Voice first", "dialogue, lore & humor"], ["In context", "UI, crafting & gameplay review"], ["One world", "consistent terminology"]],
    notesList: [["Character voice", "Each survivor has their own cadence. Arabic wording follows the character before it follows a literal structure."], ["Useful at a glance", "Crafting, survival prompts, and interface language remain clear at the speed of play."], ["A connected lexicon", "Items, creatures, and mechanics use consistent Arabic, so knowledge carries from one moment to the next."]]
  },
  ar: {
    dir: "rtl",
    switchLabel: "English",
    switchHint: "عرض هذه الصفحة بالإنجليزية",
    portfolio: "الأعمال",
    return: "العودة إلى الأعمال",
    kicker: "دراسة حالة في الترجمة / ٠١",
    title: "عالمٌ للبقاء،\nيتحدث العربية كما لو كان موطنه.",
    intro: "تعريب عربي غير رسمي للعبة «دونت ستارف توغيذر»، صُمّم ليحافظ على حسّها الساخر وعالمها المقلق والكلمات الصغيرة التي يعتمد عليها اللاعب أثناء البقاء.",
    workshop: "شاهد الإصدار على الورشة",
    notes: "اقرأ ملاحظات الترجمة",
    screenshot: "لقطة من اللعبة باللغة العربية",
    recordKicker: "سجلّ المشروع",
    recordTitle: "ترجمة تبقى حيّة أثناء اللعب.",
    record: "من صوت كل شخصية إلى تعليمات الصنع، نُظِر إلى كل سطر ضمن سياقه. لم يكن الهدف تحويل النص فقط، بل أن يعيش اللاعب العربي العالم الغريب والمشوق والمرح نفسه.",
    highlightsTitle: "ما الذي يشمله المشروع؟",
    voicesKicker: "تعرّف على الأصوات",
    voicesTitle: "ناجيان.\nصوتان عربيان مختلفان.",
    voices: "إيقاع ويلسون العلمي الواثق وصوت ويندي الهادئ والمفجوع يتطلبان معالجة مختلفة. صيغت سطورهما العربية ليبقى حضور كل شخصية واضحًا.",
    galleryKicker: "دليل من الترجمة",
    galleryTitle: "تفاصيل صغيرة\nتحمل عالمًا كاملًا.",
    quoteKicker: "سطر من عالم ذا كونستانت",
    quoteButton: "اسحب سطرًا آخر",
    notesKicker: "ملاحظات الترجمة",
    notesTitle: "صُمّمت للحظة\nالتي تُلعب فيها.",
    closeKicker: "صُنعت بعناية للاعبين العرب",
    closeTitle: "عالم ذا كونستانت\nيتحدث العربية الآن.",
    closeText: "استكشف إصدار المجتمع الكامل، ثم عُد عندما يصبح العالم المترجَم التالي جاهزًا.",
    closeButton: "شاهدها على ورشة ستيم",
    attribution: "الحقوق ونسبة الملكية",
    footer: "دراسة حالة للتعريب العربي من إعداد عزام الغامدي",
    legal: "لعبة Don't Starve Together وشخصياتها والنص الإنجليزي الأصلي والأعمال الفنية والصور وغيرها من أصول اللعبة هي ملك لشركة Klei Entertainment. أُنجز التعريب العربي المعروض في هذه الصفحة من قِبل عزام لأغراض معرض الأعمال والعرض التوضيحي. هذا المشروع غير تابع لشركة Klei Entertainment ولا يحظى بتأييدها.",
    highlights: [["+٨٥,٠٠٠", "سطر مترجم تقريبًا"], ["الصوت أولًا", "حوار وقصص وفكاهة"], ["ضمن السياق", "مراجعة الواجهة والصنع واللعب"], ["عالم واحد", "مصطلحات متسقة"]],
    notesList: [["صوت الشخصية", "لكل ناجٍ إيقاعه الخاص. تتبع الصياغة العربية الشخصية قبل أن تتبع البنية الحرفية."], ["وضوح في لحظته", "حافظت تعليمات الصنع والبقاء ولغة الواجهة على وضوحها بالسرعة التي يتطلبها اللعب."], ["معجم متصل", "تستخدم العناصر والمخلوقات والأنظمة العربية نفسها باستمرار، كي تتراكم معرفة اللاعب من لحظة إلى أخرى."]]
  }
};

const characters = [
  {
    id: "wilson",
    image: "images/dst/dst-proof-02.png",
    en: { name: "Wilson P. Higgsbury", title: "The Gentleman Scientist", description: "An ambitious scientist whose certainty makes every discovery feel like an experiment worth attempting.", traits: ["Grows a magnificent beard", "A curious, confident scientific voice"], quote: "Stand back. I'm going to do SCIENCE!", arabicQuote: "تراجعوا.. سأقوم ببعض العلوم!" },
    ar: { name: "ويلسون بي. هيغسبري", title: "العالم النبيل", description: "عالِم طموح يجعل يقينه كل اكتشاف تجربة تستحق المحاولة.", traits: ["ينمي لحية رائعة", "صوت علمي فضولي وواثق"], quote: "Stand back. I'm going to do SCIENCE!", arabicQuote: "تراجعوا.. سأقوم ببعض العلوم!" }
  },
  {
    id: "wendy",
    image: "images/dst/dst-proof-03.png",
    en: { name: "Wendy Carter", title: "The Bereaved", description: "A melancholy survivor accompanied by the memory—and spirit—of her twin sister, Abigail.", traits: ["Haunted by her twin sister", "Feels comfortable in the dark"], quote: "I carry on for Abigail's sake.", arabicQuote: "أنا مستمرة من أجل أبيغيل." },
    ar: { name: "ويندي كارتر", title: "المفجوعة", description: "ناجية حزينة ترافقها ذكرى—وروح—أختها التوأم أبيغيل.", traits: ["تطاردها أختها التوأم", "تشعر بالراحة في الظلام"], quote: "I carry on for Abigail's sake.", arabicQuote: "أنا مستمرة من أجل أبيغيل." }
  }
];

const quotes = [
  { character: "Wilson", en: "I'll conquer this world with the power of my MIND!", ar: "سأغزو هذا العالم بقوة عقلي!" },
  { character: "Wilson", en: "There is a scientific solution, here. I know it.", ar: "هناك حل علمي هنا. أنا أعلم ذلك." },
  { character: "Wendy", en: "Abigail? Come back! I'm not done playing with you.", ar: "أبيغيل؟ عودي! لم أنته من اللعب معك." },
  { character: "Wendy", en: "Shadows are as black as ink, or night, or nightmares.", ar: "الظلال سوداء كالحبر، أو كالليل، أو كالكوابيس." }
];

const proofImages = Array.from({ length: 6 }, (_, index) => `images/dst/dst-proof-${String(index + 1).padStart(2, "0")}.png`);
const gallery = proofImages.slice(3);

function SplitTitle({ children }) {
  return children.split("\n").map((line) => <span key={line}>{line}</span>);
}

export default function DstPage() {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem("azaam-language") || "en"; } catch { return "en"; }
  });
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const reduceMotion = useReducedMotion();
  const text = pageCopy[language];
  const isArabic = language === "ar";
  const characterCards = useMemo(() => characters.map((character) => ({ ...character, copy: character[language] })), [language]);
  const lightbox = useImageLightbox(proofImages);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = text.dir;
    try { localStorage.setItem("azaam-language", language); } catch { /* Preference is optional. */ }
  }, [language, text.dir]);

  const drawQuote = () => {
    setQuoteIndex((current) => {
      let next = current;
      while (next === current && quotes.length > 1) next = Math.floor(Math.random() * quotes.length);
      return next;
    });
  };

  const entrance = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease }
  });

  return (
    <div className={`dst-page ${isArabic ? "dst-page--ar" : ""}`}>
      <a className="dst-skip" href="#dst-main">{isArabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <CaseStudyNav language={language} setLanguage={setLanguage} current="dst" />

      <main id="dst-main">
        <section className="dst-hero" aria-labelledby="dst-title">
          <div className="dst-ember dst-ember--a" aria-hidden="true"></div><div className="dst-ember dst-ember--b" aria-hidden="true"></div>
          <div className="dst-shell dst-hero-grid">
            <div className="dst-hero-copy">
              <motion.p className="dst-kicker" {...entrance()}>{text.kicker}</motion.p>
              <motion.h1 id="dst-title" {...entrance(0.08)}><SplitTitle>{text.title}</SplitTitle></motion.h1>
              <motion.p className="dst-intro" {...entrance(0.16)}>{text.intro}</motion.p>
              <motion.div className="dst-actions" {...entrance(0.24)}>
                <a className="dst-button dst-button--ember" href={workshopUrl} target="_blank" rel="noreferrer">{text.workshop} <i aria-hidden="true">↗</i></a>
                <a className="dst-inline-link" href="#translation-notes">{text.notes} <i aria-hidden="true">↓</i></a>
              </motion.div>
            </div>
            <motion.figure className="dst-hero-shot" {...entrance(0.14)}>
              <div><img src={displayAssetUrl("images/dst/dst-proof-01.png")} width="2560" height="1440" alt="Don't Starve Together with Arabic localization" /><i className="firefly firefly--one" aria-hidden="true"></i><i className="firefly firefly--two" aria-hidden="true"></i></div>
              <figcaption><span>{text.screenshot}</span><span>01 / DST</span></figcaption>
            </motion.figure>
          </div>
        </section>

        <section className="dst-record dst-shell" aria-labelledby="record-title">
          <div><p className="dst-kicker">{text.recordKicker}</p><h2 id="record-title">{text.recordTitle}</h2></div>
          <div><p className="dst-record-copy">{text.record}</p><div className="dst-highlights" aria-label={text.highlightsTitle}>{text.highlights.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div></div>
        </section>

        <section className="dst-voices dst-shell" aria-labelledby="voices-title">
          <div className="dst-section-heading"><p className="dst-kicker">{text.voicesKicker}</p><h2 id="voices-title"><SplitTitle>{text.voicesTitle}</SplitTitle></h2><p>{text.voices}</p></div>
          <div className="dst-characters">
            {characterCards.map((character, index) => (
              <motion.article className={`dst-character dst-character--${character.id}`} key={character.id} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.1, ease }}>
                <div className="dst-character-shot"><img src={displayAssetUrl(character.image)} width="2560" height="1440" alt={isArabic ? `${character.copy.name} في لقطة معرّبة من اللعبة` : `${character.copy.name} shown in an Arabic-localized game screenshot`} loading="lazy" /><span>0{index + 1}</span></div>
                <div className="dst-character-copy"><p className="dst-character-role">{character.copy.title}</p><h3>{character.copy.name}</h3><p>{character.copy.description}</p><ul>{character.copy.traits.map((trait) => <li key={trait}>{trait}</li>)}</ul><blockquote><p lang="en" dir="ltr">“{character.copy.quote}”</p><span className="dst-arabic-line" lang="ar" dir="rtl">{character.copy.arabicQuote}</span></blockquote></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="dst-gallery dst-shell" aria-labelledby="gallery-title"><div className="dst-gallery-intro"><p className="dst-kicker">{text.galleryKicker}</p><h2 id="gallery-title"><SplitTitle>{text.galleryTitle}</SplitTitle></h2></div><div className="dst-gallery-grid">{gallery.map((image, index) => <figure key={image}><button className="dst-gallery-button" type="button" onClick={() => lightbox.open(image)} aria-label={isArabic ? `افتح لقطة التعريب ${index + 4}` : `Open localization screenshot ${index + 4}`}><img src={displayAssetUrl(image)} width="2560" height="1440" alt={isArabic ? `لقطة من التعريب العربي ${index + 4}` : `Arabic localization screenshot ${index + 4}`} loading="lazy" /></button><figcaption>0{index + 4} / DST <span>{isArabic ? "عرض كامل" : "View full"} ↗</span></figcaption></figure>)}</div></section>

        <section className="dst-quote-section" aria-labelledby="quote-title"><div className="dst-shell dst-quote-layout"><div><p className="dst-kicker">{text.quoteKicker}</p><h2 id="quote-title">{quotes[quoteIndex].character}</h2><button type="button" onClick={drawQuote}>{text.quoteButton} <i aria-hidden="true">↻</i></button></div><motion.blockquote className="dst-quote-card" aria-live="polite" key={`${language}-${quoteIndex}`} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, ease }}><p lang="en" dir="ltr">“{quotes[quoteIndex].en}”</p><span className="dst-arabic-line" lang="ar" dir="rtl">{quotes[quoteIndex].ar}</span></motion.blockquote></div></section>

        <section className="dst-notes dst-shell" id="translation-notes" aria-labelledby="notes-title"><div className="dst-notes-title"><p className="dst-kicker">{text.notesKicker}</p><h2 id="notes-title"><SplitTitle>{text.notesTitle}</SplitTitle></h2></div><div className="dst-notes-grid">{text.notesList.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

        <section className="dst-closing" aria-labelledby="closing-title"><div className="dst-shell"><p className="dst-kicker">{text.closeKicker}</p><h2 id="closing-title"><SplitTitle>{text.closeTitle}</SplitTitle></h2><p>{text.closeText}</p><a className="dst-button dst-button--paper" href={workshopUrl} target="_blank" rel="noreferrer">{text.closeButton} <i aria-hidden="true">↗</i></a></div></section>
      </main>

      <footer className="dst-footer"><div className="dst-shell"><p className="dst-credit">© {new Date().getFullYear()} — {text.footer}</p><div><p className="dst-kicker">{text.attribution}</p><p className="dst-legal">{text.legal}</p></div></div></footer>
      <ImageLightbox images={proofImages} index={lightbox.index} onClose={lightbox.close} onNext={lightbox.next} onPrevious={lightbox.previous} assetUrl={assetUrl} language={language} />
    </div>
  );
}
