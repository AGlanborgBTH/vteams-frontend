<template>
  <div class="closeContainer">
    <span class="material-icons close-icon" @click="this.$emit('map')">
      close
    </span>
  </div>
  <div class="titleContainer">
    <h1>Rodent</h1>
  </div>
  <div class="imageContainer">
    <img src="@/assets/swe.png" class="image" />
  </div>
  <div class="textContainer">
    <h2>Get Moving With E-Bikes!</h2>
    <p>
      Fruffy loffers glurbled through the loffing sprobbly, perbling in and out
      of the flimzy floofs. They were on a mission to find the mysterious
      fribble that had been lost in the wibbly wobbly woods. Along the
    </p>
    <div class="moreButtonContainer">
      <input type="button" value="View More" class="moreButton" />
    </div>
  </div>
  <div class="aboutContainer">
    <h2>About Us</h2>
    <p>
      Fruffy loffers glurbled through the loffing sprobbly, perbling in and out
      of the flimzy floofs. They were on a mission to find the mysterious
      fribble that had been lost in the wibbly wobbly woods. Along the
    </p>
    <div class="aboutButtonContainer">
      <input type="button" value="View More" class="aboutButton" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMain",
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

h1 {
  font-size: 32px;
}

input {
  cursor: pointer;
}

.closeContainer {
  display: flex;
  flex-direction: row-reverse;
  padding: 6vh 8vw 0;
}

.close-icon {
  cursor: pointer;
  font-size: 35px;
}

.titleContainer {
  text-align: center;
}

.imageContainer {
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: 5vh;
}

.image {
  height: 31.5vh;
}

.textContainer,
.aboutContainer {
  padding: 5vh 8.5vw;
}

.textContainer > p,
.aboutContainer > p {
  padding-left: 4vw;
}

.moreButtonContainer {
  display: flex;
  justify-content: center;
}

.moreButton {
  border: none;
  background-color: rgb(84, 41, 255);
  height: 30px;
  width: 150px;
  border-radius: 10px;
}

.aboutContainer {
  background-color: rgba(0, 0, 0, 0.1);
}

.aboutButton {
  border: none;
  border-bottom: 1px solid rgb(220, 220, 220);
  background-color: rgba(0, 0, 0, 0);
  margin-left: 4vw;
  padding: 0 0 5px;
}
</style>