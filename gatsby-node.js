/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Webpack = require("webpack");

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.plugin('jquery', Webpack.ProvidePlugin, [
    {
      $: 'jquery',
      jQuery: 'jquery'
    }
  ])

  // Ignore jquery plugins during builds
  if (stage === 'build-html') {
    config.loader("null", {
      test: /jquery.*/,
      loader: "null-loader",
    });
  }

  return config;
};