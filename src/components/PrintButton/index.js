import React from 'react'

class PrintButton extends React.PureComponent {
  onClick = () => {
    window.print()
  }

  render() {
    return <button onClick={this.onClick}>Print Resume</button>
  }
}

export default PrintButton
