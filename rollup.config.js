import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss';
import discardComments from 'postcss-discard-comments';
import cssnano from 'cssnano';
import pkg from './package.json';

const dev = process.env.NODE_ENV === 'development';

const projectRootDir = path.resolve(__dirname);

export default {
  input: 'src/index.js',
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: dev,
    globals: {
      react: 'React',
      'styled-components': 'styled',
      'prop-types': 'PropTypes',
    },
  },
  plugins: [
    peerDepsExternal(),
    includePaths({ paths: ['./'] }),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      module: true,
      moduleDirectories: ['node_modules', 'src'],
      extensions: ['.js', '.jsx', '.css'],
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    postcss({
      modules: true,
      sourceMap: dev,
      extract: true,
      plugins: [
        discardComments({
          removeAll: true,
        }),
        !dev && cssnano(),
      ],
    }),
    !dev && terser(),
  ],
};
