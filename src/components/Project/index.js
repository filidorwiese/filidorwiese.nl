import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

import { breakpoints, colors } from '../../utils/theme'
import IconTech from '../../components/Icons/tech'
import IconTime from '../../components/Icons/time'
import IconLink from '../../components/Icons/link'
import Anchor from '../../components/Anchor'
import Video from '../../components/Video'
import PrintNoBreak from '../../components/PrintNoBreak'

const ProjectWrapper = styled(Flex)`
  @media print {
    padding-bottom: 0;
  }
  @media screen {
    .printonly {
      display: none;
    }
  }
`

const ProjectLine = styled(Box)`
  border-top: 2px solid ${colors.extreLightBlue};
`

const ProjectDescription = styled(Box)``

const ProjectVideo = styled(Box)`
  min-width: 30%;
  
  @media (min-width: ${breakpoints[0]}) {
    max-width: 370px;
  }
  @media print {
    display: none;
  }
`

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  
  svg {
    transform: translateY(5px);
    width: 20px;
    margin-right: 14px;
  }
  
  li {
    margin-left: 0;
  }
`

const stripDomain = (string) => string.match(/https?:\/\/(?:www\.)?([a-z0-9\-.]*)(?:\/|$)/)[1]

class Project extends React.PureComponent {
  render() {
    const {
      html,
      frontmatter: { title, url, date, tags, video, poster, printonly },
    } = this.props.project

    return (
      <article className={printonly ? 'printonly' : ''}>
        <PrintNoBreak>
          <ProjectWrapper flexWrap={['wrap', 'nowrap']} py={60}>
            <ProjectLine flex="0 0 auto" order={10} width={[40, 60]} />
            <ProjectDescription flex="1 1 auto" pl={[50, 40]} pr={[0, 60]} order={20}>
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: html}} />
              <Ul>
                <li><IconTime />{date}</li>
                <li><IconTech />{tags}</li>
                {url && <li>
                  <IconLink />
                  <Anchor href={url} target='_blank'>{stripDomain(url)}</Anchor>
                </li>}
              </Ul>
            </ProjectDescription>
            <ProjectVideo flex="1 1 auto" order={[1, 30]} mb={[20, 0]}>
              <a href={url} target='_blank'>
                <Video video={video} poster={poster} browser disableOnMobile />
              </a>
            </ProjectVideo>
          </ProjectWrapper>
        </PrintNoBreak>
      </article>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project
