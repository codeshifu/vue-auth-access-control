<template>
  <div>
    <form @submit.prevent="register">
      <h1>Create an account</h1>
      <div class="input-group">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="name" required autofocus placeholder="e.g. John Smith">
      </div>
      <div class="input-group">
        <label for="email">E-Mail address</label>
        <input id="email" type="email" v-model="email" required placeholder="e.g. johnsmith@example.com">
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required placeholder="***********">
      </div>

      <div class="input-group">
        <button class="btn" type="submit">Register</button>
      </div>
      <p>Already have an account?
        <router-link to="/login">Log in</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      const payload = { ...this.$data };
      this.$store
        .dispatch('register', payload)
        .then(() => {
          this.$swal(
            'Awesome 🎉',
            'Your account has been created successfully.',
            'success'
          );
          this.$router.push('/login');
        })
        .catch(err => {
          this.$swal('😞', err.message, 'error');
        });
    }
  }
};
</script>