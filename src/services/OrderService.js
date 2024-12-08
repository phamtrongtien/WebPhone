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
export const deleteOrder = async (id, access_token, orderItem) => {
    try {
        const res = await axios.delete(
            `${process.env.REACT_APP_API_URL_BACKEND}/order/delete-order/${id}`,
            {
                headers: {
                    token: `Bearer ${access_token}`,
                },
                data: orderItem, // data should be inside the config object
            }
        );
        return res.data;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};
export const getAllOrder = async (access_token) => {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL_BACKEND}/order/get-all-order`,
            {
                headers: {
                    token: `Bearer ${access_token}`,
                },

            }
        );
        return res.data;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};
export const updateDeliveryStatus = async (orderId, isDelivered, access_token) => {

    try {
        const res = await axios.put(
            `${process.env.REACT_APP_API_URL_BACKEND}/order/update-delivery/${orderId}`,
            { isDelivered },
            {
                headers: {
                    token: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error('Error updating delivery status:', error);
        throw error;
    }
};