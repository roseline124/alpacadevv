import { CreatePagesArgs } from 'gatsby'
import path from 'path'
import { Query } from '../graphql-types'
import { Template } from '../types'

function getTemplate(category: Template) {
  switch (category) {
    case Template.POST: {
      return '../components/templates/PostTemplate.tsx'
    }
    default: {
      return ''
    }
  }
}

export async function createPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions
  const { data, errors } = await graphql<Query>(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date(formatString: "YYYY-MM-DD HH:mm:ss")
              title
            }
            html
            parent {
              ... on File {
                id
                name
                dir
              }
            }
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  data.allMarkdownRemark.edges.forEach(
    ({ node: { parent, frontmatter, html } }: any) => {
      const directories = parent.dir.split('/')
      const category = directories[directories.length - 1]

      const fileName = parent.name

      createPage({
        path: `${category}/${fileName}`,
        context: {
          html: html,
          ...frontmatter,
        },
        component: path.resolve(__dirname, getTemplate(category)),
      })
    },
  )
}
