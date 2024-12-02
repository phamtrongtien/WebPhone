import axios from "axios";

// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/order/create`, data);
//     return res.data
// }
export const createOrder = async (data, access_token) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/order/create`, data, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};
export const getDetailOrderByUserId = async (id, access_token) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-order-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};
