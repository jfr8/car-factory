<template>
  <div id="wrapper">
    <h1 class="title">Car Factory</h1>

    <CarForm></CarForm>
    

    <div v-if="showAlert" class="notification is-danger">
      <button @click="removeAlert" class="delete"></button>
      <span>Unable to retrieve data!! Check API connection, Try again..</span>
    </div>
  </div>
</template>

<script>
import CarForm from "./components/CarForm.vue";

export default {
  components: {
    CarForm: CarForm,
  },
  name: "App",
  data() {
    return {
      showAlert: false,
    };
  },

  // try catch, add alerts, error handling
  // components

  methods: {
    removeAlert() {
      console.log("testingnnnnnn");
      this.showAlert = false;
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
