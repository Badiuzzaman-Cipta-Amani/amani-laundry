<template>
  <div>
    <div v-for="cat in calcCategories" :key="cat.name" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-amani-blue/10 flex items-center justify-center text-xl">{{ cat.icon }}</div>
        <h3 class="text-xl font-bold text-slate-800">{{ cat.name }}</h3>
        <div class="flex-1 h-px bg-slate-200 ml-2"></div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ServiceCard
          v-for="item in cat.items"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import calcCategories from '@/data/calculatorItems.json';
import ServiceCard from './ServiceCard.vue';
</script>
