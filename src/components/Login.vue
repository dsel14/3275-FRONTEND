<template>
    <v-container class="login">
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="text-h5">Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="username"
              label="Username"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
              required
            ></v-text-field>
            <v-btn class="mt-4" block color="primary" type="submit">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/api/login', {
            username: this.username,
            password: this.password
          });
          console.log('Logged in:', response.data);
          this.$router.push('/dashboard');
        } catch (error) {
          console.error('Login failed:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  </style>
  