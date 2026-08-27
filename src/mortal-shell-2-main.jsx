import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import MortalShell2Page from "./MortalShell2Page";
import "./mortal-shell-2.css";
import "./case-study.css";

createRoot(document.getElementById("root")).render(
  <MotionConfig reducedMotion="user">
    <MortalShell2Page />
  </MotionConfig>
);
