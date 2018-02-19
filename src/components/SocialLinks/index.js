import React from 'react'
import styled from 'styled-components'

import iconGithub from '../../assets/images/icon_github.svg'
import iconTwitter from '../../assets/images/icon_twitter.svg'
import iconLinkedin from '../../assets/images/icon_linkedin.svg'

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
  text-indent: -999px;
  overflow: hidden;
  background-size: cover;
  
  &.social-icon--github {
    background-image: url(${iconGithub});
  }
  &.social-icon--twitter {
    background-image: url(${iconTwitter});
  }
  &.social-icon--linkedin {
    background-image: url(${iconLinkedin});
  }
`

export default ({ links }) => (
  <SocialIcons>
    {Object.entries(links).map(([key, url]) => (
      <SocialIcon key={key}>
        <SocialLink href={url} target="_blank" className={`social-icon--${key}`}>
          {key}
        </SocialLink>
      </SocialIcon>
    ))}
  </SocialIcons>
)
