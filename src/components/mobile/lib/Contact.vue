<template>
  <div class="closeContainer">
    <span class="material-icons close-icon" @click="this.$emit('map')">
      close
    </span>
  </div>
  <h1>Contact Us</h1>
  <form @submit="(event) => event.preventDefault()">
    <div class="inputContainer">
      <label for="name"> Name </label>
      <input v-model="name" type="text" id="name" />
    </div>
    <div class="inputContainer">
      <label for="email"> Email </label>
      <input v-model="email" type="email" id="email" />
    </div>
    <div class="inputContainer">
      <label for="phone"> Phone </label>
      <input v-model="phone" type="tel" id="phone" />
    </div>
    <div class="inputContainer">
      <label for="comment"> Comment </label>
      <textarea v-model="comment" id="comment"> </textarea>
    </div>
    <div class="submitContainer">
      <input type="submit" value="Submit" @click="onSubmit" />
    </div>
  </form>
  <div v-if="this.state" class="tyContainer">
    <div class="ty">
      <h2>Thank you</h2>
      <p>
        We might contact you,
        <br />
        or we might not
      </p>
      <p>Thank you again for taking your time to contact us</p>
      <div class="backContainer">
        <input type="button" value="Back" @click="this.$emit('map')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileContact",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      comment: "",
      state: 0,
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.email && this.phone && this.comment) {
        this.state = 1;
      }
    },
  },
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
input[type="tel"],
textarea {
  border: 1px solid rgb(220, 220, 220);
  background-color: rgb(167, 167, 167);
  height: 50px;
  border-radius: 10px;
  margin-top: 10px;
  padding: 0 10px;
}

textarea {
  height: 80px;
  padding: 10px;
}

input[type="submit"],
input[type="button"] {
  border: none;
  background-color: rgb(84, 41, 255);
  height: 30px;
  width: 150px;
  border-radius: 10px;
}

input:focus,
textarea:focus {
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

.tyContainer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
}

.ty {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.8);
  height: 55vh;
  width: 65vw;
  border-radius: 20px;
  padding: 0 7.5vw;
}

.ty h2,
.ty p {
  margin: 0;
}

.backContainer {
  display: flex;
  justify-content: center;
}
</style>