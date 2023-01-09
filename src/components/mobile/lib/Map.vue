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
			<div class="WalletContainer">
				<input class="inputButton" v-model="incrementValue" />
				<button
					class="addMoneyButton"
					@click="updMoney"
				>
					Add Money
				</button>
				<p>Current Wallet {{ wallet }}</p>
			</div>
			<div class="footer">
				<div class="logoutContainer">
					<input type="button" class="logout" value="Logout" />
				</div>
				<div class="legal">
					<p>Term Of Use</p>
					<p>Privacy $ Service</p>
				</div>
				<div class="version">
					<p>Rodent v1.0.1</p>
				</div>
			</div>
		</div>
		<div id="map" @click="open = false" />
	</div>
</template>

<script>
import map from "@/lib/map.js";
import { incrementWallet } from "@/requests/updateWallet.js";
import { getWalletValue } from "@/requests/getWalletValue.js";

export default {
	name: "MobileLogin",
	props: {
		city: String,
	},
	data() {
		return {
			incrementValue: 0,
			open: false,
      wallet: 0,
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
				{
					icon: "wallet",
					text: "Wallet",
				},
			],
		};
	},
	methods: {
		incrementWallet,
    updMoney () {
      incrementWallet(parseInt(this.incrementValue))
      this.wallet = parseInt(this.wallet) + parseInt(this.incrementValue)
    }
	},
	async mounted() {
		map(this.city);
    this.wallet = parseInt(await getWalletValue());
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
	margin: 2px 0 0 10px;
}

span {
	display: inline-block;
	line-height: 24px;
}

.container {
	white-space: nowrap;
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
	transition: visibility 0s 0.1s, opacity 0.1s linear;
	opacity: 0;
}

.visible {
	visibility: visible;
	transition: opacity 0.1s linear;
	opacity: 1;
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
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
	height: 100%;
	z-index: 9;
	transition: 0.5s;
}

.title {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50vw;
	height: 10vh;
}

.content {
	height: 60vh;
	padding-top: 5vh;
}

.footer {
	display: flex;
	flex-direction: column;
	height: 30vh;
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

.WalletContainer {
	padding-left: 17.5vw;
	width: 100%;
}

.logoutContainer {
	padding-left: 17.5vw;
	width: 100%;
}

.inputButton {
	border: none;
	outline: 1px solid #d0d5dd;
	background-color: rgba(0, 0, 0, 0);
	line-height: 35px;
	border-radius: 8px;
	font-size: 12px;
	padding: 0 3vw;
}

.inputButton:focus {
	outline-color: rgb(248, 158, 158);
}

.addMoneyButton {
	border: none;
	background-color: rgb(84, 41, 255);
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
	border-radius: 2px;
	height: 35px;
	width: 172px;
	margin-top: 10px;
	font-size: 12px;
	display: block;
}

.logout {
	border: none;
	background-color: rgb(84, 41, 255);
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
	border-radius: 8px;
	width: 40vw;
	height: 30px;
	font-size: 16px;
}

.legal {
	margin-top: 3vh;
	padding-left: 10vw;
	font-size: 15px;
}

.version {
	padding-left: 10vw;
	font-size: 14px;
	color: rgb(102, 112, 133);
}
</style>
