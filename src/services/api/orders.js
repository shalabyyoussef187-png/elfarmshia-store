import axios from "axios";

const API_URL = "https://pharma-api-flame.vercel.app/api";

export const ordersAPI = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data
   * @param {string} orderData.customerName - Customer full name
   * @param {string} orderData.phone - Phone number
   * @param {string} orderData.addressText - Full address text
   * @param {number} orderData.lat - Latitude (optional)
   * @param {number} orderData.lng - Longitude (optional)
   * @param {string} orderData.productId - Product ID
   * @param {number} orderData.quantity - Product quantity
   * @returns {Promise} Order response
   */
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  /**
   * Create multiple orders at once (for cart checkout)
   * @param {Array} orders - Array of order objects
   * @returns {Promise} Array of order responses
   */
  createBulkOrders: async (orders) => {
    try {
      const orderPromises = orders.map((order) =>
        axios.post(`${API_URL}/orders`, order),
      );
      const responses = await Promise.all(orderPromises);
      return responses.map((res) => res.data);
    } catch (error) {
      console.error("Error creating bulk orders:", error);
      throw error;
    }
  },
};

export default ordersAPI;
