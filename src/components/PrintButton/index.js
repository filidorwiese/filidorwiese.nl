import React from 'react'
import ReactGA from 'react-ga'
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

    ReactGA.event({
      category: 'User',
      action: 'Clicked Print'
    })
  }

  render() {
    return <Button onClick={this.onClick}>Print Resume</Button>
  }
}

export default PrintButton
