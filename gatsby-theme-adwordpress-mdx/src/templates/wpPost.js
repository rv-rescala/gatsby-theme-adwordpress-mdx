/** @jsx jsx */
import * as React from 'react'

import { jsx, Styled, useThemeUI, css } from 'theme-ui'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Tag } from '../components/Tag'
import { Seo } from '../components/Seo'
import ScrollAnimation from 'react-animate-on-scroll'
import { formatDate, colorRange, getCurrentColors } from '../helpers'
import { Content } from '../components/Content'
import { ButtonIcon } from '../components/ButtonIcon'
import { AdCard } from '../components/AdSence'

export const WpPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
  featuredImage,
  excerpt,
  site,
  slug
}) => {
  const context = useThemeUI()
  const colorScale = colorRange(
    getCurrentColors(context).primary,
    getCurrentColors(context).secondary,
    tags ? tags.length : 2
  )
  return (
    <>
      <ScrollAnimation animateIn="fadeIn">
        <article
          sx={{
            mb: 7
          }}
        >
          <Seo
            title={`${site.siteMetadata.title} | ${title}`}
            description={excerpt}
            keywords={tags || []}
            siteURL={`${site.siteMetadata.siteURL}${slug}`}
            image={
              featuredImage && featuredImage.localFile
                ? featuredImage.localFile.childImageSharp.fluid.src.replace(
                    '/',
                    ''
                  )
                : ''
            }
            isBlogPostPage
          />
          {featuredImage && featuredImage.localFile && (
            <Styled.div
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                overflow: 'hidden',
                mb: 4
              }}
            >
              <Img
                fluid={featuredImage.localFile.childImageSharp.fluid}
                alt={title}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Styled.div>
          )}
          <Styled.div
            sx={{
              fontSize: 2,
              fontFamily: 'body',
              color: 'secondary',
              mb: 3
            }}
          >
            <AdCard />
            <h1>{title}</h1>
            <Styled.h1>{title}</Styled.h1>
            {formatDate(date)}{' '}
            {author && (
              <>
                {' '}
                <span>| By {author} </span>{' '}
              </>
            )}
          </Styled.div>
          {tags && (
            <ul
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 0,
                mt: 4,
                mb: 3,
                '> :nth-of-type(n)': {
                  mr: 2
                }
              }}
            >
              {tags.map(({ name }, index) => (
                <Tag key={index} color={colorScale[index]}>
                  {name}
                </Tag>
              ))}
            </ul>
          )}

          <Styled.div
            sx={css({
              img: {
                width: '100%  !important',
                height: 'auto  !important'
              }
            })}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
        <span>
          <ButtonIcon
            aria-label={'back'}
            onClick={() => window.history.back()}
            iconPath="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
          />
        </span>
      </ScrollAnimation>
    </>
  )
}

const WpPost = ({ data }) => {
  const {
    mdxWpPosts: { wpData: post },
    site
  } = data
  return (
    <Content config={site.config}>
      <WpPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={data.mdxWpPosts.date}
        author={post.author.name}
        featuredImage={post.featured_media}
        excerpt={post.excerpt}
        site={site}
        slug={post.slug}
      />
    </Content>
  )
}

export default WpPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
        description
        keywords
        siteURL
        siteImage
        twitterUsername
        author {
          name
        }
        config {
          headerHeight
          sideBarWidth
          logo
          navButtonTheme {
            showButtonTheme
            text
            colorsModes
          }
          colorModes {
            default
          }
          adSence {
            dataAdClient
            dataAdSlot
          }
        }
      }
    }
    mdxWpPosts(id: { eq: $id }) {
      date
      wpData {
        title
        slug
        content
        excerpt
        categories {
          name
          slug
        }
        tags {
          name
          slug
        }
        author {
          name
        }
        featured_media {
          localFile {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    }
  }
`
