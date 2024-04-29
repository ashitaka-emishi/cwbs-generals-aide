import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { GameList } from '@/rules/battles/gaines-mill/gainesMill'

export const useGameListStore = defineStore('cwbs.gamelist', {
  state: () => ({
    currentTurn: useLocalStorage('pinia/gamelist/currentTurn', 0),
    currentGameIdx: useLocalStorage('pinia/gamelist/currentGame', null),
    currentScenarioIdx: useLocalStorage('pinia/gamelist/currentScenario', null),
    availableGames: GameList
  }),
  getters: {
    noGame: (state) => state.currentGame == null,
    currentGame: (state) => (state.currentGameIdx == null ? null : GameList[state.currentGameIdx]),
    currentScenario: (state) =>
      state.currentScenarioIdx == null
        ? null
        : GameList[state.currentGameIdx].scenarios[state.currentScenarioIdx]
  }
})
