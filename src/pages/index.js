import React from 'react'
import Helmet from 'react-helmet'
import Project from '../components/Project'

export default ({ data }) => {
  const siteMetadata = data.site.siteMetadata
  const pageTitle = `${siteMetadata.bio.name}, ${siteMetadata.bio.title}`
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
      'url': siteMetadata.url
    })
  }
  const projects = data.allMarkdownRemark.edges
  return (
    <main>
      <Helmet
        title={pageTitle}
        meta={[{ name: 'description', content: siteMetadata.bio.headline }]}
        script={[schemaOrg]}
      />
      <div>
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
            url
            sortdate
            date
            tags
            video
            poster
          }
        }
      }
    }
  }
`