<script setup>
import { ref } from 'vue'
import OrderLog from '../components/OrderLog.vue'
//import OrderCreate from '../components/OrderCreate.vue'

const items = ref([
  {
    id: 1,
    arrivalTime: 'At Start',
    receiver: '5th Corps - Porter',
    sender: 'McClellan',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content: 'Defend the line of Beaver Dam Creek.'
  },
  {
    id: 2,
    arrivalTime: 'At Start',
    receiver: '2-5 - Sykes',
    sender: 'McClellan',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content:
      'Defend the 5th Corps left flank and prevent a crossing of either the New or Upper Trestle Bridges'
  },
  {
    id: 3,
    arrivalTime: 'At Start',
    receiver: '1-6 - Slocum',
    sender: 'McClellan',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content: 'Move to the 5th Corps. Once there, attach to that corps.'
  },
  {
    id: 4,
    arrivalTime: 'At Start',
    receiver: '1-2 - Richardson',
    sender: 'McClellan',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content: 'Move to the 5th Corps. Once there, attach to that corps.'
  }
])

const items2 = ref([
  {
    id: 1,
    arrivalTime: 'At Start',
    receiver: 'AH DIV - AP Hill',
    sender: 'Lee',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content:
      "On the turn after B-AH enters or passes through A15.15, AP Hill's Division is to cross at the Meadow Bridges and move to Mechanicsville."
  },
  {
    id: 2,
    arrivalTime: 'At Start',
    receiver: 'B-AH - Branch',
    sender: 'Lee',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content: 'Move to Mechanicsville via A15.15 & rejoin division.'
  },
  {
    id: 3,
    arrivalTime: 'At Start',
    receiver: 'DH DIV - DH Hill',
    sender: 'Lee',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content:
      'On the turn after AH Division crosses the Chickahominy River, these divisions are to cross and move to Mechanicsville.'
  },
  {
    id: 4,
    arrivalTime: 'At Start',
    receiver: 'L DIV - Longstreet',
    sender: 'Lee',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content:
      'On the turn after AH Division crosses the Chickahominy River, these divisions are to cross and move to Mechanicsville.'
  },
  {
    id: 5,
    arrivalTime: 'At Start',
    receiver: 'Valley Army - Jackson',
    sender: 'Lee',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content:
      "Move to Shady Grove Road, turn east, and move to Hundley's Corners. Halt and await further orders"
  },
  {
    id: 6,
    arrivalTime: 'At Start',
    receiver: 'CAV - Stuart',
    sender: 'Lee',
    type: 'Complex',
    method: 'Aide Oral',
    status: 'Active',
    content: 'Attach to Valley Army.'
  }
])

const columns = ref([
  { id: 1, header: '#', name: 'id' },
  { id: 2, header: 'Arrival', name: 'arrivalTime' },
  { id: 3, header: 'Sender', name: 'sender' },
  { id: 4, header: 'Receiver', name: 'receiver' },
  { id: 5, header: 'Type', name: 'type' },
  { id: 6, header: 'Method', name: 'method' },
  { id: 7, header: 'Status', name: 'status' },
  { id: 8, header: 'Content', name: 'content' }
])

/*
const general = ref({
  name: 'Robert E. Lee',
  rating: 4,
  cp: getCp(4)
})

function getCp(rating) {
  var cp = 8
  if (rating > 0) cp = 12
  if (rating > 2) cp = 16
  return cp
}
*/
</script>

<template>
  <header class="row">
    <h1 class="text-center pb-3">Order Log</h1>
  </header>

  <div class="row">
    <OrderLog class="col-12" :data="items" :column-defs="columns" :title="'Army of the Potomac'" />
    <OrderLog
      class="col-12"
      :data="items2"
      :column-defs="columns"
      :title="'Army of Northern Virginia'"
    />
  </div>
</template>

<style scoped></style>
