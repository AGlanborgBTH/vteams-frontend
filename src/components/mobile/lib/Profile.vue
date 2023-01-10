<template>
  <div class="closeContainer">
    <span class="material-icons close-icon" @click="this.$emit('map')">
      close
    </span>
  </div>
  <div class="pictureContainer">
    <div class="picture" />
    <div class="pictureEditContainer">
      <span class="material-icons picture-edit">edit</span>
    </div>
  </div>
  <div class="inputCenter">
    <div class="inputContainer">
      <label for="name" class="inputLabel"> Name </label>
      <input type="text" placeholder="Jeon Jung-kook" id="name" />
      <div class="inputEditContainer">
        <span class="material-icons input-edit">edit</span>
      </div>
    </div>
  </div>
  <div class="inputCenter">
    <div class="inputContainer">
      <label for="email" class="inputLabel"> Email </label>
      <input v-model="email" type="email" placeholder="jungkook@bts.ko" id="email" />
      <div class="inputEditContainer">
        <span class="material-icons input-edit">edit</span>
      </div>
    </div>
  </div>
  <div class="inputCenter">
    <div class="inputContainer">
      <label for="password" class="inputLabel"> Password </label>
      <input type="password" placeholder="*******" id="password" />
      <div class="inputEditContainer">
        <span class="material-icons input-edit">edit</span>
      </div>
    </div>
  </div>
  <div class="walletContainer">
    <div class="walletIconContainer">
      <span class="material-icons wallet-icon">wallet</span>
    </div>
    <p>{{ this.wallet }} kr</p>
  </div>
  <div class="addFundsContainer">
    <div class="addFunds">
      <label for="money" class="addFundsLabel">Add Funds</label>
      <input v-model="add" type="number" id="money" />
    </div>
    <div class="addContainer">
      <input @click="updMoney" type="button" class="add" value="Add" />
    </div>
  </div>
  <div class="deleteContainer">
    <input type="button" class="delete" value="Delete" />
  </div>
</template>

<script>
import incrementWallet from "@/requests/incrementWallet";
import getWalletValue from "@/requests/getWalletValue";
import { useCookies } from "vue3-cookies";

export default {
  name: "MobileProfile",
  data() {
    return {
      email: "",
      wallet: 0,
      add: 0
    }
  },
  methods: {
    async updMoney() {
      incrementWallet(parseInt(this.add));
      this.wallet = parseInt(this.wallet) + parseInt(this.add);
      this.add = 0;
    },
  },
  async mounted() {
    const { cookies } = useCookies();

    this.email = cookies.get("user").email;
    this.wallet = parseInt(await getWalletValue());
  },
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

input[type="text"],
input[type="email"],
input[type="password"] {
  border: none;
  border-bottom: 1px solid rgb(220, 220, 220);
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  padding: 0 0 10px 5px;
}

input[type="number"] {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgb(220, 220, 220);
  padding: 15px;
  width: 55px;
  height: 20px;
  border-radius: 10px;
}

input[type="button"] {
  cursor: pointer;
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

.pictureContainer {
  display: flex;
  justify-content: center;
  margin: 2.5vh 0 0.5vh;
}

.picture {
  height: 85px;
  width: 85px;
  border-radius: 50%;
  background-image: url("@/assets/nani.jpg");
}

.pictureEditContainer {
  position: absolute;
  margin: 60px 0 0 90px;
  z-index: 0;
}

.picture-edit {
  cursor: pointer;
}

.inputCenter {
  display: flex;
  justify-content: center;
  margin-top: 3vh;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  width: 50vw;
}

.inputLabel {
  margin-bottom: 8px;
}

.inputEditContainer {
  position: absolute;
  margin: 30px 0 0 50vw;
  z-index: 0;
}

.input-edit {
  cursor: pointer;
  font-size: 16px;
}

.walletContainer {
  display: flex;
  justify-content: center;
  margin-top: 4vh;
}

.walletIconContainer {
  margin: 5px 10px;
}

.wallet-icon {
  font-size: 40px;
}

.addFundsContainer {
  display: flex;
  justify-content: center;
  margin-top: 3vh;
}

.addFunds {
  display: flex;
  flex-direction: column;
}

.addFundsLabel {
  margin-bottom: 5px;
}

.addContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 9vw;
}

.add {
  border: none;
  background-color: rgb(84, 41, 255);
  width: 75px;
  height: 25px;
  margin-top: 25px;
  border-radius: 10px;
}

.deleteContainer {
  display: flex;
  justify-content: center;
  margin-top: 8vh;
}

.delete {
  border: none;
  background-color: rgb(241, 37, 37);
  width: 150px;
  height: 30px;
  border-radius: 10px;
}
</style>