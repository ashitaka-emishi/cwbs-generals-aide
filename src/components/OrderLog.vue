<script setup>
defineProps({
  title: String,
  data: Array,
  columnDefs: Array
})
</script>

<template>
  <h3>{{ title }}</h3>
  <table class="table">
    <thead>
      <tr>
        <th v-for="column in columnDefs" v-bind:key="column.id">
          {{ column.header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" v-bind:key="item.id">
        <td v-for="column in columnDefs" v-bind:key="column.id">
          <slot :name="`col.${column.name}`" :item="item">
            {{ item[column.name] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
td {
  min-width: 100px;
}

td:first-child {
  min-width: auto;
}

td:nth-child(4) {
  min-width: 150px;
}
</style>
