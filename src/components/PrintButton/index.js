import React from 'react'
import styled from 'styled-components'
import { colors } from '../../utils/theme'

const Button = styled.button`
  border: 0;
  background-color: ${colors.darkBlue};
  color: #fff;
  padding: 8px 18px;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.lightBlue};
  }
`

class PrintButton extends React.PureComponent {
  onClick = () => {
    window.print()
  }

  render() {
    return <Button onClick={this.onClick}>Print Resume</Button>
  }
}

export default PrintButton
