<template>
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <div class="inline-block bg-amani-blue/8 text-amani-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Blog</div>
      <h2 class="text-4xl font-extrabold text-slate-800 mb-4">Tips & Artikel Laundry</h2>
      <p class="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">Temukan tips merawat pakaian, informasi layanan, dan promo menarik dari Amani Laundry.</p>
    </div>
    <BlogFilters
      v-model:search="blogSearch"
      v-model:filter="blogFilter"
      v-model:year="blogYear"
    />
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
    </div>
    <div v-if="hasMorePosts" class="text-center mt-12">
      <button @click="loadMore" class="bg-white border-2 border-amani-blue text-amani-blue px-8 py-3 rounded-xl font-bold text-base hover:bg-amani-blue hover:text-white transition-all cursor-pointer">
        Muat Lebih Banyak
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import blogPosts from '@/data/blogPosts.json';
import BlogFilters from './BlogFilters.vue';
import BlogCard from './BlogCard.vue';

const blogSearch = ref('');
const blogFilter = ref('all');
const blogYear = ref('all');
const postsPerPage = ref(6);

const filteredPosts = computed(() => {
  let posts = blogPosts;
  if (blogFilter.value !== 'all') {
    posts = posts.filter(p => p.category === blogFilter.value);
  }
  if (blogYear.value !== 'all') {
    posts = posts.filter(p => p.year === blogYear.value);
  }
  if (blogSearch.value.trim()) {
    const q = blogSearch.value.toLowerCase();
    posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
  }
  return posts;
});

const paginatedPosts = computed(() => {
  return filteredPosts.value.slice(0, postsPerPage.value);
});

const hasMorePosts = computed(() => {
  return filteredPosts.value.length > postsPerPage.value;
});

function loadMore() {
  postsPerPage.value += 6;
}
</script>
