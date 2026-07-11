import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const navItems = [
  { label: "Proof", href: "#translation-proof" },
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header" id="top">
      <div className="shell nav-shell">
        <a className="brand" href="#top" aria-label="Azaam portfolio home" onClick={closeMenu}>
          <span className="brand-seal" aria-hidden="true"><b>A</b><i lang="ar">ع</i></span>
          <span className="brand-type">Azaam <small>Arabic game localization</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a className="nav-contact" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
        </nav>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            className="mobile-nav"
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 + index * 0.04 }}
              >
                <span>{item.label}</span><span aria-hidden="true">↘</span>
              </motion.a>
            ))}
            <a className="mobile-nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <span aria-hidden="true">↗</span></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
