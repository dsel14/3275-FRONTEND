<template>
  <v-container>
    <h1>Expensive Restaurants</h1>
    <v-row>
      <v-col cols="12" md="6" v-for="restaurant in restaurants" :key="restaurant.id">
        <v-card>
          <v-card-title>{{ restaurant.name }}</v-card-title>
          <v-card-subtitle class="location">{{ restaurant.location }}</v-card-subtitle>
          <v-card-text>
            <div class="tables">
              <h3>Tables:</h3>
              <ul v-if="restaurant.tables && restaurant.tables.length">
                <li v-for="table in restaurant.tables" :key="table.id" class="table-item">
                  <span class="table-code">{{ table.code }}</span>
                  <span class="table-details">Position: {{ table.position }}</span>
                  <span class="table-seats">Seats: {{ table.seats }}</span>
                </li>
              </ul>
              <p v-else class="loading">Loading tables...</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      restaurants: []
    };
  },
  async created() {
    try {
      const response = await this.$axios.get('/locations');
      this.restaurants = response.data;

      await Promise.all(
        this.restaurants.map(async (restaurant) => {
          try {
            const tablesResponse = await this.$axios.get(`/tables/${restaurant.id}`);
            this.$set(restaurant, 'tables', tablesResponse.data);
          } catch (error) {
            console.error(`Error fetching tables for restaurant ${restaurant.id}:`, error);
            this.$set(restaurant, 'tables', []);
          }
        })
      );
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 10px;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
}

.location {
  color: #7f8c8d;
}

.tables h3 {
  font-size: 1.2em;
  color: #34495e;
  margin-bottom: 5px;
}

.table-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.table-code {
  font-weight: bold;
  color: #3498db;
}

.table-details, .table-seats {
  font-size: 0.9em;
  color: #555;
}

.loading {
  color: #e74c3c;
}
</style>
