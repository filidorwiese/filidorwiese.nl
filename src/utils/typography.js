import Typography from 'typography'
import { colors } from './theme'

const typography = new Typography({
  baseFontSize: '18px',
  headerFontFamily: ['Karla', 'sans-serif'],
  bodyFontFamily: ['Karla', 'sans-serif'],
  headerColor: colors.lightBlue,
  bodyColor: colors.darkBlue,
  googleFonts: [
    {
      name: 'Karla',
      styles: [
        '700',
      ],
    },
  ],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    'body': {
      'letter-spacing': '-1px'
    },
    'h1': {
      ...adjustFontSizeTo('32px'),
    },
    'h2, h3, h4': {
      ...adjustFontSizeTo('28px'),
    },
    'article li': {
      ...adjustFontSizeTo('16px'),
      'letter-spacing': '0'
    },
    blockquote: {
      ...adjustFontSizeTo('28px'),
    },
    footer: {
      ...adjustFontSizeTo('28px')
    }
  })
})

export default typography