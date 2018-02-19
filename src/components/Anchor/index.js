import React from 'react'
import styled from 'styled-components'
import { colors } from '../../utils/theme'

const Anchor = styled.a`
  color: ${colors.lightBlue};
  
  &:hover {
    color: ${colors.darkBlue};
  }
`

export default ({ children, ...rest }) => {
  return <Anchor {...rest}>{children}</Anchor>
}

