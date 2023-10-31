<template>
  <div id="wrapper">
    <TheNavigationBar/>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>

    <!-- @ recieves the data (emit), :send the data(prop)-->
    <!-- <CarForm
      :edited-car-data="selectedCar"
      :mode="mode"
      @new-car-emitted="createNewCar($event)"
      @update-car-emitted="updateCar($event)"
    ></CarForm> -->

    <div v-if="showAlert" class="notification is-danger">
      <button @click="removeAlert" class="delete"></button>
      <span>Unable to retrieve data!! Check API connection, Try again..</span>
    </div>
  </div>
</template>

<script>
import TheNavigationBar from './components/TheNavigationBar';
// @ts-check


export default {
  name: "App",
  components: {
    TheNavigationBar
  },



  data() {
    return {
      // selectedCar is set to null so it can be use on the prop name
      showAlert: false,
      selectedCar: null,
      carList: [],
      mode: "creating",
      apiURL: "https://front-end-test-back-end.up.railway.app/api/cars/",
      //apiURL: "http://localhost:3000/api/cars"
    };
  },

  methods: {
    removeAlert() {
      console.log("testingnnnnnn");
      this.showAlert = false;
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
      this.mode = "edit";
      console.log(car);
      this.selectedCar = car;
    },
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form {
  display: grid;
}

#wrapper {
  width: 500px;
  display: inline-block;
}

#formDataTable {
  height: 25%;
  width: 100%;
  border: solid;
  padding: 10px;
  margin: 10px;
}

#outputTable {
  height: 75%;
  width: 100%;
  border: solid;
  padding: 10px;
  margin: 10px;
}

#updateTable {
  height: 75%;
  width: 100%;
  border: solid;
  padding: 10px;
  margin: 10px;
}
</style>
