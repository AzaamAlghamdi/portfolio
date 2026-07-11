import { useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { Header } from "./components/Header";
import { ProjectChapter, DuologyChapter } from "./components/ProjectChapter";
import { Reveal } from "./components/Reveal";
import { SectionHeading } from "./components/SectionHeading";
import { TranslationLab } from "./components/TranslationLab";
import { capabilities, projects, skills, tools, workflow } from "./data/portfolio";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const ease = [0.22, 1, 0.36, 1];

function AppContent() {
  const [activeSample, setActiveSample] = useState("narrative");
  const reduceMotion = useReducedMotion();

  const enter = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.62, delay, ease }
  });

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-ink hero-ink--blue" aria-hidden="true"></div>
          <div className="hero-ink hero-ink--orange" aria-hidden="true"></div>
          <div className="hero-grid-lines" aria-hidden="true"></div>

          <div className="shell hero-layout">
            <div className="hero-copy">
              <motion.p className="hero-folio" {...enter(0)}>
                <span>Portfolio / 2026</span>
                <span>Azaam Alghamdi</span>
              </motion.p>

              <motion.h1 id="hero-title" {...enter(0.07)}>
                <span>The translation</span>
                <em>disappears.</em>
                <span>The game remains.</span>
              </motion.h1>

              <motion.p className="hero-lede" {...enter(0.16)}>
                English-to-Arabic game localization shaped around voice, context, and the way the final words actually feel in play.
              </motion.p>

              <motion.div className="hero-actions" {...enter(0.24)}>
                <a className="button button--ink" href="#work">See the worlds <span aria-hidden="true">↓</span></a>
                <a className="text-link" href="#translation-proof">Read a translation proof <span aria-hidden="true">↗</span></a>
              </motion.div>

              <motion.div className="hero-language-note" {...enter(0.32)}>
                <span>EN</span>
                <i aria-hidden="true"></i>
                <strong lang="ar" dir="rtl">العربية كما ينبغي أن تُلعب</strong>
              </motion.div>
            </div>

            <motion.div
              className="hero-visual"
              initial={reduceMotion ? false : { opacity: 0, x: 34, rotate: 1.5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.85, delay: 0.14, ease }}
            >
              <span className="hero-arabic-mark" lang="ar" dir="rtl" aria-hidden="true">ع</span>
              <figure className="hero-arch">
                <img src={assetUrl("images/dst.png")} alt="Arabic localization shown inside Don't Starve Together" />
                <figcaption><span>In-game proof</span><span>01 / DST</span></figcaption>
              </figure>
              <div className="hero-proof-stamp" aria-hidden="true">
                <span>135K+</span>
                <small>localized strings</small>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="shell hero-proof-line"
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0.92 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.38, ease }}
          >
            <p><span>Source</span> “The Gnaw&apos;s demands know no end.”</p>
            <span className="proof-arrow" aria-hidden="true">→</span>
            <p lang="ar" dir="rtl"><span>الترجمة</span> مطالب النَّهَّاش لا تنتهي.</p>
          </motion.div>
        </section>

        <section className="manifesto" id="about" aria-labelledby="manifesto-title">
          <div className="shell manifesto-layout">
            <Reveal className="manifesto-label">
              <span>01</span>
              <p>Localization with a point of view</p>
            </Reveal>

            <Reveal className="manifesto-copy" delay={0.05}>
              <h2 id="manifesto-title">Not merely correct Arabic.<br /><em>Believable Arabic.</em></h2>
              <p>Menus, mechanics, dialogue, lore, humor, and horror all have to sound like they belong to the same world. I translate the whole experience, review it in context, and revise it until the language stops feeling imported.</p>
            </Reveal>

            <Reveal className="credentials" delay={0.1}>
              <div><strong>4</strong><span>released localization projects</span></div>
              <div><strong>135k+</strong><span>strings translated and reviewed</span></div>
              <div><strong>EN → AR</strong><span>translation, terminology, and LQA</span></div>
              <div><strong>Open</strong><span>to studios, publishers, and developers</span></div>
            </Reveal>
          </div>
        </section>

        <section className="proof-section" id="translation-proof" aria-labelledby="translation-title">
          <div className="proof-backdrop-word" lang="ar" dir="rtl" aria-hidden="true">ترجمة</div>
          <div className="shell">
            <SectionHeading
              eyebrow="02 / Translation proof"
              title={<>The sentence is only the start.<br /><em>The feeling is the work.</em></>}
              theme="light"
            >
              <p>Switch between narrative, dialogue, character voice, and UI. Each sample is treated as a piece of the game—not a line floating in a spreadsheet.</p>
            </SectionHeading>
            <TranslationLab activeId={activeSample} onSelect={setActiveSample} />
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="shell">
            <SectionHeading
              eyebrow="03 / Selected worlds"
              title={<>Four releases.<br /><em>Every string considered.</em></>}
            >
              <p>Long-form Arabic localizations built, tested, and released for real players across survival, dark fantasy, and horror.</p>
            </SectionHeading>

            <div className="project-chapters">
              <ProjectChapter project={projects[0]} position={0} assetUrl={assetUrl} />
              <ProjectChapter project={projects[1]} position={1} assetUrl={assetUrl} />
              <DuologyChapter projects={projects.slice(2)} />
            </div>
          </div>
        </section>

        <section className="method-section" id="method" aria-labelledby="method-title">
          <div className="shell">
            <SectionHeading
              eyebrow="04 / Method"
              title={<>A process built to catch<br /><em>what players will notice.</em></>}
            >
              <p>Each stage pairs a production step with the localization skill it protects—from the first context pass to the last in-game review.</p>
            </SectionHeading>

            <ol className="method-spine">
              {workflow.map((step, index) => {
                const capability = capabilities[index];
                return (
                  <Reveal as="li" className="method-row" key={step.number} delay={(index % 2) * 0.04}>
                    <span className="method-number">{step.number}</span>
                    <div className="method-process">
                      <p className="method-kicker">Process</p>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                    <div className="method-capability">
                      <p className="method-kicker">Built-in check</p>
                      <h4>{capability.title}</h4>
                      <p>{capability.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>

            <Reveal className="toolbelt" delay={0.05}>
              <div className="toolbelt-heading">
                <p className="eyebrow"><span aria-hidden="true"></span>Production toolbelt</p>
                <h3>Practical systems, not decorative software lists.</h3>
              </div>
              <div className="toolbelt-grid">
                {tools.map((tool) => (
                  <article className="tool-entry" key={tool.mark}>
                    <span>{tool.mark}</span>
                    <div><h4>{tool.title}</h4><p>{tool.description}</p></div>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal className="skills-index" delay={0.05}>
              <p>Working strengths</p>
              <div>
                {skills.map((skill, index) => (
                  <span key={skill}>{skill}{index < skills.length - 1 && <i aria-hidden="true"> / </i>}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-rings" aria-hidden="true"></div>
          <div className="shell contact-layout">
            <Reveal className="contact-copy">
              <p className="contact-folio">05 / Start a conversation</p>
              <h2 id="contact-title">Arabic players are already there.<br /><em>Let your game meet them.</em></h2>
              <p>I&apos;m available for official Arabic localization, linguistic QA, contextual review, and full-title collaboration.</p>
            </Reveal>

            <Reveal className="contact-actions" delay={0.08}>
              <a className="button button--paper" href="mailto:contact@azaamworks.com">Email Azaam <span aria-hidden="true">↗</span></a>
              <a className="contact-download" href={assetUrl("Portfolio.pdf")} download>Download the PDF portfolio <span aria-hidden="true">↓</span></a>
            </Reveal>

            <div className="contact-meta">
              <a href="mailto:contact@azaamworks.com">contact@azaamworks.com</a>
              <a href="https://github.com/AzaamAlghamdi" target="_blank" rel="noreferrer">GitHub / AzaamAlghamdi <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <p>© {new Date().getFullYear()} Azaam Alghamdi / Arabic game localization</p>
          <a href="#top">Back to the opening <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return <MotionConfig reducedMotion="user"><AppContent /></MotionConfig>;
}
