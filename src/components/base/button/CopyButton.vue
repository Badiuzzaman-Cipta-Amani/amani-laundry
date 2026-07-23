<script setup lang="ts">
import { Copy } from "@lucide/vue"
import { ref } from "vue"

const { copyText } = defineProps<{
  copyText: string
}>()

const isTooltipShow = ref(false)
const copyTooltip = ref("Tersalin!")

const copyLink = (post: any) => {
  const url = copyText
  navigator.clipboard.writeText(url).then(() => {
    isTooltipShow.value = true
    setTimeout(() => (isTooltipShow.value = false), 2000)
  })
}
</script>

<template>
  <button
    class="tooltip flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
    :data-tooltip="copyTooltip"
    :class="{ show: isTooltipShow }"
    @click="copyLink"
  >
    <slot>
      <Copy class="size-4" />
      Salin Link
    </slot>
  </button>
</template>
