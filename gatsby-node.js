/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Webpack = require("webpack");

exports.modifyWebpackConfig = ({ config, stage }) => {
  // Ignore velocity plugins during builds
  if (stage === 'build-html') {
    config.loader("null", {
      test: /velocity.*/,
      loader: "null-loader",
    });
  }

  return config;
};