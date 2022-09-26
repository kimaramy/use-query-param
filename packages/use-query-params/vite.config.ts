import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  test: {},
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'useQueryParams',
      fileName: 'use-query-params',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
