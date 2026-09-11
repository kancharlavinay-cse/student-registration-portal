import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/student-registration-portal/",
  plugins: [react()]
});
