<template>
  <div>
    <router-link to="/" @click="logout">Logout</router-link>
  </div>
  <div class="homepage">
    <div class="header">
      <div class="header-overlay">
        <h1 class="title">Welcome to Overpriced Restaurants</h1>
      </div>
    </div>
    <div class="restaurant-list">
      <restaurant-card
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      ></restaurant-card>
    </div>
  </div>
</template>

<script>
import RestaurantCard from "@/components/RestaurantCard.vue";
import { getRestaurants } from "@/api/api";

export default {
  components: {
    RestaurantCard,
  },
  data() {
    return {
      restaurants: [], // Store all restaurants
    };
  },
  async created() {
    try {
      const response = await getRestaurants(); // Fetch restaurants from API
      this.restaurants = response.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  },
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  width: 100%;
  height: 400px; /* Adjust height as needed */
  position: relative;
  background-image: url('@/assets/rest.jpg');
  background-size: cover;
  background-position: center;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Adds a dark overlay for readability */
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  color: white;
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  padding: 0 20px;
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
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
