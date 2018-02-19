module.exports = {
  siteMetadata: {
    bio: {
      name: 'Filidor Wiese',
      email: 'hi@filidorwiese.nl',
      phone: '+31 (0)6 24 99 32 05',
      title: 'Freelance Front-end Developer',
      description: 'I build pixel-perfect applications for the web, using modern techniques and Javascript frameworks, with an emphasis on performance, usability and search-engine friendliness.',
      other: `Earlier work includes projects for various companies such as
        Jachthaven Zuidwesthoek, USVA, Gemeente Drenthe, Internethost.nl,
        Gemeente Groningen, Buyways Rolls, Bevrijdingsfestival Groningen,
        Theater Peergroup, Vevida, Noorderzon, Four Corners, Kunstencentrum
        Groningen, and others`
    },
    social: {
      github: 'https://github.com/filidorwiese/',
      twitter: 'https://twitter.com/filidorwiese/',
      linkedin: 'https://www.linkedin.com/in/filidorwiese/'
    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    }
  ]
}
