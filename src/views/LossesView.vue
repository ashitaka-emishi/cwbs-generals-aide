<script setup>
import CorpsLossesItem from '../components/CorpsLossesItem.vue'

import { UsaArmy, CsaArmy } from '@/rules/battles/gaines-mill/gainesMill'
</script>

<template>
  <header class="row">
    <h1 class="text-center pb-3">Losses</h1>
  </header>
  <template v-for="corps in UsaArmy.corps" :key="corps.name">
    <CorpsLossesItem :corps="corps" />
  </template>
  <template v-for="corps in CsaArmy.corps" :key="corps.name">
    <CorpsLossesItem :corps="corps" />
  </template>
</template>
