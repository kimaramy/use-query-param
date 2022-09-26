import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outputDir: 'types',
      insertTypesEntry: true,
    }),
  ],
  test: {},
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'useQueryParams',
      formats: ['es', 'umd'],
      fileName: (format) => `use-query-params.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
