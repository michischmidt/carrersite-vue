<script setup>
import BackButton from '@/components/BackButton.vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import { useGetJob, useDeleteJob } from '@/services/jobs-service'

const route = useRoute()
const router = useRouter()
const { toast } = useToast()
const jobId = route.params.id

const { isLoading: jobIsLoading, data: jobData } = useGetJob(jobId)
const { mutate: mutateDeleteJob, isLoading: deleteMutateIsLoading } = useDeleteJob({
  onSuccess: () => {
    toast({
      description: 'Job deleted successfully.'
    })
    router.push('/jobs')
  },
  onError: (error) => {
    console.error('Error deleting job', error)
    toast({
      variant: 'destructive',
      description: 'There was an error deleting the job.'
    })
  }
})

const deleteJob = () => {
  const confirm = window.confirm('Are you sure you want to delete this job?')
  if (confirm) {
    mutateDeleteJob(jobId)
  }
}
</script>

<template>
  <BackButton />
  <section v-if="!jobIsLoading" class="bg-green-50">
    <div class="container m-auto px-6 py-10">
      <div class="md:grid-cols-70/30 grid w-full grid-cols-1 gap-6">
        <main>
          <div class="rounded-lg bg-white p-6 text-center shadow-md md:text-left">
            <div class="mb-4 text-gray-500">{{ jobData.type }}</div>
            <h1 class="mb-4 text-3xl font-bold">{{ jobData.title }}</h1>
            <div class="mb-4 flex justify-center align-middle text-gray-500 md:justify-start">
              <i class="pi pi-map-marker mr-2 text-xl text-blue-400"></i>
              <p class="text-blue-400">{{ jobData.location }}</p>
            </div>
          </div>

          <div class="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-2 text-lg font-bold text-green-800">Job Description</h3>

            <p class="mb-4">
              {{ jobData.description }}
            </p>

            <h3 class="mb-2 text-lg font-bold text-green-800">Salary</h3>

            <p class="mb-4">{{ jobData.salary }} / Year</p>
          </div>
        </main>
        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-xl font-bold">Company Info</h3>

            <h2 class="text-2xl">{{ jobData.company.name }}</h2>

            <p class="my-2">
              {{ jobData.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-gray-100 p-2">
              {{ jobData.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-gray-100 p-2">
              {{ jobData.company.contactPhone }}
            </p>
          </div>
          <!-- Manage -->
          <div class="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-xl font-bold">Manage Job</h3>
            <!-- <RouterLink
              :to="`/jobs/edit/${jobData.id}`"
              class="focus:shadow-outline mt-4 block w-full rounded-full bg-green-500 px-4 py-2 text-center font-bold text-white hover:bg-green-600 focus:outline-none"
              >Edit Job</RouterLink
            > -->
            <button
              @click="deleteJob"
              class="focus:shadow-outline mt-4 block w-full rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <div v-else class="py-6 text-center text-gray-500">...</div>
</template>
