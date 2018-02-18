import React from 'react'
import styled from 'styled-components'

const Bio = styled.div`
  max-width: 700px;
  text-align: center;
`

export default ({ name, description }) => (
  <Bio>
    <h1>{name}</h1>
    <p>{description}</p>
  </Bio>
)
