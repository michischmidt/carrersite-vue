<script setup lang="ts">
import { onMounted, ref } from 'vue'

// ref kinda like useState in React & directly setValue with status.value
const name = ref('John Doe')
const status = ref('active')
const tasks = ref(['Task 1', 'Task 2', 'Task 3'])
const link = ref('https://vitejs.dev/')
const newTask = ref('')

const toggleStatus = () => {
  if (status.value === 'active') {
    status.value = 'inactive'
  } else {
    status.value = 'active'
  }
}

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

const deleteTask = (index: number) => {
  tasks.value.splice(index, 1)
}

onMounted(async () => {
  try {
    const res = await await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const data = await res.json()
    tasks.value = data.map((task: { title: string }) => task.title)
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'inactive'">User is inactive</p>
  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>{{ task }}</span
      ><button @click="deleteTask(index)">X</button>
    </li>
  </ul>
  <a :href="link" target="_blank">Click here</a>
  <br />
  <button @click="toggleStatus">Toggle Status</button>

  <form @submit.prevent="addTask">
    <label for="newTask">Add task</label>
    <input type="text" id="newTask" v-model="newTask" />
    <button type="submit">Submit</button>
  </form>
</template>
