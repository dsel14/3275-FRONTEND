<template>
    <v-card>
      <v-card-title>Restaurant List</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item-group>
            <v-list-item
              v-for="restaurant in restaurants"
              :key="restaurant.id"
              @click="selectRestaurant(restaurant)"
              :class="{'selected': restaurant.id === selectedRestaurant?.id}"
            >
              <v-list-item-content>
                <v-list-item-title>{{ restaurant.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ restaurant.location }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { getRestaurants, deleteRestaurant, createRestaurant } from "@/api/api";
  
  export default {
    props: {
      selectedRestaurant: Object,
    },
    data() {
      return {
        restaurants: [],
      };
    },
    async created() {
      await this.fetchRestaurants();
    },
    methods: {
      async fetchRestaurants() {
        const response = await getRestaurants();
        this.restaurants = response.data;
      },
      async addRestaurant() {
        await createRestaurant({ name: "New Restaurant", location: "New Location" });
        await this.fetchRestaurants();
      },
      async deleteRestaurant(id) {
        await deleteRestaurant(id);
        await this.fetchRestaurants();
      },
      selectRestaurant(restaurant) {
        this.$emit("restaurant-selected", restaurant);
      },
    },
  };
  </script>
  
  <style scoped>
  .selected {
    background-color: #e0f7fa;
  }
  </style>
  