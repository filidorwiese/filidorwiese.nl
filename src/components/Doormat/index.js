import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Video from '../Video'
import PrintHide from '../PrintHide'
import PrintShow from '../PrintShow'

const Wrapper = styled.div`  
  @media screen {
    max-width: 800px;
    text-align: center;
    color: #FFF;

    h4 {
      color: #FFF;
    }
  }
  
  @media print {
    .print--nobreak {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }
`

const BrowserMini = styled(Box)`
  margin: 0 2%;
`

const Doormat = ({ bio }) => {
  return (
    <Wrapper>
      <div>
        <div className='print--nobreak'>
          <h4>Other projects</h4>
          <p>
            {bio.earlier}
          </p>
        </div>
        <PrintHide>
          <Flex mt={80}>
            <BrowserMini flex="1 1 auto">
              <a href='https://worldwide.vote/hillary-vs-trump/' target='_blank'>
                <Video video='media/hillaryvstrump.mp4' poster='media/hillaryvstrump.jpg' browser disableOnMobile />
              </a>
            </BrowserMini>
            <BrowserMini flex="1 1 auto">
              <a href='https://galaxy.fili.nl' target='_blank'>
                <Video video='media/galaxy.mp4' poster='media/galaxy.jpg' browser disableOnMobile />
              </a>
            </BrowserMini>
            <BrowserMini flex="1 1 auto">
              <a href='http://multeor.com' target='_blank'>
                <Video video='media/multeor.mp4' poster='media/multeor.jpg' browser disableOnMobile />
              </a>
            </BrowserMini>
          </Flex>
        </PrintHide>
        <PrintShow>
          <h4>Education</h4>
          <table>
            {bio.education.map(({year, title}, key) => (
              <tr key={key}>
                <td>{year}</td>
                <td>{title}</td>
              </tr>
            ))}
          </table>

          <h4>Recommendations</h4>
          {bio.recommendations.map(({author, quote}, key) => (
            <aside className='print--nobreak' key={key}>
              <p>{author}</p>
              <blockquote>&ldquo;{quote}&rdquo;</blockquote>
            </aside>
          ))}
        </PrintShow>
      </div>
    </Wrapper>
  )
}

export default Doormat
