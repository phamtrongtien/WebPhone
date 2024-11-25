import HomePage from "../pages/Hompage/HomePage"
import NoteFoundPage from "../pages/NoteFoundPage/NoteFoundPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import ProductsPage from "../pages/ProductsPage/ProductsPage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage"
import SiginPage from "../pages/SiginPage/SiginPage"
import SigupPage from "../pages/SigupPage/SigupPage"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import AdminPage from "../pages/AdminPage/AdminPage"
import ProfileUserPage from "../pages/ProfileUserPage/ProfileUserPage"


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
        path: '/type',
        page: TypeProductPage,

        isShowHeader: true
    },
    {
        path: '/sig-in',
        page: SiginPage,
        isShowHeader: false


    },
    {
        path: '/sig-up',
        page: SigupPage,
        isShowHeader: false

    },
    {
        path: '/product/details/:id',  // Use dynamic parameter ':id' in the route
        page: ProductDetailPage,
        isShowHeader: true
    }
    ,
    {
        path: '/profile-user',
        page: ProfileUserPage,
        isShowHeader: true
    },
    {
        path: '/admin',
        page: AdminPage,
        isPrivate: true
    },

    {
        path: '*',
        page: NoteFoundPage
    }
]