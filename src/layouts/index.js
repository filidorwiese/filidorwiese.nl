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
`

const DoormatFlex = styled(Flex)`
  background-color: ${colors.lightBlue};
`

const FooterFlex = styled(Flex)`
  background-color: ${colors.darkBlue};
`

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
          <Container px={20} py={[40, 80]} mx="auto">
            <Doormat bio={siteMetadata.bio} />
          </Container>
        </DoormatFlex>
        <PrintHide>
          <FooterFlex>
            <Container px={20} py={[40, 100]} mx="auto">
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
  }
`
