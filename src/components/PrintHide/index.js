import React from 'react'
import styled from 'styled-components'

const PrintHide = styled.div`
  @media print {
    display: none;
  }
`

export default ({ children }) => {
  return <PrintHide>{children}</PrintHide>
}

