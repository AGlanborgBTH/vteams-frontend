<template>
  <div class="logoContainer">
    <span class="material-icons">pest_control_rodent</span>
    <h1>Rodent</h1>
  </div>
  <div class="container">
    <div class="mainContainer">
      <div class="formContainer">
        <div class="content">
          <form>
            <div class="titleContainer">
              <h2>E-Bike Login</h2>
              <p class="titleText">Login to access profile</p>
            </div>
            <div class="mainInputContainer">
              <div class="inputContainer">
                <label for="email" class="inputLabel"> Email </label>
                <input type="email" placeholder="Email" id="email" />
              </div>
              <div class="inputContainer">
                <label for="password" class="inputLabel"> Password </label>
                <input type="password" placeholder="Password" id="password" />
              </div>
            </div>
            <div class="sub">
              <div class="rememberContainer">
                <input type="checkbox" id="remember" />
                <label for="remember"> Remember me </label>
              </div>
              <p class="forgot">Forgot Password?</p>
            </div>
            <div class="submitContainer">
              <input type="submit" value="Sign In" />
              <a
                href="https://github.com/login/oauth/authorize?client_id=6cf1f637f3f432873249&scope=user:email"
              >
                <input type="button" value="Sign In with Github" />
              </a>
            </div>
          </form>
        </div>
      </div>
      <div class="mapContainer">
        <div class="map" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DesktopLogin",
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

h1 {
  position: absolute;
  display: inline-block;
  font-size: 16px;
  margin: 4px 0 0 10px;
}

h2 {
  font-size: 40px;
  margin: 0;
}

form {
  padding-right: 20%;
}

input[type="email"],
input[type="password"] {
  background-color: rgba(0, 0, 0, 0);
  outline: 1px solid rgb(208, 213, 221);
  border: none;
  height: 45px;
  width: 90%;
  border-radius: 8px;
  font-size: 16px;
  padding: 10px 5%;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: 1px solid rgb(208, 213, 221);
}

input[type="submit"] {
  border: none;
  background-color: rgba(84, 41, 255);
  border-radius: 8px;
  height: 44px;
  width: 100%;
  font-size: 16px;
}

input[type="button"] {
  border: none;
  outline: 1px solid #d0d5dd;
  background-color: rgba(0, 0, 0, 0);
  height: 44px;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 30px;
}

.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.mainContainer {
  display: flex;
  flex-direction: row;
  width: 1200px;
  height: 100vh;
}

.formContainer {
  width: 45%;
}

.mapContainer {
  width: 55%;
}

.logoContainer {
  position: fixed;
  height: 25px;
  padding: 25px;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 95vh;
}

.mainInputContainer {
  margin-top: 50px;
}

.submitContainer {
  margin-top: 45px;
}

.titleText {
  font-size: 16px;
  margin: 8px 0 0;
}

.inputContainer {
  margin-top: 40px;
}

.inputContainer:first-child {
  margin: 0;
}

.inputLabel {
  display: block;
  font-size: 20px;
  margin: 0 8px 8px;
}

.sub {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.rememberContainer,
.forgot {
  margin: 0;
  font-size: 14px;
}

.forgot {
  display: inline-block;
  color: rgba(102, 112, 133);
}

.map {
  background-image: url("@/assets/swe.png"),
    radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 60%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 95vh;
  margin: 2.5vh 0;
  border-radius: 40px;
}
</style>
