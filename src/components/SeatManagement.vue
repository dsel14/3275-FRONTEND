<template>
    <v-card>
      <v-card-title>Seat Management</v-card-title>
      <v-list dense>
        <v-list-item v-for="table in tables" :key="table.id">
          <v-list-item-content>
            <v-list-item-title>Table {{ table.code }}</v-list-item-title>
            <v-list-item-subtitle>
              Seats: {{ table.seats }}
              <v-btn color="primary" @click="addSeat(table.restaurantId, table.code)" small>Add Seat</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list v-if="table.seatsList && table.seatsList.length" dense>
            <v-list-item v-for="seat in table.seatsList" :key="seat.seatNumber">
              <v-list-item-content>Seat {{ seat.seatNumber }}</v-list-item-content>
              <v-btn color="red" @click="removeSeat(table.restaurantId, table.code, seat.seatNumber)" small>Remove</v-btn>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script>
  import { getTables, addSeatToTable, deleteSeatFromTable } from "@/api/api";
  
  export default {
    data() {
      return {
        tables: [],
      };
    },
    async created() {
      await this.fetchTables();
    },
    methods: {
      async fetchTables() {
        const response = await getTables();
        this.tables = response.data;
      },
      async addSeat(restaurantId, tableCode) {
        await addSeatToTable(restaurantId, tableCode);
        await this.fetchTables();
      },
      async removeSeat(restaurantId, tableCode, seatNumber) {
        await deleteSeatFromTable(restaurantId, tableCode, seatNumber);
        await this.fetchTables();
      },
    },
  };
  </script>
  