import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function useImageLightbox(images) {
  const [index, setIndex] = useState(null);
  const open = (image) => setIndex(images.indexOf(image));
  const close = () => setIndex(null);
  const next = () => setIndex((value) => (value + 1) % images.length);
  const previous = () => setIndex((value) => (value - 1 + images.length) % images.length);
  return { index, open, close, next, previous };
}

export function ImageLightbox({ images, index, onClose, onNext, onPrevious, assetUrl, language = "en" }) {
  const [zoomed, setZoomed] = useState(false);
  const isOpen = index !== null && index >= 0;
  const isArabic = language === "ar";

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("lightbox-open"); window.removeEventListener("keydown", onKey); };
  }, [isOpen, onClose, onNext, onPrevious]);

  useEffect(() => setZoomed(false), [index]);

  return (
    <AnimatePresence>
      {isOpen && <motion.div className="image-lightbox" role="dialog" aria-modal="true" aria-label={isArabic ? "عارض صور الترجمة" : "Localization screenshot viewer"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="lightbox-bar"><span>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><div><a href={assetUrl(images[index])} target="_blank" rel="noreferrer">{isArabic ? "الدقة الأصلية" : "Original resolution"} ↗</a><button type="button" onClick={() => setZoomed((value) => !value)}>{zoomed ? (isArabic ? "احتواء" : "Fit") : (isArabic ? "تكبير" : "Zoom")}</button><button type="button" autoFocus onClick={onClose} aria-label={isArabic ? "إغلاق" : "Close"}>×</button></div></div>
        <button className="lightbox-arrow lightbox-arrow--previous" type="button" onClick={onPrevious} aria-label={isArabic ? "الصورة السابقة" : "Previous image"}>←</button>
        <div className={`lightbox-canvas ${zoomed ? "is-zoomed" : ""}`} onClick={() => setZoomed((value) => !value)}><motion.img key={images[index]} src={assetUrl(images[index])} alt={isArabic ? `لقطة التعريب ${index + 1}` : `Localization screenshot ${index + 1}`} initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} /></div>
        <button className="lightbox-arrow lightbox-arrow--next" type="button" onClick={onNext} aria-label={isArabic ? "الصورة التالية" : "Next image"}>→</button>
      </motion.div>}
    </AnimatePresence>
  );
}
