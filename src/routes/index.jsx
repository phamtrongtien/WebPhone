import HomePage from "../pages/Hompage/HomePage"
import NoteFoundPage from "../pages/NoteFoundPage/NoteFoundPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import ProductsPage from "../pages/ProductsPage/ProductsPage"

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,

        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,

        isShowHeader: true
    },
    {
        path: '*',
        page: NoteFoundPage
    }
]