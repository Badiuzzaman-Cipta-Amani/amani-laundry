<script setup>
import ShareButton from "./ShareButton.vue"

defineProps({
  post: Object,
})
</script>

<template>
  <div
    class="rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-2xl hover:shadow-amani-blue/10"
  >
    <div
      class="relative h-52 overflow-hidden rounded-t-2xl bg-linear-to-br from-indigo-100 to-blue-100"
    >
      <img
        :src="post.image"
        :alt="post.title"
        class="h-full w-full object-cover"
        onerror="this.style.display = &quot;none&quot;"
      />
      <div
        class="absolute top-4 left-4 rounded-full bg-amani-yellow px-3.5 py-1.5 text-sm font-bold text-amani-blue-dark"
      >
        {{ post.categoryLabel }}
      </div>
    </div>
    <div class="p-6">
      <div class="mb-2 flex items-center gap-2 text-xs text-slate-600">
        <div class="">Oleh {{ post.author }}</div>
        <span class="text-[5px]">⬤</span>
        <div>{{ post.date }}</div>
      </div>
      <a :href="`/blogs/${post.slug}`">
        <h3
          class="mb-2.5 text-lg leading-snug font-bold text-slate-800 hover:text-amani-blue"
        >
          {{ post.title }}
        </h3>
      </a>
      <p class="mb-4 text-base leading-relaxed text-slate-600">{{ post.excerpt }}</p>
      <div class="flex gap-3">
        <a
          :href="`/blogs/${post.slug}`"
          class="flex-1 rounded-xl bg-amani-blue py-2 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-amani-blue-dark"
        >
          Baca Artikel
        </a>
        <ShareButton client:load :post="post" buttonVariant="outline">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
            ></path>
          </svg>
        </ShareButton>
      </div>
    </div>
  </div>
</template>
