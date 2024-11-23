/// <reference types="vitest" />
/// <reference types="Vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment:'jsdom',
    globals: true,
    coverage:{
      provider: 'v8',
      exclude:[
        'src/main.tsx',
        'src/vite-env.d.ts',
        'tailwind.config.js',
        'vite.config.ts',
        '.eslintrc.cjs',
      ]
    }
  }
})
