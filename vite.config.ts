import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    // Ensure static files from public are properly copied
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Public directory is automatically served as static files
  publicDir: "public",
});

