import axios from 'axios';
export const axiosJWT = axios.create();
export const getProductAll = async (search) => {
    const url = `${process.env.REACT_APP_API_URL_BACKEND}/product/alldetails`;
    const query = search?.length > 0 ? `?filter=name&filter=${encodeURIComponent(search)}` : '';
    const res = await axiosJWT.get(url + query);
    return res.data;
};

export const getProductById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/details/${id}`);
    return res.data
}
export const getAllType = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all-type`);
    return res.data
}

export const getProductType = async (type) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/alldetails?filter=type&filter=${type}`);
        return res.data
    }
}
export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/product/create`, data);
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL_BACKEND}/product/delete/${id}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
export const updateProduct = async (id, productData, access_token) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL_BACKEND}/product/update/${id}`, productData, {
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
export const updateProductRating = async (id, rating, userId) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL_BACKEND}/product/update-rating/${id}`, {

            rating, userId
        });
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};
