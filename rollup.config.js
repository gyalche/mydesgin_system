import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json'

const dev = process.env.NODE_ENV === "development";

export default {
  input: 'src/index.js',
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: dev,
    globals: {
      'react': 'React',
      'styled-components': 'styled',
      'prop-types': 'PropTypes'
    },
  },
  plugins: [
    peerDepsExternal(),
    includePaths({ paths: ["./"] }),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      module: true,
      extensions: ['.js', '.jsx', '.css']
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    postcss({
      modules: true,
      sourceMap: dev,
      extract: true,
    }),
    !dev && terser(),
  ],
}
