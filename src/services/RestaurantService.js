
import http from "../http-common.js";

class RestaurantService {

    // Get all restaurants
  getAll() {
    return http.get('/locations')
  }


}

export default new RestaurantService();


