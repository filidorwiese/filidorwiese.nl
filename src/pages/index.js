import React from 'react'
import Project from '../components/Project'

export default ({ data }) => {
  const projects = data.allMarkdownRemark.edges
  return (
    <div>
      {projects.map((project, key) => (
        <Project key={key} project={project.node} />
      ))}
    </div>
  )
}

export const query = graphql`
  query PageQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___sortdate], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(projects)/.*.md$/" } }
    ) {
      edges {
        node {
          excerpt
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
