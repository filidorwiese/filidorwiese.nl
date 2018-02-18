import React from 'react'

const Footer = ({ bio }) => (
  <footer>
    <div>
      <p>
        You can reach me by mail at {bio.email} or by phone on {bio.phone}
      </p>
    </div>
  </footer>
)

export default Footer
