import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import Video from 'react-h5-video'
import { withPrefix } from 'gatsby-link'

class Project extends React.PureComponent {
  videoLoaded = (api) => {
    this.videoApi = api;
  }

  handleWaypoint = () => {
    if (this.videoApi) {
      this.videoApi.togglePlay()
    } else {
      setTimeout(this.handleWaypoint, 100)
    }
  }

  render () {
    const {
      excerpt,
      frontmatter: {title, url, date, tags, video},
    } = this.props.project

    return (
      <Waypoint
        onEnter={this.handleWaypoint}
        onLeave={this.handleWaypoint}>
        <article>
          <h2>{title}</h2>
          <p>{excerpt}</p>
          <ul>
            <li>{date}</li>
            <li>{tags}</li>
            <li>{url}</li>
          </ul>
          <Video sources={[withPrefix(video)]} metaDataLoaded={this.videoLoaded} />
        </article>
      </Waypoint>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project
