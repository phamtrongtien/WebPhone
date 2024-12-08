import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    shippingAdress: {},
    paymentMethod: '',
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isCancel: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            if (!orderItem || !orderItem.product) {
                console.error("Invalid orderItem in payload", action.payload);
                return;
            }

            const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);

            if (itemOrder) {
                itemOrder.amount += orderItem.amount; // Cập nhật số lượng nếu đã có sản phẩm
            } else {
                state.orderItems.push(orderItem); // Thêm sản phẩm mới nếu chưa có
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            if (itemOrder) {
                itemOrder.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
        },
        resetOrder: (state) => {
            Object.assign(state, initialState); // Đặt lại toàn bộ state về trạng thái ban đầu
        }
    },
})

// Action creators are generated for each case reducer function
export const { resetOrder, addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct } = orderSlice.actions

export default orderSlice.reducer
