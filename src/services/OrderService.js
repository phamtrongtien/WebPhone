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
export const updatePaymentStatus = async (orderId, isPaid, access_token) => {
    try {
        const res = await axios.put(
            `${process.env.REACT_APP_API_URL_BACKEND}/order/update-payment/${orderId}`,
            { isPaid }, // Trạng thái thanh toán
            {
                headers: {
                    Authorization: `Bearer ${access_token}`, // Truyền token dưới header Authorization
                },
            }
        );

        // In ra kết quả thành công (tuỳ chọn)
        console.log('Payment status updated successfully:', res.data);

        return res.data; // Trả về dữ liệu từ response

    } catch (error) {
        // Xử lý lỗi chi tiết
        console.error('Error updating payment status:', error.response ? error.response.data : error.message);

        // Ném lại lỗi cho các xử lý sau nếu cần
        throw new Error('Failed to update payment status');
    }
};