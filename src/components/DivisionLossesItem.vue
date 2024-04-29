<script setup>
import { computed, defineProps } from 'vue'
import BrigadeLossesItem from './BrigadeLossesItem.vue'
import LossesPanel from './LossesPanel.vue'

const div = defineProps({
  division: Object
})

const lossesArray = computed(() => getLossArray(div.division))

function getLossArray(brigade) {
  const { losses, stragglers, wreckedAt } = brigade
  let fireLevels = brigade.fireLevels == null ? [brigade.brigades.length] : brigade.fireLevels
  let results = []
  let i,
    j,
    idx = 0
  for (i = 0; i < fireLevels.length; i++) {
    if (brigade.fireLevels) results.push(fireLevels.length - i - 1)
    for (j = 0; j < fireLevels[i]; j++) {
      idx++
      if (idx <= losses) {
        results.push(-3)
      } else if (idx <= losses + stragglers) {
        results.push(-2)
      } else {
        results.push(-1)
      }

      if (idx == wreckedAt) {
        results.push(-4)
      }
    }
  }
  return results
}

function addLoss() {
  div.division.losses++
}

function removeLoss() {
  div.division.losses--
}

function clear() {
  div.division.losses = 0
}
</script>

<template>
  <template v-for="bde in division.brigades" :key="bde.name">
    <BrigadeLossesItem :brigade="bde" />
  </template>
  <div class="row m-2 fs-5" v-if="division.leader != 'Attached'">
    <div class="col-1">
      <!--div class="dropdown">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="width: 100px"
        >
          <span class="fs-6">&nbsp;{{ division.name }}</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click="addLoss">Add Loss</a></li>
          <li><a class="dropdown-item" @click="removeLoss">Remove Loss</a></li>
          <li><a class="dropdown-item" @click="clear">Clear</a></li>
        </ul>
      </div-->
      <span style="top: 2px; position: relative; padding: 0 5px; font-weight: 500">{{
        division.name
      }}</span>
    </div>
    <div class="col-1">
      <span style="top: 2px; position: relative; padding: 0 5px; font-weight: 500">{{
        division.leader
      }}</span>
    </div>

    <div class="col-9" style="margin-left: 20px"><LossesPanel :losses="lossesArray" /></div>
  </div>
</template>
