import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Doormat from '../components/Doormat'
import { colors, breakpoints } from '../utils/theme'

const Container = styled(Box)`
  max-width: 1280px;
`

const PageFlex = styled(Flex)`
  background-color: ${colors.brokenWhite};
`

const DoormatFlex = styled(Flex)`
  background-color: ${colors.lightBlue};
`

const FooterFlex = styled(Flex)`
  background-color: ${colors.darkBlue};
`


// https://github.com/kyleamathews/typography.js
// http://jxnblk.com/grid-styled/

export default ({ children, data }) => {
  const siteMetadata = data.site.siteMetadata

  return (
    <ThemeProvider
      theme={{
        breakpoints: breakpoints,
      }}
    >
      <div>
        <PageFlex>
          <Container px={20} py={40} mx="auto">
            <Header bio={siteMetadata.bio} social={siteMetadata.social} />
            {children()}
          </Container>
        </PageFlex>
        <DoormatFlex>
          <Container px={20} py={80} mx="auto">
            <Doormat bio={siteMetadata.bio} />
          </Container>
        </DoormatFlex>
        <FooterFlex>
          <Container px={20} py={160} mx="auto">
            <Footer bio={siteMetadata.bio} />
          </Container>
        </FooterFlex>
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
          email
          phone
          description
          title
          other
        }
        social {
          github
          twitter
          linkedin
        }
      }
    }
  }
`
