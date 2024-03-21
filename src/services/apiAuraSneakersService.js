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

  return { getAllProducts, getAllProductsByName };
};
