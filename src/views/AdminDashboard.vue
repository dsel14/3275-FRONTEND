<template>
  <div>
    <router-link to="/" @click="logout">Logout</router-link>
  </div>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Restaurants</v-card-title>
          <v-card-text>
            <RestaurantList
              @restaurant-selected="setSelectedRestaurant"
              :selectedRestaurant="selectedRestaurant"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Tables</v-card-title>
          <v-card-text>
            <TableManagement :selectedRestaurant="selectedRestaurant" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Users</v-card-title>
          <v-card-text>
            <UserManagement />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Reservations</v-card-title>
          <v-card-text>
            <ReservationManagement :selectedRestaurant="selectedRestaurant" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RestaurantList from "@/components/RestaurantList.vue";
import TableManagement from "@/components/TableManagement.vue";
import UserManagement from "@/components/UserManagement.vue";
import ReservationManagement from "@/components/Reservation.vue";

export default {
  components: {
    RestaurantList,
    TableManagement,
    UserManagement,
    ReservationManagement,
  },
  data() {
    return {
      selectedRestaurant: null, // Stores the currently selected restaurant
    };
  },
  methods: {
    setSelectedRestaurant(restaurant) {
      this.selectedRestaurant = restaurant; // Set the selected restaurant
    },
  },
};
</script>
