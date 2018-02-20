import React from 'react'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

import SocialLinks from '../SocialLinks'
import PrintButton from '../PrintButton'
import Bio from '../../components/Bio'
import Anchor from '../../components/Anchor'

const AnchorDiv = styled.div`
  margin-bottom: 15px;
`

const Header = ({ bio, social }) => (
  <header>
    <Flex justifyContent="space-between" flexWrap={['wrap', 'nowrap']}>
      <Box flex="0 0 auto" order={10}>
        <SocialLinks links={social} />
        <AnchorDiv>
          <Anchor href={`mailto:${bio.email}`}>{bio.email}</Anchor>
        </AnchorDiv>
        <div>
          {bio.phone}
        </div>
      </Box>
      <Box flex="0 1 auto" order={[40, 20]} px={[0, 40]} mb={[80, 100]} mt={[50, 0]}>
        <Bio name={bio.name} description={bio.description} />
      </Box>
      <Box flex="0 0 auto" order={30}>
        <PrintButton />
      </Box>
    </Flex>
  </header>
)

export default Header
