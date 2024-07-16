<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Basic Vue SPA with CRUD Operations'
  },
  subtitle: {
    type: String,
    default:
      'I created this project to learn Vue and have a good comparison to React. The project uses Tailwind for the styling, shadcn-vue for ready to use components, TanStack Query for async state management and JSON Placeholder for the mocking of the "persisted" data. The limitations of JSON Placeholder are that it does not support PUT, POST, PATCH, DELETE requests for now, so the features are implemented but postponed until a more robust solution for the backend and persistence layer is implemented.'
  }
})
</script>

<template>
  <section class="mb-4 bg-green-700 py-20">
    <div class="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          {{ title }}
        </h1>
        <p class="my-4 text-xl text-white">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>
