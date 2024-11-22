import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/Components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
	  '@store': path.resolve(__dirname, './src/store'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
		api: 'modern-compiler',
        additionalData: `
          @use '@styles/config/variables' as *;
          @use '@styles/config/normalize' as *;
          @use '@styles/mixins/flex-wrapper' as *;
          @use '@styles/mixins/media' as *;
		  @use '@styles/config/fonts' as *;
        `
      }
    }
  }
});

