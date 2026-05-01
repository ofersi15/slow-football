import { defineConfig } from 'vite'
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  // Full Vue build (runtime + compiler) required for DOM templates in index.html.
  // SFCs added in Phase C will use the runtime-only build via @vitejs/plugin-vue.
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-browser.prod.js',
    },
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MIXIN_COMPAT__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  build: {
    outDir: 'dist',
    // Build app.js as a self-contained ES module bundle.
    // We can't use index.html as the Vite HTML entry because Vite's HTML parser
    // (parse5) rejects the <  operator inside Vue {{ }} template expressions.
    lib: {
      entry: resolve(__dirname, 'app.js'),
      formats: ['es'],
      fileName: () => 'app.js',
    },
    rollupOptions: {
      // Bundle all dependencies (vue, chart.js) — nothing external.
      external: [],
    },
  },
  plugins: [
    {
      name: 'copy-static',
      closeBundle() {
        mkdirSync('./dist', { recursive: true })
        writeFileSync('./dist/index.html', readFileSync('./index.html', 'utf8'))
        copyFileSync('./style.css', './dist/style.css')
      },
    },
  ],
})
