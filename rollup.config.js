import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// Ensure this is the default export
export default {
    input: 'src/main.js',           // Entry point for your application
    output: {
        file: 'public/bundle.js',    // Output bundle file location
        format: 'iife',              // Format of the bundle
        name: 'bundle'               // Name for the generated bundle
    },
    plugins: [
        resolve(),                   // Resolves node_modules dependencies
        commonjs()                   // Converts CommonJS modules to ES6
    ]
};