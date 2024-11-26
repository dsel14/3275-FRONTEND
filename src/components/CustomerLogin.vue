<template>
    <div>
        <h4>Customer Login</h4>
        <form>
            <div>
                <label for="username">Username: </label>
                <input type="text" id="username" v-model="userLoginRequest.username" />
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="password" id="password" v-model="userLoginRequest.password" />
            </div>
        </form>
        <div>
            <button type="submit" @click="login">Login</button>
        </div>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import UserLoginService from "../services/UserLoginService";

export default {
    name: "CustomerLogin",
    data() {
        return {
            userLoginRequest: { username: "", password: "" },
            message: ""
        }
    },

    methods: {
        login(event) {
            event.preventDefault();
            UserLoginService.login(this.userLoginRequest)
                .then(response => {
                    let user = response.data;
                    console.log(user);
                    localStorage.setItem('username', user.username);
                    this.message = user;
                    this.$router.push({ name: "HomePageView" });
                })
                .catch(error => {
                    this.userLoginRequest.username = "";
                    this.userLoginRequest.password = "";
                    this.message = error.message;
                    console.log(error);
                    // console.log(error.response.data);
                });
        }
    },

    mounted() {
        this.message = "";
    }


}



</script>

<style scoped>
/* Style for the form container */
div {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    /* Style for the form headings */
    h4 {
        text-align: center;
        color: #333;
    }

    /* Style for the form inputs */
    form div {
        margin-bottom: 10px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    /* Style for the login button */
    button[type="submit"] {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    button[type="submit"]:hover {
        background-color: #0056b3;
    }

    /* Style for the message */
    p {
        margin-top: 10px;
        text-align: center;
        color: red;
        font-weight: bold;
    }
</style>