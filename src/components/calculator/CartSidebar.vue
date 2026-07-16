<template>
  <div class="hidden lg:block">
    <div class="sticky-cart">
      <div class="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-amani-blue/5 overflow-hidden">
        <div class="bg-amani-blue p-6 text-white">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-2xl">🧾</span>
            <h3 class="text-lg font-bold">Ringkasan Pesanan</h3>
          </div>
          <p class="text-white/60 text-xs">{{ store.categoryLabel }} — Estimasi biaya laundry Anda</p>
        </div>
        <div class="p-6">
          <div v-if="store.cartItems.length === 0" class="text-center py-12">
            <div class="text-4xl mb-3">🧺</div>
            <p class="text-slate-400 text-sm">Belum ada layanan yang dipilih</p>
            <p class="text-slate-300 text-xs mt-1">Klik gambar layanan untuk menambahkan</p>
          </div>
          <div v-else class="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            <div v-for="item in store.cartItems" :key="item.id" class="p-4 bg-slate-50 rounded-xl">
              <div class="flex items-start gap-3 mb-3">
                <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 overflow-hidden border border-slate-100">
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
                  <button class="qty-btn w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold hover:bg-amani-blue hover:text-white hover:border-amani-blue transition-all" @click.stop.prevent="store.updateQty(item.id, -1)">−</button>
                  <input
                    type="number"
                    min="0"
                    :step="item.unit === 'kg' ? '0.1' : '1'"
                    :value="store.formatQty(item.qty)"
                    @input="e => store.setQty(item.id, e.target.value)"
                    class="w-10 text-center text-sm font-bold text-slate-800 border border-slate-200 rounded-lg py-1 focus:outline-none focus:border-amani-blue"
                  >
                  <button class="qty-btn w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold hover:bg-amani-blue hover:text-white hover:border-amani-blue transition-all" @click.stop.prevent="store.updateQty(item.id, 1)">+</button>
                </div>
                <button class="remove-btn" @click.stop.prevent="store.removeItem(item.id)" title="Hapus">✕</button>
              </div>
            </div>
          </div>

          <div v-if="store.cartItems.length > 0" class="mt-5 pt-5 border-t border-slate-100">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-slate-500">Subtotal</span>
              <span class="text-sm font-semibold text-slate-700">{{ store.formatPrice(store.totalPrice) }}</span>
            </div>
            <div class="flex justify-between items-center text-xl font-extrabold">
              <span class="text-slate-800">Total</span>
              <span class="text-amani-blue">{{ store.formatPrice(store.totalPrice) }}</span>
            </div>
          </div>

          <div class="mt-4 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
            <svg class="w-4 h-4 text-amani-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p class="text-[11px] text-slate-500 leading-relaxed">Harga belum termasuk biaya antar jemput. Biaya pengiriman akan dihitung saat pemesanan.</p>
          </div>

          <div class="flex gap-3 mt-5">
            <button
              class="flex-1 bg-amani-yellow text-amani-blue-dark py-3.5 rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-amani-yellow/30 cursor-pointer flex items-center justify-center gap-2"
              @click="store.orderViaWhatsApp"
              :class="{'opacity-50 cursor-not-allowed': store.cartItems.length === 0}"
              :disabled="store.cartItems.length === 0"
            >
              <span>💬</span> Pesan via WhatsApp
            </button>
            <button
              class="px-4 py-3.5 rounded-xl font-bold text-sm border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
              @click="store.clearCart"
              :disabled="store.cartItems.length === 0"
            >🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { calculatorStore } from '@/stores/calculator';
const store = calculatorStore;
</script>
