import {createBrowserRouter} from 'react-router-dom'
import Home from './views/home.jsx';
import Layout from './views/layout.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
    }
])

export default router;