<template>
  <div class="closeContainer">
    <span class="material-icons close-icon" @click="this.$emit('map')">
      close
    </span>
  </div>
  <h1>
    Contact Us
  </h1>
  <form @submit="(event) => event.preventDefault()">
    <div class="inputContainer">
        <label for="name">
            Name
        </label>
        <input type="text" id="name"/>
    </div>
    <div class="inputContainer">
        <label for="email">
            Email
        </label>
        <input type="email" id="email"/>
    </div>
    <div class="inputContainer">
        <label for="phone">
            Phone
        </label>
        <input type="tel" id="phone"/>
    </div>
    <div class="inputContainer">
        <label for="comment">
            Comment
        </label>
        <input type="text" id="comment"/>
    </div>
    <div class="submitContainer">
        <input type="submit" value="Submit"/>
    </div>
  </form>
</template>

<script>
export default {
  name: "MobileContact",
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

h1 {
    padding-left: 10vw;
}

form {
    margin-top: 7.5vh;
    padding: 0 10vw;
}

form:first-child {
    margin-top: 0;
}

input[type="text"],
input[type="email"],
input[type="tel"] {
    border: 1px solid rgb(220, 220, 220);
    background-color: rgb(167, 167, 167);
    height: 50px;
    border-radius: 10px;
    margin-top: 10px;
}

input[type="text"]#comment {
    height: 100px;
}

input[type="submit"] {
    border: none;
    background-color: rgb(84, 41, 255);
    height: 30px;
    width: 150px;
    border-radius: 10px;
}

input:focus {
    outline: none;
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

.inputContainer {
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
}

.submitContainer {
    display: flex;
    justify-content: center;
    margin-top: 7.5vh;
}
</style>