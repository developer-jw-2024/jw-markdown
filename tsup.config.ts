import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Your entry file(s)
  format: ['esm', 'cjs'],  // Output formats
  splitting: false,        // Code splitting
  sourcemap: true,         // Source maps
  clean: true,             // Clean the output directory before build
});