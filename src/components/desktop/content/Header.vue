<template>
  <header v-if="user">
    <nav>
      <div class="logoContainer">
        <span class="material-icons">pest_control_rodent</span>
      </div>
      <ul class="navigation">
        <li class="link" @click="this.$emit('changePanel', 10)">Log out</li>
      </ul>
    </nav>
  </header>
  <header v-else>
    <nav>
      <div class="logoContainer">
        <span class="material-icons">pest_control_rodent</span>
      </div>
      <ul class="navigation">
        <li class="link" @click="this.$emit('changePanel', 1)">Manage scooters</li>
        <li class="link" @click="this.$emit('changePanel', 2)">Manage users</li>
        <li class="link" @click="this.$emit('changePanel', 10)">Log out</li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
  name: "HeaderMain",
  emits: ["changePanel"],
  props: ['user']
};
</script>

<style scoped>
header {
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
  display: contents;
}

nav {
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  transition: 0.5s ease all;
  width: 90%;
  margin: 0 auto;
  @media (min-width: 1140px;) {
    max-width: 1140px;
  }
}

ul, .link {
  font-weight: 500;
  color: #fff;
  list-style: none;
  text-decoration: none;
}

li {
  text-transform: capitalize;
  padding: 16px;
  margin-left: 16px;
}


.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.link {
  font-size: 14px;
  transition: .5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  cursor: pointer;
}

.link:hover {
  color: black;
  border-color: black;
}

.logoContainer {
  display: flex;
  align-items: center;
}

.material-icons {
  font-size: 50px;
}

</style>
