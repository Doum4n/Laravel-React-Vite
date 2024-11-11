import {createBrowserRouter} from 'react-router-dom'
import Home from './home.jsx';
import UserLayout from './userLayout.jsx';
import GuestLayput from './guestLayout.jsx';
import Register from './register.jsx';
import Login from './login.jsx';
import Account from './account.jsx';
import Post from './post/post.jsx';
import PostUpload from './post/postUpload.jsx';
import Create_account from './create_acount.jsx';
import AdminLayout from '../admin/home/home.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            {
                path: '/home',
                element: <Home/>,
            },
            {
                path: 'post/upload',
                element: <PostUpload/>
            },
            {
                path: '/post/:id',
                element: <Post/>
            },
            {
                path: 'account',
                element: <Account/>
            },
        ],
    },

    {
        path: '/',
        element: <GuestLayput/>,
        children: [
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/create',
                element: <Create_account/>
            }
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout/>
    }
])

export default router;