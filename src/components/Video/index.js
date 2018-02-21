import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Waypoint from 'react-waypoint'
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
  constructor (props) {
    super(props)
    this.state = {
      isPlaying: false,
      inView: false
    }
  }

  handleEnter = () => {
    this.setState({
      inView: true
    })
    if (this.videoEl) {
      this.videoEl.play()
      this.setState({
        isPlaying: true
      })
    } else {
      this.videoEl = ReactDOM.findDOMNode(this.refs.video)
      setTimeout(this.handleEnter, 1000)
    }
  }

  handleLeave = () => {
    if (this.videoEl) {
      this.videoEl.pause()
      this.setState({
        isPlaying: false
      })
    } else {
      this.videoEl = ReactDOM.findDOMNode(this.refs.video)
      setTimeout(this.handleLeave, 1000)
    }
  }

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.videoEl.pause()
      this.setState({
        isPlaying: false
      })
    } else {
      this.videoEl.play()
      this.setState({
        isPlaying: true
      })
    }
  }

  render() {
    return (
      <Waypoint onEnter={this.handleEnter} onLeave={this.handleLeave}>
        <Browser browser={this.props.browser}>
          { this.state.inView && (
              <video ref='video'
                   width='100%'
                   height='auto'
                   muted
                   preload='none'
                   loop
                   poster={this.props.poster}>
              <source src={withPrefix(this.props.video)} type='video/mp4' />
            </video>)
          }
        </Browser>
      </Waypoint>
    )
  }
}

Video.propTypes = {
  video: PropTypes.string,
  poster: PropTypes.string,
  browser: PropTypes.bool
}

Video.defaultProps = {
  browser: false
}

export default Video

