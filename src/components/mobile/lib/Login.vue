<template>
  <form @submit="(event) => event.preventDefault()">
    <div class="titleContainer">
      <h1>Rodent</h1>
      <span class="material-icons main-icon">pest_control_rodent</span>
    </div>
    <div class="contentContainer">
      <h2>E-bike {{ title }}</h2>
      <p class="excerpt">
        {{ excerpt }}
      </p>
      <div class="section">
        <label for="username"> Email </label>
        <input type="email" id="username" placeholder="Email" />
      </div>
      <div class="section">
        <label for="password"> Password </label>
        <input type="password" id="password" placeholder="Password" />
      </div>
      <div v-if="sup === '1'" class="sup">
        <div class="rememberContainer">
          <input type="checkbox" id="remember" />
          <label for="remember" class="rememberText"> Remember me </label>
        </div>
        <p class="forgot">Forgot Password?</p>
      </div>
      <div v-else class="supReplace">
      </div>
      <input type="submit" :value="submit" @click="onSubmit" />
      <a href="https://github.com/login/oauth/authorize?client_id=6cf1f637f3f432873249"><input type="button" :value="submit + ' with Github'" @click="onGit" /></a>
      <div class="bot">
        <p>
          {{ footer }}
          <button @click="this.$emit('alter')">
            {{ alt }}
          </button>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "MobileLogin",
  props: {
    title: String,
    excerpt: String,
    sup: String,
    submit: String,
    footer: String,
    alt: String,
  },
  methods: {
    onSubmit() {

    },
    onGit() {

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

.excerpt {
  font-size: 16px;
  margin-left: 6.5vw;
  margin-bottom: 15px;
  margin-top: 0;
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

.sup {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 35px 6.5vw 6.5vw;
}

.supReplace {
  margin: 36px;
}

.rememberContainer {
  position: relative;
}

.rememberText {
  line-height: 0;
  font-size: 14px;
  top: 10px;
  margin-left: 28px;
}

.forgot {
  margin: 0;
  line-height: 24px;
  font-size: 14px;
  color: rgb(102, 112, 133);
}

.bot {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 21px;
}
.bot > p {
  margin: 0;
}
</style>
