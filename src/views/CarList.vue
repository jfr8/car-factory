<template>
  <div id="box">
    <span class="subtitle has-text-primary-dark" v-if="carList.length > 0"
      >Here are the available cars:
    </span>

    <span v-if="carList.length === 0 || !carList.length"> No cars found</span>

    <div v-else class="cardGrid">
      <div class="card" v-for="car in carList" :key="car._id">
        <header class="card-header">
          <p class="card-header-title">{{ car.brand }} {{ car.model }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>{{ car.year }}</p>
            <p>{{ car.color }}</p>
            <p>{{ car.mpg }} miles per gallon</p>
            <p>{{ car.isnew ? "new car" : "used car" }}</p>
            <p>{{ car.isEV ? "is EV" : "not EV" }}</p>
          </div>
        </div>

        <footer class="card-footer">
          <a
          class="card-footer-item"
            @click="editCar(car)"
          >
            edit
          </a>
          <a
          class="card-footer-item"
            @click="deleteCar(car._id)"
          >
            remove
          </a>
        </footer>
      </div>
    </div>
    <!-- <table class="table" v-else>
      <thead>      
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>MPG</th>
          <th>Is it new?</th>
          <th>Is it EV?</th>
          <th>Edit</th>
          <th>Detele</th>
        </tr>
      </thead>
      <tbody>
        <tr class="m-0 p-0" v-for="car in carList" :key="car._id">
          <td>{{ car.brand }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.year }}</td>
          <td>{{ car.color }}</td>
          <td>{{ car.mpg }}</td>
          <td>{{ car.isnew ? "new car" : "used car" }}</td>
          <td>{{ car.isEV ? "is EV" : "not EV" }}</td>
          <td><button
            class="button is-warning is-light button is-small"
            @click="editCar(car)"
          >
            edit
          </button></td>
          <td><button
            class="button is-danger is-light button is-small"
            @click="deleteCar(car._id)"
          >
            remove
          </button></td>
        </tr>
      </tbody>
    </table> -->
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
      this.$router.push(`/edit/${car._id}`);
    },
  },
};
</script>

<style scoped>

.cardGrid {
  display: grid;
  row-gap: 2rem;

}

</style>