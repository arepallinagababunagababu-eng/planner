/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: require('./tailwind.config.js'),
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
}
