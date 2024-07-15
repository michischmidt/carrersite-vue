import { client } from '@/util/http-common'
import { buildQueryParams } from '@/util/query-builder'
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

export const useGetJobs = (params?: Record<string, any>) => {
  const queryOptions: UseQueryOptions<Job[], Error> = {
    queryKey: ['jobs', params],
    queryFn: async () => {
      const queryString = buildQueryParams(params || {})
      const url = `${JOBS_STRING_URL}${queryString}`
      const response = await client.get(url)
      return response.data
    }
  }

  return useQuery<Job[], Error>(queryOptions)
}

export const useGetJob = (id: string) => {
  const queryOptions: UseQueryOptions<Job, Error> = {
    queryKey: ['job', id],
    queryFn: async () => {
      const url = `${JOBS_STRING_URL}/${id}`
      const response = await client.get(url)
      return response.data
    }
  }

  return useQuery<Job, Error>(queryOptions)
}
