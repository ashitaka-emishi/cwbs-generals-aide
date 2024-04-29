<script setup>
import { computed, defineProps, ref } from 'vue'
import LossesPanel from './LossesPanel.vue'

import { getFireCombatResult, checkStragglers } from '@/rules/fireCombatTables'

const bde = defineProps({
  brigade: Object
})

const lossesArray = computed(() => getLossArray(bde.brigade))

function addLoss() {
  bde.brigade.losses++
}

function removeLoss() {
  bde.brigade.losses--
}

function addStraggler() {
  bde.brigade.stragglers++
}

function removeStraggler() {
  bde.brigade.stragglers--
}

function clear() {
  bde.brigade.losses = 0
  bde.brigade.stragglers = 0
}

function isWrecked() {
  return !!(bde.brigade.losses + bde.brigade.stragglers >= bde.brigade.wreckedAt)
}

function getLossArray(brigade) {
  const { fireLevels, losses, stragglers, wreckedAt } = brigade
  let results = []
  let i,
    j,
    idx = 0
  for (i = 0; i < fireLevels.length; i++) {
    results.push(fireLevels.length - i - 1)
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

function resolveCombat() {
  console.log(moraleShift.value, fireColumn.value)
  const combat1 = Math.floor(Math.random() * 6) + 1
  const combat2 = Math.floor(Math.random() * 6) + 1
  const rounding = Math.floor(Math.random() * 6) + 1
  const straggler = Math.floor(Math.random() * 6) + 1
  const morale10 = Math.floor(Math.random() * 6) + 1
  const morale1 = Math.floor(Math.random() * 6) + 1
  console.log(`Dice: ${combat1}, ${combat2}, ${rounding}, ${straggler}, ${morale10}, ${morale1}`)

  const results = getFireCombatResult(combat1 + combat2, rounding, fireColumn.value)

  bde.brigade.losses += results.losses

  if (results.checkStragglers) {
    results.stragglers = checkStragglers(straggler, bde.brigade.morale, results.useStraggle2)
    bde.brigade.stragglers += results.stragglers
  }

  console.log(results)
}

const moraleShift = ref('0')
const fireColumn = ref(3)

const isSelected = ref(false)
function select() {
  isSelected.value = !isSelected.value
}
</script>

<template>
  <div
    class="row m-2 fs-5 p-0"
    @click="select"
    :class="{ 'alert alert-info alert-row': isSelected }"
  >
    <div class="col-1">
      <!-- div class="dropdown">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="width: 100px"
        >
          <span class="fs-6">{{ brigade.name }}</span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <div class="text-center">
              <div class="m-2">
                <label for="exampleInputEmail1" class="form-label">Fire Column</label>
                <select
                  id="exampleInputEmail1"
                  class="form-select text-center"
                  v-model="fireColumn"
                >
                  <option value="0">&lt; 1</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3-4</option>
                  <option value="4">5-6</option>
                  <option value="5">7-8</option>
                  <option value="6">9-11</option>
                  <option value="7">12-14</option>
                  <option value="8">15-17</option>
                  <option value="9">18-20</option>
                  <option value="10">21+</option>
                </select>
              </div>
              <div class="m-2 text-left">
                <label class="form-label">Lower</label>
                <input type="checkbox" class="m-2" />
              </div>
              <div class="m-2 text-left">
                <label class="form-label">Low Ammo</label>
                <input type="checkbox" class="m-2" />
              </div>
              <div class="m-2 text-left">
                <label class="form-label">CC Attacker</label>
                <input type="checkbox" class="m-2" />
              </div>

              <div class="m-2 text-left">
                <label class="form-label">Entrenched</label>
                <input type="checkbox" class="m-2" />
              </div>
              <div class="m-2 text-left">
                <label class="form-label">/w Artillery</label>
                <input type="checkbox" class="m-2" />
              </div>
              <div class="m-2 text-left">
                <label class="form-label">Night</label>
                <input type="checkbox" class="m-2" />
              </div>

              <div class="m-2 text-left">
                <label class="form-label">Flank</label>
                <input type="checkbox" class="m-2" />
              </div>

              <div class="m-2 text-left">
                <label class="form-label">CC Defender</label>
                <input type="checkbox" class="m-2" />
              </div>

              <div class="m-2">
                <hr />
              </div>
              <div class="m-2">
                <label class="form-label">Morale Shift</label>
                <input type="text" class="form-control text-center" v-model="moraleShift" />
              </div>

              <div class="m-2">
                <button type="submit" class="btn btn-primary" @click="resolveCombat">
                  Resolve Combat
                </button>
              </div>
            </div>
          </li>
          <li><hr /></li>
          <li><a class="dropdown-item" href="#" @click="addLoss">Add Loss</a></li>
          <li><a class="dropdown-item" href="#" @click="removeLoss">Remove Loss</a></li>
          <li><a class="dropdown-item" href="#" @click="addStraggler">Add Straggler</a></li>
          <li><a class="dropdown-item" href="#" @click="removeStraggler">Remove Straggler</a></li>
          <li><a class="dropdown-item" href="#" @click="clear">Clear</a></li>
        </ul>
      </div -->
      <span style="top: 2px; position: relative; padding: 0 5px">{{ brigade.name }}</span>
    </div>
    <div class="col-1">
      <span
        style="top: 2px; position: relative; padding: 0 5px"
        :class="{ 'text-decoration-line-through': isWrecked() }"
        >{{ brigade.leader }}</span
      >
    </div>
    <div class="col-10 user-select-none">
      <span style="top: 2px; position: relative; padding: 0 25px">{{ brigade.morale }}</span>
      <LossesPanel :losses="lossesArray" />
    </div>
  </div>
</template>

<style scoped></style>
