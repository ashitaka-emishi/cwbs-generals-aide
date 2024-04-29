<script setup>
import { computed, ref } from 'vue'
import { useGameListStore } from '../stores/gameList'
import { days, hours } from '../rules/turn'
import router from '../router'
const store = useGameListStore()

function getId(idx) {
  return `gameItem-${idx}`
}

const selectedGame = ref(0)
const selectedScenario = ref(0)

const getEndDay = computed(() => {
  let hr =
    store.availableGames[selectedGame.value].scenarios[selectedScenario.value].length +
    store.availableGames[selectedGame.value].scenarios[selectedScenario.value].hour -
    1
  let result = store.availableGames[selectedGame.value].scenarios[selectedScenario.value].day
  while (hr >= hours.length) {
    hr -= hours.length
    result++
  }
  return result
})

const getEndHour = computed(() => {
  let result =
    store.availableGames[selectedGame.value].scenarios[selectedScenario.value].length +
    store.availableGames[selectedGame.value].scenarios[selectedScenario.value].hour -
    1
  while (result >= hours.length) {
    result -= hours.length
  }
  return result
})

function startNewGame() {
  store.currentGameIdx = selectedGame.value
  store.currentScenarioIdx = selectedScenario.value
  router.push('/losses')
}

function endCurrentGame() {
  store.currentGameIdx = null
  store.currentScenarioIdx = null
}
</script>

<template>
  <header class="text-center pb-3">
    <h1>Available Scenarios</h1>
  </header>
  <div class="row">
    <div class="col-4">
      <div
        class="accordion"
        id="accordionExample"
        v-for="(game, idx) in store.availableGames"
        :key="game.name"
      >
        <div class="accordion-item">
          <h2 class="accordion-header" @click="(selectedGame = idx), (selectedScenario = 0)">
            <button
              class="accordion-button"
              :class="{ collapsed: selectedGame != idx }"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#' + getId(idx)"
              aria-expanded="false"
              :aria-controls="getId(idx)"
            >
              {{ game.name }}
            </button>
          </h2>
          <div
            :id="getId(idx)"
            class="accordion-collapse collapse"
            :class="{ show: selectedGame == idx }"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body p-0">
              <ul
                class="list-group list-group-flush"
                v-for="(scenario, idx2) in game.scenarios"
                :key="scenario.name"
              >
                <li
                  class="list-group-item"
                  :class="{ active: selectedScenario == idx2 }"
                  @click="selectedScenario = idx2"
                >
                  {{ scenario.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8" :key="(selectedGame, selectedScenario)">
      <h2>
        {{ store.availableGames[selectedGame].name }}
      </h2>
      <div>
        {{ store.availableGames[selectedGame].description }}
      </div>
      <hr />
      <h3>
        {{ store.availableGames[selectedGame].scenarios[selectedScenario].name }}
      </h3>
      <div>
        {{ store.availableGames[selectedGame].scenarios[selectedScenario].description }}
      </div>
      <dt>Starts:</dt>
      <dd>
        {{ days[store.availableGames[selectedGame].scenarios[selectedScenario].day] }} -
        {{ hours[store.availableGames[selectedGame].scenarios[selectedScenario].hour].hour }}
      </dd>
      <dt>Ends:</dt>
      <dd>{{ days[getEndDay] }} - {{ hours[getEndHour].hour }}</dd>
      <dt>Length:</dt>
      <dd>{{ store.availableGames[selectedGame].scenarios[selectedScenario].length }} turns</dd>
      <hr />
      <button class="btn btn-danger" @click="endCurrentGame" v-if="!store.noGame">
        End Current Game
      </button>
      <button class="btn btn-success" @click="startNewGame" v-if="store.noGame">
        Start New Game
      </button>
    </div>
  </div>
</template>
