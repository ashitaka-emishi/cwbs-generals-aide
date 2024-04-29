<script setup>
import { computed, onMounted, ref } from 'vue'
import DiceBox from '@3d-dice/dice-box'
import DisplayResults from '@3d-dice/dice-ui/src/displayResults'
import AdvancedRoller from '@3d-dice/dice-ui/src/advancedRoller'
import BoxControls from '@3d-dice/dice-ui/src/boxControls'

import { useGameListStore } from '../stores/gameList'
import { days, hours } from '../rules/turn'
import router from '../router'

const store = useGameListStore()
const dicebox = ref(null)
let diceBox = null

onMounted(() => {
  console.log(dicebox.value, dicebox.value.id)
  diceBox = new DiceBox('#dicebox', {
    id: 'dice-canvas',
    assetPath: '/assets/',
    theme: 'default',
    offscreen: true,
    gravity: 6,
    mass: 4,
    friction: 0.2,
    restitution: 0.8,
    scale: 10,
    spinForce: 10,
    throwForce: 10,
    startingHeight: 10,
    settleTimeout: 10000
  })

  diceBox.init().then(() => {
    // create display overlay
    const Display = new DisplayResults('#dicebox')

    // // create Roller Input
    /*
  const Roller = new AdvancedRoller({
    target: "#dice-box",
    onSubmit: (notation) => Box.roll(notation),
    onClear: () => {
      Box.clear();
      Display.clear();
    },
    onReroll: (rolls) => {
      // loop through parsed roll notations and send them to the Box
      rolls.forEach((roll) => Box.add(roll, roll.groupId));
    },
    onResults: (results) => {
      console.log(results);
      Display.showResults(results);
    }
  });*/

    // pass dice rolls to Advanced Roller to handle
    diceBox.onRollComplete = (results) => {
      //Display.showResults(results)
    }
  })
})

function roll() {
  diceBox.roll(
    [
      {
        qty: 2,
        sides: 6,
        themeColor: '#ba0000'
      },
      {
        qty: 1,
        sides: 6,
        themeColor: '#ba5400'
      },
      {
        qty: 1,
        sides: 6,
        themeColor: '#009400'
      },
      {
        qty: 1,
        sides: 6,
        themeColor: '#006F6F'
      },
      {
        qty: 1,
        sides: 6,
        themeColor: '#004040'
      }
    ],
    { newStartPoint: true }
  )
}
</script>

<template>
  <header class="row">
    <h1 class="text-center pb-3">Fire Combat</h1>
  </header>

  <div class="row text-center">
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Attacking Field's Brigade</h4>
          <div class="row">
            <div class="col">
              <img src="/games/seven-days/CSA - AH Div - F Bde - front.png" />
            </div>
            <div class="col">
              <form>
                <div class="input-group">
                  <select type="text" class="form-control text-center">
                    <option value="0">less than 1</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 to 4</option>
                    <option value="4">5 to 6</option>
                    <option value="5">7 to 8</option>
                    <option value="6">9 to 11</option>
                    <option value="7">12 to 14</option>
                    <option value="8">l5 to 17</option>
                    <option value="9">18 to 20</option>
                    <option value="10">21 or more</option>
                  </select>
                  <button type="button" class="btn btn-danger" @click="roll()">Fire!</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div id="dicebox" ref="dicebox" class="card-body">
          <h4 class="card-title">Roll</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#dicebox {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 400px;
}

#dice-canvas {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 80%;
  height: 75%;
}
</style>
