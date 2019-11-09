import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";

export default {
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    "http-status-codes",
    "jsonld",
    "link-lib",
    "link-redux",
    "ml-disjoint-set",
    "n-quads-parser",
    "node-fetch",
    "rdflib",
    "react",
    "react-is",
    "react-dom",
    "solid-auth-client",
    "solid-auth-cli",
    "@material-ui/core",
    "@material-ui/core/*",
  ],
  input: "src/package.ts",
  output: [
    {
      file: "dist/index.js",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    // Compile TypeScript files
    typescript({
      tsconfigDefaults: { compilerOptions: {
        declaration: true,
      } },
      typescript: require("typescript"),
    }),
    commonjs(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
  watch: {
    include: "src/**",
  },
};
