import React from 'react'
import Helmet from 'react-helmet'
import Project from '../components/Project'

export default ({ data }) => {
  const siteMetadata = data.site.siteMetadata
  const pageTitle = `${siteMetadata.bio.name}, ${siteMetadata.bio.title}`
  const schemaOrg = {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'Person',
      'email': `mailto: ${siteMetadata.bio.email}`,
      'image': 'filidor-wiese.jpg',
      'jobTitle': siteMetadata.bio.title,
      'description': siteMetadata.bio.description,
      'name': siteMetadata.bio.name,
      'telephone': siteMetadata.bio.phone,
      'url': siteMetadata.url
    })
  }
  const projects = data.allMarkdownRemark.edges
  return (
    <main>
      <Helmet
        title={pageTitle}
        meta={[{ name: 'description', content: siteMetadata.bio.description }]}
        script={[schemaOrg]}
      />
      <div>
        {projects.map((project, key) => (
          <Project key={key} project={project.node} />
        ))}
      </div>
    </main>
  )
}

export const query = graphql`
  query PageQuery {
    site {
      siteMetadata {
        bio {
          name
          email
          phone
          title
          description
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___sortdate], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(content)/.*.md$/" } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            url
            sortdate
            date
            tags
            video
          }
        }
      }
    }
  }
`


// return {
//   type: 'application/ld+json',
//   innerHTML: JSON.stringify({
//     '@context': 'http://schema.org',
//     '@type': 'Organization',
//     name: 'Leaseplan',
//     makesOffer: {
//       '@type': 'Offer',
//       businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
//       priceCurrency: carCurrencyCode,
//       price: carPrice,
//       priceSpecification: {
//         '@type': 'priceSpecification',
//         eligibleQuantity: {
//           '@type': 'QuantitativeValue',
//           unitCode: 'MON',
//           unitText: 'Month',
//           value: 1
//         }
//       },
//       itemOffered: {
//         '@type': 'Car',
//         name: carName,
//         description: car.get('readMoreText'),
//         image: {
//           '@type': 'ImageObject',
//           width: 812,
//           height: 540,
//           url: galleryImageUrl
//         },
//         color: selectedColor.get('title'),
//         vehicleEngine: {
//           '@type': 'EngineSpecification',
//           name: car.getIn(['specifications', 'engine'])
//         },
//         bodyType: car.getIn(['specifications', 'body']),
//         fuelType: car.getIn(['specifications', 'fuel']),
//         fuelConsumption: car.getIn(['specifications', 'fuelConsumption']),
//         vehicleInteriorType: car.getIn(['specifications', 'interior']),
//         vehicleSeatingCapacity: car.getIn(['specifications', 'seats']),
//         vehicleTransmission: car.getIn(['specifications', 'transmission'])
//       }
//     }
//   })
