<template>
  <section class="py-24 px-6 max-w-3xl mx-auto">
    <div v-if="post">
      <div class="text-center mb-10">
        <div class="flex items-center justify-center gap-4 mb-5">
          <div class="bg-amani-yellow text-amani-blue-dark px-4 py-1.5 rounded-full text-xs font-bold">{{ post.categoryLabel }}</div>
          <div class="text-sm text-slate-500">{{ post.date }}</div>
        </div>
        <h1 class="text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight mb-4">{{ post.title }}</h1>
        <div class="flex items-center justify-center gap-4 text-sm text-slate-500">
          <span>⏱️ {{ readingTime }} menit baca</span>
          <span>•</span>
          <span>{{ wordCount }} kata</span>
        </div>
      </div>
      <div class="w-full h-96 rounded-2xl overflow-hidden mb-10 bg-linear-to-br from-indigo-100 to-blue-100">
        <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" onerror="this.style.display='none'; this.parentElement.classList.add('bg-linear-to-br', 'from-indigo-100', 'to-blue-100')">
      </div>
      <div class="flex items-center gap-3 mb-10 pb-6 border-b border-slate-200">
        <span class="text-sm text-slate-500 font-medium">Bagikan:</span>
        <div class="relative">
          <button @click="share.toggleDetailShare" class="px-4 py-2 rounded-xl bg-amani-blue text-white text-sm font-semibold hover:bg-amani-blue-dark transition-colors cursor-pointer flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
            Bagikan
          </button>
          <div class="share-dropdown absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-2 min-w-[180px] z-50" :class="{'active': share.detailShareOpen}">
            <button @click="share.shareTo('facebook', post)" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook
            </button>
            <button @click="share.shareTo('instagram', post)" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg> Instagram
            </button>
            <button @click="share.shareTo('twitter', post)" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> X (Twitter)
            </button>
            <button @click="share.shareTo('whatsapp', post)" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp
            </button>
          </div>
        </div>
        <button @click="share.copyDetailLink" class="tooltip px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2" :data-tooltip="share.copyTooltip" :class="{'show': share.showCopyTooltip}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          Salin Link
        </button>
      </div>
      <div class="blog-content" v-html="post.content"></div>
    </div>
  </section>
  <section class="py-16 px-6 bg-slate-50" v-if="post">
    <div class="max-w-7xl mx-auto">
      <h3 class="text-2xl font-bold text-slate-800 mb-6">Artikel Lainnya</h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard v-for="rec in recommendedPosts" :key="rec.id" :post="rec" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import blogPosts from '@/data/blogPosts.json';
import { useShare } from '@/composables/useShare';
import BlogCard from './BlogCard.vue';

const props = defineProps({
  post: Object
});

const share = useShare();

const recommendedPosts = computed(() => {
  return blogPosts.filter(p => p.id !== props.post.id).slice(0, 3);
});

const wordCount = computed(() => {
  const text = props.post.content.replace(/<[^>]*>/g, '');
  return text.trim().split(/\s+/).length;
});

const readingTime = computed(() => {
  return Math.max(1, Math.ceil(wordCount.value / 200));
});
</script>
