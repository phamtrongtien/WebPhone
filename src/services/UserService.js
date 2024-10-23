import axios from 'axios';

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sig-in`, data);
    return res.data
}