import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://oncologyit.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
