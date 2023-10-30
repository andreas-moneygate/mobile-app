import { QueryFunctionContext, QueryKey } from 'react-query'

function queryKeyParse({ queryKey }: QueryFunctionContext<QueryKey>) {
  const callApiParams: { [key: string]: unknown } = {}

  for (let i = 0; i <= queryKey.length; i += 2) {
    if (typeof queryKey[i] === 'string') {
      callApiParams[queryKey[i] as string] = queryKey[i + 1]
    }
  }

  return callApiParams
}

export default queryKeyParse
