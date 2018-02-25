/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react'

exports.onRenderBody = ({ setHeadComponents }) =>
  setHeadComponents([
    <link key="icon" rel="icon" href="favicon.gif" />
  ])