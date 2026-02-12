import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Import the Vercel adapter
// import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: "https://www.compoz.tech",
  integrations: [tailwind(), sitemap()],
  output: 'static',
  // output: 'server',
  // adapter: vercel(),
});
