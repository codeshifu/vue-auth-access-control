<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <template v-if="user">
        <router-link to="/secure">Secure</router-link> |
        <span>{{ user }}</span> |
        <a @click="logout">Logout</a>
      </template>
      <template v-if="!user">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

#nav a:hover {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

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