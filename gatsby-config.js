module.exports = {
  siteMetadata: {
    bio: {
      name: 'Filidor Wiese',
      email: 'hi@filidorwiese.nl',
      phone: '+31 (0)6 24 99 32 05',
      description: 'As a freelance webdeveloper I have been working on projects for various companies such as Leaseplan, Fedex/TNT, Amsterdam Arena, Heineken and KLM. My passion is building pixel-perfect applications for the web, using modern techniques and Javascript frameworks, with an emphasis on performance, usability and search-engine friendliness.',
      title: 'Freelance Front-end Developer'
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    }
  ]
}
