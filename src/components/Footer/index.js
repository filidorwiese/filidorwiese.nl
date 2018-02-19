import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  color: #FFF;
`

const Footer = ({ bio }) => (
  <Wrapper>
    <div>
      <p>
        You can reach me by mail at {bio.email} or by phone on {bio.phone}
      </p>
    </div>
  </Wrapper>
)

export default Footer
