<template>
  <div id="wrapper">
    <h1 class="title">Car Factory</h1>
    <div id="formDataTable">
      <h2 class="subtitle has-text-primary-dark" v-if="isCreating">Create/Update car</h2>
      <h2 class="subtitle has-text-dark" v-else>Update car</h2>

      <form
        class="form"
        @submit.prevent="isCreating ? createNewCar() : updateCar()"
      >
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
          <input class="input is-normal" id="model" v-model="formData.model" placeholder="Add model"
        /></label>
        <label for="year" class="label" 
          >Year:
          <input class="input is-normal" id="year" v-model="formData.year" placeholder="Add year"
        /></label>
        <label for="color" class="label"
          >Color:
          <input class="input is-normal" id="color" v-model="formData.color" placeholder="Add Color"
        /></label>
        <label for="mpg" class="label"
          >MPG: <input class="input is-normal" id="mpg" v-model="formData.mpg" placeholder="Add mpg"
        /></label>
        <label for="isNew" class="label"
          >Is Car New:
          <input
            id="isNew"
            type="checkbox"
            v-model="formData.isNew"
            placeholder="Add isNew"
        /></label>

        <button class="button is-primary" v-if="isCreating" type="submit">Add New Car</button>
        <button class="button is-black" v-else type="submit">Update car</button>
      </form>
    </div>
    <br /><br />

    <div id="outputTable">
      <span class="subtitle has-text-primary-dark" v-if="carList.length > 0 ">Here are the available cars: </span>
      
      <span v-if="carList.length === 0 || !carList.length"> No cars found</span>
      <ul v-else>
        <li class="m-0 p-0" v-for="car in carList" :key="car._id">
          {{ car.brand }} - {{ car.model }}
          <button class="button is-warning is-light button is-small" @click="editCar(car)">edit</button>
          <button class="button is-danger is-light button is-small" @click="deleteCar(car._id)">remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      apiURL: "https://front-end-test-back-end.up.railway.app/api/cars/",
      carList: [],
      isCreating: true,
      formData: {
        brand: "",
        model: "",
        year: null,
        color: "",
        mpg: null,
        isNew: true,
      },
      selectedCarId: null,
    };
  },

  created() {
    this.getCarListFromApi();
  },
  // try catch, add alerts, error handling
  // components

  methods: {
    async getCarListFromApi() {
      try {
        
        console.log(this.apiURL)
        const response = await fetch(this.apiURL);
        console.log('responseeee', response)
        const data = await response.json();
        this.carList = data;
      } catch (error) {
        console.log("errorrr", error);
        alert("Cannot retrieve data!");
      }
    },

    async createNewCar() {
      //create carObject
      const newCarObj = {
        brand: this.formData.brand,
        model: this.formData.model,
        year: this.formData.year,
        color: this.formData.color,
        mpg: this.formData.mpg,
        isNew: this.formData.isNew,
      };

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
      this.isCreating = false;

      this.selectedCarId = car._id;
      this.formData.brand = car.brand;
      this.formData.model = car.model;
      this.formData.year = car.year;
      this.formData.color = car.color;
      this.formData.mpg = car.mpg;
      this.formData.isNew = car.isNew;
    },

    async updateCar() {
      const updateCarObj = {
        brand: this.formData.brand,
        model: this.formData.model,
        year: this.formData.year,
        color: this.formData.color,
        mpg: this.formData.mpg,
        isNew: this.formData.isNew,
      };

      console.log("final Obj: ", updateCarObj);

      try {
        await fetch(
          "https://front-end-test-back-end.up.railway.app/api/cars/" +
            this.selectedCarId,
          {
            method: "put",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateCarObj),
          }
        );

        this.getCarListFromApi();
        this.resetForm();
      } catch (error) {
        console.log("Unable to update car!", error);
      }
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
