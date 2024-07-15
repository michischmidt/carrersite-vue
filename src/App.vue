<script setup lang="ts">
import NavbarMenu from './components/NavbarMenu.vue'
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <NavbarMenu />
  <Toaster />
  <RouterView />
  <VueQueryDevtools />
</template>

<style scoped></style>
