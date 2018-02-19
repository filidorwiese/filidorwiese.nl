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
  margin: 0 20px;
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
          <Video video={'beee5905-bc83-4164-9c64-51f4bd7f0a79.mp4'} browser />
        </BrowserMini>
        <BrowserMini flex="1 1 auto">
          <Video video={'beee5905-bc83-4164-9c64-51f4bd7f0a79.mp4'} browser />
        </BrowserMini>
        <BrowserMini flex="1 1 auto">
          <Video video={'beee5905-bc83-4164-9c64-51f4bd7f0a79.mp4'} browser />
        </BrowserMini>
      </Flex>
    </div>
  </Wrapper>
)

export default Doormat
