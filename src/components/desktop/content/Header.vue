<template>
  <header>
    <nav>
      <div class="logoContainer">
        <span class="material-icons">pest_control_rodent</span>
      </div>
      <ul class="navigation">
        <li><router-link class="link" :to="{name: ''}">Test1</router-link></li>
        <li><router-link class="link" :to="{name: ''}">Test2</router-link></li>
        <li><router-link class="link" :to="{name: ''}">Test3</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
  name: "HeaderMain",
  props: {
    // home,
    // logs,
    // profile,
    // logout
  },
};
</script>

<style scoped>
header {
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
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
