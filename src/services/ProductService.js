import axios from 'axios';
export const axiosJWT = axios.create();
export const getProductAll = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/alldetails`);
    return res.data
}
export const getProductById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/details/${id}`);
    return res.data
}