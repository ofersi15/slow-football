import { defineConfig } from 'vite'

export default defineConfig({
  // Use the full Vue build (runtime + compiler) — required because the app uses
  // DOM templates (index.html IS the Vue template, not SFCs). SFCs in Phase C
  // will use the runtime-only build automatically via @vitejs/plugin-vue.
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build: {
    outDir: 'dist',
  },
})
