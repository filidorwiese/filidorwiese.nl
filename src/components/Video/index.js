import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Waypoint from 'react-waypoint'
import { withPrefix } from 'gatsby-link'

import browser from '../../assets/images/browser.svg'
import { breakpoints } from '../../utils/theme'

const Browser = styled.div`
  ${props => props.browser && css`
    background: url(${browser}) 0 0 no-repeat;
    padding-top: 8.5%;
  `}
`

class Video extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isPlaying: false,
      inViewOnce: false
    }
  }

  handleEnter = () => {
    this.setState({
      inViewOnce: true
    })

    if (this.isEnabled()) {
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
  }

  handleLeave = () => {
    if (this.isEnabled()) {
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
  }

  isEnabled = () => {
    const isMobile = typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoints[0]})`).matches
    return this.state.inViewOnce && !(isMobile && this.props.disableOnMobile)
  }

  render() {
    return (
      <Waypoint onEnter={this.handleEnter} onLeave={this.handleLeave}>
        <Browser browser={this.props.browser}>
           <video ref='video'
                 width='100%'
                 height='auto'
                 muted
                 preload='none'
                 loop
                 poster={this.props.poster}
                 playsinline
                 disableRemotePlayback>
             {this.isEnabled() && <source src={withPrefix(this.props.video)} type='video/mp4' />}
          </video>
        </Browser>
      </Waypoint>
    )
  }
}

Video.propTypes = {
  video: PropTypes.string,
  poster: PropTypes.string,
  browser: PropTypes.bool,
  disableOnMobile: PropTypes.bool
}

Video.defaultProps = {
  browser: false
}

export default Video

