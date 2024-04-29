<script setup>
const props = defineProps({
  general: Object
})
</script>

<template>
  <div>
    <h2 class="green">Create New Orders</h2>
    <h3>{{ general.name }} - {{ general.cp }} CPs</h3>
    <hr />
    <div>
      <form>
        <fieldset class="row mb-3">
          <legend class="col-sm-4 col-form-label fs-4" for="receiver-select">Receiver:</legend>
          <div class="col-sm-8">
            <select
              class="form-select mt-2"
              aria-label="Default select example"
              id="receiver-select"
            >
              <option selected>A.P. Hill</option>
              <option value="1">Early</option>
              <option value="2">Ewell</option>
              <option value="5">Longstreet</option>
              <option value="3">Pender</option>
              <option value="6">Pickett</option>
              <option value="4">Rhoades</option>
            </select>
          </div>
        </fieldset>

        <fieldset class="row mb-3">
          <legend class="col-sm-4 col-form-label fs-4">Type:</legend>
          <div class="btn-group col-sm-8" role="group" aria-label="Method: oral or written">
            <input
              type="radio"
              class="btn-check"
              name="orderType"
              id="simple-outlined"
              autocomplete="off"
              checked
            />
            <label class="btn btn-outline-primary col-sm-6 mt-1" for="simple-outlined"
              >Simple</label
            >

            <input
              type="radio"
              class="btn-check"
              name="orderType"
              id="complex-outlined"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary col-sm-6 mt-1" for="complex-outlined"
              >Complex</label
            >
          </div>
        </fieldset>

        <fieldset class="row mb-3">
          <legend class="col-sm-4 col-form-label fs-4">Delivery:</legend>
          <div class="btn-group col-sm-8" role="group" aria-label="Method: oral or written">
            <input
              type="radio"
              class="btn-check"
              name="orderDel"
              id="delivery-aide"
              autocomplete="off"
              checked
            />
            <label class="btn btn-outline-primary col-sm-6 mt-1" for="delivery-aide">Aide</label>

            <input
              type="radio"
              class="btn-check"
              name="orderDel"
              id="delivery-inperson"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary col-sm-6 mt-1" for="delivery-inperson"
              >Leader</label
            >
          </div>
        </fieldset>

        <fieldset class="row mb-3">
          <legend class="col-sm-4 col-form-label fs-4">Method:</legend>
          <div class="btn-group col-sm-8" role="group" aria-label="Method: oral or written">
            <input
              type="radio"
              class="btn-check"
              name="orderMethod"
              id="method-oral"
              autocomplete="off"
              checked
            />
            <label class="btn btn-outline-primary col-sm-6 mt-1" for="method-oral">Oral</label>

            <input
              type="radio"
              class="btn-check"
              name="orderMethod"
              id="method-written"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary col-sm-6 mt-1" for="method-written"
              >Written</label
            >
          </div>
        </fieldset>

        <fieldset class="row mb-3">
          <legend class="form-label fs-4">Instructions:</legend>
          <div class="col-sm-12">
            <textarea class="form-control col-sm-12" rows="5" style="height: 100%"></textarea>
          </div>
        </fieldset>

        <div class="row mb-3">
          <div class="col-sm-2 col-form-label fs-4">Cost:</div>
          <div class="col-sm-2 col-form-label fs-4 text-left">5cp</div>
          <div class="btn-group col-sm-4 mt-1">
            <button type="submit" class="col-form-control btn btn-success">Create</button>
          </div>
          <div class="btn-group col-sm-4 mt-1">
            <button type="submit" class="col-form-control btn btn-danger">Done</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
