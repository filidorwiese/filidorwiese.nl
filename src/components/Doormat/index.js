import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

const Footer = styled.footer`
  max-width: 800px;
  text-align: center;
`

const BrowserMini = styled(Box)`
  border: 1px solid lime;
`

const Doormat = ({ bio }) => (
  <Footer>
    <div>
      <h4>Earlier projects</h4>
      <p>
        2001 t/m 2011, freelance projecten voor zeer diverse bedrijven als
        Jachthaven zuidwesthoek, USVA, Gemeente Drenthe, Internethost.nl,
        Gemeente Groningen, Buyways Rolls, Bevrijdingsfestival Groningen,
        Theater Peergroup, Vevida, Noorderzon, Four Corners, Kunstencentrum
        Groningen, en meer
      </p>
      <Flex>
        <BrowserMini flex='1 1 auto'>Hillary vs trump</BrowserMini>
        <BrowserMini flex='1 1 auto'>Multeor</BrowserMini>
        <BrowserMini flex='1 1 auto'>Galaxy.fili.nl</BrowserMini>
      </Flex>
    </div>
  </Footer>
)

export default Doormat
