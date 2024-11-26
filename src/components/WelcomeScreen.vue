<template>
    <div class="welcome-container">
        <h1>Overpriced Restaurants</h1>
        <div>
            <p>To log in, please select your user type.</p>
        </div>
        <div class="button-container">
            <button type="button" class="user-type-btn" @click="customerLogin">Customer</button>
        <button type="button" class="user-type-btn" @click="adminLogin">Admin</button>
</div>
        <div>
            <p>Register as a new customer:</p>
        </div>
        <button type="button" class="signup-btn" @click="customerSignUp">Sign Up</button>
    </div>
</template>

<script>
    export default {
        name: "WelcomeScreen",
                methods: {
            customerLogin() {
                this.$router.push({ name: "CustomerLogin" });
            },

            adminLogin() {
                this.$router.push({ name: "AdminLogin" });
            },

            customerSignUp() {
                this.$router.push({ name: "CustomerSignUp" });
            }
        },
    }
</script>

<style>/* Background Container with Image */
.welcome-container {
    position: relative;
    max-width: 500px;
    margin: 100px auto;
    padding: 2rem;
    text-align: center;
    color: #fff; /* White text */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    background: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
}

/* Full Background Image */
body {
    /*background: url('../assets/856320.jpg') no-repeat center center fixed;  Add your image path here */
    background-size: cover;
}

/* Overlay Effect */
.welcome-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); /* Dark overlay for readability */
    z-index: -1;
}

/* Title */
h1 {
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bold;
}

/* Paragraph Styling */
p {
    color: #f1f1f1; /* Slightly lighter text for emphasis */
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

/* Button Container */
.button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

/* Buttons */
.user-type-btn,
.signup-btn {
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

/* User Type Buttons */
.user-type-btn {
    background-color: #007bff; /* Blue for primary actions */
}

.user-type-btn:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

/* Signup Button */
.signup-btn {
    background-color: #28a745; /* Green for signup */
}

.signup-btn:hover {
    background-color: #218838; /* Darker green on hover */
}

/* Responsiveness */
@media (max-width: 600px) {
    .welcome-container {
        padding: 1.5rem;
    }

    h1 {
        font-size: 1.5rem;
    }

    .user-type-btn,
    .signup-btn {
        font-size: 0.9rem;
        padding: 0.6rem 1rem;
    }
}

</style>