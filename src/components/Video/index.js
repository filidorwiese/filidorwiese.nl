import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Waypoint from 'react-waypoint'
import H5Video from 'react-h5-video'
import { withPrefix } from 'gatsby-link'

import browser from '../../assets/images/browser.svg'

const Browser = styled.div`
  ${props => props.browser && css`
    background: 0 0 url(${browser}) no-repeat;
    padding-top: 8.5%;
    
    .r5-wraper {
      padding: 0 2px;
    }
  `}
  
  .r5-controls-hidden, r5-overlay, r5-content {
    display: none;
  }
`

class Video extends React.PureComponent {
  videoLoaded = api => {
    this.videoApi = api
  }

  handleWaypoint = () => {
    // if (this.videoApi) {
    //   this.videoApi.togglePlay()
    // } else {
    //   setTimeout(this.handleWaypoint, 100)
    // }
  }

  render() {
    return (
      <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}>
        <Browser browser={this.props.browser}>
          <H5Video
            width="100%"
            height="auto"
            loop
            mute
            controls={false}
            sources={[withPrefix(this.props.video)]}
            metaDataLoaded={this.videoLoaded}
          />
        </Browser>
      </Waypoint>
    )
  }
}

Video.propTypes = {
  video: PropTypes.string,
  browser: PropTypes.bool
}

Video.defaultProps = {
  browser: false
}

export default Video

