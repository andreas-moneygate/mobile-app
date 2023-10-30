import { QueryFunctionContext, QueryKey } from 'react-query'
import callApi from 'utils/callApi'

export const getContactUsCategories = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Array<string>> =>
  callApi('/Email/categories', {
    method: 'GET',
    query: { languageCode: 'en' },
  })

export const sendContactUsMessage = ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<undefined> => {
  const [, category, content] = queryKey as [never, string, string]
  return callApi('/Email', {
    method: 'POST',
    body: {
      category,
      content,
    },
  })
}
