<template>
  <div>
    <span v-if="carList.length === 0 || !carList.length"> No cars found</span>
    <ul v-else>
      <li v-for="car in carList" :key="car._id">
        {{ car.brand }} - {{ car.model }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      apiURL: "https://front-end-test-back-end.up.railway.app/api/cars",
      carList: [],
    };
  },

  created() {
    this.getCarListFromApi();
  },

  methods: {
    async getCarListFromApi() {
      const response = await fetch(this.apiURL);
      const data = await response.json();
      this.carList = data;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
