'use strict';

// ESLint (including the editor extension) loads babel-preset-react-app via
// @babel/eslint-parser. That preset requires NODE_ENV/BABEL_ENV, which are
// normally set by scripts/start.js, scripts/build.js, and scripts/test.js.
process.env.BABEL_ENV = process.env.BABEL_ENV || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    // Disable ESLint rules that conflict with Prettier (must be last)
    'prettier',
  ],
};
