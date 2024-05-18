import axios from "axios";

export const createApiSneakers = () => {
  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  };

  const getAllProductsByName = async (query) => {
    const response = await axios.get(
      `http://localhost:3000/products?name=${query}`
    );
    return response.data;
  };

  const registerCustomer = async (data) => {
    const response = await axios.post(
      'http://localhost:3000/customers',
      data
    );
    return response.data;
  }

  const loginCustomer = async (data) => {
    const response = await axios.post(
      'http://localhost:3000/login',
      data
    );
    return response.data;
  }

  return { getAllProducts, getAllProductsByName, registerCustomer, loginCustomer };
};
