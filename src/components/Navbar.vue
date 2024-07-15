<script setup>
// import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png'

// const isActiveLink = (routePath) => {
//   const route = useRoute();
//   return route.path === routePath;
// };
</script>

<template>
  <nav class="border-b border-green-500 bg-green-700">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="mr-4 flex flex-shrink-0 items-center" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="ml-2 hidden text-2xl font-bold text-white md:block">Vue Jobs</span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/jobs">Jobs</RouterLink>
              <RouterLink to="/jobs/add">Add Job</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
