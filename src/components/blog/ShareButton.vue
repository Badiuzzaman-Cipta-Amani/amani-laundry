<script setup lang="ts">
import { Share2 } from "@lucide/vue"
import { FacebookIcon, InstagramIcon, WhatsAppIcon, XIcon } from "vue3-simple-icons"
import { ref } from "vue"

const { post, buttonVariant = "default" } = defineProps<{
  post: object
  buttonVariant?: "default" | "outline"
}>()

const shareDropdown = ref(false)
const onToggleShare = () => {
  shareDropdown.value = !shareDropdown.value
}

const shareTo = (
  platform: "facebook" | "instagram" | "twitter" | "whatsapp",
  post: any,
) => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(post.title)
  let shareUrl = ""
  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      break
    case "instagram":
      alert("Silakan salin link dan bagikan ke Instagram Anda.")
      return
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
      break
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${text}%20${url}`
      break
  }
  if (shareUrl) window.open(shareUrl, "_blank")
  shareDropdown.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
      :class="[
        buttonVariant === 'default'
          ? 'bg-amani-blue text-white hover:bg-amani-blue-dark'
          : 'border border-gray-200 bg-transparent hover:bg-gray-100',
        $attrs.class,
      ]"
      @click="onToggleShare"
    >
      <slot>
        <Share2 class="size-4" />
        Bagikan
      </slot>
    </button>
    <div
      class="share-dropdown absolute top-full left-0 z-55 mt-2 min-w-45 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
      :class="{ active: shareDropdown }"
    >
      <button
        class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        @click="shareTo('facebook', post)"
      >
        <FacebookIcon class="size-4" />
        Facebook
      </button>
      <button
        class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        @click="shareTo('instagram', post)"
      >
        <InstagramIcon class="size-4" />
        Instagram
      </button>
      <button
        class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        @click="shareTo('twitter', post)"
      >
        <XIcon class="size-4" />
        X (Twitter)
      </button>
      <button
        class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        @click="shareTo('whatsapp', post)"
      >
        <WhatsAppIcon class="size-4" />
        WhatsApp
      </button>
    </div>
  </div>
</template>
