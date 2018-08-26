<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>Email</label>
            <input required v-model="email" type="email" placeholder="Name" />
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password" />
            <hr/>
            <button type="submit">Login</button>
            <p>Don't have an account?
                <router-link to='/register'>Register</router-link>
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
  }
};
</script>