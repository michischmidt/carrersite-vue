<script setup>
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/logo.png'

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/jobs/add', label: 'Add Job' },
  { to: 'https://michaelschmidt.frontstart.de', label: 'Contact', target: '_blank' }
]
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
              <template v-for="link in links" :key="link.to">
                <RouterLink
                  v-if="!link.target"
                  :to="link.to"
                  :class="[
                    isActiveLink(link.to) ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md'
                  ]"
                  >{{ link.label }}</RouterLink
                >
                <a
                  v-else
                  :href="link.to"
                  :target="link.target"
                  :class="[
                    'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md'
                  ]"
                  >{{ link.label }}</a
                >
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
