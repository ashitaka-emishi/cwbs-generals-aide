<script setup>
import { defineProps, ref } from 'vue'
import { BIconFile, BIconFileCheck, BIconFileExcel, BIconCheck } from 'bootstrap-icons-vue'

defineProps({
  losses: Array
})

const FireLevels = ref(['C', 'B', 'A', 'AB', 'AA', 'AAB', 'AAA'])
</script>

<template>
  <template v-for="(item, idx) in losses" :key="idx">
    <span v-if="item >= 0" style="top: 2px; position: relative; padding: 0 10px">{{
      FireLevels[item]
    }}</span>
    <BIconCheck v-if="item == -4" style="display: inline" />
    <BIconFileExcel v-if="item == -3" style="display: inline" />
    <BIconFileCheck v-if="item == -2" style="display: inline" />
    <BIconFile v-if="item == -1" style="display: inline" />
  </template>
</template>
