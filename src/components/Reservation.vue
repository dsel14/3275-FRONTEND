<template>
  <div>
    <h3>Reservation Requests</h3>
    <v-data-table :headers="headers" :items="reservations" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="openAssignDialog(item)">Assign Table</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="isDialogOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Assign Table</span>
        </v-card-title>
        <v-card-text>
          <v-select
            label="Select Table"
            v-model="selectedTableId"
            :items="availableTables"
            :item-text="code"
            item-value="id"
            :rules="[v => !!v || 'Please select a table']"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn text :disabled="isLoading" @click="assignTable">
            <v-progress-circular v-if="isLoading" indeterminate size="20" />
            <template v-else>Assign</template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { toRaw } from "vue";
import { getReservations, getTablesByRestaurantId, assignTableToReservation } from "@/api/api";

export default {
  data() {
    return {
      reservations: [],
      headers: [
        { text: "Customer Name", value: "customer.name" },
        { text: "Date", value: "reservationDate" },
        { text: "Time", value: "reservationTime" },
        { text: "Guests", value: "numberOfGuests" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      isDialogOpen: false,
      selectedReservation: null,
      availableTables: [], 
      selectedTableId: null,
      isLoading: false,
    };
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await getReservations();
        this.reservations = response.data;
      } catch (error) {
        console.error("Error fetching reservations:", error);
        alert("Failed to fetch reservations.");
      }
    },

    async openAssignDialog(reservation) {
      this.selectedReservation = reservation;
      const restaurantId = reservation.restaurant?.id;

      if (!restaurantId) {
        alert("Restaurant ID not found for this reservation.");
        return;
      }

      try {
        const response = await getTablesByRestaurantId(restaurantId);
        this.availableTables = JSON.parse(JSON.stringify(response.data));
        console.log("Available tables (unwrapped):", this.availableTables);

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

    closeDialog() {
      this.isDialogOpen = false;
      this.selectedTableId = null;
    },

    async assignTable() {
      if (!this.selectedTableId) {
        alert("Please select a table.");
        return;
      }
      this.isLoading = true;
      try {
        await assignTableToReservation(this.selectedReservation.id, this.selectedTableId);
        alert("Table assigned successfully!");
        this.closeDialog();
        this.fetchReservations();
      } catch (error) {
        console.error("Error assigning table:", error);
        alert("Failed to assign table.");
      } finally {
        this.isLoading = false;
      }
    },
  },
  async created() {
    await this.fetchReservations();
  },
};
</script>
