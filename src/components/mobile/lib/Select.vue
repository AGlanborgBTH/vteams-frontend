<template>
  <form @submit="(event) => event.preventDefault()">
    <div class="titleContainer">
      <h1>Rodent</h1>
      <span class="material-icons">pest_control_rodent</span>
    </div>
    <div class="contentContainer">
      <div class="registerTitle">
        <h2>Choose City</h2>
      </div>
      <div class="content">
        <div
          v-for="city in cities"
          :key="city._id"
          class="dropDown"
        >
          <div class="buttonContainer">
            <div class="button" @click="current === city._id ? (current = '') : (current = city._id)">
              <p>{{ city.name }}</p>
              <div :class="current === city._id ? 'down' : 'right'" class="arrow">
                <span class="material-icons"> keyboard_arrow_right </span>
              </div>
            </div>
            <div
              :class="current === city._id ? 'show' : 'hidden'"
              class="box"
            >
            <div class="boxContent">
              <p>
                Available bikes: {{ city.scooters.length }}
              </p>
            </div>
            <div class="boxContent">
              <input type="button" value="Select" @click="this.$emit('select', city._id)" />
            </div>
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
      cities: [ ],
      current: "",
    };
  },
  async mounted() {
    const apiUrl  = `http://localhost:3000/v1/cities`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    this.cities = data.data;
  },
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

h1 {
  margin: 0;
  font-size: 16px;
}

input {
  border: none;
  outline: none;
  background-color: rgba(84, 41, 255, 0.8);
  border-radius: 8px;
  height: 40px;
  width: 140px;
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
  font-size: 30px;
  margin-left: 0;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
  overflow: visible;
  min-height: 60px;
}

.button {
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
  font-size: 20px;
  line-height: 24px;
  margin: 0;
}

.button > span {
  display: inline-block;
  line-height: 24px;
}

.down {
  transform: rotate3d(0, 0, 1, 90deg);
}

.right {
  transform: rotate3d(0, 0, 1, 0deg);
}

.arrow {
  transition: 0.5s;
}

.hidden {
  height: 0;
}

.show {
  height: 160px;
}

.box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 0.5s;
  width: 87vw;
  margin: 0 6.5vw 10px;
  font-size: 18px;
}

.boxContent {
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.boxContent > p {
  width: 80vw;
  margin: 0 2vw;
}
</style>
