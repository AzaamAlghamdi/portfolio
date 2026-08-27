import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

function ProjectMeta({ project }) {
  return (
    <div className="chapter-meta">
      <span>{project.type}</span>
      <span>{project.strings}</span>
    </div>
  );
}

export function ProjectChapter({ project, position, assetUrl }) {
  const reduceMotion = useReducedMotion();
  const primaryHref = project.detailHref ?? project.href;
  const isInternalLink = Boolean(project.detailHref);

  return (
    <Reveal className={`project-chapter ${position % 2 ? "project-chapter--reverse" : ""}`}>
      <motion.a
        className="chapter-media"
        href={primaryHref}
        target={isInternalLink ? undefined : "_blank"}
        rel={isInternalLink ? undefined : "noreferrer"}
        aria-label={`${project.detailLabel ?? project.linkLabel}: ${project.title}`}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={assetUrl(project.image)}
          alt={project.imageAlt}
          loading={position > 0 ? "lazy" : "eager"}
          whileHover={reduceMotion ? undefined : { scale: 1.025 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="chapter-image-index">{project.index}</span>
        <span className="chapter-image-label">Released localization</span>
      </motion.a>

      <div className="chapter-copy">
        <ProjectMeta project={project} />
        <p className="chapter-kicker">World / {project.index}</p>
        <h3>{project.title}</h3>
        <p className="chapter-subtitle">{project.subtitle}</p>
        <p className="chapter-description">{project.description}</p>
        <ul className="chapter-highlights">
          {project.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <div className="chapter-footer">
          <p>{project.tags.join(" · ")}</p>
          <a
            className="text-link text-link--chapter"
            href={primaryHref}
            target={isInternalLink ? undefined : "_blank"}
            rel={isInternalLink ? undefined : "noreferrer"}
          >
            {project.detailLabel ?? project.linkLabel} <span aria-hidden="true">{isInternalLink ? "→" : "↗"}</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function DuologyChapter({ projects }) {
  const [first, second] = projects;

  return (
    <Reveal className="project-chapter project-chapter--duology">
      <div
        className="chapter-media chapter-media--duology duology-poster"
        role="img"
        aria-label="Original typographic artwork for the Obscure and ObsCure II Arabic localization projects"
      >
        <div className="duology-poster-grid" aria-hidden="true">
          <span className="duology-series-code">Archive / Arabic editions</span>
          <span className="duology-poster-word">OBSCURE</span>
          <div className="duology-poster-orbit"></div>
          <div className="duology-poster-title">
            <small>Survival horror · translated title</small>
            <strong lang="ar" dir="rtl">المبهم</strong>
            <span>OBSCURE I + II</span>
          </div>
          <div className="duology-editions">
            <span><b>I</b> Leafmore High</span>
            <i></i>
            <span><b>II</b> Aftermath</span>
          </div>
        </div>
        <span className="duology-mark">03—04</span>
        <span className="chapter-image-label">Two connected releases</span>
      </div>

      <div className="chapter-copy chapter-copy--duology">
        <div className="chapter-meta"><span>Survival horror duology</span><span>~6,000 strings</span></div>
        <p className="chapter-kicker">Worlds / 03—04</p>
        <h3>The Obscure duology</h3>
        <p className="chapter-description">Two full Arabic localizations shaped around narrative tension, character continuity, puzzle clarity, and the particular rhythm of early survival horror.</p>

        <div className="duology-records">
          {[first, second].map((project) => (
            <article key={project.id}>
              <span>{project.index}</span>
              <div>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <a className="text-link text-link--chapter" href={project.href} target="_blank" rel="noreferrer">
                  {project.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
