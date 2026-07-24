<script setup>
import { calculatorStore } from '@/stores/calculator';
import QuantityControl from './QuantityControl.vue';

defineProps({
  item: Object
});

const store = calculatorStore;
</script>

<template>
  <div
    class="product-card bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer relative"
    :class="(store.quantities[item.id] || 0) > 0 ? 'selected' : 'hover:shadow-xl hover:shadow-amani-blue/5 hover:border-slate-300'"
    @click="store.updateQty(item.id, 1)"
  >
    <!-- <div class="relative h-40 overflow-hidden bg-slate-100">
      <img :src="item.image" :alt="item.name" class="card-image w-full h-full object-cover" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('flex','items-center','justify-center','bg-linear-to-br','from-slate-100','to-slate-200')">
      <div v-if="!item.image" class="absolute inset-0 flex items-center justify-center text-4xl">{{ item.icon }}</div>

      <div class="absolute top-3 left-3">
        <span class="bg-white/90 backdrop-blur-sm text-amani-blue text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">{{ item.unit }}</span>
      </div>

      <div v-if="(store.quantities[item.id] || 0) > 0" class="absolute top-3 right-3 size-7 bg-amani-blue text-white rounded-full flex items-center justify-center text-[11px] font-bold shadow-lg">
        {{ store.formatQty(store.quantities[item.id]) }}
      </div>
    </div> -->

    <div class="p-4">
      <div class="flex items-start justify-between mb-2">
        <div>
          <h4 class="text-base font-bold text-slate-800">{{ item.name }}</h4>
          <p v-if="item.description" class="text-[13px] text-slate-500 mt-0.5">{{ item.description }}</p>
        </div>
      </div>

      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg font-extrabold text-amani-blue">{{ store.formatPrice(store.getItemPrice(item)) }}</span>
        <span class="text-sm text-slate-500">/ {{ item.unit }}</span>
      </div>

      <div v-if="store.getSurcharge(item) > 0" class="surcharge-badge mb-3 inline-block">
        +{{ store.formatPrice(store.getSurcharge(item)) }} {{ store.selectedCategory === 'express' ? 'Express' : 'Kilat' }}
      </div>

      <div v-if="item.note" class="mb-3 text-[13px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 leading-tight">
        <strong>Catatan:</strong><br />
        <div class="mt-1">{{ item.note }}</div>
      </div>

      <QuantityControl :item="item" />
    </div>
  </div>
</template>
