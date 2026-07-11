import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

export function ProjectCard({ project, position, assetUrl }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className={`project-card-wrap project-card-wrap--${position}`} delay={position * 0.05}>
      <motion.article
        className={`project-card project-card--${project.id}`}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 330, damping: 26 }}
      >
        <div className="project-media">
          <motion.img
            src={assetUrl(project.image)}
            alt={project.imageAlt}
            loading={position > 0 ? "lazy" : "eager"}
            whileHover={reduceMotion ? undefined : { scale: 1.035 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="project-index">{project.index} / 04</span>
          <span className="project-strings">{project.strings}</span>
        </div>
        <div className="project-content">
          <p className="project-type">{project.type}</p>
          <h3>{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-description">{project.description}</p>
          <ul className="project-highlights">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
          <div className="project-footer">
            <div className="project-tags">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <a href={project.href} target="_blank" rel="noreferrer" className="arrow-link">
              {project.linkLabel}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
