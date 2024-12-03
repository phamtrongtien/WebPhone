import axios from "axios";

export const getConfig = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/payment/config`)
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};