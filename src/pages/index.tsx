import React, { FC } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Query } from '../graphql-types'

import Layout from 'components/layout'
import SEO from '../components/seo'

const LatesPostListQuery = graphql`
  query LatestPostListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 200)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD HH:mm:ss")
          }
          id
        }
      }
    }
  }
`

const IndexPage: FC = () => {
  const data = useStaticQuery<Query>(LatesPostListQuery)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>최근 작성한 게시글</h1>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <h2>
              <Link to={node.frontmatter.title}>{node.frontmatter.title}</Link>
            </h2>
            <h3>{node.frontmatter.date}</h3>
            <p>{node.excerpt}</p>
            <hr />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage
