<template>
  <div class="restaurant-card">
    <div class="restaurant-info">
      <h2 class="restaurant-name">{{ restaurant.name }}</h2>
      <p class="restaurant-location">{{ restaurant.location }}</p>
    </div>
    <div class="restaurant-actions">
      <v-btn color="primary" @click="openReservationDialog">Reserve</v-btn>
    </div>

    <!-- Reservation Dialog -->
    <reservation-dialog
      v-if="isDialogOpen"
      :restaurant="restaurant"
      @close="closeReservationDialog"
    ></reservation-dialog>
  </div>
</template>

<script>
import ReservationDialog from "@/components/ReservationDialog.vue";

export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  components: {
    ReservationDialog,
  },
  data() {
    return {
      isDialogOpen: false,
    };
  },
  methods: {
    openReservationDialog() {
      this.isDialogOpen = true;
    },
    closeReservationDialog() {
      this.isDialogOpen = false;
    },
  },
};
</script>

<style scoped>
.restaurant-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.restaurant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.restaurant-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.restaurant-code {
  font-weight: bold;
  font-size: 1.2rem;
  color: #888;
}

.restaurant-location {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
}

.restaurant-actions {
    display: flex;
    flex-direction: row;
    gap: 10px; /* Space between buttons */
}

.restaurant-actions button {
  padding: 12px 18px;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  padding: 8px 12px;
  font-size: 0.85rem;
}

.restaurant-actions button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
