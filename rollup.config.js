import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';

const extensions = ['.ts', '.js'];

const LIBRARY_NAME = 'app';
const LIBRARY_NAME_LOWER = LIBRARY_NAME.toLowerCase();

export default [
  {
    input: 'src/app/index.ts',
    output: {
      file: `build/${LIBRARY_NAME_LOWER}.js`,
      // dir: 'build/umd',
      format: 'umd',
      name: LIBRARY_NAME,
      sourcemap: true,
    },
    plugins: [
      nodeResolve({browser: true}),
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      typescript({
        declaration: true,
        rootDir: 'src/app',
        declarationDir: 'build/',
      }),
    ],
  },
];