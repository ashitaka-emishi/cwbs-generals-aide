<script setup>
import { BIconFiles } from 'bootstrap-icons-vue'

import { RouterLink, RouterView } from 'vue-router'
import { useGameListStore } from './stores/gameList'
import { days, hours } from './rules/turn'

const store = useGameListStore()
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" v-if="store.noGame">CWBS General's Aide</a>
      <a class="navbar-brand" href="#" v-if="!store.noGame"
        >{{ store.currentGame.name }}: {{ store.currentScenario.name }}</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="nav navbar-nav me-auto mb-2 mb-md-0 justify-content-right">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Orders" class="nav-link" :class="{ disabled: store.noGame }"
              >Orders</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/Fire" class="nav-link" :class="{ disabled: store.noGame }"
              >Fire!</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/Losses" class="nav-link" :class="{ disabled: store.noGame }"
              >Losses</RouterLink
            >
          </li>
        </ul>
        <form class="d-flex" v-if="!store.noGame">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-scondary">&lt;</button>
            <div class="input-group-text">
              {{ days[store.currentScenario.day] }} -
              {{ hours[store.currentScenario.hour].hour }}
            </div>
            <button type="button" class="btn btn-scondary">&gt;</button>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BIconFiles />
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="./docs/CWB_v32_Rules.pdf" target="_blank"
                  >CWB Series Rules v3.2</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="./docs/GM_Rules.pdf" target="_blank"
                  >Gaines Mills Rules</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="./docs/SP_Savage_Station_Rules.pdf" target="_blank"
                  >Savage Station Rules</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="./docs/MH_Rules.pdf" target="_blank"
                  >Malvern Hill Rules</a
                >
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </nav>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
