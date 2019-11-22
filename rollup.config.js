import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

export default {
  input: 'source/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'color',
      format: 'commonjs',
      sourcemap: true,
      plugins: [
        terser(),
      ],
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [

    // Compile TypeScript Files.
    typescript({
      exclude: 'node_modules/**',
    }),

    resolve({
      mainFields: ['module', 'jsnext'],
      extensions,
    }),

    babel({
      exclude: 'node_modules/**',
      extensions,
      runtimeHelpers: true,
    }),
  ],
}