import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CaseStudyNav } from "./components/CaseStudyNav";
import { ImageLightbox, useImageLightbox } from "./components/ImageLightbox";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const displayAssetUrl = (path) => assetUrl(path.replace(/\.png$/, ".webp"));
const ease = [0.22, 1, 0.36, 1];
const images = Array.from({ length: 8 }, (_, index) => `images/mortal-shell-2/ms2-proof-${String(index + 1).padStart(2, "0")}.png`);

const copy = {
  en: {
    dir: "ltr",
    language: "العربية",
    languageHint: "View this page in Arabic",
    portfolio: "Portfolio",
    back: "Back to portfolio",
    eyebrow: "Arabic localization / work in progress",
    title: "Mortal Shell II,\nrecasting the unknown\nin Arabic.",
    intro: "An in-progress Arabic localization shaped for a world of fractured memory, harsh combat, and quiet unease. This page is a working record—not a finished release.",
    status: "In active translation & review",
    statusNote: "Selected examples are drawn directly from the current Arabic localization file.",
    proof: "In-game proof",
    processEyebrow: "The work in progress",
    processTitle: "A translation built\nfor pressure, silence,\nand strange discovery.",
    process: "Mortal Shell II moves between dense lore, player-facing combat language, and small moments of discovery. The Arabic needs to carry all three without losing clarity when the player needs it most.",
    focus: [["Narrative", "lore, memory & atmosphere"], ["Combat", "skills, damage & action terms"], ["Interface", "clear Arabic at play speed"]],
    samplesEyebrow: "Selected translation samples",
    samplesTitle: "The words beneath\nthe surface.",
    sourceLabel: "Current source example",
    galleryEyebrow: "Readable screenshot proof",
    galleryTitle: "Every frame,\nshown in full.",
    galleryText: "Each image is kept at its full 16:9 frame with no crop. Open any proof image to inspect the Arabic text at its original resolution.",
    openImage: "Open full image",
    footerKicker: "WIP notice",
    footer: "Mortal Shell II Arabic localization case study by Azaam Alghamdi",
    legal: "This is a work-in-progress portfolio showcase. Mortal Shell II, its original English text, artwork, images, and other game assets remain the property of their respective owners. The Arabic localization samples shown here were created by Azaam for portfolio and demonstration purposes. This project is not affiliated with or endorsed by the game’s rights holders.",
    samples: [
      { type: "World text", en: "A grand chamber full of wealth! Yet the scriptures are bare. No numbers come to me. No names. No record of passage. Only dust, and the shape of things removed.", ar: "قاعة عظيمة زاخرة بالثروات! ومع ذلك، فالصحائف خاوية. لا تتراءى لي أية أرقام. لا أسماء. لا سجلّ لعبور أحد. لا شيء سوى الغبار، وآثار أشياء أُزيلت." },
      { type: "Item flavor", en: "A strange, throbbing sensation emanates from within like distant thunder. Some objects even seem to draw the energy, but only with careful focus.", ar: "ينبعث من الداخل إحساس غريب نابض، أشبه برعد بعيد. حتى إن بعض الأجسام تبدو قادرة على اجتذاب هذه الطاقة، لكن ذلك لا يحدث إلا مع تركيز دقيق." },
      { type: "Narrative", en: "There is no place they favored most. No beloved prison. How strange, to find a traveler without footprints.", ar: "ما من مكان آثره على سواه. ولا سجن أحبّه. ما أغرب أن تجد مسافرًا بلا آثار أقدام." }
    ],
    terms: [["Charged Heavy Attack", "هجوم ثقيل مشحون"], ["Break Damage", "ضرر الكسر"], ["Cosmic Disease", "الداء الكوني"], ["Critical Hit", "الضربة الحرجة"]]
  },
  ar: {
    dir: "rtl",
    language: "English",
    languageHint: "View this page in English",
    portfolio: "الأعمال",
    back: "العودة إلى الأعمال",
    eyebrow: "تعريب عربي / العمل جارٍ",
    title: "مورتال شيل ٢،\nعالم المجهول\nيُصاغ بالعربية.",
    intro: "تعريب عربي قيد العمل لعالم من الذكريات الممزقة والقتال القاسي والقلق الصامت. هذه الصفحة سجلٌّ للعمل الجاري، وليست إصدارًا مكتملًا.",
    status: "الترجمة والمراجعة مستمرتان",
    statusNote: "الأمثلة المختارة معروضة مباشرةً من ملف التعريب العربي الحالي.",
    proof: "دليل من داخل اللعبة",
    processEyebrow: "العمل قيد التنفيذ",
    processTitle: "ترجمة صيغت\nللضغط والصمت\nوالاكتشاف الغريب.",
    process: "تنتقل مورتال شيل ٢ بين قصص كثيفة ولغة قتال يقرأها اللاعب ولحظات اكتشاف صغيرة. على العربية أن تحمل هذه المستويات جميعًا من دون أن تفقد وضوحها حين يحتاجها اللاعب أكثر.",
    focus: [["السرد", "قصص وذاكرة وأجواء"], ["القتال", "مهارات وضرر ومصطلحات حركة"], ["الواجهة", "عربية واضحة بسرعة اللعب"]],
    samplesEyebrow: "نماذج مختارة من الترجمة",
    samplesTitle: "الكلمات الكامنة\nتحت السطح.",
    sourceLabel: "مثال من المصدر الحالي",
    galleryEyebrow: "دليل واضح من لقطات اللعب",
    galleryTitle: "كل لقطة،\nكما هي بالكامل.",
    galleryText: "تُعرض كل صورة بإطارها الكامل بنسبة ١٦:٩ ومن دون قص. يمكنك فتح أي لقطة لقراءة النص العربي بدقتها الأصلية.",
    openImage: "افتح الصورة كاملة",
    footerKicker: "تنبيه: العمل جارٍ",
    footer: "دراسة حالة لتعريب مورتال شيل ٢ من إعداد عزام الغامدي",
    legal: "هذه صفحة عرض قيد العمل ضمن معرض الأعمال. تبقى لعبة Mortal Shell II ونصها الإنجليزي الأصلي وأعمالها الفنية وصورها وغيرها من أصولها ملكًا لأصحاب الحقوق المعنيين. أنشأ عزام نماذج التعريب العربي المعروضة هنا لأغراض معرض الأعمال والعرض التوضيحي. هذا المشروع غير تابع لأصحاب حقوق اللعبة ولا يحظى بتأييدهم.",
    samples: [
      { type: "نصّ من العالم", en: "A grand chamber full of wealth! Yet the scriptures are bare. No numbers come to me. No names. No record of passage. Only dust, and the shape of things removed.", ar: "قاعة عظيمة زاخرة بالثروات! ومع ذلك، فالصحائف خاوية. لا تتراءى لي أية أرقام. لا أسماء. لا سجلّ لعبور أحد. لا شيء سوى الغبار، وآثار أشياء أُزيلت." },
      { type: "وصف عنصر", en: "A strange, throbbing sensation emanates from within like distant thunder. Some objects even seem to draw the energy, but only with careful focus.", ar: "ينبعث من الداخل إحساس غريب نابض، أشبه برعد بعيد. حتى إن بعض الأجسام تبدو قادرة على اجتذاب هذه الطاقة، لكن ذلك لا يحدث إلا مع تركيز دقيق." },
      { type: "سرد", en: "There is no place they favored most. No beloved prison. How strange, to find a traveler without footprints.", ar: "ما من مكان آثره على سواه. ولا سجن أحبّه. ما أغرب أن تجد مسافرًا بلا آثار أقدام." }
    ],
    terms: [["Charged Heavy Attack", "هجوم ثقيل مشحون"], ["Break Damage", "ضرر الكسر"], ["Cosmic Disease", "الداء الكوني"], ["Critical Hit", "الضربة الحرجة"]]
  }
};

