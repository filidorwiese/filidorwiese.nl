import React from 'react'
import SocialLinks from '../SocialLinks'
import PrintButton from '../PrintButton'
import Contact from '../Contact'
import Bio from '../Bio'

const Header = ({ bio, social }) => (
  <header>
    <SocialLinks links={social} />
    <Contact email={bio.email} phone={bio.phone} />
    <PrintButton />
    <Bio name={bio.name} description={bio.description} />
  </header>
)

export default Header
