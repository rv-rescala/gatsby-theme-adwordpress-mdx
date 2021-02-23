/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'MDX WP',
    description: 'It is a WP with MDX blog ',
    keywords: ['GatsbyJs', 'React', 'theme-ui'],
    siteURL: 'https://artezan-blog.netlify.com', // No trailing slash allowed!
    siteImage: '/preview.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '@CArtezan',
    author: {
      name: 'Cesar Artezan'
    }
  },
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#353e4a`,
        theme_color: `#353e4a`,
        display: `minimal-ui`,
        icon: `static/favicon.ico` // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site. www.theartezan.xyz wpdemo.gatsbycentral.com us-central1-kigali-162302.cloudfunctions.net/function-2
        baseUrl: 'wpdemo.gatsbycentral.com',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {
          jwt_user: process.env.WP_USER,
          jwt_pass: process.env.WP_PASSWORD,
          jwt_base_path: '/jwt-auth/v1/token'
        },
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
        // includedRoutes: [
        //   '**/categories',
        //   '**/posts',
        //   '**/pages',
        //   '**/media',
        //   '**/tags',
        //   '**/taxonomies',
        //   '**/users'
        // ]
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: `wpdemo.gatsbycentral.com`,
              protocol: `https`,
              postTypes: ['post', 'page']
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-theme-adwordpress-mdx',
      options: {
        // Requiered
        sourceWordpress: {
          sourcePost: true,
          sourcePage: true
        },
        // Requiered
        sourceMdxPosts: true,
        // config optional
        headerHeight: 64,
        sideBarWidth: 240,
        navButtonTheme: {
          showButtonTheme: true
          // text: 'Change',
          // colorsModes: ['deep', 'purple']
        },
        /* colorModes: {
          default: 'gray'
        }, */
        adSence: {
          dataAdClient: 'ca-pub-00000000000000',
          dataAdSlot: '00000000000000'
        },
        logo: `src/images/logo.svg` // This path is relative to the root of the site.
      }
    }
  ]
}
