import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { translationSamples } from "../data/portfolio";
import { Reveal } from "./Reveal";

export function TranslationLab({ activeId, onSelect }) {
  const activeSample = translationSamples.find((sample) => sample.id === activeId) ?? translationSamples[0];
  const reduceMotion = useReducedMotion();

  const moveTab = (event, currentIndex) => {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % translationSamples.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + translationSamples.length) % translationSamples.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = translationSamples.length - 1;
    if (nextIndex === currentIndex && !["Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const next = translationSamples[nextIndex];
    onSelect(next.id);
    document.getElementById(`translation-tab-${next.id}`)?.focus();
  };

  return (
    <Reveal className="translation-lab">
      <div className="sample-tabs" role="tablist" aria-label="Translation sample category">
        {translationSamples.map((sample, index) => {
          const active = sample.id === activeSample.id;
          return (
            <button
              key={sample.id}
              type="button"
              role="tab"
              tabIndex={active ? 0 : -1}
              aria-selected={active}
              aria-controls="translation-panel"
              id={`translation-tab-${sample.id}`}
              onClick={() => onSelect(sample.id)}
              onKeyDown={(event) => moveTab(event, index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{sample.label}</b>
              {active && <motion.i className="tab-active" layoutId="active-translation-tab" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="translation-spread"
          id="translation-panel"
          role="tabpanel"
          aria-labelledby={`translation-tab-${activeSample.id}`}
          key={activeSample.id}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sample-pane sample-pane--source">
            <p className="sample-label"><span>EN</span> Original copy</p>
            <div>{activeSample.source.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>

          <div className="translation-axis" aria-hidden="true">
            <span>EN</span>
            <i>→</i>
            <span lang="ar">ع</span>
          </div>

          <div className="sample-pane sample-pane--arabic" lang="ar" dir="rtl">
            <p className="sample-label"><span>ع</span> الترجمة العربية</p>
            <div>{activeSample.arabic.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>

          <div className="sample-note">
            <span>Translator&apos;s note</span>
            <p>{activeSample.note}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Reveal>
  );
}
