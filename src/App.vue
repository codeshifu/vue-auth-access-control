<template>
  <div id="app">
    <div id="nav">
      <div class="container">
        <router-link to="/" class="brand">Blog</router-link>
        <div class="links">
          <template v-if="user">
            <router-link to="/secure">Secure</router-link>
            <a>{{ user }}</a>
            <a @click="logout">Logout</a>
          </template>
          <template v-if="!user">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </template>
        </div>
      </div>
    </div>
    <div class="container router-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: mapGetters(['user']),
  mounted() {
    this.$store.dispatch('refreshUser');
  },
  methods: {
    logout () {
      this.$store.dispatch('logout', {router: this.$router});
    }
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  border: none;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-family: 'Open Sans', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.6em;
  font-size: 1.4rem;
}

#app {
  color: #2c3e50;
}

#nav {
  background: #303f9f;
  padding: 1rem;
}

#nav a {
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

#nav a:hover {
  color: #f0eeee;
}

#nav a.router-link-exact-active {
  color: #ffc107;
}

.container {
  max-width: 100rem;
  margin: 0 auto;
}
#nav .container {
  display: flex;
}

#nav a.brand {
  flex: 1;
  text-transform: uppercase;
}

.links a {
  padding: 0 0.8rem;
}
.router-view {
  padding: 2rem 0;
}

form {
  width: 50%;
  margin: 2rem auto 0;
}
.input-group {
  margin: 2rem 0;
}
.input-group label {
  display: block;
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
}
.input-group input {
  padding: 1.2rem 1rem;
  width: 100%;
  border: 1px solid #e6e0e0;
  font-size: 1.4rem;
  border-radius: 0 2rem 2rem 0;
}
.btn {
  font-size: 1.5rem;
  background-color: #c2185b;
  color: #fff;
  padding: 0.8rem 3rem;
  border-radius: 0 1.5rem 1.5rem 0;
  cursor: pointer;
}
.btn:hover {
  color: #f0eeee;
  background-color: #e91e63;
}
@media screen and (max-width: 680px) {
  form {
    width: 100%;
    padding: 0 1.8rem;
  }
}
</style>