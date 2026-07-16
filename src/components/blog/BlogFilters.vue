<template>
  <div class="flex flex-wrap gap-4 justify-center mb-10 items-center">
    <div class="relative">
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        type="text"
        placeholder="Cari artikel..."
        class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:border-amani-blue focus:ring-2 focus:ring-amani-blue/20 w-64"
      >
    </div>
    <select
      :value="filter"
      @change="$emit('update:filter', $event.target.value)"
      class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:border-amani-blue cursor-pointer"
    >
      <option value="all">Semua Kategori</option>
      <option value="tips">Tips</option>
      <option value="promo">Promo</option>
      <option value="info">Info</option>
    </select>
    <select
      :value="year"
      @change="$emit('update:year', $event.target.value)"
      class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:border-amani-blue cursor-pointer"
    >
      <option value="all">Semua Tahun</option>
      <option value="2026">2026</option>
      <option value="2025">2025</option>
    </select>
  </div>
</template>

<script setup>
defineProps(['search', 'filter', 'year']);
defineEmits(['update:search', 'update:filter', 'update:year']);
</script>
