<script setup>
import { ScrollText, ShoppingBasket, Trash } from "@lucide/vue"
import { WhatsAppIcon } from "vue3-simple-icons"

import { calculatorStore } from "@/stores/calculator"
const store = calculatorStore
</script>

<template>
  <div class="hidden lg:block">
    <div class="sticky-cart">
      <div
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-amani-blue/5"
      >
        <div class="bg-amani-blue p-6 text-white">
          <div class="mb-1 flex items-center gap-3">
            <span class="text-2xl"><ScrollText /></span>
            <h3 class="text-lg font-bold">Ringkasan Pesanan</h3>
          </div>
          <p class="text-sm text-white/60">
            {{ store.categoryLabel }} — Estimasi biaya laundry Anda
          </p>
        </div>
        <div class="p-6">
          <div v-if="store.cartItems.length === 0" class="py-12 text-center">
            <div class="mb-3 text-4xl"><ShoppingBasket class="size-10 mx-auto" /></div>
            <p class="text-base text-slate-500 font-bold">Belum ada laundry yang dipilih</p>
            <p class="mt-1 text-sm text-slate-400">
              Klik gambar layanan untuk menambahkan
            </p>
          </div>
          <div v-else class="max-h-100 space-y-3 overflow-y-auto pr-1">
            <div
              v-for="item in store.cartItems"
              :key="item.id"
              class="rounded-xl bg-slate-50 p-4"
            >
              <div class="mb-3 flex items-start gap-3">
                <div
                  class="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-200"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="h-full w-full object-cover"
                    onerror="this.style.display = &quot;none&quot;
                    this.parentElement.classList.add(
                      &quot;flex&quot;,
                      &quot;items-center&quot;,
                      &quot;justify-center&quot;,
                      &quot;bg-slate-100&quot;,
                    )"
                  />
                  <div
                    v-if="!item.image"
                    class="flex h-full w-full items-center justify-center text-lg"
                  >
                    {{ item.icon }}
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <div class="text-sm leading-tight font-bold text-slate-800">
                        {{ item.name }}
                      </div>
                      <div class="mt-0.5 text-xs text-slate-400">
                        {{ store.formatPrice(store.getItemPriceById(item.id)) }} /
                        {{ item.unit }}
                      </div>
                    </div>
                    <div
                      class="text-base font-extrabold whitespace-nowrap text-amani-blue"
                    >
                      {{ store.formatPrice(store.getItemPriceById(item.id) * item.qty) }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <button
                    class="qty-btn flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition-all hover:border-amani-blue hover:bg-amani-blue hover:text-white"
                    @click.stop.prevent="store.updateQty(item.id, -1)"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    :step="item.unit === 'kg' ? '0.1' : '1'"
                    :value="store.formatQty(item.qty)"
                    @input="(e) => store.setQty(item.id, e.target.value)"
                    class="w-10 rounded-lg border border-slate-200 py-1 text-center text-sm font-bold text-slate-800 focus:border-amani-blue focus:outline-none"
                  />
                  <button
                    class="qty-btn flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 transition-all hover:border-amani-blue hover:bg-amani-blue hover:text-white"
                    @click.stop.prevent="store.updateQty(item.id, 1)"
                  >
                    +
                  </button>
                </div>
                <button
                  class="remove-btn"
                  @click.stop.prevent="store.removeItem(item.id)"
                  title="Hapus"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="store.cartItems.length > 0"
            class="mt-5 border-t border-slate-100 pt-5"
          >
            <div class="mb-2 flex items-center justify-between">
              <span class="text-sm text-slate-600">Subtotal</span>
              <span class="text-sm font-semibold text-slate-700">{{
                store.formatPrice(store.totalPrice)
              }}</span>
            </div>
            <div class="flex items-center justify-between text-xl font-extrabold">
              <span class="text-slate-800">Total</span>
              <span class="text-amani-blue">{{
                store.formatPrice(store.totalPrice)
              }}</span>
            </div>
          </div>

          <div class="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 p-3">
            <svg
              class="mt-0.5 h-4 w-4 shrink-0 text-amani-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-xs leading-relaxed text-slate-600">
              Harga belum termasuk biaya antar jemput. Biaya pengiriman akan dihitung saat
              pemesanan.
            </p>
          </div>

          <div class="mt-5 flex gap-3">
            <button
              class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amani-yellow py-3.5 text-sm font-bold text-amani-blue-dark shadow-lg shadow-amani-yellow/30 transition-all hover:-translate-y-0.5"
              @click="store.orderViaWhatsApp"
              :class="{ 'cursor-not-allowed opacity-50': store.cartItems.length === 0 }"
              :disabled="store.cartItems.length === 0"
            >
              <WhatsAppIcon class="size-5" /> Pesan via WhatsApp
            </button>
            <button
              class="cursor-pointer rounded-xl border-2 border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
              @click="store.clearCart"
              :disabled="store.cartItems.length === 0"
            >
              <Trash class="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
