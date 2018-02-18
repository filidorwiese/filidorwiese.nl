import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import Video from 'react-h5-video'
import { withPrefix } from 'gatsby-link'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

import { colors } from '../../theme'

const ProjectLine = styled(Box)`
  border-top: 2px solid ${colors.extreLightBlue};
`

const ProjectDescription = styled(Box)`
`

const ProjectVideo = styled(Box)`
`

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
          <Flex flexWrap={['wrap', 'nowrap']} py={60}>
            <ProjectLine flex='0 0 auto' order={10} width={[40, 60]} />
            <ProjectDescription flex='1 1 auto' px={[50, 40]} order={20}>
              <h2>{title}</h2>
              <p>{excerpt}</p>
              <ul>
                <li>{date}</li>
                <li>{tags}</li>
                <li>{url}</li>
              </ul>
            </ProjectDescription>
            <ProjectVideo flex='1 1 auto' order={[1, 30]} mb={[20, 0]}>
              <Video
                width='100%'
                height='auto'
                loop
                mute
                controls={false}
                sources={[withPrefix(video)]}
                metaDataLoaded={this.videoLoaded} />
            </ProjectVideo>
          </Flex>
        </article>
      </Waypoint>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project
