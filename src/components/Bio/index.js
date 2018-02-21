import React from 'react'
import styled from 'styled-components'
import { Box } from 'grid-styled'

import { breakpoints } from '../../utils/theme'
import devices from '../../assets/images/devices.svg'
import Video from '../Video'
import Fili from '../Fili'

const Bio = styled(Box)`
  text-align: center;
`

const Blockquote = styled.blockquote`
  margin: 0;
  @media (max-width: ${breakpoints[0]}) {
    font-size: 1rem;
    line-height: 1.6;
  }
  @media (max-width: 40em) {
    text-align: left;
  }
`

const Devices = styled(Box)`
  position: relative;
  background: 0 0 url(${devices}) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  padding-top: 45%;
`

const Desktop = styled.div`
  video {
    position: absolute;
    z-index: 1;
    top: 4%;
    left: 25%;
    width: 50%;
  }
`

const Laptop = styled.div`
  video {
    position: absolute;
    z-index: 10;
    top: 54%;
    left: 63%;
    width: 28%;
  }
`

export default ({ name, description }) => (
  <Bio>
    <Devices px={20} mt={40} mb={60} id='devices'>
      <Fili />
      <Desktop>
        <Video video={'beee5905-bc83-4164-9c64-51f4bd7f0a79.mp4'} />
      </Desktop>
      <Laptop>
        <Video video={'beee5905-bc83-4164-9c64-51f4bd7f0a79.mp4'} />
      </Laptop>
    </Devices>
    <h1>{name}</h1>
    <Blockquote>{description}</Blockquote>
  </Bio>
)
