import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box } from 'grid-styled'

import { breakpoints } from '../../utils/theme'
import devices from '../../assets/images/devices/devices.svg'
import phoneP from '../../assets/images/devices/phone-p.jpg'
import ipadP from '../../assets/images/devices/ipad-p.jpg'
import ipadL from '../../assets/images/devices/ipad-l.jpg'
import Video from '../Video'
import PrintHide from '../PrintHide'
import PrintShow from '../PrintShow'
import PrintNoBreak from '../PrintNoBreak'
import Fili from '../Fili'

const Bio = styled(Box)`
  text-align: center;
  
  @media print {
    text-align: left;
  }
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
  
  @media (min-width: ${breakpoints[0]}) {
    max-width: 700px;
    margin: 0 auto;
  }
  
  @media print {
    page-break-after: always;
  }
`

const scrollUpDown = keyframes`
  0%, 10% {
    background-position: 0 0;
  }

  90%, 100% {
    background-position: 0 100%;
  }
`;

const stepPages = keyframes`
  100% {
    background-position: 150% 0;
  }
`;


const Devices = styled(Box)`
  position: relative;
  width: 100%;
  padding-top: 45%;
  background: url(${devices}) 0 0 no-repeat;
  background-size: 100% 100%;
`

const Overlay = styled(Box)`
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  background: url(${devices}) 0 0 no-repeat;
  background-size: 100% 100%;
  width: 100%;
  padding-top: 45%;
  opacity: 0;
`

const Desktop = styled.div`
  position: absolute;
  z-index: 1;
  top: 4%;
  left: 25%;
  width: 50%;
  height: 63%;
  overflow: hidden;
  
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
`

const Laptop = styled.div`
  position: absolute;
  z-index: 10;
  top: 54%;
  left: 63%;
  width: 27%;
`

const PhoneP = styled.div`
  position: absolute;
  z-index: 10;
  top: 76.5%;
  left: 94.3%;
  width: 4.5%;
  height: 17.5%;
  background: url(${phoneP}) 0 0 no-repeat;
  background-size: cover;
  animation: 2s ${scrollUpDown} 5s ease-in-out infinite alternate;
`

const IpadP = styled.div`
  position: absolute;
  z-index: 10;
  top: 53.7%;
  left: 21.9%;
  width: 13.3%;
  height: 39.6%;
  background: url(${ipadP}) 0 0 no-repeat;
  background-size: cover;
  animation: ${stepPages} 4s steps(3) infinite;
`

const IpadL = styled.div`
  position: absolute;
  z-index: 5;
  top: 65%;
  left: 8%;
  width: 13.2%;
  height: 30%;
  background: url(${ipadL}) 0 0 no-repeat;
  background-size: cover;
`

const PhoneL = styled.div`
  position: absolute;
  z-index: 10;
  top: 87%;
  left: 2%;
  width: 10%;
  height: 12%;
  overflow: hidden;
  
  video {
    position: absolute;
    top: -33%;
    left: 0;
    width: 100%;
    height: auto;
  }
`

export default ({ name, description, headline }) => (
  <Bio>
    <PrintHide>
      <Devices px={20} mt={40} mb={60} id='devices'>
        <Fili />
        <Desktop>
          <Video video='media/tnt.mp4' poster='media/tnt.jpg' disableOnMobile />
        </Desktop>
        <Laptop>
          <Video video='media/wildlife.mp4' poster='media/wildlife.jpg' disableOnMobile />
        </Laptop>
        <PhoneP />
        <IpadP />
        <IpadL />
        <PhoneL>
          <Video video='media/heineken.mp4' poster='media/heineken.jpg' disableOnMobile />
        </PhoneL>
      </Devices>
      <h1>{name}</h1>
      <Blockquote>{headline}</Blockquote>
    </PrintHide>

    <PrintShow>
      <PrintNoBreak>
        <h4>Summary</h4>
        <Blockquote dangerouslySetInnerHTML={{__html: description}} />
      </PrintNoBreak>
    </PrintShow>
  </Bio>
)
