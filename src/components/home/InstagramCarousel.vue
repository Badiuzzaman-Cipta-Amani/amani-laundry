<script setup>
import { ref } from 'vue';
import instaPosts from '@/data/instagram.json';

const instaCarousel = ref(null);

function scrollInsta(direction) {
  if (!instaCarousel.value) return;
  const cardWidth = 320 + 20;
  instaCarousel.value.scrollBy({ left: direction * cardWidth * 3, behavior: 'smooth' });
}
</script>

<template>
  <div>
    <div class="relative pb-6">
      <button @click="scrollInsta(-1)" class="insta-nav-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 hidden md:flex" style="left:-20px;">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button @click="scrollInsta(1)" class="insta-nav-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 hidden md:flex" style="right:-20px;">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div ref="instaCarousel" class="insta-carousel flex gap-5 overflow-x-auto pb-12 scrollbar-none">
        <div v-for="(post, idx) in instaPosts" :key="idx" class="insta-card w-70 sm:w-[320px] bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
          <div class="aspect-square bg-linear-to-br from-indigo-100 to-blue-100 relative overflow-hidden">
            <img :src="post.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.style.display='none'; this.parentElement.classList.add('flex','items-center','justify-center')">
            <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
              <img src="https://ui-avatars.com/api/?name=Amani+Laundry&background=1e3a8a&color=facc15&size=24&rounded=true" class="w-5 h-5 rounded-full">
              <span class="text-xs font-semibold text-slate-800">amanilaundry</span>
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center gap-4 mb-3">
              <button class="flex items-center gap-1 text-sm text-slate-600 hover:text-red-500 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span class="font-medium">{{ post.likes }}</span>
              </button>
              <button class="flex items-center gap-1 text-sm text-slate-600 hover:text-amani-blue transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                <span class="font-medium">{{ post.comments }}</span>
              </button>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed line-clamp-2">{{ post.caption }}</p>
            <div class="text-xs text-slate-400 mt-2">{{ post.date }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-10">
      <a href="https://instagram.com/amanilaundry" target="_blank" class="inline-flex items-center gap-2 bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>
        Lihat di Instagram
      </a>
    </div>
  </div>
</template>
