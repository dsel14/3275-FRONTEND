import axios from 'axios';

const api = axios.create({
  baseURL: 'https://three275-finalbackend.onrender.com/api',
});

// Restaurants
export const getRestaurants = () => api.get('/locations');
export const getRestaurantById = (id) => api.get(`/locations/${id}`);
export const createRestaurant = (restaurant) => api.post('/locations', restaurant);
export const deleteRestaurant = (id) => api.delete(`/locations/${id}`);

// Tables
export const getTables = () => api.get('/tables');
export const getTableById = (id) => api.get(`/tables/${id}`);
export const createTable = (restaurantId, table) =>
    api.post(`/restaurants/${restaurantId}/tables`, table);
  export const updateTable = (id, table) => api.put(`/tables/${id}`, table);
export const deleteTable = (id) => api.delete(`/tables/${id}`);
export const deleteAllTables = () => api.delete('/tables');
export const getTablesByRestaurantId = (restaurantId) =>
    api.get(`/restaurants/${restaurantId}/tables`);

// RESERVATIN

export const makeReservation = (reservationDetails) =>
  api.post('/reservations', reservationDetails);

export const getReservations = () => api.get('/reservations'); 
export const assignTableToReservation = (reservationId, tableId) =>
  api.put(`/reservations/${reservationId}/assign-table/${tableId}`); 



  

// Seats
export const addSeatToTable = (restaurantId, tableCode) =>
  api.post(`/restaurants/${restaurantId}/tables/${tableCode}/seats`);
export const deleteSeatFromTable = (restaurantId, tableCode, seatNumber) =>
  api.delete(`/restaurants/${restaurantId}/tables/${tableCode}/seats/${seatNumber}`);

// Users
export const getUsers = () => api.get('/user/all');
export const getUserById = (id) => api.get(`/user/${id}`);
export const createUser = (user) => api.post('/user', user);
export const updateUser = (id, user) => api.put(`/user/${id}`, user);
export const deleteUser = (id) => api.delete(`/user/${id}`);
