import React from 'react'
import PropTypes from 'prop-types'

class Project extends React.PureComponent {
  render() {
    const {
      excerpt,
      frontmatter: { title, url, date, tags, video },
    } = this.props.project

    return (
      <article>
        <h2>{title}</h2>
        <p>{excerpt}</p>
        <ul>
          <li>{date}</li>
          <li>{tags}</li>
          <li>{url}</li>
        </ul>
        <div>{video}</div>
      </article>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project
