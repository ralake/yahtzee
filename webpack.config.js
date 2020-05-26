const path = require('path');

const env = process.env.NODE_ENV || 'development'

module.exports = {
  entry: './src/Index.bs.js',
  mode: 'production',
  optimization: { minimize: env === 'production' },
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js',
  },
};
