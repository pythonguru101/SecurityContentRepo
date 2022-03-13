//@ts-check
import axios from 'axios';

export const getCategories = async () => {
    return await axios.get(`/api/categories`);
};
