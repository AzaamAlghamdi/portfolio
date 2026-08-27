import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll } from "motion/react";
import { capabilities, projects, translationSamples, workflow } from "./data/portfolio";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const ease = [0.22, 1, 0.36, 1];

const copy = {
  en: {
    dir: "ltr", skip: "Skip to content", role: "Arabic game localization",
    nav: { work: "Worlds", proof: "Translation lab", process: "Method", contact: "Contact" },
    menu: "Open navigation", close: "Close navigation", switchLanguage: "View this site in Arabic", language: "العربية",
    available: "Available for selected collaborations",
    heroEyebrow: "English → Arabic · Games · Narrative · LQA",
    heroTitle: ["I don't translate words.", "I rebuild worlds", "in Arabic."],
    heroText: "Game localization shaped around character voice, player context, and the exact moment a line appears on screen.",
    heroPrimary: "Explore the worlds", heroSecondary: "Current project", heroProof: "Live localization proof",
    total: "135K+", totalLabel: "strings translated & reviewed", released: "4", releasedLabel: "released Arabic projects", pair: "EN → AR", pairLabel: "translation, terminology & LQA",
    signal: "Now translating", signalProject: "Mortal Shell II", signalState: "Work in progress · translation & review",
    workEyebrow: "01 / Selected worlds", workTitle: "Every project gets its own language—and its own atmosphere.", workText: "Finished releases and active work, presented through real in-game proof.",
    caseStudy: "Open case study", external: "View release", wip: "Work in progress", complete: "Released",
    proofEyebrow: "02 / Translation lab", proofTitle: "Switch the context. Watch the Arabic voice change with it.", proofText: "Narrative, dialogue, character voice, and UI cannot share one rhythm. Select a mode to compare how tone and purpose shape the translation.",
    source: "English source", translation: "Arabic localization", note: "Localization decision",
    processEyebrow: "03 / Method", processTitle: "A careful system for creative work.", processText: "Each step protects something players notice: clarity, voice, consistency, or fit.", processLabel: "Stage", capabilityLabel: "Protects", services: "Core capabilities",
    contactEyebrow: "04 / Start a conversation", contactTitle: "Your Arabic audience is already waiting.", contactText: "Available for Arabic localization, linguistic QA, contextual review, and full-title collaboration.",
    email: "Email Azaam", pdf: "Download portfolio PDF", footer: "Arabic game localization by Azaam Alghamdi", top: "Back to top"
  },
  ar: {
    dir: "rtl", skip: "انتقل إلى المحتوى", role: "تعريب ألعاب الفيديو",
    nav: { work: "العوالم", proof: "مختبر الترجمة", process: "المنهج", contact: "التواصل" },
    menu: "افتح قائمة التنقل", close: "أغلق قائمة التنقل", switchLanguage: "View this site in English", language: "English",
    available: "متاح لتعاونات مختارة",
    heroEyebrow: "الإنجليزية ← العربية · ألعاب · سرد · مراجعة لغوية",
    heroTitle: ["لا أترجم الكلمات فقط.", "بل أعيد بناء العوالم", "باللغة العربية."],
    heroText: "تعريب ألعاب يصغي إلى صوت الشخصية وسياق اللاعب واللحظة الدقيقة التي يظهر فيها النص على الشاشة.",
    heroPrimary: "استكشف العوالم", heroSecondary: "المشروع الحالي", heroProof: "دليل حي من التعريب",
    total: "+١٣٥ ألف", totalLabel: "سطر مترجم ومراجع", released: "٤", releasedLabel: "مشاريع عربية منشورة", pair: "EN → AR", pairLabel: "ترجمة ومصطلحات ومراجعة لغوية",
    signal: "أعمل الآن على", signalProject: "مورتال شيل ٢", signalState: "قيد العمل · ترجمة ومراجعة",
    workEyebrow: "٠١ / عوالم مختارة", workTitle: "لكل مشروع لغته الخاصة—وأجواؤه الخاصة.", workText: "إصدارات مكتملة وأعمال جارية، موثقة بلقطات حقيقية من داخل اللعبة.",
    caseStudy: "افتح دراسة الحالة", external: "شاهد الإصدار", wip: "قيد العمل", complete: "منشور",
    proofEyebrow: "٠٢ / مختبر الترجمة", proofTitle: "غيّر السياق، وراقب كيف يتغيّر الصوت العربي معه.", proofText: "للسرد والحوار وصوت الشخصية والواجهة إيقاعات مختلفة. اختر النمط لترى كيف تصوغ النبرة والوظيفة قرار الترجمة.",
    source: "النص الإنجليزي", translation: "التعريب العربي", note: "قرار الترجمة",
    processEyebrow: "٠٣ / المنهج", processTitle: "نظام دقيق لعمل إبداعي.", processText: "تحمي كل مرحلة شيئًا يلاحظه اللاعب: الوضوح أو الصوت أو الاتساق أو الملاءمة.", processLabel: "المرحلة", capabilityLabel: "ما تحميه", services: "القدرات الأساسية",
    contactEyebrow: "٠٤ / ابدأ الحديث", contactTitle: "جمهورك العربي ينتظر بالفعل.", contactText: "متاح للتعريب العربي والمراجعة اللغوية والمراجعة السياقية والتعاون على الألعاب الكاملة.",
    email: "راسل عزام", pdf: "نزّل ملف الأعمال", footer: "تعريب ألعاب الفيديو من عزام الغامدي", top: "العودة إلى الأعلى"
  }
};

