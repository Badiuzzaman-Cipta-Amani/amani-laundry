<template>
  <div>
    <!-- Mobile Cart Overlay -->
    <div class="cart-overlay fixed inset-0 bg-black/50 z-9999 lg:hidden" :class="{'open': store.mobileCartOpen}" @click="store.mobileCartOpen = false"></div>

    <!-- Mobile Cart Drawer -->
    <div class="cart-drawer fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-10000 lg:hidden max-h-[80vh] overflow-y-auto" :class="{'open': store.mobileCartOpen}">
      <div class="sticky top-0 bg-white rounded-t-3xl px-6 pt-5 pb-3 border-b border-slate-100 z-10">
        <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">🧾</span>
            <h3 class="text-lg font-bold text-slate-800">Ringkasan Pesanan</h3>
          </div>
          <button @click="store.mobileCartOpen = false" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer">✕</button>
        </div>
      </div>
      <div class="px-6 py-4">
        <div v-if="store.cartItems.length === 0" class="text-center py-10">
          <div class="text-4xl mb-3">🧺</div>
          <p class="text-slate-400 text-sm">Belum ada layanan yang dipilih</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="item in store.cartItems" :key="item.id" class="p-4 bg-slate-50 rounded-xl">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-14 h-14 rounded-xl bg-slate-200 shrink-0 overflow-hidden border border-slate-100">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" onerror="this.style.display='none'; this.parentElement.classList.add('flex','items-center','justify-center','bg-slate-100')">
                <div v-if="!item.image" class="w-full h-full flex items-center justify-center text-lg">{{ item.icon }}</div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start gap-2">
                  <div>
                    <div class="text-sm font-bold text-slate-800 leading-tight">{{ item.name }}</div>
                    <div class="text-xs text-slate-400 mt-0.5">{{ store.formatPrice(store.getItemPriceById(item.id)) }} / {{ item.unit }}</div>
                  </div>
                  <div class="text-base font-extrabold text-amani-blue whitespace-nowrap">{{ store.formatPrice(store.getItemPriceById(item.id) * item.qty) }}</div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <button class="qty-btn w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold" @click.stop.prevent="store.updateQty(item.id, -1)">−</button>
                <input
                  type="number"
                  min="0"
                  :step="item.unit === 'kg' ? '0.1' : '1'"
                  :value="store.formatQty(item.qty)"
                  @input="e => store.setQty(item.id, e.target.value)"
                  class="w-10 text-center text-sm font-bold text-slate-800 border border-slate-200 rounded-lg py-1"
                >
                <button class="qty-btn w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold" @click.stop.prevent="store.updateQty(item.id, 1)">+</button>
              </div>
              <button class="remove-btn" @click.stop.prevent="store.removeItem(item.id)">✕</button>
            </div>
          </div>
          <div class="flex justify-between pt-4 mt-2 text-lg font-extrabold text-slate-800 border-t border-slate-100">
            <span>Total Estimasi</span>
            <span class="text-amani-blue">{{ store.formatPrice(store.totalPrice) }}</span>
          </div>
          <div class="mt-3 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
            <svg class="w-4 h-4 text-amani-blue shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p class="text-[11px] text-slate-500 leading-relaxed">Harga belum termasuk biaya antar jemput. Biaya pengiriman akan dihitung saat pemesanan.</p>
          </div>
        </div>
      </div>
      <div class="px-6 pb-6 pt-2 flex gap-3 sticky bottom-0 bg-white border-t border-slate-100">
        <button
          class="flex-1 bg-amani-yellow text-amani-blue-dark py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg shadow-amani-yellow/30 cursor-pointer"
          @click="store.orderViaWhatsApp"
        >💬 Pesan sekarang</button>
        <button class="px-5 py-4 rounded-xl font-bold text-base border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer" @click="store.clearCart">🗑️</button>
      </div>
    </div>

    <!-- Mobile Floating Cart Button -->
    <div class="lg:hidden fixed bottom-6 left-6 z-60">
      <button @click="store.mobileCartOpen = true" class="flex items-center gap-2.5 bg-amani-blue text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer">
        <span class="text-xl">🧾</span>
        <div class="text-left">
          <div class="text-[10px] text-white/70 font-medium leading-none">Total</div>
          <div class="font-bold text-sm leading-tight">{{ store.formatPrice(store.totalPrice) }}</div>
        </div>
        <span v-if="store.cartItems.length > 0" class="bg-amani-yellow text-amani-blue-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">{{ store.cartItems.length }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { calculatorStore } from '@/stores/calculator';
const store = calculatorStore;
</script>
