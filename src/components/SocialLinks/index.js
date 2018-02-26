import React from 'react'
import * as ReactGA from 'react-ga'
import styled from 'styled-components'

import GithubIcon from '../Icons/github'
import TwitterIcon from '../Icons/twitter'
import LinkedinIcon from '../Icons/linkedin'
import { colors } from '../../utils/theme'

const SocialIcons = styled.ul`
  margin: 0;
  padding-left: 0;
`

const SocialIcon = styled.li`
  display: inline-block;
  margin-right: 10px;
`

const SocialLink = styled.a`
  display: inline-block;
  width: 30px;
  height: 30px;
  
  :hover #square {
    fill: ${colors.lightBlue} !important;
  }
`

class SocialLinks extends React.PureComponent {
  onClick = (title) => {
    ReactGA.event({
      category: 'User',
      action: `Clicked ${title}`
    })
  }

  render () {
    return <SocialIcons>
      {Object.entries(this.props.links).map(([key, url]) => (
        <SocialIcon key={key}>
          <SocialLink href={url} target="_blank" className={`social-icon--${key}`} onClick={() => this.onClick(key)}>
            { key === 'github' && <GithubIcon /> }
            { key === 'twitter' && <TwitterIcon /> }
            { key === 'linkedin' && <LinkedinIcon /> }
          </SocialLink>
        </SocialIcon>
      ))}
    </SocialIcons>
  }
}

export default SocialLinks