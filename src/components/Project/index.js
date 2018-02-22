import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

import { breakpoints, colors } from '../../utils/theme'
import iconLink from '../../assets/images/icon_link.svg'
import iconTime from '../../assets/images/icon_time.svg'
import iconTech from '../../assets/images/icon_tech.svg'
import Anchor from '../../components/Anchor'
import Video from '../../components/Video'

const ProjectLine = styled(Box)`
  border-top: 2px solid ${colors.extreLightBlue};
`

const ProjectDescription = styled(Box)``

const ProjectVideo = styled(Box)`
  min-width: 30%;
  @media (min-width: ${breakpoints[0]}) {
    max-width: 370px;
  }
`

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const LiTime = styled.li`
  background: url(${iconTime}) 0 4px no-repeat;
  background-size: 20px 20px;
  margin-left: 0;
  padding-left: 40px;
`

const LiTech = styled.li`
  background: url(${iconTech}) 0 4px no-repeat;
  background-size: 20px 20px;
  margin-left: 0;
  padding-left: 40px;
`

const LiLink = styled.li`
  background: url(${iconLink}) 0 4px no-repeat;
  background-size: 20px 20px;
  margin-left: 0;
  padding-left: 40px;
`

const stripDomain = (string) => string.match(/https?:\/\/(?:www\.)?([a-z0-9\-.]*)(?:\/|$)/)[1]

class Project extends React.PureComponent {
  render() {
    const {
      html,
      frontmatter: { title, url, date, tags, video, poster, printonly },
    } = this.props.project

    return (
      <article className={printonly && 'printonly'}>
        <Flex flexWrap={['wrap', 'nowrap']} py={60}>
          <ProjectLine flex="0 0 auto" order={10} width={[40, 60]} />
          <ProjectDescription flex="1 1 auto" pl={[50, 40]} pr={[0, 60]} order={20}>
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: html}} />
            <Ul>
              <LiTime>{date}</LiTime>
              <LiTech>{tags}</LiTech>
              {url && <LiLink>
                <Anchor href={url} target='_blank'>{stripDomain(url)}</Anchor>
              </LiLink>}
            </Ul>
          </ProjectDescription>
          <ProjectVideo flex="1 1 auto" order={[1, 30]} mb={[20, 0]}>
            <a href={url} target='_blank'>
              <Video video={video} poster={poster} browser />
            </a>
          </ProjectVideo>
        </Flex>
      </article>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project
