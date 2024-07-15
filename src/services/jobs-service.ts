import { client } from '@/util/http-common'
import { useQuery, type UseQueryOptions } from '@tanstack/vue-query'

const JOBS_STRING_URL = 'https://my-json-server.typicode.com/michischmidt/carrersite-vue/jobs'

export type Job = {
  id: string
  title: string
  description: string
  location: string
  salary: number
  company: {
    name: string
    description: string
    contactEmail: string
    contactPhone: string
  }
}

export const useGetJobs = (limit?: number) => {
  const queryOptions: UseQueryOptions<Job[], Error> = {
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await client.get(`${JOBS_STRING_URL}?_limit=${(limit as number) || ''}`)
      return response.data
    }
  }

  return useQuery<Job[], Error>(queryOptions)
}
