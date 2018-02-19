import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  color: #FFF;
  text-align: center;
  line-height: 1.6;
`

const Footer = ({ bio }) => (
  <Wrapper>
    You can reach me by<br />
    mail at {bio.email} or<br />
    phone on {bio.phone}
  </Wrapper>
)

export default Footer
