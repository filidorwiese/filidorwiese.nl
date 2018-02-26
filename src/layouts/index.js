import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Doormat from '../components/Doormat'
import PrintHide from '../components/PrintHide'
import { colors, breakpoints } from '../utils/theme'

const Container = styled(Box)`
  max-width: 1440px;
`

const PageFlex = styled(Flex)`
  background-color: ${colors.brokenWhite};
  
  @media print {
    page-break-after: always;
  }
`

const DoormatFlex = styled(Flex)`
  background-color: ${colors.lightBlue};
`

const FooterFlex = styled(Flex)`
  background-color: ${colors.darkBlue};
`

export default ({ children, data }) => {
  const siteMetadata = data.site.siteMetadata

  // Collect tags from projects
  let tags = []
  data.allMarkdownRemark.edges.map((p) => {
    const moreTags = p.node.frontmatter.tags.split(', ')
    if (moreTags) tags = [...tags, ...p.node.frontmatter.tags.split(', ')]
  })

  return (
    <ThemeProvider
      theme={{
        breakpoints: breakpoints,
      }}
    >
      <div>
        <PageFlex>
          <Container px={20} py={40} mx="auto">
            <Header bio={siteMetadata.bio} social={siteMetadata.social} tags={tags} />
            {children()}
          </Container>
        </PageFlex>
        <DoormatFlex>
          <Container px={20} py={[40, 40, 80]} mx="auto">
            <Doormat bio={siteMetadata.bio} />
          </Container>
        </DoormatFlex>
        <PrintHide>
          <FooterFlex>
            <Container px={20} py={[40, 40, 100]} mx="auto">
              <Footer bio={siteMetadata.bio} />
            </Container>
          </FooterFlex>
        </PrintHide>
      </div>
    </ThemeProvider>
  )
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        bio {
          name
          nationality
          email
          phone
          title
          headline
          description
          earlier
          url
          education {
            year
            title
          }
          awards {
            year
            title
          }
          recommendations {
            author
            quote
          }
        }
        social {
          github
          twitter
          linkedin
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___sortdate], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(content)/.*.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`
