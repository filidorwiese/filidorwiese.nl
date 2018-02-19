import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

import { colors } from '../../utils/theme'
import iconLink from '../../assets/images/icon_link.svg'
import iconTime from '../../assets/images/icon_time.svg'
import iconTech from '../../assets/images/icon_tech.svg'
import Anchor from '../../components/Anchor'
import Video from '../../components/Video'

const ProjectLine = styled(Box)`
  border-top: 2px solid ${colors.extreLightBlue};
`

const ProjectDescription = styled(Box)``

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const LiTime = styled.li`
  background: 0 4px url(${iconTime}) no-repeat;
  background-size: 20px 20px;
  margin-left: 0;
  padding-left: 40px;
`

const LiTech = styled.li`
  background: 0 4px url(${iconTech}) no-repeat;
  background-size: 20px 20px;
  margin-left: 0;
  padding-left: 40px;
`

const LiLink = styled.li`
  background: 0 4px url(${iconLink}) no-repeat;
  background-size: 20px 20px;
  margin-left: 0;
  padding-left: 40px;
`

const stripHttpWww = (string) => string.replace(/http(s):\/\/(www\.)?/, '')

class Project extends React.PureComponent {
  render() {
    const {
      excerpt,
      frontmatter: { title, url, date, tags, video },
    } = this.props.project

    return (
      <article>
        <Flex flexWrap={['wrap', 'nowrap']} py={60}>
          <ProjectLine flex="0 0 auto" order={10} width={[40, 60]} />
          <ProjectDescription flex="1 1 auto" px={[50, 40]} order={20}>
            <h2>{title}</h2>
            <p>{excerpt}</p>
            <Ul>
              <LiTime>{date}</LiTime>
              <LiTech>{tags}</LiTech>
              {url && <LiLink>
                <Anchor href={url}>{stripHttpWww(url)}</Anchor>
              </LiLink>}
            </Ul>
          </ProjectDescription>
          <Box flex="1 1 auto" order={[1, 30]} mb={[20, 0]}>
            <Video video={video} browser />
          </Box>
        </Flex>
      </article>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project
