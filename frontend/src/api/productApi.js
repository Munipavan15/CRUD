import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';

export const getAllProducts = () => {
  return axios.get(API_URL);
};

export const createProduct = (productData) => {
  return axios.post(API_URL, productData);
};

export const updateProduct = (id, productData) => {
  return axios.put(`${API_URL}/${id}`, productData);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};