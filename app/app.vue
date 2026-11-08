<script setup lang="ts">
import { books } from './data/books'
import { questions } from './data/questions'
import { recommendations } from './utils/scoring'

const answers = ref<boolean[]>([])
const readCount = ref(0)
const main = useTemplateRef<HTMLElement>('main')

const isFinished = computed(() => answers.value.length === questions.length)
const candidates = computed(() => (isFinished.value ? recommendations(books, answers.value) : []))
const currentBook = computed(() => candidates.value[readCount.value] ?? null)

function restart() {
  answers.value = []
  readCount.value = 0
}

// 画面が切り替わったら、読み上げとキーボード操作の位置を新しい見出しに移す。
watch([answers, readCount], async () => {
  await nextTick()
  main.value?.querySelector('h2')?.focus()
}, { deep: true })
</script>

<template>
  <main ref="main" class="section">
    <div class="container is-max-tablet">
      <header class="mb-5">
        <h1 class="title is-3 mb-3">読書タイプ診断</h1>
        <p class="subtitle is-6">はい・いいえの5問で、20冊からあなたに合う1冊を選びます。</p>
      </header>
      <ResultCard
        v-if="isFinished"
        :book="currentBook"
        :questions="questions"
        :answers="answers"
        :can-go-back="readCount > 0"
        @already-read="readCount++"
        @go-back="readCount--"
        @restart="restart"
      />
      <QuestionCard
        v-else
        :question="questions[answers.length]!"
        :number="answers.length + 1"
        :total="questions.length"
        @answer="answers.push($event)"
        @back="answers.pop()"
      />
    </div>
  </main>
</template>