function SplitTitle({ children }) {
  return children.split("\n").map((line) => <span key={line}>{line}</span>);
}

export default function MortalShell2Page() {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem("azaam-language") || "en"; } catch { return "en"; }
  });
  const reduceMotion = useReducedMotion();
  const content = copy[language];
  const isArabic = language === "ar";
  const galleryImages = useMemo(() => images.slice(1), []);
  const lightbox = useImageLightbox(images);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = content.dir;
    try { localStorage.setItem("azaam-language", language); } catch { /* Preference is optional. */ }
  }, [language, content.dir]);

  const entrance = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease }
  });

  return (
    <div className={`ms-page ${isArabic ? "ms-page--ar" : ""}`}>
      <a className="ms-skip" href="#ms-main">{isArabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <CaseStudyNav language={language} setLanguage={setLanguage} current="ms2" />

      <main id="ms-main">
        <section className="ms-hero" aria-labelledby="ms-title">
          <div className="ms-hero-aura" aria-hidden="true"></div>
          <div className="ms-shell ms-hero-grid">
            <div className="ms-hero-copy"><motion.p className="ms-kicker" {...entrance()}>{content.eyebrow}</motion.p><motion.h1 id="ms-title" {...entrance(.08)}><SplitTitle>{content.title}</SplitTitle></motion.h1><motion.p className="ms-intro" {...entrance(.16)}>{content.intro}</motion.p><motion.div className="ms-status" {...entrance(.24)}><span aria-hidden="true"></span><div><strong>{content.status}</strong><small>{content.statusNote}</small></div></motion.div></div>
            <motion.figure className="ms-hero-image" {...entrance(.14)}><button className="ms-hero-lightbox" type="button" onClick={() => lightbox.open(images[0])} aria-label={content.openImage}><img src={displayAssetUrl(images[0])} width="2560" height="1440" alt={isArabic ? "لقطة من تعريب مورتال شيل ٢" : "Mortal Shell II Arabic localization screenshot"} /></button><figcaption><span>{content.proof}</span><span>01 / MS II</span></figcaption></motion.figure>
          </div>
        </section>

        <section className="ms-process ms-shell" aria-labelledby="process-title"><div><p className="ms-kicker">{content.processEyebrow}</p><h2 id="process-title"><SplitTitle>{content.processTitle}</SplitTitle></h2></div><div><p className="ms-process-copy">{content.process}</p><div className="ms-focus">{content.focus.map(([title, label]) => <article key={title}><strong>{title}</strong><span>{label}</span></article>)}</div></div></section>

        <section className="ms-samples ms-shell" aria-labelledby="samples-title"><div className="ms-section-title"><p className="ms-kicker">{content.samplesEyebrow}</p><h2 id="samples-title"><SplitTitle>{content.samplesTitle}</SplitTitle></h2></div><div className="ms-sample-list">{content.samples.map((sample) => <article key={sample.en}><p className="ms-sample-type">{sample.type}</p><p className="ms-source-label">{content.sourceLabel}</p><blockquote><p lang="en" dir="ltr">“{sample.en}”</p><span className="ms-arabic-sample" lang="ar" dir="rtl">{sample.ar}</span></blockquote></article>)}</div><div className="ms-terms" aria-label={content.samplesEyebrow}>{content.terms.map(([en, ar]) => <article key={en}><span lang="en" dir="ltr">{en}</span><strong lang="ar" dir="rtl">{ar}</strong></article>)}</div></section>

        <section className="ms-gallery ms-shell" aria-labelledby="gallery-title"><div className="ms-gallery-heading"><p className="ms-kicker">{content.galleryEyebrow}</p><h2 id="gallery-title"><SplitTitle>{content.galleryTitle}</SplitTitle></h2><p>{content.galleryText}</p></div><div className="ms-proof-list">{galleryImages.map((image, index) => <figure key={image}><button className="ms-proof-button" type="button" onClick={() => lightbox.open(image)} aria-label={`${content.openImage} ${index + 2}`}><img src={displayAssetUrl(image)} width="2560" height="1440" alt={isArabic ? `لقطة ${index + 2} من تعريب مورتال شيل ٢` : `Mortal Shell II Arabic localization screenshot ${index + 2}`} loading="lazy" /></button><figcaption><span>{String(index + 2).padStart(2, "0")} / MS II</span><button type="button" onClick={() => lightbox.open(image)}>{content.openImage} <i aria-hidden="true">↗</i></button></figcaption></figure>)}</div></section>
      </main>

      <footer className="ms-footer"><div className="ms-shell"><p className="ms-credit">© {new Date().getFullYear()} — {content.footer}</p><div><p className="ms-kicker">{content.footerKicker}</p><p className="ms-legal">{content.legal}</p></div></div></footer>
      <ImageLightbox images={images} index={lightbox.index} onClose={lightbox.close} onNext={lightbox.next} onPrevious={lightbox.previous} assetUrl={assetUrl} language={language} />
    </div>
  );
}
