module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.module
      .rule()
      .test(/\.(f|cf|t).ts[x]?$/)
      .use('schema-loader')
      .loader('./loaders/schema-loader.ts')
      .options({
        useDir: 'pages',
      })
      .end();
  });
};
