import {createBrowserRouter} from 'react-router-dom'
import Home from './views/home.jsx';
import UserLayout from './views/userLayout.jsx';
import GuestLayput from './views/guestLayout.jsx';
import Register from './views/register.jsx';
import Login from './views/login.jsx';
import Account from './views/account.jsx';
import Post from './views/post/post.jsx';
import PostUpload from './views/post/postUpload.jsx';
import Create_account from './views/create_acount.jsx';

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
])

export default router;