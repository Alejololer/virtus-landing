import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.virtusestudiojuridico.com',
  // ponytail: 16 KB de CSS inline pesan menos que una peticion que bloquea el render
  build: { inlineStylesheets: 'always' },
});
