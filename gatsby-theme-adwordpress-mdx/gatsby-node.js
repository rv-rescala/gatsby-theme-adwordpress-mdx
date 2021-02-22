const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')
const CreatePagesMdx = require(`./gatsby/create-pages-mdx`)
const CreatePagesWp = require(`./gatsby/create-pages-wp`)
const { CreateWpDataSchema } = require(`./gatsby/create-schemas`)
const { CreateTypeMdxWpPosts } = require(`./gatsby/create-types`)
const {
  CreateNodeWP,
  CreateNodeMDX,
  CreateNodeWPPage,
  CreateNodeMDXPage
} = require(`./gatsby/create-nodes`)

exports.createSchemaCustomization = ({ actions }) => {
  CreateWpDataSchema(actions)
}

exports.sourceNodes = ({ actions, schema }) => {
  CreateTypeMdxWpPosts(actions, schema)
}

exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value
    })
    if (parent.internal.type === 'File') {
      createNodeField({
        name: `sourceName`,
        node,
        value: parent.sourceInstanceName
      })
      // create mdx post with WP
      CreateNodeMDX({
        node,
        getNode,
        createNodeId,
        createContentDigest,
        actions
      })
      // create mdx page with WP
      CreateNodeMDXPage({
        node,
        getNode,
        createNodeId,
        createContentDigest,
        actions
      })
    }
  }
  if (node.internal.type === 'wordpress__POST') {
    // create WP post with MDX
    CreateNodeWP({
      node,
      getNode,
      createNodeId,
      createContentDigest,
      actions
    })
  }
  // wp pages
  if (node.internal.type === 'wordpress__PAGE') {
    // create WP page
    CreateNodeWPPage({
      node,
      getNode,
      createNodeId,
      createContentDigest,
      actions
    })
  }
}

exports.createPages = async (
  { page, graphql, actions, reporter },
  pluginOptions
) => {
  const {
    sourceWordpress: { sourcePost = false, sourcePage = false },
    sourceMdxPosts = false
  } = pluginOptions
  if (sourcePost || sourcePage) {
    /**
     * Create each page and post from WP
     */
    await CreatePagesWp(actions, graphql, reporter, sourcePost, sourcePage)
  }

  /**
   * Create each page of mdx
   */
  await CreatePagesMdx(actions, graphql, reporter, sourceMdxPosts)
}
