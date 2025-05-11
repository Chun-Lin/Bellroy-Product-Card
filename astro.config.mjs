// @ts-check
import { defineConfig } from 'astro/config';
import elmstronaut from "elmstronaut";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [elmstronaut()],

  vite: {
    plugins: [tailwindcss()],
  },
});