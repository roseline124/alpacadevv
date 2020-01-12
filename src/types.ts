import { ReplaceComponentRendererArgs } from 'gatsby'

export type TemplateProps<T> = ReplaceComponentRendererArgs['props'] & {
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
  } & T
}

export enum Template {
  FOOD = 'food',
  POST = 'post',
}
