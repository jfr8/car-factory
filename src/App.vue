<template>
  <div id="wrapper">
    <h1 class="title">Car Factory</h1>

    <!-- @ recieves the data (emit), :send the data(prop)-->
    <CarForm
      :edited-car-data="selectedCar"
      :mode="mode"
      @new-car-emitted="createNewCar($event)"
      @update-car-emitted="updateCar($event)"
    ></CarForm>

    <div v-if="showAlert" class="notification is-danger">
      <button @click="removeAlert" class="delete"></button>
      <span>Unable to retrieve data!! Check API connection, Try again..</span>
    </div>

    <div id="box">
      <span class="subtitle has-text-primary-dark" v-if="carList.length > 0"
        >Here are the available cars:
      </span>

      <span v-if="carList.length === 0 || !carList.length"> No cars found</span>
      <ul v-else>
        <li class="m-0 p-0" v-for="car in carList" :key="car._id">
          {{ car.brand }} - {{ car.model }} - {{ car.year }} - {{ car.color }} -
          {{ car.mpg }} - {{ car.isnew ? "new car" : "used car" }}
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
  </div>
</template>

<script>
// @ts-check

import CarForm from "./components/CarForm.vue";

export default {
  components: {
    CarForm: CarForm,
  },
  name: "App",

  // Gotta review the leak about emits not being declared
  

  data() {
    return {
      // selectedCar is set to null so it can be use on the prop name 
      showAlert: false,
      selectedCar: null,
      carList: [],
      mode: "creating",
      apiURL: "https://front-end-test-back-end.up.railway.app/api/cars/",
    };
  },

  // try catch, add alerts, error handling
  // components
  created() {
    this.getCarListFromApi();
  },
  methods: {
    async createNewCar(newCarObj) {
      //create carObject
      console.log(newCarObj);

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
        // fetch post form  to api
        this.getCarListFromApi();
      } catch (err) {
        console.log("errorrrrr");
      }
    },

    async getCarListFromApi() {
      try {
        console.log(this.apiURL);
        const response = await fetch(this.apiURL);
        console.log("responseeee", response);
        const data = await response.json();
        this.carList = data;
      } catch (error) {
        console.log("errorrr", error);
        this.showAlert = true;
      }
    },

    async updateCar(updatedCarObj) {
      try {
        console.log("testing if this triggers");
        await fetch(
          "https://front-end-test-back-end.up.railway.app/api/cars/" +
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

        console.log(this.selectedCar)
        console.log("testing if this triggers after");

        this.getCarListFromApi();
        //this.resetForm();
      } catch (error) {
        console.log("Unable to update car!", error);
      }

      this.selectedCar = null;
      this.mode = "creating";
    },

    removeAlert() {
      console.log("testingnnnnnn");
      this.showAlert = false;
    },

    deleteCar(carId) {
      try {
        fetch(
          "https://front-end-test-back-end.up.railway.app/api/cars/" + carId,
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