const featuredProjects = [
  { id: "dst", title: "Don't Starve Together", arabicTitle: "دونت ستارف توغيذر", type: "Survival · Narrative · UI", image: "images/dst/dst-proof-01.webp", href: "/dst/", status: "complete", index: "01" },
  { id: "ms2", title: "Mortal Shell II", arabicTitle: "مورتال شيل ٢", type: "Action RPG · Lore · Combat", image: "images/mortal-shell-2/ms2-proof-01.webp", href: "/mortal-shell-2/", status: "wip", index: "02" },
  { id: "ds", title: "Don't Starve", arabicTitle: "دونت ستارف", type: "Survival · Dark fantasy", image: "images/ds.png", href: projects[1].href, status: "complete", external: true, index: "03" },
  { id: "obscure", title: "The Obscure Duology", arabicTitle: "ثنائية المبهم", type: "Survival horror · Narrative", image: "images/obscure.png", href: projects[2].href, status: "complete", external: true, index: "04" }
];

const navLinks = [["work", "#work"], ["proof", "#proof"], ["process", "#process"], ["contact", "#contact"]];

function useLanguage() {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem("azaam-language") || "en"; } catch { return "en"; }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = copy[language].dir;
    try { localStorage.setItem("azaam-language", language); } catch { /* Preference is optional. */ }
  }, [language]);
  return [language, setLanguage];
}

function SiteNav({ language, setLanguage, activeSection }) {
  const [open, setOpen] = useState(false);
  const text = copy[language];
  const isArabic = language === "ar";
  useEffect(() => {
    const close = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="modern-header" id="top">
      <div className="nav-frame">
        <a className="modern-brand" href="#top" onClick={() => setOpen(false)}><span className="brand-orbit" aria-hidden="true"><b>A</b><i>ع</i></span><span>Azaam <small>{text.role}</small></span></a>
        <nav className="modern-nav" aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}>{navLinks.map(([key, href]) => <a key={key} href={href} className={activeSection === key ? "is-active" : ""} aria-current={activeSection === key ? "location" : undefined}>{text.nav[key]}</a>)}</nav>
        <div className="nav-actions"><span className="availability"><i aria-hidden="true"></i>{text.available}</span><button className="language-switch" type="button" onClick={() => setLanguage(isArabic ? "en" : "ar")} aria-label={text.switchLanguage}>{text.language}</button><button className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? text.close : text.menu} onClick={() => setOpen((value) => !value)}><span></span><span></span></button></div>
      </div>
      <AnimatePresence>{open && <motion.nav id="mobile-navigation" className="mobile-navigation" aria-label={isArabic ? "التنقل على الهاتف" : "Mobile navigation"} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .25, ease }}>{navLinks.map(([key, href], index) => <motion.a key={key} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: isArabic ? 12 : -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .045 }}><span>0{index + 1}</span>{text.nav[key]}<i aria-hidden="true">↘</i></motion.a>)}<a className="mobile-project-link" href="/mortal-shell-2/">{text.signalProject}<span>{text.wip}</span></a></motion.nav>}</AnimatePresence>
    </header>
  );
}

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Component = motion[as] || motion.div;
  const reduceMotion = useReducedMotion();
  return <Component className={className} initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .68, delay, ease }}>{children}</Component>;
}

