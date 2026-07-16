<template>
  <div class="max-w-2xl mx-auto mb-10">
    <div class="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
      <div class="grid grid-cols-3 gap-2">
        <button
          @click="store.selectedCategory = 'regular'"
          class="category-pill rounded-xl py-4 px-4 text-center cursor-pointer border border-transparent"
          :class="store.selectedCategory === 'regular' ? 'active' : 'hover:bg-slate-50 text-slate-600'"
        >
          <div class="text-xl mb-1">🧺</div>
          <div class="text-sm font-bold">Reguler</div>
          <div class="text-[10px] opacity-70 mt-0.5">3 Hari</div>
        </button>
        <button
          @click="store.selectedCategory = 'express'"
          class="category-pill rounded-xl py-4 px-4 text-center cursor-pointer border border-transparent"
          :class="store.selectedCategory === 'express' ? 'active' : 'hover:bg-slate-50 text-slate-600'"
        >
          <div class="text-xl mb-1">⚡</div>
          <div class="text-sm font-bold">Express</div>
          <div class="text-[10px] opacity-70 mt-0.5">1 Hari</div>
        </button>
        <button
          @click="store.selectedCategory = 'kilat'"
          class="category-pill rounded-xl py-4 px-4 text-center cursor-pointer border border-transparent"
          :class="store.selectedCategory === 'kilat' ? 'active' : 'hover:bg-slate-50 text-slate-600'"
        >
          <div class="text-xl mb-1">🚀</div>
          <div class="text-sm font-bold">Kilat</div>
          <div class="text-[10px] opacity-70 mt-0.5">8 Jam</div>
        </button>
      </div>
    </div>
    <div v-if="store.selectedCategory !== 'regular'" class="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
      <span class="text-xl flex-shrink-0">ℹ️</span>
      <div class="text-xs text-amber-800 leading-relaxed">
        <strong>Biaya tambahan untuk layanan {{ store.categoryLabel }}:</strong><br>
        Per unit di bawah Rp 10.000: +{{ store.formatPrice(store.selectedCategory === 'express' ? 1000 : 2000) }}<br>
        Per unit Rp 10.000 ke atas: +{{ store.formatPrice(store.selectedCategory === 'express' ? 4000 : 7000) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { calculatorStore } from '@/stores/calculator';
const store = calculatorStore;
</script>
