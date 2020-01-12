import React, { FC, memo } from 'react'
import Layout from '../layout'
import { TemplateProps } from '../../types'

type PostTemplateProps = TemplateProps<{
  html: string
  date: string
  title: string
}>

const PostTemplate: FC<PostTemplateProps> = memo(props => {
  const { title, date, html } = props.pageContext
  return (
    <Layout>
      <h2>{title}</h2>
      <h4>{date}</h4>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
})

PostTemplate.displayName = 'PostTemplate'

export default PostTemplate
