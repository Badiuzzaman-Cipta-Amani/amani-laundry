<template>
  <div v-show="open" class="fixed top-[72px] left-0 right-0 bg-white border-b border-slate-200 p-5 px-6 z-40 shadow-lg">
    <a href="/" class="block py-3.5 font-semibold border-b border-slate-100 no-underline transition-colors mt-1" :class="currentPage === 'home' ? 'text-amani-blue bg-amani-blue/5 rounded-lg px-3' : 'text-slate-800 hover:text-amani-blue hover:bg-slate-50 rounded-lg px-3'" @click="close">Beranda</a>
    <a href="/blog" class="block py-3.5 font-semibold border-b border-slate-100 no-underline transition-colors mt-1" :class="currentPage === 'blog' ? 'text-amani-blue bg-amani-blue/5 rounded-lg px-3' : 'text-slate-800 hover:text-amani-blue hover:bg-slate-50 rounded-lg px-3'" @click="close">Blog</a>
    <a href="/calculator" class="block py-3.5 font-semibold no-underline transition-colors mt-1" :class="currentPage === 'calculator' ? 'text-amani-blue bg-amani-blue/5 rounded-lg px-3' : 'text-slate-800 hover:text-amani-blue hover:bg-slate-50 rounded-lg px-3'" @click="close">Hitung Biaya</a>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  currentPage: { type: String, default: 'home' }
});
const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>
