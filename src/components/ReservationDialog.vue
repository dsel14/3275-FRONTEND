<template>
  <v-dialog v-model="isOpen" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Reserve a Table at {{ restaurant.location }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="reservationForm" v-model="formValid">
          <v-text-field
            label="Your Name"
            v-model="reservation.name"
            :rules="[v => !!v || 'Name is required']"
            required
          ></v-text-field>
          <v-text-field
            label="Date"
            v-model="reservation.reservationDate"
            type="date"
            :rules="[v => !!v || 'Date is required']"
            required
          ></v-text-field>
          <v-text-field
            label="Time"
            v-model="reservation.reservationTime"
            type="time"
            :rules="[v => !!v || 'Time is required']"
            required
          ></v-text-field>
          <v-text-field
            label="Guests"
            v-model="reservation.numberOfGuests"
            type="number"
            :rules="[v => v > 0 || 'Must be at least 1 guest']"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Cancel</v-btn>
        <v-btn text @click="submitReservation">Reserve</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { makeReservation } from "@/api/api";

export default {
props: {
  restaurant: {
    type: Object,
    required: true,
  },
},
data() {
  return {
    isOpen: true, 
    formValid: false, 
    reservation: {
      reservationDate: "",
      reservationTime: "",
      numberOfGuests: 1,
    },
  };
},
methods: {
  closeDialog() {
    this.isOpen = false;
    this.$emit("close");
  },
  async submitReservation() {
    if (!this.$refs.reservationForm.validate()) return;

    const reservationDetails = {
      reservationDate: this.reservation.reservationDate,
      reservationTime: this.reservation.reservationTime,
      numberOfGuests: parseInt(this.reservation.numberOfGuests),
      customer: {
        // Retrieve user ID from local storage or authentication system
        uid: localStorage.getItem("userId"),
      },
      restaurant: {
      id: this.restaurant.id, // Include the restaurant ID
      },
    };

    try {
      await makeReservation(reservationDetails);
      alert("Reservation successful!");
      this.closeDialog();
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to make reservation.");
    }
  },
      async openAssignDialog(reservation) {
      this.selectedReservation = reservation;

      if (!this.selectedRestaurant || !this.selectedRestaurant.id) {
        alert("Please select a restaurant first.");
        return;
      }

      try {
        const response = await getTablesByRestaurantId(this.selectedRestaurant.id);
        this.availableTables = response.data;
        if (this.availableTables.length === 0) {
          alert("No tables available for this restaurant.");
        } else {
          this.isDialogOpen = true;
        }
      } catch (error) {
        console.error("Error fetching tables:", error);
        alert("Failed to fetch available tables.");
      }
    },

  },
};
</script>
