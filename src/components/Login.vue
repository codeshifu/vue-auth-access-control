<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <div class="input-group">
        <label for="email">Email</label>
        <input id="email" autofocus required v-model="email" type="email" placeholder="enter your email address" />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input id="password" required v-model="password" type="password" placeholder="********" />
      </div>

      <div class="input-group">
        <button class="btn" type="submit">Login</button>
      </div>

      <p>Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const payload = { ...this.$data };
      this.$store
        .dispatch('login', payload)
        .then(res => {
          this.$swal('Great!', 'You are logged in.', 'success');
          this.$router.push('/');
        })
        .catch(err => {
          this.$swal('Oh no!', err.message, 'error');
        });
    }
  }
};
</script>