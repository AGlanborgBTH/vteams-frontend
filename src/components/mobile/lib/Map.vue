<template>
  <div class="container">
    <div class="circleContainer">
      <div
        @click="() => (open ? (open = false) : (open = true))"
        :class="open ? 'hidden' : 'visible'"
        class="circle"
      >
        <div>
          <div class="stripe" />
          <div class="stripe" />
          <div class="stripe" />
        </div>
      </div>
    </div>
    <div :class="open ? 'exp' : 'min'" class="menu">
      <div class="title">
        <div>
          <span class="material-icons">pest_control_rodent</span>
          <h1>Rodent</h1>
        </div>
      </div>
      <div class="content">
        <div
          v-for="option in options"
          :key="option.text"
          class="optionContainer"
        >
          <div class="option">
            <span class="material-icons opt-icon">
              {{ option.icon }}
            </span>
            <div>
              <h2>
                {{ option.text }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="map" @click="open = false" />
  </div>
</template>

<script>
import map from "@/lib/map.js";

export default {
  name: "MobileLogin",
  data() {
    return {
      current: "",
      open: true,
      options: [
        {
          icon: "person",
          text: "Profile",
        },
        {
          icon: "loop",
          text: "Change City",
        },
        {
          icon: "info",
          text: "About",
        },
        {
          icon: "contact_support",
          text: "Contact",
        },
      ],
    };
  },
  mounted() {
    map();
  },
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

h1 {
  font-size: 18px;
}

h2 {
  font-size: 16px;
}

h1,
h2 {
  position: absolute;
  display: inline-block;
  line-height: 24px;
  margin: 3px 0 0 10px;
}

span {
  display: inline-block;
  line-height: 24px;
}

.container {
  height: 100%;
  width: 100%;
}

#map {
  height: 100%;
  width: 100%;
  z-index: 0;
}

.circleContainer {
  position: absolute;
  left: 0;
  top: 0;
  margin: 10px;
  z-index: 10;
}

.circle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(46, 59, 97);
  height: 60px;
  width: 60px;
  border-radius: 50%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  transition: 0.5s;
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.1s, opacity 0.1s linear;
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.1s linear;
}

.stripe:first-child {
  margin-bottom: 10px;
}

.stripe:last-child {
  margin-top: 10px;
}

.stripe {
  background-color: rgb(255, 255, 255);
  width: 30px;
  height: 3px;
  border-radius: 5px;
}

.exp {
  width: 75vw;
}

.min {
  width: 0vw;
}

.menu {
  position: absolute;
  overflow: hidden;
  background-color: rgb(46, 59, 97);
  height: 100%;
  z-index: 9;
  transition: 0.5s;
}

.title {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 10vh;
  padding-left: 15vw;
}

.content {
  height: 55vh;
  padding-top: 9vh;
}

.opt-icon {
  font-size: 35px;
}

.optionContainer {
  width: 100%;
  margin-top: 5vh;
  padding-left: 15vw;
}

.optionContainer:first-child {
  margin-top: 0;
}

.option {
  display: flex;
  flex-direction: row;
}
</style>
