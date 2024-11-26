<template>
    <div>
      <h1>Customer Registration</h1>
      <div v-if="isVisibleInputBox">
        <form @submit.prevent="registerCustomer">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="customer.name" required />
          </div>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="customer.username" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="customer.password" required />
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="customer.email" required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
  
      <p style="color: black;">{{ message }}</p>
      <div v-if="isVisibleSuccessfulLoad" style="color: black;">
        <p>Customer ID: {{ newCustomerId }}</p>
        <p>Customer name: {{ newCustomerName }}</p>
        <router-link to="/" @click="logout" style="color: red; text-decoration: none;">Go to log in screen.</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import UserDataService from "../services/UserDataService";
  
  export default {
    name: "CustomerSignUp",
    data() {
      return {
        customer: {
          name: "",
          username: "",
          password: "",
          email: "",
        },
        isVisibleSuccessfulLoad: false,
        isVisibleInputBox: true,
        message: "",
        newCustomerId: null,
        newCustomerName: "",
      };
    },
    methods: {
        registerCustomer() {
            console.log("Data:", this.customer); 

            UserDataService.create(this.customer)
            .then((response) => {
                const newCustomer = response.data;
                console.log("Response from server:", newCustomer);
                localStorage.setItem("username", newCustomer.username);
                localStorage.setItem("userId", newCustomer.uid);
                this.newCustomerId = newCustomer.uid;
                this.newCustomerName = newCustomer.name;
                this.isVisibleInputBox = false;
                this.isVisibleSuccessfulLoad = true;
                this.message = "Successfully added a new Customer.";
            })
            .catch((error) => {
                console.error("Error response:", error.response || error);
                this.message =
                error.response && error.response.data
                    ? error.response.data.message
                    : "An error occurred while creating the user.";
            });
        },
    },
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  
  form {
    background-color: #fff;
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
  }
  
  form div {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    width: 100%;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 1.1rem;
    color: #333;
  }
  
  input:focus {
    border-color: #4caf50;
    outline: none;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 1rem;
    background-color: #4caf50;
    color: #fff;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button[type="submit"]:hover {
    background-color: #45a049;
  }
  </style>
  