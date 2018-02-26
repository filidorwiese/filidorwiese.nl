import React from 'react'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

import PrintHide from '../PrintHide'
import PrintShow from '../PrintShow'
import SocialLinks from '../SocialLinks'
import PrintButton from '../PrintButton'
import Bio from '../../components/Bio'
import Anchor from '../../components/Anchor'

const AnchorDiv = styled.div`
  margin-bottom: 15px;
`

const BioWrapper = styled(Box)`
  width: 100%;
`

const Photo = styled.img`
  float: right;
  max-width: 25%;
`

const Header = ({ bio, social, tags }) => (
  <header>
    <PrintHide>
      <Flex justifyContent="space-between" flexWrap={['wrap', 'wrap', 'nowrap']}>
        <Box flex="0 0 auto" order={10}>
          <SocialLinks links={social} />
          <AnchorDiv>
            <Anchor href={`mailto:${bio.email}`}>{bio.email}</Anchor>
          </AnchorDiv>
          <div>
            {bio.phone}
          </div>
        </Box>
        <BioWrapper flex="0 1 auto" order={[40, 40, 20]} px={[0, 0, 40]} mb={[60, 60, 60]} mt={[50, 50, 0]}>
          <Bio name={bio.name} headline={bio.headline} />
        </BioWrapper>
        <Box flex="0 0 auto" order={30}>
          <PrintButton />
        </Box>
      </Flex>
    </PrintHide>
    <PrintShow>
      <Photo src='filidor-wiese.jpg' alt={bio.name} />
      <h4>Curriculum Vitae<br />{bio.name}</h4>
      <p>{bio.title}</p>
      <table>
        <tbody>
          <tr>
            <td>Nationality</td>
            <td>{bio.nationality}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{bio.phone}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{bio.email}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>{bio.url}</td>
          </tr>
          <tr>
            <td>LinkedIn</td>
            <td>{social.linkedin}</td>
          </tr>
          <tr>
            <td>Github</td>
            <td>{social.github}</td>
          </tr>
        </tbody>
      </table>
      <Bio name={bio.name} description={bio.description} tags={tags} />
    </PrintShow>
  </header>
)

export default Header
