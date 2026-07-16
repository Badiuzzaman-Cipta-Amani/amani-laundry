<template>
  <div class="flex items-center justify-between pt-3 border-t border-slate-100">
    <span class="text-[11px] text-slate-400 font-medium">Jumlah</span>
    <div class="flex items-center gap-2">
      <button
        class="qty-btn w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 text-lg font-bold flex items-center justify-center hover:bg-amani-blue hover:text-white hover:border-amani-blue transition-all"
        @click.stop.prevent="store.updateQty(item.id, -1)"
      >−</button>
      <input
        type="number"
        min="0"
        :step="item.unit === 'kg' ? '0.1' : '1'"
        :value="store.formatQty(store.quantities[item.id] || 0)"
        @click.stop
        @input="e => store.setQty(item.id, e.target.value)"
        class="w-12 text-center text-sm font-bold text-slate-800 border border-slate-200 rounded-lg py-1 focus:outline-none focus:border-amani-blue focus:ring-2 focus:ring-amani-blue/20"
      >
      <button
        class="qty-btn w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 text-lg font-bold flex items-center justify-center hover:bg-amani-blue hover:text-white hover:border-amani-blue transition-all"
        @click.stop.prevent="store.updateQty(item.id, 1)"
      >+</button>
    </div>
  </div>
</template>

<script setup>
import { calculatorStore } from '@/stores/calculator';

defineProps({
  item: Object
});

const store = calculatorStore;
</script>
