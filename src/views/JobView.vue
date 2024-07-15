<script setup>
import BackButton from '@/components/BackButton.vue'
import { reactive, onMounted } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const jobId = route.params.id

const state = reactive({
  job: {},
  isLoading: true
})

const deleteJob = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this job?')
    if (confirm) {
      await axios.delete(`/api/jobs/${jobId}`)
      toast({
        description: 'Job deleted successfully.'
      })
      router.push('/jobs')
    }
  } catch (error) {
    console.error('Error deleting job', error)
    toast({
      variant: 'destructive',
      description: 'There was an error deleting the job.'
    })
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${jobId}`)
    state.job = response.data
  } catch (error) {
    console.error('Error fetching job', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto px-6 py-10">
      <div class="md:grid-cols-70/30 grid w-full grid-cols-1 gap-6">
        <main>
          <div class="rounded-lg bg-white p-6 text-center shadow-md md:text-left">
            <div class="mb-4 text-gray-500">{{ state.job.type }}</div>
            <h1 class="mb-4 text-3xl font-bold">{{ state.job.title }}</h1>
            <div class="mb-4 flex justify-center align-middle text-gray-500 md:justify-start">
              <i class="pi pi-map-marker mr-2 text-xl text-orange-700"></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-lg font-bold text-green-800">Job Description</h3>

            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="mb-2 text-lg font-bold text-green-800">Salary</h3>

            <p class="mb-4">{{ state.job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-xl font-bold">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.company.name }}</h2>

            <p class="my-2">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-xl font-bold">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${state.job.id}`"
              class="focus:shadow-outline mt-4 block w-full rounded-full bg-green-500 px-4 py-2 text-center font-bold text-white hover:bg-green-600 focus:outline-none"
              >Edit Job</RouterLink
            >
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

  <div v-else class="py-6 text-center text-gray-500">
    <PulseLoader />
  </div>
</template>
