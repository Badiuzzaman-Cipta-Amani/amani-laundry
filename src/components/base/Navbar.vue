<template>
  <div>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-amani-blue/10">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" class="py-2">
          <img src="/images/logo.svg" class="w-full h-16" />
        </a>
        <div class="hidden md:flex items-center gap-8">
          <a href="/" class="text-sm font-medium transition-colors no-underline" :class="currentPage === 'home' ? 'text-amani-blue' : 'text-slate-700 hover:text-amani-blue'">Beranda</a>
          <a href="/blog" class="text-sm font-medium transition-colors no-underline" :class="currentPage === 'blog' ? 'text-amani-blue' : 'text-slate-700 hover:text-amani-blue'">Blog</a>
          <a href="/calculator" class="bg-amani-blue text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-amani-blue-dark transition-all no-underline">Hitung Biaya</a>
        </div>
        <button class="md:hidden bg-none border-none text-2xl text-amani-blue cursor-pointer" @click="mobileMenuOpen = !mobileMenuOpen">☰</button>
      </div>
    </nav>
    <MobileMenu :open="mobileMenuOpen" :currentPage="currentPage" @close="mobileMenuOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MobileMenu from './MobileMenu.vue';

defineProps({
  currentPage: { type: String, default: 'home' }
});

const mobileMenuOpen = ref(false);
</script>