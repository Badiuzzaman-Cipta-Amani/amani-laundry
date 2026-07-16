<template>
  <section class="py-24 px-6 max-w-7xl mx-auto" id="services">
    <div class="text-center mb-16">
      <div class="inline-block bg-amani-blue/8 text-amani-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Layanan Kami</div>
      <h2 class="text-4xl font-extrabold text-slate-800 mb-4">Pilihan Layanan Laundry</h2>
      <p class="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">Berbagai layanan laundry dengan harga terjangkau dan hasil terbaik untuk kebutuhan Anda.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="service in services" :key="service.id" class="bg-white border border-slate-200 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amani-blue/10 hover:border-amani-blue-light transition-all relative overflow-hidden group service-card">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5" :class="service.bgClass">{{ service.icon }}</div>
        <h3 class="text-lg font-bold text-slate-800 mb-2">{{ service.name }}</h3>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">{{ service.desc }}</p>
        <div class="text-lg font-extrabold text-amani-blue">
          <span v-if="service.hasRange">Mulai dari </span>{{ service.price }} <span class="text-xs font-medium text-slate-500">/ {{ service.unit }}</span>
        </div>
      </div>
    </div>
    <div class="text-center mt-12">
      <a href="/calculator" class="inline-flex items-center gap-2 bg-amani-blue text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-amani-blue-dark transition-all no-underline">
        Lihat Semua Layanan →
      </a>
    </div>
  </section>
</template>

<script setup>
import services from '@/data/services.json';
</script>
