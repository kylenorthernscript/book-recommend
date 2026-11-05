<script setup lang="ts">
import type { Book } from '../data/books'

defineProps<{
  book: Book
}>()

defineEmits<{
  restart: []
}>()
</script>

<template>
  <div class="box">
    <p class="is-size-7 mb-2">あなたにおすすめの1冊</p>
    <h2 class="title is-3 mb-2" tabindex="-1">{{ book.title }}</h2>
    <p class="subtitle is-6 mb-5">{{ book.author }}</p>
    <div class="notification is-primary is-light">{{ book.appeal }}</div>
    <p class="mb-5">{{ book.summary }}</p>
    <div class="has-text-centered">
      <button class="button is-primary is-rounded" type="button" @click="$emit('restart')">もう一度診断する</button>
    </div>
  </div>
</template>

<style scoped>
h2:focus {
  outline: none;
}
</style>
