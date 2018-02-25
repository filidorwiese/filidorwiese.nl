/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import ReactGA from 'react-ga';

ReactGA.initialize('UA-83949074-3');
ReactGA.pageview(window.location.pathname + window.location.search);