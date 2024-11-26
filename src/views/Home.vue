<template>
  <div class="homepage">
    <div class="header">
      <img src="@/assets/rest.jpg" alt="Header Image" class="header-image" />
      <h1 class="title">Welcome to overpriced restaurants</h1>
    </div>
    <div class="restaurant-list">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <p class="restaurant-id">R{{ restaurant.id }}</p>
        <h2 class="restaurant-name">{{ restaurant.name }}</h2>
        <div class="buttons">
          <button class="btn view-btn">View</button>
          <button class="btn reserve-btn">Reserve</button>
          <button class="btn details-btn">Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [
        { id: 1, name: "Prince George Hub" },
        { id: 2, name: "Brentwood" },
        // Add more restaurants as needed
      ]
    };
  }
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px; /* Adjust this to control the width */
  margin: 0 auto;
}


.header {
  position: relative;
  width: 100%;
  text-align: center;
}

.header-image {
  width: 100vw;
  max-width: 100%;
  height: 300px;
}


.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2em;
  font-weight: bold;
}

.restaurant-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.restaurant-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.restaurant-id {
  font-size: 0.8em;
  color: gray;
}

.restaurant-name {
  font-size: 1.2em;
  font-weight: bold;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 5px 10px;
  font-size: 0.9em;
  color: white;
  background-color: #007bff; /* Blue color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3; /* Darker blue */
}

.view-btn {
  background-color: #007bff;
}

.reserve-btn {
  background-color: #007bff;
}

.details-btn {
  background-color: #007bff;
}


</style>
