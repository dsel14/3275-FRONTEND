<template>
    <v-card>
      <v-card-title>User Management</v-card-title>
      <v-card-text>
        <v-data-table :items="users" :headers="headers" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-btn color="red" @click="deleteUser(item.id)" small>Delete</v-btn>
          </template>
        </v-data-table>
        <v-btn color="primary" @click="addUser" class="mt-3">Add User</v-btn>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { getUsers, createUser, deleteUser } from "@/api/api";
  
  export default {
    data() {
      return {
        users: [],
        headers: [
          { text: "Username", value: "username" },
          { text: "Email", value: "email" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    async created() {
      await this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        const response = await getUsers();
        this.users = response.data;
      },
      async addUser() {
        await createUser({ username: "newUser", email: "user@example.com" });
        await this.fetchUsers();
      },
      async deleteUser(id) {
        await deleteUser(id);
        await this.fetchUsers();
      },
    },
  };
  </script>
  