import React from 'react'
import styled from 'styled-components'

const PrintShow = styled.div`
  @media screen {
    display: none;
  }
`

export default ({ children }) => {
  return <PrintShow>{children}</PrintShow>
}

