import axios from 'axios';
export const axiosJWT = axios.create();
export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sig-in`, data);
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
}

export const sigUpUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sig-up`, data);
        return res.data;
    } catch (error) {
        console.error('Error signing up:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getDetailsUser = async (id, access_token) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data
    } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
        throw error;
    }
}
export const refreshToken = async () => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/refresh_token`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/log-out`);
        return res.data
    } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
        throw error;
    }
}
export const updateUser = async (id, data, access_token) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`, data,
            {
                headers: {
                    token: `Bearer ${access_token}`
                }
            }
        ); // Sửa đường dẫn URL API
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        throw error;
    }
};
export const getAllUsers = async (access_token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/getALL`,
            {
                headers: {
                    token: `Bearer ${access_token}`
                }
            }
        ); // Sửa đường dẫn URL API
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        throw error;
    }
};

export const deleteUser = async (id, access_token) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        });
        return res.data
    } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
        throw error;
    }
}