import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Video from '../Video'

const Wrapper = styled.div`
  max-width: 800px;
  text-align: center;
  color: #FFF;
`

const H4 = styled.h4`
  color: #FFF;
`

const BrowserMini = styled(Box)`
  margin: 0 2%;
`

const Doormat = ({ bio }) => (
  <Wrapper>
    <div>
      <H4>Other projects</H4>
      <p>
        {bio.other}
      </p>
      <Flex mt={80}>
        <BrowserMini flex="1 1 auto">
          <a href='https://worldwide.vote/hillary-vs-trump/' target='_blank'>
            <Video video='media/hillaryvstrump.mp4' poster='media/hillaryvstrump.jpg' browser disableOnMobile />
          </a>
        </BrowserMini>
        <BrowserMini flex="1 1 auto">
          <a href='https://galaxy.fili.nl' target='_blank'>
            <Video video='media/galaxy.mp4' poster='media/galaxy.jpg' browser disableOnMobile />
          </a>
        </BrowserMini>
        <BrowserMini flex="1 1 auto">
          <a href='http://multeor.com' target='_blank'>
            <Video video='media/multeor.mp4' poster='media/multeor.jpg' browser disableOnMobile />
          </a>
        </BrowserMini>
      </Flex>
    </div>
  </Wrapper>
)

export default Doormat
