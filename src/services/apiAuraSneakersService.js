import axios from "axios";

const baseURL = "http://localhost:3000";
export const createApiSneakers = () => {
  const getAllProducts = async () => {
    const response = await axios.get(`${baseURL}/products`);
    return response.data;
  };

  const getAllProductsByName = async (query) => {
    const response = await axios.get(`${baseURL}/products?name=${query}`);
    return response.data;
  };

  const registerCustomer = async (data) => {
    const response = await axios.post(`${baseURL}/customers`, data);
    return response.data;
  };

  const loginCustomer = async (data) => {
    const response = await axios.post(`${baseURL}/login`, data);
    return response.data;
  };

  const addProductCart = async (data) => {
    const response = await axios.post(`${baseURL}/cart`, data);
    return response.data;
  };

  const getProductsCart = async (customerId) => {
    const response = await axios.get(
      `${baseURL}/cart?customerId=${customerId}`
    );
    return response.data;
  };

  return {
    getAllProducts,
    getAllProductsByName,
    registerCustomer,
    loginCustomer,
    addProductCart,
    getProductsCart,
  };
};