function AppContent() {
  const [language, setLanguage] = useLanguage();
  const [activeSample, setActiveSample] = useState("narrative");
  const [activeSection, setActiveSection] = useState("work");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const text = copy[language];
  const isArabic = language === "ar";
  const sample = translationSamples.find((item) => item.id === activeSample) || translationSamples[0];

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-28% 0px -55%", threshold: [0, .2, .55] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const enter = (delay = 0) => ({ initial: reduceMotion ? false : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: .72, delay, ease } });

  return (
    <div className={`modern-site ${isArabic ? "modern-site--ar" : ""}`}>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true"></motion.div>
      <a className="skip-link" href="#main-content">{text.skip}</a>
      <SiteNav language={language} setLanguage={setLanguage} activeSection={activeSection} />
      <main id="main-content">
        <section className="modern-hero" aria-labelledby="hero-title">
          <div className="ambient ambient--mint" aria-hidden="true"></div><div className="ambient ambient--violet" aria-hidden="true"></div>
          <div className="site-shell hero-grid">
            <div className="hero-content">
              <motion.p className="section-kicker" {...enter()}><span aria-hidden="true"></span>{text.heroEyebrow}</motion.p>
              <motion.h1 id="hero-title" {...enter(.08)}>{text.heroTitle.map((line, index) => index === 1 ? <em key={line}>{line}</em> : <span key={line}>{line}</span>)}</motion.h1>
              <motion.p className="hero-description" {...enter(.16)}>{text.heroText}</motion.p>
              <motion.div className="hero-buttons" {...enter(.24)}><a className="primary-button" href="#work">{text.heroPrimary}<i aria-hidden="true">↓</i></a><a className="secondary-button" href="/mortal-shell-2/">{text.heroSecondary}<i aria-hidden="true">↗</i></a></motion.div>
              <motion.div className="hero-metrics" {...enter(.3)}><div><strong>{text.total}</strong><span>{text.totalLabel}</span></div><div><strong>{text.released}</strong><span>{text.releasedLabel}</span></div><div><strong>{text.pair}</strong><span>{text.pairLabel}</span></div></motion.div>
            </div>
            <motion.div className="hero-portals" initial={reduceMotion ? false : { opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .15, ease }}>
              <a className="portal portal--dst" href="/dst/"><img src={assetUrl("images/dst/dst-proof-01.webp")} width="2560" height="1440" alt="Don't Starve Together Arabic localization" /><span><b>01</b>Don't Starve Together<i aria-hidden="true">↗</i></span></a>
              <a className="portal portal--ms" href="/mortal-shell-2/"><img src={assetUrl("images/mortal-shell-2/ms2-proof-01.webp")} width="2560" height="1440" alt="Mortal Shell II Arabic localization work in progress" /><span><b>02</b>Mortal Shell II<i aria-hidden="true">↗</i></span></a>
              <div className="hero-proof-chip"><span lang="ar" dir="rtl">العربية</span><small>{text.heroProof}</small></div>
            </motion.div>
          </div>
          <motion.a className="current-signal" href="/mortal-shell-2/" {...enter(.38)}><span className="signal-live"><i aria-hidden="true"></i>{text.signal}</span><strong>{text.signalProject}</strong><small>{text.signalState}</small><b aria-hidden="true">↗</b></motion.a>
        </section>

        <section className="worlds-section" id="work" aria-labelledby="worlds-title"><div className="site-shell">
          <Reveal className="section-heading"><p className="section-kicker"><span aria-hidden="true"></span>{text.workEyebrow}</p><div><h2 id="worlds-title">{text.workTitle}</h2><p>{text.workText}</p></div></Reveal>
          <div className="world-grid">{featuredProjects.map((project, index) => <Reveal className={`world-card world-card--${project.id}`} key={project.id} delay={(index % 2) * .06}><a href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noreferrer" : undefined}><div className="world-image"><img src={assetUrl(project.image)} alt={`${project.title} Arabic localization`} loading={index > 1 ? "lazy" : "eager"} /><span className={`status-pill status-pill--${project.status}`}><i aria-hidden="true"></i>{project.status === "wip" ? text.wip : text.complete}</span><b>{project.index}</b></div><div className="world-info"><p>{project.type}</p><h3>{project.title}</h3><span lang="ar" dir="rtl">{project.arabicTitle}</span><div>{project.external ? text.external : text.caseStudy}<i aria-hidden="true">↗</i></div></div></a></Reveal>)}</div>
        </div></section>

        <section className="lab-section" id="proof" aria-labelledby="lab-title"><div className="lab-orb" aria-hidden="true">ع</div><div className="site-shell">
          <Reveal className="section-heading"><p className="section-kicker"><span aria-hidden="true"></span>{text.proofEyebrow}</p><div><h2 id="lab-title">{text.proofTitle}</h2><p>{text.proofText}</p></div></Reveal>
          <Reveal className="modern-lab" delay={.05}><div className="lab-tabs" role="tablist" aria-label={text.proofEyebrow}>{translationSamples.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={activeSample === item.id} onClick={() => setActiveSample(item.id)}><span>0{index + 1}</span>{item.label}</button>)}</div><AnimatePresence mode="wait"><motion.div className="lab-content" key={sample.id} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .3, ease }}><div className="sample-column" lang="en" dir="ltr"><p>{text.source}</p>{sample.source.map((line) => <span key={line}>{line}</span>)}</div><div className="translation-arrow" aria-hidden="true">→</div><div className="sample-column sample-column--arabic" lang="ar" dir="rtl"><p>{text.translation}</p>{sample.arabic.map((line) => <span key={line}>{line}</span>)}</div></motion.div></AnimatePresence><div className="lab-note"><span>{text.note}</span><p>{sample.note}</p></div></Reveal>
        </div></section>

        <section className="process-section" id="process" aria-labelledby="process-title"><div className="site-shell">
          <Reveal className="section-heading"><p className="section-kicker"><span aria-hidden="true"></span>{text.processEyebrow}</p><div><h2 id="process-title">{text.processTitle}</h2><p>{text.processText}</p></div></Reveal>
          <ol className="process-list">{workflow.slice(0, 4).map((step, index) => { const capability = capabilities[index]; return <Reveal as="li" className="process-item" key={step.number} delay={(index % 2) * .04}><span className="process-number">{step.number}</span><div><small>{text.processLabel}</small><h3>{step.title}</h3><p>{step.description}</p></div><div><small>{text.capabilityLabel}</small><h4>{capability.title}</h4><p>{capability.description}</p></div><i aria-hidden="true">↘</i></Reveal>; })}</ol>
          <Reveal className="capability-cloud"><p>{text.services}</p><div>{capabilities.map((item) => <span key={item.title}>{item.title}</span>)}</div></Reveal>
        </div></section>

        <section className="modern-contact" id="contact" aria-labelledby="contact-title"><div className="contact-aura" aria-hidden="true"></div><div className="site-shell contact-grid"><Reveal><p className="section-kicker"><span aria-hidden="true"></span>{text.contactEyebrow}</p><h2 id="contact-title">{text.contactTitle}</h2><p>{text.contactText}</p></Reveal><Reveal className="contact-links" delay={.08}><a className="primary-button primary-button--light" href="mailto:contact@azaamworks.com">{text.email}<i aria-hidden="true">↗</i></a><a href={assetUrl("Portfolio.pdf")} download>{text.pdf}<i aria-hidden="true">↓</i></a><a href="mailto:contact@azaamworks.com">contact@azaamworks.com</a></Reveal></div></section>
      </main>
      <footer className="modern-footer"><div className="site-shell"><p>© {new Date().getFullYear()} / {text.footer}</p><div><a href="https://github.com/AzaamAlghamdi" target="_blank" rel="noreferrer">GitHub ↗</a><a href="#top">{text.top} ↑</a></div></div></footer>
    </div>
  );
}

export default function App() { return <MotionConfig reducedMotion="user"><AppContent /></MotionConfig>; }
