import React from 'react'
import Helmet from 'react-helmet'
import Project from '../components/Project'

export default ({ data }) => {
  const siteMetadata = data.site.siteMetadata
  const pageTitle = `Resume: ${siteMetadata.bio.name}, ${
    siteMetadata.bio.title
  }`
  const projects = data.allMarkdownRemark.edges
  return (
    <main>
      <Helmet
        title={pageTitle}
        meta={[{ name: 'description', content: siteMetadata.bio.description }]}
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
          title
          description
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
          }
        }
      }
    }
  }
`
