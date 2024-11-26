<template>
  <v-app>
    <v-main>
      <router-view /> 
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Basic styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f6f8;
  color: #333;
}
</style>
