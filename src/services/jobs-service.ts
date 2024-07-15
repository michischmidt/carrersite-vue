import { client } from '@/util/http-common'
import { buildQueryParams } from '@/util/query-builder'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

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
  return useQuery<Job[], Error>({
    queryKey: ['jobs', params],
    queryFn: async () => {
      const queryString = buildQueryParams(params || {})
      const url = `${JOBS_STRING_URL}${queryString}`
      const response = await client.get(url)
      return response.data
    }
  })
}

export const useGetJob = (jobId: string) => {
  return useQuery<Job, Error>({
    queryKey: ['job', jobId],
    queryFn: async () => {
      const url = `${JOBS_STRING_URL}/${jobId}`
      const response = await client.get(url)
      return response.data
    }
  })
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (jobId: string): Promise<void> => {
      await client.delete(`${JOBS_STRING_URL}/${jobId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    }
  })
}
