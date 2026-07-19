<script setup lang="ts">
import { ref } from 'vue';

const { copyText } = defineProps<{
  copyText: string
}>()

const isTooltipShow = ref(false);
const copyTooltip = ref("Tersalin!")

const copyLink = (post: any) => {
  const url = copyText;
  navigator.clipboard.writeText(url).then(() => {
    isTooltipShow.value = true;
    setTimeout(() => isTooltipShow.value = false, 2000);
  });
}
</script>

<template>
  <button
    class="tooltip px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2"
    :data-tooltip="copyTooltip"
    :class="{ 'show': isTooltipShow }"
    @click="copyLink"
  >
    <slot>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
        </path>
      </svg>
      Salin Link
    </slot>
  </button>
</template>
