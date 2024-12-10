import axios from 'axios';

// Create an axios instance for API requests
export const axiosJWT = axios.create();

// Fetch all feedback for a product
export const getCommentsByProductId = async (productId) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/feedback/get/${productId}`);
    return res.data;
};

// Add a comment for a product
export const addComment = async (productId, userId, comment) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/feedback/add`, {
        productId,
        userId,
        comment
    });
    return res.data;
};


// Fetch a specific comment by commentId (optional, for updating or deleting)
export const getCommentById = async (commentId) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/feedback/${commentId}`);
    return res.data;
};

// Delete a comment by commentId
export const deleteComment = async (commentId) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/feedback/delete/${commentId}`, {

    });
    return res.data;
};
