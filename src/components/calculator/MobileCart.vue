<template>
  <div>
    <!-- Mobile Cart Overlay -->
    <div
      class="cart-overlay fixed inset-0 z-9999 bg-black/50 lg:hidden"
      :class="{ open: store.mobileCartOpen }"
      @click="store.mobileCartOpen = false"
    ></div>

    <!-- Mobile Cart Drawer -->
    <div
      class="cart-drawer fixed right-0 bottom-0 left-0 z-10000 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl lg:hidden"
      :class="{ open: store.mobileCartOpen }"
    >
      <div
        class="sticky top-0 z-10 rounded-t-3xl border-b border-slate-100 bg-white px-6 pt-5 pb-3"
      >
        <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200"></div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl"><ScrollText /></span>
            <h3 class="text-lg font-bold text-slate-800">Ringkasan Pesanan</h3>
          </div>
          <button
            @click="store.mobileCartOpen = false"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
          >
            <X class="size-4" />
          </button>
        </div>
      </div>
      <div class="px-6 py-4">
        <div v-if="store.cartItems.length === 0" class="py-10 text-center">
          <div class="mb-3 text-4xl"><ShoppingBasket class="size-10 mx-auto" /></div>
          <p class="text-base text-slate-500 font-bold">Belum ada laundry yang dipilih</p>
        </div>
        <div v-else class="space-y-3">
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
                  <div class="text-base font-extrabold whitespace-nowrap text-amani-blue">
                    {{ store.formatPrice(store.getItemPriceById(item.id) * item.qty) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <button
                  class="qty-btn flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600"
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
                  class="w-10 rounded-lg border border-slate-200 py-1 text-center text-sm font-bold text-slate-800"
                />
                <button
                  class="qty-btn flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600"
                  @click.stop.prevent="store.updateQty(item.id, 1)"
                >
                  +
                </button>
              </div>
              <button class="remove-btn" @click.stop.prevent="store.removeItem(item.id)">
                ✕
              </button>
            </div>
          </div>
          <div
            class="mt-2 flex justify-between border-t border-slate-100 pt-4 text-lg font-extrabold text-slate-800"
          >
            <span>Total Estimasi</span>
            <span class="text-amani-blue">{{ store.formatPrice(store.totalPrice) }}</span>
          </div>
          <div class="mt-3 flex items-start gap-2 rounded-xl bg-blue-50 p-3">
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
            <p class="text-[11px] leading-relaxed text-slate-600">
              Harga belum termasuk biaya antar jemput. Biaya pengiriman akan dihitung saat
              pemesanan.
            </p>
          </div>
        </div>
      </div>
      <div
        class="sticky bottom-0 flex gap-3 border-t border-slate-100 bg-white px-6 pt-2 pb-6"
      >
        <button
          class="flex flex-1 cursor-pointer justify-center gap-2 rounded-xl bg-amani-yellow py-4 text-base font-bold text-amani-blue-dark shadow-lg shadow-amani-yellow/30 transition-all hover:-translate-y-0.5"
          @click="store.orderViaWhatsApp"
        >
          <WhatsAppIcon class="size-5" /> Pesan sekarang
        </button>
        <button
          class="cursor-pointer rounded-xl border-2 border-slate-200 px-5 py-4 text-base font-bold text-slate-600 transition-all hover:bg-slate-50"
          @click="store.clearCart"
        >
          <Trash class="size-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Floating Cart Button -->
    <div class="fixed bottom-6 left-6 z-60 lg:hidden">
      <button
        @click="store.mobileCartOpen = true"
        class="flex cursor-pointer items-center gap-2.5 rounded-full bg-amani-blue py-3.5 pr-5 pl-4 text-white shadow-2xl transition-all hover:-translate-y-0.5"
      >
        <span class="text-xl"><ScrollText /></span>
        <div class="text-left">
          <div class="text-[10px] leading-none font-medium text-white/70">Total</div>
          <div class="text-sm leading-tight font-bold">
            {{ store.formatPrice(store.totalPrice) }}
          </div>
        </div>
        <span
          v-if="store.cartItems.length > 0"
          class="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-amani-yellow text-[10px] font-bold text-amani-blue-dark"
          >{{ store.cartItems.length }}</span
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { ScrollText, ShoppingBasket, Trash, X } from "@lucide/vue"
import { WhatsAppIcon } from "vue3-simple-icons"

import { calculatorStore } from "@/stores/calculator"
const store = calculatorStore
</script>
