import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Video from '../Video'
import PrintHide from '../PrintHide'
import PrintShow from '../PrintShow'
import PrintNoBreak from '../PrintNoBreak'

const Wrapper = styled.div`  
  @media screen {
    max-width: 800px;
    text-align: center;
    color: #FFF;

    h4 {
      color: #FFF;
    }
  }
`

const BrowserMini = styled(Box)`
  margin: 0 2%;
`

const Doormat = ({ bio }) => {
  return (
    <Wrapper>
      <PrintNoBreak>
        <h4>Other projects</h4>
        <p>
          {bio.earlier}
        </p>
      </PrintNoBreak>
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
        <PrintNoBreak>
          <h4>Education</h4>
          <table>
            <tbody>
              {bio.education.map(({year, title}, key) => (
                <tr key={key}>
                  <td>{year}</td>
                  <td>{title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PrintNoBreak>
        <h4>Recommendations</h4>
        {bio.recommendations.map(({author, quote}, key) => (
          <aside key={key}>
            <PrintNoBreak>
              <p>{author}</p>
              <blockquote>&ldquo;{quote}&rdquo;</blockquote>
            </PrintNoBreak>
          </aside>
        ))}
        <PrintNoBreak>
          <h4>Honors and Awards</h4>
          <table>
            <tbody>
              {bio.awards.map(({year, title}, key) => (
                <tr key={key}>
                  <td>{year}</td>
                  <td>{title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PrintNoBreak>
      </PrintShow>
    </Wrapper>
  )
}

export default Doormat
