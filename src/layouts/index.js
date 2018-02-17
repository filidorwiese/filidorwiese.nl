import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'
import './index.css'

export default ({ children, data }) => {
  const siteMetadata = data.site.siteMetadata
  const pageTitle = `Resume: ${siteMetadata.bio.name}, ${
    siteMetadata.bio.title
  }`

  return (
    <div style={{ backgroundColor: '#fcf9f6' }}>
      <Helmet
        title={pageTitle}
        meta={[{ name: 'description', content: siteMetadata.bio.description }]}
      />
      <Header bio={siteMetadata.bio} social={siteMetadata.social} />
      <main>{children()}</main>
      <Footer bio={siteMetadata.bio} />
    </div>
  )
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        bio {
          name
          email
          phone
          description
          title
        }
        social {
          github
          twitter
          linkedin
        }
      }
    }
  }
`
