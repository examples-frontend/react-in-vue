const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      regenerator: true,
    },
  ],
  // "./babel-plugin/index.js", // 💩💩💩 CUSTOM BABEL PLUGIN
];

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins,
};
