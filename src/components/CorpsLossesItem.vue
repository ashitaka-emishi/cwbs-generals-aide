<script setup>
import { defineProps } from 'vue'
import DivisionLossesItem from './DivisionLossesItem.vue'

defineProps({
  corps: Object
})
</script>

<template>
  <h3>{{ corps.name }}</h3>
  <template v-for="div in corps.divisions" :key="div.name">
    <DivisionLossesItem :division="div" />
    <hr />
  </template>
</template>
