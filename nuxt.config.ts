export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  css: ['bulma/css/versions/bulma-no-dark-mode.min.css', '~/assets/css/theme.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'ja' },
      title: '読書タイプ診断',
      meta: [
        { name: 'color-scheme', content: 'light' },
        { name: 'theme-color', content: '#faf4e8' },
        { name: 'description', content: 'はい・いいえの5問に答えると、20冊の中からあなたに合う1冊を推薦します。' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap' },
      ],
    },
  },
})
