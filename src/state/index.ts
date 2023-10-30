import { QueryCache, QueryClient } from 'react-query'

interface QueryClientOptions {
  authorize: () => Promise<void>
}
const configureQueryClient = ({ authorize }: QueryClientOptions) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
    queryCache: new QueryCache({
      onError: err => {
        if (
          err?.status === 401 ||
          (err?.status === 400 && err?.payload?.error === 'invalid_grant')
        ) {
          authorize()
        }
      },
    }),
  })

export default configureQueryClient
