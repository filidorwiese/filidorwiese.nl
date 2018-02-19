import React from 'react'
import styled from 'styled-components'
import { Box } from 'grid-styled'

import multiScreen from '../../assets/images/multiscreen.svg'

const Bio = styled(Box)`
  text-align: center;
`

export default ({ name, description }) => (
  <Bio mb={180}>
    <Box px={20} my={30}>
      <img src={multiScreen} />
    </Box>
    <h1>{name}</h1>
    <blockquote>{description}</blockquote>
  </Bio>
)
