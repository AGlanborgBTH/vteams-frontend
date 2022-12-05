<template>
  <form @submit="(event) => event.preventDefault()">
    <div class="titleContainer">
      <h1>Rodent</h1>
      <span class="material-icons main-icon">pest_control_rodent</span>
    </div>
    <div class="contentContainer">
      <div class="registerTitle">
        <h2>Choose City</h2>
      </div>
      <div class="content">
        <div v-for="city in cities" :key="city.id" class="dropDown">
          <div class="buttonContainer">
            <div class="button">
              <p>{{ city.name }}</p>
              <span class="material-icons main-icon">keyboard_arrow_right</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "MobileLogin",
  data() {
    return {
      cities: [
        {
          _id: "6384bb54079e5520699909d6",
          name: "Göteborg",
          scooters: [234, 123, 345, 645],
        },
        {
          _id: "6384bb54079e552069909d6",
          name: "Göteborg",
          scooters: [234, 123, 345, 645],
        },
        {
          _id: "6384bb5409e5520699909d6",
          name: "Göteborg",
          scooters: [234, 123, 345, 645],
        },
        {
          _id: "6384bb54079e552069909d6",
          name: "Göteborg",
          scooters: [234, 123, 345, 645],
        },
        {
          _id: "6384bb54079e552099909d6",
          name: "Göteborg",
          scooters: [234, 123, 345, 645],
        },
      ],
    };
  },
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

h1 {
  margin: 0;
  font-size: 16px;
}

.titleContainer {
  height: 20vh;
  width: 100vw;
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
}

.contentContainer {
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.registerTitle > h2 {
  text-align: center;
  margin-left: 0;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
}

.buttonContainer {
  height: 60px;
}

.button {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(84, 41, 255, 0.8);
  height: 24px;
  width: 74vw;
  margin: 0 6.5vw;
  padding: 13px 6.5vw;
}

.button > p {
  display: inline-block;
  position: relative;
  font-size: 20px;
  line-height: 24px;
  margin: 0;
}

.button > span {
  display: inline-block;
  position: relative;
  line-height: 24px;
}
</style>
