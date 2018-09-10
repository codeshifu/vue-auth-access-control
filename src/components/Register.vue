<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus>
      </div>

      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required>
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
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