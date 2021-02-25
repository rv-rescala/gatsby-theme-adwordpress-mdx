/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Header } from './Header'
import { useAllMdxWpPages, useSiteMetadata } from '../../Hooks'

export const HeaderContainer = ({ children }) => {
  const allMdxWpPages = useAllMdxWpPages()
  const { config } = useSiteMetadata()
  const links = allMdxWpPages.edges
    .filter(({ node: page }) => {
      return page.mdxData != null
    })
    .map(({ node: page }) => {
      // update 202010225 by rv: for mdx post and sort function
      console.log('Head Order is ' + page.mdxData.frontmatter.headOrder)
      const { mdxData } = page
      return {
        slug: mdxData.fields.slug,
        icon: mdxData.frontmatter.icon,
        title: page.title,
        headOrder: page.mdxData.frontmatter.headOrder
      }
    })
    .sort((x, y) => x.headOrder - y.headOrder)
  /*
  const links = allMdxWpPages.edges.map(({ node: page }) => {
    if(page.mdxData){
      console.log("Head Order is " + page.mdxData.frontmatter.headOrder)
    }
    if (page.type === 'WP') {
      const { wpData } = page
      return {
        slug: wpData.slug,
        icon: null,
        title: page.title
      }
    } else {
      const { mdxData } = page
      return {
        slug: mdxData.fields.slug,
        icon: mdxData.frontmatter.icon,
        title: page.title
      }
    }
  })*/
  return (
    <Header config={config} links={links}>
      {children}
    </Header>
  )
}
