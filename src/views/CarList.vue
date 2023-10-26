<template>
  <h1>Car List</h1>
  <div id="box">
    <span class="subtitle has-text-primary-dark" v-if="carList.length > 0"
      >Here are the available cars:
    </span>

    <span v-if="carList.length === 0 || !carList.length"> No cars found</span>
    <ul v-else>
      <li class="m-0 p-0" v-for="car in carList" :key="car._id">
        {{ car.brand }} - {{ car.model }} - {{ car.year }} - {{ car.color }} -
        {{ car.mpg }} - {{ car.isnew ? "new car" : "used car" }} -
        {{ car.isEV ? "is EV" : "not EV" }}
        <button
          class="button is-warning is-light button is-small"
          @click="editCar(car)"
        >
          edit
        </button>
        <button
          class="button is-danger is-light button is-small"
          @click="deleteCar(car._id)"
        >
          remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ts-check

export default {
  data() {
    return {
      carList: [],
      mode: "",
      selectedCar: {},
      apiURL: "https://front-end-test-back-end.up.railway.app/api/cars/",
    };
  },

  created() {
    this.getCarListFromApi();
  },

  methods: {

    async getCarListFromApi() {
      try {
        console.log(this.apiURL);
        const response = await fetch(this.apiURL);
        console.log("responseeee", response);
        const data = await response.json();
        this.carList = data;
      } catch (error) {
        console.log("errorrr", error);
       
      }
    },

    deleteCar(carId) {
      try {
        fetch(
          "https://front-end-test-back-end.up.railway.app/api/cars/" + carId,
          //"http://localhost:3000/api/cars/" + carId,
          {
            method: "delete",
            mode: "cors",
          }
        );
      } catch (error) {
        console.log("Cannot delete car", error);
      }
    },

    editCar(car) {
      this.$router.push(`/edit/${car._id}`)
    },
  },
};
</script>
