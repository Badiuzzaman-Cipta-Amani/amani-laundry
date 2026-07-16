<template>
  <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-amani-blue/10 transition-all">
    <div class="h-52 bg-linear-to-br from-indigo-100 to-blue-100 relative overflow-hidden">
      <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" onerror="this.style.display='none'">
      <div class="absolute top-4 left-4 bg-amani-yellow text-amani-blue-dark px-3.5 py-1.5 rounded-full text-xs font-bold">{{ post.categoryLabel }}</div>
    </div>
    <div class="p-6">
      <div class="text-xs text-slate-500 mb-2">{{ post.date }}</div>
      <h3 class="text-base font-bold text-slate-800 leading-snug mb-2.5">{{ post.title }}</h3>
      <p class="text-sm text-slate-500 leading-relaxed mb-4">{{ post.excerpt }}</p>
      <div class="flex gap-3">
        <a :href="`/blog/${post.slug}`" class="flex-1 bg-amani-blue text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-amani-blue-dark transition-colors no-underline text-center">Baca Artikel</a>
        <div class="relative">
          <button @click="share.toggleShareDropdown(post.id)" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
          </button>
          <ShareDropdown
            :active="share.activeShareDropdown === post.id"
            :post="post"
            @share="share.shareTo"
            @copy="share.copyLink"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShare } from '@/composables/useShare';
import ShareDropdown from './ShareDropdown.vue';

defineProps({
  post: Object
});

const share = useShare();
</script>
