<script setup lang="ts">
defineProps<{
  question: string
  number: number
  total: number
}>()

defineEmits<{
  answer: [yes: boolean]
  back: []
}>()
</script>

<template>
  <div class="box">
    <p class="is-size-6 mb-2">質問 {{ number }} / {{ total }}</p>
    <progress
      class="progress is-primary is-small"
      :value="number - 1"
      :max="total"
      :aria-label="`${total}問中${number - 1}問に回答済み`"
    />
    <h2 class="title is-4 my-5" tabindex="-1">{{ question }}</h2>
    <div class="buttons is-centered are-medium">
      <button class="button is-primary is-rounded answer-button" type="button" @click="$emit('answer', true)">はい</button>
      <button class="button is-primary is-light is-rounded answer-button" type="button" @click="$emit('answer', false)">いいえ</button>
    </div>
    <div class="has-text-centered">
      <button
        v-if="number > 1"
        class="button is-text is-small"
        type="button"
        @click="$emit('back')"
      >
        ひとつ前に戻る
      </button>
    </div>
  </div>
</template>

<style scoped>
.answer-button {
  min-width: 8rem;
}

h2:focus {
  outline: none;
}
</style>
