import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        dst: resolve(rootDir, "dst/index.html"),
        mortalShell2: resolve(rootDir, "mortal-shell-2/index.html")
      }
    }
  }
});
