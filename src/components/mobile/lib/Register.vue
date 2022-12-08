<template>
  <form @submit="(event) => event.preventDefault()">
    <div class="titleContainer">
      <h1>Rodent</h1>
      <span class="material-icons">pest_control_rodent</span>
    </div>
    <div class="contentContainer">
      <div class="registerTitle">
        <h2>Create Account</h2>
      </div>
      <div class="section">
        <label for="password"> Firstname </label>
        <input v-model="firstname" type="password" id="password" placeholder="Firstname" />
      </div>
      <div class="section">
        <label for="password"> Lastname </label>
        <input v-model="lastname" type="password" id="password" placeholder="Lastname" />
      </div>
      <div class="section">
        <label for="username"> Email </label>
        <input v-model="email" type="email" id="username" placeholder="Email" />
      </div>
      <div class="section">
        <label for="password"> Password </label>
        <input v-model="pwd" type="password" id="password" placeholder="Password" />
      </div>
      <div class="signin">
        <input type="submit" value="Sign up" @click="onSubmit(firstname, lastname, email, pwd)" />
      </div>
      <div class="bot">
        <p>
          Already have an account?
          <button @click="this.$emit('alter')">Sign in</button>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import signUpUser from "./../../../requests/signup";
import swal from 'sweetalert';

export default {
  name: "MobileLogin",
  data()
  {
    return {
      firstname:"",
      lastname:"",
      email:"",
      pwd:""
    }
  },
  methods: {
    async onSubmit(firstname, lastname, email, pwd) {
      let result = await signUpUser(firstname, lastname, email, pwd)
      if (result.status === 201) {
        swal("Account created");
        this.$emit('alter')
      } else {
        swal("Email already exist");
      }
    }
  }
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

h1 {
  margin: 0;
  font-size: 16px;
}

h2 {
  font-size: 32px;
  margin-top: 58px;
  margin-left: 6.5vw;
  margin-bottom: 0;
}

input[type="email"],
input[type="password"] {
  height: 44px;
  width: 81vw;
  border: none;
  outline: 1px solid #d0d5dd;
  background-color: rgba(0, 0, 0, 0);
  line-height: 44px;
  border-radius: 8px;
  font-size: 16px;
  padding: 0 3vw;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline-color: rgb(248, 158, 158);
}

input[type="checkbox"] {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: 1px solid rgb(255, 255, 255);
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  position: absolute;
}

input[type="submit"] {
  height: 44px;
  width: 87vw;
  border: none;
  outline: none;
  background-color: rgb(84, 41, 255);
  line-height: 44px;
  border-radius: 8px;
  font-size: 16px;
  padding: 0 14px;
  margin: 0 6.5vw 18px;
}

input[type="button"] {
  height: 40px;
  width: 87vw;
  border: none;
  outline: 1px solid #d0d5dd;
  background-color: rgba(0, 0, 0, 0);
  line-height: 44px;
  border-radius: 8px;
  font-size: 16px;
  padding: 0 3vw;
  margin: 0 6.5vw;
}

button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: rgb(248, 158, 158);
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

.section {
  display: flex;
  flex-direction: column;
  margin-left: 6.5vw;
  margin-top: 20px;
}

.section > label {
  margin-bottom: 8px;
}

.signin {
  margin-top: 29px;
}

.bot {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 12px;
}
.bot > p {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
}
</style>
