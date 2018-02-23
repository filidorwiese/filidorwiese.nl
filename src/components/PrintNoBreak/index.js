import React from 'react'
import styled from 'styled-components'

const PrintNoBreak = styled.div`
  @media print {
    page-break-inside: avoid;
    break-inside: avoid;
  }
`

export default ({ children }) => {
  return <PrintNoBreak>{children}</PrintNoBreak>
}

