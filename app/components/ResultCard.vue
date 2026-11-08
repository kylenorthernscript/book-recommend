<script setup lang="ts">
import type { Book } from '../data/books'

defineProps<{
  book: Book
  questions: readonly string[]
  answers: readonly boolean[]
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
    <h3 class="title is-6 mb-3">あなたの回答</h3>
    <ol class="mb-5">
      <li v-for="(question, index) in questions" :key="question" class="answer-row">
        <span>{{ question }}</span>
        <span class="tag is-primary is-rounded answer-tag" :class="{ 'is-light': !answers[index] }">
          {{ answers[index] ? 'はい' : 'いいえ' }}
        </span>
      </li>
    </ol>
    <div class="has-text-centered">
      <button class="button is-primary is-rounded" type="button" @click="$emit('restart')">もう一度診断する</button>
    </div>
  </div>
</template>

<style scoped>
.answer-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding-block: 0.5rem;
}

.answer-tag {
  flex-shrink: 0;
}

h2:focus {
  outline: none;
}
</style>
