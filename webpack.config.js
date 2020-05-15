const path = require('path');

const env = process.env.NODE_ENV || 'development'

module.exports = {
  entry: './client/src/Index.bs.js',
  // If you ever want to use webpack during development, change 'production'
  // to 'development' as per webpack documentation. Again, you don't have to
  // use webpack or any other bundler during development! Recheck README if
  // you didn't know this
  mode: 'production',
  optimization: { minimize: env === 'production' },
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js',
  },
};
