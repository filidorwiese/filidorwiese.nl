import React from 'react'
import styled from 'styled-components'

const PrintForceBreak = styled.div`
  @media print {
    page-break-before: always;
  }
`

export default ({ children }) => {
  return <PrintForceBreak>{children}</PrintForceBreak>
}

