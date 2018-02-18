import React from 'react'
import { Flex, Box } from 'grid-styled'

import SocialLinks from '../SocialLinks'
import PrintButton from '../PrintButton'
import Contact from '../Contact'
import Bio from '../../components/Bio'

const Header = ({ bio, social }) => (
  <header>
    <Flex justifyContent='space-between' flexWrap={['wrap', 'nowrap']} >
      <Box flex='0 0 auto' order={10}>
        <SocialLinks links={social} />
        <Contact email={bio.email} phone={bio.phone} />
      </Box>
      <Box flex='0 1 auto' order={[40, 20]} px={40}>
        <Bio name={bio.name} description={bio.description} />
      </Box>
      <Box flex='0 0 auto' order={30}>
        <PrintButton />
      </Box>
    </Flex>
  </header>
)

export default Header
