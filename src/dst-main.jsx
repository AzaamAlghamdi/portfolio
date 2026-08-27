import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import DstPage from "./DstPage";
import "./dst.css";
import "./case-study.css";

createRoot(document.getElementById("root")).render(
  <MotionConfig reducedMotion="user">
    <DstPage />
  </MotionConfig>
);
