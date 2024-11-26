<template>
  <v-card>
    <v-card-title>Table Management</v-card-title>
    <v-card-text>
      <div v-if="selectedRestaurant">
        <p>Showing tables for: <strong>{{ selectedRestaurant.name }}</strong></p>
        <v-data-table :items="tables" :headers="headers" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-btn color="red" @click="deleteTable(item.id)" small>Delete</v-btn>
            <v-btn color="primary" @click="openEditDialog(item)" small>Edit</v-btn>
          </template>
        </v-data-table>

        
        <v-btn color="primary" @click="openAddTableDialog" class="mt-3">Add Table</v-btn>

        <!-- ADD TABLE POPUP -->
        <v-dialog v-model="isAddTableDialogOpen" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Add Table to {{ selectedRestaurant.name }}</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="addTableForm" v-model="formValid">
                <v-text-field
                  label="Table Code"
                  v-model="newTable.code"
                  :rules="[v => !!v || 'Code is required']"
                  required
                ></v-text-field>
                <v-text-field
                  label="Position"
                  v-model="newTable.position"
                  :rules="[v => !!v || 'Position is required']"
                  required
                ></v-text-field>
                <v-text-field
                  label="Seats"
                  v-model="newTable.seats"
                  :rules="[v => !!v || 'Seats are required']"
                  type="number"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeAddTableDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="submitAddTable">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- EDIT TABLE POPUP -->
        <v-dialog v-model="isEditDialogOpen" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Table</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="editTableForm" v-model="formValid">
                <v-text-field
                  label="Table Code"
                  v-model="editableTable.code"
                  :rules="[v => !!v || 'Code is required']"
                  required
                ></v-text-field>
                <v-text-field
                  label="Position"
                  v-model="editableTable.position"
                  :rules="[v => !!v || 'Position is required']"
                  required
                ></v-text-field>
                <v-text-field
                  label="Seats"
                  v-model="editableTable.seats"
                  :rules="[v => !!v || 'Seats are required']"
                  type="number"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEditDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="submitEditTable">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <p v-else>Select a restaurant to see its tables.</p>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  getTablesByRestaurantId,
  createTable,
  deleteTable,
  updateTable,
} from "@/api/api";

export default {
  // RECEIVE SELECTED DATA
  props: {
    selectedRestaurant: Object, // CONTAINING THE DATA
  },
  data() {
    return {
      tables: [], // HOLDS THE TABLES FOR RESTAURANT
      headers: [
        // JUST THE VARIABLE BASICALLY
        { text: "Code", value: "code" }, 
        // JUST THE VARIABLE BASICALLY
        { text: "Position", value: "position" }, 
        // JUST THE VARIABLE BASICALLY
        { text: "Seats", value: "seats" }, 
        // TAKES IN THE SELECTED ACTION (ADD CANCEL)
        { text: "Actions", value: "actions", sortable: false },
      ],
      // JUST THE STATE IF THE POPUP IS OPEN SAME WITH THE BOTTOM ONE
      isAddTableDialogOpen: false,
      isEditDialogOpen: false,
      // HOLDS THE DATA FOR (PUT) EDITING THE TABLE
      newTable: {
        code: "",
        position: "",
        seats: 1,
      },
      editableTable: null,
      formValid: false,
    };
  },
  watch: {
    selectedRestaurant: {
      immediate: true,
      handler(newRestaurant) {
        if (newRestaurant) {
          this.fetchTables(newRestaurant.id);
        } else {
          this.tables = [];
        }
      },
    },
  },
  methods: {
    async fetchTables(restaurantId) {
      // FROM API.JS
      const response = await getTablesByRestaurantId(restaurantId);
      this.tables = response.data;
    },
    // OPEN TABL DIALOG
    openAddTableDialog() {
      this.isAddTableDialogOpen = true;
    },
    // CLOST ADD DIALOG
    closeAddTableDialog() {
      this.isAddTableDialogOpen = false;
      this.resetNewTableForm();
    },
    // TABLE FORM ABOVE RESET AFTER BEING USED
    resetNewTableForm() {
      this.newTable = { code: "", position: "", seats: 1 };
    },
    // (POST) ADDING TABLE
    async submitAddTable() {
      if (!this.$refs.addTableForm.validate()) return;

      try {
        // FROM API.JS
        await createTable(this.selectedRestaurant.id, this.newTable);
        this.closeAddTableDialog();
        await this.fetchTables(this.selectedRestaurant.id);
      } catch (error) {
        console.error("Error adding table:", error);
        alert("Failed to add table.");
      }
    },
    // OPEN EDIT DIALOG
    openEditDialog(table) {
      this.editableTable = { ...table }; 
      this.isEditDialogOpen = true;
    },
    // CLOSE EDIT DIALOG
    async closeEditDialog() {
      this.isEditDialogOpen = false;
      this.editableTable = null;
    },
    // EDIT TABLES
    async submitEditTable() {
      // VALIDATING FORM (IS IT EMPTY)
      if (!this.$refs.editTableForm.validate()) return;

      try {
        // FROM API.JS
        await updateTable(this.editableTable.id, this.editableTable);
        this.closeEditDialog();
        await this.fetchTables(this.selectedRestaurant.id);
        await this.$nextTick();
      } catch (error) {
        console.error("Error updating table:", error);
        alert("Failed to update table.");
      }
    },
    async deleteTable(id) {
      await deleteTable(id);
      if (this.selectedRestaurant) {
        // FROM API.JS
        await this.fetchTables(this.selectedRestaurant.id);
      }
    },
  },
};
</script>
