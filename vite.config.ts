import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
		api: 'modern-compiler',
        additionalData: `
          @use '@/styles/settings/variables' as *;
          @use '@/styles/settings/normalize' as *;
          @use '@/styles/mixins/flex-wrapper' as *;
          @use '@/styles/mixins/media' as *;
        `
      }
    }
  }
});

