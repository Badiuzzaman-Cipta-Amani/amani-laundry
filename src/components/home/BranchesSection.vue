<template>
  <section class="py-24 px-6 max-w-7xl mx-auto" id="branches">
    <div class="text-center mb-16">
      <div class="inline-block bg-amani-blue/8 text-amani-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Lokasi Kami</div>
      <h2 class="text-4xl font-extrabold text-slate-800 mb-4">Temui kami di tempat terdekatmu</h2>
      <p class="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">Kami terus berupaya mengembangkan Amani Laundry agar mudah diakses oleh siapapun.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div v-for="branch in branches" :key="branch.id" class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-amani-blue/10 transition-all">
        <div class="h-52 bg-slate-100 relative overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            :src="branch.mapEmbedUrl">
          </iframe>
        </div>
        <div class="p-6">
          <h3 class="text-lg font-bold text-slate-800 mb-2">{{ branch.name }}</h3>
          <p class="text-sm text-slate-500 leading-relaxed mb-4">{{ branch.address }}</p>
          <div class="flex gap-4 mb-4 flex-wrap">
            <a :href="'https://wa.me/' + branch.phone.replace(/\D/g,'')" target="_blank" class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amani-blue transition-colors no-underline">📞 {{ branch.phone }}</a>
            <div class="flex items-center gap-1.5 text-xs text-slate-500">🕐 {{ branch.hours }}</div>
          </div>
          <div class="flex flex-wrap gap-3">
            <a :href="'https://wa.me/' + branch.phone.replace(/\D/g,'')" target="_blank" class="inline-flex items-center gap-2 bg-[#25d366] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#128c7e] transition-colors no-underline">💬 Chat Admin</a>
            <a :href="branch.mapsUrl" target="_blank" class="inline-flex items-center gap-2 bg-amani-blue text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-amani-blue-dark transition-colors no-underline">📍 Buka di Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import branches from '@/data/branches.json';
</script>
