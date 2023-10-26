<template>
  <h1>Edit Mode</h1>

  <CarForm
    :edited-car-data="selectedCar"
    :mode="mode"
    @update-car-emitted="updateCar($event)"
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
      mode: "edit",
    };
  },

  created() {
    this.fetchCar(this.$route.params.id);
    console.log(this.$route);
  },

  methods: {
    async fetchCar(carId) {
      const response = await fetch(
        "https://front-end-test-back-end.up.railway.app/api/cars/" + carId
      );

      const data = await response.json();

      console.log(data);

      this.selectedCar = data;
    },

    async updateCar(updatedCarObj) {
      try {
        console.log("testing if this triggers");
        await fetch(
          "https://front-end-test-back-end.up.railway.app/api/cars/" +
            //"http://localhost:3000/api/cars/" +
            this.selectedCar._id,
          // this.selectedCar._id refers to the id (starting point) doesnt change
          {
            method: "put",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCarObj),
          }
        );

        console.log(this.selectedCar);
        console.log("testing if this triggers after");

        this.selectedCar = null;
        this.$router.go(-1);
      } catch (error) {
        console.log("Unable to update car!", error);
      }
    },
  },
};
</script>
  
  