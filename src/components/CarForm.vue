<template>
  <div id="box">
    <h2 class="subtitle has-text-primary-dark" v-if="mode === 'creating'">
      Create
    </h2>
    <h2 class="subtitle has-text-dark" v-else>Update car</h2>

    <!--  Review how the component can send the emit event to the parent component --> 
    <form class="form" @submit.prevent="emitCar()">
      <label for="brand" class="label"
        >Brand:
        <input
          class="input is-normal"
          @input="updateCarFormField($event, 'form.brand')"
          id="brand"
          v-model="formData.brand"
          placeholder="Add Brand"
      /></label>
      <label for="model" class="label"
        >Model:
        <input
          class="input is-normal"
          id="model"
          v-model="formData.model"
          placeholder="Add model"
      /></label>
      <label for="year" class="label"
        >Year:
        <input
          class="input is-normal"
          id="year"
          v-model="formData.year"
          placeholder="Add year"
      /></label>
      <label for="color" class="label"
        >Color:
        <input
          class="input is-normal"
          id="color"
          v-model="formData.color"
          placeholder="Add Color"
      /></label>
      <label for="mpg" class="label"
        >MPG:
        <input
          class="input is-normal"
          id="mpg"
          v-model="formData.mpg"
          placeholder="Add mpg"
      /></label>
      <label for="isNew" class="label"
        >Is Car New:
        <input
          id="isNew"
          type="checkbox"
          v-model="formData.isNew"
          placeholder="Add isNew"
      /></label>

      <button
        class="button is-primary"
        v-if="mode === 'creating'"
        type="submit"
      >
        Add New Car
      </button>
      <button class="button is-black" v-else type="submit">Update car</button>
    </form>
  </div>
</template>

<script>
// @ts-check

export default {

  // here we are sending a props to the parent component (on line: 7), in this case we are
  // sending an object called carData and a string called mode
  props: {
    editedCarData: Object,
    mode: String,
  },

  emits: ['new-car-emitted', 'update-car-emitted'],


  data() {
    return {
      isCreating: true,
      formData: {
        brand: "",
        model: "",
        year: null,
        color: "",
        mpg: null,
        isNew: true,
      },
    };
  },

  watch: {
    editedCarData(value) {
      if (!value) {
        return;
      }

      this.formData.brand = value.brand;
      this.formData.model = value.model;
      this.formData.year = value.year;
      this.formData.color = value.color;
      this.formData.mpg = value.mpg;
      this.formData.isNew = value.isNew;
    },
  },

  methods: {
    emitCar() {
      // emit passes name of the event & payload 'data'
      console.log("emit starts");
      console.log(this.mode);
      if (this.mode === "creating") {
        this.$emit("new-car-emitted", this.formData);
      } else {
        console.log("does update emmit works");
        this.$emit("update-car-emitted", this.formData);
      }

      this.resetForm();
    },

    editCar(car) {
      this.isCreating = false;

      this.formData.brand = car.brand;
      this.formData.model = car.model;
      this.formData.year = car.year;
      this.formData.color = car.color;
      this.formData.mpg = car.mpg;
      this.formData.isNew = car.isNew;
    },

    resetForm() {
      this.isCreating = true;

      this.selectedCarId = "";
      this.formData.brand = "";
      this.formData.model = "";
      this.formData.year = null;
      this.formData.color = "";
      this.formData.mpg = null;
      this.formData.isNew = true;
    },

    updateCarFormField(event, fieldName) {
      this[fieldName] = event.target.value;
      console.log("fieldNameeeee", fieldName);
    },
  },
};
</script>
