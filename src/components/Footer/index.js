import React from 'react'

const Footer = ({ bio }) => (
  <footer>
    <div>
      <h4>Earlier projects</h4>
      <p>
        2001 t/m 2011, freelance projecten voor zeer diverse bedrijven als
        Jachthaven zuidwesthoek, USVA, Gemeente Drenthe, Internethost.nl,
        Gemeente Groningen, Buyways Rolls, Bevrijdingsfestival Groningen,
        Theater Peergroup, Vevida, Noorderzon, Four Corners, Kunstencentrum
        Groningen, en meer
      </p>
      <div>Hillary vs trump Multeor Galaxy.fili.nl</div>
    </div>
    <div>
      <p>
        You can reach me by mail at {bio.email} or by phone on {bio.phone}
      </p>
    </div>
  </footer>
)

export default Footer
