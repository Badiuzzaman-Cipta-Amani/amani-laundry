<template>
  <div class="branch-modal-overlay" :class="{'open': store.showBranchModal}" @click.self="store.showBranchModal = false">
    <div class="branch-modal">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h3 class="text-xl font-bold text-slate-800">Pilih Cabang</h3>
          <p class="text-xs text-slate-400 mt-1">Pilih cabang terdekat untuk pemesanan</p>
        </div>
        <button @click="store.showBranchModal = false" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer">✕</button>
      </div>
      <div v-for="branch in store.branches" :key="branch.id"
           class="branch-option"
           :class="{'selected': store.selectedBranch && store.selectedBranch.id === branch.id}"
           @click="store.selectedBranch = branch">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-amani-blue/10 flex items-center justify-center text-amani-blue text-lg flex-shrink-0">📍</div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-slate-800 text-sm">{{ branch.name }}</h4>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{{ branch.address }}</p>
            <p class="text-xs text-slate-400 mt-1">📞 {{ branch.phone }}</p>
          </div>
        </div>
      </div>
      <button
        @click="store.confirmOrder"
        class="w-full mt-4 bg-amani-yellow text-amani-blue-dark py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg shadow-amani-yellow/30 cursor-pointer"
        :class="{'opacity-50 cursor-not-allowed': !store.selectedBranch}"
        :disabled="!store.selectedBranch"
      >
        💬 Lanjutkan ke WhatsApp
      </button>
    </div>
  </div>
</template>

<script setup>
import { calculatorStore } from '@/stores/calculator';
const store = calculatorStore;
</script>
