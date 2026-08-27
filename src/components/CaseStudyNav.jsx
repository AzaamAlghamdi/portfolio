import { useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";

const projects = [
  { id: "dst", label: "DST", href: "/dst/", status: "Released" },
  { id: "ms2", label: "Mortal Shell II", href: "/mortal-shell-2/", status: "WIP" }
];

export function CaseStudyNav({ language, setLanguage, current }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const isArabic = language === "ar";

  return (
    <>
      <motion.div className="case-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true"></motion.div>
      <header className="case-nav-wrap">
        <nav className="case-nav" aria-label={isArabic ? "التنقل بين المشاريع" : "Project navigation"}>
          <a className="case-brand" href="/"><span aria-hidden="true">A</span><b>Azaam</b><small>{isArabic ? "الأعمال" : "Portfolio"}</small></a>
          <div className="case-projects">
            <a href="/" className="case-home-link">{isArabic ? "الرئيسية" : "Home"}</a>
            {projects.map((project) => <a key={project.id} href={project.href} className={current === project.id ? "is-current" : ""}><span>{project.label}</span><small>{project.status}</small></a>)}
          </div>
          <div className="case-nav-actions">
            <button className="case-language" type="button" onClick={() => setLanguage(isArabic ? "en" : "ar")} aria-label={isArabic ? "View in English" : "عرض الصفحة بالعربية"}>{isArabic ? "English" : "العربية"}</button>
            <button className="case-menu" type="button" aria-expanded={open} aria-controls="case-mobile-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? (isArabic ? "أغلق القائمة" : "Close menu") : (isArabic ? "افتح القائمة" : "Open menu")}><i></i><i></i></button>
          </div>
        </nav>
        <AnimatePresence>{open && <motion.nav id="case-mobile-menu" className="case-mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><a href="/">{isArabic ? "الرئيسية" : "Home"}</a>{projects.map((project) => <a key={project.id} href={project.href}><span>{project.label}</span><small>{project.status}</small></a>)}</motion.nav>}</AnimatePresence>
      </header>
    </>
  );
}
