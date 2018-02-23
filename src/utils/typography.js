import Typography from 'typography'
import { breakpoints, colors } from './theme'

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
      'page-break-after': 'avoid'
    },
    'article li': {
      ...adjustFontSizeTo('16px'),
      'letter-spacing': '0'
    },
    'header blockquote': {
      ...adjustFontSizeTo('28px'),
    },
    'footer': {
      ...adjustFontSizeTo('28px'),
      'line-height': 1.6
    },
    [`@media (max-width: ${breakpoints[0]})`]: {
      footer: {
        ...adjustFontSizeTo('18px'),
        'line-height': 1.6
      }
    },
    [`@media print`]: {
      html: {
        'font-size': '85%'
      }
    }
  })
})

export default typography