import React from 'react'
import Helmet from 'react-helmet'
import Project from '../components/Project'
import PrintShow from '../components/PrintShow'


export default ({ data }) => {
  const siteMetadata = data.site.siteMetadata
  const pageTitle = `${siteMetadata.bio.name}, ${siteMetadata.bio.title} - Resume`
  const twitterCard = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@filidor.wiese' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: siteMetadata.bio.headline },
    { name: 'twitter:image', content: `${siteMetadata.bio.url}/opengraph.png` },
  ]
  const opengraphCard = [
    { property: 'og:title', content: pageTitle },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteMetadata.bio.url },
    { property: 'og:site_name', content: siteMetadata.bio.name },
    { property: 'og:description', content: siteMetadata.bio.headline },
    { property: 'og:image', content: `${siteMetadata.bio.url}/opengraph.png` },
    { property: 'og:locale', content: 'en_US' },
  ]
  const schemaOrg = {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'Person',
      'email': `mailto: ${siteMetadata.bio.email}`,
      'image': 'filidor-wiese.jpg',
      'jobTitle': siteMetadata.bio.title,
      'description': siteMetadata.bio.headline,
      'name': siteMetadata.bio.name,
      'telephone': siteMetadata.bio.phone,
      'url': siteMetadata.bio.url,
      'sameAs': [
        'https://galaxy.fili.nl/',
        'https://twitter.com/filidorwiese/',
        'https://www.linkedin.com/in/filidorwiese/',
        'https://github.com/filidorwiese/'
      ],
    })
  }
  const projects = data.allMarkdownRemark.edges
  return (
    <main>
      <Helmet
        title={pageTitle}
        meta={[
          { name: 'description', content: siteMetadata.bio.headline },
          ...twitterCard,
          ...opengraphCard
          ]}
        script={[schemaOrg]}
      />
      <div>
        <PrintShow><h4>Recent Projects</h4></PrintShow>
        {projects.map((project, key) => (
          <Project key={key} project={project.node} />
        ))}
      </div>
    </main>
  )
}

export const query = graphql`
  query PageQuery {
    site {
      siteMetadata {
        bio {
          name
          email
          phone
          title
          headline
          url
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___sortdate], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(content)/.*.md$/" } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            role,
            url
            sortdate
            date
            tags
            video
            poster
            printonly
          }
        }
      }
    }
  }
`