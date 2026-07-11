import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, children, theme = "ink" }) {
  return (
    <Reveal className={`section-heading section-heading--${theme}`}>
      <p className="eyebrow"><span aria-hidden="true"></span>{eyebrow}</p>
      <h2>{title}</h2>
      {children && <div className="section-intro">{children}</div>}
    </Reveal>
  );
}
