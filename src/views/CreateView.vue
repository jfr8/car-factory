<template>
  <h1>Create Mode</h1>

  <CarForm
    :edited-car-data="selectedCar"
    :mode="mode"
    @new-car-emitted="createNewCar($event)"
  ></CarForm>
</template>


<script>
import CarForm from "@/components/CarForm.vue";

export default {
  components: {
    CarForm: CarForm,
  },

  data() {
    return {
      apiURL: "https://front-end-test-back-end.up.railway.app/api/cars/",
      selectedCar: null,
      mode: "creating", // dont change this, it should not be edit while on create mode
    };
  },

  methods: {
    async createNewCar(newCarObj) {

      try {
        const response = await fetch(this.apiURL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCarObj),
        });

        console.log("Here is response", response);
        this.$router.push('/')

      } catch (err) {
        console.error("errorrrrr: ", err);
      }
    },
  },
};
</script>

