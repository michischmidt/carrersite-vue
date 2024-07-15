import { QueryClient } from '@tanstack/vue-query'

const MAX_NUMBER_RETRIES = 1

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (failureCount < MAX_NUMBER_RETRIES) {
          // currently, we only retry on internal server errors
          if (error?.response?.status >= 500 && error?.response?.status < 600) {
            return true
          }
        }

        return false
      }
    }
  }
})
